<script>
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { push, pop, replace, location } from "svelte-spa-router";
  import { updateSvg } from "jdenticon";

  import {
    setAuthStateListener,
    updateUserData,
    userData,
    userSignOut,
  } from "./userData";

  import Login from "./components/Login.svelte";
  import Home from "./components/Home.svelte";
  import SignUp from "./components/SignUp.svelte";
  import Universe from "./components/Universe.svelte";
  import Header from "./components/Header.svelte";
  import RestPassword from "./components/RestPassword.svelte";

  const routes = {
    "/": Home,
    "/login": Login,
    "/signup": SignUp,
    "/reset-password": RestPassword,
    "/universe/:universeId": Universe,
  };

  setAuthStateListener(async (user) => {
    let e = await updateUserData();
    if (e) {
      console.log(e);
    }
    // any extra auth logic should go in if-else block, breaks otherwise potentially
    if (!user) {
      await push("/login");
    } else {
      if (
        $location === "/login" ||
        $location === "/signup" ||
        $location === "/reset-password"
      ) {
        await push("/");
      } else {
        await push($location);
      }
    }

    render = true;
  });

  onMount(() => {
    window.jdenticon_config = {
      lightness: {
        color: [0.41, 0.69],
        grayscale: [0.2, 0.68],
      },
      saturation: {
        color: 0.54,
        grayscale: 0.2,
      },
      backColor: "#0000",
    };
  });

  $: displayHeader = !(
    $location === "/login" ||
    $location === "/signup" ||
    $location === "/reset-password"
  );

  let render = false;
</script>

{#if render}
  {#if displayHeader && render}
    <Header />
  {/if}
  <main>
    <Router {routes} />
  </main>
{/if}
