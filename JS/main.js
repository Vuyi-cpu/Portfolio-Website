//Project Card Renderer
function renderProjectCards() {
  const homeGrid    = document.querySelector('.proj-grid');
  const portfolioStack = document.querySelector('.proj-stack');

  if (homeGrid && typeof projects !== 'undefined') {
    homeGrid.innerHTML = projects.slice(0, 3).map((project, index) => `
      <article class="pc reveal" style="transition-delay: ${index * 0.1}s">
        <div class="pc-img"><img src="${project.img}" alt="${project.title}"></div>
        <div class="pc-body">
          <div class="pc-title">${project.title}</div>
          <p class="pc-desc">${project.desc}</p>
          <a href="javascript:void(0)" class="pc-link" onclick="openModal(${index})">View Details</a>
        </div>
      </article>
    `).join('');
  }

  if (portfolioStack && typeof projects !== 'undefined') {
    portfolioStack.innerHTML = projects.map((project, index) => {
      const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      return `
        <article class="pc reveal" data-project="${index}">
          <div class="pc-thumb"><img src="${project.img}" alt="${project.title}"></div>
          <div class="pc-info">
            <div class="pc-num">${project.num}</div>
            <div class="pc-title">${project.title}</div>
            <p class="pc-desc">${project.desc}</p>
            <div class="pc-tags">${tagsHTML}</div>
            <button class="pc-btn" onclick="openModal(${index})">View Details →</button>
          </div>
        </article>
      `;
    }).join('');
  }

  // Register newly-injected cards with the scroll observer
  document.querySelectorAll('.reveal, .pc').forEach(el => scrollObserver.observe(el));
}


//Soft Skills Renderer
const coreStrengths = [
  'Problem Solving', 'Technical Aptitude', 'Leadership', 'Communication',
  'Collaboration', 'Adaptability', 'Project Management', 'Initiative',
  'Attention to Detail', 'Continuous Learning'
];

function renderCoreStrengths() {
  const container = document.querySelector('.core-strengths');
  if (!container) return;

  container.innerHTML = coreStrengths.map(skill => `
    <div class="strength-card reveal"><h4>${skill}</h4></div>
  `).join('');

  container.querySelectorAll('.strength-card').forEach(card => scrollObserver.observe(card));
}


//Technology Icon Renderer
const technologies = [
  { name: 'HTML5',  img: './Assets/Icons/html.png' },
  { name: 'CSS3',   img: './Assets/Icons/css3-original.svg' },
  { name: 'JS',     img: './Assets/Icons/javascript-original.svg' },
  { name: 'Python', img: './Assets/Icons/python-original.svg' },
  { name: 'Java',   img: './Assets/Icons/java-original.svg' },
  { name: 'C++',    img: './Assets/Icons/cplusplus-original.svg' },
  { name: 'C#',     img: './Assets/Icons/csharp-original.svg' },
  { name: 'Unity',  img: './Assets/Icons/unity-original.svg' },
  { name: 'Git',    img: './Assets/Icons/git-original.svg' },
  { name: 'MySQL',  img: './Assets/Icons/mysql-plain-wordmark.svg' },
  { name: 'MATLAB', img: './Assets/Icons/matlab-original.svg' },
  { name: 'Shell',  img: './Assets/Icons/powershell-original.svg' }
];

function renderTechnologies() {
  const container = document.querySelector('.skills-grid');
  if (!container) return;

  container.innerHTML = technologies.map((tech, index) => `
    <div class="sk" data-d="${index * 60}">
      <img src="${tech.img}" alt="${tech.name} Icon">
      <span>${tech.name}</span>
    </div>
  `).join('');

  container.querySelectorAll('.sk').forEach(el => scrollObserver.observe(el));
}


document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
  renderCoreStrengths();
  renderTechnologies();
});