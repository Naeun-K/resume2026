export default function initLocateMiddle() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) return;

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
      } else if (targetId === "#header") {
        targetPosition = targetTop;
      } else {
        // 나머지 콘텐츠는 화면 세로 중앙에 위치
        targetPosition =
          targetTop - (window.innerHeight - targetRect.height) / 2;
      }

      // 애니메이션 없이 즉시 이동
      window.scrollTo(0, targetPosition);
    });
  });
}
