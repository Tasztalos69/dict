import { expect, test } from "bun:test";
import { toEntries, type Word } from "./entries";

const row = (word: string, synonymGroup: string | null = null): Word => ({
  word,
  definition: "d",
  type: "fn",
  synonymGroup,
});

test("sorts words in Hungarian order", () => {
  const rows = ["zsalu", "öhön", "cukor", "Csöblek", "ostor", "pad"].map((w) => row(w));
  expect(toEntries(rows).map((e) => e.word)).toEqual([
    "cukor",
    "Csöblek",
    "ostor",
    "öhön",
    "pad",
    "zsalu",
  ]);
});

test("synonyms are the other words in the group, and ungrouped words have none", () => {
  const entries = toEntries([row("b", "x"), row("a", "x"), row("c", "x"), row("d", "y"), row("e")]);
  const synonyms = Object.fromEntries(entries.map((e) => [e.word, e.synonyms]));
  expect(synonyms).toEqual({ a: ["b", "c"], b: ["a", "c"], c: ["a", "b"], d: [], e: [] });
});
