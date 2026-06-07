const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        const el = e.target;
        
        if (e.isIntersecting) {
            if (el.classList.contains('sk')) {
                const d = el.dataset.d || 0;
                setTimeout(() => el.classList.add('visible'), +d);
            } else {
                el.classList.add('visible');
            }
        } 
        
        else {
            el.classList.remove('visible');
        }
    });
}, { threshold: .1 });

document.querySelectorAll('.reveal, .sk, .pc').forEach(el => obs.observe(el));

const nav = document.querySelector('#nav');
if (nav) {
    
    nav.style.background = 'rgba(14,14,14,.85)'; 
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 60 ? 'rgba(14,14,14,.97)' : 'rgba(14,14,14,.85)';
    });
}