import { Navbar, Footer } from '../components/Layout'

/* ============================================================
   대구365치과 · 플레이 (게임존)
   서울비디치과 /games 구조 벤치마킹 → 대구365 버전 3종 구성
   - /play/defense  : 치석 디펜스 (종스크롤 슈팅)
   - /play/bti      : 치아BTI 16유형 심리테스트
   - /play/rush     : 365 RUSH 무한 러너
   ============================================================ */

export const PlayHubPage = () => (
  <>
    <Navbar />

    <main class="bg-[#0a0a14] text-ivory min-h-screen pt-32 pb-32 relative overflow-hidden">
      {/* 배경 글로우 */}
      <div class="absolute inset-0 pointer-events-none" style="background:
        radial-gradient(ellipse at 20% 10%, rgba(201,168,118,0.18) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(236,72,153,0.10) 0%, transparent 55%),
        radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%);"></div>

      <div class="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* 헤더 */}
        <div class="text-center mb-16 fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style="background:rgba(201,168,118,0.12);border:1px solid rgba(201,168,118,0.3);">
            <span class="text-xl">🎮</span>
            <span class="text-xs tracking-[0.4em] text-gold font-bold">PLAY · 365 GAMEZONE</span>
          </div>
          <h1 class="display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6">
            <span class="block">치과가 이렇게</span>
            <span class="block italic" style="background:linear-gradient(135deg,#c9a876,#ec4899,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">재밌을 수 있다고?</span>
          </h1>
          <p class="text-lg md:text-xl text-ivory/70 max-w-2xl mx-auto leading-relaxed">
            게임하고, 점수 자랑하고, 예약까지 🦷<br/>
            대구365치과가 만든 무료 미니게임 3종.
          </p>

          <div class="flex justify-center gap-6 mt-10 flex-wrap">
            <div class="text-center">
              <div class="text-3xl font-black text-gold">3</div>
              <div class="text-[10px] tracking-[0.3em] text-ivory/40 mt-1">GAMES</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-gold">∞</div>
              <div class="text-[10px] tracking-[0.3em] text-ivory/40 mt-1">FREE PLAY</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-gold">365</div>
              <div class="text-[10px] tracking-[0.3em] text-ivory/40 mt-1">DAYS OPEN</div>
            </div>
          </div>
        </div>

        {/* 게임 카드 3종 */}
        <div class="grid md:grid-cols-3 gap-6 fade-in-stagger">
          {/* 1. 치석 디펜스 */}
          <a href="/play/defense" class="group block rounded-3xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2"
             style="background:linear-gradient(160deg,#2d1b4e 0%,#1a0a3e 50%,#0a0a1a 100%);border:1px solid rgba(124,58,237,0.3);">
            <div class="aspect-[4/5] flex flex-col items-center justify-center p-8 relative">
              <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-widest font-bold"
                   style="background:rgba(124,58,237,0.25);color:#c4a5ff;border:1px solid rgba(124,58,237,0.4);">
                ARCADE
              </div>
              <div class="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500"
                   style="filter:drop-shadow(0 0 30px rgba(124,58,237,0.5));">🛡️</div>
              <div class="text-xs tracking-[0.4em] text-purple-300 font-bold mb-3">SHOOTING · 01</div>
              <h2 class="display text-3xl font-black mb-3 text-ivory">치석 디펜스</h2>
              <p class="text-sm text-ivory/60 leading-relaxed text-center mb-6">
                치석·세균·플라그를<br/>
                스케일러로 격추하라!
              </p>
              <div class="flex gap-2 mb-6">
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">3~5분</span>
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">키보드/터치</span>
              </div>
              <div class="inline-flex items-center gap-2 text-sm font-bold text-gold group-hover:gap-4 transition-all">
                플레이 시작 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </a>

          {/* 2. 치아BTI */}
          <a href="/play/bti" class="group block rounded-3xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2"
             style="background:linear-gradient(160deg,#4a1d3f 0%,#2d0a3e 50%,#0a0a1a 100%);border:1px solid rgba(236,72,153,0.3);">
            <div class="aspect-[4/5] flex flex-col items-center justify-center p-8 relative">
              <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-widest font-bold"
                   style="background:rgba(236,72,153,0.25);color:#fbb6ce;border:1px solid rgba(236,72,153,0.4);">
                TEST
              </div>
              <div class="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500"
                   style="filter:drop-shadow(0 0 30px rgba(236,72,153,0.5));">🧬</div>
              <div class="text-xs tracking-[0.4em] text-pink-300 font-bold mb-3">PSYCHO · 02</div>
              <h2 class="display text-3xl font-black mb-3 text-ivory">치아BTI</h2>
              <p class="text-sm text-ivory/60 leading-relaxed text-center mb-6">
                나의 구강 유형은?<br/>
                16가지 타입 분석 + 맞춤 진료 추천
              </p>
              <div class="flex gap-2 mb-6">
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">~2분</span>
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">12문항</span>
              </div>
              <div class="inline-flex items-center gap-2 text-sm font-bold text-gold group-hover:gap-4 transition-all">
                테스트 시작 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </a>

          {/* 3. 365 RUSH */}
          <a href="/play/rush" class="group block rounded-3xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2"
             style="background:linear-gradient(160deg,#3d2914 0%,#2a1a0d 50%,#0a0a1a 100%);border:1px solid rgba(201,168,118,0.35);">
            <div class="aspect-[4/5] flex flex-col items-center justify-center p-8 relative">
              <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-widest font-bold"
                   style="background:rgba(201,168,118,0.25);color:#ffe0a8;border:1px solid rgba(201,168,118,0.4);">
                RUNNER
              </div>
              <div class="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500"
                   style="filter:drop-shadow(0 0 30px rgba(201,168,118,0.5));">🏃</div>
              <div class="text-xs tracking-[0.4em] text-amber-300 font-bold mb-3">ENDLESS · 03</div>
              <h2 class="display text-3xl font-black mb-3 text-ivory">365 RUSH</h2>
              <p class="text-sm text-ivory/60 leading-relaxed text-center mb-6">
                30초 버틸 수 있어?<br/>
                점프해서 충치를 피해라!
              </p>
              <div class="flex gap-2 mb-6">
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">30초</span>
                <span class="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ivory/50">스페이스/탭</span>
              </div>
              <div class="inline-flex items-center gap-2 text-sm font-bold text-gold group-hover:gap-4 transition-all">
                러닝 시작 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </a>
        </div>

        {/* 하단 CTA */}
        <div class="mt-20 text-center">
          <p class="text-ivory/50 text-sm mb-6">
            게임은 재미로! 진료는 진심으로 — 365일 진료합니다.
          </p>
          <div class="flex justify-center gap-3 flex-wrap">
            <a href="tel:053-357-0365" class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition hover:opacity-90"
               style="background:var(--gold);color:#1a0a0a;">
              <i class="fas fa-phone"></i>
              <span>053-357-0365</span>
            </a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition hover:opacity-90"
               style="background:#03C75A;color:#fff;">
              <span class="text-[11px] font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 4px;">N</span>
              <span>네이버예약</span>
            </a>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </>
)
