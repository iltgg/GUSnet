<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { get } from "svelte/store";
  // import { characterData } from "../../../universeData";

  export let nodeData;
  export let props;
  export let characterData;

  let data0 = "main";
  let data1;

  let value = null;
  let error = false;

  const dispatch = createEventDispatcher();

  function validateNumber() {
    if (!/^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/.test(value)) {
      // validate number field
      error = true;
      return;
    }
    error = false;
    $characterData.characters[nodeData.characterId].data[data0][data1] = value;
    sendChange();
  }

  function sendChange() {
    dispatch("edit", {
      dataName: props.data,
      data: $characterData.characters[nodeData.characterId].data[data0][data1],
    });
  }

  onMount(() => {
    let data = props.data.split(".");
    if (data.length > 1) {
      data0 = data[0];
      data1 = data[1];
    } else {
      data1 = data[0];
      props.data = `main.${props.data}`;
    }

    value =
      get(characterData).characters[nodeData.characterId].data[props.data];
  });
</script>

<div class={"type number-field " + props.style} class:error>
  {props.label}
  <input type="number" bind:value on:input={validateNumber} disabled={!nodeData.edit}/>
</div>
