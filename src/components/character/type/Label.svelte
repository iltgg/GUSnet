<script lang="ts">
  export let nodeData;
  export let node;
  export let characterData;

  export let nodeProps;
</script>

<div
  class={"field label" +
    (node.style ? node.style : "") +
    " " +
    (nodeProps?.style ? nodeProps?.style : "")}
  style={`position: absolute; top: ${node.y}em; left: ${node.x}em`}
>
  {node.label}
</div>
