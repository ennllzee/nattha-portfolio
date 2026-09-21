document.querySelectorAll(".stage-preview").forEach((preview) => {
  const images = preview.querySelectorAll(".stage-image");

  let current = 0;
  let interval: number | undefined;

  let total = images.length;

  if (total <= 1) return;

  const showImage = (index: number) => {
    images.forEach((image) => image.classList.remove("active"));
    images[index].classList.add("active");
    current = index;
  };

  const start = () => {
    if (interval) return;

    // Start with Image 2
    showImage(1);

    // Then alternate Image 2 ↔ Image 3
    interval = window.setInterval(() => {
      showImage(current === total - 1 ? 1 : current + 1);
    }, 800);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    // Return to Image 1
    showImage(0);
  };

  preview.addEventListener("mouseenter", start);
  preview.addEventListener("mouseleave", stop);

  preview.addEventListener("touchstart", start, {
    passive: true,
  });

  preview.addEventListener("touchend", stop);
  preview.addEventListener("touchcancel", stop);
});
