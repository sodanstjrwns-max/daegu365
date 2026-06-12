import { Navbar, Footer } from '../components/Layout'

/* ============================================================
   대구365치과 HOME — EDITORIAL SUPREME v3.0
   Awwwards Site of the Day tier
   ============================================================ */

export const HomePage = () => (
  <>
    <Navbar />

    {/* ================================================== */}
    {/* 0. 진료안내 컴팩트 띠 — 삭제됨 (사용자 요청, 메가드롭다운으로 대체) */}
    {/* ================================================== */}

    {/* ================================================== */}
    {/* 1. CINEMATIC HERO                                   */}
    {/* ================================================== */}
    <section class="cinematic-hero">
      <img
        src="/r2/images/hero/lobby-curve.jpg"
        alt="대구365치과 메인 로비 — 곡선 천장 라인과 365 로고 사인"
        class="cinematic-hero-bg loaded"
        aria-hidden="true"
        fetchpriority="high"
      />

      {/* Side meta */}
      <div class="side-meta hidden lg:block">DAEGU 365 DENTAL · EST. 2025 · KOREA</div>
      <div class="side-meta side-meta-right hidden lg:block">NORTH DISTRICT · CHIMSAN-RO 148</div>

      <div class="cinematic-hero-content max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24 min-h-screen flex flex-col justify-between">
        {/* TOP GROUP — 평생보증/LIVE → 4-카드 → SINCE 2025 라벨을 균일 mt-6 간격으로 묶음 */}
        <div>
          {/* Top bar — 평생 보증 리본만 (상담예약/전화 버튼은 네비바의 편리한 상담예약으로 통합 제거) */}
          <div class="flex flex-wrap items-center gap-6 fade-in">
            <div class="ribbon">
              <i class="fas fa-shield-heart"></i>
              <span>평생 보증 임플란트</span>
            </div>
          </div>

          {/* PPT PC3 슬라이드 2 — 상단 정보 박스 (7인 협진 / 365일 / 평일 야간 21시 / 대구침산동) */}
          <div class="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6 fade-in">
            {[
              { icon: 'fa-user-doctor', label: '전문의 7인 협진', sub: 'SPECIALIZED TEAM' },
              { icon: 'fa-calendar-days', label: '365일 연중무휴', sub: 'ALWAYS OPEN' },
              { icon: 'fa-moon', label: '평일 야간 21시까지', sub: 'LATE NIGHT' },
              { icon: 'fa-location-dot', label: '대구 북구 침산동', sub: 'CHIMSAN-DONG' },
            ].map((b: any) => (
              <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brown-950/40 border border-ivory/10 backdrop-blur-sm hover:border-gold/40 transition">
                <div class="w-9 h-9 flex items-center justify-center rounded-full bg-gold/15 text-gold">
                  <i class={`fas ${b.icon}`}></i>
                </div>
                <div class="flex flex-col leading-tight">
                  <span class="text-[9px] tracking-[0.2em] text-gold font-bold uppercase">{b.sub}</span>
                  <span class="text-sm font-semibold text-ivory" style="white-space:nowrap;">{b.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SINCE 2025 라벨 — 위 카드와 동일 mt-6 간격 */}
          <div class="mt-6 fade-in">
            <div class="section-label inline-block" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.4);">
              SINCE 2025 · 대구 북구
            </div>
          </div>
        </div>

        {/* Headline block — SINCE 2025 라벨과 충분한 간격 (mt-16 lg:mt-24) */}
        <div class="max-w-5xl hero-headline-block mt-16 lg:mt-24">

          {/* PPT PC3 슬라이드 3 — 글씨 크기 축소 (8.4rem → 6.4rem), '괜찮습' 하단 잘림 방지 padding 강화 */}
          <h1 class="reveal-lines hero-h1 text-ivory font-black leading-[0.92] tracking-[-0.045em]" style="font-size:clamp(2rem, 6.4vw, 6.4rem); padding-bottom:0.22em;">
            <span class="block overflow-hidden">
              <span class="reveal-word"><span style="--d:0s">치과가</span></span>{' '}
              <span class="reveal-word"><span style="--d:.05s">두려워도</span></span>
            </span>
            <span class="block overflow-hidden mt-3 hero-h1-line2" style="padding-bottom:0.28em; line-height:1.12;">
              <span class="reveal-word"><span style="--d:.14s" class="t-gold">괜찮습니다</span></span>
            </span>
          </h1>

          <div class="mt-10 grid md:grid-cols-2 gap-8 items-end max-w-4xl">
            <p class="t-lead text-ivory/85 fade-in hero-lead" style="color:rgba(253,251,247,0.85);">
              {/* PPT 모바일 슬라이드 1·6 / PC1 슬라이드 3 — 슬래시 단위 줄바꿈 + 마침표 제거, 한 줄 유지 */}
              <span class="hero-lead-line-1" style="font-size:clamp(1.15rem, 1.95vw, 1.55rem); white-space:nowrap;">치과공포증을 가졌던 의사가 만드는<br/><strong class="text-gold font-semibold">두려움 없는 치과</strong></span>
              <span class="block hero-lead-line-2 mt-2.5" style="font-size:clamp(1rem, 1.6vw, 1.32rem); white-space:nowrap;">수면임플란트 · 인비절라인 · VINIQUE 라미네이트 전문</span>
            </p>

            <div class="flex flex-wrap gap-3 fade-in">
              <a href="/mission" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <span class="font-semibold">우리의 이야기</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="tel:053-357-0365" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <i class="fas fa-phone"></i>
                <span style="white-space:nowrap;">053-357-0365</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip — PPT 모바일 슬라이드 2: 7명'의' 조사 추가 + 줄변경 / 임플란트 평생 보증 어순 변경 */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 pt-14 border-t border-ivory/10 fade-in">
          {[
            { num: '365', unit: '일', label: '연중무휴', stack: true },
            { num: '7', unit: '명의', label: '전문 의료진', stack: true },
            { num: '21:00', unit: '', label: '월·목 야간진료' },
            { num: '∞', unit: '', label: '평생 보증 임플란트' },
          ].map((s: any) => (
            <div class="hero-stat">
              <div class="display hero-stat-num font-black text-ivory tracking-tight leading-none mb-2">
                {s.num}{s.unit && <span class={`hero-stat-unit text-ivory ${s.stack ? 'hero-stat-unit-stack' : 'ml-1'}`}>{s.unit}</span>}
              </div>
              <div class="text-xs tracking-[0.25em] text-ivory/60 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div class="scroll-indicator hidden lg:flex" style="color:var(--gold);">
          <span>SCROLL</span>
          <div class="scroll-indicator-line" style="background:linear-gradient(to bottom, transparent, var(--gold), transparent);"></div>
        </div>
      </div>
    </section>

    {/* PPT PC4 슬라이드 3 — 옆으로 흐르는 GIANT MARQUEE 삭제 */}

    {/* ================================================== */}
    {/* 3. MANIFESTO + EDITORIAL GRID                       */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="sticky-head-layout">
          <div class="sticky-head">
            <div class="section-label mb-8 fade-in">MANIFESTO · 01</div>
            <h2 class="t-display mb-8 fade-in">
              <span class="t-gold">공감</span>으로<br/>시작해서<br/>
              <span class="text-brown-900">신뢰</span>로<br/>완성합니다
            </h2>
            <p class="t-lead mb-8 max-w-md fade-in">
              어린 시절 치과 진료실 문 앞에서 돌아섰던 기억.<br/>
              그 두려움을 아직도 또렷이 기억하기에,<br/>
              대구365치과는 다르게 설계되었습니다.
            </p>
            <a href="/mission" class="btn-ghost fade-in">
              <span>우리의 이야기 전체 보기</span>
              <i class="fas fa-arrow-right text-sm"></i>
            </a>
          </div>

          {/* Editorial grid */}
          <div class="editorial-grid fade-in">
            <div class="eg-1 img-frame img-reveal rounded-[20px] overflow-hidden">
              <img src="/r2/images/doctors/kim-seongju.jpg" alt="김성주 대표원장" loading="lazy" class="w-full h-full object-cover object-[center_15%]" />
            </div>
            <div class="eg-2 img-frame img-reveal rounded-[20px]">
              <img src="/static/images/macro-veneer.jpg" alt="세라믹 베니어 매크로" loading="lazy" />
            </div>
            <div class="eg-3 bg-brown-950 text-ivory rounded-[20px] p-8 flex flex-col justify-center">
              <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">SINCE 2025</div>
              <div class="display text-3xl font-black leading-tight tracking-tight">
                "필요한 만큼,<br/>정직하게"
              </div>
              <div class="text-xs text-brown-300 mt-4 font-medium">— 대구365치과 원칙</div>
            </div>
            {/* PPT PC4 슬라이드 4 — 하단 사진(eg-4) 삭제 후 좌측 글·우측 사진 수평 정렬 */}
            <div class="eg-5 img-frame img-reveal rounded-[20px]">
              <img src="/r2/images/clinic/care-luxury-room.jpg?v=1" alt="대구365치과 럭셔리 진료실 — 호텔 라운지 무드의 단독 진료 공간" loading="lazy" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 4. HORIZONTAL SCROLL — SIGNATURE TREATMENTS         */}
    {/* ================================================== */}
    <section class="bg-cream pt-28 lg:pt-40 pb-20 lg:pb-28 relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 mb-14">
        <div class="flex flex-wrap justify-between items-end gap-6 fade-in">
          <div class="max-w-2xl">
            <div class="section-label mb-6">SIGNATURE · 02</div>
            <h2 class="t-display signature-title" style="font-family: 'Pretendard', 'Noto Sans KR', sans-serif; letter-spacing:-0.02em; font-weight:800; line-height:1.05;">
              <span class="signature-keyword">시그니처</span><br/>
              <span class="t-gold">진료 3선</span>
            </h2>
          </div>
          {/* PPT 모바일 슬라이드 4 — 옆으로 넘겨보세요 안내(중복 제거) */}
          {/* PPT PC4 슬라이드 5 — 데스크탑은 3카드 한눈에, 모바일만 스와이프 안내 */}
          <div class="flex lg:hidden items-center gap-3 text-brown-600 text-sm">
            <span class="font-semibold tracking-wider inline-flex items-center gap-2">
              <i class="fas fa-hand-pointer"></i>
              옆으로 넘겨보세요 →
            </span>
            <div class="flex gap-1">
              <span class="w-8 h-px bg-brown-400"></span>
              <span class="w-4 h-px bg-brown-300"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container — native scroll + drag + wheel */}
      <div class="h-scroll-section" data-hscroll>
        <div class="h-scroll-track">
          {/* Intro card */}
          <div class="h-scroll-intro">
            <div class="ribbon mb-8">
              <i class="fas fa-star"></i>
              <span>FLAGSHIP SERVICES</span>
            </div>
            <p class="t-headline text-brown-900 mb-6">
              분야별 전문의가<br/>함께 설계하는<br/>
              <span class="t-gold">3가지 핵심 진료</span>
            </p>
            {/* PPT 모바일 슬라이드 4 — 슬래시 줄바꿈 + 마침표 제거 */}
            <p class="t-lead mb-8 flagship-lead">
              <span class="block" style="font-size:clamp(0.82rem, 1.25vw, 1.05rem);">
                수면 진정 <span class="text-brown-400">/</span><br class="md:hidden"/>
                4단계 무통마취 <span class="text-brown-400">/</span><br class="md:hidden"/>
                원내 디지털 기공실로
              </span>
              <span class="block mt-2" style="font-size:clamp(0.88rem, 1.35vw, 1.1rem);">
                공포 없이 <span class="text-brown-400">/</span>
                정확하게 <span class="text-brown-400">/</span>
                빠르게
              </span>
            </p>
            <a href="/treatments" class="btn-primary btn-shine magnetic">
              <span>전체 진료 보기</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          {[
            {
              slug: 'implant',
              name: '수면임플란트',
              tagline: '공포 없는 임플란트',
              num: '01',
              // 티타늄 임플란트 픽스처 매크로 컷 (R2, 4K, 골드톤)
              img: '/r2/images/treatments/implant-fixture.jpg',
              points: ['수면 진정 + 무통마취', '메가젠 BD · 오스템 BA', '평생 임플란트 보증'],
            },
            {
              slug: 'ortho',
              name: '인비절라인',
              tagline: '투명하게, 자유롭게 (교정)',
              num: '02',
              // 투명 인비절라인 얼라이너 매크로 컷 (R2, 4K)
              img: '/r2/images/treatments/invisalign-aligner.jpg',
              points: ['인비절라인 공인 의료진', '3D 시뮬레이션', '티 나지 않는 교정'],
            },
            {
              slug: 'lamineer',
              name: 'VINIQUE',
              tagline: '프리미엄 라미네이트',
              num: '03',
              // 매크로 베니어 컷 — 라미네이트 결과 자체를 보여주는 이미지로 스왑
              img: '/static/images/macro-veneer.jpg',
              points: ['얼굴형·스마일 라인 설계', '최소 삭제 · 자연광택', '원내 디지털 기공실'],
            },
          ].map((t: any) => (
            <a href={`/treatments/${t.slug}`} class="h-scroll-card group block">
              <img src={t.img} alt={t.name} loading="lazy" />
              <div class="h-scroll-number">{t.num}</div>
              <div class="h-scroll-card-content">
                <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">TREATMENT · {t.num}</div>
                <h3 class="display text-4xl font-black mb-2 tracking-tight">{t.name}</h3>
                <p class="text-ivory/80 mb-5 font-medium">{t.tagline}</p>
                <ul class="space-y-1.5 mb-6 text-sm text-ivory/80">
                  {t.points.map((p: string) => (
                    <li class="flex gap-2">
                      <i class="fas fa-check text-gold text-xs mt-1.5"></i>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div class="flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-4 transition-all">
                  <span>자세히 보기</span>
                  <i class="fas fa-arrow-right text-xs"></i>
                </div>
              </div>
            </a>
          ))}

          {/* End spacer — snap anchor for last card */}
          <div class="flex-shrink-0" style="width:6vw;"></div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 5. MEGA STATS                                       */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="mb-20 fade-in max-w-3xl">
          <div class="section-label mb-6">BY THE NUMBERS · 03</div>
          <h2 class="t-display">
            숫자로 말하는<br/>
            <span class="t-gold">대구365치과</span>
          </h2>
        </div>

        <div>
          {[
            {
              /* PPT 모바일 슬라이드 1·5 — 마침표/쉼표 제거 */
              num: 365,
              suffix: '일',
              label: 'ALWAYS OPEN',
              lines: [
                '월·목요일은 21시까지 야간진료',
                '주말과 공휴일에도 쉬지 않습니다',
                '갑작스런 치통·사고에도',
                '언제든 진료받으실 수 있도록',
                '연중무휴 운영합니다',
              ],
            },
            {
              num: 7,
              suffix: '명',
              label: 'SPECIALIZED TEAM',
              lines: [
                '대표원장 1명 + 진료원장 6명',
                '보존·치주·소아·교정·보철·심미',
                '각 분야 전문의가',
                '하나의 케이스를 함께 설계합니다',
              ],
            },
            {
              /* PPT 모바일 슬라이드 5 — 순서 변경: 직장인/학생 → 월·목 21시 순으로 / 마침표·쉼표 제거 */
              num: 21,
              suffix: ':00 PM',
              label: 'LATE NIGHT HOURS',
              lines: [
                '직장인도 학생도',
                '일상을 포기하지 않도록',
                '월·목요일은 21시까지 진료합니다',
              ],
            },
            {
              /* PPT 모바일 슬라이드 1·5 — 마침표 제거 */
              num: 4,
              suffix: '단계',
              label: 'PAINLESS PROTOCOL',
              lines: [
                '가글 → 도포 마취제',
                '→ 무통마취기 → 본마취',
                '주사의 공포를 제거한',
                '대구365치과만의',
                '4단계 프로토콜',
              ],
            },
          ].map((s: any) => (
            <div class="mega-stat fade-in">
              <div class="mega-stat-row">
                <div>
                  <div class="mega-stat-label">{s.label}</div>
                  <div class="mega-stat-num count-up" data-count={s.num}>
                    0<span class="mega-stat-suffix">{s.suffix}</span>
                  </div>
                </div>
                <div class="mega-stat-desc">
                  {s.lines.map((line: string) => (
                    <span class="block">{line}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 5.5 메인 진료안내 섹션 — PPT PC3 슬라이드 4 신설        */}
    {/* ================================================== */}
    <section class="py-28 lg:py-36 bg-ivory">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap justify-between items-end mb-12 gap-6 fade-in">
          <div class="max-w-xl">
            <div class="section-label mb-6">TREATMENTS · 04</div>
            <h2 class="t-display" style="letter-spacing:-0.02em; line-height:1.05;">
              전체 <span class="t-gold">진료안내</span>
            </h2>
          </div>
          <p class="t-lead max-w-md text-brown-700">
            13개 진료 영역, 7인의 전문의가 함께 설계하는 정밀 협진
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 fade-in-stagger">
          {[
            { slug: 'implant',              name: '수면임플란트',   icon: 'fa-tooth',        tag: '핵심' },
            { slug: 'ortho',                name: '인비절라인',     icon: 'fa-grin',         tag: '핵심' },
            { slug: 'lamineer',             name: '비니크 라미네이트', icon: 'fa-star',         tag: '핵심' },
            { slug: 'sleep-therapy',        name: '수면치료',       icon: 'fa-bed' },
            { slug: 'painless-anesthesia',  name: '4단계 무통마취', icon: 'fa-syringe' },
            { slug: 'airflow-gbt',          name: '에어플로우 GBT', icon: 'fa-wind' },
            { slug: 'pediatric-ortho',      name: '소아 교정장치',  icon: 'fa-child' },
            { slug: 'cavity-endo-crown',    name: '충치·신경치료',  icon: 'fa-tooth' },
            { slug: 'perio',                name: '치주치료',       icon: 'fa-heart-pulse' },
            { slug: 'pediatric',            name: '소아치과',       icon: 'fa-baby' },
            { slug: 'whitening',            name: '전문가 미백',    icon: 'fa-magic-wand-sparkles' },
            { slug: 'qray',                 name: 'Q-ray 정밀진단', icon: 'fa-microscope' },
            { slug: 'in-house-lab',         name: '디지털 기공실',  icon: 'fa-gears' },
            { slug: 'prosthetic',           name: '보철',           icon: 'fa-crown' },
            { slug: 'icon-resin',           name: '아이콘 레진',    icon: 'fa-droplet' },
            { slug: 'prevention',           name: '예방치과',       icon: 'fa-shield' },
          ].map((t: any) => (
            <a href={`/treatments/${t.slug}`} class="group relative block p-5 md:p-6 rounded-2xl border border-brown-200 bg-ivory hover:border-gold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {t.tag && (
                <span class="absolute top-3 right-3 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold text-brown-950">
                  {t.tag}
                </span>
              )}
              <div class="w-11 h-11 rounded-xl bg-brown-950/5 group-hover:bg-gold/15 flex items-center justify-center mb-3 transition">
                <i class={`fas ${t.icon} text-brown-700 group-hover:text-gold text-lg transition`}></i>
              </div>
              <div class="display text-sm md:text-base font-black tracking-tight text-brown-900 leading-tight">
                {t.name}
              </div>
              <div class="text-[10px] text-brown-400 mt-2 flex items-center gap-1 group-hover:text-gold transition">
                <span>자세히</span>
                <i class="fas fa-arrow-right text-[9px]"></i>
              </div>
            </a>
          ))}
        </div>

        <div class="text-center mt-10 fade-in">
          <a href="/treatments" class="btn-outline magnetic">
            <span>전체 진료 목록 보기</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 6. DOCTOR SPOTLIGHT                                 */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap justify-between items-end mb-16 gap-6 fade-in">
          <div class="max-w-xl">
            <div class="section-label mb-6">MEDICAL TEAM · 05</div>
            <h2 class="t-display medical-team-title" style="letter-spacing:-0.02em; line-height:1.05;">
              <span class="medical-team-keyword">7인의</span><br/>
              <span class="t-gold">전문 의료진</span>
            </h2>
          </div>
          <p class="t-lead max-w-md">
            보존·치주·소아·교정·<br class="md:hidden"/>보철·심미.<br class="hidden md:inline"/>
            각 분야 전문의가<br class="md:hidden"/> 하나의 케이스를<br class="md:hidden"/> 함께 설계합니다.
          </p>
        </div>

        {/* Team group image */}
        <div class="img-frame img-reveal aspect-[16/9] rounded-[32px] mb-8 fade-in shadow-xl">
          <img src="/r2/images/doctors/team-horizontal-smile.jpg" alt="대구365치과 의료진 7인" loading="lazy" />
        </div>

        {/* 대표원장 스포트라이트 */}
        <a href="/doctors/kim-seongju" class="block spotlight-card shadow-xl fade-in group mb-8">
          <img src="/r2/images/doctors/kim-seongju.jpg" alt="김성주 대표원장" class="spotlight-card-img" loading="lazy" style="object-position: center 20%;" />
          <div class="relative h-full p-10 lg:p-16 flex flex-col justify-end min-h-[580px]">
            <div class="section-label mb-6" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.3);">
              FOUNDER · DIRECTOR
            </div>
            <h3 class="display founder-name-line font-black mb-4 tracking-tight leading-none" style="text-shadow: 0 2px 20px rgba(0,0,0,0.7); white-space:nowrap;">
              <span class="founder-name">김성주</span><span class="founder-title">대표원장</span>
            </h3>
            <p class="text-xl lg:text-2xl text-brown-200 leading-relaxed max-w-3xl mb-8 font-medium">
              "환자의 두려움에 공감하고,<br class="md:hidden"/> 꼭 필요한 정직한 치료만 권합니다.<br/>
              한 번에 끝내려 하지 않고,<br class="md:hidden"/> 평생 함께 갈 수 있는 치아를 만듭니다."
            </p>
            {/* PPT 모바일 슬라이드 6 — 김성주 카드 하단 노란 tag 영역 모바일에서 숨김 (PC에서만 노출) */}
            <div class="hidden md:flex flex-wrap gap-3 mb-8 founder-tags">
              <span class="tag tag-gold">경북대치과대학 외래교수</span>
              <span class="tag tag-gold">통합치의학과 전문의</span>
              <span class="tag tag-gold">수면임플란트</span>
              <span class="tag tag-gold">보철·보존 진료</span>
            </div>
            <div class="flex items-center gap-3 text-gold font-semibold group-hover:gap-5 transition-all">
              <span>프로필 자세히 보기</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </a>

        {/* PPT PC3 슬라이드 8 — "어떤 원장님께 진료받고 싶으신가요?" 진료과별 가이드 */}
        <div class="mb-10 fade-in">
          <div class="text-center mb-6">
            <h3 class="display text-2xl md:text-3xl font-black tracking-tight text-brown-900">
              어떤 원장님께 <span class="t-gold">진료받고 싶으신가요?</span>
            </h3>
            <p class="text-sm text-brown-600 mt-2">진료과별로 전문의를 한눈에 확인하세요</p>
          </div>
          <div class="flex flex-wrap justify-center gap-2">
            {[
              { dep: '보존과',   doctors: '정재헌·최혜정·김상원' },
              { dep: '교정과',   doctors: '김진덕' },
              { dep: '소아치과', doctors: '한지은' },
              { dep: '치주과',   doctors: '이서영' },
              { dep: '통합치의학과', doctors: '김성주 대표원장' },
            ].map((d: any) => (
              <a href="/doctors" class="inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-brown-300 bg-ivory hover:border-gold hover:shadow-md transition">
                <span class="text-[10px] tracking-[0.25em] text-gold font-bold">{d.dep}</span>
                <span class="text-sm font-semibold text-brown-900">{d.doctors}</span>
              </a>
            ))}
          </div>
        </div>

        <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4 fade-in-stagger">
          {[
            { slug: 'jung-jaeheon',  name: '정재헌', pos: '보존과 전문의',   spec: '보존·심미 치료',     img: '/r2/images/doctors/jung-jaeheon.jpg' },
            { slug: 'choi-hyejung',  name: '최혜정', pos: '보존과 전문의',   spec: '보존·정직 치료',     img: '/r2/images/doctors/kim-jinduk.jpg' },
            { slug: 'han-jieun',     name: '한지은', pos: '소아치과 전문의', spec: '소아·따뜻한 기억',   img: '/r2/images/doctors/han-jieun.jpg' },
            { slug: 'kim-jinduk',    name: '김진덕', pos: '교정과 전문의',   spec: '교정·자신감 미소',   img: '/r2/images/doctors/choi-hyejung.jpg' },
            { slug: 'kim-sangwon',   name: '김상원', pos: '보존과 전문의',   spec: '자연치아 보존',     img: '/r2/images/doctors/kim-sangwon.jpg' },
            { slug: 'lee-seoyoung',  name: '이서영', pos: '치주과 전문의',   spec: '치주·세심한 케어',   img: '/r2/images/doctors/lee-seoyoung.jpg' },
          ].map((d: any) => (
            <a href={`/doctors/${d.slug}`} class="group block">
              <div class="img-frame aspect-[3/4] rounded-2xl mb-4 overflow-hidden">
                <img src={d.img} alt={`${d.name} ${d.pos}`} loading="lazy" class="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-1 font-bold">{d.pos.toUpperCase()}</div>
              <div class="display text-lg font-black tracking-tight mb-1">{d.name} 원장</div>
              <div class="text-xs text-brown-500">{d.spec}</div>
              {/* PPT PC3 슬라이드 10·12 — 원장 프로필 카드에 예약 버튼 추가 */}
              <div class="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-gold opacity-0 group-hover:opacity-100 transition">
                <i class="fas fa-calendar-check"></i>
                <span>이 원장님께 예약하기</span>
              </div>
            </a>
          ))}
        </div>

        <div class="mt-12 text-center fade-in">
          <a href="/doctors" class="btn-outline magnetic">
            <span>전체 의료진 프로필 보기</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 7. DIFFERENTIATORS — TIMELINE STYLE                 */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:10%;right:-150px;opacity:0.15;"></div>
      <div class="blob" style="width:400px;height:400px;background:#8a6235;bottom:10%;left:-100px;opacity:0.2;"></div>

      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div class="sticky-head-layout">
          <div class="sticky-head">
            <div class="section-label mb-6" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.4);">
              WHY DAEGU365 · 05
            </div>
            <h2 class="t-display mb-8" style="color:var(--ivory);">
              다른 치과와<br/>
              <span class="t-gold">무엇이 다른가</span>
            </h2>
            <p class="t-lead mb-10" style="color:rgba(253,251,247,0.75);">
              단순한 진료가 아닙니다.<br/>
              환자 한 분의 두려움부터 평생 관리까지,<br/>
              전 과정을 시스템으로 설계했습니다.
            </p>
            <div class="badge-row justify-start opacity-100">
              <div class="badge-item" style="border-color:rgba(201,168,118,0.3); color:var(--gold);">
                <i class="fas fa-certificate"></i>
                <span>인비절라인 공인</span>
              </div>
              <div class="badge-item" style="border-color:rgba(201,168,118,0.3); color:var(--gold);">
                <i class="fas fa-shield-heart"></i>
                <span>평생 보증</span>
              </div>
            </div>
          </div>

          <div class="timeline fade-in">
            {[
              {
                step: '01 · COLLABORATION',
                title: '분야별 전문의 협진',
                desc: '보존·치주·소아·교정 각 분야 전문가가 한 명의 환자 케이스를 함께 설계합니다. 한 의사의 판단이 아닌, 팀의 판단으로 최선의 치료를 제공합니다.'
              },
              {
                step: '02 · ANESTHESIA',
                title: '4단계 무통마취 시스템',
                desc: '가글 마취 → 도포 마취 → 무통마취기 → 본마취. 앰플 워머로 체온과 같은 온도 유지, 극세 주사 바늘 사용. 주사의 공포를 완전히 제거했습니다.'
              },
              {
                step: '03 · GUARANTEE',
                title: '평생 임플란트 보증',
                desc: '환자 부주의에 의한 파손을 제외한 모든 부작용·파절·소실에 대해 평생 무상 재치료·보수를 보장합니다. 단 한 번의 시술로 평생의 안심.'
              },
              {
                step: '04 · TECHNOLOGY',
                title: '원내 디지털 기공실',
                desc: '외부 기공소에 보내지 않고 원내에서 직접 제작합니다. 당일 완성, 실시간 조정, 철저한 품질 관리. 프로세스 기간과 오차를 획기적으로 줄였습니다.'
              },
              {
                step: '05 · TIME',
                title: '365일 · 야간 진료',
                desc: '월·목요일은 21시까지 야간진료, 주말·공휴일에도 쉬지 않습니다. 일상을 포기하지 않고 치료받으실 수 있도록 시간을 맞춰드립니다.'
              },
            ].map((f: any) => (
              <div class="timeline-item">
                <div class="timeline-step" style="color:var(--gold);">{f.step}</div>
                <div class="timeline-title" style="color:var(--ivory);">{f.title}</div>
                <div class="timeline-desc" style="color:rgba(253,251,247,0.7);">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 8. TESTIMONIALS                                     */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-20 fade-in">
          <div class="section-label mb-6">VOICES · 06</div>
          <h2 class="t-display mb-6">
            환자들의 <span class="t-gold">진짜 이야기</span>
          </h2>
          <p class="t-lead max-w-2xl mx-auto">
            두려움을 가지고 오셨다가, 편안함을 가지고 돌아가신 분들의 기록.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-stagger">
          {[
            {
              quote: '진료 중에 제가 불편해하는 걸 바로 알아차리시고 중간중간 괜찮냐고 물어봐주세요. 20년 넘게 치과를 피했는데, 여기선 끝까지 버틸 수 있었어요.',
              author: '김**님',
              meta: '수면임플란트 · 40대 여성',
              initial: 'K',
              stars: 5,
            },
            {
              quote: '다른 치과에서 6개를 빼야 한다고 했는데, 대구365에서는 2개만 치료하면 된다고 하시더라고요. "꼭 필요한 치료만"이라는 말이 진짜였습니다.',
              author: '박**님',
              meta: '보존치료 · 50대 남성',
              initial: 'P',
              stars: 5,
            },
            {
              quote: 'VINIQUE로 라미네이트 했는데, 자연스러워서 친구들도 못 알아봐요. 근데 사진 찍을 때 확실히 달라진 게 보이는 거예요. 최고의 선택.',
              author: '이**님',
              meta: 'VINIQUE 라미네이트 · 30대 여성',
              initial: 'L',
              stars: 5,
            },
          ].map((t: any) => (
            <div class="testimonial-card">
              <div class="testimonial-stars">
                {'★'.repeat(t.stars)}
              </div>
              <p class="testimonial-quote">"{t.quote}"</p>
              <div class="testimonial-author">
                <div class="testimonial-monogram" aria-hidden="true">
                  {t.initial}
                </div>
                <div>
                  <div class="font-bold text-brown-900 tracking-tight">{t.author}</div>
                  <div class="text-xs text-brown-500 font-medium mt-0.5">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="mt-8 text-center text-[11px] text-brown-500/70 tracking-wide max-w-2xl mx-auto fade-in">
          ※ 위 후기는 환자 동의를 받은 실제 진료 경험을 정리한 것이며, 개인정보 보호를 위해 식별 가능한 사진은 게시하지 않습니다.
        </div>

        <div class="mt-16 text-center fade-in">
          <a href="/before-after" class="btn-ghost">
            <span>치료 사례 전체 보기</span>
            <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 9. FACILITY — EDITORIAL GALLERY                     */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-20 fade-in">
          <div class="lg:col-span-7">
            <div class="section-label mb-6">FACILITY · 07</div>
            <h2 class="t-display mb-8">
              <span class="text-brown-900">프리미엄</span><br/>
              <span class="t-gold">치과 공간</span>
            </h2>
            <p class="t-lead">
              대구광역시 북구 침산로 <strong class="text-brown-900 font-bold">엠브로스퀘어 7층</strong>.<br/>
              도착부터 진료, 평생관리까지 — 공간의 모든 디테일을 설계했습니다.
            </p>
          </div>
          <div class="lg:col-span-5">
            <div class="grid grid-cols-2 gap-y-5 gap-x-4">
              {[
                { icon: 'fa-car', label: '무료 주차' },
                { icon: 'fa-wifi', label: '무료 Wi-Fi' },
                { icon: 'fa-calendar-days', label: '365일 연중무휴' },
                { icon: 'fa-calendar-check', label: '주말·야간' },
              ].map((i: any) => (
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-brown-100 flex items-center justify-center text-brown-900 border border-brown-200">
                    <i class={`fas ${i.icon} text-sm`}></i>
                  </div>
                  <span class="font-bold text-brown-900 tracking-tight text-sm">{i.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHAPTER 01 — ARRIVAL */}
        <div class="mb-6 fade-in">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-gold text-xs tracking-[0.3em] font-bold">CHAPTER 01</span>
            <span class="text-brown-400 text-xs tracking-widest">ARRIVAL</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-black text-brown-900 tracking-tight">도착, 그리고 첫인상</h3>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-20 fade-in-stagger">
          <div class="col-span-12 lg:col-span-7 img-frame img-reveal aspect-[16/10] rounded-[24px]">
            <img src="/r2/images/clinic/arrival-lobby-wide.jpg" alt="대구365치과 와이드 로비 라운지" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-5 img-frame img-reveal aspect-[4/5] lg:aspect-auto rounded-[24px]">
            <img src="/r2/images/clinic/arrival-entrance.jpg" alt="대구365치과 입구 365 로고 사인" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-5 img-frame img-reveal aspect-[4/3] rounded-[20px]">
            <img src="/r2/images/clinic/arrival-lounge.jpg" alt="대기 라운지 디스플레이 월" loading="lazy" />
          </div>
          <div class="hidden lg:flex col-span-7 items-center px-8">
            <p class="text-brown-700 text-base leading-relaxed">
              <span class="t-eyebrow text-gold mb-2 block">RECEPTION</span>
              곡선의 리셉션 데스크와 천장 라이팅이 호텔 라운지의 정적인 분위기를 만듭니다. 도착 즉시 차분해지는 공간 설계.
            </p>
          </div>
        </div>

        {/* CHAPTER 02 — CARE */}
        <div class="mb-6 fade-in">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-gold text-xs tracking-[0.3em] font-bold">CHAPTER 02</span>
            <span class="text-brown-400 text-xs tracking-widest">CARE</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-black text-brown-900 tracking-tight">한 사람을 위한 진료실</h3>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-20 fade-in-stagger">
          <div class="col-span-12 lg:col-span-8 img-frame img-reveal aspect-[16/10] rounded-[24px]">
            <img src="/r2/images/clinic/care-treatment-rooms.jpg" alt="진료실 다중뷰" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-4 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/care-digital-room.jpg" alt="디지털 진료실" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-4 img-frame img-reveal aspect-[4/3] rounded-[20px]">
            <img src="/r2/images/clinic/care-luxury-room.jpg" alt="블랙 천장 럭셔리 진료실" loading="lazy" />
          </div>
          <div class="hidden lg:flex col-span-8 items-center px-8">
            <p class="text-brown-700 text-base leading-relaxed">
              <span class="t-eyebrow text-gold mb-2 block">PRIVATE TREATMENT</span>
              모든 진료실은 독립된 공간으로 분리되어 있습니다. 옆 환자의 시선이나 소음 없이, 오직 한 사람을 위한 진료에 집중합니다.
            </p>
          </div>
        </div>

        {/* CHAPTER 03 — PRECISION */}
        <div class="mb-6 fade-in">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-gold text-xs tracking-[0.3em] font-bold">CHAPTER 03</span>
            <span class="text-brown-400 text-xs tracking-widest">PRECISION</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-black text-brown-900 tracking-tight">정밀, 디지털, 그리고 수술센터</h3>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-20 fade-in-stagger">
          <div class="col-span-12 lg:col-span-6 img-frame img-reveal aspect-[3/2] rounded-[24px]">
            <img src="/r2/images/clinic/precision-dlab.jpg" alt="D.LAB STUDIO 365 디지털 기공실" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-3 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/precision-implant-center.jpg" alt="365 임플란트 수술센터" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-3 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/precision-arch-corridor.jpg" alt="아치형 정밀 동선 복도" loading="lazy" />
          </div>
        </div>

        {/* CHAPTER 04 — LIFETIME */}
        <div class="mb-6 fade-in">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-gold text-xs tracking-[0.3em] font-bold">CHAPTER 04</span>
            <span class="text-brown-400 text-xs tracking-widest">LIFETIME</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-black text-brown-900 tracking-tight">평생, 함께하는 동선</h3>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-20 fade-in-stagger">
          <div class="col-span-6 lg:col-span-4 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/lifetime-care-center.jpg" alt="평생치아관리센터 입구" loading="lazy" />
          </div>
          <div class="col-span-6 lg:col-span-4 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/lifetime-airflow-zone.jpg" alt="AIRFLOW ZONE 예방 진료실" loading="lazy" />
          </div>
          <div class="col-span-12 lg:col-span-4 img-frame img-reveal aspect-[3/4] rounded-[20px]">
            <img src="/r2/images/clinic/lifetime-vip-rooms.jpg" alt="VIP 룸 입구" loading="lazy" />
          </div>
        </div>

        {/* CHAPTER 05 — DETAILS */}
        <div class="mb-6 fade-in">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-gold text-xs tracking-[0.3em] font-bold">CHAPTER 05</span>
            <span class="text-brown-400 text-xs tracking-widest">DETAILS</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-black text-brown-900 tracking-tight">디테일은 결국 시간이 됩니다</h3>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-12 fade-in-stagger">
          <div class="col-span-12 lg:col-span-7 img-frame img-reveal aspect-[16/10] rounded-[24px]">
            <img src="/r2/images/clinic/detail-led-corridor.jpg" alt="LED 라인 시그니처 복도" loading="lazy" />
          </div>
          <div class="col-span-12 lg:col-span-5 img-frame img-reveal aspect-[4/5] rounded-[24px]">
            <img src="/r2/images/clinic/detail-restroom.jpg" alt="럭셔리 호텔 무드 화장실" loading="lazy" />
          </div>
        </div>

        {/* CTA */}
        <div class="flex flex-wrap justify-center gap-4 fade-in">
          <a href="/directions" class="btn-primary btn-shine magnetic">
            <span>오시는 길</span>
            <i class="fas fa-map-marker-alt"></i>
          </a>
          <a href="/hours" class="btn-outline magnetic">
            <span>진료시간 보기</span>
          </a>
        </div>

      </div>
    </section>

    {/* ================================================== */}
    {/* 10. FAQ ACCORDION                                   */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-12">
        <div class="mb-16 fade-in">
          <div class="section-label mb-6">FAQ · 08</div>
          <h2 class="t-display">
            자주 묻는 <span class="t-gold">질문</span>
          </h2>
        </div>

        <div class="fade-in">
          {[
            {
              q: '치과 공포증이 심한데, 치료받을 수 있을까요?',
              a: '물론입니다. 대구365치과는 치과공포증이 있으셨던 의사가 직접 설계한 곳입니다. 4단계 무통마취, 수면치료 시스템, 그리고 무엇보다 환자의 속도에 맞추는 진료 문화가 있습니다. 언제든 불편하시면 중단할 수 있고, 단계별로 천천히 진행합니다.'
            },
            {
              q: '임플란트는 평생 쓸 수 있나요? 보증 범위는?',
              a: '대구365치과의 임플란트는 평생 무상 보증됩니다. 환자 부주의에 의한 파손을 제외한 모든 부작용·파절·소실에 대해 재치료·보수를 제공합니다. 시술 후 3-6개월마다 정기 관리 프로그램(Maintenance Care)에 참여하시면 장기 성공률이 더 높아집니다.'
            },
            {
              q: 'VINIQUE 라미네이트가 일반 라미네이트와 어떻게 다른가요?',
              a: 'VINIQUE는 환자 개인의 얼굴형, 스마일 라인, 치아 톤을 분석하여 맞춤 설계하는 프리미엄 라미네이트입니다. 최소한의 치아 삭제로 자연스러운 광택을 구현하며, 원내 디지털 기공실에서 직접 제작하여 당일 조정과 완성이 가능합니다.'
            },
            {
              q: '주말이나 공휴일에도 진료하나요?',
              a: '네, 대구365치과는 365일 연중무휴 운영합니다. 토·일요일은 09:30~17:00, 월·목요일은 21:00까지 야간 진료합니다. 갑작스런 치통이나 응급 상황에도 언제든 방문하실 수 있습니다.'
            },
            {
              q: '상담만 받아도 되나요? 비용은?',
              a: '네, 상담은 언제든 환영합니다. 전화(053-357-0365) 또는 방문 상담 모두 무료이며, 정확한 진단을 위한 X-ray 촬영이 필요한 경우에만 별도 비용이 발생합니다. 치료 계획과 비용은 전부 사전에 투명하게 안내해드립니다.'
            },
            {
              q: '주차는 가능한가요?',
              a: '엠브로스퀘어 7층에 위치하고 있으며, 건물 내 무료 주차가 가능합니다. 대중교통으로 오실 경우 버스 정류장 엠브로스퀘어가 건물 바로 앞에 있습니다.'
            },
          ].map((item: any, idx: number) => (
            <div class="accordion-item" data-accordion-item data-open={idx === 0 ? 'true' : 'false'}>
              <button class="accordion-trigger" data-accordion-trigger>
                <div>
                  <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-1 font-bold">Q{String(idx + 1).padStart(2, '0')}</div>
                  <div class="accordion-question">{item.q}</div>
                </div>
                <div class="accordion-icon">
                  <i class="fas fa-chevron-down text-sm"></i>
                </div>
              </button>
              <div class="accordion-content">
                <div class="accordion-content-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>

        <div class="mt-12 text-center fade-in">
          <a href="/faq" class="btn-ghost">
            <span>전체 FAQ 268개 보기</span>
            <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 11. JOURNAL QUICKLINKS                              */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap justify-between items-end mb-16 gap-6 fade-in">
          <div>
            <div class="section-label mb-6">JOURNAL · 09</div>
            <h2 class="t-display">
              더 깊이<br/><span class="t-gold">알아가기</span>
            </h2>
          </div>
          <p class="t-lead max-w-md">
            치료 사례, 블로그, 백과사전, FAQ.<br/>
            원장단이 직접 쓴 정확한 정보를 확인하세요.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 fade-in-stagger">
          {[
            { href: '/before-after', label: 'BEFORE & AFTER', title: '치료 사례', desc: '실제 진행된 케이스', img: '/r2/images/journal/before-after.jpg?v=3' },
            { href: '/blog', label: 'JOURNAL', title: '블로그', desc: '의료진 직접 작성', img: '/r2/images/journal/journal.jpg' },
            { href: '/dictionary', label: 'KNOWLEDGE', title: '치과 백과', desc: '500+ 용어 사전', img: '/r2/images/journal/knowledge.jpg' },
            { href: '/faq', label: 'FAQ', title: '자주 묻는 질문', desc: '268개 상세 답변', img: '/r2/images/journal/faq.jpg?v=2' },
          ].map((c: any) => (
            <a href={c.href} class="photo-card aspect-[3/4] group block">
              <img src={c.img} alt={c.title} loading="lazy" />
              <div class="photo-card-overlay">
                <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">{c.label}</div>
                <h3 class="display text-2xl font-black mb-2 tracking-tight">{c.title}</h3>
                <p class="text-white/80 text-sm mb-4">{c.desc}</p>
                <div class="flex items-center gap-2 text-sm text-gold font-semibold group-hover:gap-4 transition-all">
                  <span>바로가기</span>
                  <i class="fas fa-arrow-right text-xs"></i>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 11.5 요일별 진료 스케줄 — PPT PC1 슬라이드 12 신설      */}
    {/* ================================================== */}
    <section class="py-24 bg-cream relative overflow-hidden">
      <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-12 fade-in">
          <div class="section-label mb-6 mx-auto inline-block">SCHEDULE · 09</div>
          <h2 class="t-display mb-4">
            요일별 <span class="t-gold">진료 스케줄</span>
          </h2>
          <p class="t-lead text-brown-700 max-w-2xl mx-auto">
            월·목 21시 야간진료 · 토·일 정상 진료 · 공휴일에도 쉬지 않습니다
          </p>
        </div>

        <div class="rounded-[24px] shadow-xl overflow-hidden border border-brown-200 bg-ivory fade-in">
          <div class="grid grid-cols-7 text-center text-xs md:text-sm font-bold bg-brown-950 text-ivory">
            {['월','화','수','목','금','토','일'].map((d, i) => (
              <div class={`py-4 tracking-wider ${i >= 5 ? 'text-gold' : ''}`}>{d}</div>
            ))}
          </div>
          <div class="grid grid-cols-7 text-center text-[11px] md:text-sm">
            {[
              { day: '월', open: '09:30', close: '21:00', highlight: true },
              { day: '화', open: '09:30', close: '18:30' },
              { day: '수', open: '09:30', close: '18:30' },
              { day: '목', open: '09:30', close: '21:00', highlight: true },
              { day: '금', open: '09:30', close: '18:30' },
              { day: '토', open: '09:30', close: '17:00', weekend: true },
              { day: '일', open: '09:30', close: '17:00', weekend: true },
            ].map((d: any) => (
              <div class={`py-6 border-r border-brown-100 last:border-r-0 ${d.highlight ? 'bg-gold/10' : d.weekend ? 'bg-brown-50' : ''}`}>
                <div class={`display text-base md:text-lg font-black tracking-tight ${d.highlight ? 'text-gold' : 'text-brown-900'}`}>
                  {d.open}
                </div>
                <div class="text-[10px] text-brown-400 my-1">~</div>
                <div class={`display text-base md:text-lg font-black tracking-tight ${d.highlight ? 'text-gold' : 'text-brown-900'}`}>
                  {d.close}
                </div>
                {d.highlight && (
                  <div class="text-[9px] md:text-[10px] mt-2 font-bold text-gold tracking-wider">
                    야간진료
                  </div>
                )}
              </div>
            ))}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-brown-100 text-xs">
            <div class="bg-ivory p-5 flex items-center gap-3">
              <i class="fas fa-utensils text-gold"></i>
              <div>
                <div class="font-bold text-brown-900">점심시간</div>
                <div class="text-brown-600 mt-0.5">13:00 – 14:00 (평일)</div>
              </div>
            </div>
            <div class="bg-ivory p-5 flex items-center gap-3">
              <i class="fas fa-moon text-gold"></i>
              <div>
                <div class="font-bold text-brown-900">야간진료</div>
                <div class="text-brown-600 mt-0.5">월·목 21:00까지</div>
              </div>
            </div>
            <div class="bg-ivory p-5 flex items-center gap-3">
              <i class="fas fa-calendar-check text-gold"></i>
              <div>
                <div class="font-bold text-brown-900">공휴일</div>
                <div class="text-brown-600 mt-0.5">365일 연중무휴 진료</div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8 text-xs text-brown-500 fade-in">
          ※ 진료 마감 30분 전까지 접수 부탁드립니다 · 사전 예약 환자 우선 진료
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 12. CTA — CINEMATIC                                 */}
    {/* ================================================== */}
    <section class="relative py-28 lg:py-40 text-ivory overflow-hidden" style="background:var(--brown-950);">
      <img src="/static/images/cta-operation-room.jpg" alt="" class="absolute inset-0 w-full h-full object-cover opacity-30" aria-hidden="true" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-b from-brown-950/70 via-brown-950/85 to-brown-950"></div>
      <div class="blob" style="width:600px;height:600px;background:#c9a876;top:10%;left:50%;transform:translateX(-50%);opacity:0.2;"></div>

      <div class="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div class="section-label mb-8 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">
          BOOK YOUR CONSULTATION · 10
        </div>
        <h2 class="mb-10 fade-in font-black tracking-tight leading-[0.95]" style="font-size:clamp(2.5rem,7vw,6rem);color:var(--ivory);">
          <span class="t-gold">지금 바로</span><br/>
          상담을 예약하세요.
        </h2>
        <p class="t-lead mb-14 fade-in max-w-2xl mx-auto" style="color:rgba(253,251,247,0.75);">
          월·목 21시까지 · 토·일 진료 · 전화 한 통이면 충분합니다.<br/>
          친절한 데스크 직원이 원하시는 시간에 맞춰 상담을 안내해드립니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4 fade-in">
          <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic text-base py-6 px-12" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
            <i class="fas fa-phone"></i>
            <span class="text-lg font-bold">053-357-0365</span>
          </a>
          <a href="/directions" class="btn-outline magnetic text-base py-6 px-12" style="border-color:var(--ivory); color:var(--ivory);">
            <i class="fas fa-map-marker-alt"></i>
            <span>오시는 길</span>
          </a>
        </div>

        <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 fade-in text-sm">
          <div>
            <div class="t-eyebrow mb-3" style="color:var(--gold);">ADDRESS</div>
            <div class="text-brown-200 leading-relaxed">대구광역시 북구 침산로 148<br/>엠브로스퀘어 7층</div>
          </div>
          <div>
            <div class="t-eyebrow mb-3" style="color:var(--gold);">HOURS</div>
            <div class="text-brown-200 leading-relaxed">월·목 09:30~21:00<br/>화·수·금 09:30~18:30<br/>토·일 09:30~17:00</div>
          </div>
          <div>
            <div class="t-eyebrow mb-3" style="color:var(--gold);">CONTACT</div>
            <div class="text-brown-200 leading-relaxed">
              <a href="tel:053-357-0365" class="hover:text-gold transition">053-357-0365</a><br/>
              <a href="mailto:daegu365dc@naver.com" class="hover:text-gold transition">daegu365dc@naver.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
)
