// lock scroll straight away so the page doesn't jump before the loader appears
document.documentElement.classList.add('loading');

window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('#loader');

  // keep the loader visible for 1.4 seconds, then fade it out
  setTimeout(() => {
    if (loader) loader.classList.add('done');

    // remove the scroll lock after the CSS fade transition finishes (0.6s)
    setTimeout(() => {
      document.documentElement.classList.remove('loading');
    }, 600);

  }, 1400);
});