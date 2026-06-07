//Card Renderer

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

// Socials Icon Renderer

const socialLinks = [
    { name: 'GitHub', url: '#', img: './Assets/Icons/github-original.svg' },
    { name: 'LinkedIn', url: '#', img: './Assets/Icons/linkedin-original.svg' },
    { name: 'Instagram', url: '#', img: './Assets/Icons/instagram.svg' }
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

//Strengths Renderer

const coreStrengths = [
    'Problem Solving',
    'Technical Aptitude',
    'Leadership',
    'Communication',
    'Collaboration',
    'Adaptability',
    'Project Management',
    'Initiative',
    'Attention to Detail',
    'Continuous Learning'
];

function renderCoreStrengths() {
    const container = document.querySelector('.core-strengths');

    if (!container) return;

    container.innerHTML = coreStrengths.map(skill => `
        <div class="strength-card reveal">
            <h4>${skill}</h4>
        </div>
    `).join('');

    if (typeof obs !== 'undefined') {
        container.querySelectorAll('.strength-card').forEach(card => obs.observe(card));
    }
}

//Technology Icon Renderer

const technologies = [
    { name: 'HTML5', img: './Assets/Icons/html5-original.svg' },
    { name: 'CSS3', img: './Assets/Icons/css3-original.svg' },
    { name: 'JS', img: './Assets/Icons/javascript-original.svg' },
    { name: 'Python', img: './Assets/Icons/python-original.svg' },
    { name: 'Java', img: './Assets/Icons/java-original.svg' },
    { name: 'C++', img: './Assets/Icons/cplusplus-original.svg' },
    { name: 'C#', img: './Assets/Icons/csharp-original.svg' },
    { name: 'Unity', img: './Assets/Icons/unity-original.svg' },
    { name: 'Git', img: './Assets/Icons/git-original.svg' },
    { name: 'MySQL', img: './Assets/Icons/mysql-plain-wordmark.svg' },
    { name: 'MATLAB', img: './Assets/Icons/matlab-original.svg' },
    { name: 'Shell', img: './Assets/Icons/powershell-original.svg' }
];

function renderTechnologies() {
    const container = document.querySelector('.skills-grid');

    if (!container) return;

    container.innerHTML = technologies.map((tech, index) => {
        const delay = index * 60; 
        return `
            <div class="sk" data-d="${delay}">
                <img src="${tech.img}" alt="${tech.name} Icon">
                <span>${tech.name}</span>
            </div>
        `;
    }).join('');

    if (typeof obs !== 'undefined') {
        container.querySelectorAll('.sk').forEach(el => obs.observe(el));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderAllCards();
    renderSocials();
    renderCoreStrengths();
    renderTechnologies(); 
});
