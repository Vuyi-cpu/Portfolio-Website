const cur = document.getElementById('cur'), ring = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cur && ring) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
    
    (function animR() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animR);
    })();
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { 
            cur.style.width = '12px'; cur.style.height = '12px'; 
            ring.style.width = '46px'; ring.style.height = '46px'; 
        });
        el.addEventListener('mouseleave', () => { 
            cur.style.width = '8px'; cur.style.height = '8px'; 
            ring.style.width = '32px'; ring.style.height = '32px'; 
        });
    });
}