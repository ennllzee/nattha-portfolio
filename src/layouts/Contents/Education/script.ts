import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { icon as iconCall } from "@fortawesome/fontawesome-svg-core";

const education = document.querySelector<HTMLButtonElement>(".education");

if (education) {
  const button = education.querySelector<HTMLButtonElement>(".more-button");

  if (button) {
    const icon = button.querySelector(".more-icon");
    const text = button.querySelector(".more-text");

    if (icon && text)
      button.addEventListener("click", () => {
        const isExpanded = education.classList.toggle("is-expanded");

        console.log(isExpanded)

        button.setAttribute("aria-expanded", String(!isExpanded));

        const iconSpan = icon.querySelector("span");
        if (iconSpan)
          iconSpan.innerHTML = isExpanded
            ? iconCall(faMinus).html.join("")
            : iconCall(faPlus).html.join("");
        text.textContent = isExpanded ? "CLOSE" : "MORE";
      });
  }
}
