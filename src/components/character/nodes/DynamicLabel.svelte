<script lang="ts">
  import { onMount } from "svelte";
  import { Calculator } from "../extension";
  import type { node } from "../templates/templateTypes";

  export let nodeData;
  export let node: node;
  export let characterData;
  export let characterDataLocal;

  export let nodeProps;

  let value;
  let calc: Calculator;
  let watch = [0];
  let cache = [];

  $: {
    watch[0] = $characterDataLocal.characters[nodeData.characterId].data;

    let change = false;
    for (let i = 0; i < node.watch.length; i++) {
      if (getPath(node.watch[i], watch[0]) !== cache[i]) {
        change = true;
        break;
      }
    }

    if (change) {
      value = calc?.evaluate();
    }
  }

  onMount(() => {
    calc = new Calculator(node.method, watch);
    watch[0] = $characterDataLocal.characters[nodeData.characterId].data;
    node.watch.forEach((w) => {
      //   console.log(w);
      cache.push(getPath(w, watch[0]));
    });
    cache = cache;
    // console.log(watch[0]);

    value = calc.evaluate();
  });

  function getPath(path: string, characterData): any {
    return path.split(".").reduce((obj, next) => obj[next], characterData);
  }
</script>

<div
  class={"type field label" +
    (node.style ? node.style : "") +
    " " +
    (nodeProps?.style ? nodeProps?.style : "")}
  style={!nodeProps?.posOverride
    ? `position: absolute; top: ${node.y}em; left: ${node.x}em`
    : ""}
>
  {node.label}
  {value}
</div>
