import { currentStepStore } from "../store/index.js";
import { ITEM_INFO } from "../utils/constants.js";

export function initSectionScroll() {
  const sections = [...document.querySelectorAll(".section-reference")];

  if (!sections.length) return;

  let lastIndex = -1;

  function updateCurrentSection() {
    const center = window.innerHeight / 2;

    let closestIndex = -1;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const sectionCenter = rect.top + rect.height / 2;

      const distance = Math.abs(sectionCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = ITEM_INFO.findIndex((item) => item.id === section.id);
      }
    });

    if (closestIndex !== -1 && closestIndex !== lastIndex) {
      lastIndex = closestIndex;
      currentStepStore.value = closestIndex;
    }
  }

  updateCurrentSection();

  window.addEventListener("scroll", updateCurrentSection, {
    passive: true,
  });

  window.addEventListener("resize", updateCurrentSection);
}
