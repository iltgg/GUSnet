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

  let calc = false;

  $: {
    if (calc) {
      calculate();
      if (
        $characterData.characters[nodeData.characterId].data[data0][data1] !==
        value
      ) {
        validateNumber();
      }
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

  function override() {
    if (calc) {
      let choice = confirm("Override calculated value?");
      if (choice) {
        calc = false;
      }
    } else {
      let choice = confirm("Use calculated value?");
      if (choice) {
        calc = true;
      }
    }
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

    let tempM = method(methodProps);
    let tempV =
      get(characterData).characters[nodeData.characterId].data[data0][data1];
    if (tempM !== tempV && tempV !== undefined) {
      value = tempV;
    } else {
      value = tempM;
      calc = true;
    }
  });
</script>

<div
  class={"type number-field " + props.style}
  class:error
  on:click={override}
  on:keydown={override}
>
  {props.label}
  {#if calc}
    <input type="number" bind:value disabled />
  {:else}
    <input
      type="number"
      bind:value
      on:input={validateNumber}
      disabled={!nodeData.edit}
      on:click|stopPropagation
      on:keydown|stopPropagation
    />
  {/if}
</div>
