import "../styles/reset.css";
import "../styles/style.css";

import initGraph from "./graph.js";
import initTyping from "./typing.js";
import initContact from "./contact.js";
import initLocateMiddle from "./locate-middle.js";
import initAboutAccordion from "./accordion.js";

document.addEventListener("DOMContentLoaded", () => {
  initGraph();
  initTyping();
  initContact();
  initLocateMiddle();
  initAboutAccordion();
});
