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

// ============= CUSTOM CURSOR (desktop only — SINGLE cursor, no lag) =============
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', () => {
    // 단일 커서로 통합 (ring 제거 — 두 개가 따로 움직여 어지러운 문제 해결)
    const dot = document.createElement('div');
    dot.className = 'custom-cursor';
    document.body.appendChild(dot);

    window.addEventListener('mousemove', (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });

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
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
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
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          // Guarantee final value matches target exactly (fixes off-by-one on small targets like 4)
          el.innerHTML = target.toLocaleString() + suffix;
        }
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
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

// ============= v3 · HORIZONTAL SCROLL (native + drag + wheel) =============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-hscroll]').forEach(section => {
    // 1) Wheel → horizontal (데스크탑: 세로 휠을 가로로 변환, 단 섹션이 화면에 꽉 찼을 때만)
    let wheelActive = false;
    section.addEventListener('wheel', (e) => {
      // 가로 스와이프는 그대로 둠
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const atStart = section.scrollLeft <= 0;
      const atEnd = section.scrollLeft + section.clientWidth >= section.scrollWidth - 1;
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // 끝에 도달했으면 페이지 세로 스크롤에 양보
      if ((atEnd && goingDown) || (atStart && goingUp)) return;

      e.preventDefault();
      section.scrollLeft += e.deltaY;
    }, { passive: false });

    // 2) Drag to scroll (데스크탑 마우스 드래그)
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    section.addEventListener('mousedown', (e) => {
      // 링크 자체 클릭은 살려둠 — 드래그만 막기
      isDown = true;
      startX = e.pageX;
      startScroll = section.scrollLeft;
    });
    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        section.classList.remove('is-dragging');
      }
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      // 일정 거리 이상 움직여야 드래그 모드 진입 (링크 클릭 보호)
      if (Math.abs(dx) > 6 && !section.classList.contains('is-dragging')) {
        section.classList.add('is-dragging');
      }
      if (section.classList.contains('is-dragging')) {
        e.preventDefault();
        section.scrollLeft = startScroll - dx;
      }
    });

    // 3) 드래그 직후 클릭 방지 (마우스업 후 바로 클릭되는 걸 막음)
    section.addEventListener('click', (e) => {
      if (section.classList.contains('just-dragged')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
    section.addEventListener('mouseup', () => {
      if (section.classList.contains('is-dragging')) {
        section.classList.add('just-dragged');
        setTimeout(() => section.classList.remove('just-dragged'), 50);
      }
    });
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

// ============= v3 · CURSOR TRAIL — DISABLED (PPT S2: 두 개의 커서가 따로 움직여 어지러움) =============
// 단일 커서(custom-cursor)만 유지. 트레일 제거.

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
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
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

// ============= 편리한 예약·상담 모달 v2 (슬라이드 14 — 단일 페이지) =============
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('consultModal');
    const openBtn = document.getElementById('openConsultModal');
    const closeBtn = document.getElementById('closeConsultModal');
    const submitBtn = document.getElementById('consultSubmit');
    if (!modal) return;

    const openModal = () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    openBtn && openBtn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

    // 다른 컴포넌트에서 모달 열기 — window event 디스패치 지원
    window.addEventListener('open-consultation-modal', openModal);

    // "다음 단계" → 진료 선택 확인 후 네이버 예약으로 연결
    submitBtn && submitBtn.addEventListener('click', () => {
      const selected = modal.querySelector('input[name="consult-treatment"]:checked');
      if (!selected) {
        window.toast && window.toast('진료 항목을 선택해주세요');
        return;
      }
      window.toast && window.toast(selected.value + ' 진료 예약을 진행합니다');
      setTimeout(() => {
        window.open('https://naver.me/GhSIroMf', '_blank', 'noopener');
        closeModal();
      }, 800);
    });
  });
})();
