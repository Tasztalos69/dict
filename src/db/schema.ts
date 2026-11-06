import { sql } from "drizzle-orm";
import { check, index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const words = sqliteTable(
  "words",
  {
    word: text().primaryKey(),
    definition: text().notNull(),
    type: text({ enum: ["fn", "mn", "ige"] }).notNull(),
    synonymGroup: text("synonym_group"),
  },
  (t) => [
    index("words_synonym_group").on(t.synonymGroup),
    check("words_type", sql`${t.type} IN ('fn', 'mn', 'ige')`),
    check("words_synonym_group_not_empty", sql`${t.synonymGroup} <> ''`),
  ],
);
