export interface Entry {
  id: string;
  word: string;
  definition: string;
  type: EntryType;
  synonyms: string[];
}

export enum EntryType {
  fonev = "fn",
  melleknev = "mn",
  ige = "ige",
}
