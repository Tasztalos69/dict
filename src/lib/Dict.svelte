<script lang="ts">
  import axios from "axios";
  import type { Entry } from "src/types";

  const typeHuman = {
    fonev: "fn",
    melleknev: "mn",
    ige: "ige",
  };

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
    {#each entries as entry}
      <p>{entry.word}</p>
      <p>{typeHuman[entry.type]}</p>
      <p>{entry.definition}</p>
    {/each}
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
</style>
