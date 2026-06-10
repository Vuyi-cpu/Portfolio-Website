document.addEventListener('DOMContentLoaded', () => {
  injectLayoutComponents();
  setupHamburgerMenu();
  setupPageTransitions();
});


//Nav & Footer Injection

function injectLayoutComponents() {
  const navEl    = document.querySelector('nav');
  const mobEl    = document.querySelector('#mobile-menu');
  const footerEl = document.querySelector('footer');

  const pages = [
    { name: 'Home', url: 'index.html'     },
    { name: 'About',url: 'about.html'     },
    { name: 'Portfolio',url: 'portfolio.html' },
    { name: 'Contact',url: 'contact.html'   }
  ];

  // grab just the filename from the URL so we can highlight the current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function getActiveClass(url) {
    if (currentPage === url) {
      return 'class="active"';
    }
    return '';
  }

  if (navEl) {
    navEl.innerHTML = `
      <a href="index.html" class="nav-logo">Vuyisa</a>
      <ul class="nav-links">
        ${pages.map(p => `<li><a href="${p.url}" ${getActiveClass(p.url)}>${p.name}</a></li>`).join('')}
      </ul>
      <button class="ham" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  if (mobEl) {
    mobEl.innerHTML = pages.map(p =>
      `<a href="${p.url}" ${getActiveClass(p.url)}>${p.name}</a>`
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
      <div>
        <p>Email: <a href="mailto:Vuyim1907@gmail.com">Vuyim1907@gmail.com</a></p>
      </div>
      <div style="text-align:right">
        <div class="f-copy">© 2026 — All rights reserved</div>
      </div>
    `;
  }
}


//Hamburger Menu

function setupHamburgerMenu() {
  const btn  = document.querySelector('#hamburger');
  const menu = document.querySelector('#mobile-menu');
  if (!btn || !menu) return;

  // puts the three bars back to their default position
  function resetSpans() {
    btn.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  }

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);

    if (open) {
      // rotate the three bars into an X shape
      const spans = btn.querySelectorAll('span');
      spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    } else {
      resetSpans();
    }
  });

  // close the mobile menu automatically when a link inside it is tapped
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      resetSpans();
    });
  });
}


// Page transitions

function setupPageTransitions() {
  // one listener on the whole body catches every link click
  document.body.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    if (!href
      || href.startsWith('#')
      || href.startsWith('http')
      || href.startsWith('mailto:')
      || link.hasAttribute('download')) return;

    // fade the page out then navigate after the transition finishes
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 300);
  });
}