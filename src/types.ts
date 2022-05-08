export interface Entry {
  id: string;
  word: string;
  definition: string;
  type: EntryType;
  synonyms: number[];
}

export interface Relation {
  id: number;
  words_id: string;
  related_words_id: string;
}

export enum EntryType {
  fonev = "fn",
  melleknev = "mn",
  ige = "ige",
}
