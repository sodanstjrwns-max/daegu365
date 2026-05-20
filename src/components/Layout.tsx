// Common Layout Components

export const Navbar = () => (
  <>
    {/* PPT PC1 슬라이드 2 — 로고 크기 키움 (h-11→h-14) + 헤더 높이 확장 (h-20→h-24)으로 DENTAL의 L 잘림 방지 */}
    {/* PPT PC3 슬라이드 3 — 좌측 상단 병원 로고/이름 크기 키움 */}
    <nav class="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div class="flex items-center justify-between h-24 lg:h-[104px]">
          <a href="/" class="flex items-center group shrink-0" aria-label="대구365치과 홈">
            <img
              src="/static/images/logo-horizontal-brown.png"
              alt="대구365치과 DAEGU 365 DENTAL CLINIC"
              class="h-12 lg:h-16 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
              style="max-width:none;"
              width="332" height="115"
            />
          </a>

          <div class="hidden lg:flex items-center gap-8 xl:gap-10">
            <a href="/mission" class="nav-link">병원미션</a>
            {/* PPT PC3 슬라이드 1 — 의료진 호버 드롭다운 제거, 단일 링크로 변경 */}
            <a href="/doctors" class="nav-link py-8">의료진</a>
            {/* PPT PC3 슬라이드 4 — 진료안내를 상단 sub-bar로 노출 (드롭다운은 보조) */}
            <div class="has-dropdown relative py-8">
              <a href="/treatments" class="nav-link">진료안내</a>
              <div class="dropdown" style="min-width:240px">
                <div class="text-[10px] tracking-[0.2em] text-gold px-3 py-1 uppercase">핵심 진료</div>
                <a href="/treatments/implant" class="font-semibold">✦ 수면임플란트</a>
                <a href="/treatments/ortho" class="font-semibold">✦ 인비절라인 (교정)</a>
                <a href="/treatments/lamineer" class="font-semibold">✦ 비니크 프리미엄 라미네이트</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">특화 진료</div>
                <a href="/treatments/sleep-therapy">수면치료 시스템</a>
                <a href="/treatments/painless-anesthesia">4단계 무통마취</a>
                <a href="/treatments/airflow-gbt">에어플로우 (GBT)</a>
                <a href="/treatments/pediatric-ortho">소아 교정장치</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">일반 진료</div>
                <a href="/treatments/cavity-endo-crown">충치·신경치료·크라운</a>
                <a href="/treatments/perio">치주치료</a>
                <a href="/treatments/pediatric">소아치과</a>
                <a href="/treatments/whitening">전문가 미백</a>
                <a href="/treatments/icon-resin">아이콘 레진 (백반)</a>
                <a href="/treatments/qray">Q-ray 정밀진단</a>
                <a href="/treatments/in-house-lab">원내 디지털 기공실</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">더 보기</div>
                <a href="/treatments/prosthetic">보철</a>
                <a href="/treatments/prevention">예방치과</a>
                <a href="/treatments/aesthetic">심미치료</a>
                <a href="/treatments/conservative">보존치료</a>
                <a href="/treatments">전체 진료</a>
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

          <div class="flex items-center gap-2 xl:gap-3 shrink-0">
            <a href="/login" class="hidden xl:inline-flex text-sm text-brown-700 hover:text-brown-900 font-medium">로그인</a>
            <a href="https://www.instagram.com/daegu365dc_?igsh=MThuemZncThqOTF3ZA==" target="_blank" rel="noopener" class="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full text-white transition hover:opacity-90" style="background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);" aria-label="대구365치과 인스타그램">
              <i class="fab fa-instagram text-base"></i>
            </a>
            <a href="http://pf.kakao.com/_PGaxmn" target="_blank" rel="noopener" class="hidden xl:inline-flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-full transition" style="background:#FEE500;color:#191919;" aria-label="카카오톡 상담">
              <i class="fas fa-comment text-xs"></i>
              <span>카카오톡</span>
            </a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="hidden xl:inline-flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-full transition" style="background:#03C75A;color:#fff;" aria-label="네이버 예약">
              <span class="text-[11px] font-black tracking-tighter" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 4px;">N</span>
              <span>네이버예약</span>
            </a>
            <a href="tel:053-357-0365" class="btn-primary text-sm" style="white-space:nowrap;">
              <i class="fas fa-phone text-xs"></i>
              <span style="white-space:nowrap;">053-357-0365</span>
            </a>
            <button id="menuBtn" class="lg:hidden w-10 h-10 flex items-center justify-center text-brown-800">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

    </nav>

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

    {/* PPT PC3 슬라이드 15 — 우측상단 고정버튼이 스크롤을 내릴수록 우측하단 펼침형으로 변환
        - 페이지 상단: 우측상단에 콤팩트 "상담예약" 단일 버튼 (Navbar 아래쪽)
        - 스크롤 400px 이상: 우측하단으로 이동 + 4개 버튼 펼침
        - 위치/크기/디자인 전환은 JS로 .scrolled 클래스 토글 */}
    <div id="floatingActions"
      class="floating-actions-top fixed z-40 flex flex-col gap-2 transition-all duration-500"
      style="top: 112px; right: 16px; bottom: auto;">
      <button type="button" id="openConsultModal"
        class="fa-cta-primary inline-flex items-center gap-2 h-11 px-5 rounded-full font-bold text-sm shadow-xl border-2 border-gold"
        style="background:linear-gradient(135deg, var(--gold), var(--brown-500));color:var(--brown-950);" aria-label="상담예약 모달 열기">
        <i class="fas fa-calendar-check"></i>
        <span>상담예약</span>
      </button>
      <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener"
        class="fa-cta-extra inline-flex items-center gap-2 px-4 h-11 rounded-full font-bold text-sm shadow-lg"
        style="background:#03C75A;color:#fff;display:none;" aria-label="네이버 예약">
        <span class="text-[11px] font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 5px;">N</span>
        <span>네이버예약</span>
      </a>
      <a href="http://pf.kakao.com/_PGaxmn" target="_blank" rel="noopener"
        class="fa-cta-extra inline-flex items-center gap-2 px-4 h-11 rounded-full font-bold text-sm shadow-lg"
        style="background:#FEE500;color:#191919;display:none;" aria-label="카카오톡 상담">
        <i class="fas fa-comment"></i>
        <span>톡상담</span>
      </a>
      <a href="tel:053-357-0365"
        class="fa-cta-extra inline-flex items-center gap-2 px-4 h-11 rounded-full font-bold text-sm shadow-lg"
        style="background:var(--brown-950);color:var(--gold);display:none;" aria-label="전화 상담">
        <i class="fas fa-phone"></i>
        <span>053-357-0365</span>
      </a>
    </div>

    {/* 스크롤 토글 스크립트 — PC3-S15: 상단(콤팩트 1개) → 하단(펼침 4개) */}
    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        var el = document.getElementById('floatingActions');
        if (!el) return;
        var extras = el.querySelectorAll('.fa-cta-extra');
        var threshold = 400;
        var ticking = false;
        function update(){
          var y = window.scrollY || window.pageYOffset;
          if (y > threshold) {
            // 스크롤 후 → 우측 하단 펼침
            el.style.top = 'auto';
            el.style.bottom = '16px';
            el.style.right = '16px';
            el.classList.add('floating-actions-scrolled');
            el.classList.remove('floating-actions-top');
            extras.forEach(function(e){ e.style.display = 'inline-flex'; });
          } else {
            // 상단 → 우측 상단 콤팩트 (헤더 아래)
            el.style.top = '112px';
            el.style.bottom = 'auto';
            el.style.right = '16px';
            el.classList.remove('floating-actions-scrolled');
            el.classList.add('floating-actions-top');
            extras.forEach(function(e){ e.style.display = 'none'; });
          }
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

    {/* PPT PC3 슬라이드 13-14 — 상담예약 3단계 모달 */}
    <div id="consultModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4" style="background:rgba(26,18,10,0.75);backdrop-filter:blur(8px);">
      <div class="bg-ivory rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative" role="dialog" aria-modal="true" aria-labelledby="consultModalTitle">
        <button type="button" id="closeConsultModal" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-brown-100 transition" aria-label="모달 닫기">
          <i class="fas fa-times text-lg text-brown-700"></i>
        </button>

        <div class="p-8 md:p-10">
          {/* 진행 단계 표시 */}
          <div class="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div class="flex items-center gap-2" data-step-indicator={n}>
                <div class={`step-circle w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${n === 1 ? 'bg-gold text-brown-950' : 'bg-brown-200 text-brown-500'}`}>
                  {n}
                </div>
                {n < 3 && <div class="w-8 h-px bg-brown-300"></div>}
              </div>
            ))}
          </div>

          <h3 id="consultModalTitle" class="display text-2xl md:text-3xl font-black tracking-tight text-brown-900 mb-2 text-center">
            <span class="step-title" data-step-title="1">어떤 진료가 궁금하세요?</span>
            <span class="step-title hidden" data-step-title="2">언제 방문 가능하세요?</span>
            <span class="step-title hidden" data-step-title="3">연락처를 알려주세요</span>
          </h3>
          <p class="text-sm text-brown-600 mb-6 text-center">3단계로 빠르게 상담 예약을 도와드립니다</p>

          {/* STEP 1 — 진료 선택 (SEO 핵심 키워드 우선 노출) */}
          <div class="step-panel" data-step-panel="1">
            <div class="grid grid-cols-2 gap-2">
              {['수면임플란트','인비절라인 치아교정','비니크 라미네이트','글로우네이트','소아치과','일반 진료'].map(t => (
                <label class="cursor-pointer">
                  <input type="radio" name="consult-treatment" value={t} class="peer sr-only" />
                  <div class="p-4 text-center rounded-xl border-2 border-brown-200 peer-checked:border-gold peer-checked:bg-gold/10 transition text-sm font-semibold">
                    {t}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* STEP 2 — 시간 선택 */}
          <div class="step-panel hidden" data-step-panel="2">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-brown-700 mb-2 tracking-wider">희망 요일</label>
                <div class="grid grid-cols-7 gap-1">
                  {['월','화','수','목','금','토','일'].map(d => (
                    <label class="cursor-pointer">
                      <input type="checkbox" name="consult-day" value={d} class="peer sr-only" />
                      <div class="py-3 text-center rounded-lg border border-brown-200 peer-checked:border-gold peer-checked:bg-gold peer-checked:text-brown-950 transition text-sm font-bold">
                        {d}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-brown-700 mb-2 tracking-wider">희망 시간대</label>
                <div class="grid grid-cols-3 gap-2">
                  {['오전 09:30~12:00','오후 14:00~18:30','야간 18:30~21:00'].map(t => (
                    <label class="cursor-pointer">
                      <input type="radio" name="consult-time" value={t} class="peer sr-only" />
                      <div class="p-3 text-center rounded-lg border border-brown-200 peer-checked:border-gold peer-checked:bg-gold/10 transition text-xs font-semibold">
                        {t}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 — 연락처 */}
          <div class="step-panel hidden" data-step-panel="3">
            <div class="space-y-3">
              <input type="text" name="consult-name" placeholder="성함" class="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-gold outline-none text-sm" />
              <input type="tel" name="consult-phone" placeholder="연락처 (010-0000-0000)" class="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-gold outline-none text-sm" />
              <textarea name="consult-memo" placeholder="추가 문의사항 (선택)" rows={3} class="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-gold outline-none text-sm resize-none"></textarea>
              <label class="flex items-start gap-2 text-xs text-brown-600">
                <input type="checkbox" name="consult-agree" class="mt-0.5" />
                <span>개인정보 수집·이용에 동의합니다 (예약 안내 목적, 1개월 보관)</span>
              </label>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div class="flex gap-2 mt-8">
            <button type="button" id="consultPrev" class="flex-1 px-5 py-3 rounded-full border border-brown-300 text-brown-700 font-bold hover:bg-brown-100 transition hidden">
              <i class="fas fa-arrow-left mr-1"></i> 이전
            </button>
            <button type="button" id="consultNext" class="flex-[2] px-5 py-3 rounded-full font-bold transition shadow-md" style="background:linear-gradient(135deg, var(--gold), var(--brown-500));color:var(--brown-950);">
              다음 단계 <i class="fas fa-arrow-right ml-1"></i>
            </button>
            <button type="button" id="consultSubmit" class="flex-[2] px-5 py-3 rounded-full font-bold transition shadow-md hidden" style="background:var(--brown-950);color:var(--gold);">
              <i class="fas fa-paper-plane mr-1"></i> 예약 요청 보내기
            </button>
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
