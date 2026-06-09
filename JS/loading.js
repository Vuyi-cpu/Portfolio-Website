// Lock scroll immediately before anything renders
document.documentElement.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        if (loader) loader.classList.add('done');
        // Unlock after the CSS fade-out transition finishes (0.6s in main.css)
        setTimeout(() => {
            document.documentElement.classList.remove('loading');
        }, 600);
    }, 1400);
});