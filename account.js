/** 신랑 카카오페이링크, 없으면 ''으로 둔다 */
const kakaoPayGroomLink = [
  "", // 1번째 계좌
  "", // 2번째 계좌
];
/** 신부 카카오페이링크, 없으면 ''으로 둔다  */
const kakaoPayBrideLink = [
  "", // 1번째 계좌
  "", // 2번째 계좌
];

// 페이지 로드 시에 애니메이션 적용
document.addEventListener("DOMContentLoaded", function () {
  const UlElements = document.querySelectorAll(".account-panel ul");
  const KakaoButtonList = [];
  UlElements.forEach((UlElement, ulIndex) => {
    const LiElements = UlElement.querySelectorAll("li");
    LiElements.forEach((element, liIndex) => {
      const copyTxt = element.querySelector("p").innerText;
      console.log(copyTxt, "copyTxt");

      const copyButton = element.querySelectorAll("button")[0];
      copyButton.addEventListener("click", function () {
        copy(copyTxt);
      });

      const kakaoButton = element.querySelectorAll("button")[1];
      const kakaoPayLinkList =
        ulIndex === 0 ? kakaoPayGroomLink : kakaoPayBrideLink;
      if (kakaoPayLinkList[liIndex]) {
        kakaoButton.addEventListener("click", function () {
          window.location.href = kakaoPayLinkList[liIndex];
        });
      } else {
        kakaoButton.style.display = "none";
      }
    });
  });
});

function copy(text) {
  if (navigator.userAgent.toLowerCase().includes("kakaotalk")) {
    copyTextInKakaoTalk(text);
  } else {
    navigator.clipboard?.writeText(text);
    // 복사완료에 대해 Alert으로 띄우기
    alert("클립보드에 복사되었습니다.");
  }
}

function copyTextInKakaoTalk(text) {
  // 결과를 표시할 요소
  const resultElement = document.getElementById("copyResult");

  // textarea 생성
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // 화면에서 숨기기
  textarea.style.position = "fixed";
  textarea.style.left = "-999999px";
  textarea.style.top = "-999999px";

  document.body.appendChild(textarea);

  // iOS의 경우 스크롤을 방지하기 위해 특별한 처리 필요
  if (navigator.userAgent.match(/ipad|iphone/i)) {
    textarea.contentEditable = true;
    textarea.readOnly = true;

    // 선택 범위 생성
    const range = document.createRange();
    range.selectNodeContents(textarea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textarea.setSelectionRange(0, 999999);
  } else {
    textarea.select();
  }

  try {
    // 복사 시도
    const successful = document.execCommand("copy");

    // 결과 표시
    if (successful) {
      showResult("복사되었습니다!", "success");
    } else {
      showResult("복사에 실패했습니다. 다시 시도해주세요.", "error");
    }
  } catch (err) {
    showResult("복사에 실패했습니다. 다시 시도해주세요.", "error");
  } finally {
    // 정리
    document.body.removeChild(textarea);
  }
}

// 결과 메시지 표시 함수
function showResult(message, type) {
  const resultElement = document.getElementById("copyResult");
  if (!resultElement) return;

  resultElement.textContent = message;
  resultElement.className = `copy-result ${type}`;

  // 2초 후 메시지 제거
  setTimeout(() => {
    resultElement.textContent = "";
    resultElement.className = "copy-result";
  }, 2000);
}
