<script>
  export let slot;
</script>

{#if slot}
  <div class={"l " + slot.style}><slot /></div>
{:else}
  <slot />
{/if}
