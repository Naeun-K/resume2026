export default function initSmoothScroll() {
  // hover가 불가능한 터치 기기에서는 커스텀 스크롤 효과를 사용하지 않음
  const canHover = window.matchMedia("(hover: hover)").matches;

  if (!canHover) return;

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) return;

  const duration = 700;

  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };

  const smoothScrollTo = (targetPosition) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    let startTime = null;

    const scroll = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);

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

      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;

      let targetPosition;

      if (targetId === "#project") {
        targetPosition = targetTop;
      } else {
        targetPosition =
          targetTop - (window.innerHeight - targetRect.height) / 2;
      }

      smoothScrollTo(targetPosition);
    });
  });
}
