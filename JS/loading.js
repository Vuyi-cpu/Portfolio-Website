/**
 * SCRIPT: loading.js
 * DESCRIPTION: Manages page-load spinner and smooth link transitions.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inject Loader CSS Overlay
  const loaderHTML = `<div id="page-loader" class="loader"><div class="spinner"></div></div>`;
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);

  const loader = document.getElementById('page-loader');

  // Hide loader once the page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 300);
    }, 200); 
  });

  // Intercept clicks on internal links to show loading state
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      
      // Filter for internal pages only
      if (target && !target.startsWith('http') && !target.startsWith('#') && !link.hasAttribute('download')) {
        e.preventDefault();
        loader.style.display = 'flex';
        setTimeout(() => { loader.style.opacity = '1'; }, 10);
        
        // Brief delay before redirecting for visual effect
        setTimeout(() => {
          window.location.href = target;
        }, 300);
      }
    });
  });
});