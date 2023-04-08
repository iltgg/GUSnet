<script lang="ts">
  // import { characterData } from "../../universeData";
  // import { type } from "./TypeManager";
  import { nodeType } from "./nodes/NodeManager";

  // import Conditional from "./Conditional.svelte";
  import type { node } from "./templates/templateTypes";

  export let node: node;
  export let nodeData;
  export let characterData;

  let n = nodeType(node.type);
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
  this={n.node}
  {nodeData}
  {node}
  {characterData}
  nodeProps={n.nodeProps}
  on:edit
/>
