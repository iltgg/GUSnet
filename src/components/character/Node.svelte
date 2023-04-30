<script lang="ts">
  // import { characterData } from "../../universeData";
  // import { type } from "./TypeManager";
  import { nodeType } from "./nodes/NodeManager";

  // import Conditional from "./Conditional.svelte";
  import type { node } from "./templates/templateTypes";

  export let node: node;
  export let nodeData;
  export let characterData;

  let parsedNode = nodeType(node);
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

{#if parsedNode instanceof Array}
  <div
    class={"group " + parsedNode[0]}
    style={`position: absolute; top: ${node.y}em; left: ${node.x}em`}
  >
    {#each parsedNode[1] as n}
      <svelte:component
        this={n.node}
        {nodeData}
        node={n.data}
        {characterData}
        nodeProps={n.nodeProps}
        on:edit
      />
    {/each}
  </div>
{:else}
  <svelte:component
    this={parsedNode.node}
    {nodeData}
    node={parsedNode.data}
    {characterData}
    nodeProps={parsedNode.nodeProps}
    on:edit
  />
{/if}
