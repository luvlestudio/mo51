/** 신랑 카카오페이링크, 없으면 ''으로 둔다 */
const kakaoPayGroomLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
];
/** 신부 카카오페이링크, 없으면 ''으로 둔다  */
const kakaoPayBrideLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
]

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
  // 복사
  navigator.clipboard.writeText(text);

  // 복사완료에 대해 Alert으로 띄우기
  alert("클립보드에 복사되었습니다.");
}