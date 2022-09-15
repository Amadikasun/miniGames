import "./style.css";

function main() {
  const appEl = document.querySelector<HTMLDivElement>("app");

  if (!appEl) {
    console.error(`Could not find #app`);
    return;
  }

  appEl.innerText = "Hello World!";
}
main();
