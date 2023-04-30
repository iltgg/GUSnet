<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let nodeData;
  export let node;
  export let characterData;

  export let nodeProps;

  let cache;
  let value;

  $: {
    cache = getPath(
      node.data,
      $characterData.characters[nodeData.characterId].data
    );
  }

  const dispatch = createEventDispatcher();

  function sendChange() {
    dispatch("edit", {
      dataName: node.data,
      data: value,
    });
  }

  function inputChange() {
    // if (value !== cache) {
    sendChange();
    // }
  }

  onMount(() => {
    cache = getPath(
      node.data,
      $characterData.characters[nodeData.characterId].data
    );
    value = cache;
  });

  function getPath(path: string, characterData): any {
    return path.split(".").reduce((obj, next) => obj[next], characterData);
  }
</script>

<div
  class={"type field checkbox " +
    (node.style ? node.style : "") +
    " " +
    (nodeProps?.style ? nodeProps?.style : "")}
  style={!nodeProps?.posOverride
    ? `position: absolute; top: ${node.y}em; left: ${node.x}em`
    : ""}
>
  <label>
    <span class="text">{node.label} | {value} | {cache}</span>
    <input
      type="checkbox"
      bind:checked={value}
      on:change={inputChange}
      disabled={!nodeData.edit}
    />
    <span class="custom" />
  </label>
</div>
