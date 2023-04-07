<script>
  import TextBlock from "./TextBlock.svelte";

  export let nodeData;
  export let props;
  export let characterData;
</script>

<div class={"type multi-text-block " + props.style}>
  <div class="label">{props.label}</div>
  <div class="blocks">
    {#each props.multi as i}
      <TextBlock
        on:edit
        {nodeData}
        props={{ data: i, label: "", method: "", style: "" }}
        {characterData}
      />
    {/each}
  </div>
</div>
