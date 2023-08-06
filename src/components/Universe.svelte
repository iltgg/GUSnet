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
    updateCharacter,
  } from "../universeData";
  import { userData } from "../userData";
  import { template } from "./character/templates/TemplateManager";
  import { compressLayout } from "../character";
  import { DiceRoller } from "../tools/diceRoller";

  import Selector from "./character/Selector.svelte";
  let Character;
  // import Character from "./character/Character.svelte";

  // DEV

  // import { template } from "./character/templates/TemplateManager";
  import { writable } from "svelte/store";
  // const devCopy = cloneDeep(template.templates["Cleared Waters"]);
  // const dev = writable({
  //   characters: { 777: devCopy },
  // });

  function previewStore(layout?: object) {
    if (!preview) preview = writable({ characters: {} });

    const temp = { characters: {} };

    temp.characters[lastActiveOwnedCharacter] = cloneDeep(
      $characterData.characters[lastActiveOwnedCharacter]
    );

    if (layout) {
      temp.characters[lastActiveOwnedCharacter].layout = layout;
    }

    preview.set(temp);

    preview.subscribe((value) => {
      console.log(value);
    })();

    return preview;
  }

  let preview;

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
  const tools = {
    diceRoller: false,
    diceTips: true,
    editor: false,
    bird: false,
  };
  let handle;
  let handle2;
  let handle3;
  let newJSON = "";
  let saveState = "";

  $: ROLLER = new DiceRoller($universeData.fields?.diceHook);
  let rollMode = "type";
  let roll = "";
  let selectRoll = {
    x: 1,
    y: 6,
    adv: "",
    a: null,
    b: 0,
  };

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
    if ($characterData.characters[id]?.owner === $userData.user.uid) {
      lastActiveOwnedCharacter = id;

      lastActiveOwnedCharacterJSON = lastActiveOwnedCharacter
        ? { json: $characterData.characters[lastActiveOwnedCharacter].layout }
        : { json: { placeholder: "select owned character" } };
    }
  }

  let displayCharacter = null;
  let lastActiveOwnedCharacter = null;

  $: lastActiveOwnedCharacterName = lastActiveOwnedCharacter
    ? $characterData.characters[lastActiveOwnedCharacter].data.name
    : "Gus";

  let lastActiveOwnedCharacterJSON = lastActiveOwnedCharacter
    ? { json: $characterData.characters[lastActiveOwnedCharacter].layout }
    : { json: { placeholder: "select owned character" } };

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
  use:shortcut={{
    trigger: {
      key: "a",
      modifier: ["alt"],
      callback: () => {
        tools.diceTips = !tools.diceTips;
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
        <button
          class="secondary"
          on:click={() => {
            tools.bird = !tools.bird;
          }}
        >
          flappy bird
        </button>
        <button
          class="secondary"
          on:click={() => {
            tools.editor = !tools.editor;
          }}
        >
          advanced editor
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
          <button
            on:click={() => {
              if (rollMode === "mouse") rollMode = "type";
              else rollMode = "mouse";
            }}>mode switch</button
          >
          {#if rollMode === "mouse"}
            <form
              on:submit|preventDefault={() => {
                rollError = ROLLER.roll(
                  lastActiveOwnedCharacterName,
                  $userData.username,
                  "",
                  `${selectRoll.x}d${selectRoll.y}${selectRoll.adv}${
                    selectRoll.adv && selectRoll.a !== null ? selectRoll.a : ""
                  }${selectRoll.b > 0 ? "+" : ""}${
                    selectRoll.b !== 0 ? selectRoll.b : ""
                  }`,
                  ""
                );
              }}
            >
              <div>
                {`${selectRoll.x}d${selectRoll.y}${selectRoll.adv}${
                  selectRoll.adv && selectRoll.a !== null ? selectRoll.a : ""
                }${selectRoll.b > 0 ? "+" : ""}${
                  selectRoll.b !== 0 ? selectRoll.b : ""
                }`}
              </div>
              <div
                class="roll"
                on:change={(e) => {
                  if (selectRoll.x < 0 || selectRoll.x === null) {
                    selectRoll.x = 0;
                  }
                  if (selectRoll.y < 0 || selectRoll.y === null) {
                    selectRoll.y = 0;
                  }
                  if (selectRoll.a < 1 || selectRoll.a === null) {
                    selectRoll.a = null;
                  }
                  if (selectRoll.b === null) {
                    selectRoll.b = 0;
                  }
                }}
              >
                <input
                  type="number"
                  class="roll"
                  placeholder="x"
                  bind:value={selectRoll.x}
                  bind:this={modalInput}
                />
                d
                <input
                  type="number"
                  class="roll"
                  placeholder="y"
                  bind:value={selectRoll.y}
                />
                <select name="" id="" class="roll" bind:value={selectRoll.adv}>
                  <option value="" />
                  <option value="adv">adv</option>
                  <option value="dis">dis</option>
                </select>
                <input
                  type="number"
                  name=""
                  id=""
                  class="roll"
                  bind:value={selectRoll.a}
                  disabled={selectRoll.adv.length < 1}
                />
                <input
                  type="number"
                  name=""
                  id=""
                  class="roll wide"
                  bind:value={selectRoll.b}
                />
              </div>
              <div>
                <input type="submit" value="roll" />
              </div>
            </form>
          {/if}
          {#if rollMode === "type"}
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
              <div class="text">
                <input
                  type="text"
                  bind:value={roll}
                  placeholder="insert roll, enter to submit"
                  bind:this={modalInput}
                />
                <input type="submit" value="roll" />
              </div>
            </form>
          {/if}
          <p class="error">{rollError}</p>
          {#if tools.diceTips}
            <p>Roll syntax:</p>
            <p><b>[x]</b>d<b>[y]</b><i>(adv/dis [a])(+/- [b])</i></p>
            <p>e.g. 1d10adv4+2</p>
            <p>e.g. d14-2 (x is optional)</p>
            <p>large values may freeze your browser</p>
            <p>ctrl+q focus roll input</p>
            <p>alt+r to show hide roller</p>
            <p>alt+a to hide tips</p>
          {/if}
        </div>
      </div>
    {/if}
    {#if tools.bird}
      <div
        class="modal bird"
        use:movable={{ handle: handle2, limit: { parent: "screen" } }}
      >
        <span class="handle" bind:this={handle2}>
          Flappy Bird
          <button
            on:click={() => {
              tools.bird = !tools.bird;
            }}>x</button
          >
        </span>
        <div class="body">
          <iframe
            src="https://aaarafat.github.io/JS-Flappy-Bird/index.html"
            frameborder="0"
            title="flappy bird"
          />
        </div>
      </div>
    {/if}
    {#if tools.editor}
      <div
        class="modal small"
        use:movable={{ handle: handle3, limit: { parent: "screen" } }}
      >
        <span class="handle" bind:this={handle3}>
          Advanced Editor (Jank)
          <button
            on:click={() => {
              if (openCharacters.indexOf("preview") >= 0) {
                closeCharacter("preview");
              } else if (openCharacters.indexOf("preview2") >= 0) {
                closeCharacter("preview2");
              }

              tools.editor = !tools.editor;
            }}>x</button
          >
        </span>
        <div class="body">
          Editing for {lastActiveOwnedCharacterName}
          {#if lastActiveOwnedCharacterName !== "Gus"}
            <button
              on:click={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(lastActiveOwnedCharacterJSON.json)
                );
              }}>copy layout JSON</button
            >
            <textarea
              name=""
              id=""
              cols="20"
              rows="10"
              bind:value={newJSON}
              placeholder="new JSON"
            />
            <button
              on:click={() => {
                try {
                  preview = previewStore(JSON.parse(newJSON));
                } catch {
                  alert("invalid JSON");
                  return;
                }
                preview = preview;

                let changeTo = "";

                if (openCharacters.indexOf("preview") >= 0) {
                  closeCharacter("preview");
                  openCharacters.push("preview2");
                  changeTo = "preview2";
                } else if (openCharacters.indexOf("preview2") >= 0) {
                  closeCharacter("preview2");
                  openCharacters.push("preview");
                  changeTo = "preview";
                } else {
                  openCharacters.push("preview");
                  changeTo = "preview";
                }

                openCharacters = openCharacters;

                setDisplayCharacter(changeTo);
              }}>preview</button
            >
            <p>{saveState}</p>
            <button
              on:click={() => {
                try {
                  JSON.parse(newJSON);
                } catch {
                  alert("invalid JSON");
                  return;
                }
                if (confirm("confirm save")) {
                  updateCharacter($universeData.id, lastActiveOwnedCharacter, {
                    layout: compressLayout(JSON.parse(newJSON)),
                  });
                  saveState =
                    "Change sent, close editor. Reopen character if no changes visible.";
                  console.log("change sent");
                } else {
                  saveState = "Change not sent";
                }
              }}>save</button
            >
            <p>
              Copy the layout of the last active owned character, modify it and
              paste into box. Preview to see changes. Possible to brick
              character if you save JSON that doesn't fit layout scheme.
            </p>
            <p>
              <b>Close the editor after you save.</b>
            </p>
            <p>
              Currently unable to set nested data keys on non-existent objects.
            </p>
            <p>Currently unable to create/modify pages.</p>
            <p>Documentation can be made if there is demand.</p>
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
                >{id.slice(0, 7) === "preview"
                  ? "preview"
                  : $characterData.characters[id].data.name}</span
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
                >{id.slice(0, 7) === "preview"
                  ? "preview"
                  : $characterData.characters[id].data.name}</span
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
          {#if id === "preview" || id === "preview2"}
            <Character
              characterId={lastActiveOwnedCharacter}
              universeId={$universeData.id}
              characterData={preview}
              characterDataLocal={preview}
              edit={false}
            />
          {:else}
            <Character
              characterId={id}
              universeId={$universeData.id}
              {characterData}
              {characterDataLocal}
              edit={$characterData.characters[id].owner === $userData.user.uid}
            />
          {/if}
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
