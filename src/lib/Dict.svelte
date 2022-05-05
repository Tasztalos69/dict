<script lang="ts">
  import axios from "axios";
  import type { Entry } from "src/types";
  import EntryCard from "./EntryCard.svelte";

  const fetchData = async (): Promise<Entry[]> => {
    const { data } = await axios.get("http://192.168.0.185:8055/items/words");

    return data.data;
  };

  let promise = fetchData();
</script>

<main>
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
    max-width: 20vw;
    position: relative;
    margin: auto;
    padding-top: 50px;
  }
</style>
