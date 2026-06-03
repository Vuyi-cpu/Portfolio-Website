// ==========================================================
// 1. UNIVERSAL DYNAMIC CARD RENDERER
// ==========================================================
function renderAllCards() {
    const homeGrid = document.querySelector('.proj-grid');
    const portStack = document.querySelector('.proj-stack');

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
// 2. DYNAMIC SOCIAL ICON RENDERER
// ==========================================================
const socialLinks = [
    { name: 'GitHub', url: '#', img: './assets/icons/github.svg' },
    { name: 'LinkedIn', url: '#', img: './assets/icons/linkedin.svg' },
    { name: 'Email', url: 'mailto:Vuyim1907@gmail.com', img: './assets/icons/email.svg' },
    { name: 'Instagram', url: '#', img: './assets/icons/instagram.svg' }
];

function renderSocials() {
    const socContainers = document.querySelectorAll('.soc-row');
    
    socContainers.forEach(container => {
        if (container.innerHTML.trim() === '') {
            container.innerHTML = socialLinks.map(link => `
                <a href="${link.url}" class="soc" aria-label="${link.name}" target="${link.url.startsWith('mailto') ? '_self' : '_blank'}">
                    <img src="${link.img}" alt="${link.name}">
                </a>
            `).join('');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllCards();
    renderSocials();
});