<script>
    import { createEventDispatcher, onMount } from "svelte";
  
    export let nodeData;
    export let props;
    export let characterData;
  
    let data0 = "main";
    let data1;
  
    const dispatch = createEventDispatcher();
  
    function sendChange() {
      dispatch("edit", {
        dataName: props.data,
        data: !$characterData.characters[nodeData.characterId].data[data0][data1], // bind seems to set store after on:input fires?
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
  
  <div class={"type on-off " + props.style}>
  <label>
        {props.label}
        <input
          type="checkbox"
          bind:checked={$characterData.characters[nodeData.characterId].data[data0][
            data1
          ]}
          on:input={sendChange}
          disabled={!nodeData.edit}
        />
        <span class="custom"></span>
  </label >
  </div>
  