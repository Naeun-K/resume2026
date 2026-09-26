export default function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) return;

  // hover가 가능한 기기인지 확인
  const canHover = window.matchMedia("(hover: hover)").matches;

  const duration = 700;

  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };

  /**
   * 부드럽게 스크롤 이동
   * hover가 가능한 기기에서만 사용
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

      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;

      let targetPosition;

      // project는 화면 상단에 위치
      if (targetId === "#project") {
        targetPosition = targetTop;
      } else {
        // 나머지 콘텐츠는 화면 세로 중앙에 위치
        targetPosition =
          targetTop - (window.innerHeight - targetRect.height) / 2;
      }

      if (canHover) {
        // 데스크톱 → 부드럽게 이동
        smoothScrollTo(targetPosition);
      } else {
        // 모바일 → 애니메이션 없이 즉시 이동
        window.scrollTo({
          top: targetPosition,
          behavior: "instant",
        });
      }
    });
  });
}
