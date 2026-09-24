const content = document.querySelector<HTMLElement>(".content");

const sections = document.querySelectorAll<HTMLElement>("[data-section]");

const navButtons = document.querySelectorAll<HTMLAnchorElement>("[data-nav]");

if (content && sections.length && navButtons.length) {
  const updateSelected = () => {
    const contentRect = content.getBoundingClientRect();

    let currentSection: HTMLElement | null = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const distance = Math.abs(rect.top - contentRect.top);

      if (rect.top <= contentRect.top + 150 && distance < closestDistance) {
        closestDistance = distance;
        currentSection = section;
      }
    });

    if (!currentSection) {
      currentSection = sections[0];
    }

    const sectionName = currentSection.dataset.section;

    navButtons.forEach((button) => {
      button.classList.toggle(
        "is-selected",
        button.dataset.nav === sectionName,
      );
    });
  };

  content.addEventListener("scroll", updateSelected, {
    passive: true,
  });

  window.addEventListener("resize", updateSelected);

  updateSelected();
}

// Shrunk
const introName = document.querySelector<HTMLElement>(".intro-name");

const navigatorBar = document.querySelector<HTMLElement>(".navigator");

if (content && introName && navigatorBar) {
  const updateNavigatorSize = () => {
    const nameRect = introName.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    const triggerPoint = contentRect.top + 80;

    navigatorBar.classList.toggle("is-shrunk", nameRect.bottom < triggerPoint);
  };

  content.addEventListener("scroll", updateNavigatorSize, {
    passive: true,
  });

  window.addEventListener("resize", updateNavigatorSize);

  updateNavigatorSize();
}
