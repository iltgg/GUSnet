<script lang="ts">
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { push, pop, replace, location } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
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
  // import Universe from "./components/Universe.svelte";
  import Header from "./components/Header.svelte";
  import ResetPassword from "./components/ResetPassword.svelte";
  import NotFound from "./components/NotFound.svelte";
  import { get } from "svelte/store";

  const routes = {
    "/": wrap({
      component: Home,
      userData: { user: userData },
      conditions: [
        (detail) => {
          return !!get(detail.userData.user).user;
        },
      ],
    }),
    "/login": wrap({
      component: Login,
      userData: { user: userData },
      conditions: [
        (detail) => {
          return !get(detail.userData.user).user;
        },
      ],
    }),
    "/signup": wrap({
      component: SignUp,
      userData: { user: userData },
      conditions: [
        (detail) => {
          return !get(detail.userData.user).user;
        },
      ],
    }),
    "/reset-password": wrap({
      component: ResetPassword,
      userData: { user: userData },
      conditions: [
        (detail) => {
          return !get(detail.userData.user).user;
        },
      ],
    }),
    "/universe/:universeId": wrap({
      asyncComponent: () => import("./components/Universe.svelte"),
      userData: { user: userData },
      conditions: [
        (detail) => {
          return !!get(detail.userData.user).user;
        },
      ],
    }),
    "*": NotFound,
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

  function conditionsFailed(event) {
    if (!!get(event.detail.userData.user).user) push("/");
    else push("/login");
  }

  // $: displayHeader = !(
  //   $location === "/login" ||
  //   $location === "/signup" ||
  //   $location === "/reset-password"
  // );

  $: displayHeader = !!$userData.user;

  let render = false;
</script>

{#if render}
  {#if displayHeader && render}
    <Header />
  {/if}
  <main>
    <Router {routes} on:conditionsFailed={conditionsFailed} />
  </main>
{/if}
