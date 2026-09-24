document.querySelectorAll<HTMLElement>(".floating-circle").forEach((circle) => {
  const parentElement = circle.parentElement;
  if (!parentElement) return;

  const updatePosition = () => {
    const parentRect = parentElement.getBoundingClientRect();
    const anchorX = circle.dataset.anchorX;
    const anchorY = circle.dataset.anchorY;

    let x = 0;
    let y = 0;

    if (anchorX === "left") {
      x = 0;
    } else if (anchorX === "right") {
      x = parentRect.width;
    } else {
      x = parentRect.width / 2;
    }

    if (anchorY === "top") {
      y = 0;
    } else if (anchorY === "bottom") {
      y = parentRect.height;
    } else {
      y = parentRect.height / 2;
    }

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
  };

  updatePosition();
  window.addEventListener("resize", updatePosition);

  let dragging = false;
  let startX = 0;
  let startY = 0;

  const startDrag = (event: PointerEvent) => {
    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    circle.setPointerCapture(event.pointerId);
    circle.classList.add("is-dragging");
  };

  const drag = (event: PointerEvent) => {
    if (!dragging) return;

    const x = event.clientX - startX;
    const y = event.clientY - startY;

    circle.style.setProperty("--drag-x", `${x}px`);
    circle.style.setProperty("--drag-y", `${y}px`);
  };

  const endDrag = () => {
    if (!dragging) return;

    dragging = false;
    circle.classList.remove("is-dragging");

    circle.style.setProperty("--drag-x", "0px");
    circle.style.setProperty("--drag-y", "0px");
  };

  circle.addEventListener("pointerdown", startDrag);
  circle.addEventListener("pointermove", drag);
  circle.addEventListener("pointerup", endDrag);
  circle.addEventListener("pointercancel", endDrag);
});
