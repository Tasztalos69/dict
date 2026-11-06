import { Database } from "bun:sqlite";
import { expect, test } from "bun:test";
import { mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backupDatabase } from "./backup";

test("snapshots the data, replaces today's snapshot, and prunes old ones", () => {
  const dir = mkdtempSync(join(tmpdir(), "dict-backup-"));
  const sqlite = new Database(":memory:");
  sqlite.run("CREATE TABLE words (word TEXT)");
  sqlite.run("INSERT INTO words VALUES ('szó')");

  writeFileSync(join(dir, "dict-2020-01-01.db"), "");
  writeFileSync(join(dir, "dict-2020-01-02.db"), "");
  writeFileSync(join(dir, "unrelated.db"), "");

  backupDatabase(sqlite, dir, 2);
  const file = backupDatabase(sqlite, dir, 2);

  expect(readdirSync(dir).toSorted()).toEqual([
    "dict-2020-01-02.db",
    file.slice(dir.length + 1),
    "unrelated.db",
  ]);
  expect(new Database(file).query("SELECT word FROM words").get()).toEqual({ word: "szó" });
});
