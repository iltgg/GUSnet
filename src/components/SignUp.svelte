<script>
  import { emailSignUp } from "../userData";

  let email = "";
  let username = "";
  let password = "";
  let confirmPassword = "";

  let errors = [];

  async function signUp() {
    errors = [];

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // console.log("invalid email");
      errors.push("invalid email");
      // return null;
    }
    if (!/^[a-zA-Z0-9_-]{3,15}$/.test(username)) {
      // console.log("invalid username");
      errors.push(
        "username must be 3-15 characters and contain only (a-z, A-Z, 0-9, '_', and '-')"
      );
      // return null;
    }
    if (!/^(?=.*[0-9])(?=.*[^a-zA-z0-9]).{6,}$/.test(password)) {
      // console.log("password is too weak");
      errors.push(
        "password must be at least 6 characters and contain at least one number and at least one special character"
      );
    }
    if (password !== confirmPassword) {
      // console.log("passwords do not match");
      errors.push("passwords do not match");
    }

    if (errors.length > 0) {
      errors = errors;
      return null;
    }

    let e = await emailSignUp(email, password, username);

    if (e) {
      errors.push(`${e.code}`);
    }
    errors = errors;
  }
</script>

<div class="sign-up">
  <form on:submit|preventDefault={signUp}>
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        bind:value={email}
      />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        bind:value={username}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        bind:value={password}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="confirm password"
        bind:value={confirmPassword}
      />
      {#if errors.length > 0}
        {#each errors as error}
          <span class="error">{error}</span>
        {/each}
      {/if}
      <input type="submit" value="sign up" />
    </div>
    <div><a href="#/login">Already have an account? Login.</a></div>
  </form>
</div>
