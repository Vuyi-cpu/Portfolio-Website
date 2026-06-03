function openModal(i) {
    const p = projects[i];
    const bg = document.getElementById('modal-bg');
    if (!bg) return;
    
    document.getElementById('m-img').src = p.img;
    document.getElementById('m-num').textContent = p.num;
    document.getElementById('m-title').textContent = p.title;
    document.getElementById('m-desc').textContent = p.desc;
    document.getElementById('m-process').textContent = p.process;
    document.getElementById('m-features').textContent = p.features;
    
    const tags = document.getElementById('m-tags');
    tags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    
    bg.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
    const bg = document.getElementById('modal-bg');
    if (bg) {
        bg.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function closeModal(e) {
    if (e.target === document.getElementById('modal-bg')) closeModalDirect();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModalDirect();
});