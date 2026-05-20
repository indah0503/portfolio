// ─── CANVAS GRID ANIMATION ───
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, dots = [], lines = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initDots() {
  dots = [];
  const count = Math.floor((W * H) / 18000);
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,229,195,0.6)';
    ctx.fill();
    for (let j = i + 1; j < dots.length; j++) {
      const d2 = dots[j];
      const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.strokeStyle = `rgba(0,229,195,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

resize();
initDots();
draw();
window.addEventListener('resize', () => { resize(); initDots(); });

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const pct = parseFloat(bar.dataset.pct);
        bar.style.width = (pct * 100) + '%';
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// skills in about section (auto-visible)
document.querySelectorAll('.skill-fill').forEach(bar => {
  const pct = parseFloat(bar.dataset.pct);
  bar.style.width = (pct * 100) + '%';
});
