<script>
  import { userData, addUniverse as au } from "../userData";

  let universe = "";
  let password = "";
  let error = "";

  async function addUniverse() {
    if (!/^([A-Z]|[a-z]|[0-9])+/.test(universe)) {
      error = "invalid id";
      return;
    }
    let e = await au(universe, password);
    if (e) {
      error = e;
    }
  }
</script>

<article class="home">
  <h1 class="title">GUSnet</h1>
  <div class="grid">
    <div class="one">
      <h2>Universes:</h2>
      <div class="universes">
        {#if $userData.universes}
          {#each Object.keys($userData.universes) as uni (uni)}
            <a href={`#/universe/${uni}`}>{$userData.universes[uni].name}</a>
          {/each}
        {/if}
      </div>

      <h3>Add Universe:</h3>
      <form on:submit|preventDefault={addUniverse}>
        <input
          type="text"
          placeholder="universe id"
          name="add-universe"
          bind:value={universe}
        /><br />
        <input
          type="text"
          placeholder="universe password"
          name="add-universe"
          bind:value={password}
        /><br />
        <input type="submit" value="Add Universe" />
      </form>
      {#if error !== ""}
        <span class="error">{error}</span>
      {/if}
    </div>
    <div class="two">
      <h2>News:</h2>
      Release ALPHA.1:
      <ul>
        <li>Report bugs to the nearest authority</li>
        <li>Updates coming soon™</li>
      </ul>
    </div>
  </div>
</article>

<style lang="scss">
  .universes {
    display: flex;
    flex-direction: column;
    a {
      margin-top: 1em;
    }
  }
</style>
