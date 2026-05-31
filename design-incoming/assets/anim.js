/* ============================================================
   FAISCEAU — moteur d'animation
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---- Intensity from CSS var (Tweaks may override) ---- */
  function intensity() {
    return parseFloat(getComputedStyle(root).getPropertyValue('--intensity')) || 0.75;
  }

  /* ---------- Split headlines into animated words ---------- */
  function splitWords(el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    let i = 0;
    nodes.forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(tok => {
          if (tok.trim() === '') { el.appendChild(document.createTextNode(tok)); return; }
          const w = document.createElement('span'); w.className = 'word';
          const inner = document.createElement('span'); inner.textContent = tok;
          inner.style.setProperty('--wd', (i * 0.06) + 's');
          w.appendChild(inner); el.appendChild(w); i++;
        });
      } else {
        el.appendChild(node);
      }
    });
  }
  document.querySelectorAll('[data-words]').forEach(splitWords);

  /* ---------- Reveal (scroll-position based — robust in any iframe) ---------- */
  let watched = Array.from(document.querySelectorAll('[data-reveal],[data-wipe],[data-words],.rule,[data-count],[data-group]'));
  let revealTicking = false;
  function revealCheck() {
    const vh = window.innerHeight;
    for (let i = watched.length - 1; i >= 0; i--) {
      const el = watched[i];
      const r = el.getBoundingClientRect();
      if (r.height === 0 && r.top === 0) continue; // not laid out yet
      const trigger = vh * 0.9;
      if (r.top < trigger && r.bottom > 0) {
        el.classList.add('in');
        if (el.hasAttribute('data-count')) runCount(el);
        if (!el.hasAttribute('data-repeat')) watched.splice(i, 1);
      } else if (el.hasAttribute('data-repeat')) {
        el.classList.remove('in');
      }
    }
    revealTicking = false;
  }
  function requestReveal(){ if (!revealTicking){ revealTicking = true; requestAnimationFrame(revealCheck); } }
  window.addEventListener('scroll', requestReveal, { passive: true });
  window.addEventListener('resize', requestReveal);
  // initial passes (cover late layout / font load)
  revealCheck();
  [60, 200, 500, 1000].forEach(t => setTimeout(revealCheck, t));

  /* stagger groups: children get incremental --d */
  document.querySelectorAll('[data-group]').forEach(g => {
    const step = parseFloat(g.dataset.group) || 0.08;
    Array.from(g.children).forEach((c, i) => {
      if (!c.style.getPropertyValue('--d')) c.style.setProperty('--d', (i * step) + 's');
    });
  });

  /* ---------- Count up ---------- */
  function runCount(el) {
    if (reduce) { el.textContent = el.dataset.count; return; }
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1400; const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const v = (target * e).toFixed(dec);
      el.textContent = prefix + Number(v).toLocaleString('fr-FR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* rescan: pick up dynamically-rendered nodes (filtered lists etc.) */
  function rescan(){
    document.querySelectorAll('[data-words]').forEach(splitWords);
    document.querySelectorAll('[data-group]').forEach(g => {
      const step = parseFloat(g.dataset.group) || 0.08;
      Array.from(g.children).forEach((c, i) => { if (!c.style.getPropertyValue('--d')) c.style.setProperty('--d', (i * step) + 's'); });
    });
    const all = document.querySelectorAll('[data-reveal],[data-wipe],[data-words],.rule,[data-count],[data-group]');
    watched = Array.from(all);
    requestReveal();
  }

  /* ---------- Nav scrolled ---------- */
  const nav = document.querySelector('.nav');
  function onScrollNav(){ if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Parallax (rAF, transform only) ---------- */
  const players = Array.from(document.querySelectorAll('[data-parallax]')).map(el => ({
    el, speed: parseFloat(el.dataset.parallax) || 0.2,
    axis: el.dataset.axis || 'y'
  }));
  let ticking = false;
  function parallaxFrame() {
    const vh = window.innerHeight;
    const k = intensity();
    players.forEach(p => {
      const r = p.el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const off = (center - vh / 2) / vh; // -1..1 roughly
      const d = -off * p.speed * 100 * k;
      p.el.style.transform = p.axis === 'x' ? `translate3d(${d}px,0,0)` : `translate3d(0,${d}px,0)`;
    });
    ticking = false;
  }
  function requestParallax(){ if (!ticking && !reduce && players.length){ ticking = true; requestAnimationFrame(parallaxFrame); } }
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  requestParallax();

  /* ---------- Pointer-reactive beam tilt ---------- */
  document.querySelectorAll('[data-tilt]').forEach(el => {
    const amt = parseFloat(el.dataset.tilt) || 6;
    el.addEventListener('pointermove', ev => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt-x', (-y * amt) + 'deg');
      el.style.setProperty('--tilt-y', (x * amt) + 'deg');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    });
  });

  /* ============================================================
     HERO — faisceau + poussière (canvas)
     ============================================================ */
  const canvas = document.getElementById('beam-canvas');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d');
    let W, H, DPR, motes = [], origin = { x: 0, y: 0 }, mouse = { x: .5, y: .42 }, raf;
    function beamColor() { return getComputedStyle(root).getPropertyValue('--beam').trim() || '#9B6CFF'; }
    function hexToRgb(h){ h=h.replace('#',''); if(h.length===3)h=h.split('').map(c=>c+c).join(''); const n=parseInt(h,16); return [n>>16&255,n>>8&255,n&255]; }

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      origin.x = W * 0.12; origin.y = H * 0.16;
      const count = Math.round((W * H) / 14000 * intensity());
      motes = [];
      for (let i = 0; i < count; i++) motes.push(newMote());
    }
    function newMote() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.3) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.5 + 0.1,
        tw: Math.random() * Math.PI * 2
      };
    }
    function inCone(x, y) {
      // cone from origin toward target direction; returns 0..1 intensity
      const tx = origin.x + (mouse.x) * W * 0.9;
      const ty = origin.y + (mouse.y) * H * 1.1;
      const dx = tx - origin.x, dy = ty - origin.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = dx / len, ny = dy / len;
      const px = x - origin.x, py = y - origin.y;
      const along = px * nx + py * ny;
      if (along < 0) return 0;
      const perp = Math.abs(px * (-ny) + py * nx);
      const halfW = 40 + along * 0.42;
      const t = 1 - perp / halfW;
      return t > 0 ? t * Math.min(1, along / (W * 0.5)) : 0;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const [r, g, b] = hexToRgb(beamColor());
      const tx = origin.x + mouse.x * W * 0.9;
      const ty = origin.y + mouse.y * H * 1.1;

      // beam cone (additive)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const dx = tx - origin.x, dy = ty - origin.y;
      const ang = Math.atan2(dy, dx);
      const spread = 0.28;
      const far = Math.hypot(W, H) * 1.1;
      const grad = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, far);
      grad.addColorStop(0, `rgba(${r},${g},${b},${0.22 * intensity()})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.06 * intensity()})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.arc(origin.x, origin.y, far, ang - spread, ang + spread);
      ctx.closePath();
      ctx.fill();

      // lens hotspot
      const hs = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, 90);
      hs.addColorStop(0, `rgba(${r},${g},${b},${0.9})`);
      hs.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`);
      hs.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = hs;
      ctx.beginPath(); ctx.arc(origin.x, origin.y, 90, 0, Math.PI * 2); ctx.fill();

      // motes
      for (const m of motes) {
        m.x += m.vx * m.z; m.y += m.vy * m.z; m.tw += 0.03;
        if (m.x < -10) m.x = W + 10; if (m.x > W + 10) m.x = -10;
        if (m.y < -10) m.y = H + 10; if (m.y > H + 10) m.y = -10;
        const lit = inCone(m.x, m.y);
        const tw = (Math.sin(m.tw) * 0.4 + 0.6);
        const alpha = m.a * (0.12 + lit * 1.6) * tw;
        if (alpha < 0.02) continue;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.9, alpha)})`;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * m.z * (1 + lit), 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    }
    const heroEl = canvas.closest('.hero') || canvas.parentElement;
    heroEl.addEventListener('pointermove', e => {
      const r = heroEl.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width * 0.7 + 0.15;
      mouse.y = (e.clientY - r.top) / r.height * 0.6 + 0.05;
    });
    // gentle idle drift
    let t = 0;
    setInterval(() => { if (document.hidden) return; t += 0.02;
      // bias mouse toward an idle path only when pointer hasn't moved recently
    }, 50);
    window.addEventListener('resize', resize);
    resize();
    raf = requestAnimationFrame(draw);
    // pause when hero scrolled out of view (scroll-based, no IO)
    function gate(){
      const r = heroEl.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < window.innerHeight;
      if (visible && !raf) raf = requestAnimationFrame(draw);
      else if (!visible && raf){ cancelAnimationFrame(raf); raf = null; }
    }
    window.addEventListener('scroll', gate, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden && raf){ cancelAnimationFrame(raf); raf = null; } else gate(); });
  }

  /* ---------- Hero load-in choreography ---------- */
  function heroLit(){ document.body.classList.add('loaded'); requestReveal(); }
  if (document.readyState === 'complete') heroLit();
  else window.addEventListener('load', heroLit);
  // also flag loaded after fonts settle so flicker etc. kick in
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { document.body.classList.add('loaded'); requestReveal(); });

  /* ---------- expose for Tweaks ---------- */
  window.FAISCEAU = { intensity, rescan };
})();
