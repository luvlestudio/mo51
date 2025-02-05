window.onload = () => {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const collapseBtn = document.getElementById("collapseBtn");
  const hiddenImages = document.querySelectorAll("#gallery img.hidden");

  showMoreBtn.addEventListener("click", () => {
    hiddenImages.forEach((img) => {
      img.classList.remove("hidden");
    });
    collapseBtn.style.display = "inline-block";
    collapseBtn.style.backgroundColor = "ffe08c";
    collapseBtn.style.width = "70px";
    collapseBtn.style.textAlign = "center";
    collapseBtn.style.display = "block";
    collapseBtn.style.margin = "7% auto";
    collapseBtn.style.borderRadius = "15px";

    showMoreBtn.style.display = "none";
  });

  collapseBtn.addEventListener("click", () => {
    const galleryImages = document.querySelectorAll("#addGalleyItem");
    galleryImages.forEach((img) => {
      img.classList.add("hidden");
    });
    collapseBtn.style.display = "none";

    showMoreBtn.style.display = "inline-block";
    showMoreBtn.style.backgroundColor = "ffe08c";
    showMoreBtn.style.width = "70px";
    showMoreBtn.style.textAlign = "center";
    showMoreBtn.style.display = "block";
    showMoreBtn.style.margin = "7% auto";
    showMoreBtn.style.borderRadius = "15px";
  });

  // const galleryImages = document.querySelectorAll("#gallery img");
  // galleryImages.forEach((img) => {
  //   img.onclick = () => {
  //     img.classList.toggle("full");
  //   };
  // });

  const btnShareKa = document.querySelector(".shareKt");
  btnShareKa.addEventListener("click", () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "양지민 ♥ 이소진의 모바일 청첩장",
        description: "2025년 3월 22일 토요일♡",
        imageUrl: "https://i.imgur.com/GwH5Bwe.png",
        imageWidth: 1200,
        imageHeight: 630,
        link: {
          mobileWebUrl: "https://mo51.luvle.co.kr",
          webUrl: "https://mo51.luvle.co.kr",
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: "https://mo51.luvle.co.kr",
            webUrl: "https://mo51.luvle.co.kr",
          },
        },
      ],
      // 카카오톡 미설치 시 카카오톡 설치 경로이동
      installTalk: true,
    });
  });

  // const btnShareKs = document.querySelector(".shareKs");
  // btnShareKs.addEventListener("click", () => {
  //   Kakao.Story.open({
  //     url: "https://developers.kakao.com",
  //     text: "카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)",
  //   });
  // });

  // const btnShareFb = document.querySelector(".shareFb");
  // btnShareFb.addEventListener("click", () => {
  //   const pageUrl = "mo2.luvle.co.kr/";
  //   window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  // });

  const swiper = new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const documentBody = document.querySelector("body");

  const outsideModal = document.querySelector(".swiper");
  outsideModal.addEventListener("click", function (event) {
    if (event.target.classList.contains("swiper-slide")) {
      outsideModal.style.display = "none";
      documentBody.style.overflow = "auto";
    }
  });

  const galleryImages = document.querySelectorAll("#gallery img");
  galleryImages.forEach((img, index) => {
    img.onclick = () => {
      swiper.slideTo(index);
      outsideModal.style.display = "block";
      documentBody.style.overflow = "hidden";
    };
  });

  const shareViaSMSBtn = document.querySelector(".shareTwoG");
  shareViaSMSBtn.addEventListener("click", () => {
    const message = "모바일 청첩장을 확인해주세요! " + window.location.href;
    const link = "sms:?body=" + encodeURIComponent(message);
    window.location.href = link;
  });

  //BGM
  const playButton = document.getElementById("playButton");
  const audio = document.getElementById("bgm");
  // 초기 상태는 play.png
  playButton.src = "img/play.png";
  playButton.addEventListener("click", function () {
    if (audio) {
      // 현재 오디오가 재생 중인지 여부를 확인
      if (audio.paused) {
        // 오디오가 멈춰있으면 재생
        audio.play().catch((error) => {
          console.error("오디오 재생 중 오류 발생:", error);
        });
        playButton.src = "img/stop.png"; // 버튼 이미지를 stop.png로 변경
      } else {
        // 오디오가 재생 중이면 정지
        audio.pause();
        audio.currentTime = 0; // 재생 위치를 처음으로 설정
        playButton.src = "img/play.png"; // 버튼 이미지를 play.png로 변경
      }
    } else {
      console.error("Audio element not found.");
    }
  });
};
