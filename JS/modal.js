const projects = [
  {num:'01 / 04',title:'Personal Portfolio Website',img:'https://portfolio-website-alpha-two-33.vercel.app/assets/images/p3.jpg',tags:['HTML','CSS','JavaScript','Responsive'],desc:'A fully custom portfolio website built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. Designed to professionally present my skills, projects, and background to potential employers and clients.',process:'The project began with a detailed PRD and wireframe phase, defining user personas, content architecture, and visual direction. Development followed the structure laid out in the document, with a focus on clean semantic HTML, modular CSS, and interactive JavaScript features.',features:'Loading states with animated transitions, scroll-triggered animations using Intersection Observer, a custom cursor, typewriter hero effect, responsive hamburger navigation, modal/lightbox project displays, and a structured file architecture following the PRD specification.'},
  {num:'02 / 04',title:'Interactive Game Project',img:'https://portfolio-website-alpha-two-33.vercel.app/assets/images/p1.jpg',tags:['Unity','C#','Game Design','UI'],desc:'An interactive game project developed in Unity using C#, focused on logic-driven gameplay, real-time state management, and a clean UI that guides the player through challenges intuitively.',process:'Starting with a game design document, I mapped out the core mechanics, win/lose conditions, and user flow. Development involved setting up Unity scenes, writing C# scripts for game logic, and designing UI components using Unity\'s Canvas system.',features:'Real-time state management, score tracking, animated transitions between game states, custom UI components, player feedback systems, and a responsive interface that scales across different screen resolutions.'},
  {num:'03 / 04',title:'Responsive Multi-Page Website',img:'https://portfolio-website-alpha-two-33.vercel.app/assets/images/p2.jpg',tags:['HTML','CSS Grid','JavaScript','Mobile-first'],desc:'A fully responsive multi-page website designed and built to adapt seamlessly across mobile, tablet, and desktop viewports, with a mobile-first approach and careful attention to layout behaviour at each breakpoint.',process:'The site was planned with responsive wireframes at all three breakpoints before any code was written. A mobile-first CSS approach was used, progressively enhancing layouts for larger screens using CSS Grid and Flexbox.',features:'Three-breakpoint responsive layout (mobile 480px, tablet 768px, desktop 769px+), hamburger navigation on mobile, CSS Grid masonry-style layout, hover micro-interactions, and consistent component styling across all pages.'},
  {num:'04 / 04',title:'UI Component Library',img:'https://portfolio-website-alpha-two-33.vercel.app/assets/images/project4.jpg',tags:['HTML','CSS','JavaScript','Design Systems'],desc:'A structured collection of reusable UI components — buttons, cards, modals, form elements, and navigation patterns — built with clean, semantic HTML and CSS custom properties for easy theming.',process:'Each component was designed with reusability and consistency in mind, using CSS custom properties for tokens like colour, spacing, and typography. JavaScript was used to add interaction patterns like toggle states, form validation, and modal behaviour.',features:'Fully documented component library, CSS custom property theming, interactive demos for each component, consistent visual language across all elements, and clear naming conventions that follow the project\'s style guidelines.'}
];

function openModal(i) {
    const p = projects[i];
    const bg = document.getElementById('modal-bg');
    if (!bg) return;
    
    document.getElementById('m-img').src = p.img;
    document.getElementById('m-num').textContent = p.num;
    document.getElementById('m-title').textContent = p.title;
    document.getElementById('m-desc').textContent = p.desc;
    document.getElementById('m-process').textContent = p.process;
    document.getElementById('m-features').textContent = p.features;
    
    const tags = document.getElementById('m-tags');
    tags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    
    bg.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
    const bg = document.getElementById('modal-bg');
    if (bg) {
        bg.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function closeModal(e) {
    if (e.target === document.getElementById('modal-bg')) closeModalDirect();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModalDirect();
});