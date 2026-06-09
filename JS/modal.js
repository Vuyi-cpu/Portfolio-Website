/**
 * Opens the project detail view modal and updates dynamic field layouts.
 * @param {number} projectIndex - Index reference identifier within global project array data.
 */
function openModal(projectIndex) {
  if (typeof projects === 'undefined') return;
  const project = projects[projectIndex];
  const modalOverlay = document.querySelector('#modal-bg');
  if (!modalOverlay) return;

  // Set internal textual content and graphical sources securely
  document.querySelector('#modal-img').src = project.img;
  document.querySelector('#modal-num').textContent = project.num;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-desc').textContent = project.desc;
  document.querySelector('#modal-process').textContent = project.process;
  document.querySelector('#modal-features').textContent = project.features;

  const tagsContainer = document.querySelector('#modal-tags');
  tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

  // Lock structural scroll track frames and animate overlay entry
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Validates overlay targeting boundaries before execution.
 */
function closeModal(event) {
  if (event.target === document.querySelector('#modal-bg')) {
    closeModalDirect();
  }
}

/**
 * Dismisses open modals directly.
 */
function closeModalDirect() {
  const modalOverlay = document.querySelector('#modal-bg');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global window event listeners mapping key code indicators
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModalDirect();
});