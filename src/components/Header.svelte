<script>
  import { updateSvg } from "jdenticon";
  import { onMount } from "svelte";

  import {
    setAuthStateListener,
    updateUserData,
    userData,
    userSignOut,
  } from "../userData";

  onMount(() => {
    updateSvg("#user-pfp", $userData.user?.uid);
  });
</script>

<header>
  <span class="left">
    <b>GUSnet</b>
    <a href="#/">Home</a></span
  >

  <span class="right">
    <span class="name">{$userData.username}</span>
    <svg class="identicon-user" id="user-pfp" />
    <button on:click={userSignOut}>Sign Out</button>
  </span>
</header>
