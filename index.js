function initMarquee() {
  const marqueeInners = document.querySelectorAll(".marquee__inner");

  marqueeInners.forEach((inner) => {
    const content = inner.querySelector(".marquee__content");

    if (!content) {
      return;
    }

    const originalHTML = content.outerHTML;
    inner.innerHTML = "";

    const targetWidth = window.innerWidth * 3;
    let currentWidth = 0;

    while (currentWidth < targetWidth) {
      inner.insertAdjacentHTML("beforeend", originalHTML);
      currentWidth += inner.lastElementChild.offsetWidth;
    }

    const fullSet = inner.innerHTML;
    inner.innerHTML = fullSet + fullSet;
  });
}

window.addEventListener("load", initMarquee);
window.addEventListener("resize", initMarquee);
