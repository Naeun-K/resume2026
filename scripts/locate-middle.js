/**
 * 앵커 대상의 스크롤 위치를 계산합니다.
 * - #project, #header: 화면 상단
 * - 나머지 콘텐츠: 화면 세로 중앙
 *
 * @param {HTMLElement} target 이동할 대상 요소
 * @param {string} targetId 대상의 ID
 * @returns {number} 이동할 스크롤 위치
 */
export default function getTargetPosition(target, targetId) {
  const targetRect = target.getBoundingClientRect();
  const targetTop = targetRect.top + window.scrollY;

  // project와 header는 화면 상단에 위치
  if (targetId === "#project" || targetId === "#header") {
    return targetTop;
  }

  // 나머지 콘텐츠는 화면 세로 중앙에 위치
  return targetTop - (window.innerHeight - targetRect.height) / 2;
}
