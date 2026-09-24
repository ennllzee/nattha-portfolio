document
  .querySelectorAll<HTMLElement>(".image-buttons-container")
  .forEach((container) => {
    const buttons =
      container.querySelectorAll<HTMLButtonElement>(".image-button");

    const title = container.querySelector<HTMLElement>(".image-button-info h4");

    const description = container.querySelector<HTMLElement>(
      ".image-button-info p",
    );

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");

        if (title) {
          title.textContent = button.dataset.title || "";
        }

        if (description) {
          description.textContent = button.dataset.description || "";
        }
      });
    });
  });
