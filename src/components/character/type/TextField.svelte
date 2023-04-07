<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  // import { characterData } from "../../../universeData";

  export let nodeData;
  // export let props;
  export let node;
  export let characterData;

  // let data0 = "main";
  // let data1;

  let cache;
  let value;

  $: {
    cache = getPath(node.data, $characterData.characters[nodeData.characterId].data);
  }

  const dispatch = createEventDispatcher();

  function sendChange() {
    dispatch("edit", {
      dataName: node.data,
      data: value,
    });
  }

  function inputChange() {
    if (value !== cache) {
      sendChange();
    }
  }

  onMount(() => {
    //   let data = props.data.split(".");
    //   if (data.length > 1) {
    //     data0 = data[0];
    //     data1 = data[1];
    //   } else {
    //     data1 = data[0];
    //     props.data = `main.${props.data}`;
    //   }
    // }
    cache = getPath(node.data, $characterData.characters[nodeData.characterId].data);
  });

  function getPath(path: string, characterData): any {
    return path
      .split(".")
      .reduce(
        (obj, next) => obj[next],
        characterData
      );
  }
</script>

<!-- <div class={"type text-field " + props.style}>
  {props.label}
  <input
    type="text"
    bind:value={$characterData.characters[nodeData.characterId].data[data0][
      data1
    ]}
    on:input={sendChange}
    disabled={!nodeData.edit}
  />
</div> -->
<div class={"type text-field " + (node.style ? node.style : "")} style={`position: absolute; top: ${node.y}em; left: ${node.x}em`}>
  {node.label}
  <input
    type="text"
    bind:value
    on:input={inputChange}
    disabled={!nodeData.edit}
  />
  <!-- {cache} | {value} | {$characterData.characters[nodeData.characterId].data.name} -->
</div>
