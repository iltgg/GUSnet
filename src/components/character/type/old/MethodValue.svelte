<script>
  import { clone, escapeRegExp } from "lodash-es";
  import { createEventDispatcher, onMount } from "svelte";
  import { get } from "svelte/store";
  // import { characterData } from "../../../universeData";
  import { extension } from "../../../extensions/ExtensionManager";

  export let nodeData;
  export let props;
  export let characterData;

  let data0 = "main";
  let data1;

  let methodPath;
  let method;
  let methodProps;
  let value;

  let loaded = false;

  $: {
    $characterData.characters[nodeData.characterId].data[data0][data1];
    if (loaded) {
      calculate();
    }
  }

  function calculate() {
    methodProps = clone(props.methodProps.data);
    props.methodProps.send.forEach((prop) => {
      let pdata0 = "main";
      let pdata1;
      let pdata = prop.data.split(".");
      if (pdata.length > 1) {
        pdata0 = pdata[0];
        pdata1 = pdata[1];
      } else {
        pdata1 = pdata[0];
      }

      methodProps[prop.name] =
        $characterData.characters[nodeData.characterId].data[pdata0][pdata1];
    });
    value = method(methodProps);
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

    methodPath = props.method.split(".");
    method = extension.extensions[methodPath[0]].methods[methodPath[1]];

    loaded = true;
  });
</script>

<div class={"type method-value" + props.style}>
  {props.label}
  {#if value > 0}
    <span class="value">+{value}</span >
  {:else}
    <span class="value">{value}</span >
  {/if}
</div>
