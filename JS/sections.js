// Handles specific section interactive components like the Home Hero Typewriter
const tw = document.getElementById('tw');
if (tw) {
    const phrases = ['Web Developer.', 'UI Designer.', 'Creative Coder.', 'Problem Solver.'];
    let pi = 0, ci = 0, del = false;
    
    function type() {
        const f = phrases[pi];
        if (!del) {
            tw.textContent = f.slice(0, ++ci);
            if (ci === f.length) { 
                del = true; setTimeout(type, 1800); return; 
            }
            setTimeout(type, 80);
        } else {
            tw.textContent = f.slice(0, --ci);
            if (ci === 0) { 
                del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; 
            }
            setTimeout(type, 45);
        }
    }
    setTimeout(type, 1600);
}