// !Start video --------------------------------------
let video = document.getElementById("myVideo");
let btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
// !Finish video-----------------------------------------
// !Slide Page Heroes-------------------------------------------
let carouselBtn = document.querySelector(".custom-carousel");
if (carouselBtn) {
  let obj = {
    name: carouselBtn,
    bool: true,
    page: {
      0: 1,
      768: 2,
      1024: 3,
    },
  };

  let carouselItems = carouselBtn.querySelectorAll(".item");
  if (carouselItems) {
    carouselItems.forEach(function (item) {
      item.addEventListener("click", function () {
        carouselItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        item.classList.toggle("active");
      });
    });
  }
}
// ! Finish Page Heroes ---------------------------------------------
