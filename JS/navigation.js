// ==========================
// NAVIGATION MODULE
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();
  setActiveLink();
});

// ==========================
// NAVBAR
// ==========================
function loadNavbar() {
  const navbar = document.querySelector("#navbar-container");
  if (!navbar) return;

  navbar.innerHTML = `
    <header class="navbar">
      <div class="logo">Vuyisa</div>

      <nav>
        <ul class="nav-links">
          <li><a href="home.html">HOME</a></li>
           <li><a href="about.html">ABOUT</a></li>
          <li><a href="portfolio.html">PORTFOLIO</a></li>
          <li><a href="contact.html">CONTACT</a></li>
        </ul>
      </nav>

      <div class="toggle" id="theme-toggle">🌙</div>
    </header>
  `;
}

// ==========================
// FOOTER
// ==========================
function loadFooter() {
  const footer = document.querySelector("#footer-container");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">

      <div class="footer-top">
        <div class="footer-left">
          <span class="footer-label">Social link icons</span>

          <div class="footer-icons">
            <div class="footer-icon"></div>
            <div class="footer-icon"></div>
            <div class="footer-icon"></div>
          </div>
        </div>

        <div class="footer-email">
          <span>Email:</span>
          <span>Vuyim1907@gmail.com</span>
        </div>
      </div>

      <div class="footer-bottom">
        Copyright text
      </div>

    </footer>
  `;
}

// ==========================
// ACTIVE LINK HANDLING
// ==========================
function setActiveLink() {
  const links = document.querySelectorAll(".nav-links a");
  let currentPage = window.location.pathname.split("/").pop();

  // Fix homepage case
  if (currentPage === "" || currentPage === "/") {
    currentPage = "home.html";
  }

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}