const content = document.querySelector<HTMLElement>(".content");

const sections = document.querySelectorAll<HTMLElement>("[data-section]");

const navButtons = document.querySelectorAll<HTMLAnchorElement>("[data-nav]");

let lastSectionName = "";

// Mobile Expand
let expansionTimer: number | null = null;

const expandCurrentButton = (sectionName: string) => {
  const button = document.querySelector<HTMLAnchorElement>(
    `.navigator-button[data-nav="${sectionName}"]`,
  );

  if (!button) return;

  if (expansionTimer !== null) {
    window.clearTimeout(expansionTimer);
  }

  document.querySelectorAll(".navigator-button.is-expanded").forEach((item) => {
    item.classList.remove("is-expanded");
  });

  button.classList.add("is-expanded");

  expansionTimer = window.setTimeout(() => {
    button.classList.remove("is-expanded");
    expansionTimer = null;
  }, 1500);
};

if (content && sections.length && navButtons.length) {
  const updateSelected = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const scrollTop = isMobile ? window.scrollY : (content?.scrollTop ?? 0);

    let currentSection: HTMLElement | null = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const sectionTop = isMobile
        ? rect.top
        : rect.top - (content?.getBoundingClientRect().top ?? 0);

      const distance = Math.abs(sectionTop);

      if (sectionTop <= 150 && distance < closestDistance) {
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

    if (window.matchMedia("(max-width: 767px)").matches) {
      if (sectionName && sectionName !== lastSectionName) {
        expandCurrentButton(sectionName);
        lastSectionName = sectionName;
      }
    }
  };

  const setupNavigator = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const targetContent = isMobile ? window : content;

    targetContent.addEventListener("scroll", updateSelected, {
      passive: true,
    });

    updateSelected();
  };

  window.addEventListener("resize", setupNavigator);

  setupNavigator();
}

// Desktop Shrunk
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

const sidebar = document.querySelector<HTMLElement>(".sidebar");

if (sidebar && navigatorBar) {
  const updateMobileNavigator = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile) {
      navigatorBar.classList.remove("is-mobile-visible");
      return;
    }

    const sidebarRect = sidebar.getBoundingClientRect();

    const sidebarBottom = sidebarRect.bottom;

    // Show navigator when the sidebar has left the viewport
    if (sidebarBottom <= 100) {
      navigatorBar.classList.add("is-mobile-visible");
    } else {
      navigatorBar.classList.remove("is-mobile-visible");
    }
  };

  window.addEventListener("scroll", updateMobileNavigator, {
    passive: true,
  });

  window.addEventListener("resize", updateMobileNavigator);

  updateMobileNavigator();
}
