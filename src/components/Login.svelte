<script>
  let email = "";
  let password = "";

  import { emailSignIn } from "../userData";

  let error = "";

  async function signIn() {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // console.log("invalid email");
      error = "invalid email";
      return null;
    }
    // console.log(`${email}, ${password}`);
    const e = await emailSignIn(email, password);
    if (e) {
      // console.log(e.message);
      if (e.code === "auth/wrong-password") {
        error = "wrong password";
      } else {
        error = e.code;
      }
    }
  }
</script>

<div class="login">
  <form on:submit|preventDefault={signIn}>
    <div>
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        bind:value={email}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        bind:value={password}
      />
      {#if error !== ""}
        <span class="error">{error}</span>
      {/if}
      <input type="submit" value="login" />
    </div>
    <div>
      <a href="#/reset-password">Reset password.</a>
      <a href="#/signup">Don't have an account? Signup.</a>
    </div>
  </form>
</div>
