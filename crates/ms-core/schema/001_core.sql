--- ms-core schema/core.sql

-------------------------------------------
-- Command Table
-------------------------------------------
CREATE TABLE IF NOT EXISTS ms_command (
  id            TEXT PRIMARY KEY, -- ULID
  domain        TEXT NOT NULL,    -- ui / database / statistics / simulation
  action        TEXT NOT NULL,    -- run / analyze / click / etc
  payload_json  TEXT NOT NULL,    -- DSL / 参数（JSON）
  version        TEXT,        -- command schema / DSL version
  idempotency_key TEXT,       -- optional, for deduplication

  exec_policy   TEXT NOT NULL,    -- sync / async / parallel / scheduled / interval
  safety_policy TEXT NOT NULL,    -- rollback / cancelable / readonly
  state         TEXT NOT NULL,    -- created / accepted / finished / failed

  created_at    INTEGER NOT NULL, -- created time
  accepted_at   INTEGER,          -- accepted time
  finished_at   INTEGER,          -- finished time
)

CREATE INDEX ms_command_state_idx ON ms_command(state);
CREATE INDEX ms_command_domain_idx ON ms_command(domain);

-------------------------------------------
-- Job Table
-------------------------------------------
CREATE TABLE IF NOT EXISTS ms_job (
  id            TEXT PRIMARY KEY, -- ULID
  command_id    TEXT NOT NULL,    -- associated command ID
  state         TEXT NOT NULL,    -- pending / running / completed / failed / rolling_back / aborted
  lane          TEXT NOT NULL,    -- lane name for job scheduling (sync / async / parallel / timer)
  attempt       INTEGER NOT NULL, -- number of attempts made
  max_attempts  INTEGER NOT NULL, -- maximum attempts allowed
  retry_policy  TEXT,             -- retry policy (none / immediate / exponential_backoff)
  created_at    INTEGER NOT NULL, -- created time
  started_at    INTEGER,          -- started time
  finished_at   INTEGER,          -- finished time

  last_checkpoint INTEGER,        -- last checkpoint time
  error_message TEXT,             -- error message if any

  FOREIGN KEY(command_id) REFERENCES ms_command(id)
)

-------------------------------------------
-- Checkpoint Table
-------------------------------------------
CREATE TABLE IF NOT EXISTS ms_checkpoint (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id          TEXT NOT NULL,

  seq             INTEGER NOT NULL,       --
  label           TEXT NOT NULL,          -- descriptive label

  data_json       TEXT,                   -- checkpoint data (JSON)
  rollback_hint   TEXT,                   -- rollbacb hint or execution context

  created_at      INTEGER NOT NULL,       -- created time

  FOREIGN KEY(job_id) REFERENCES ms_job(id),
  UNIQUE(job_id, seq)
)

CREATE INDEX ms_checkpoint_job_id_idx ON ms_checkpoint(job_id);

-------------------------------------------
-- Executor status
-------------------------------------------
CREATE TABLE IF NOT EXISTS ms_executor_status (
  id            TEXT PRIMARY KEY,   -- executor ID
  lane          TEXT NOT NULL,      -- lane name
  hostname      TEXT NOT NULL,      -- host name
  pid           INTEGER NOT NULL,   -- process ID
  last_heartbeat INTEGER NOT NULL,  -- last heartbeat time
  created_at    INTEGER NOT NULL    -- created time
)

CREATE INDEX ms_executor_status_lane_idx ON ms_executor_status(lane);

-------------------------------------------
-- Scheduler
-------------------------------------------
CREATE TABLE IF NOT EXISTS ms_scheduler (
  id            TEXT PRIMARY KEY, -- scheduler ID
  command_id    TEXT NOT NULL,    -- associated command ID
  schedule_type TEXT NOT NULL,    -- cron / interval / specific_time
  run_at        INTEGER NOT NULL, -- next run time
  interval_sec  INTEGER,          -- interval in seconds (for interval type)
  cron_expr     TEXT,             -- cron expression (for cron type)
  enabled       INTEGER NOT NULL, -- enabled flag (1 = true, 0 = false)
  error_message TEXT,             -- error message if any
  last_run_at   INTEGER,          -- last run time
  next_run_at   INTEGER,          -- next run time

  FOREIGN KEY(command_id) REFERENCES ms_command(id)
)

CREATE INDEX ms_scheduler_command_id_idx ON ms_scheduler(command_id);
