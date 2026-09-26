import "../styles/reset.css";
import "../styles/style.css";

import initGraph from "./graph.js";
import initTyping from "./typing.js";
import initContact from "./contact.js";
import initAboutAccordion from "./accordion.js";
import initSmoothScroll from "./scroll-smooth.js";

document.addEventListener("DOMContentLoaded", () => {
  initGraph();
  initTyping();
  initContact();
  initAboutAccordion();
  initSmoothScroll();
});
