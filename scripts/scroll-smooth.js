import getTargetPosition from "./locate-middle";

export default function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) return;

  // 스크롤 애니메이션 시간
  const duration = 700;

  /**
   * 빠르게 출발하고 목적지에 가까워질수록
   * 자연스럽게 감속하는 easing
   */
  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };

  /**
   * 계산된 위치까지 부드럽게 스크롤 이동
   */
  const smoothScrollTo = (targetPosition) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    let startTime = null;

    const scroll = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo({
        top: startPosition + distance * easedProgress,
        left: 0,
        behavior: "instant",
      });

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

      // locate-middle.js에서 목적지 위치 계산
      const targetPosition = getTargetPosition(target, targetId);

      // 계산된 위치까지 부드럽게 이동
      smoothScrollTo(targetPosition);
    });
  });
}
