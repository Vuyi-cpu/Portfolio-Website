document.addEventListener('DOMContentLoaded', () => {
  
    injectLayoutComponents();

    
    setupHamburgerMenu();

   
    if (typeof renderSocials === 'function') {
        renderSocials();
    }
});

function injectLayoutComponents() {
    const navContainer = document.getElementById('nav');
    const mobMenuContainer = document.getElementById('mm');
    const footerContainer = document.querySelector('footer');

   
    const pages = [
        { name: 'Home', url: 'index.html' },
        { name: 'About', url: 'about.html' },
        { name: 'Portfolio', url: 'portfolio.html' },
        { name: 'Contact', url: 'contact.html' }
    ];

  
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
            <button class="ham" id="ham" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        `;
    }

  
    if (mobMenuContainer) {
        mobMenuContainer.innerHTML = pages.map(page => {
            const isActive = currentPage === page.url ? 'class="active"' : '';
            return `<a href="${page.url}" ${isActive}>${page.name}</a>`;
        }).join('');
    }

   // C. Dynamic Fixed 3-Column Footer Component Rendering
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="f-logo">Social Links</div>
                
             <div class="soc-row" style="display: flex; gap: 10px;">
             <a href="https://github.com/Vuyi-cpu" class="soc" aria-label="GitHub">
             <img src="./Assets/Icons/Github.png" alt="GitHub">
             </a> 
    
    <a href="https://linkedin.com/in/your-username" class="soc" aria-label="LinkedIn">
        <img src="./Assets/Icons/linkedin-original.svg" alt="LinkedIn">
    </a>
    
    <a href="https://www.instagram.com/jake_msipa/?hl=en" class="soc" aria-label="Instagram">
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

function setupHamburgerMenu() {
    const ham = document.querySelector('#ham');
    const mm = document.querySelector('#mm');

    if (ham && mm) {
      
        ham.addEventListener('click', () => {
            mm.classList.toggle('open');
            const s = ham.querySelectorAll('span');
            
            if (mm.classList.contains('open')) {
                s[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
                s[1].style.opacity = '0';
                s[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
            } else {
                s.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });

      
        mm.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mm.classList.remove('open');
                ham.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}