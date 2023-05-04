<script>
  let email = "";

  import { emailPasswordReset } from "../userData";

  let error = "";
  let success = false;

  async function resetPassword() {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error = "invalid email";
      return null;
    }
    const e = await emailPasswordReset(email);
    if (e) {
      error = e.code;
    } else {
      success = true;
    }
  }
</script>

<div class="reset-password">
  {#if success == false}
    <form on:submit|preventDefault={resetPassword}>
      <div>
        <h1>Reset Password</h1>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          bind:value={email}
        />
        {#if error !== ""}
          <span class="error">{error}</span>
        {/if}
        <input type="submit" value="reset password" />
      </div>
      <div>
        <a href="#/login">Already have an account? Login.</a>
        <a href="#/signup">Don't have an account? Signup.</a>
      </div>
    </form>
  {:else}
    <h1>Reset email sent</h1>
    <a href="#/login">Login</a>
  {/if}
</div>
