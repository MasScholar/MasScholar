ms-core/
├── Cargo.toml
├── README.md
├── LICENSE
├── build.rs

├── src/
│ ├── lib.rs
│ ├── version.rs
│
│ ├── runtime/
│ │ ├── mod.rs
│ │ ├── core_runtime.rs
│ │ ├── shutdown.rs
│ │ └── health.rs
│
│ ├── scheduler/
│ │ ├── mod.rs
│ │ ├── command.rs
│ │ ├── job.rs
│ │ ├── queue.rs
│ │ ├── executor.rs
│ │ ├── policy.rs
│ │ ├── timer.rs
│ │ └── recovery.rs
│
│ ├── storage/
│ │ ├── mod.rs
│ │
│ │ ├── engine/ # ★ SQLite / SQLCipher 引擎层
│ │ │ ├── mod.rs
│ │ │ ├── sqlite.rs # open / WAL / pragma
│ │ │ └── key.rs # key 派生 / 密钥管理
│ │
│ │ ├── migrate.rs
│ │ ├── writer.rs
│ │ ├── transaction.rs
│ │
│ │ ├── record/ # 系统级记录（你已有）
│ │ │ ├── mod.rs
│ │ │ ├── command.rs
│ │ │ ├── job.rs
│ │ │ ├── checkpoint.rs
│ │ │ └── event.rs
│ │
│ │ ├── kv/ # ★ 新增：Key-Value 存储
│ │ │ ├── mod.rs
│ │ │ ├── store.rs # KVStore trait
│ │ │ ├── sqlite_kv.rs # SQLite 实现
│ │ │ ├── namespace.rs # 命名空间隔离
│ │ │ └── encrypted.rs # 加密 KV（安全数据）
│ │
│ │ ├── facade.rs # ★ Storage Facade（对上层）
│ │ └── security.rs
│
│ ├── checkpoint/
│ │ ├── mod.rs
│ │ ├── trait.rs
│ │ ├── snapshot.rs
│ │ └── restore.rs
│
│ ├── plugin/
│ │ ├── mod.rs
│ │ ├── registry.rs
│ │ ├── capability.rs
│ │ └── sandbox.rs
│
│ ├── api/
│ │ ├── mod.rs
│ │ ├── command_api.rs
│ │ ├── job_api.rs
│ │ ├── event_api.rs
│ │
│ │ ├── kv_api.rs # ★ 新增：给 Electron 的 KV API
│ │ └── storage_api.rs # ★ 高层存储 API（非 SQL）
│
│ ├── security/
│ │ ├── mod.rs
│ │ ├── permission.rs
│ │ ├── isolation.rs
│ │ └── audit.rs
│
│ ├── util/
│ │ ├── mod.rs
│ │ ├── id.rs
│ │ ├── time.rs
│ │ └── hash.rs
│
│ └── error.rs
│
├── schema/
│ ├── core.sql # ★ 包含 kv / secret / metadata
│ ├── migrate_v1.sql
│ └── migrate_v2.sql
│
├── tests/
│ ├── scheduler_crash.rs
│ ├── storage_recovery.rs
│ ├── checkpoint_roundtrip.rs
│ ├── kv_basic.rs # ★ 新增
│ └── kv_encrypted.rs # ★ 新增
│
└── docs/
├── architecture.md
├── scheduler.md
├── storage.md # ★ 重点文档
├── kv.md # ★ 给 Electron 用
├── security.md
└── recovery.md
