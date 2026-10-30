/* 대구365치과 메인 스크롤 몰입 연출 (GSAP ScrollTrigger + Lenis)
   톤: "치과가 두려워도 괜찮습니다" — 시네마틱·느리고 부드럽게, 골드 실(線)이 이야기를 꿰는 리듬
   - 글자는 모두 HTML 에 그대로 두고 움직임만 더한다(크롤러·AEO 영향 없음)
   - 동작 줄이기 사용자는 아무것도 하지 않는다 / JS 가 꺼져도 전부 보인다 */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  // app.js 의 IntersectionObserver(.fade-in 등)가 DOMContentLoaded 에 붙으므로 그 뒤에 넘겨받는다
  function boot() { setTimeout(start, 160); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  function start() {
  var root = document.documentElement;
  root.classList.add('mx');
  var mobile = matchMedia('(max-width: 767px)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var SILK = 'expo.out';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return gsap.utils.toArray((ctx || document).querySelectorAll(sel)); };
  var hero = $('.cinematic-hero');
  if (hero) hero.classList.add('mx-hero');
  var inHero = function (el) { return hero && hero.contains(el); };

  // 기존 등장(.fade-in / .fade-in-stagger)은 히어로 밖에서만 넘겨받는다 — 히어로 첫 등장은 app.js 그대로
  $$('.fade-in, .fade-in-stagger').forEach(function (el) {
    if (inHero(el)) return;
    el.classList.remove('fade-in', 'fade-in-stagger', 'visible');
  });

  // 1) 관성 스크롤 — 마우스·트랙패드만 (터치는 기본 스크롤). 무게감 있게 조금 길게
  if (fine && window.Lenis) {
    var lenis = new Lenis({ duration: 1.35, smoothWheel: true, wheelMultiplier: 0.9,
      prevent: function (node) { return !!(node.closest && node.closest('[data-hscroll], #mobileMenu, .mobile-menu')); } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target; try { target = document.querySelector(id); } catch (err) { return; }
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -90 });
      });
    });
  }

  // ── 엔진: 화면에 들어오면 한 번 재생, 빠르게 지나쳐도 끝 상태 보장
  var TIMING = ['duration', 'ease', 'stagger', 'delay'];
  var claimed = [];
  function claim(list) { gsap.utils.toArray(list).forEach(function (el) { claimed.push(el); }); }
  function isClaimed(el) { return claimed.some(function (c) { return c === el || c.contains(el) || el.contains(c); }); }
  function enter(targets, vars, trigger, start) {
    targets = gsap.utils.toArray(targets);
    if (!targets.length) return null;
    claim(targets);
    var from = {}, to = { opacity: 1, x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, paused: true,
      onStart: function () { gsap.set(targets, { transition: 'none' }); },
      onComplete: function () { gsap.set(targets, { clearProps: 'opacity,transform,transition,clipPath' }); } };
    Object.keys(vars).forEach(function (k) { (TIMING.indexOf(k) > -1 ? to : from)[k] = vars[k]; });
    if (from.clipPath) to.clipPath = 'inset(0% 0% 0% 0%)';
    var tw = gsap.fromTo(targets, from, to);
    ScrollTrigger.create({ trigger: trigger || targets[0], start: start || 'top 88%', once: true, onEnter: function () {
      tw.play();
      setTimeout(function () { if (tw.progress() < 1) tw.progress(1); }, (tw.totalDuration() + 0.6) * 1000);
    } });
    return tw;
  }
  // 스크롤에 묶되 한 방향: 끝까지 가면 풀어 두고 끝 상태로 고정(되돌아와도 다시 가려지지 않음)
  function scrubOnce(target, from, to, st) {
    claim(target);
    var tw = gsap.fromTo(target, from, Object.assign({ ease: 'none' }, to));
    tw.pause();
    var done = false;
    var trig = ScrollTrigger.create(Object.assign({}, st, {
      onUpdate: function (self) { if (!done) tw.progress(self.progress); },
      onLeave: finish
    }));
    function finish() {
      if (done) return; done = true;
      tw.progress(1);
      gsap.set(target, { clearProps: Object.keys(from).join(',') });
      trig.kill();
    }
    if (trig.progress >= 1) finish(); else tw.progress(trig.progress);
    return tw;
  }
  // 시차·장식(글자 가림 없음)은 양방향으로
  function scrub(target, from, to, st) {
    claim(target);
    return gsap.fromTo(target, from, Object.assign({ ease: 'none', scrollTrigger: Object.assign({ scrub: true }, st) }, to));
  }

  // 낱말 감싸기: 하위 span·br 은 보존하고 텍스트만 낱말 단위로
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var parts = node.textContent.split(/(\s+)/);
      if (parts.join('').trim() === '') return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        var w = document.createElement('span'); w.className = 'mx-w';
        var i = document.createElement('span'); i.className = 'mx-wi'; i.textContent = p;
        w.appendChild(i); frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return el.querySelectorAll('.mx-wi');
  }

  // ── 1. 히어로: 로비 사진은 천천히 깊어지고(켄번스 위에 translate·scale 따로), 글은 먼저 떠난다
  if (hero) {
    var bg = $('.cinematic-hero-bg', hero);
    if (bg) gsap.fromTo(bg, { translate: '0px 0px', scale: 1, filter: 'brightness(1)' },
      { translate: '0px ' + (mobile ? 60 : 160) + 'px', scale: 1.08, filter: 'brightness(0.55)', ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    var hb = $('.hero-headline-block', hero);
    if (hb) gsap.fromTo(hb, { y: 0 }, { y: mobile ? -50 : -140, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    $$('.side-meta', hero).forEach(function (m, i) {
      gsap.fromTo(m, { y: 0 }, { y: (i ? 1 : -1) * 220, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    });
  }

  // ── 2. 선언문: "공감으로 시작해서 신뢰로 완성합니다" — 읽는 속도대로 한 낱말씩 불이 켜지고, 다 읽으면 켜진 채로
  var sections = $$('section').filter(function (s) { return !s.closest('nav, footer, #mobileMenu') && s !== hero; });
  var manifesto = sections.find(function (s) { return $('.editorial-grid', s); });
  if (manifesto) {
    var mh = $('h2', manifesto);
    if (mh) {
      mh.classList.add('mx-read');
      claim(mh);
      var words = splitWords(mh);
      scrubOnce(words, { opacity: 0.16 }, { opacity: 1, stagger: 0.14 },
        { trigger: mh, start: 'top 80%', end: 'bottom 40%' });
    }
    // 편집 그리드: 사진은 커튼(.img-reveal) 그대로 + 안쪽 사진이 서로 다른 속도로 흐름
    $$('.editorial-grid .img-frame img', manifesto).forEach(function (img, i) {
      var box = img.parentElement; box.classList.add('mx-par');
      gsap.fromTo(img, { yPercent: -6 - i * 2, scale: 1.14 }, { yPercent: 6 + i * 2, scale: 1.14, ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    var eg3 = $('.eg-3', manifesto);
    if (eg3) enter(eg3, { rotate: -4, scale: 0.88, opacity: 0, duration: 1.4, ease: SILK }, eg3, 'top 90%');
  }

  // ── 모든 섹션 제목: 낱말이 살짝 기운 채 마스크 아래에서 천천히 올라옴 (느린 expo — 비단 같은 결)
  sections.forEach(function (s) {
    $$('h2', s).forEach(function (h) {
      if (h.classList.contains('mx-read') || isClaimed(h)) return;
      enter(splitWords(h), { yPercent: 105, rotate: 4, duration: 1.25, ease: SILK, stagger: 0.07 }, h, 'top 88%');
    });
    $$('.section-label', s).forEach(function (l) {
      if (isClaimed(l)) return;
      enter(l, { x: -24, opacity: 0, duration: 1, ease: SILK }, l, 'top 92%');
    });
  });

  // ── 3. 시그니처 3선: 카드가 아래에서 위로 걷히며(클립) 열리고, 사진은 안에서 물러난다
  var hs = $('[data-hscroll]');
  if (hs) {
    var intro = $('.h-scroll-intro', hs);
    if (intro) enter(intro.children, { y: 40, opacity: 0, duration: 1.1, ease: SILK, stagger: 0.1 }, hs, 'top 85%');
    var hcards = $$('.h-scroll-card', hs);
    enter(hcards, { clipPath: 'inset(100% 0% 0% 0%)', y: 60, duration: 1.4, ease: 'expo.inOut', stagger: 0.14 }, hs, 'top 82%');
    hcards.forEach(function (c) {
      var img = $('img', c); if (!img) return;
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: hs, start: 'top bottom', end: 'bottom 40%', scrub: true } });
      var num = $('.h-scroll-number', c);
      if (num) gsap.fromTo(num, { yPercent: 30 }, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: hs, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // ── 4. 숫자로 말하는: 줄마다 큰 숫자가 왼쪽에서 밀려 들어오고, 스크롤 속도만큼 숫자가 기울었다 돌아옴
  var stats = $$('.mega-stat');
  stats.forEach(function (row) {
    var label = $('.mega-stat-label', row), num = $('.mega-stat-num', row), desc = $$('.mega-stat-desc > span', row);
    if (label) enter(label, { x: -30, opacity: 0, duration: 1, ease: SILK }, row, 'top 86%');
    if (num) enter(num, { xPercent: -14, opacity: 0, duration: 1.4, ease: SILK }, row, 'top 86%');
    if (desc.length) enter(desc, { y: 18, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, delay: 0.15 }, row, 'top 84%');
    claim(row);
  });
  if (stats.length) {
    var nums = $$('.mega-stat-num');
    nums.forEach(function (n) { n.classList.add('mx-skew'); });
    var skewTo = nums.map(function (n) { return gsap.quickTo(n, 'skewX', { duration: 0.6, ease: 'power3' }); });
    ScrollTrigger.create({ trigger: stats[0].parentElement, start: 'top bottom', end: 'bottom top',
      onUpdate: function (self) { var v = gsap.utils.clamp(-10, 10, self.getVelocity() / -220); skewTo.forEach(function (f) { f(v); }); },
      onLeave: function () { skewTo.forEach(function (f) { f(0); }); }, onLeaveBack: function () { skewTo.forEach(function (f) { f(0); }); } });
  }

  // ── 5. 전체 진료안내 16칸: 가운데에서 바깥으로 타일이 톡톡 튀어나옴
  var tiles = $$('a[href^="/treatments/"].rounded-2xl');
  if (tiles.length) {
    var grid = tiles[0].parentElement;
    enter(tiles, { y: 30, scale: 0.7, opacity: 0, duration: 0.9, ease: 'back.out(1.6)',
      stagger: { grid: 'auto', from: 'center', amount: 0.55 } }, grid, 'top 86%');
  }

  // ── 6. 대구 북구 사진 카드: 차례로 올라오고, 사진은 정사각 안에서 천천히 줌아웃
  var bukgu = $('[aria-labelledby="bukgu-cards-title"]');
  if (bukgu) {
    var lis = $$('ul > li', bukgu);
    enter(lis, { y: mobile ? 40 : 90, opacity: 0, duration: 1.2, ease: SILK, stagger: 0.09 }, lis[0], 'top 88%');
    $$('ul > li img', bukgu).forEach(function (img) {
      var box = img.closest('.aspect-square'); if (box) box.classList.add('mx-par');
      gsap.fromTo(img, { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: box || img, start: 'top bottom', end: 'bottom 30%', scrub: true } });
    });
  }

  // ── 7. 의료진: 단체 사진이 액자에서 화면 폭으로 펼쳐지고 → 대표원장 카드가 다가오고 → 원장 카드는 계단처럼
  var team = $('img[src*="team-6-main"]');
  if (team) {
    var frame = team.closest('.img-frame');
    frame.classList.add('mx-own', 'mx-par');
    scrubOnce(frame, { clipPath: mobile ? 'inset(0% 4% 0% 4% round 32px)' : 'inset(6% 12% 6% 12% round 32px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 32px)' }, { trigger: frame, start: 'top 95%', end: 'top 25%' });
    gsap.fromTo(team, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  var spot = $('.spotlight-card');
  if (spot) {
    scrubOnce(spot, { scale: mobile ? 0.95 : 0.88 }, { scale: 1 }, { trigger: spot, start: 'top bottom', end: 'top 35%' });
    var simg = $('.spotlight-card-img', spot);
    if (simg) gsap.fromTo(simg, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: spot, start: 'top bottom', end: 'bottom top', scrub: true } });
    var fname = $('.founder-name-line', spot);
    if (fname) enter(fname, { y: 40, opacity: 0, duration: 1.3, ease: SILK }, spot, 'top 60%');
  }
  var depts = $$('a[href="/doctors"].inline-flex');
  if (depts.length) enter(depts, { y: 22, scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.07 }, depts[0], 'top 92%');
  var docCards = $$('a[href^="/doctors/"]').filter(function (a) { return a.classList.contains('group') && a.classList.contains('block') && !a.classList.contains('spotlight-card'); });
  if (docCards.length) enter(docCards, { y: function (i) { return (mobile ? 40 : 70) + (i % 2) * (mobile ? 0 : 50); }, opacity: 0,
    duration: 1.2, ease: SILK, stagger: 0.1 }, docCards[0].parentElement, 'top 86%');

  // ── 8. 무엇이 다른가: 골드 실이 내려가며 지금 읽는 단계에 불이 켜짐
  var tl = $('.timeline');
  if (tl) {
    tl.classList.add('mx-thread');
    var items = $$('.timeline-item', tl);
    enter(items, { x: 50, opacity: 0, duration: 1.1, ease: SILK, stagger: 0.1 }, tl, 'top 84%');
    gsap.fromTo(tl, { '--mx-p': 0 }, { '--mx-p': 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 55%', scrub: true } });
    ScrollTrigger.create({ trigger: tl, start: 'top 60%', end: 'bottom 45%',
      onUpdate: function (self) {
        var idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
        items.forEach(function (it, i) { it.classList.toggle('mx-on', i === idx); });
      },
      onLeave: function () { items.forEach(function (it) { it.classList.remove('mx-on'); }); },
      onLeaveBack: function () { items.forEach(function (it) { it.classList.remove('mx-on'); }); } });
    var blobSec = tl.closest('section');
    $$('.blob', blobSec).forEach(function (b, i) {
      claim(b);
      gsap.fromTo(b, { translate: '0px ' + (i ? -80 : 120) + 'px' }, { translate: '0px ' + (i ? 140 : -160) + 'px', ease: 'none',
        scrollTrigger: { trigger: blobSec, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // ── 9. 후기: 카드가 종이처럼 아래 모서리에서 일어섬
  var tcards = $$('.testimonial-card');
  if (tcards.length) {
    gsap.set(tcards[0].parentElement, { perspective: 1200 });
    enter(tcards, { rotateX: mobile ? -30 : -65, y: 40, opacity: 0, transformOrigin: '50% 100%', duration: 1.3, ease: SILK, stagger: 0.12 },
      tcards[0].parentElement, 'top 85%');
  }

  // ── 10. 공간 갤러리: 커튼은 그대로, 사진은 장마다 엇갈린 속도로 흐름
  var gallerySec = sections.find(function (s) { return $$('.img-reveal', s).length > 6; });
  if (gallerySec) {
    $$('.img-reveal img', gallerySec).forEach(function (img, i) {
      var box = img.parentElement; box.classList.add('mx-par');
      var d = (i % 3 === 0) ? 9 : (i % 3 === 1 ? 5 : 12);
      gsap.fromTo(img, { yPercent: -d, scale: 1.22 }, { yPercent: d, scale: 1.22, ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // ── 11. FAQ: 질문이 왼쪽에서 한 줄씩
  var acc = $$('.accordion-item');
  if (acc.length) enter(acc, { x: -40, opacity: 0, duration: 1, ease: SILK, stagger: 0.08 }, acc[0], 'top 90%');

  // ── 12. 더 깊이 알아가기: 한 묶음으로 겹쳐 있던 카드가 오른쪽으로 펼쳐지듯 나뉨 (PC)
  var pcards = $$('.photo-card');
  if (pcards.length) {
    var pgrid = pcards[0].parentElement;
    if (!mobile) {
      var r0 = pcards[0].getBoundingClientRect();
      enter(pcards, { x: function (i) { return r0.left - pcards[i].getBoundingClientRect().left; }, rotate: function (i) { return -2 + i * 1.5; },
        y: 40, opacity: function (i) { return i ? 0 : 0.6; }, duration: 1.4, ease: 'expo.inOut', stagger: 0.06 }, pgrid, 'top 80%');
    } else {
      enter(pcards, { y: 50, opacity: 0, duration: 1.1, ease: SILK, stagger: 0.1 }, pgrid, 'top 88%');
    }
    pcards.forEach(function (c) {
      var img = $('img', c); if (!img) return;
      gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // ── 13. 요일별 스케줄: 표가 떠오르고 요일 칸이 월→일 순서로 내려앉음
  var sched = sections.find(function (s) { return $('.grid-cols-7', s); });
  if (sched) {
    var cols = $$('.grid-cols-7', sched);
    cols.forEach(function (row, r) {
      enter(row.children, { y: -22, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: r * 0.12 }, cols[0], 'top 85%');
    });
  }

  // ── 14. 상담 CTA: 수술실 사진이 화면 가득 다가오고, 정보는 차례로
  var ctaSec = sections[sections.length - 1];
  if (ctaSec && $('img[src*="cta-operation-room"]', ctaSec)) {
    var cimg = $('img[src*="cta-operation-room"]', ctaSec);
    claim(cimg);
    gsap.fromTo(cimg, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: ctaSec, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    $$('.blob', ctaSec).forEach(function (b) { claim(b); });
  }

  // ── 나머지: 넘겨받은 블록 중 아직 연출 없는 것은 기본 등장(아래에서 천천히)
  sections.forEach(function (s) {
    $$(':scope > div > *, :scope > div > div > *, :scope > div > div > div > *', s).forEach(function (el) {
      if (/STYLE|SCRIPT|BR/.test(el.tagName) || isClaimed(el)) return;
      if (el.classList.contains('blob') || el.classList.contains('img-reveal') || el.querySelector('.img-reveal')) return;
      var r = el.getBoundingClientRect();
      if (r.height < 8 || r.height > innerHeight * 1.6) return;
      enter(el, { y: 44, opacity: 0, duration: 1.15, ease: SILK }, el, 'top 90%');
    });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
})();
