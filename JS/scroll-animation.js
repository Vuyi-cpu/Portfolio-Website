// Elements with class 'reveal' or 'sk' are watched; 'visible' is toggled as they enter or leave the viewport.
window.scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      if (target.classList.contains('sk')) {
        const tid = setTimeout(() => target.classList.add('visible'), +(target.dataset.d || 0));
        target._skTid = tid;
      } else {
        target.classList.add('visible');
      }
    } else {
      if (target._skTid) {
        clearTimeout(target._skTid);
        delete target._skTid;
      }
      target.classList.remove('visible');
    }
  });
}, { threshold: .1 });

// Observe .reveal elements already in the DOM at load time.
// Dynamically injected elements (project cards, strength cards) are observed in main.js.
document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));

// Darken the nav when the user scrolls past the hero.
const navBar = document.querySelector('#nav');
if (navBar) {
  window.addEventListener('scroll', () => {
    navBar.style.background = window.scrollY > 60
      ? 'rgba(14,14,14,.97)'
      : 'rgba(14,14,14,.85)';
  }, { passive: true });
}