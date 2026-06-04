/**
 * particles.js
 * Fullscreen Interactive 3D Background - Pure Particle Variant
 */

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
   
  /* ── Runtime State ─────────────────────────────────────────── */
  let rotY     = 0;
  let state    = 'sphere';   // 'sphere' | 'exploding' | 'floating'
  let explodeT = 0;
   
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
   
    let mouseX = e.clientX || (e.touches && e.touches[0].clientX) || CX();
    let mouseY = e.clientY || (e.touches && e.touches[0].clientY) || CY();
   
    particles.forEach(p => {
      const s = p.project();
      p.x = s.x;
      p.y = s.y;
      const dx = s.x - mouseX;
      const dy = s.y - mouseY;
      const d  = Math.sqrt(dx * dx + dy * dy) || 1;
      const spd = Math.random() * 15 + 5;
      p.vx = (dx / d) * spd + (Math.random() - 0.5) * 4;
      p.vy = (dy / d) * spd + (Math.random() - 0.5) * 4;
    });
  }
   
  window.addEventListener('mousemove', explode);
  window.addEventListener('touchstart', explode, { passive: true });
   
  /* ── State Handlers ────────────────────────────────────────── */
  
  // 1. SPHERE STATE (Calculates 3D depth colors)
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
   
  // 2. EXPLODING STATE (Keeps circles at current physics positions)
  function drawExploding(t) {
    const elapsed = t - explodeT;
    const progress = Math.min(elapsed / 1500, 1);
    if (progress >= 1) state = 'floating';
   
    particles.forEach(p => {
      // Apply friction drag
      p.vx *= 0.935;
      p.vy *= 0.935;
   
      // Blend to drift velocities smoothly over time
      if (progress > 0.25) {
        const blend = Math.min((progress - 0.25) / 0.75, 1);
        p.vx += (p.fvx - p.vx * 0.015) * blend * 0.065;
        p.vy += (p.fvy - p.vy * 0.015) * blend * 0.065;
      }
   
      p.x += p.vx;
      p.y += p.vy;
   
      // Screen edge constraints wrapping
      if (p.x < -20) p.x = canvas.width  + 20;
      if (p.x >  canvas.width  + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y >  canvas.height + 20) p.y = -20;
   
      // Rendered as clean particles instead of lines
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.op * 0.85})`;
      ctx.fill();
    });
  }
   
  // 3. FLOATING STATE (Keeps circles drifting across the window background)
  function drawFloating() {
    particles.forEach(p => {
      p.x += p.fvx;
      p.y += p.fvy;
   
      if (p.x < -20) p.x = canvas.width  + 20;
      if (p.x >  canvas.width  + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y >  canvas.height + 20) p.y = -20;
   
      // Rendered as clean drifting particles
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 170, 255, ${p.op * 0.65})`;
      ctx.fill();
    });
  }
   
  /* ── Simulation Runtime Loop ────────────────────────────────── */
  function frame(t) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    if      (state === 'sphere')    drawSphere();
    else if (state === 'exploding') drawExploding(t);
    else                            drawFloating();
   
    requestAnimationFrame(frame);
  }
   
  requestAnimationFrame(frame);
})();