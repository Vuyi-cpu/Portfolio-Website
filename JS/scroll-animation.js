const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        
        if (el.classList.contains('sk')) {
            const d = el.dataset.d || 0;
            setTimeout(() => el.classList.add('visible'), +d);
        } else {
            el.classList.add('visible');
        }
        obs.unobserve(el);
    });
}, { threshold: .1 });

document.querySelectorAll('.reveal, .sk, .pc').forEach(el => obs.observe(el));

const nav = document.getElementById('nav');
if (nav) {
    // Specifically targets index.html transparent navbar logic
    nav.style.background = 'rgba(14,14,14,.85)'; 
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 60 ? 'rgba(14,14,14,.97)' : 'rgba(14,14,14,.85)';
    });
}