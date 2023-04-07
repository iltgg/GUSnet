<script>
    import { createEventDispatcher, onMount } from "svelte";
  
    export let nodeData;
    export let props;
    export let characterData;
  
  </script>
  
  <div class={"type label " + props.style}>
    {props.label}
  </div>
  