import { Navbar, Footer } from '../components/Layout'

/* ============================================================
   대구365치과 HOME — EDITORIAL SUPREME v3.0
   Awwwards Site of the Day tier
   ============================================================ */

export const HomePage = () => (
  <>
    <Navbar />

    {/* ================================================== */}
    {/* 1. CINEMATIC HERO                                   */}
    {/* ================================================== */}
    <section class="cinematic-hero">
      <img src="/static/images/wide-hallway.jpg" alt="" class="cinematic-hero-bg loaded" aria-hidden="true" />

      {/* Side meta */}
      <div class="side-meta hidden lg:block">DAEGU 365 DENTAL · EST. 2024 · KOREA</div>
      <div class="side-meta side-meta-right hidden lg:block">NORTH DISTRICT · CHIMSAN-RO 148</div>

      <div class="cinematic-hero-content max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24 min-h-screen flex flex-col justify-between">
        {/* Top bar */}
        <div class="flex flex-wrap items-center justify-between gap-6 fade-in">
          <div class="ribbon">
            <i class="fas fa-shield-heart"></i>
            <span>평생 임플란트 보증</span>
          </div>
          <div class="hidden md:flex items-center gap-4 text-sm text-ivory/80">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span class="font-medium">LIVE · 현재 진료 중</span>
            <span class="text-ivory/30">|</span>
            <span>월·목 <strong>21:00</strong>까지</span>
          </div>
        </div>

        {/* Headline block */}
        <div class="max-w-5xl">
          <div class="section-label mb-10 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.4);">
            SINCE 2024 · 대구 북구
          </div>

          <h1 class="reveal-lines text-ivory font-black leading-[0.9] tracking-[-0.05em]" style="font-size:clamp(3rem, 9vw, 9rem);">
            <span class="block overflow-hidden">
              <span class="reveal-word"><span style="--d:0s">치과가</span></span>{' '}
              <span class="reveal-word"><span style="--d:.05s">두려워도,</span></span>
            </span>
            <span class="block overflow-hidden mt-2">
              <span class="reveal-word"><span style="--d:.14s" class="t-gold">괜찮습니다</span></span>
              <span class="reveal-word"><span style="--d:.2s">.</span></span>
            </span>
          </h1>

          <div class="mt-10 grid md:grid-cols-2 gap-8 items-end max-w-4xl">
            <p class="t-lead text-ivory/85 fade-in" style="color:rgba(253,251,247,0.85);">
              치과공포증을 가졌던 의사가 만드는, <strong class="text-gold font-semibold">두려움 없는 치과</strong>.<br/>
              수면임플란트 · 인비절라인 · VINIQUE 라미네이트 전문.
            </p>

            <div class="flex flex-wrap gap-3 fade-in">
              <a href="/mission" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <span class="font-semibold">우리의 이야기</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="tel:053-357-0365" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <i class="fas fa-phone"></i>
                <span>053-357-0365</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 pt-14 border-t border-ivory/10 fade-in">
          {[
            { num: '365', label: '일 연중무휴' },
            { num: '7', label: '명 전문 의료진' },
            { num: '21:00', label: '월·목 야간진료' },
            { num: '∞', label: '평생 임플란트 보증' },
          ].map((s: any) => (
            <div>
              <div class="display text-4xl lg:text-5xl font-black text-ivory tracking-tight leading-none mb-2">
                {s.num}
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

    {/* ================================================== */}
    {/* 2. GIANT MARQUEE                                    */}
    {/* ================================================== */}
    <section class="marquee-giant bg-ivory">
      <div class="marquee-giant-inner">
        <span>수면임플란트</span>
        <span class="gold">✦</span>
        <span class="outline">VINIQUE</span>
        <span class="gold">✦</span>
        <span>인비절라인</span>
        <span class="gold">✦</span>
        <span class="outline">DAEGU365</span>
        <span class="gold">✦</span>
        <span>평생보증</span>
        <span class="gold">✦</span>
        <span class="outline">SINCE 2024</span>
        <span class="gold">✦</span>
        <span>수면임플란트</span>
        <span class="gold">✦</span>
        <span class="outline">VINIQUE</span>
        <span class="gold">✦</span>
        <span>인비절라인</span>
        <span class="gold">✦</span>
        <span class="outline">DAEGU365</span>
        <span class="gold">✦</span>
        <span>평생보증</span>
        <span class="gold">✦</span>
        <span class="outline">SINCE 2024</span>
        <span class="gold">✦</span>
      </div>
    </section>

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
              <span class="t-outline">신뢰</span>로<br/>완성합니다
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
            <div class="eg-1 img-frame img-reveal rounded-[20px]">
              <img src="/static/images/doctor-mood.jpg" alt="대표원장 무드" loading="lazy" />
            </div>
            <div class="eg-2 img-frame img-reveal rounded-[20px]">
              <img src="/static/images/macro-veneer.jpg" alt="세라믹 베니어 매크로" loading="lazy" />
            </div>
            <div class="eg-3 bg-brown-950 text-ivory rounded-[20px] p-8 flex flex-col justify-center">
              <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">SINCE 2024</div>
              <div class="display text-3xl font-black leading-tight tracking-tight">
                "필요한 만큼,<br/>정직하게"
              </div>
              <div class="text-xs text-brown-300 mt-4 font-medium">— 대구365치과 원칙</div>
            </div>
            <div class="eg-4 img-frame img-reveal rounded-[20px]">
              <img src="/static/images/detail-crown.jpg" alt="디테일" loading="lazy" />
            </div>
            <div class="eg-5 img-frame img-reveal rounded-[20px]">
              <img src="/static/images/treatment-room.jpg" alt="진료실 디테일" loading="lazy" />
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
            <h2 class="t-display">
              <span class="t-outline">시그니처</span><br/>
              <span class="t-gold">진료 6선</span>
            </h2>
          </div>
          <div class="flex items-center gap-3 text-brown-600 text-sm">
            <span class="font-semibold tracking-wider">DRAG · SCROLL →</span>
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
            <h3 class="t-headline text-brown-900 mb-6">
              분야별 전문의가<br/>함께 설계하는<br/>
              <span class="t-gold">3가지 시그니처</span>
            </h3>
            <p class="t-lead mb-8">
              수면 진정 + 3단계 무통마취 + 원내 디지털 기공실로<br/>
              공포 없이, 정확하게, 빠르게.
            </p>
            <a href="/treatments" class="btn-primary btn-shine magnetic">
              <span>전체 진료 17종 보기</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          {[
            {
              slug: 'implant',
              name: '수면임플란트',
              tagline: '공포 없는 임플란트',
              num: '01',
              img: '/static/images/treatment-room.jpg',
              points: ['수면 진정 + 무통마취', '메가젠 BD · 오스템 BA', '평생 임플란트 보증'],
            },
            {
              slug: 'lamineer',
              name: 'VINIQUE',
              tagline: '프리미엄 라미네이트',
              num: '02',
              img: '/static/images/smile-portrait.jpg',
              points: ['얼굴형·스마일 라인 설계', '최소 삭제 · 자연광택', '원내 디지털 기공실'],
            },
            {
              slug: 'ortho',
              name: '인비절라인',
              tagline: '투명하게, 자유롭게',
              num: '03',
              img: '/static/images/macro-veneer.jpg',
              points: ['인비절라인 공인 의료진', '3D 시뮬레이션', '티 나지 않는 교정'],
            },
            {
              slug: 'painless-anesthesia',
              name: '3단계 무통마취',
              tagline: '주사 공포 제거',
              num: '04',
              img: '/static/images/detail-crown.jpg',
              points: ['가글 → 도포 → 무통기 → 본마취', '앰플 워머 사용', '극세 주사 바늘'],
            },
            {
              slug: 'sleep-therapy',
              name: '수면치료 시스템',
              tagline: '잠드는 사이 끝',
              num: '05',
              img: '/static/images/hero-interior.jpg',
              points: ['전문 마취과 협진', '생체 신호 실시간 모니터', '응급 대응 시스템'],
            },
            {
              slug: 'airflow-gbt',
              name: 'AIRFLOW GBT',
              tagline: '무통 스케일링',
              num: '06',
              img: '/static/images/cta-operation-room.jpg',
              points: ['온수·공기·고운 분말', '시린이·임플란트 가능', '바이오필름 완전 제거'],
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
              num: 365,
              suffix: '일',
              label: 'ALWAYS OPEN',
              desc: '주말, 공휴일에도 쉬지 않습니다. 갑작스런 치통·사고에도 언제든 진료받으실 수 있도록 연중무휴 운영합니다.'
            },
            {
              num: 7,
              suffix: '명',
              label: 'SPECIALIZED TEAM',
              desc: '대표원장 1명 + 진료원장 6명. 보존·치주·소아·교정·보철·심미 각 분야 전문의가 하나의 케이스를 함께 설계합니다.'
            },
            {
              num: 21,
              suffix: ':00 PM',
              label: 'LATE NIGHT HOURS',
              desc: '월·목요일은 21시까지 진료합니다. 직장인도, 학생도, 일상을 포기하지 않고 치료받으실 수 있도록.'
            },
            {
              num: 3,
              suffix: '단계',
              label: 'PAINLESS PROTOCOL',
              desc: '가글 → 도포 마취제 → 무통마취기 → 본마취. 주사의 공포를 제거한 대구365치과만의 4단계 프로토콜.'
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
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
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
            <div class="section-label mb-6">MEDICAL TEAM · 04</div>
            <h2 class="t-display">
              <span class="t-outline">7인의</span><br/>
              <span class="t-gold">전문 의료진</span>
            </h2>
          </div>
          <p class="t-lead max-w-md">
            보존·치주·소아·교정·보철·심미. <br/>
            각 분야 전문의가 하나의 케이스를 함께 설계합니다.
          </p>
        </div>

        {/* Team group image */}
        <div class="img-frame img-reveal aspect-[16/9] rounded-[32px] mb-8 fade-in shadow-xl">
          <img src="/static/images/team-group.jpg" alt="대구365치과 의료진" loading="lazy" />
        </div>

        {/* 대표원장 스포트라이트 */}
        <a href="/doctors/kim-seongju" class="block spotlight-card shadow-xl fade-in group mb-8">
          <img src="/static/images/doctor-mood.jpg" alt="김성주 대표원장" class="spotlight-card-img" loading="lazy" />
          <div class="relative h-full p-10 lg:p-16 flex flex-col justify-end min-h-[580px]">
            <div class="section-label mb-6" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.3);">
              FOUNDER · DIRECTOR
            </div>
            <h3 class="display text-5xl lg:text-7xl font-black mb-4 tracking-tight leading-none">
              김성주 <span class="t-outline" style="-webkit-text-stroke-color:var(--gold);">대표원장</span>
            </h3>
            <p class="text-xl lg:text-2xl text-brown-200 leading-relaxed max-w-3xl mb-8 font-medium">
              "환자의 두려움에 공감하고, 꼭 필요한 정직한 치료만 권합니다.<br/>
              한 번에 끝내려 하지 않고, 평생 함께 갈 수 있는 치아를 만듭니다."
            </p>
            <div class="flex flex-wrap gap-3 mb-8">
              <span class="tag tag-gold">서울대 치의학과</span>
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

        <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4 fade-in-stagger">
          {[
            { slug: 'jung-jaeheon', name: '정재헌', pos: '진료원장', spec: '보존·치아 시간' },
            { slug: 'choi-hyejung', name: '최혜정', pos: '진료원장', spec: '보존·정직 치료' },
            { slug: 'han-jieun', name: '한지은', pos: '진료원장', spec: '소아·따뜻한 기억' },
            { slug: 'kim-jinduk', name: '김진덕', pos: '진료원장', spec: '교정·자신감 미소' },
            { slug: 'kim-sangwon', name: '김상원', pos: '진료원장', spec: '자연치아 보존' },
            { slug: 'lee-seoyoung', name: '이서영', pos: '진료원장', spec: '치주·세심한 치료' },
          ].map((d: any) => (
            <a href={`/doctors/${d.slug}`} class="group block">
              <div class="img-frame aspect-[3/4] rounded-2xl mb-4">
                <img src="/static/images/doctor-mood.jpg" alt={d.name} loading="lazy" class="group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-1 font-bold">{d.pos.toUpperCase()}</div>
              <div class="display text-lg font-black tracking-tight mb-1">{d.name} 원장</div>
              <div class="text-xs text-brown-500">{d.spec}</div>
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
              단순한 진료가 아닙니다. 환자 한 분의 두려움부터 평생 관리까지,<br/>
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
                title: '3단계 무통마취 시스템',
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
                desc: '주말, 공휴일에도 쉬지 않습니다. 월·목요일은 21시까지. 일상을 포기하지 않고 치료받으실 수 있도록 시간을 맞춰드립니다.'
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
              avatar: '/static/images/testimonial-smile.jpg',
              stars: 5,
            },
            {
              quote: '다른 치과에서 6개를 빼야 한다고 했는데, 대구365에서는 2개만 치료하면 된다고 하시더라고요. "꼭 필요한 치료만"이라는 말이 진짜였습니다.',
              author: '박**님',
              meta: '보존치료 · 50대 남성',
              avatar: '/static/images/testimonial-smile.jpg',
              stars: 5,
            },
            {
              quote: 'VINIQUE로 라미네이트 했는데, 자연스러워서 친구들도 못 알아봐요. 근데 사진 찍을 때 확실히 달라진 게 보이는 거예요. 최고의 선택.',
              author: '이**님',
              meta: 'VINIQUE 라미네이트 · 30대 여성',
              avatar: '/static/images/testimonial-smile.jpg',
              stars: 5,
            },
          ].map((t: any) => (
            <div class="testimonial-card">
              <div class="testimonial-stars">
                {'★'.repeat(t.stars)}
              </div>
              <p class="testimonial-quote">"{t.quote}"</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">
                  <img src={t.avatar} alt={t.author} loading="lazy" />
                </div>
                <div>
                  <div class="font-bold text-brown-900 tracking-tight">{t.author}</div>
                  <div class="text-xs text-brown-500 font-medium mt-0.5">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
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
    {/* 9. FACILITY                                         */}
    {/* ================================================== */}
    <section class="py-28 lg:py-40 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div class="lg:col-span-5 fade-in">
            <div class="section-label mb-6">FACILITY · 07</div>
            <h2 class="t-display mb-10">
              <span class="t-outline">프리미엄</span><br/>
              <span class="t-gold">치과 공간</span>
            </h2>
            <p class="t-lead mb-10">
              대구광역시 북구 침산로 <strong class="text-brown-900 font-bold">엠브로스퀘어 7층</strong>.<br/>
              쾌적하고 정적인 환경에서 진료를 받을 수 있도록,<br/>
              공간의 디테일까지 설계했습니다.
            </p>

            <div class="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              {[
                { icon: 'fa-car', label: '무료 주차' },
                { icon: 'fa-wifi', label: '무료 Wi-Fi' },
                { icon: 'fa-subway', label: '침산역 근처' },
                { icon: 'fa-calendar-check', label: '주말·야간' },
              ].map((i: any) => (
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-brown-100 flex items-center justify-center text-brown-900 border border-brown-200">
                    <i class={`fas ${i.icon} text-sm`}></i>
                  </div>
                  <span class="font-bold text-brown-900 tracking-tight">{i.label}</span>
                </div>
              ))}
            </div>

            <div class="flex gap-3">
              <a href="/directions" class="btn-primary btn-shine magnetic">
                <span>오시는 길</span>
                <i class="fas fa-map-marker-alt"></i>
              </a>
              <a href="/hours" class="btn-outline magnetic">
                <span>진료시간</span>
              </a>
            </div>
          </div>

          <div class="lg:col-span-7 fade-in">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-8 img-frame img-reveal aspect-[4/5] rounded-[24px]">
                <img src="/static/images/hero-interior.jpg" alt="대구365치과 인테리어" loading="lazy" />
              </div>
              <div class="col-span-4 flex flex-col gap-4 pt-10">
                <div class="img-frame img-reveal aspect-square rounded-[20px]">
                  <img src="/static/images/cta-operation-room.jpg" alt="수술실" loading="lazy" />
                </div>
                <div class="img-frame img-reveal aspect-square rounded-[20px]">
                  <img src="/static/images/treatment-room.jpg" alt="진료실" loading="lazy" />
                </div>
                <div class="img-frame img-reveal aspect-square rounded-[20px]">
                  <img src="/static/images/detail-crown.jpg" alt="디테일" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
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
              a: '물론입니다. 대구365치과는 치과공포증이 있으셨던 의사가 직접 설계한 곳입니다. 3단계 무통마취, 수면치료 시스템, 그리고 무엇보다 환자의 속도에 맞추는 진료 문화가 있습니다. 언제든 불편하시면 중단할 수 있고, 단계별로 천천히 진행합니다.'
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
              a: '엠브로스퀘어 7층에 위치하고 있으며, 건물 내 무료 주차가 가능합니다. 대중교통으로 오실 경우 지하철 3호선 침산역이 가장 가깝습니다.'
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
            { href: '/before-after', label: 'BEFORE & AFTER', title: '치료 사례', desc: '실제 진행된 케이스', img: '/static/images/smile-portrait.jpg' },
            { href: '/blog', label: 'JOURNAL', title: '블로그', desc: '의료진 직접 작성', img: '/static/images/doctor-mood.jpg' },
            { href: '/dictionary', label: 'KNOWLEDGE', title: '치과 백과', desc: '500+ 용어 사전', img: '/static/images/macro-veneer.jpg' },
            { href: '/faq', label: 'FAQ', title: '자주 묻는 질문', desc: '268개 상세 답변', img: '/static/images/treatment-room.jpg' },
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
