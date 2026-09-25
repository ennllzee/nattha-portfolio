const updateParallax = () => {
  document
    .querySelectorAll<HTMLElement>("[data-parallax]")
    .forEach((element) => {
      const rect = element.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);

      const offset = (progress - 0.5) * -200;

      element.style.setProperty("--parallax-offset", `${offset}px`);
    });
};

let scrollTarget: Window | HTMLElement | null = null;

const setupParallax = () => {
  if (scrollTarget) {
    scrollTarget.removeEventListener("scroll", updateParallax);
  }

  const isTabletOrMobile = window.matchMedia("(max-width: 1111px)").matches;

  scrollTarget = isTabletOrMobile
    ? window
    : (document.querySelector<HTMLElement>(".content") ?? window);

  scrollTarget.addEventListener("scroll", updateParallax, {
    passive: true,
  });

  updateParallax();
};

setupParallax();

window.addEventListener("resize", setupParallax);
