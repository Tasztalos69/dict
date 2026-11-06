import type { words } from "./db/schema";

export type Word = typeof words.$inferSelect;
export type Entry = Pick<Word, "word" | "definition" | "type"> & {
  synonyms: string[];
};

export const OPENER_DISABLED_KEY = "isOpenerDisabled";

const collator = new Intl.Collator("hu");

export function toEntries(rows: Word[]): Entry[] {
  const sorted = rows.toSorted((a, b) => collator.compare(a.word, b.word));

  return sorted.map(({ word, definition, type, synonymGroup }) => ({
    word,
    definition,
    type,
    synonyms: synonymGroup
      ? sorted.filter((r) => r.synonymGroup === synonymGroup && r.word !== word).map((r) => r.word)
      : [],
  }));
}
