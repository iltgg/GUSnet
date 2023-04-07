<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { updateSvg } from "jdenticon";

  export let name;
  export let id;

  onMount(() => {
    updateSvg(`#jd-${id}`, id);
  });

  const dispatch = createEventDispatcher();
</script>

<div
  class="character-selector"
  on:click={() => {
    dispatch("open", id);
  }}
  on:keyup={() => {
    dispatch("open", id);
  }}
>
  <svg class="identicon-character" id={`jd-${id}`} />
  <span class="name">{name}</span >
</div>
