<script lang="ts">
  import type { Entry } from "src/types";

  export let entry: Entry;

  const typeHuman = {
    fonev: "fn",
    melleknev: "mn",
    ige: "ige",
  };
</script>

<div class="entry">
  <h3>{entry.word} <span>({typeHuman[entry.type]})</span></h3>
  <p>{entry.definition}</p>
</div>

<style lang="scss">
  .entry {
    background: #eee;
    margin: 50px 0;
    padding: 20px;
    box-shadow: 0px 0px 20px 3px rgba(#202020, 0);
    transition: 0.3s all ease-in-out;

    &:hover {
      box-shadow: 0px 0px 20px 1px rgba(#202020, 0.3);
    }

    h3 {
      font-family: "Source sans pro", sans-serif;
      font-weight: 600;
      text-transform: capitalize;

      span {
        font-weight: 400;
        text-transform: lowercase;
      }
    }

    p {
      font-size: 1.2rem;
      margin-top: 10px;
    }
  }
</style>
