<script lang="ts">
  import ArrowNarrowRight from "./lib/ArrowNarrowRight.svelte";
  import { fade } from "svelte/transition";
  import Dict from "./lib/Dict.svelte";

  let isWelcomePage: boolean = !!!localStorage.getItem("isOpenerDisabled");

  const openDict = () => {
    isWelcomePage = false;
  };
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Oswald:wght@500;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap"
  rel="stylesheet"
/>

{#if isWelcomePage}
  <div class="opening" out:fade={{ duration: 500 }}>
    <h1>glossza</h1>
    <h3>Random szavak gyűjteménye, amik jól hangzanak.</h3>
    <button on:click={openDict}>A glossza feltárása <ArrowNarrowRight /></button
    >
  </div>
{:else}
  <Dict />
{/if}

<style global lang="scss">
  body {
    background: #eee;
  }

  * {
    color: #202020;
    margin: 0;
    padding: 0;
  }

  .opening {
    margin-top: 50vh;
    transform: translateY(-50%);
    position: relative;
    text-align: center;
    color: #202020;

    h1 {
      text-align: center;
      margin: 0;
      margin-bottom: 60px;
      font-size: 4rem;
      font-weight: 600;
      font-family: "Oswald", sans-serif;
      text-transform: uppercase;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      font-family: "Baskervville", serif;
      font-style: italic;
      letter-spacing: 1px;
      color: #555;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      margin: 0;
      padding: 0;
      margin-top: 30vh;
      background: none;
      border: none;
      color: inherit;
      font-family: "Oswald", sans-serif;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 1.4rem;
      cursor: pointer;

      &:after {
        content: "";
        height: 5px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        background: #202020;
        transition: 0.1s all ease-in-out;
      }

      &:hover {
        &:after {
          width: 120%;
        }
      }
    }
  }
</style>
