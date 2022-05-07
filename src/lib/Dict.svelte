<script lang="ts">
  import axios from "axios";
  import { fade } from "svelte/transition";
  import type { Entry } from "src/types";
  import EntryCard from "./EntryCard.svelte";
  import Check from "./Check.svelte";

  let isWelcomePage: boolean = !!!localStorage.getItem("isOpenerDisabled");

  const fetchData = async (): Promise<Entry[]> => {
    const { data } = await axios.get("http://192.168.0.185:8055/items/words");

    return data.data;
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
</script>

<main in:fade={{ delay: 1000 }}>
  <div class="title">
    <h1>Glossza</h1>
  </div>
  {#await promise}
    <p>Töltés...</p>
  {:then entries}
    <div class="entries-wrapper">
      {#each entries as entry}
        <EntryCard {entry} />
      {/each}
    </div>
  {/await}
</main>

<button
  in:fade={{ delay: 2000 }}
  class:active={!isWelcomePage}
  on:click={flipWelcomePage}
>
  Fedlap kihagyása {#if !isWelcomePage}<Check />{/if}
</button>

<style lang="scss">
  h1 {
    text-align: center;
    margin: 0;
    margin-top: 60px;
    font-size: 3em;
    font-weight: 600;
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
  }

  .entries-wrapper {
    max-width: clamp(400px, 40vw, 600px);
    position: relative;
    margin: auto;
    padding-top: 50px;
  }

  button {
    position: absolute;
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

    &.active {
      opacity: 1;
    }
  }
</style>
