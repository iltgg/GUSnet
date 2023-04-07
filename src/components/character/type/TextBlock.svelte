<script>
  import { createEventDispatcher, onMount } from "svelte";
  // import { characterData } from "../../../universeData";

  export let nodeData;
  export let props;
  export let characterData;

  let data0 = "main";
  let data1;

  const dispatch = createEventDispatcher();

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
  });
</script>

<div class={"type text-block " + props.style}>
  {props.label}
  <textarea
    name={props.data}
    cols="30"
    rows="10"
    bind:value={$characterData.characters[nodeData.characterId].data[data0][
      data1
    ]}
    on:input={sendChange}
    disabled={!nodeData.edit}
  />
</div>
