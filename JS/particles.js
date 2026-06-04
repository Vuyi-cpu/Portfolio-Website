(function () {
  const canvas = document.querySelector('#particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  /* ── Resize Engine ─────────────────────────────────────────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
   
  /* ── Simulation Constants ───────────────────────────────────── */
  const N   = 450;    
  const FOV = 350;
  
  // Scroll Speed Control: 1.0 scrolls exactly with the page. 0.5 creates a 3D depth effect.
  const PARALLAX_SPEED = 1.0; 
   
  /* ── Runtime State ─────────────────────────────────────────── */
  let rotY     = 0;
  let state    = 'sphere';   // 'sphere' | 'exploding' | 'floating'
  let explodeT = 0;
  
  // Smooth scroll tracking variables
  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  
  /* ── Dimension Helpers ─────────────────────────────────────── */
  const CX = () => canvas.width  / 2;
  const CY = () => canvas.height / 2;
  const SR = () => Math.min(canvas.width, canvas.height) * 0.35; 
   
  /* ── Particle Class ────────────────────────────────────────── */
  class Particle {
    constructor(i) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      this.nx = Math.sin(phi) * Math.cos(theta);
      this.ny = Math.sin(phi) * Math.sin(theta);
      this.nz = Math.cos(phi);
   
      this.sz = Math.random() * 1.8 + 0.5;   
      this.op = Math.random() * 0.4 + 0.6;  
   
      this.x  = 0;  this.y  = 0;
      this.vx = 0;  this.vy = 0;
   
      const ang = 2.2 + (Math.random() - 0.5) * 0.45;
      const spd = Math.random() * 0.6 + 0.3;
      this.fvx = Math.cos(ang) * spd;
      this.fvy = Math.sin(ang) * spd;
    }
   
    project() {
      const cY = Math.cos(rotY), sY = Math.sin(rotY);
      const rx =  this.nx * cY + this.nz * sY;
      const ry =  this.ny;
      const rz = -this.nx * sY + this.nz * cY;
      const r  = SR();
      const sc = FOV / (rz * r + FOV);
      return {
        x:  CX() + rx * r * sc,
        y:  CY() + ry * r * sc,
        z:  rz,
        sc: sc
      };
    }
  }
   
  const particles = Array.from({ length: N }, (_, i) => new Particle(i));
   
/* ── Interactive Explosion Trigger ─────────────────────────── */
  function explode(e) {
    if (state !== 'sphere') return;
    state    = 'exploding';
    explodeT = performance.now();
   
    let clientX = e.clientX || (e.touches && e.touches[0].clientX) || CX();
    let clientY = e.clientY || (e.touches && e.touches[0].clientY) || CY();
    
    let mouseX = clientX;
    let mouseY = clientY + (currentScroll * PARALLAX_SPEED);
   
    particles.forEach(p => {
      const s = p.project();
      p.x = s.x;
      p.y = s.y;
      const dx = s.x - mouseX;
      const dy = s.y - mouseY;
      const d  = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // SOFTER EXPLOSION: Lowered the burst speed so it expands gracefully
      const spd = Math.random() * 18 + 8; 
      
      // Reduced the random scatter so it feels more uniform and less chaotic
      p.vx = (dx / d) * spd + (Math.random() - 0.5) * 4;
      p.vy = (dy / d) * spd + (Math.random() - 0.5) * 4;
    });
  }
   
  /* ── Scroll Event Listener (Updated) ───────────────────────── */
  window.addEventListener('scroll', (e) => {
    targetScroll = window.scrollY;
    explode(e); // Trigger dispersion when the user scrolls
  });
   
  /* ── State Handlers ────────────────────────────────────────── */
  function drawSphere() {
    rotY += 0.005;
   
    const sorted = particles
      .map(p => ({ p, ...p.project() }))
      .sort((a, b) => a.z - b.z);
   
    sorted.forEach(({ p, x, y, z, sc }) => {
      const depth = (z + 1) * 0.5;
      const cr = Math.round(5   + depth * 65);
      const cg = Math.round(20  + depth * 130);
      const cb = Math.round(90  + depth * 165);
      const alpha = Math.max(0.05, Math.pow(depth, 1.5) * p.op); 
      const radius = Math.max(p.sz * Math.pow(depth, 1.2) * sc * 1.5, 0.2); 
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
      ctx.fill();
    });
  }
   
  function drawExploding(t) {
    const elapsed = t - explodeT;
    const progress = Math.min(elapsed / 1500, 1);
    if (progress >= 1) state = 'floating';
   
    const camOffset = currentScroll * PARALLAX_SPEED;

    particles.forEach(p => {
      // FIXED: Reduced friction coefficients to prevent deceleration before scattering full-width
      p.vx *= 0.98;
      p.vy *= 0.98;
   
      if (progress > 0.15) {
        const blend = Math.min((progress - 0.15) / 0.85, 1);
        p.vx += (p.fvx - p.vx * 0.01) * blend * 0.05;
        p.vy += (p.fvy - p.vy * 0.01) * blend * 0.05;
      }
   
      p.x += p.vx;
      p.y += p.vy;
   
      // FIXED: Boundary wrap equations now account correctly for parallax scroll movement direction
      if (p.x < -100) p.x = canvas.width  + 100;
      if (p.x >  canvas.width  + 100) p.x = -100;
      if (p.y < -100 + camOffset) p.y = canvas.height + 100 + camOffset;
      if (p.y >  canvas.height + 100 + camOffset) p.y = -100 + camOffset;
   
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.op * 0.85})`;
      ctx.fill();
    });
  }
   
  function drawFloating() {
    const camOffset = currentScroll * PARALLAX_SPEED;

    particles.forEach(p => {
      p.x += p.fvx;
      p.y += p.fvy;
   
      // FIXED: Parallax boundaries match up seamlessly with the active window viewport height
      if (p.x < -100) p.x = canvas.width  + 100;
      if (p.x >  canvas.width  + 100) p.x = -100;
      if (p.y < -100 + camOffset) p.y = canvas.height + 100 + camOffset;
      if (p.y >  canvas.height + 100 + camOffset) p.y = -100 + camOffset;
   
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.op * 0.65})`;
      ctx.fill();
    });
  }
   
  /* ── Simulation Runtime Loop ────────────────────────────────── */
  function frame(t) {
    // 1. Smoothly interpolate current scroll towards the target scroll position
    currentScroll += (targetScroll - currentScroll) * 0.08;
      
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    // 3. Save context state, apply the vertical parallax offset, then draw
    ctx.save();
    ctx.translate(0, -currentScroll * PARALLAX_SPEED);
    
    if      (state === 'sphere')    drawSphere();
    else if (state === 'exploding') drawExploding(t);
    else                            drawFloating();
   
    // 4. Restore context so the background fill stays stationary next frame
    ctx.restore();
   
    requestAnimationFrame(frame);
  }
   
  requestAnimationFrame(frame);
})();
