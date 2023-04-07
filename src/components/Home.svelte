<script>
  import { userData, addUniverse as au } from "../userData";

  let universe = "";
  let error = "";

  async function addUniverse() {
    if (!/^([A-Z]|[a-z]|[0-9])+/.test(universe)) {
      error = "invalid id";
      return;
    }
    let e = await au(universe);
    if (e) {
      error = e;
    }
  }
</script>

<article class="home">
  <h1>GUSnet</h1>
  <div class="grid">
    <div class="one">
      <h2>Universes:</h2>
      {#if $userData.universes}
        {#each Object.keys($userData.universes) as uni (uni)}
          <a href={`#/universe/${uni}`}>{$userData.universes[uni].name}</a>
        {/each}
      {/if}

      <h3>Add Universe:</h3>
      <form on:submit|preventDefault={addUniverse}>
        <input
          type="text"
          placeholder="universe id"
          name="add-universe"
          bind:value={universe}
        /><br />
        <input type="submit" value="Add Universe" />
      </form>
      {#if error !== ""}
        <span class="error">{error}</span>
      {/if}
    </div>
    <div class="two">
      <h2>News</h2>
      Release 0.1:
      <ul>
        <li>Updates coming soon™</li>
      </ul>
    </div>
  </div>
</article>
