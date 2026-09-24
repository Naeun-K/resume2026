import initGraph from "./graph.js";
import initTyping from "./typing.js";
import initContact from "./contact.js";
import initSmoothScroll from "./smoothScrollTo.js";
import initAboutAccordion from "./accordion.js";

document.addEventListener("DOMContentLoaded", () => {
  initGraph();
  initSmoothScroll();
  initTyping();
  initContact();
  initAboutAccordion();
});
