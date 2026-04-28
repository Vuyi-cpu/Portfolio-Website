/**
 * =========================================
 * scroll-animation.js
 * Re-trigger animations on scroll up/down
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }

    });
  }, {
    threshold: 0.3
  });

  const elements = document.querySelectorAll(
    ".project-card, .project-row, .skills-container, .hero-text, .hero-image"
  );

  elements.forEach(el => {
    el.classList.add("hidden-animate");
    observer.observe(el);
  });

});