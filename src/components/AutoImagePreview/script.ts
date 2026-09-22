document.querySelectorAll(".auto-image-preview").forEach((preview) => {
  const images = preview.querySelectorAll<HTMLImageElement>(".auto-image");

  const total = images.length;
  if (total < 2) return;

  let current = 0;
  let timer: number | null = null;

  const interval = Number(
    (preview as HTMLImageElement).dataset.interval || 600,
  );
  const showNext = () => {
    images[current].classList.remove("active");

    current = current === total - 1 ? 0 : current + 1;

    images[current].classList.add("active");
  };

  const start = () => {
    if (timer !== null) return;

    timer = window.setInterval(showNext, interval);
  };

  const stop = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  preview.addEventListener("mouseenter", stop);
  preview.addEventListener("mouseleave", start);

  preview.addEventListener("touchstart", stop, { passive: true });
  preview.addEventListener("touchend", start);

  start();
});
