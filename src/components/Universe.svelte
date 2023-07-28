<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { add, cloneDeep } from "lodash-es";
  import { movable } from "@svelte-put/movable";
  import { resize, type ResizeDetail } from "@svelte-put/resize";
  import { shortcut } from "@svelte-put/shortcut";

  import {
    universeData,
    characterData,
    characterDataLocal,
    loadUniverse,
    addCharacter,
    getUsernames,
  } from "../universeData";
  import { userData } from "../userData";
  import { template } from "./character/templates/TemplateManager";
  import { DiceRoller } from "../tools/diceRoller";

  import Selector from "./character/Selector.svelte";
  let Character;
  // import Character from "./character/Character.svelte";

  // DEV

  // import { template } from "./character/templates/TemplateManager";
  import { writable } from "svelte/store";
  const devCopy = cloneDeep(template.templates["Cleared Waters"]);
  const dev = writable({
    characters: { 777: devCopy },
  });

  export let params;
  let unsubscribe = [];

  onMount(async () => {
    if (params.universeId !== "DEV")
      unsubscribe = await loadUniverse(params.universeId);

    Character = (await import("./character/Character.svelte")).default;
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

  $: admins = getUsernames($universeData.admins);
  $: players = getUsernames($universeData.players);
  $: viewers = getUsernames($universeData.viewers);

  let name = "";
  let sheet = "";
  let createError = "";
  let characterCreate = false;
  let universeInfo = false;
  let showTools = false;
  const tools = { diceRoller: false, diceTips: true };
  let handle;

  $: ROLLER = new DiceRoller($universeData.fields?.diceHook);
  let roll = "";

  function createCharacter() {
    if (sheet === "" || name === "") {
      createError = "select sheet and/or name";
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
    // displayCharacter = event.detail;
    setDisplayCharacter(event.detail);
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
    if ($characterData.characters[id].owner === $userData.user.uid) {
      lastActiveOwnedCharacter = id;
      // console.log("fsdfsdf");
    }
  }

  let displayCharacter = null;
  let lastActiveOwnedCharacter = null;

  $: lastActiveOwnedCharacterName = lastActiveOwnedCharacter
    ? $characterData.characters[lastActiveOwnedCharacter].data.name
    : "Gus";

  let rollError = "";

  let modalInput;

  function onResized(e: CustomEvent<ResizeObserver>) {
    const { entry } = e.detail;
    const target = entry.target as HTMLElement;
    target.style.fontSize = `${Math.max(
      Math.floor(
        (Math.min(
          entry.borderBoxSize[0].inlineSize,
          entry.borderBoxSize[0].blockSize
        ) /
          269) *
          10
      ) / 10,
      1
    )}em`;
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: "q",
      modifier: ["ctrl"],
      callback: () => {
        modalInput.focus();
      },
    },
  }}
  use:shortcut={{
    trigger: {
      key: "r",
      modifier: ["alt"],
      callback: () => {
        tools.diceRoller = !tools.diceRoller;
      },
    },
  }}
/>

<article>
  <div class="sidepanel">
    <h1>
      {$universeData.name}
    </h1>
    <button
      on:click={() => {
        universeInfo = !universeInfo;
      }}>info</button
    >
    <!-- Universe Info -->
    {#if universeInfo}
      <div class="panel">
        <button
          class="secondary"
          on:click={() => {
            console.log(admins, players, viewers, $universeData, $userData);
          }}>log info</button
        >
        <h3>Admins:</h3>
        {#await admins then admins}
          {#each Object.values(admins) as admin}
            {admin} <br />
          {/each}
        {/await}
        <h3>Players:</h3>
        {#await players then players}
          {#each Object.values(players) as player}
            {player} <br />
          {/each}
        {/await}
        <h3>Viewers:</h3>
        {#await viewers then viewers}
          {#each Object.values(viewers) as viewer}
            {viewer} <br />
          {/each}
        {/await}
        <h3>Id:</h3>
        {$universeData.id}<br />
        <h3>Password:</h3>
        {$universeData.password}
      </div>
    {/if}
    <button
      on:click={() => {
        showTools = !showTools;
      }}>tools</button
    >
    {#if showTools}
      <div class="panel">
        <button
          class="secondary"
          on:click={() => {
            tools.diceRoller = !tools.diceRoller;
          }}
        >
          dice roller
        </button>
      </div>
    {/if}
    {#if tools.diceRoller}
      <div
        class="modal small resize"
        use:movable={{ handle, limit: { parent: "screen" } }}
        use:resize
        on:resized={onResized}
      >
        <span class="handle" bind:this={handle}>
          Dice Roller
          <button
            on:click={() => {
              tools.diceRoller = !tools.diceRoller;
            }}>x</button
          >
        </span>
        <div class="body">
          <div class="name">Rolling for: {lastActiveOwnedCharacterName}</div>
          <form
            on:submit|preventDefault={() => {
              rollError = ROLLER.roll(
                lastActiveOwnedCharacterName,
                $userData.username,
                "",
                roll,
                ""
              );
            }}
          >
            <input
              type="text"
              bind:value={roll}
              placeholder="insert roll, enter to submit"
              bind:this={modalInput}
            />
            <input type="submit" value="roll" />
          </form>
          <p class="error">{rollError}</p>
          {#if tools.diceTips}
            <p>Roll syntax:</p>
            <p><b>[x]</b>d<b>[y]</b><i>(adv/dis [a])(+/- [b])</i></p>
            <p>e.g. 1d10adv4+2</p>
            <p>e.g. d14-2 (x is optional)</p>
            <p>large values may freeze your browser</p>
            <p>ctrl+q focus roll input</p>
            <p>alt+r to show hide roller</p>
          {/if}
        </div>
      </div>
    {/if}

    <button
      on:click={() => {
        createError = "";
        characterCreate = !characterCreate;
      }}
      disabled={$universeData.players
        ? !$universeData.players.includes($userData.user.uid)
        : true}>add character</button
    >
    <!-- Character Creator -->
    {#if characterCreate}
      <div class="create panel">
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
          <span class="error">{createError}</span>
        </form>
      </div>
    {/if}
    <!-- Character Selectors -->
    <h2>Your Characters</h2>
    {#each Object.keys($characterData.characters) as id}
      {#if $characterData.characters[id].owner === $userData.user.uid}
        <Selector
          {id}
          name={$characterData.characters[id].data.name}
          on:open={openCharacter}
        />
      {/if}
    {/each}
    <h2>Characters</h2>
    {#each Object.keys($characterData.characters) as id}
      {#if $characterData.characters[id].owner !== $userData.user.uid}
        <Selector
          {id}
          name={$characterData.characters[id].data.name}
          on:open={openCharacter}
        />
      {/if}
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
        <div
          class="character"
          style:display={displayCharacter === id ? "flex" : "none"}
        >
          <Character
            characterId={id}
            universeId={$universeData.id}
            {characterData}
            {characterDataLocal}
            edit={$characterData.characters[id].owner === $userData.user.uid}
          />
        </div>
      {/each}
    {/key}
    <!-- DEV -->
    <!-- {#if params.universeId === "DEV"}
      <div class="character">
          <Character
            characterId={777}
            universeId={$universeData.id}
            characterData={dev}
            characterDataLocal={dev}
            edit={true}
          /> -->
    <!-- {#each [...Array(30).keys()] as i}
          {#each [...Array(25).keys()] as j}
            <span class="dot" style={`top: ${i * 5}rem; left: ${j * 5}rem`}>
              {j * 5} <br> {i * 5}
            </span>
          {/each}
        {/each} -->
    <!-- </div>
    {/if} -->
  </div>
</article>

<style>
  /* .dot {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: white;
    color: black;
    z-index: 0;
    font-size: 0.5em;
    line-height: 0.5rem;
  } */
</style>
