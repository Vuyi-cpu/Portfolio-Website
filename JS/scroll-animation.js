/**
 * SCRIPT: scroll-animation.js
 * DESCRIPTION: Triggers CSS transitions when elements enter the viewport.
 */
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  // Target specific elements defined in the PRD for animation
  const elementsToAnimate = document.querySelectorAll(
    '.project-card, .project-row, .skills-container, .hero-text, .hero-image'
  );
  
  elementsToAnimate.forEach((el) => {
    el.classList.add('hidden-animate'); // Ensure elements start invisible
    observer.observe(el);
  });
});