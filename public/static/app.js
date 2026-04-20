// 대구365치과 공통 JS — v3.0 Awwwards Editorial Supreme

// ============= SCROLL PROGRESS BAR =============
(function() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(bar);
    const update = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  });
})();

// ============= CUSTOM CURSOR (desktop only) =============
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', () => {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    const raf = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(raf);
    };
    raf();

    // Hover state on interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [role="button"], .lux-card, .photo-card, input, textarea, select, .ba-slider')) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, [role="button"], .lux-card, .photo-card, input, textarea, select, .ba-slider')) {
        document.body.classList.remove('cursor-hover');
      }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  });
})();

// ============= DOMContentLoaded main =============
document.addEventListener('DOMContentLoaded', () => {

  // ----- Scroll reveal (fade-in + fade-in-stagger + reveal-lines) -----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.fade-in, .fade-in-stagger, .reveal-lines').forEach(el => io.observe(el));

  // ----- Navbar scroll state -----
  const nav = document.querySelector('.nav-blur');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ----- Mobile menu -----
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    menuClose?.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ----- Magnetic hover effect -----
  document.querySelectorAll('.magnetic').forEach(el => {
    let rafId = null;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${x*0.18}px, ${y*0.18}px)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'translate(0,0)';
    });
  });

  // ----- Count-up animation -----
  const counters = document.querySelectorAll('.count-up[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterIO.unobserve(el);
      const target = parseFloat(el.getAttribute('data-count') || '0');
      const suffix = el.querySelector('span')?.outerHTML || '';
      const duration = 1800;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 4);
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const val = Math.round(ease(p) * target);
        el.innerHTML = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  // ----- Current year -----
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ----- Image fallback — replace broken images with placeholder gradient -----
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent && !parent.querySelector('.placeholder-img')) {
        parent.classList.add('placeholder-img');
        const icon = document.createElement('i');
        icon.className = 'fas fa-image';
        parent.appendChild(icon);
      }
    });
  });

  // ----- Parallax on hero images (subtle) -----
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.3');
        el.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }
});

// ============= v3 · IMAGE REVEAL (curtain pull-up) =============
document.addEventListener('DOMContentLoaded', () => {
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Stagger slightly based on DOM position
        const delay = Math.min(0.15, (e.target.dataset.revealDelay || 0) * 0.05);
        e.target.style.transitionDelay = delay + 's';
        e.target.classList.add('visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.img-reveal').forEach((el, i) => {
    el.dataset.revealDelay = i % 4;
    revealIO.observe(el);
  });
});

// ============= v3 · REVEAL WORDS (kinetic typography) =============
document.addEventListener('DOMContentLoaded', () => {
  const lineIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        lineIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.reveal-lines').forEach(el => lineIO.observe(el));
});

// ============= v3 · ACCORDION (FAQ) =============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion-item]');
      if (!item) return;
      const isOpen = item.getAttribute('data-open') === 'true';
      // Optional: close siblings in same container (uncomment for single-open mode)
      // item.parentElement.querySelectorAll('[data-accordion-item]').forEach(s => s.setAttribute('data-open', 'false'));
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  });
});

// ============= v3 · HORIZONTAL SCROLL (pinned) =============
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 768px)').matches) return; // native scroll on mobile

  document.querySelectorAll('[data-hscroll]').forEach(section => {
    const track = section.querySelector('.h-scroll-track');
    if (!track) return;

    // Make the section tall enough for the horizontal distance
    const setup = () => {
      const trackWidth = track.scrollWidth;
      const viewport = window.innerWidth;
      const scrollDistance = trackWidth - viewport;
      if (scrollDistance <= 0) {
        section.style.height = '100vh';
        return;
      }
      section.style.height = (window.innerHeight + scrollDistance) + 'px';
      section.style.position = 'relative';
      track.style.position = 'sticky';
      track.style.top = '0';

      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
        track.style.transform = `translateX(${-progress * scrollDistance}px)`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    };

    // Wait for images
    if (document.readyState === 'complete') setup();
    else window.addEventListener('load', setup);
  });
});

// ============= v3 · INLINE BEFORE/AFTER (home) =============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ba-inline').forEach(root => {
    const after = root.querySelector('.ba-inline-after-wrap');
    if (!after) return;
    const setPos = (x) => {
      const rect = root.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };
    root.addEventListener('mousemove', (e) => setPos(e.clientX));
    root.addEventListener('touchmove', (e) => setPos(e.touches[0].clientX));
  });
});

// ============= v3 · CURSOR TRAIL (subtle, hero only) =============
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('.cinematic-hero');
  if (!hero) return;

  const trailCount = 8;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.transform = 'scale(0)';
    document.body.appendChild(t);
    trails.push(t);
  }

  let inHero = false;
  hero.addEventListener('mouseenter', () => inHero = true);
  hero.addEventListener('mouseleave', () => {
    inHero = false;
    trails.forEach(t => t.style.transform = 'scale(0)');
  });

  const positions = Array(trailCount).fill({ x: 0, y: 0 });
  hero.addEventListener('mousemove', (e) => {
    positions.unshift({ x: e.clientX, y: e.clientY });
    positions.length = trailCount;
    trails.forEach((t, i) => {
      const p = positions[i] || positions[0];
      t.style.left = p.x + 'px';
      t.style.top = p.y + 'px';
      const s = 1 - (i / trailCount);
      t.style.transform = `translate(-50%, -50%) scale(${s})`;
      t.style.opacity = s * 0.7;
    });
  });
});

// ============= Before/After Slider =============
window.initBASlider = function(root) {
  const after = root.querySelector('.ba-after-wrap');
  const handle = root.querySelector('.ba-handle');
  if (!after || !handle) return;
  let dragging = false;

  const setPos = (x) => {
    const rect = root.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
    handle.style.left = pct + '%';
  };

  root.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
  root.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup', () => dragging = false);
  root.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); });
  root.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); });
  window.addEventListener('touchend', () => dragging = false);

  // Initial
  setPos(root.getBoundingClientRect().left + root.offsetWidth/2);
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ba-slider').forEach(s => window.initBASlider(s));
});

// ============= Auth helpers =============
window.isLoggedIn = function() {
  return document.cookie.split(';').some(c => c.trim().startsWith('session='));
};

// ============= Toast =============
window.toast = function(msg, type = 'info') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
    padding:14px 24px;border-radius:999px;font-weight:500;z-index:999;
    background:${type === 'error' ? '#c04040' : '#2c1f14'};color:#fdfbf7;
    box-shadow:0 10px 30px rgba(0,0,0,0.2);opacity:0;transition:all .3s;
    font-family:'Pretendard',sans-serif;letter-spacing:-0.01em;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(-6px)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 300);
  }, 2500);
};
