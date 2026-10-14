(() => {
  "use strict";

  const config = window.GESELL_CONFIG;
  const images = [...document.querySelectorAll(".hero__image")];
  const dots = [...document.querySelectorAll(".hero__dot")];
  const title = document.querySelector("#hero-title");
  const previousButton = document.querySelector("#previous-slide");
  const nextButton = document.querySelector("#next-slide");

  if (!config || images.length !== config.slides.length || !title) return;

  let currentIndex = 0;
  let intervalId = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Warm all slide images in the browser cache to avoid blank transitions.
  config.slides.forEach((slide) => {
    const preload = new Image();
    preload.src = slide.src;
  });

  function showSlide(nextIndex) {
    currentIndex = (nextIndex + images.length) % images.length;

    images.forEach((image, index) => {
      image.classList.toggle("is-active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      const active = index === currentIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-pressed", String(active));
    });

    const colors = config.slides[currentIndex].titleColors;
    title.style.setProperty("--title-start", colors[0]);
    title.style.setProperty("--title-mid", colors[1]);
    title.style.setProperty("--title-end", colors[2]);
  }

  function stopAutoplay() {
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (reducedMotion.matches || document.hidden) return;
    intervalId = window.setInterval(() => showSlide(currentIndex + 1), config.slideDurationMs);
  }

  previousButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      startAutoplay();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  reducedMotion.addEventListener?.("change", startAutoplay);
  showSlide(0);
  startAutoplay();
})();
