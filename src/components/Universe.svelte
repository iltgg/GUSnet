<script>
  import { onMount, onDestroy } from "svelte";
  import { add, cloneDeep } from "lodash-es";

  import {
    universeData,
    characterData,
    loadUniverse,
    addCharacter,
  } from "../universeData";
  import { userData } from "../userData";
  import { template } from "./character/templates/TemplateManager";

  import Selector from "./character/Selector.svelte";
  import Character from "./character/Character.svelte";

  // DEV

  // import { template } from "./character/templates/TemplateManager";
  import { writable } from "svelte/store";
  const devCopy = cloneDeep(template.templates.cwcyber);
  const dev = writable({
    characters: { 777: devCopy },
  });

  export let params;
  let unsubscribe = [];

  onMount(async () => {
    if (params.universeId !== "DEV")
      unsubscribe = await loadUniverse(params.universeId);
  });

  onDestroy(() => {
    unsubscribe.forEach((f) => {
      try {
        f();
      } catch (error) {
        console.error(error);
      }
    });
  });

  let name = "";
  let sheet = "";
  let createError = "";
  let characterCreate = false;

  function createCharacter() {
    if (sheet === "" || name === "") {
      return;
    }

    const clone = cloneDeep(template.templates[sheet]);
    clone.data.name = name;
    clone.owner = $userData.user.uid;
    addCharacter($universeData.id, clone);

    name = "";
    sheet = "";
    createError = "";
    characterCreate = false;
  }

  let openCharacters = [];

  function openCharacter(event) {
    displayCharacter = event.detail;
    if (openCharacters.includes(event.detail)) return;

    openCharacters.push(event.detail);
    openCharacters = openCharacters;
  }

  function closeCharacter(id) {
    let i = openCharacters.indexOf(id);

    if ((id = displayCharacter)) {
      if (openCharacters.length === 1) {
        displayCharacter = null;
      } else {
        if (i === 0) {
          displayCharacter = openCharacters[i + 1];
        } else {
          displayCharacter = openCharacters[i - 1];
        }
      }
    }

    openCharacters.splice(i, 1);
    openCharacters = openCharacters;
  }

  function setDisplayCharacter(id) {
    displayCharacter = id;
  }

  let displayCharacter = null;
</script>

<article>
  <div class="sidepanel">
    <h1>
      {$universeData.name}
    </h1>
    <button
      on:click={() => {
        characterCreate = !characterCreate;
      }}>add character</button
    >
    <!-- Character Creator -->
    {#if characterCreate}
      <div class="create">
        <form on:submit|preventDefault={createCharacter}>
          <label>
            Sheet Template:
            <select bind:value={sheet} name="sheet">
              {#each template.templateList as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
          </label>
          <label>
            Character Name:
            <input
              type="text"
              name="name"
              bind:value={name}
              placeholder="name"
            />
          </label>
          <input type="submit" value="create" />
        </form>
      </div>
    {/if}
    <!-- Character Selectors -->
    {#each Object.keys($characterData.characters) as id}
      <Selector
        {id}
        name={$characterData.characters[id].data.name}
        on:open={openCharacter}
      />
    {/each}
  </div>

  <div class="viewport">
    <div class="top-bar">
      {#key openCharacters.length}
        {#each openCharacters as id (id)}
          {#if id == displayCharacter}
            <span
              class="tab active"
              on:click={() => {
                setDisplayCharacter(id);
              }}
              on:keypress={() => {
                setDisplayCharacter(id);
              }}
              ><span class="text"
                >{$characterData.characters[id].data.name}</span
              >
              <button
                class="remove"
                on:click={() => {
                  closeCharacter(id);
                }}>×</button
              ></span
            >
          {:else}
            <span
              class="tab"
              on:click={() => {
                setDisplayCharacter(id);
              }}
              on:keypress={() => {
                setDisplayCharacter(id);
              }}
              ><span class="text"
                >{$characterData.characters[id].data.name}</span
              >
              <button
                class="remove"
                on:click={() => {
                  closeCharacter(id);
                }}>×</button
              ></span
            >
          {/if}
        {/each}
      {/key}
    </div>

    {#key openCharacters.length}
      {#each openCharacters as id (id)}
        <!-- {#if displayCharacter} -->
        <div
          class="character"
          style:display={displayCharacter === id ? "flex" : "none"}
        >
          <Character
            characterId={id}
            universeId={$universeData.id}
            {characterData}
            edit={$characterData.characters[id].owner === $userData.user.uid}
          />
        </div>
        <!-- {/if} -->
      {/each}
    {/key}
    <!-- DEV -->
    {#if params.universeId === "DEV"}
      <div class="character">
        <Character
          characterId={777}
          universeId={$universeData.id}
          characterData={dev}
          edit={true}
        />
        <!-- {#each [...Array(30).keys()] as i}
          {#each [...Array(25).keys()] as j}
            <span class="dot" style={`top: ${i * 5}rem; left: ${j * 5}rem`}>
              {j * 5} <br> {i * 5}
            </span>
          {/each}
        {/each} -->
      </div>
    {/if}
  </div>
</article>

<style>
  .dot {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: white;
    color: black;
    z-index: 0;
    font-size: 0.5em;
    line-height: 0.5rem;
  }
</style>
