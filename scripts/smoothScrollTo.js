export default function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) return;

  // 빠르게 반응하도록 애니메이션 시간을 300ms로 설정
  const duration = 300;

  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };

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

      // project는 기존처럼 화면 상단
      if (targetId === "#project") {
        targetPosition = targetTop;
      } else {
        // 나머지는 화면 세로 중앙
        targetPosition =
          targetTop - (window.innerHeight - targetRect.height) / 2;
      }

      smoothScrollTo(targetPosition);
    });
  });
}
