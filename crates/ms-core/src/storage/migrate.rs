use rusqlite::Connection;
use std::{
  fs,
  path::{Path, PathBuf},
};

/// migrate runs the database migrations located in the given schema_dir.
pub fn run(conn: &mut Connection, schema_dir: impl AsRef<Path>) -> anyhow::Result<()> {
  let schema_dir = schema_dir.as_ref();

  if !schema_dir.exists() {
    anyhow::bail!("【ms-core】schema directory not found: {:?}", schema_dir);
  }

  let mut files = collect_sql_files(schema_dir)?;
  files.sort();

  let tx = conn.transaction()?;

  for file in files {
    let sql = fs::read_to_string(&file)
      .map_err(|err| anyhow::anyhow!("【ms-core】failed to read sql file: {:?}", err))?;

    if sql.trim().is_empty() {
      continue;
    }

    tx.execute_batch(&sql)
      .map_err(|err| anyhow::anyhow!("【ms-core】failed to execute sql: {:?}", err))?;

    println!("【ms-core】migrated: {:?}", file);
  }

  tx.commit()?;
  Ok(())
}

/// collect_sql_files collects all .sql files in the given directory.
fn collect_sql_files(dir: impl AsRef<Path>) -> anyhow::Result<Vec<PathBuf>> {
  let mut files = Vec::new();

  for entry in fs::read_dir(dir)? {
    let entry = entry?;
    let path = entry.path();

    if path.is_file() && path.extension().map(|s| s == "sql").unwrap_or(false) {
      files.push(path);
    }
  }

  Ok(files)
}

#[cfg(test)]
mod tests {
  use super::*;
  use rusqlite::Connection;
  use tempfile::tempdir;
  use std::fs;

  /// Helper: create sqlite db in temp dir
  fn open_temp_db(dir: &std::path::Path) -> Connection {
    let db_path = dir.join("test.db");
    Connection::open(db_path).expect("failed to open sqlite")
  }

  #[test]
  fn test_migrate_creates_tables() {
    let tmp = tempdir().unwrap();
    let schema_dir = tmp.path().join("schema");
    fs::create_dir(&schema_dir).unwrap();

    // write schema sql
    fs::write(
      schema_dir.join("001_core.sql"),
      r#"
      CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      "#,
    )
    .unwrap();

    let mut conn = open_temp_db(tmp.path());

    run(&mut conn, &schema_dir).expect("migration should succeed");

    // verify table exists
    let exists: bool = conn
      .query_row(
        r#"
        SELECT EXISTS (
          SELECT 1 FROM sqlite_master
          WHERE type='table' AND name='test_table'
        )
        "#,
        [],
        |row| row.get(0),
      )
      .unwrap();

    assert!(exists, "test_table should exist after migration");
  }

  #[test]
  fn test_migrate_multiple_files_in_order() {
    let tmp = tempdir().unwrap();
    let schema_dir = tmp.path().join("schema");
    fs::create_dir(&schema_dir).unwrap();

    // first file
    fs::write(
      schema_dir.join("001_create.sql"),
      r#"
      CREATE TABLE step1 (
        id INTEGER PRIMARY KEY
      );
      "#,
    )
    .unwrap();

    // second file depends on first
    fs::write(
      schema_dir.join("002_alter.sql"),
      r#"
      ALTER TABLE step1 ADD COLUMN name TEXT;
      "#,
    )
    .unwrap();

    let mut conn = open_temp_db(tmp.path());

    run(&mut conn, &schema_dir).expect("ordered migration should succeed");

    // verify column exists
    let mut stmt = conn
      .prepare("PRAGMA table_info(step1)")
      .unwrap();

    let columns: Vec<String> = stmt
      .query_map([], |row| row.get::<_, String>(1))
      .unwrap()
      .map(|r| r.unwrap())
      .collect();

    assert!(
      columns.contains(&"name".to_string()),
      "column `name` should exist after ordered migration"
    );
  }

  #[test]
  fn test_empty_sql_files_are_ignored() {
    let tmp = tempdir().unwrap();
    let schema_dir = tmp.path().join("schema");
    fs::create_dir(&schema_dir).unwrap();

    fs::write(schema_dir.join("001_empty.sql"), "   \n  ").unwrap();

    let mut conn = open_temp_db(tmp.path());

    // should not fail
    run(&mut conn, &schema_dir).expect("empty sql should be ignored");
  }

  #[test]
  fn test_missing_schema_directory_fails() {
    let tmp = tempdir().unwrap();
    let missing_dir = tmp.path().join("no_schema");

    let mut conn = open_temp_db(tmp.path());

    let err = run(&mut conn, &missing_dir).unwrap_err();
    let msg = err.to_string();

    assert!(
      msg.contains("schema directory not found"),
      "error message should indicate missing schema directory"
    );
  }
}

