document.addEventListener("DOMContentLoaded", () => {

  const canvases = document.querySelectorAll(".wave-divider");

  canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");

    let points = [];
    let time = 0;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      generatePoints();
    }

    function generatePoints() {
      points = [];
      const spacing = canvas.width / 8;

      for (let i = 0; i <= 8; i++) {
        points.push({
          x: i * spacing,
          baseY: canvas.height / 2,
          offset: Math.random() * Math.PI * 2
        });
      }
    }

    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].baseY);

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        const midX = (p1.x + p2.x) / 2;
        const y1 = p1.baseY + Math.sin(time + p1.offset) * 20;
        const y2 = p2.baseY + Math.sin(time + p2.offset) * 20;
        const midY = (y1 + y2) / 2;

        ctx.quadraticCurveTo(p1.x, y1, midX, midY);
      }

      // Close shape
      const last = points[points.length - 1];
      ctx.lineTo(last.x, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // Use color from HTML
      const fillColor = canvas.dataset.color || "#111";
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    function animate() {
      time += 0.02;
      drawWave();
      requestAnimationFrame(animate);
    }

    // Mouse interaction (subtle)
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      points.forEach(p => {
        const dist = Math.abs(p.x - mouseX);
        if (dist < 100) {
          p.baseY -= 0.3;
        }
      });
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();
  });

});