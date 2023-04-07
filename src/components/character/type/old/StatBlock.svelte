<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  // import { characterData } from "../../../universeData";
  import { extension } from "../../../extensions/ExtensionManager";
  import { get } from "svelte/store";
  import type { node } from "../../../layouts/templateTypes";

  export let nodeData;
  // export let props;
  export let node: node;
  export let characterData;

  // let data0 = "main";
  // let data1;

  let cache;
  let value;

  let error = false;

  $: {
    cache = getPath(
      node.data,
      $characterData.characters[nodeData.characterId].data
    );
  }

  // let value;
  // let method = props.method.split(".");
  // let modifier = extension.extensions[method[0]].methods[method[1]];
  // $: modifierNumber = modifier(value);
  // let error = false;

  const dispatch = createEventDispatcher();

  // function validateNumber() {
  //   if (!/^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/.test(value)) {
  //     // validate number field
  //     error = true;
  //     return;
  //   }
  //   error = false;
  //   $characterData.characters[nodeData.characterId].data[data0][data1] = value;
  //   sendChange();
  // }

  function sendChange() {
    dispatch("edit", {
      dataName: node.data,
      data: value,
    });
  }

  function inputChange() {
    if (!/^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/.test(value)) {
      // validate number field
      error = true;
      return;
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
  });

  function getPath(path: string, characterData): any {
    return path.split(".").reduce((obj, next) => obj[next], characterData);
  }

  // onMount(() => {
  //   let data = props.data.split(".");
  //   if (data.length > 1) {
  //     data0 = data[0];
  //     data1 = data[1];
  //   } else {
  //     data1 = data[0];
  //     props.data = `main.${props.data}`;
  //   }

  //   value =
  //     get(characterData).characters[nodeData.characterId].data[data0][data1];
  // });
</script>

<div
  class={"type stat-block " + (node.style ? node.style : "")}
  style={`position: absolute; top: ${node.y}em; left: ${node.x}em`}
  class:error
>
  {node.label}
  <input
    type="number"
    bind:value
    on:input={inputChange}
    disabled={!nodeData.edit}
  />
  {modifierNumber}
</div>
