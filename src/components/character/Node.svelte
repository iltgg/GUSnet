<script>
  // import { characterData } from "../../universeData";
  import { type } from "./TypeManager";

  import Conditional from "./Conditional.svelte";

  export let node;
  export let nodeData;
  export let characterData;
</script>

<!-- <svelte:component
  this={type[node.type]}
  {nodeData}
  props={node.props}
  data={node.data}
  label={node.label}
  method={node.method}
  style={node.style}
/> -->

<!-- <Conditional slot={node.slot}>
  <svelte:component
    this={type[node.type]}
    {nodeData}
    props={node.props}
    {characterData}
    on:edit
  />
  
  {#if node.order.length}
  {#each node.order as n}
  <svelte:self node={node.nest[n]} {nodeData} {characterData} on:edit />
    {/each}
    {/if}
  </Conditional> -->

<svelte:component
  this={type[node.type]}
  {nodeData}
  {node}
  {characterData}
  on:edit
/>
