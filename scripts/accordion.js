export default function initAboutAccordion() {
  const accordion = document.querySelector(".section-profile-accordion");

  if (!accordion) return;

  const toggleButton = accordion.querySelector(
    ".section-profile-accordion-button",
  );
  const buttonText = toggleButton?.querySelector("span");

  if (!toggleButton || !buttonText) return;

  toggleButton.addEventListener("click", () => {
    const isOpen = accordion.classList.toggle("is-open");

    toggleButton.setAttribute("aria-expanded", String(isOpen));
    buttonText.textContent = isOpen ? "소갯말 접기" : "소갯말 더보기";
  });
}
