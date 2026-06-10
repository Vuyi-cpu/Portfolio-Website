// Lock scroll immediately before anything renders
document.documentElement.classList.add('loading');

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('page-exit');
        // Also skip the loading animation on bfcache restore — page is already ready.
        const loader = document.querySelector('#loader');
        if (loader) loader.classList.add('done');
        document.documentElement.classList.remove('loading');
        return;
    }

    // Normal page load — run the loading animation as usual.
    const loader = document.querySelector('#loader');
    if (loader) loader.classList.remove('done');

    setTimeout(() => {
        if (loader) loader.classList.add('done');

        // Unlock scroll after CSS fade-out
        setTimeout(() => {
            document.documentElement.classList.remove('loading');
        }, 600);
    }, 1400);
});