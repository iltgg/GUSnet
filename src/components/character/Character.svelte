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

  let advanced = false;
  let layoutIndex = 0;

  function sendUpdate() {
    // updateCharacter(universeId, characterId, updateStack);

    // also maybe refactor the characterData to use a object of stores rather than a store?
    // DEV
    Object.keys(updateStack).forEach((data) => {
      let full = $characterData;
      let ref = full.characters[characterId];
      let split = data.split(".");
      let final = split[split.length - 1];

      split.pop();

      ref = split.reduce(
        (obj, next) => obj[next],
        $characterData.characters[characterId]
      );

      // console.log(ref, split, final);
      ref[final] = updateStack[data];

      characterData.set(full);
    });
    // DEV

    console.log(updateStack);
    updateStack = {};
    window.onbeforeunload = undefined;
    status = true;
  }

  function debounceUpdate(event) {
    updateStack["data." + event.detail.dataName] = event.detail.data;

    // Questionable code, but the idea is sound
    // Since no longer directly modifying store in fields want to update in debounce update
    // so watchers can leverage data immediately rather than wait for update.
    // makes rapid inputs laggy, probably best to implement some form of cache store
    // let data = "data." + event.detail.dataName;
    // let full = $characterData;
    // let ref = full.characters[characterId];
    // let split = data.split(".");
    // let final = split[split.length - 1];

    // split.pop();

    // ref = split.reduce(
    //   (obj, next) => obj[next],
    //   $characterData.characters[characterId]
    // );

    // // console.log(ref, split, final);
    // ref[final] = updateStack[data];

    // characterData.set(full);
    // // end sketchy code

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

{#if advanced === true}
  <div class="advanced">
    {$characterData.characters[characterId].layout[layoutIndex]}

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
