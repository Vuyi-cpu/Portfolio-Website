(function () {
  const canvas = document.querySelector('#particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  //Constants
  const PARTICLE_COUNT= 450;
  const FIELD_OF_VIEW= 350;   // Perspective depth — higher = flatter projection
  const PARALLAX_SPEED= 1.0;   // How fast particles move relative to page scroll

  //State
  let rotationY= 0;
  let animationState= 'sphere';   // 'sphere' | 'exploding' | 'floating'
  let explosionStart= 0;          // timestamp when the explosion began

  let targetScrollY  = window.scrollY;
  let currentScrollY = window.scrollY;

  // Dynamic helpers that recalculate on resize
  const canvasCenterX= () => canvas.width  / 2;
  const canvasCenterY= () => canvas.height / 2;
  const sphereRadius= () => Math.min(canvas.width, canvas.height) * 0.35;


  //Particle
  class Particle {
    constructor(index) {
      // Fibonacci sphere distribution
      const phi= Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT);
      const theta= Math.PI * (1 + Math.sqrt(5)) * index;

      // Unit-vector position on the sphere
      this.nx= Math.sin(phi) * Math.cos(theta);
      this.ny= Math.sin(phi) * Math.sin(theta);
      this.nz= Math.cos(phi);

      this.baseSize= Math.random() * 1.8 + 0.5;   // Dot radius
      this.opacity= Math.random() * 0.4 + 0.6;

      // Screen position & velocity (used in exploding / floating states)
      this.x= 0;  this.y= 0;
      this.vx= 0;  this.vy= 0;

      // Steady drift direction once in the floating state
      const driftAngle= 2.2 + (Math.random() - 0.5) * 0.45;
      const driftSpeed= Math.random() * 0.6 + 0.3;
      this.driftVX= Math.cos(driftAngle) * driftSpeed;
      this.driftVY= Math.sin(driftAngle) * driftSpeed;
    }

  
    project() {
      const cosY= Math.cos(rotationY);
      const sinY= Math.sin(rotationY);

      // Rotate around the Y axis
      const rotatedX= this.nx * cosY + this.nz * sinY;
      const rotatedY= this.ny;
      const rotatedZ= -this.nx * sinY + this.nz * cosY;

      const radius= sphereRadius();
      const scale= FIELD_OF_VIEW / (rotatedZ * radius + FIELD_OF_VIEW);

      return {
        x:canvasCenterX() + rotatedX * radius * scale,
        y:canvasCenterY() + rotatedY * radius * scale,
        z:rotatedZ,
        scale: scale
      };
    }
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new Particle(i));


  //Trigger explosion on click / scroll
  function triggerExplosion(event) {
    if (animationState !== 'sphere') return;
    animationState = 'exploding';
    explosionStart = performance.now();

    const clientX = event.clientX || (event.touches && event.touches[0].clientX) || canvasCenterX();
    const clientY = event.clientY || (event.touches && event.touches[0].clientY) || canvasCenterY();

    
    const originX = clientX;
    const originY = clientY + (currentScrollY * PARALLAX_SPEED);

    particles.forEach(particle => {
      const projected = particle.project();
      particle.x = projected.x;
      particle.y = projected.y;

      const dx       = projected.x - originX;
      const dy       = projected.y - originY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed    = Math.random() * 18 + 8;

      // Particles fly outward from the click point with slight random spread
      particle.vx = (dx / distance) * speed + (Math.random() - 0.5) * 4;
      particle.vy = (dy / distance) * speed + (Math.random() - 0.5) * 4;
    });
  }

  window.addEventListener('scroll', event => {
    targetScrollY = window.scrollY;
    triggerExplosion(event);
  });


  //Draw functions per state

  function drawSphere() {
    rotationY += 0.005;

    // Sort back to front so closer particles render on top
    const sorted = particles
      .map(p => ({ p, ...p.project() }))
      .sort((a, b) => a.z - b.z);

    sorted.forEach(({ p, x, y, z, scale }) => {
      // Map depth 
      const depth = (z + 1) * 0.5;
      const r     = Math.round(5  + depth * 65);
      const g     = Math.round(20 + depth * 130);
      const b     = Math.round(90 + depth * 165);
      const alpha  = Math.max(0.05, Math.pow(depth, 1.5) * p.opacity);
      const radius = Math.max(p.baseSize * Math.pow(depth, 1.2) * scale * 1.5, 0.2);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    });
  }

  function drawExploding(timestamp) {
    const elapsed  = timestamp - explosionStart;
    const progress = Math.min(elapsed / 1500, 1);

    // Once the explosion animation completes, switch to free floating
    if (progress >= 1) animationState = 'floating';

    const scrollOffset = currentScrollY * PARALLAX_SPEED;

    particles.forEach(p => {
      // Decelerate initial burst velocity
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Gradually blend velocity toward the steady drift direction
      if (progress > 0.15) {
        const blendFactor = Math.min((progress - 0.15) / 0.85, 1);
        p.vx += (p.driftVX - p.vx * 0.01) * blendFactor * 0.05;
        p.vy += (p.driftVY - p.vy * 0.01) * blendFactor * 0.05;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around canvas edges so particles never disappear permanently
      if (p.x < -100)                     p.x = canvas.width  + 100;
      if (p.x >  canvas.width  + 100)     p.x = -100;
      if (p.y < -100 + scrollOffset)      p.y = canvas.height + 100 + scrollOffset;
      if (p.y >  canvas.height + 100 + scrollOffset) p.y = -100 + scrollOffset;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseSize * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.opacity * 0.85})`;
      ctx.fill();
    });
  }

  function drawFloating() {
    const scrollOffset = currentScrollY * PARALLAX_SPEED;

    particles.forEach(p => {
      p.x += p.driftVX;
      p.y += p.driftVY;

      // Wrap around canvas edges
      if (p.x < -100)                     p.x = canvas.width  + 100;
      if (p.x >  canvas.width  + 100)     p.x = -100;
      if (p.y < -100 + scrollOffset)      p.y = canvas.height + 100 + scrollOffset;
      if (p.y >  canvas.height + 100 + scrollOffset) p.y = -100 + scrollOffset;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseSize * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.opacity * 0.65})`;
      ctx.fill();
    });
  }


  //Animation loop
  function animationFrame(timestamp) {
    // Smoothly lerp scroll position to avoid jarring jumps
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate canvas by scroll so particles appear fixed in world space
    ctx.save();
    ctx.translate(0, -currentScrollY * PARALLAX_SPEED);

    if      (animationState === 'sphere')    drawSphere();
    else if (animationState === 'exploding') drawExploding(timestamp);
    else                                     drawFloating();

    ctx.restore();

    requestAnimationFrame(animationFrame);
  }

  requestAnimationFrame(animationFrame);
})();