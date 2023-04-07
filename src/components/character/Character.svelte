<script>
  import { beforeUpdate, onMount } from "svelte";
  import { debounce } from "lodash-es";

  import { updateCharacter } from "../../universeData";

  import Node from "./Node.svelte";

  export let universeId;
  export let characterId;
  export let characterData;
  export let edit = false;

  let updateStack = {};
  let debounced = debounce(sendUpdate, 5000, { maxWait: 10000 });
  let status = null;

  function sendUpdate() {
    updateCharacter(universeId, characterId, updateStack);
    // $characterData.characters[characterId].data.name = updateStack["data.name"];
    // need a way to test in dev
    // also maybe refactor the characterData to use a object of stores rather than a store?
    
    console.log(updateStack);
    updateStack = {};
    window.onbeforeunload = undefined;
    status = true;
  }

  function debounceUpdate(event) {
    updateStack["data." + event.detail.dataName] = event.detail.data;
    status = false;
    window.onbeforeunload = function () {
      return "you have unsaved changes";
    };
    debounced();
  }
</script>

{#if status !== null}
  <div class="update-status" class:wait={!status}>
    {#if !status}
      <span class="loader" />
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
        ><path
          d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
    l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
        /></svg
      >
    {/if}
  </div>
{/if}

{#each $characterData.characters[characterId].layout as node}
  <!-- <Node
    node={$characterData.characters[characterId].layout[node]}
    nodeData={{ universeId: universeId, characterId: characterId, edit: edit }}
    {characterData}
    on:edit={debounceUpdate}
  /> -->
  <Node
    {node}
    nodeData={{ universeId: universeId, characterId: characterId, edit: edit }}
    {characterData}
    on:edit={debounceUpdate}
  />
  <!-- {node} -->
{/each}
