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
  const UlElements = document.querySelectorAll('.account-panel ul');
  const KakaoButtonList = [];
  UlElements.forEach((UlElement, ulIndex) => {
    const LiElements = UlElement.querySelectorAll('li');
    LiElements.forEach((element, liIndex) => {
      const copyTxt = element.querySelector('p').innerText;
      console.log(copyTxt, 'copyTxt');
      
      const copyButton = element.querySelectorAll('button')[0];
      copyButton.addEventListener('click', function () {
        copy(copyTxt);
      });

      const kakaoButton = element.querySelectorAll('button')[1];
      const kakaoPayLinkList = ulIndex === 0 ? kakaoPayGroomLink : kakaoPayBrideLink;
      if (kakaoPayLinkList[liIndex]) {
        kakaoButton.addEventListener('click', function () {
          window.location.href = kakaoPayLinkList[liIndex];
        });
      } else {
        kakaoButton.style.display = 'none';
      }
    });
  });
});

function copy(text) {
  // iOS와 안드로이드 모두 지원하는 복사 기능
  if (navigator.clipboard && window.isSecureContext) {
    // 기본 Clipboard API 사용 (안드로이드)
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("클립보드에 복사되었습니다.");
      })
      .catch(() => {
        // Clipboard API 실패시 fallback
        fallbackCopyTextToClipboard(text);
      });
  } else {
    // iOS나 보안 컨텍스트가 아닌 경우 fallback 사용
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // iOS에서 자동 확대 방지
  textArea.style.fontSize = '12pt';
  // 화면에서 숨기기
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  
  document.body.appendChild(textArea);
  
  if (navigator.userAgent.match(/ipad|iphone/i)) {
    // iOS 워크어라운드
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert("클립보드에 복사되었습니다.");
    } else {
      alert("복사에 실패했습니다. 직접 선택하여 복사해주세요.");
    }
  } catch (err) {
    alert("복사에 실패했습니다. 직접 선택하여 복사해주세요.");
  }

  document.body.removeChild(textArea);
}