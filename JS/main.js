// Add this to your JS/main.js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.project-card, .project-row');
hiddenElements.forEach((el) => observer.observe(el));