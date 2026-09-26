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

      // 기본 앵커 이동 방지
      // 모바일에서도 가운데 위치 계산을 적용해야 하므로 필요
      event.preventDefault();

      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;

      let targetPosition;

      // project는 기존처럼 화면 상단에 위치
      if (targetId === "#project") {
        targetPosition = targetTop;
      } else {
        // 나머지 콘텐츠는 모든 기기에서 화면 가운데 위치
        targetPosition =
          targetTop - (window.innerHeight - targetRect.height) / 2;
      }

      if (canHover) {
        // PC 등 hover 가능 기기 → 부드럽게 이동
        smoothScrollTo(targetPosition);
      } else {
        // 모바일 등 hover 불가능 기기 → 즉시 이동
        window.scrollTo(0, targetPosition);
      }
    });
  });
}
