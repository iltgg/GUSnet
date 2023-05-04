<script>
  import { userData } from "../userData";
</script>

<div class="not-found">
  <h1>Invalid Page Link</h1>

  <div class="amogus">
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <g>
        <title>amogus</title>
        <path
          stroke-width="4"
          id="svg_5"
          d="m21.20784,93.45156l20.39107,0l0,50.22382l-20.39107,0l0,-50.22382z"
          opacity="undefined"
          stroke="#000"
          fill="#c51111"
        />
        <path
          stroke-width="4"
          id="svg_6"
          d="m50.66305,88.56628l20.39107,0l0,50.22382l-20.39107,0l0,-50.22382z"
          opacity="undefined"
          stroke="#000"
          fill="#c51111"
        />
        <path
          stroke-width="4"
          id="svg_1"
          d="m17.04776,4.57178l58.26088,0l0,103.47826l-58.26088,0l0,-103.47826z"
          opacity="undefined"
          stroke="#000"
          fill="#c51111"
        />
        <rect
          id="svg_3"
          height="31.36094"
          width="48.52071"
          y="22.48521"
          x="42.01183"
          stroke-width="4"
          stroke="#000"
          fill="#96cadd"
        />
        <path
          stroke-width="4"
          id="svg_4"
          d="m3.43829,38.2996l20.39107,0l0,50.22382l-20.39107,0l0,-50.22382z"
          opacity="undefined"
          stroke="#000"
          fill="#c51111"
        />
      </g>
    </svg>
  </div>

  {#if $userData.user}
    <a href="#/">Home</a>
  {:else}
    <a href="#/login">Login</a>
  {/if}
</div>

<style lang="scss">
  .not-found {
    display: flex;
    flex-direction: column;

    .amogus {
      height: 20em;
      width: 15em;
      margin-bottom: 5em;
      svg {
        height: auto;
        width: auto;
        // viewbox:
        //   height: calc(fit-content * 2);
        //   width: fit-content;

        g {
          //   height: 100%;
          // transform: scale(2);
        }
      }
    }
  }
</style>
