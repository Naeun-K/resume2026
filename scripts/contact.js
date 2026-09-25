export default function initContact() {
  // Contact 폼 가져오기
  const contactForm = document.querySelector("#contact-form");

  // Contact 폼이 존재하지 않으면 실행 종료
  if (!contactForm) return;

  // 전송 버튼과 상태 메시지 영역 가져오기
  const submitButton = contactForm.querySelector(".section-contact-button");
  const statusMessage = contactForm.querySelector("#contact-status");

  // required가 설정된 모든 입력 요소
  const requiredFields = contactForm.querySelectorAll(
    "input[required], textarea[required]",
  );

  /**
   * 필드별 오류 메시지
   */
  const getErrorMessage = (field) => {
    // required인데 값이 없는 경우
    if (!field.value.trim()) {
      switch (field.name) {
        case "name":
          return "이름을 입력해주세요.";

        case "email":
          return "이메일을 입력해주세요.";

        case "title":
          return "제목을 입력해주세요.";

        case "message":
          return "내용을 입력해주세요.";

        default:
          return "필수 입력 항목입니다.";
      }
    }

    // 이메일 값은 있지만 형식이 잘못된 경우
    if (field.type === "email" && !field.validity.valid) {
      return "올바른 이메일 형식으로 입력해주세요.";
    }

    return "";
  };

  /**
   * input과 연결된 label 찾기
   */
  const getFieldLabel = (field) => {
    if (!field.id) return null;

    return contactForm.querySelector(`label[for="${CSS.escape(field.id)}"]`);
  };

  /**
   * 라벨 옆 오류 메시지 요소 가져오기
   * 없으면 생성
   */
  const getErrorElement = (field) => {
    const label = getFieldLabel(field);

    if (!label) return null;

    let errorMessage = label.querySelector(".field-error-message");

    if (!errorMessage) {
      errorMessage = document.createElement("span");

      errorMessage.classList.add("field-error-message");
      errorMessage.setAttribute("aria-live", "polite");

      // 라벨 텍스트 바로 뒤에 추가
      label.appendChild(errorMessage);
    }

    return errorMessage;
  };

  /**
   * 필드 오류 표시
   */
  const showFieldError = (field, message) => {
    const errorMessage = getErrorElement(field);

    if (errorMessage) {
      errorMessage.textContent = message;
    }

    field.classList.add("input-error");
    field.setAttribute("aria-invalid", "true");
  };

  /**
   * 필드 오류 제거
   */
  const clearFieldError = (field) => {
    const label = getFieldLabel(field);
    const errorMessage = label?.querySelector(".field-error-message");

    if (errorMessage) {
      errorMessage.textContent = "";
    }

    field.classList.remove("input-error");
    field.removeAttribute("aria-invalid");
  };

  /**
   * 개별 필드 검사
   */
  const validateField = (field) => {
    const errorMessage = getErrorMessage(field);

    if (errorMessage) {
      showFieldError(field, errorMessage);
      return false;
    }

    clearFieldError(field);

    return true;
  };

  /**
   * 브라우저 기본 validation 팝업 제거
   */
  contactForm.setAttribute("novalidate", "");

  /**
   * 에러가 표시된 이후 값을 입력하면
   * 해당 필드의 에러 메시지 제거
   */
  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      // 아직 에러가 표시되지 않았다면 아무것도 하지 않음
      if (!field.classList.contains("input-error")) return;

      // 값이 입력되면 다시 검사
      validateField(field);
    });
  });

  /**
   * 문의 전송 결과 아이콘 생성
   */
  const createStatusIcon = (type) => {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    const path = document.createElementNS(svgNS, "path");

    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");

    if (type === "success") {
      svg.classList.add("bi", "bi-check-lg");

      path.setAttribute(
        "d",
        "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z",
      );
    } else if (type === "error") {
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
   */
  const setContactStatus = (type, message) => {
    if (!statusMessage) return;

    statusMessage.replaceChildren();
    statusMessage.classList.remove("success", "error");

    if (type !== "success" && type !== "error") return;

    const icon = createStatusIcon(type);
    const text = document.createElement("span");

    text.textContent = message;

    statusMessage.classList.add(type);
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

  /**
   * Contact 폼 제출
   */
  contactForm.addEventListener("submit", async (event) => {
    // Formspree 페이지 이동 방지
    event.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    /**
     * 보내기 버튼을 눌렀을 때만
     * 모든 required 항목 검사
     */
    requiredFields.forEach((field) => {
      const fieldIsValid = validateField(field);

      if (!fieldIsValid) {
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    // required 항목 중 하나라도 문제가 있으면 전송하지 않음
    if (!isValid) {
      firstInvalidField?.focus();
      return;
    }

    // 중복 전송 방지
    submitButton.disabled = true;
    submitButton.textContent = "전송 중...";

    clearContactStatus();

    try {
      const formData = new FormData(contactForm);

      // Formspree endpoint로 문의 내용 전송
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("문의 전송에 실패했습니다.");
      }

      // 전송 성공
      setContactStatus("success", "문의가 정상적으로 전송되었습니다.");

      contactForm.reset();

      // 에러 상태 초기화
      requiredFields.forEach((field) => {
        clearFieldError(field);
      });
    } catch (error) {
      console.error("문의 전송 실패:", error);

      setContactStatus(
        "error",
        "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "보내기";
    }
  });
}
