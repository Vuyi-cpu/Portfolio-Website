// Lock scroll immediately before anything renders
document.documentElement.classList.add('loading');

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('page-exit');
        //skip the loading animation on back
        const loader = document.querySelector('#loader');
        if (loader) loader.classList.add('done');
        document.documentElement.classList.remove('loading');
        return;
    }
//Load screen
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