import "./app.scss";
import Calendar from "./js/calendar";
import Header from "./js/header";

import State from "./js/state";
import ui from "./js/ui";

const headerDiv = document.querySelector("header")
const app = document.querySelector("#app");

function main() {
  let today = new Date();
  let state = new State(app);
  let header = new Header(state, headerDiv, today)
  let cal = new Calendar(state, today.getFullYear());

  state.addView("calendar", cal);
  state.changeView("calendar");
}

window.addEventListener("load", main);
