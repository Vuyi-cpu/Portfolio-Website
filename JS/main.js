//Project Card Renderer
function renderProjectCards() {
  const homeGrid       = document.querySelector('.proj-grid');
  const portfolioStack = document.querySelector('.proj-stack');

  if (homeGrid && typeof projects !== 'undefined') {
    homeGrid.innerHTML = projects.slice(0, 3).map((p, i) => `
      <article class="pc reveal" style="transition-delay:${i * .1}s">
        <div class="pc-img"><img src="${p.img}" alt="${p.title}"></div>
        <div class="pc-body">
          <div class="pc-title">${p.title}</div>
          <p class="pc-desc">${p.desc}</p>
          <button class="pc-link" onclick="openModal(${i})">View Details</button>
        </div>
        </article>
        `).join('');
  }

  if (portfolioStack && typeof projects !== 'undefined') {
    portfolioStack.innerHTML = projects.map((p, i) => `
      <article class="pc reveal">
        <div class="pc-thumb"><img src="${p.img}" alt="${p.title}" class="img-contain"></div>
        <div class="pc-info">
          <div class="pc-num">${p.num}</div>
          <div class="pc-title">${p.title}</div>
          <p class="pc-desc">${p.desc}</p>
          <div class="pc-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <button class="pc-btn" onclick="openModal(${i})">View Details</button>
        </div>
      </article>
    `).join('');
  }

  document.querySelectorAll('.reveal, .pc').forEach(el => scrollObserver.observe(el));
}


//Soft Skills Renderer
const coreStrengths = [
  'Problem Solving','Technical Aptitude','Leadership','Communication',
  'Collaboration','Adaptability','Project Management','Initiative',
  'Attention to Detail','Continuous Learning'
];

function renderCoreStrengths() {
  const container = document.querySelector('.core-strengths');
  if (!container) return;
  container.innerHTML = coreStrengths.map(s =>
    `<div class="strength-card reveal"><h4>${s}</h4></div>`
  ).join('');
  container.querySelectorAll('.strength-card').forEach(el => scrollObserver.observe(el));
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
  container.innerHTML = technologies.map((t, i) => `
    <div class="sk" data-d="${i * 60}">
      <img src="${t.img}" alt="${t.name} Icon">
      <span>${t.name}</span>
    </div>
  `).join('');
  container.querySelectorAll('.sk').forEach(el => scrollObserver.observe(el));
}


document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
  renderCoreStrengths();
  renderTechnologies();
});