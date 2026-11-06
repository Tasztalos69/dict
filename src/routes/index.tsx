import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Dict, { DictTitle } from "../components/Dict";
import { db } from "../db";
import { words } from "../db/schema";
import { OPENER_DISABLED_KEY, toEntries } from "../entries";

const getEntries = createServerFn({ method: "GET" }).handler(() =>
  toEntries(db.select().from(words).all()),
);

export const Route = createFileRoute("/")({
  ssr: "data-only",
  loader: () => getEntries(),
  component: Home,
  errorComponent: LoadError,
});

function LoadError() {
  return (
    <main>
      <DictTitle />
      <p className="mt-15 text-center font-sans text-[2rem] font-semibold text-error">
        Hálózati hiba!
      </p>
    </main>
  );
}

function Home() {
  const entries = Route.useLoaderData();
  const [isWelcomePage, setIsWelcomePage] = useState(!localStorage.getItem(OPENER_DISABLED_KEY));
  const [openerMounted, setOpenerMounted] = useState(isWelcomePage);
  const [openedByClick] = useState(isWelcomePage);

  return (
    <>
      {openerMounted && (
        <div
          className={`relative mt-[50vh] -translate-y-1/2 text-center text-ink ${isWelcomePage ? "" : "animate-[fade-out_500ms_linear_forwards]"}`}
          onAnimationEnd={() => setOpenerMounted(false)}
        >
          <h1 className="mb-15 text-center font-display text-[4rem] font-semibold uppercase">
            glossza
          </h1>
          <h3 className="px-5 text-center font-serif text-[1.5rem] font-semibold tracking-[1px] text-muted italic">
            Random szavak gyűjteménye, amik jól hangzanak.
          </h3>
          <button
            type="button"
            className="relative mt-[30vh] inline-flex cursor-pointer items-center font-display text-[1.4rem] font-medium uppercase after:absolute after:bottom-0 after:left-1/2 after:h-1.25 after:w-full after:-translate-x-1/2 after:translate-y-full after:bg-ink after:transition-all after:duration-100 after:ease-in-out after:content-[''] hover:after:w-[120%]"
            onClick={() => setIsWelcomePage(false)}
          >
            A glossza feltárása <IconArrowNarrowRight size={36} aria-hidden="true" />
          </button>
        </div>
      )}
      {!isWelcomePage && <Dict entries={entries} fadeIn={openedByClick} />}
    </>
  );
}
