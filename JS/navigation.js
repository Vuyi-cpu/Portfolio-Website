/**
 * =========================================
 * navigation.js
 * Navbar, Footer, Active Link, Hamburger
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();
  setActiveLink();

  // Wait a moment so injected HTML exists
  setTimeout(setupHamburgerMenu, 50);
});

function loadNavbar() {
  const navbar = document.querySelector("#navbar-container");
  if (!navbar) return;

  navbar.innerHTML = `
    <header class="navbar">
      <div class="logo">Vuyisa</div>

      <div class="hamburger" id="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav id="nav-menu">
        <ul class="nav-links">
          <li><a href="index.html">HOME</a></li>
          <li><a href="about.html">ABOUT</a></li>
          <li><a href="portfolio.html">PORTFOLIO</a></li>
          <li><a href="contact.html">CONTACT</a></li>
        </ul>
      </nav>
    </header>
  `;
}

function loadFooter() {
  const footer = document.querySelector("#footer-container");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-content">

        <div class="footer-section footer-left">
          <span class="footer-label">Social link icons</span>
          <div class="footer-icons">
            <div class="footer-icon"><img src="./Assets/Icons/github-original.svg" /></div>
            <div class="footer-icon"><img src="./Assets/Icons/linkedin-original.svg" /></div>
            <div class="footer-icon"><img src="./Assets/Icons/unity-original.svg" /></div>
          </div>
        </div>

        <div class="footer-section footer-center">
          <span class="footer-label">Email:</span>
          <span class="footer-value">Vuyim1907@gmail.com</span>
        </div>

        <div class="footer-section footer-right">
          <span class="footer-value">@ 2026 Vuyisa Msipa. Designed and built by me</span>
        </div>

      </div>
    </footer>
  `;
}

function setActiveLink() {
  const links = document.querySelectorAll(".nav-links a");
  let currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupHamburgerMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}