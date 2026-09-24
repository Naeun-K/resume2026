export default function initContact() {
  // Contact 폼 가져오기
  const contactForm = document.querySelector("#contact-form");

  // Contact 폼이 존재하지 않으면 실행 종료
  if (!contactForm) return;

  // 전송 버튼과 상태 메시지 영역 가져오기
  const submitButton = contactForm.querySelector(".section-contact-button");
  const statusMessage = contactForm.querySelector("#contact-status");

  /**
   * 문의 전송 결과 아이콘 생성
   * success: 체크 아이콘
   * error: X 아이콘
   */
  const createStatusIcon = (type) => {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    const path = document.createElementNS(svgNS, "path");

    // SVG 공통 속성
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");

    // 아이콘은 장식용이므로 스크린리더에서 제외
    svg.setAttribute("aria-hidden", "true");

    if (type === "success") {
      // Bootstrap Icons - check-lg
      svg.classList.add("bi", "bi-check-lg");

      path.setAttribute(
        "d",
        "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z",
      );
    } else if (type === "error") {
      // Bootstrap Icons - x-lg
      svg.classList.add("bi", "bi-x-lg");

      path.setAttribute(
        "d",
        "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z",
      );
    }

    svg.appendChild(path);

    return svg;
  };

  /**
   * 문의 전송 결과 메시지 표시
   * innerHTML 대신 DOM API와 textContent를 사용
   */
  const setContactStatus = (type, message) => {
    if (!statusMessage) return;

    // 기존 아이콘과 메시지 제거
    statusMessage.replaceChildren();

    // 기존 상태 클래스 제거
    statusMessage.classList.remove("success", "error");

    // 허용된 상태만 처리
    if (type !== "success" && type !== "error") return;

    // 상태에 맞는 SVG 아이콘 생성
    const icon = createStatusIcon(type);

    // 메시지 요소 생성
    const text = document.createElement("span");

    // HTML로 해석하지 않고 순수 문자열로 삽입
    text.textContent = message;

    // 성공/실패 상태 클래스 추가
    statusMessage.classList.add(type);

    // 아이콘과 메시지를 상태 영역에 추가
    statusMessage.append(icon, text);
  };

  /**
   * 이전 전송 결과 메시지 초기화
   */
  const clearContactStatus = () => {
    if (!statusMessage) return;

    statusMessage.replaceChildren();
    statusMessage.classList.remove("success", "error");
  };

  // Contact 폼 제출
  contactForm.addEventListener("submit", async (event) => {
    // Formspree 페이지로 직접 이동하는 기본 submit 동작 방지
    event.preventDefault();

    // HTML 기본 유효성 검사
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // 중복 전송 방지를 위해 버튼 비활성화
    submitButton.disabled = true;
    submitButton.textContent = "전송 중...";

    // 이전 성공/실패 메시지 제거
    clearContactStatus();

    try {
      // 폼에 입력된 데이터를 FormData로 생성
      const formData = new FormData(contactForm);

      // Formspree endpoint로 문의 내용 전송
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      // HTTP 응답이 성공 범위가 아니면 실패 처리
      if (!response.ok) {
        throw new Error("문의 전송에 실패했습니다.");
      }

      // 전송 성공 메시지 표시
      setContactStatus("success", "문의가 정상적으로 전송되었습니다.");

      // 성공한 경우 입력 내용 초기화
      contactForm.reset();
    } catch (error) {
      console.error("문의 전송 실패:", error);

      // 전송 실패 메시지 표시
      setContactStatus(
        "error",
        "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      // 성공/실패 여부와 관계없이 버튼 원상 복구
      submitButton.disabled = false;
      submitButton.textContent = "보내기";
    }
  });
}
