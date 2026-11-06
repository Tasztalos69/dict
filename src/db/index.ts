import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { drizzle } from "drizzle-orm/bun-sqlite";

const path = process.env.DATABASE_PATH ?? "data/dict.db";
mkdirSync(dirname(path), { recursive: true });

const sqlite = new Database(path, { create: true });
sqlite.run("PRAGMA busy_timeout = 5000");

export const db = drizzle(sqlite);
