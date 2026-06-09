// Open the project detail modal for the given project index
function openModal(projectIndex) {
  const project     = projects[projectIndex];
  const modalOverlay = document.querySelector('#modal-bg');
  if (!modalOverlay) return;

  // Populate modal fields from the project data object
  document.querySelector('#modal-img').src         = project.img;
  document.querySelector('#modal-num').textContent  = project.num;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-desc').textContent  = project.desc;
  document.querySelector('#modal-process').textContent = project.process;
  document.querySelector('#modal-features').textContent = project.features;

  const tagsContainer = document.querySelector('#modal-tags');
  tagsContainer.innerHTML = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  // Close only when clicking the darkened backdrop, not the modal content itself
  if (event.target === document.querySelector('#modal-bg')) {
    closeModalDirect();
  }
}

function closeModalDirect() {
  const modalOverlay = document.querySelector('#modal-bg');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Allow closing with the Escape key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModalDirect();
});