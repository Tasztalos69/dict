<script>
  export let size = 24;
  export let color = "currentColor";
  export let strokeWidth = 2;

  import { draw } from "svelte/transition";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-check"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  stroke={color}
  stroke-width={strokeWidth}
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    in:draw={{ duration: 400 }}
    out:draw={{ duration: 400 }}
    d="M5 12l5 5l10 -10"
  />
</svg>

<style lang="scss">
  .icon {
    margin-left: 5px;
  }
</style>
