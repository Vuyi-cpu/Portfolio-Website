document.addEventListener('DOMContentLoaded', () => {
  injectLayoutComponents();
  setupHamburgerMenu();
  setupPageTransitions();
});

function injectLayoutComponents() {
  const navEl= document.querySelector('nav');
  const mobEl= document.querySelector('#mobile-menu');
  const footerEl= document.querySelector('footer');

  const pages = [
    { name: 'Home',url: 'index.html' },
    { name: 'About',url: 'about.html' },
    { name: 'Portfolio', url: 'portfolio.html' },
    { name: 'Contact',url: 'contact.html' }
  ];
// Extracts the current page filename to highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const activeClass = url => currentPage === url ? 'class="active"' : '';

  if (navEl) {
    navEl.innerHTML = `
      <a href="index.html" class="nav-logo">Vuyisa</a>
      <ul class="nav-links">
        ${pages.map(p => `<li><a href="${p.url}" ${activeClass(p.url)}>${p.name}</a></li>`).join('')}
      </ul>
      <button class="ham" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  if (mobEl) {
    mobEl.innerHTML = pages.map(p =>
      `<a href="${p.url}" ${activeClass(p.url)}>${p.name}</a>`
    ).join('');
  }

  if (footerEl) {
    footerEl.innerHTML = `
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
      <div><p>Email: Vuyim1907@gmail.com</p></div>
      <div style="text-align:right"><div class="f-copy">© 2026 — All rights reserved</div></div>
    `;
  }
}

function setupHamburgerMenu() {
  const btn  = document.querySelector('#hamburger');
  const menu = document.querySelector('#mobile-menu');
  if (!btn || !menu) return;
// Restores the hamburger icon after the menu closes.
  const resetSpans = () => btn.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity   = '';
  });

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    if (open) {// Rotates the three bars into a cross ("X") icon
      const [s0, s1, s2]= btn.querySelectorAll('span');
      s0.style.transform= 'rotate(45deg) translate(4.5px,4.5px)';
      s1.style.opacity= '0';
      s2.style.transform= 'rotate(-45deg) translate(4.5px,-4.5px)';
    } else {
      resetSpans();
    }
  });

// Automatically closes the mobile menu after a link is tapped
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      resetSpans();
    });
  });
}

function setupPageTransitions() {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // FIX: use 'javascript:' and 'mailto:' (with colon) to avoid false matches
    // against path segments that happen to start with those words
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('javascript:') || href.startsWith('mailto:') ||
        link.hasAttribute('download')) return;

    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 300);
  });
}