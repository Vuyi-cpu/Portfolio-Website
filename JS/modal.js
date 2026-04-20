/**
 * SCRIPT: modal.js
 * DESCRIPTION: Injects and controls the Project Detail Modal/Lightbox.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Modal Structure
  const modalHTML = `
    <div id="project-modal" class="modal">
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <img id="modal-image" src="" alt="Preview">
        <h3 id="modal-title"></h3>
        <p id="modal-desc"></p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.querySelector("#project-modal");
  const closeBtn = document.querySelector(".close-button");
  const modalImg = document.querySelector("#modal-image");
  const modalTitle = document.querySelector("#modal-title");
  const modalDesc = document.querySelector("#modal-desc");

  // 2. Attach click events to cards and rows (including the 'View Project' buttons)
  document.querySelectorAll('.project-card, .project-row').forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const title = item.querySelector('h3') ? item.querySelector('h3').innerText : 'Project Detail'; 
      const desc = item.querySelector('p').innerText;

      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;
      modal.style.display = "flex";
    });
  });

  // 3. Close Logic
  closeBtn.addEventListener('click', () => modal.style.display = "none");
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});