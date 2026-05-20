// Common Layout Components

export const Navbar = () => (
  <>
    {/* PPT PC1 슬라이드 2 — 로고 크기 키움 (h-11→h-14) + 헤더 높이 확장 (h-20→h-24)으로 DENTAL의 L 잘림 방지 */}
    {/* PPT PC3 슬라이드 3 — 좌측 상단 병원 로고/이름 크기 키움 */}
    <nav class="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div class="flex items-center justify-between h-24 lg:h-[104px]">
          <div class="flex items-center gap-3 shrink-0">
            <a href="/" class="flex items-center group" aria-label="대구365치과 홈">
              <img
                src="/static/images/logo-horizontal-brown.png"
                alt="대구365치과 DAEGU 365 DENTAL CLINIC"
                class="h-12 lg:h-16 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
                style="max-width:none;"
                width="332" height="115"
              />
            </a>
            {/* LIVE 진료 상태 — 영업시간에 따라 자동 갱신 (스크립트로 텍스트/색상 변경) */}
            <div
              id="nav-live-status"
              class="hidden md:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition whitespace-nowrap"
              style="background:rgba(34,197,94,0.10); border-color:rgba(34,197,94,0.35); color:#15803d;"
              role="status"
              aria-live="polite"
            >
              <span class="relative flex h-1.5 w-1.5">
                <span id="nav-live-ping" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span id="nav-live-dot" class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span id="nav-live-label" class="font-bold tracking-wider">LIVE</span>
              <span class="opacity-40">·</span>
              <span id="nav-live-text" class="font-semibold">진료중</span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-5 xl:gap-7">
            <a href="/mission" class="nav-link">병원미션</a>
            {/* PPT PC3 슬라이드 1 — 의료진 호버 드롭다운 제거, 단일 링크로 변경 */}
            <a href="/doctors" class="nav-link py-8">의료진</a>
            {/* PPT PC3 슬라이드 4 — 진료안내를 상단 sub-bar로 노출 (드롭다운은 3열 메가메뉴) */}
            <div class="has-dropdown relative py-8">
              <a href="/treatments" class="nav-link">진료안내</a>
              <div class="mega-dropdown">
                {/* Column 1 — 핵심 진료 */}
                <div class="mega-col">
                  <div class="mega-col-title is-core">핵심 진료</div>
                  <a href="/treatments/implant" class="is-featured">✦ 수면임플란트</a>
                  <a href="/treatments/ortho" class="is-featured">✦ 인비절라인 (교정)</a>
                  <a href="/treatments/lamineer" class="is-featured">✦ 비니크 프리미엄 라미네이트</a>
                </div>
                {/* Column 2 — 특화 진료 */}
                <div class="mega-col">
                  <div class="mega-col-title is-sub">특화 진료</div>
                  <a href="/treatments/sleep-therapy">수면치료 시스템</a>
                  <a href="/treatments/painless-anesthesia">4단계 무통마취</a>
                  <a href="/treatments/airflow-gbt">에어플로우 (GBT)</a>
                  <a href="/treatments/pediatric-ortho">소아 교정장치</a>
                </div>
                {/* Column 3 — 일반 진료 (+ 더 보기 통합) */}
                <div class="mega-col">
                  <div class="mega-col-title is-sub">일반 진료</div>
                  <a href="/treatments/cavity-endo-crown">충치·신경치료·크라운</a>
                  <a href="/treatments/perio">치주치료</a>
                  <a href="/treatments/pediatric">소아치과</a>
                  <a href="/treatments/whitening">전문가 미백</a>
                  <a href="/treatments/icon-resin">아이콘 레진 (백반)</a>
                  <a href="/treatments/qray">Q-ray 정밀진단</a>
                  <a href="/treatments/in-house-lab">원내 디지털 기공실</a>
                  <a href="/treatments/prosthetic">보철</a>
                  <a href="/treatments/prevention">예방치과</a>
                  <a href="/treatments/aesthetic">심미치료</a>
                  <a href="/treatments/conservative">보존치료</a>
                  <div class="mega-col-divider"></div>
                  <a href="/treatments" class="is-featured">전체 진료 보기 →</a>
                </div>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/before-after" class="nav-link">콘텐츠</a>
              <div class="dropdown">
                <a href="/before-after">비포애프터</a>
                <a href="/blog">블로그</a>
                <a href="/notices">공지사항</a>
                <a href="/dictionary">백과사전</a>
                <a href="/faq">자주묻는질문</a>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/directions" class="nav-link">비용·내원안내</a>
              <div class="dropdown">
                <a href="/fees">비용 안내</a>
                <a href="/directions">오시는 길</a>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/play" class="nav-link" style="color:#ec4899;font-weight:700;">🎮 플레이</a>
              <div class="dropdown">
                <a href="/play/defense">🛡️ 치석 디펜스</a>
                <a href="/play/bti">🧬 치아BTI</a>
                <a href="/play/rush">🏃 365 RUSH</a>
                <a href="/play" style="border-top:1px solid #e5d9c8;padding-top:8px;margin-top:4px;">전체 게임 보기</a>
              </div>
            </div>
          </div>

          {/* PPT PC3-S?? — 우측 상단 컴팩트 그룹 (참고사진 매칭)
              [📞 전화아이콘]  [➡로그인]  [👤+회원가입]  [📅 편리한 상담예약(파란 둥근 버튼)] */}
          <div class="flex items-center gap-3 xl:gap-4 shrink-0">
            {/* 전화 — 텍스트 없이 아이콘만 (참고사진처럼 회색 톤) */}
            <a
              href="tel:053-357-0365"
              class="hidden md:inline-flex items-center justify-center w-9 h-9 text-brown-600 hover:text-brown-900 transition"
              aria-label="전화 053-357-0365"
              title="053-357-0365"
            >
              <i class="fas fa-phone text-[17px]"></i>
            </a>
            {/* 로그인 — 텍스트 + 아이콘 */}
            <a
              href="/login"
              class="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-brown-700 hover:text-brown-950 transition"
            >
              <i class="fas fa-arrow-right-to-bracket text-[13px]"></i>
              <span>로그인</span>
            </a>
            {/* 회원가입 — 텍스트 + 아이콘 */}
            <a
              href="/signup"
              class="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-brown-700 hover:text-brown-950 transition"
            >
              <i class="fas fa-user-plus text-[13px]"></i>
              <span>회원가입</span>
            </a>
            {/* 편리한 상담예약 — 메인 CTA 버튼 (스크롤 위치에 따라 색상/텍스트 변신 — openConsultModal 클릭 직접 트리거)
                ① 0~600px:    "편리한 상담예약" — 파란
                ② 600~1500:   "내 케이스 진단받기" — 보라
                ③ 1500~3000:  "지금 예약하기" — 갈색
                ④ 3000+:      "오늘 상담 가능!" — 레드 펄스 */}
            <button
              type="button"
              id="openConsultModal"
              class="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-full text-white font-black text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              style="background:linear-gradient(135deg, #4a90e2 0%, #3b75d4 100%); border:2px solid rgba(255,255,255,0.3);"
              aria-label="편리한 상담예약 모달 열기"
            >
              <i id="navCtaIcon" class="fas fa-calendar-check text-[13px]"></i>
              <span id="navCtaLabel">편리한 상담예약</span>
            </button>
            <button id="menuBtn" class="lg:hidden w-10 h-10 flex items-center justify-center text-brown-800">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

    </nav>

    {/* LIVE 진료 상태 자동 갱신 — 영업시간 (월·목 09:30~21:00, 화·수·금 09:30~18:30, 토·일 09:30~17:00, 점심 13:00~14:00) */}
    <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function getStatus(){
    var now = new Date();
    var day = now.getDay(); // 0=Sun ~ 6=Sat
    var mins = now.getHours() * 60 + now.getMinutes();
    // 요일별 영업시간 (분 단위)
    var SCHEDULE = {
      0: { open: 9*60+30, close: 17*60 },        // 일
      1: { open: 9*60+30, close: 21*60 },        // 월 야간
      2: { open: 9*60+30, close: 18*60+30 },     // 화
      3: { open: 9*60+30, close: 18*60+30 },     // 수
      4: { open: 9*60+30, close: 21*60 },        // 목 야간
      5: { open: 9*60+30, close: 18*60+30 },     // 금
      6: { open: 9*60+30, close: 17*60 }         // 토
    };
    var LUNCH_OPEN = 13*60;
    var LUNCH_CLOSE = 14*60;
    var s = SCHEDULE[day];
    if (!s) return { state:'closed', label:'CLOSED', text:'휴진' };
    if (mins < s.open) return { state:'soon', label:'SOON', text:'오픈 전' };
    if (mins >= s.close) return { state:'closed', label:'CLOSED', text:'마감' };
    // 점심시간 (평일만)
    if (day >= 1 && day <= 5 && mins >= LUNCH_OPEN && mins < LUNCH_CLOSE) {
      return { state:'lunch', label:'LUNCH', text:'점심시간' };
    }
    return { state:'open', label:'LIVE', text:'진료중' };
  }

  function paint(){
    var el = document.getElementById('nav-live-status');
    if (!el) return;
    var st = getStatus();
    var dot = document.getElementById('nav-live-dot');
    var ping = document.getElementById('nav-live-ping');
    var label = document.getElementById('nav-live-label');
    var text = document.getElementById('nav-live-text');
    if (!dot || !label || !text) return;

    if (st.state === 'open') {
      el.style.background = 'rgba(34,197,94,0.10)';
      el.style.borderColor = 'rgba(34,197,94,0.35)';
      el.style.color = '#15803d';
      dot.style.background = '#22c55e';
      if (ping) ping.style.background = '#4ade80';
      if (ping) ping.style.display = 'inline-flex';
    } else if (st.state === 'lunch') {
      el.style.background = 'rgba(234,179,8,0.10)';
      el.style.borderColor = 'rgba(234,179,8,0.4)';
      el.style.color = '#a16207';
      dot.style.background = '#eab308';
      if (ping) ping.style.background = '#facc15';
      if (ping) ping.style.display = 'inline-flex';
    } else if (st.state === 'soon') {
      el.style.background = 'rgba(59,130,246,0.10)';
      el.style.borderColor = 'rgba(59,130,246,0.35)';
      el.style.color = '#1d4ed8';
      dot.style.background = '#3b82f6';
      if (ping) ping.style.background = '#60a5fa';
      if (ping) ping.style.display = 'inline-flex';
    } else {
      el.style.background = 'rgba(120,113,108,0.12)';
      el.style.borderColor = 'rgba(120,113,108,0.35)';
      el.style.color = '#57534e';
      dot.style.background = '#a8a29e';
      if (ping) ping.style.display = 'none';
    }
    label.textContent = st.label;
    text.textContent = st.text;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }
  // 1분마다 자동 갱신
  setInterval(paint, 60000);
})();
    ` }} />

    {/* Mobile Menu */}
    <div id="mobileMenu" class="mobile-menu lg:hidden">
      <div class="flex justify-between items-center p-6 border-b border-brown-200">
        <img
          src="/static/images/logo-horizontal-brown.png"
          alt="대구365치과"
          class="h-9 w-auto"
        />
        <button id="menuClose" class="w-10 h-10 flex items-center justify-center" aria-label="메뉴 닫기">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <a href="/mission" class="block text-2xl display font-medium">병원미션</a>
        <a href="/doctors" class="block text-2xl display font-medium">의료진</a>
        <div>
          <div class="text-2xl display font-medium mb-3">진료안내</div>
          <div class="pl-4 space-y-2 text-brown-700">
            <a href="/treatments/implant" class="block">· 수면임플란트</a>
            <a href="/treatments/ortho" class="block">· 인비절라인 (교정)</a>
            <a href="/treatments/lamineer" class="block">· 비니크 프리미엄 라미네이트</a>
            <a href="/treatments" class="block text-sm underline">전체 보기 →</a>
          </div>
        </div>
        <a href="/before-after" class="block text-2xl display font-medium">비포애프터</a>
        <a href="/blog" class="block text-2xl display font-medium">블로그</a>
        <a href="/notices" class="block text-2xl display font-medium">공지사항</a>
        <a href="/dictionary" class="block text-2xl display font-medium">백과사전</a>
        <a href="/faq" class="block text-2xl display font-medium">자주묻는질문</a>
        <div>
          <div class="text-2xl display font-medium mb-3">비용·내원안내</div>
          <div class="pl-4 space-y-2 text-brown-700">
            <a href="/fees" class="block">· 비용 안내</a>
            <a href="/directions" class="block">· 오시는 길</a>
          </div>
        </div>
        <div>
          <div class="text-2xl display font-medium mb-3" style="color:#ec4899;">🎮 플레이</div>
          <div class="pl-4 space-y-2 text-brown-700">
            <a href="/play/defense" class="block">· 🛡️ 치석 디펜스</a>
            <a href="/play/bti" class="block">· 🧬 치아BTI</a>
            <a href="/play/rush" class="block">· 🏃 365 RUSH</a>
            <a href="/play" class="block text-sm underline">전체 게임 보기 →</a>
          </div>
        </div>
        <div class="pt-4 border-t border-brown-200 space-y-3">
          <a href="/login" class="block">로그인</a>
          <a href="/signup" class="block">회원가입</a>
          <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full font-bold py-3 rounded-full" style="background:#03C75A;color:#fff;">
            <span class="text-xs font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:2px 6px;">N</span>
            네이버예약
          </a>
          <a href="http://pf.kakao.com/_PGaxmn" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full font-bold py-3 rounded-full" style="background:#FEE500;color:#191919;">
            <i class="fas fa-comment"></i>
            카카오톡 상담
          </a>
          <a href="https://www.instagram.com/daegu365dc_?igsh=MThuemZncThqOTF3ZA==" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full font-bold py-3 rounded-full text-white" style="background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);">
            <i class="fab fa-instagram"></i>
            인스타그램
          </a>
          <a href="tel:053-357-0365" class="btn-primary w-full justify-center">
            <i class="fas fa-phone"></i> 053-357-0365
          </a>
        </div>
      </div>
    </div>

    {/* Spacer — 헤더 (h-24 = 96px) 높이 보정 */}
    <div class="h-24" aria-hidden="true"></div>

    {/* ========== 네비바 편리한 상담예약 버튼 — 스크롤 위치에 따라 4단계 모핑
        (별도 우측 상단 떠다니는 CTA 제거 — 네비바 버튼 하나로 통합)
        ① 0~600px:    "편리한 상담예약"  — 파란   #4a90e2
        ② 600~1500:   "내 케이스 진단받기" — 보라   #9b7ee5
        ③ 1500~3000:  "지금 예약하기"     — 갈색   #5d4630
        ④ 3000+:      "오늘 상담 가능!"   — 레드 펄스 #e85a6a */}
    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        var btn = document.getElementById('openConsultModal');
        if (!btn) return;
        var iconEl = document.getElementById('navCtaIcon');
        var labelEl = document.getElementById('navCtaLabel');
        if (!iconEl || !labelEl) return;

        var STATES = [
          { threshold: 0,    label: '편리한 상담예약',     icon: 'fa-calendar-check', bg: 'linear-gradient(135deg, #4a90e2 0%, #3b75d4 100%)', border: 'rgba(255,255,255,0.3)',  pulse: false },
          { threshold: 600,  label: '내 케이스 진단받기',  icon: 'fa-stethoscope',    bg: 'linear-gradient(135deg, #9b7ee5 0%, #7c5fcc 100%)', border: 'rgba(255,255,255,0.3)',  pulse: false },
          { threshold: 1500, label: '지금 예약하기',       icon: 'fa-calendar-check', bg: 'linear-gradient(135deg, #5d4630 0%, #3f2f20 100%)', border: 'rgba(201,168,118,0.45)', pulse: false },
          { threshold: 3000, label: '오늘 상담 가능!',     icon: 'fa-fire',           bg: 'linear-gradient(135deg, #e85a6a 0%, #d63d52 100%)', border: 'rgba(255,255,255,0.35)', pulse: true  }
        ];

        var currentIdx = -1;
        var ticking = false;

        function applyState(idx) {
          if (idx === currentIdx) return;
          currentIdx = idx;
          var s = STATES[idx];
          labelEl.style.transition = 'opacity 0.25s';
          iconEl.style.transition = 'opacity 0.25s';
          labelEl.style.opacity = '0';
          iconEl.style.opacity = '0';
          setTimeout(function(){
            labelEl.textContent = s.label;
            iconEl.className = 'fas ' + s.icon + ' text-[13px]';
            labelEl.style.opacity = '1';
            iconEl.style.opacity = '1';
          }, 220);
          btn.style.background = s.bg;
          btn.style.borderColor = s.border;
          if (s.pulse) {
            btn.style.animation = 'navCtaPulse 1.4s ease-in-out infinite';
          } else {
            btn.style.animation = '';
          }
        }

        function update() {
          var y = window.scrollY || window.pageYOffset;
          var idx = 0;
          for (var i = STATES.length - 1; i >= 0; i--) {
            if (y >= STATES[i].threshold) { idx = i; break; }
          }
          applyState(idx);
          ticking = false;
        }

        window.addEventListener('scroll', function(){
          if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
          }
        }, { passive: true });
        update();
      })();
    `}}/>

    {/* 네비바 CTA 펄스 애니메이션 — 마지막 단계 "오늘 상담 가능!" 전용 */}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes navCtaPulse {
        0%, 100% {
          box-shadow: 0 4px 12px rgba(232,90,106,0.45), 0 0 0 0 rgba(232,90,106,0.55);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 6px 16px rgba(232,90,106,0.55), 0 0 0 10px rgba(232,90,106,0);
          transform: scale(1.05);
        }
      }
      #openConsultModal:hover {
        transform: translateY(-2px) scale(1.04);
        filter: brightness(1.08);
      }
    `}}/>

    {/* ========== PPT 슬라이드 14 — 편리한 예약·상담 모달 (참고사진 매칭)
        구조:
        ① 상단 헤더 — "편리한 예약·상담" + 3 카드 (전화/카카오톡/네이버예약)
        ② 좌측: 진료시간 + 오시는길 / 우측: 온라인 상담예약 (요일 + 진료선택)
        ③ FAQ + 지도 ========== */}
    <div id="consultModal" class="fixed inset-0 z-50 hidden items-start justify-center px-4 py-8 overflow-y-auto" style="background:rgba(26,18,10,0.75);backdrop-filter:blur(8px);">
      <div class="bg-cream rounded-3xl shadow-2xl max-w-[920px] w-full relative my-auto" role="dialog" aria-modal="true" aria-labelledby="consultModalTitle">
        <button type="button" id="closeConsultModal" class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ivory shadow hover:bg-brown-100 transition" aria-label="모달 닫기">
          <i class="fas fa-times text-lg text-brown-700"></i>
        </button>

        {/* ① 헤더 영역 — 타이틀 + 3 카드 */}
        <div class="px-6 sm:px-10 pt-10 pb-8 text-center">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brown-950/8 border border-brown-300/40 mb-5">
            <i class="fas fa-calendar-check text-brown-700 text-[11px]"></i>
            <span class="text-[11px] tracking-[0.25em] text-brown-700 font-bold">예약/상담</span>
          </div>
          <h2 id="consultModalTitle" class="display text-3xl sm:text-4xl md:text-[2.6rem] font-black tracking-tight text-brown-950 leading-tight">
            편리한 <span class="t-gold">예약 · 상담</span>
          </h2>
          <p class="mt-3 text-sm sm:text-[15px] text-brown-700">
            365일 진료 — 온라인, 전화, 카카오톡으로 편하게 예약하세요
          </p>

          {/* 3카드 — 전화/카카오/네이버 */}
          <div class="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <a href="tel:053-357-0365" class="group block bg-ivory rounded-2xl border border-brown-200 p-5 hover:border-brown-400 hover:-translate-y-0.5 hover:shadow-lg transition-all text-center">
              <div class="mx-auto w-12 h-12 rounded-full bg-brown-100 text-brown-800 flex items-center justify-center mb-3 group-hover:bg-brown-200 transition">
                <i class="fas fa-phone text-[18px]"></i>
              </div>
              <div class="text-[11px] tracking-[0.2em] text-brown-500 font-bold mb-1.5">전화 예약</div>
              <div class="display text-lg font-black text-brown-950 leading-tight">053-357-0365</div>
              <div class="text-[11px] text-brown-600 mt-1.5">평일 09:30~21:00</div>
            </a>
            <a href="http://pf.kakao.com/_PGaxmn" target="_blank" rel="noopener" class="group block bg-ivory rounded-2xl border border-brown-200 p-5 hover:border-yellow-400 hover:-translate-y-0.5 hover:shadow-lg transition-all text-center">
              <div class="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 transition" style="background:#FEE500;color:#191919;">
                <i class="fas fa-comment text-[18px]"></i>
              </div>
              <div class="text-[11px] tracking-[0.2em] text-brown-500 font-bold mb-1.5">카카오톡 상담</div>
              <div class="display text-base font-black text-brown-950 leading-tight">@대구365치과</div>
              <div class="text-[11px] text-brown-600 mt-1.5">빠른 답변 가능</div>
            </a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="group block bg-ivory rounded-2xl border border-brown-200 p-5 hover:border-green-500 hover:-translate-y-0.5 hover:shadow-lg transition-all text-center">
              <div class="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 transition" style="background:#03C75A;color:#fff;">
                <i class="fas fa-calendar-check text-[18px]"></i>
              </div>
              <div class="text-[11px] tracking-[0.2em] text-brown-500 font-bold mb-1.5">네이버 예약</div>
              <div class="display text-base font-black text-brown-950 leading-tight">즉시 예약</div>
              <div class="text-[11px] text-brown-600 mt-1.5">24시간 가능</div>
            </a>
          </div>
        </div>

        {/* ② 좌·우 그리드 — 진료시간/오시는길 | 온라인 상담예약 */}
        <div class="px-6 sm:px-10 pb-8 grid lg:grid-cols-[300px_1fr] gap-5 lg:gap-6">
          {/* 좌측 패널 */}
          <div class="space-y-5">
            {/* 진료시간 */}
            <div class="bg-ivory rounded-2xl border border-brown-200 p-5">
              <div class="flex items-center gap-2 mb-4">
                <i class="far fa-clock text-brown-700"></i>
                <span class="display text-sm font-black text-brown-950 tracking-tight">진료 시간</span>
              </div>
              <ul class="space-y-2 text-[13px]">
                <li class="flex items-center justify-between">
                  <span class="text-brown-600">월·목</span>
                  <span class="font-bold text-brown-950">09:30 ~ 21:00</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-brown-600">화·수·금</span>
                  <span class="font-bold text-brown-950">09:30 ~ 18:30</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-brown-600">토·일</span>
                  <span class="font-bold text-brown-950">09:30 ~ 17:00</span>
                </li>
                <li class="flex items-center justify-between pt-2 mt-2 border-t border-brown-100">
                  <span class="text-brown-500 text-[12px]">점심시간 (평일)</span>
                  <span class="font-bold text-brown-700 text-[12px]">13:00 ~ 14:00</span>
                </li>
              </ul>
            </div>

            {/* 오시는 길 */}
            <div class="bg-ivory rounded-2xl border border-brown-200 p-5">
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-map-marker-alt text-brown-700"></i>
                <span class="display text-sm font-black text-brown-950 tracking-tight">오시는 길</span>
              </div>
              <p class="text-[13px] text-brown-800 leading-relaxed mb-3">
                대구광역시 북구 침산로 148<br/>엠브로스퀘어 7층
              </p>
              <div class="flex flex-wrap gap-1.5">
                <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black" style="background:#03C75A;color:#fff;">
                  <span class="text-[10px] font-black" style="background:#fff;color:#03C75A;border-radius:3px;padding:0 4px;">N</span> 네이버
                </a>
                <a href="https://maps.google.com/?q=대구365치과" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-brown-100 text-brown-800 hover:bg-brown-200 transition">
                  <i class="fab fa-google text-[10px]"></i> 구글
                </a>
                <a href="https://map.kakao.com/?q=대구365치과" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black" style="background:#FEE500;color:#191919;">
                  <i class="fas fa-map-marker-alt text-[10px]"></i> 카카오
                </a>
              </div>
            </div>
          </div>

          {/* 우측 패널 — 온라인 상담예약 */}
          <div class="bg-ivory rounded-2xl border border-brown-200 p-6 sm:p-7">
            <div class="mb-5">
              <div class="display text-lg font-black text-brown-950 tracking-tight">온라인 상담 예약</div>
              <p class="text-[12px] text-brown-600 mt-1">양식 작성 후 담당자가 확인하여 연락드립니다.</p>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-[13px] font-bold text-brown-900 mb-3">어떤 진료를 원하시나요?</label>
                <p class="text-[11px] text-brown-500 mb-3">진료 항목을 선택해주세요</p>
                <div class="grid grid-cols-3 gap-2.5">
                  {[
                    { v: 'BDX 임플란트', icon: 'fa-tooth', sub: '수면임플란트' },
                    { v: '글로우네이트', icon: 'fa-sun', sub: '디지털라미' },
                    { v: '인비절라인', icon: 'fa-grip-lines', sub: '투명교정' },
                    { v: '일반임플란트', icon: 'fa-tooth', sub: '치아 식립' },
                    { v: '소아치과', icon: 'fa-child', sub: '어린이 치과' },
                    { v: '일반/기타', icon: 'fa-stethoscope', sub: '충치/신경/스케일링' },
                  ].map(t => (
                    <label class="cursor-pointer">
                      <input type="radio" name="consult-treatment" value={t.v} class="peer sr-only" />
                      <div class="aspect-square flex flex-col items-center justify-center text-center rounded-xl border-2 border-brown-200 peer-checked:border-brown-900 peer-checked:bg-brown-900 peer-checked:text-ivory hover:border-brown-400 transition px-2 py-3">
                        <i class={`fas ${t.icon} text-[15px] mb-1.5`}></i>
                        <div class="text-[11px] font-bold leading-tight">{t.v}</div>
                        <div class="text-[9px] opacity-70 mt-0.5 leading-tight">{t.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                id="consultSubmit"
                class="w-full py-4 rounded-full font-black text-sm tracking-wide shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                style="background:linear-gradient(135deg, #5d4630 0%, #3f2f20 100%);color:var(--ivory);"
              >
                다음 단계 <i class="fas fa-arrow-right ml-1.5"></i>
              </button>
            </div>
          </div>
        </div>

        {/* ③ FAQ + 지도 */}
        <div class="px-6 sm:px-10 pb-10">
          <div class="bg-ivory rounded-2xl border border-brown-200 p-6 sm:p-7 mb-5">
            <div class="text-center mb-5">
              <div class="display text-lg font-black text-brown-950 tracking-tight">예약 관련 자주 묻는 질문</div>
            </div>
            <div class="space-y-2">
              {[
                { q: '당일 예약도 가능한가요?', a: '평일에는 당일 예약이 가능하나, 야간(월·목)·주말 예약은 사전 전화 확인을 권장드립니다. (053-357-0365)' },
                { q: '예약 변경이나 취소는 어떻게 하나요?', a: '카카오톡(@대구365치과) 또는 전화(053-357-0365)로 24시간 전까지 연락 주시면 됩니다.' },
                { q: '초진 시 준비물이 있나요?', a: '신분증 1개 정도면 충분합니다. 기존 진료 기록(파노라마, CT)이 있으시면 지참해주세요.' },
                { q: '주차가 가능한가요?', a: '엠브로스퀘어 건물 지하 주차장 무료 이용 가능합니다 (진료 시 2시간).' },
              ].map((f, i) => (
                <details class="group border-b border-brown-100 last:border-b-0">
                  <summary class="flex items-center justify-between gap-3 py-3 cursor-pointer list-none">
                    <span class="text-[13px] sm:text-sm font-bold text-brown-900">{f.q}</span>
                    <i class="fas fa-chevron-down text-[11px] text-brown-500 transition-transform group-open:rotate-180"></i>
                  </summary>
                  <div class="pb-3 pl-1 text-[13px] text-brown-700 leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* 지도 */}
          <div class="bg-ivory rounded-2xl border border-brown-200 overflow-hidden">
            <div class="px-5 pt-4 pb-3 text-center">
              <div class="display text-base font-black text-brown-950 tracking-tight">
                <i class="fas fa-map-marker-alt text-brown-700 mr-1.5"></i>
                오시는 길
              </div>
              <p class="text-[12px] text-brown-600 mt-1">대구광역시 북구 침산로 148 엠브로스퀘어 7층</p>
            </div>
            <iframe
              src="https://map.kakao.com/?q=대구365치과 침산"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style="width:100%;height:260px;border:0;"
              title="대구365치과 약도"
            ></iframe>
            <div class="px-5 py-3 flex flex-wrap justify-center gap-2 border-t border-brown-100">
              <a href="https://maps.google.com/?q=대구365치과+엠브로스퀘어" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-black bg-brown-100 text-brown-800 hover:bg-brown-200 transition">
                <i class="fab fa-google text-[11px]"></i> 구글 지도
              </a>
              <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-black" style="background:#03C75A;color:#fff;">
                <span class="text-[10px] font-black" style="background:#fff;color:#03C75A;border-radius:3px;padding:0 4px;">N</span> 네이버 지도
              </a>
              <a href="https://map.kakao.com/?q=대구365치과" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-black" style="background:#FEE500;color:#191919;">
                <i class="fas fa-map-marker-alt text-[11px]"></i> 카카오맵
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

/**
 * TL;DR 요약 박스 — AEO(LLM 답변 엔진) 최적화 전용 컴포넌트
 *
 * 목적: ChatGPT/Perplexity/Claude/Gemini 등이 페이지를 읽을 때 가장 먼저 인용할
 * "한 문단 직답"을 의미상 명확한 박스로 박아둠. 첫 의미 단위로 잡히도록
 * HERO 직후, 본문 도입부 전에 배치 권장.
 *
 * 구조:
 *  - summary: 핵심 1-2 문장 (LLM이 그대로 인용할 가능성 높은 자리)
 *  - bullets: 4-6개 핵심 팩트 (가격/소요시간/적응증/장비/보증 등)
 *  - cta: 선택적 다음 단계 안내 (전화/예약 링크)
 *
 * 사용 예:
 *  <TldrBox
 *    summary="수면임플란트는 의식하 진정 하에 진행하는 임플란트로, 치과공포증 환자도 꿈결처럼 편안하게 받을 수 있습니다."
 *    bullets={[
 *      { label: '가격', value: '메가젠 80만원 ~ 스트라우만 150만원' },
 *      { label: '소요 기간', value: '식립 1회 + 보철 2-4개월' },
 *      { label: '보증', value: '픽스쳐 5년 / 상부 평생' },
 *      { label: '핵심 장비', value: 'CBCT + 디지털 가이드 + IV 진정' },
 *    ]}
 *  />
 */
export const TldrBox = ({ summary, bullets, cta, label }: {
  summary: string
  bullets: Array<{ label: string; value: string }>
  cta?: { text: string; href: string }
  label?: string
}) => (
  <section class="py-10 lg:py-14 bg-cream border-y border-brown-200/40" aria-label="핵심 요약">
    <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
      <div class="bg-ivory rounded-2xl p-8 lg:p-10 shadow-card border border-gold/20">
        <div class="flex items-center gap-3 mb-6 flex-wrap">
          <span class="inline-flex items-center justify-center px-3 h-7 rounded-full bg-brown-950 text-gold text-[10px] tracking-[0.2em] font-black">TL;DR</span>
          <span class="text-xs tracking-[0.3em] text-brown-500 font-semibold uppercase">{label || '한눈에 보기'}</span>
        </div>
        <p class="display text-xl lg:text-2xl text-brown-900 font-medium leading-relaxed mb-6">
          {summary}
        </p>
        <dl class="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {bullets.map((b) => (
            <div class="flex gap-3 py-2 border-b border-brown-100">
              <dt class="text-brown-500 font-semibold min-w-[5.5rem] tracking-wide">{b.label}</dt>
              <dd class="text-brown-800 flex-1">{b.value}</dd>
            </div>
          ))}
        </dl>
        {cta && (
          <div class="mt-6 pt-5 border-t border-brown-100">
            <a href={cta.href} class="inline-flex items-center gap-2 text-brown-900 hover:text-gold font-semibold tracking-wide">
              <i class="fas fa-arrow-right text-xs"></i>
              <span>{cta.text}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  </section>
)

/**
 * 비교 표 — AEO 강력 무기. "A vs B" 검색 의도 직격 + LLM이 표 구조 그대로 인용.
 *
 * 사용 예:
 *  <ComparisonTable
 *    title="픽스쳐 5종 비교"
 *    headers={['브랜드', '원산지', '특징', '가격']}
 *    rows={[
 *      ['메가젠 ST', '대한민국', 'SLA 표면, 가성비', '80만원'],
 *      ['스트라우만 앤서지', '스위스', 'Roxolid 합금, 50년 임상', '150만원'],
 *    ]}
 *  />
 */
export const ComparisonTable = ({ title, headers, rows, caption }: {
  title?: string
  headers: string[]
  rows: string[][]
  caption?: string
}) => (
  <div class="my-10 fade-in">
    {title && <h3 class="display text-xl lg:text-2xl font-black text-brown-900 mb-4 tracking-tight">{title}</h3>}
    <div class="overflow-x-auto rounded-2xl border border-brown-200/60 shadow-card">
      <table class="w-full text-sm bg-ivory">
        <thead>
          <tr class="bg-brown-950 text-gold">
            {headers.map((h) => (
              <th class="px-4 py-3 text-left font-semibold tracking-wide border-r border-brown-800/50 last:border-r-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr class={idx % 2 === 0 ? 'bg-ivory' : 'bg-cream/60'}>
              {row.map((cell, ci) => (
                <td class={`px-4 py-3 text-brown-800 border-r border-brown-100 last:border-r-0 ${ci === 0 ? 'font-semibold text-brown-900' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {caption && <p class="text-xs text-brown-500 mt-3 italic">{caption}</p>}
  </div>
)

