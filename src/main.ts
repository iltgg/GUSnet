import "./styles/styles.scss";
import "./styles/layout.scss";
import "./styles/type.scss";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
