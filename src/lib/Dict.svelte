<script lang="ts">
  import axios from "axios";
  import { fade } from "svelte/transition";
  import type { Entry, Relation } from "src/types";
  import EntryCard from "./EntryCard.svelte";
  import Check from "./Check.svelte";
  import { polyfill } from "seamless-scroll-polyfill";
  polyfill();

  let isWelcomePage: boolean = !!!localStorage.getItem("isOpenerDisabled");

  let entries: Entry[] = [];
  let relations: Relation[] = [];
  let letters: string[] = [];

  const fetchData = async (): Promise<Entry[]> => {
    const {
      data: { data: entriesResponse },
    } = await axios.get("https://admin.dict.jelszo.co/items/words?sort[]=word");

    const {
      data: { data: relationsResponse },
    } = await axios.get("https://admin.dict.jelszo.co/items/words_words");

    entries = entriesResponse;
    relations = relationsResponse;

    letters = [...new Set(entries.map((w) => w.word[0]))];

    return entries;
  };

  let promise = fetchData();

  const flipWelcomePage = () => {
    if (!!localStorage.getItem("isOpenerDisabled")) {
      localStorage.removeItem("isOpenerDisabled");
      isWelcomePage = true;
    } else {
      localStorage.setItem("isOpenerDisabled", "true");
      isWelcomePage = false;
    }
  };

  const navToWord = (str: string) => {
    let el: HTMLElement;
    if (str.length > 1) {
      el = document.getElementById(str);
    } else {
      el = document.getElementById(
        entries.filter((e) => e.word[0].toLowerCase() === str.toLowerCase())[0]
          .word
      );
    }
    el.classList.add("active");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      el.classList.remove("active");
    }, 3000);
  };
</script>

<main in:fade={{ delay: 1000 }}>
  <div class="title">
    <h1>Glossza</h1>
    <h3>Random szavak gyűjteménye, amik jól hangzanak.</h3>
  </div>
  {#await promise}
    <p>Töltés...</p>
  {:then entries}
    <ul class="letters-wrapper" in:fade={{ delay: 1500 }}>
      {#each letters as letter}
        <li on:click={() => navToWord(letter)}>
          {letter}
        </li>
      {/each}
    </ul>
    <div class="entries-wrapper">
      {#each entries as entry}
        <EntryCard
          {entry}
          synonyms={entry.synonyms.map(
            (s) =>
              entries.filter(
                (e) =>
                  e.id ===
                  relations.filter((r) => r.id === s)[0].related_words_id
              )[0].word
          )}
          {navToWord}
        />
      {/each}
    </div>
    <button
      in:fade={{ delay: 2000 }}
      class:active={!isWelcomePage}
      on:click={flipWelcomePage}
    >
      Fedlap átugrása {#if !isWelcomePage}<Check />{/if}
    </button>
  {:catch}
    <p class="error">Hálózati hiba!</p>
  {/await}
</main>

<style lang="scss">
  p {
    margin-top: 60px;
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    font-family: "Source sans pro", sans-serif;

    &.error {
      color: #ad0a2a;
    }
  }

  h1 {
    text-align: center;
    margin: 0;
    margin-top: 60px;
    font-size: 3em;
    font-weight: 600;
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
  }

  h3 {
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    font-family: "Baskervville", serif;
    font-style: italic;
    letter-spacing: 1px;
    color: #555;
  }

  .entries-wrapper {
    max-width: clamp(400px, 40vw, 600px);
    position: relative;
    margin: auto;
    padding-top: 50px;

    @media screen and (max-width: 600px) {
      max-width: 90vw;
    }
  }

  .letters-wrapper {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    list-style: none;

    @media screen and (max-width: 600px) {
      display: none;
    }

    li {
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.06s all ease-in-out;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        transform: scale(1.4);
      }

      font-family: "Oswald", sans-serif;
      text-transform: uppercase;
      font-size: 1.3rem;
    }
  }

  button {
    position: fixed;
    bottom: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    font-family: "Oswald", serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 1rem;
    color: #202020;
    opacity: 0.4;
    transition: 0.4s all ease-in-out;
    cursor: pointer;

    @media screen and (max-width: 600px) {
      display: none;
    }

    &.active {
      opacity: 1;
    }
  }
</style>
