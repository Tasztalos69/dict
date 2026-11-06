import { dirname, join } from "node:path";
import { defineTask } from "nitro/task";
import { backupDatabase } from "../db/backup";
import { db, path } from "../db";

export default defineTask({
  meta: { description: "Snapshot the database into the backups folder" },
  run() {
    const result = backupDatabase(db.$client, join(dirname(path), "backups"));
    console.log(`Database backed up to ${result}`);
    return { result };
  },
});
