/**
 * =========================================
 * scroll-animation.js
 * Re-trigger animations on scroll up/down
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        // Element enters viewport → animate IN
        entry.target.classList.add("show");
      } else {
        // Element leaves viewport → reset animation
        entry.target.classList.remove("show");
      }

    });
  }, {
    threshold: 0.3
  });

  const elements = document.querySelectorAll(
    ".project-card, .project-row, .skills-container, .hero-text, .hero-image"
  );

  elements.forEach(el => {
    el.classList.add("hidden-animate"); // start hidden
    observer.observe(el);
  });

});

// Reference the wave canvas
const waveCanvas = document.querySelector(".wave-divider");

if (waveCanvas) {
  let animationFrameId;

  // Function to start the loop
  const startWave = () => {
    function animate() {
      time += 0.02;
      drawWave(); // This calls your existing draw function
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
  };

  // Function to stop the loop
  const stopWave = () => {
    cancelAnimationFrame(animationFrameId);
  };

  // Observer to check visibility
  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startWave();
      } else {
        stopWave();
      }
    });
  }, { threshold: 0.1 }); // Starts when 10% of the canvas is visible

  waveObserver.observe(waveCanvas);
}