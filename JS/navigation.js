const ham = document.getElementById('ham'), mm = document.getElementById('mm');
if (ham && mm) {
    ham.addEventListener('click', () => {
        mm.classList.toggle('open');
        const s = ham.querySelectorAll('span');
        if (mm.classList.contains('open')) {
            s[0].style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
            s[1].style.opacity = '0';
            s[2].style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
        } else {
            s.forEach(x => { x.style.transform = ''; x.style.opacity = '' });
        }
    });

    mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mm.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '' });
    }));
}