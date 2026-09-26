export default function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]:not(.floating-icon-link)',
  );

  if (anchorLinks.length === 0) return;

  // 스크롤 애니메이션 시간
  const duration = 500;

  // 자연스럽게 가속 후 감속
  const easeInOutCubic = (progress) => {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  };

  const smoothScrollTo = (targetPosition) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY;

      smoothScrollTo(targetPosition);
    });
  });
}
