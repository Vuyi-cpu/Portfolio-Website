// Lock scroll immediately before anything renders
document.documentElement.classList.add('loading');
 
window.addEventListener('pageshow', (event) => {
    // Clear page-exit class left over from the outgoing transition —
    // otherwise bfcache restores the page invisible and non-interactive.
    if (event.persisted) {
        document.body.classList.remove('page-exit');
    }
 
    // Always run the loading animation (fresh load or back button).
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