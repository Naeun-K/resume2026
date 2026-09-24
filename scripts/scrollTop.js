export default function initScrollTop() {
  const topButton = document.querySelector(".floating-icon");

  if (!topButton) return;

  topButton.addEventListener("click", (event) => {
    event.preventDefault();

    const startPosition = window.scrollY;
    const duration = 800;
    let startTime = null;

    const easeOutCubic = (progress) => {
      return 1 - Math.pow(1 - progress, 3);
    };

    const scrollToTop = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - easedProgress));

      if (progress < 1) {
        requestAnimationFrame(scrollToTop);
      }
    };

    requestAnimationFrame(scrollToTop);
  });
}
