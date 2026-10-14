// Toggle "+ Abstract" / "+ Press coverage" panels. Only one panel per paper is open at a time.
document.addEventListener("click", function (event) {
  const trigger = event.target.closest("[data-expandable-target]");
  if (!trigger) return;
  event.preventDefault();

  const content = document.getElementById(trigger.dataset.expandableTarget);
  if (!content) return;
  const isOpening = content.classList.contains("expandable-hide");

  if (isOpening) {
    const group = content.dataset.expandableGroup;
    document.querySelectorAll(".expandable-show[data-expandable-group]").forEach(function (el) {
      if (el !== content && el.dataset.expandableGroup === group) {
        const t = document.querySelector('[data-expandable-target="' + el.id + '"]');
        setState(el, t, false);
      }
    });
  }
  setState(content, trigger, isOpening);
});

function setState(content, trigger, isOpen) {
  content.classList.toggle("expandable-hide", !isOpen);
  content.classList.toggle("expandable-show", isOpen);
  if (!trigger) return;
  const icon = trigger.querySelector(".toggle-icon");
  if (icon) icon.textContent = isOpen ? "−" : "+";
  trigger.setAttribute("aria-expanded", String(isOpen));
}
