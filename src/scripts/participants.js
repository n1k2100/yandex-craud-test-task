document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("participants-track");
  const AUTO_PLAY_DELAY = 4000;

  if (!track) {
    return;
  }

  const originalCards = Array.from(track.children);
  const nextBtns = document.querySelectorAll(
    '[id$="next-desktop"], [id$="next-mobile"]',
  );
  const prevBtns = document.querySelectorAll(
    '[id$="prev-desktop"], [id$="prev-mobile"]',
  );
  const currentCounters = document.querySelectorAll(
    '[id$="current-desktop"], [id$="current-mobile"]',
  );

  let currentIndex = 0;
  let itemsPerView = window.innerWidth >= 1366 ? 3 : 1;
  let isTransitioning = false;
  let autoPlayTimeout = null;

  const totalOriginal = originalCards.length;
  originalCards.forEach((card) => {
    const cloneBefore = card.cloneNode(true);
    const cloneAfter = card.cloneNode(true);

    track.appendChild(cloneAfter);
    track.insertBefore(cloneBefore, track.firstChild);
  });

  currentIndex = totalOriginal;

  /**
   * Функция обновления слайдов
   */
  function updateSlider(withAnimation = true) {
    itemsPerView = window.innerWidth >= 1366 ? 3 : 1;
    const gap = 20;
    const cardWidth = originalCards[0].offsetWidth + gap;

    track.style.transition = withAnimation
      ? "transform 0.5s ease-in-out"
      : "none";
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    const normalizedIdx = (currentIndex - totalOriginal) % totalOriginal;
    const activeIdx =
      normalizedIdx < 0 ? totalOriginal + normalizedIdx : normalizedIdx;

    let displayValue = itemsPerView === 3 ? activeIdx + 3 : activeIdx + 1;

    if (displayValue > totalOriginal) {
      displayValue = displayValue % totalOriginal;
    } else if (displayValue === 0) {
      displayValue = totalOriginal;
    }

    currentCounters.forEach((el) => (el.textContent = displayValue));
  }

  /**
   * Функция автоматического смещения на 1 карточку
   */
  function startAutoPlay() {
    stopAutoPlay();

    autoPlayTimeout = setTimeout(() => {
      moveNext();
    }, AUTO_PLAY_DELAY);
  }

  /**
   * Функция остановки автоматического смещения
   */
  function stopAutoPlay() {
    if (autoPlayTimeout) {
      clearTimeout(autoPlayTimeout);
      autoPlayTimeout = null;
    }
  }

  /**
   * Функция смещения далее
   */
  function moveNext() {
    if (isTransitioning) {
      return;
    }
    isTransitioning = true;
    currentIndex++;

    updateSlider();

    const handleTransitionEnd = () => {
      if (currentIndex >= totalOriginal * 2) {
        currentIndex = totalOriginal;
        updateSlider(false);
      }

      isTransitioning = false;

      track.removeEventListener("transitionend", handleTransitionEnd);
      startAutoPlay();
    };
    track.addEventListener("transitionend", handleTransitionEnd);
  }

  /**
   * Функция отката назад
   */
  function movePrev() {
    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    currentIndex--;

    updateSlider();

    const handleTransitionEnd = () => {
      if (currentIndex <= totalOriginal - itemsPerView) {
        currentIndex = totalOriginal * 2 - itemsPerView;

        updateSlider(false);
      }
      isTransitioning = false;

      track.removeEventListener("transitionend", handleTransitionEnd);
      startAutoPlay();
    };
    track.addEventListener("transitionend", handleTransitionEnd);
  }

  nextBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      stopAutoPlay();
      moveNext();
    }),
  );

  prevBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      stopAutoPlay();
      movePrev();
    }),
  );

  track.addEventListener("mouseenter", stopAutoPlay);
  track.addEventListener("mouseleave", startAutoPlay);

  window.addEventListener("resize", () => {
    stopAutoPlay();
    updateSlider(false);
    startAutoPlay();
  });

  setTimeout(() => {
    updateSlider(false);
    startAutoPlay();
  }, 100);
});
