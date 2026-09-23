const typingElement = document.querySelector(
  ".section-profile-typing-container > strong",
);

if (typingElement) {
  const text = typingElement.textContent.trim();

  typingElement.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";

  let index = 0;
  let isDeleting = false;

  const typing = () => {
    if (!isDeleting) {
      typingElement.textContent = text.slice(0, index + 1);
      index += 1;

      typingElement.appendChild(cursor);

      if (index === text.length) {
        isDeleting = true;

        setTimeout(typing, 1500);
        return;
      }

      setTimeout(typing, 100);
      return;
    }

    index -= 1;

    typingElement.textContent = text.slice(0, index);
    typingElement.appendChild(cursor);

    if (index === 0) {
      isDeleting = false;

      setTimeout(typing, 700);
      return;
    }

    setTimeout(typing, 50);
  };

  typing();
}
