import type { Entry } from "../entries";

export default function EntryCard({
  entry,
  navToWord,
}: Readonly<{ entry: Entry; navToWord: (word: string) => void }>) {
  return (
    <div
      id={entry.word}
      className="my-12.5 rounded-[5px] bg-page p-5 shadow-entry-off transition-all duration-300 ease-in-out hover:shadow-entry [&_*]:cursor-default [&.active]:animate-[box-out_3s_linear_forwards] [&.active]:shadow-entry"
    >
      <h3 className="font-sans text-[1.17em] font-semibold capitalize">
        {entry.word}{" "}
        <span className="font-sans text-[0.85em] font-normal text-muted lowercase">
          ({entry.type})
        </span>
      </h3>
      <p className="mt-2.5 text-[1.2rem]">{entry.definition}</p>
      {entry.synonyms.length > 0 && (
        <p className="mt-2.5 text-[1.1rem] font-bold">
          lásd:{" "}
          {entry.synonyms.map((s) => (
            <button
              key={s}
              type="button"
              className="mx-1.25 cursor-pointer! text-[length:inherit] font-normal text-link capitalize underline first-of-type:ml-0"
              onClick={() => navToWord(s)}
            >
              {s}
            </button>
          ))}
        </p>
      )}
    </div>
  );
}
