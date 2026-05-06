document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".stages__list");
  const slides = document.querySelectorAll(".stages__slide");
  const btnPrev = document.querySelector(".btn-arrow--prev");
  const btnNext = document.querySelector(".btn-arrow--next");
  const dots = document.querySelectorAll(".stages__dots .dot");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateStages() {
    const isMobile =
      window.getComputedStyle(document.querySelector(".stages__controls"))
        .display !== "none";
    if (!isMobile) return;

    const slideWidth = slides[0].offsetWidth + 20;

    list.scrollTo({
      left: currentIndex * slideWidth,
      behavior: "smooth",
    });

    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === totalSlides - 1;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  btnNext.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateStages();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateStages();
    }
  });

  updateStages();

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1366) {
      list.scrollTo({ left: 0 });
      currentIndex = 0;
    } else {
      updateStages();
    }
  });
});
