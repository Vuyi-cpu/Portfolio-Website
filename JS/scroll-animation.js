// Shared IntersectionObserver used by this file and main.js
// Elements with class 'reveal' or 'sk' are watched; 'visible' is toggled as they enter/leave the viewport.
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const element = entry.target;

    if (entry.isIntersecting) {
      if (element.classList.contains('sk')) {
        // Skill icons stagger in using the data-d delay (milliseconds)
        const delay = element.dataset.d || 0;
        setTimeout(() => element.classList.add('visible'), +delay);
      } else {
        element.classList.add('visible');
      }
    } else {
      // Remove 'visible' so elements re-animate when scrolled back into view
      element.classList.remove('visible');
    }
  });
}, { threshold: .1 });

// Observe any .reveal elements already in the DOM at load time.
// Elements injected dynamically (project cards, strength cards) are observed in main.js.
document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));

// Darken the nav slightly when the user scrolls past the hero
const navBar = document.querySelector('#nav');
if (navBar) {
  navBar.style.background = 'rgba(14,14,14,.85)';
//   window.addEventListener('scroll', () => {
//     // navBar.style.background = window.scrollY > 60
//     //   ? 'rgba(14,14,14,.97)'
//     //   : 'rgba(14,14,14,.85)';
//   });
}