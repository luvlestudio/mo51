/** 신랑 카카오페이링크, 없으면 ''으로 둔다 */
const kakaoPayGroomLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
];
/** 신부 카카오페이링크, 없으면 ''으로 둔다  */
const kakaoPayBrideLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
];

// 페이지 로드 시에 애니메이션 적용
document.addEventListener('DOMContentLoaded', function () {
  const UlElements = document.querySelectorAll('.account-panel ul');
  const KakaoButtonList = [];
  UlElements.forEach((UlElement, ulIndex) => {
    const LiElements = UlElement.querySelectorAll('li');
    LiElements.forEach((element, liIndex) => {
      const copyButton = element.querySelectorAll('button')[0];
      copyButton.addEventListener('click', function () {
        const copyTxt = element.querySelectorAll('p')[0].innerText;
        console.log(copyTxt, 'copyTxt');
        copy(copyTxt);
      });

      const kakaoButton = element.querySelectorAll('button')[1];
      const kakaoPayLinkList =
        ulIndex === 0 ? kakaoPayGroomLink : kakaoPayBrideLink;
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
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('클립보드에 복사되었습니다.');
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

function fallbackCopyTextToClipboard(copyText) {
  var tmpTextarea = document.createElement('textarea');
  tmpTextarea.value = copyText;

  document.body.appendChild(tmpTextarea);
  tmpTextarea.select();
  tmpTextarea.setSelectionRange(0, 9999); // 셀렉트 범위 설정

  document.execCommand('copy');
  document.body.removeChild(tmpTextarea);
}
