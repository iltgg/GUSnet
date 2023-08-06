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

  const quotes = [
    "In the game of life, trust your instincts, just like crewmates trust each other in Among Us.",
    "Stay vigilant and observant, for even the tiniest clue can lead to victory, both in the spaceship and in your daily challenges.",
    "In the face of suspicion, stay calm and collected. Just like impostors, obstacles will reveal themselves in due time.",
    "Your tasks may seem daunting, but remember, every completed task brings you one step closer to success, just like fixing the ship in Among Us.",
    "Believe in yourself and your abilities, for even an innocent crewmate can turn the tides and emerge as the ultimate winner.",
    "Embrace teamwork and communication, as they are the keys to solving any crisis, be it on a spaceship or in real life.",
    "Don't be afraid to stand out and shine like a rare cosmetic in Among Us; uniqueness is your strength.",
    "In times of uncertainty, remember to call emergency meetings in your life and seek help from trusted friends or mentors.",
    "Face challenges head-on, just like brave crewmates confronting impostors, and prove your resilience to the world.",
    "Each day is a new opportunity to discover the truth and uncover the impostors in your path.",
    "Remember, you may face setbacks, but just like crewmates respawn after being ejected, you can always bounce back stronger.",
    "Embrace the mystery and enjoy the journey; life is like an endless game of Among Us, full of surprises and adventures.",
    "No matter how dark it gets, there's always hope for victory, just like finishing tasks with limited visibility in Among Us.",
    "In the chaos of life, maintain your composure and be the calm crewmate everyone can rely on.",
    "Find your crew, your team, your allies - together, you can navigate any maze of challenges, just like in Among Us.",

    "Just like an ejected crewmate, you'll find yourself falling flat on your face. Failure is inevitable.",
    "No matter how hard you work, there's always an impostor waiting to take credit for your efforts.",
    "Life is just an endless loop of the same monotonous tasks, like playing Among Us without a satisfying win.",
    "You can never truly trust anyone, just like how crewmates can't trust each other in Among Us.",
  ];

  let accent = localStorage.getItem("accent") || "orange";
  let quote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<header>
  <span class="left">
    <b>GUSnet</b>
    <a href="#/">Home</a></span
  >

  <span class="quote">{quote}</span>

  <span class="right">
    <span class="user">
      <span class="name">{$userData.username}</span>
      <svg class="identicon-user" id="user-pfp" />
    </span>
    <select
      name="accent"
      id="accent"
      bind:value={accent}
      on:change={() => {
        document.body.className = "";
        localStorage.setItem("accent", accent);
        document.body.classList.add(accent);
      }}
    >
      <option value="orange">Orange</option>
      <option value="blue">Blue</option>
      <option value="purple">Purple</option>
      <option value="green">Green</option>
      <option value="pink">Pink</option>
    </select>
    <button on:click={userSignOut} class="sign-out">Sign Out</button>
  </span>
</header>
