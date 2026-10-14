(() => {
  "use strict";

  const config = window.GESELL_CONFIG;
  const images = [...document.querySelectorAll(".hero__image")];
  const title = document.querySelector("#hero-title");

  if (!config || images.length !== config.slides.length || !title) {
    console.error("GESELL slideshow: configuration, images, or title are missing.");
    return;
  }

  let currentIndex = 0;
  let intervalId = null;

  // Preload every image so the next frame is ready before the crossfade.
  config.slides.forEach((slide) => {
    const preload = new Image();
    preload.src = slide.src;
  });

  function showSlide(nextIndex) {
    currentIndex = (nextIndex + images.length) % images.length;

    images.forEach((image, index) => {
      image.classList.toggle("is-active", index === currentIndex);
    });

    const colors = config.slides[currentIndex].titleColors;
    if (Array.isArray(colors) && colors.length >= 3) {
      title.style.setProperty("--title-start", colors[0]);
      title.style.setProperty("--title-mid", colors[1]);
      title.style.setProperty("--title-end", colors[2]);
    }
  }

  function startAutoplay() {
    if (intervalId !== null) window.clearInterval(intervalId);
    // The slideshow is the main visual experience, so it cycles automatically.
    intervalId = window.setInterval(() => {
      showSlide(currentIndex + 1);
    }, config.slideDurationMs || 6500);
  }

  // Start only after the first image has been selected.
  showSlide(0);
  startAutoplay();
})();
