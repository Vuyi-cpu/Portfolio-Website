/**
 * =========================================
 * loading.js
 * Fix 2: Prevent page flicker (hide content until ready)
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ADD LOADING CLASS (hide page)
  // ===============================
  document.body.classList.add("loading");

  // ===============================
  // CREATE LOADING SCREEN
  // ===============================
  const loaderHTML = `
    <div id="page-loader" class="loader">
      <div class="loader-text">LOADING.......</div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", loaderHTML);

  const loader = document.getElementById("page-loader");

  // ===============================
  // INITIAL PAGE LOAD
  // ===============================
  window.addEventListener("load", () => {
    setTimeout(() => {

      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";

        //  SHOW PAGE ONLY AFTER LOADER IS GONE
        document.body.classList.remove("loading");

      }, 400);

    }, 600);
  });

  // ===============================
  // PAGE TRANSITIONS
  // ===============================
  document.addEventListener("click", (e) => {

    const link = e.target.closest("a");

    // Ignore non-links
    if (!link) return;

    const href = link.getAttribute("href");

    // Ignore invalid links
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      link.hasAttribute("download")
    ) {
      return;
    }

    e.preventDefault();

    //  Hide page again during transition
    document.body.classList.add("loading");

    // Show loader
    loader.style.display = "flex";

    setTimeout(() => {
      loader.style.opacity = "1";
    }, 10);

    // Navigate after delay
    setTimeout(() => {
      window.location.href = href;
    }, 600);
  });

});