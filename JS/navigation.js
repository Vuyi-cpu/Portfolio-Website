document.addEventListener('DOMContentLoaded', () => {
  injectLayoutComponents();
  setupHamburgerMenu();
  setupPageTransitions();
});

// Injects the shared nav, mobile menu, and footer into every page
function injectLayoutComponents() {
  const navContainer        = document.getElementById('nav');
  const mobileMenuContainer = document.getElementById('mobile-menu');
  const footerContainer     = document.querySelector('footer');

  const pages = [
    { name: 'Home',      url: 'index.html' },
    { name: 'About',     url: 'about.html' },
    { name: 'Portfolio', url: 'portfolio.html' },
    { name: 'Contact',   url: 'contact.html' }
  ];

  // Determine the active page by comparing the filename in the URL path
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  if (navContainer) {
    navContainer.innerHTML = `
      <a href="index.html" class="nav-logo">Vuyisa</a>
      <ul class="nav-links">
        ${pages.map(page => {
          const isActive = currentPage === page.url ? 'class="active"' : '';
          return `<li><a href="${page.url}" ${isActive}>${page.name}</a></li>`;
        }).join('')}
      </ul>
      <button class="ham" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  if (mobileMenuContainer) {
    mobileMenuContainer.innerHTML = pages.map(page => {
      const isActive = currentPage === page.url ? 'class="active"' : '';
      return `<a href="${page.url}" ${isActive}>${page.name}</a>`;
    }).join('');
  }

  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="f-col">
        <div class="f-logo">Social Links</div>
        <div class="soc-row">
          <a href="https://github.com/Vuyi-cpu" class="soc" aria-label="GitHub">
            <img src="./Assets/Icons/Github.png" alt="GitHub">
          </a>
          <a href="https://linkedin.com/in/vuyi-msipa-71b5a3293" class="soc" aria-label="LinkedIn">
            <img src="./Assets/Icons/linkedin-original.svg" alt="LinkedIn">
          </a>
          <a href="https://instagram.com/jake_msipa/?hl=en" class="soc" aria-label="Instagram">
            <img src="./Assets/Icons/instagram.png" alt="Instagram">
          </a>
        </div>
      </div>
      <div>
        <p>Email: Vuyim1907@gmail.com</p>
      </div>
      <div style="text-align: right;">
        <div class="f-copy">© 2026 — All rights reserved</div>
      </div>
    `;
  }
}

// Hamburger toggle — animates the icon into an × and opens the slide-down menu
function setupHamburgerMenu() {
  const hamburgerBtn = document.querySelector('#hamburger');
  const mobileMenu   = document.querySelector('#mobile-menu');
  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const hamburgerSpans = hamburgerBtn.querySelectorAll('span');

    if (mobileMenu.classList.contains('open')) {
      hamburgerSpans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
      hamburgerSpans[1].style.opacity   = '0';
      hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    } else {
      hamburgerSpans.forEach(span => {
        span.style.transform = '';
        span.style.opacity   = '';
      });
    }
  });

  // Close the mobile menu when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerBtn.querySelectorAll('span').forEach(span => {
        span.style.transform = '';
        span.style.opacity   = '';
      });
    });
  });
}

// Fade the page out before navigating so the loader on the next page feels intentional
function setupPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Skip anchors, external links, JS handlers, mailto, and download links
    if (!href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('javascript') ||
        href.startsWith('mailto') ||
        link.hasAttribute('download')) return;

    link.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.add('page-exit');
      // Wait for the 0.3s CSS opacity transition before navigating
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });
}