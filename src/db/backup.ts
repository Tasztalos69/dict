import type { Database } from "bun:sqlite";
import { mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

// Snapshots the database to <dir>/dict-YYYY-MM-DD.db and keeps the newest `keep` snapshots
export const backupDatabase = (sqlite: Database, dir: string, keep = 14) => {
  mkdirSync(dir, { recursive: true });

  const tmp = join(dir, "tmp.db");
  rmSync(tmp, { force: true });
  sqlite.run("VACUUM INTO ?", [tmp]);

  const file = join(dir, `dict-${new Date().toISOString().slice(0, 10)}.db`);
  renameSync(tmp, file);

  readdirSync(dir)
    .filter((name) => /^dict-\d{4}-\d{2}-\d{2}\.db$/.test(name))
    .toSorted()
    .slice(0, -keep)
    .forEach((name) => rmSync(join(dir, name)));

  return file;
};
