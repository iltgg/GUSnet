<script>
  import { beforeUpdate, onMount } from "svelte";
  import { debounce } from "lodash-es";

  import { updateCharacter } from "../../universeData";

  import Node from "./Node.svelte";

  export let universeId;
  export let characterId;
  export let characterData;
  export let characterDataLocal;
  export let edit = false;

  let updateStack = {};
  let debounced = debounce(sendUpdate, 5000, { maxWait: 10000 });
  let status = null;

  let advanced = false;
  let layoutIndex = 0;

  let pageIndex = 0;

  function sendUpdate() {
    updateCharacter(universeId, characterId, updateStack);

    // also maybe refactor the characterData to use a object of stores rather than a store?
    // seems to not want to work, would probably have to make it so it only subscribes to a certain document and passes that
    // but then that complicates other things like the character side bar.
    // probably leave for now
    // DEV
    // Object.keys(updateStack).forEach((data) => {
    //   let full = $characterData;
    //   let ref = full.characters[characterId];
    //   let split = data.split(".");
    //   let final = split[split.length - 1];

    //   split.pop();

    //   ref = split.reduce(
    //     (obj, next) => obj[next],
    //     $characterData.characters[characterId]
    //   );

    //   // console.log(ref, split, final);
    //   ref[final] = updateStack[data];

    //   characterData.set(full);
    // });
    // DEV

    // console.log(updateStack);
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
    
    // now we maintain a local store which is reset to current version every time firebase detects a change

    let data = "data." + event.detail.dataName;
    let full = $characterDataLocal;
    let ref = full.characters[characterId];
    let split = data.split(".");
    let final = split[split.length - 1];

    split.pop();

    ref = split.reduce(
      (obj, next) => obj[next],
      $characterDataLocal.characters[characterId]
    );

    // console.log(ref, split, final);
    ref[final] = updateStack[data];

    characterDataLocal.set(full);
    
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

<!-- <input type="number" bind:value={pageIndex}> -->

{#if $characterData.characters[characterId].pages.length > 0}
  <div class="page-list">
    {#each $characterData.characters[characterId].pages as page, i}
      <button
        class={i === pageIndex ? "active" : ""}
        on:click={() => {
          pageIndex = i;
        }}>{page}</button
      >
    {/each}
  </div>
{/if}

{#each $characterData.characters[characterId].layout as page, i}
  <!-- <Node
    node={$characterData.characters[characterId].layout[node]}
    nodeData={{ universeId: universeId, characterId: characterId, edit: edit }}
    {characterData}
    on:edit={debounceUpdate}
  /> -->
  {#if i === pageIndex}
    {#each page as node}
      <Node
        {node}
        nodeData={{
          universeId: universeId,
          characterId: characterId,
          edit: edit,
        }}
        {characterData}
        {characterDataLocal}
        on:edit={debounceUpdate}
      />
      <!-- {node} -->
    {/each}
  {/if}
{/each}

<style lang="scss">
  .page-list {
    position: sticky;
    left: 0;
    top: 0;
    width: fit-content;
    height: fit-content;
    // border-bottom: 2px solid var(--gutter-grey);
    background-color: var(--gutter-grey);
    opacity: 0.5;
    // padding-bottom: 0.4rem;
    padding: 0.4rem;
    border-bottom-right-radius: 0.2em;

    display: flex;
    flex-direction: row;
    // background-color: var(--ui-one);

    z-index: 99;
    
    &:hover{
      opacity: 1;
      transition: all 0.05s ease-in-out;
    }
    
    button {
      // margin: 0 0 1em 0;
      margin: 0 1em 0 0;
      &:last-child {
        margin: 0;
      }
      &.active {
        outline: 1px solid var(--accent-medium);
      }
    }
  }
</style>
