import { useState } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { OPENER_DISABLED_KEY, type Entry } from "../entries";
import Check from "./Check";
import EntryCard from "./EntryCard";
import { uniq } from "lodash";

export function DictTitle() {
  const { title, tagline } = useLoaderData({ from: "__root__" });

  return (
    <div>
      <h1 className="mt-15 text-center font-display text-[3em] font-semibold uppercase">{title}</h1>
      <h3 className="mt-5 text-center font-serif text-[1.1rem] font-semibold tracking-[1px] text-muted italic">
        {tagline}
      </h3>
    </div>
  );
}

export default function Dict({ entries, fadeIn }: Readonly<{ entries: Entry[]; fadeIn: boolean }>) {
  const [isWelcomePage, setIsWelcomePage] = useState(!localStorage.getItem(OPENER_DISABLED_KEY));
  const [showCheck, setShowCheck] = useState(!isWelcomePage);

  const letters = uniq(entries.map((e) => e.word[0].toLowerCase()));

  const flipWelcomePage = () => {
    if (isWelcomePage) {
      localStorage.setItem(OPENER_DISABLED_KEY, "true");
      setShowCheck(true);
    } else {
      localStorage.removeItem(OPENER_DISABLED_KEY);
    }
    setIsWelcomePage(!isWelcomePage);
  };

  const navToWord = (str: string) => {
    const word =
      str.length > 1
        ? str
        : entries.find((e) => e.word[0].toLowerCase() === str.toLowerCase())?.word;
    const el = word && document.getElementById(word);

    if (!el) return;

    el.classList.add("active");
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => el.classList.remove("active"), 3000);
  };

  return (
    <main className={fadeIn ? "animate-[fade-in_400ms_linear_1000ms_backwards]" : undefined}>
      <DictTitle />
      <ul className="fixed top-1/2 left-5 -translate-y-1/2 animate-[fade-in_400ms_linear_1500ms_backwards] list-none narrow:hidden">
        {entries.length > 0 &&
          letters.map((letter) => (
            <li key={letter}>
              <button
                type="button"
                className="flex h-8 w-full cursor-pointer items-center justify-center rounded-[5px] font-display text-[1.3rem] uppercase transition-all duration-[60ms] ease-in-out hover:scale-140"
                onClick={() => navToWord(letter)}
              >
                {letter}
              </button>
            </li>
          ))}
      </ul>
      <div className="relative m-auto max-w-[clamp(400px,40vw,600px)] pt-12.5 narrow:max-w-[90vw]">
        {entries.map((entry) => (
          <EntryCard key={entry.word} entry={entry} navToWord={navToWord} />
        ))}
      </div>
      <button
        type="button"
        className={`fixed bottom-3.75 left-3.75 flex animate-[fade-in_400ms_linear_2000ms_backwards] cursor-pointer items-center font-display text-[1rem] tracking-[0.5px] text-ink uppercase transition-all duration-400 ease-in-out narrow:hidden ${isWelcomePage ? "opacity-40" : "opacity-100"}`}
        onClick={flipWelcomePage}
      >
        Fedlap átugrása
        {showCheck && <Check leaving={isWelcomePage} onLeft={() => setShowCheck(false)} />}
      </button>
    </main>
  );
}
