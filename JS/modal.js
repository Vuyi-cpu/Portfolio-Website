function openModal(i) {
    const p = projects[i];
    const bg = document.querySelector('#modal-bg');
    if (!bg) return;
    
    document.querySelector('#m-img').src = p.img;
    document.querySelector('#m-num').textContent = p.num;
    document.querySelector('#m-title').textContent = p.title;
    document.querySelector('#m-desc').textContent = p.desc;
    document.querySelector('#m-process').textContent = p.process;
    document.querySelector('#m-features').textContent = p.features;
    
    const tags = document.querySelector('#m-tags');
    tags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    
    bg.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
    const bg = document.querySelector('#modal-bg');
    if (bg) {
        bg.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function closeModal(e) {
    if (e.target === document.querySelector('#modal-bg')) closeModalDirect();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModalDirect();
});