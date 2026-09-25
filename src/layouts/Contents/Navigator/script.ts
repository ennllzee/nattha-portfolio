const layout = document.querySelector<HTMLElement>(".portfolio-layout");

const mobileSidebar = document.querySelector<HTMLElement>(".mobile-sidebar");

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

const updateMobileSidebarState = (sectionName?: string) => {
  if (!mobileSidebar || !content) return;

  const contentRect = content.getBoundingClientRect();

  // Sidebar is still visible → show full sidebar
  if (!sectionName || (sectionName && contentRect.top > -50)) {
    mobileSidebar.classList.remove("is-top-bar", "is-expanded");
    return;
  }

  if (sectionName) {
    const isTopBar = true;
    mobileSidebar.classList.toggle("is-top-bar", isTopBar);

    const isExpanded = sectionName !== "introduction";
    mobileSidebar.classList.toggle("is-expanded", isExpanded);
  } else {
    mobileSidebar.classList.toggle("is-top-bar", false);
  }
};

if (content && sections.length && navButtons.length) {
  const updateSelected = () => {
    const isTabletOrMobile = window.matchMedia("(max-width: 1111px)").matches;
    const scrollTop = isTabletOrMobile
      ? window.scrollY
      : (content?.scrollTop ?? 0);

    let currentSection: HTMLElement | null = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const sectionTop = isTabletOrMobile
        ? rect.top
        : rect.top - (content?.getBoundingClientRect().top ?? 0);

      const distance = Math.abs(sectionTop);

      if (sectionTop <= 150 && distance < closestDistance) {
        closestDistance = distance;
        currentSection = section;
      }
    });

    const sectionName = currentSection
      ? (currentSection as HTMLElement).dataset.section
      : null;

    navButtons.forEach((button) => {
      button.classList.toggle(
        "is-selected",
        button.dataset.nav === sectionName,
      );
    });

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      if (sectionName && sectionName !== lastSectionName) {
        expandCurrentButton(sectionName);
        lastSectionName = sectionName;
      }

      updateMobileSidebarState(sectionName ?? undefined);
    }
  };

  const setupNavigator = () => {
    const isTabletOrMobile = window.matchMedia("(max-width: 1111px)").matches;
    const targetContent = isTabletOrMobile ? window : content;

    targetContent.addEventListener("scroll", updateSelected, {
      passive: true,
    });

    updateSelected();
  };

  window.addEventListener("resize", setupNavigator);

  setupNavigator();
}

// Desktop Shrunk
const heroName = document.querySelector<HTMLElement>(".hero-name");

const navigatorBar = document.querySelector<HTMLElement>(".navigator");

if (content && heroName && navigatorBar && layout) {
  const updateNavigatorSize = () => {
    const nameRect = heroName.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    const triggerPoint = contentRect.top + 80;
    const isShrunk = nameRect.bottom < triggerPoint;

    navigatorBar.classList.toggle("is-shrunk", isShrunk);
    layout.classList.toggle("is-shrunk", isShrunk);
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
