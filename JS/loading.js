// Lock scroll immediately before anything renders
document.documentElement.classList.add('loading');

window.addEventListener('pageshow', (event) => {
    // Reset loader state when returning via back button
    const loader = document.querySelector('#loader');
    if (loader) {
        loader.classList.remove('done');
    }

    setTimeout(() => {
        if (loader) loader.classList.add('done');

        // Unlock after CSS fade-out
        setTimeout(() => {
            document.documentElement.classList.remove('loading');
        }, 600);
    }, 1400);
});