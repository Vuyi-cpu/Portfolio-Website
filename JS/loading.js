window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        if (loader) loader.classList.add('done');
    }, 1400);
});