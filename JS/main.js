// ==========================================================
// 1. CUSTOM CURSOR TRACKER (Disabled on Touch Devices)
// ==========================================================
const cur = document.getElementById('cur'), ring = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (cur && ring && isFinePointer) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
    
    (function animR() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animR);
    })();
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { 
            cur.style.width = '12px'; cur.style.height = '12px'; 
            ring.style.width = '46px'; ring.style.height = '46px'; 
        });
        el.addEventListener('mouseleave', () => { 
            cur.style.width = '8px'; cur.style.height = '8px'; 
            ring.style.width = '32px'; ring.style.height = '32px'; 
        });
    });
} else {
    if (cur) cur.style.display = 'none';
    if (ring) ring.style.display = 'none';
}

// ==========================================================
// 2. UNIVERSAL DYNAMIC CARD RENDERER
// ==========================================================
function renderAllCards() {
    const homeGrid = document.getElementById('proj-grid');
    const portStack = document.getElementById('proj-stack');

    if (homeGrid && typeof projects !== 'undefined') {
        homeGrid.innerHTML = projects.slice(0, 3).map((project, index) => {
            const delay = index * 0.1;
            return `
                <div class="pc reveal" style="transition-delay: ${delay}s">
                    <div class="pc-img"><img src="${project.img}" alt="${project.title}"></div>
                    <div class="pc-body">
                        <div class="pc-title">${project.title}</div>
                        <p class="pc-desc">${project.desc}</p>
                        <a href="javascript:void(0)" class="pc-link" onclick="openModal(${index})">View Details</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (portStack && typeof projects !== 'undefined') {
        portStack.innerHTML = projects.map((project, index) => {
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            return `
                <div class="pc reveal" data-project="${index}">
                    <div class="pc-thumb"><img src="${project.img}" alt="${project.title}"></div>
                    <div class="pc-info">
                        <div class="pc-num">${project.num}</div>
                        <div class="pc-title">${project.title}</div>
                        <p class="pc-desc">${project.desc}</p>
                        <div class="pc-tags">${tagsHTML}</div>
                        <button class="pc-btn" onclick="openModal(${index})">View Details →</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (typeof obs !== 'undefined') {
        document.querySelectorAll('.reveal, .pc').forEach(el => obs.observe(el));
    }
}

// ==========================================================
// 3. DYNAMIC SOCIAL ICON RENDERER
// ==========================================================
const socialLinks = [
    // IMPORTANT: Update the 'img' paths to match exactly what is in your folder!
    { name: 'GitHub', url: '#', img: './assets/icons/github.svg' },
    { name: 'LinkedIn', url: '#', img: './assets/icons/linkedin.svg' },
    { name: 'Email', url: 'mailto:Vuyim1907@gmail.com', img: './assets/icons/email.svg' },
    { name: 'Instagram', url: '#', img: './assets/icons/instagram.svg' }
];

function renderSocials() {
    const socContainers = document.querySelectorAll('.soc-row');
    
    socContainers.forEach(container => {
        // Only inject if the container is empty so we don't accidentally duplicate
        if (container.innerHTML.trim() === '') {
            container.innerHTML = socialLinks.map(link => `
                <a href="${link.url}" class="soc" aria-label="${link.name}" target="${link.url.startsWith('mailto') ? '_self' : '_blank'}">
                    <img src="${link.img}" alt="${link.name}">
                </a>
            `).join('');
        }
    });
}

// ==========================================================
// EXECUTE ALL DYNAMIC RENDERS ON LOAD
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAllCards();
    renderSocials();
});