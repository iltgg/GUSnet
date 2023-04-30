<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let nodeData;
  export let node;
  export let characterData;

  export let nodeProps;

  let cache;
  let value;

  let error = false;

  let step = true; // for "step edit mode"

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
    if (nodeProps.regex) {
      if (!nodeProps.regex.test(value)) {
        error = true;
        return;
      }
    }
    error = false;

    if (value !== cache) {
      sendChange();
    }
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
  class={"type field " +
    (node.style ? node.style : "") +
    " " +
    (nodeProps.style ? nodeProps.style : "")}
  style={!nodeProps?.posOverride
    ? `position: absolute; top: ${node.y}em; left: ${node.x}em`
    : ""}
  class:error
>
  {node.label}
  {#if nodeProps.type === "textarea"}
    <textarea
      name={node.data}
      cols="30"
      rows="10"
      bind:value
      on:input={inputChange}
      disabled={!nodeData.edit}
    />
  {:else if nodeProps.type === "text"}
    <input
      type="text"
      bind:value
      on:input={inputChange}
      disabled={!nodeData.edit}
    />
  {:else if nodeProps.type === "textStep"}
    <div
      on:click={() => {
        step = !step;
      }}
      on:keydown
    >
      <input
        type="text"
        bind:value
        on:input={inputChange}
        disabled={step || !nodeData.edit}
        on:click|stopPropagation
        style={step ? "cursor: default;" : ""}
      />
    </div>
  {:else if nodeProps.type === "number"}
    <input
      type="number"
      bind:value
      on:input={inputChange}
      disabled={!nodeData.edit}
    />
  {/if}
  <!-- {value} | {cache} -->
</div>
