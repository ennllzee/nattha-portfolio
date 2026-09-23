import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { icon as iconCall } from "@fortawesome/fontawesome-svg-core";

const EXPANDED_TEXT = "CLOSE";
const COLLAPSED_TEXT = "MORE";

document
  .querySelectorAll<HTMLButtonElement>(".more-button")
  .forEach((button) => {
    const refClass = button.dataset.refClass;
    const expandClass = button.dataset.expandClass;

    if (!refClass || !expandClass) return;

    const refContainer = button.closest(`.${refClass}`);
    if (!refContainer) return;

    const expandableContainer =
      refContainer.querySelector(".education-details");

    if (!expandableContainer) return;

    const icon = button.querySelector(".more-icon");
    const iconSpan = icon?.querySelector("span");
    const text = button.querySelector(".more-text");

    if (!iconSpan || !text) return;

    if (button.getAttribute("aria-expanded") === "true") {
      expandableContainer.classList.remove("is-collapsed");
      expandableContainer.classList.add("is-expanded");
    } else {
      expandableContainer.classList.add("is-collapsed");
      expandableContainer.classList.remove("is-expanded");
    }

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      const nextExpanded = !isExpanded;

      button.setAttribute("aria-expanded", String(nextExpanded));

      if (nextExpanded) {
        expandableContainer.classList.remove("is-collapsed");
        expandableContainer.classList.add("is-expanded");
        iconSpan.innerHTML = iconCall(faMinus).html.join("");
        text.textContent = EXPANDED_TEXT;
      } else {
        expandableContainer.classList.add("is-collapsed");
        expandableContainer.classList.remove("is-expanded");
        iconSpan.innerHTML = iconCall(faPlus).html.join("");
        text.textContent = COLLAPSED_TEXT;
      }
    });
  });