/**
 * 진료 페이지 담당 원장 프로필 블록 — PPT PC2 슬라이드 16~34
 *
 * 각 진료 페이지 하단에 담당 원장님의 사진 + 약력 + 상담예약 CTA를 박는다.
 * 의사 슬러그로 사진 자동 매핑 (최혜정 ↔ 김진덕 사진 스왑 반영).
 *
 * 사용 예:
 *  <DoctorProfileBlock
 *    slug="kim-seongju"
 *    name="김성주"
 *    position="대표원장 · 통합치의학과 전문의"
 *    quote="환자분의 두려움에 공감하고, 꼭 필요한 정직한 치료만 권합니다."
 *    credentials={['서울대 치의학과', '통합치의학과 전문의']}
 *    treatmentLabel="수면임플란트"
 *  />
 */
export const DoctorProfileBlock = ({ slug, name, position, quote, credentials, treatmentLabel }: {
  slug: string
  name: string
  position: string
  quote: string
  credentials?: string[]
  treatmentLabel?: string
}) => {
  // 최혜정 ↔ 김진덕 사진 스왑 (PPT 모바일 s7 / PC1 s13)
  const photoMap: Record<string, string> = {
    'kim-seongju':  '/r2/images/doctors/kim-seongju.jpg',
    'jung-jaeheon': '/r2/images/doctors/jung-jaeheon.jpg',
    'kim-sangwon':  '/r2/images/doctors/kim-sangwon.jpg',
    'choi-hyejung': '/r2/images/doctors/kim-jinduk.jpg',
    'kim-jinduk':   '/r2/images/doctors/choi-hyejung.jpg',
    'han-jieun':    '/r2/images/doctors/han-jieun.jpg',
    'lee-seoyoung': '/r2/images/doctors/lee-seoyoung.jpg',
  }
  const photo = photoMap[slug] || '/r2/images/doctors/team-horizontal-smile.jpg'

  return (
    <section class="py-20 lg:py-24 bg-cream" aria-label={`${name} 원장 담당 진료 안내`}>
      <div class="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div class="bg-ivory rounded-3xl shadow-card border border-brown-100 overflow-hidden grid md:grid-cols-12 gap-0">
          {/* 사진 */}
          <div class="md:col-span-5">
            <div class="img-frame aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-brown-100">
              <img
                src={photo}
                alt={`${name} ${position} — 담당 진료${treatmentLabel ? `: ${treatmentLabel}` : ''}`}
                loading="lazy"
                class="w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>
          {/* 본문 */}
          <div class="md:col-span-7 p-8 lg:p-10 flex flex-col justify-center">
            <div class="text-[10px] tracking-[0.4em] text-gold font-bold mb-3 uppercase">
              {treatmentLabel ? `${treatmentLabel} · 담당 원장` : '담당 원장'}
            </div>
            <h3 class="display text-2xl lg:text-3xl font-black tracking-tight text-brown-900 mb-2">
              {name} <span class="text-brown-600 font-medium text-xl lg:text-2xl">{position}</span>
            </h3>
            <div class="gold-divider my-5"></div>
            <p class="text-brown-800 leading-[1.85] text-[15px] mb-6 whitespace-pre-line">
              "{quote}"
            </p>
            {credentials && credentials.length > 0 && (
              <div class="flex flex-wrap gap-2 mb-6">
                {credentials.map((c) => (
                  <span class="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-brown-950/5 border border-brown-200 text-brown-700 font-semibold">
                    <i class="fas fa-certificate text-gold text-[10px]"></i>
                    {c}
                  </span>
                ))}
              </div>
            )}
            <div class="flex flex-wrap gap-2">
              <a
                href={`/doctors/${slug}`}
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg"
                style="background:linear-gradient(135deg, var(--gold), var(--brown-500));color:var(--brown-950);"
              >
                <i class="fas fa-user-doctor text-xs"></i>
                <span>{name} 원장 프로필 보기</span>
              </a>
              <a
                href="tel:053-357-0365"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg"
                style="background:var(--brown-950);color:var(--gold);"
              >
                <i class="fas fa-phone text-xs"></i>
                <span style="white-space:nowrap;">053-357-0365</span>
              </a>
              <button
                type="button"
                onclick="document.getElementById('openConsultModal')?.click()"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg border border-brown-300 bg-ivory text-brown-900 hover:bg-brown-100"
                aria-label="상담예약 모달 열기"
              >
                <i class="fas fa-calendar-check text-xs"></i>
                <span>상담예약</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const Footer = () => (
  <footer class="footer pt-24 pb-10 mt-0 relative">
    {/* Big brand headline */}
    <div class="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 relative">
      <div class="overflow-hidden">
        <h2 class="display font-black leading-[0.95] text-ivory/95" style="font-size:clamp(2.4rem,9.2vw,8.6rem);letter-spacing:0.005em;white-space:nowrap;padding:0.05em 0.04em;">
          DAEGU<span class="text-gold mx-[0.08em]">365</span>DENTAL
        </h2>
      </div>
      <div class="gold-divider mt-8" style="width:100%;"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
      <div class="grid md:grid-cols-12 gap-12 mb-16">
        <div class="md:col-span-4">
          <div class="mb-6">
            <img
              src="/static/images/logo-vertical-gold.png"
              alt="대구365치과 DAEGU 365 DENTAL CLINIC"
              class="h-28 w-auto"
              width="562" height="562"
            />
          </div>
          <p class="text-brown-300 text-sm leading-relaxed mb-6">
            치과공포증을 가졌던 의사가 만드는,<br/>
            두려움 없는 치과.<br/>
            <span class="text-gold display font-bold">"치과 진입의 허들을 낮추고 경험의 혁신을 이룩한다"</span>
          </p>
          <div class="flex gap-3 flex-wrap">
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 h-10 rounded-full font-bold text-sm transition hover:opacity-90" style="background:#03C75A;color:#fff;" aria-label="네이버 예약">
              <span class="text-[11px] font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 5px;">N</span>
              <span>예약</span>
            </a>
            <a href="http://pf.kakao.com/_PGaxmn" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 h-10 rounded-full font-bold text-sm transition hover:opacity-90" style="background:#FEE500;color:#191919;" aria-label="카카오톡 상담">
              <i class="fas fa-comment"></i>
              <span>카카오톡</span>
            </a>
            <a href="https://blog.naver.com/nowhere2721" target="_blank" rel="noopener" class="w-10 h-10 rounded-full border border-brown-700 flex items-center justify-center hover:bg-brown-800 transition" aria-label="네이버 블로그">
              <span class="text-xs font-bold">blog</span>
            </a>
            <a href="https://www.instagram.com/daegu365dc_?igsh=MThuemZncThqOTF3ZA==" target="_blank" rel="noopener" class="w-10 h-10 rounded-full border border-brown-700 flex items-center justify-center hover:bg-brown-800 transition" aria-label="대구365치과 인스타그램">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div class="md:col-span-2">
          <div class="display text-base text-gold mb-4 font-bold tracking-tight" role="heading" aria-level="3">진료안내</div>
          <ul class="space-y-2 text-sm">
            <li><a href="/treatments/implant">수면임플란트</a></li>
            <li><a href="/treatments/ortho">인비절라인 (교정)</a></li>
            <li><a href="/treatments/lamineer">비니크 프리미엄 라미네이트</a></li>
            <li><a href="/treatments">전체 진료</a></li>
          </ul>
        </div>
        <div class="md:col-span-2">
          <div class="display text-base text-gold mb-4 font-bold tracking-tight" role="heading" aria-level="3">콘텐츠</div>
          <ul class="space-y-2 text-sm">
            <li><a href="/before-after">비포애프터</a></li>
            <li><a href="/blog">블로그</a></li>
            <li><a href="/dictionary">백과사전</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div class="md:col-span-4">
          <div class="display text-base text-gold mb-4 font-bold tracking-tight" role="heading" aria-level="3">내원안내</div>
          <ul class="space-y-3 text-sm text-brown-200">
            <li class="flex gap-2"><i class="fas fa-map-marker-alt mt-1 text-gold"></i>
              <span>대구광역시 북구 침산로 148<br/>엠브로스퀘어 7층</span>
            </li>
            <li class="flex gap-2"><i class="fas fa-phone mt-1 text-gold"></i>
              <a href="tel:053-357-0365">053-357-0365</a>
            </li>
            <li class="flex gap-2"><i class="fas fa-envelope mt-1 text-gold"></i>
              <a href="mailto:daegu365dc@naver.com">daegu365dc@naver.com</a>
            </li>
            <li class="flex gap-2"><i class="fas fa-clock mt-1 text-gold"></i>
              <span class="text-xs leading-relaxed">
                월·목 09:30~21:00<br/>
                화·수·금 09:30~18:30<br/>
                토·일 09:30~17:00
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-brown-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-brown-400">
        <div class="space-y-1">
          <div>사업자: 대구365치과 · 대표: 김성주</div>
          <div>주소: 대구광역시 북구 침산로 148 엠브로스퀘어 7층</div>
          <div>TEL: 053-357-0365 · E: daegu365dc@naver.com</div>
        </div>
        <div class="text-right">
          <div>© <span data-year></span> DAEGU365 DENTAL. All Rights Reserved.</div>
          <div class="mt-1"><a href="/admin" class="opacity-40 hover:opacity-80">관리자</a></div>
        </div>
      </div>
    </div>
  </footer>
)
