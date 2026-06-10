const modalBg    = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');

if (modalBg) {
  modalBg.addEventListener('click', e => {
    if (e.target === modalBg) closeModalDirect();
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeModalDirect);
}

function openModal(index) {
  if (typeof projects === 'undefined') return;
  const p  = projects[index];
  const bg = document.querySelector('.modal-bg');
  if (!bg) return;

  document.querySelector('#modal-img').src= p.img;
  document.querySelector('#modal-img').alt= p.title;
  document.querySelector('#modal-num').textContent= p.num;
  document.querySelector('#modal-title').textContent= p.title;
  document.querySelector('#modal-desc').textContent= p.desc;
  document.querySelector('#modal-process').textContent= p.process;
  document.querySelector('#modal-features').textContent= p.features;
  document.querySelector('#modal-tags').innerHTML= p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  bg.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
  const bg = document.querySelector('.modal-bg');
  if (bg) {
    bg.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});