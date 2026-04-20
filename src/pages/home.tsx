import { Navbar, Footer } from '../components/Layout'

/* ============================================================
   대구365치과 HOME — EDITORIAL LUXURY v2.0
   Sections:
   1. HERO — kinetic typography + editorial image
   2. MARQUEE — signature keywords
   3. MANIFESTO — director message (김성주 대표원장 스토리)
   4. SIGNATURE TREATMENTS — 3 flagship services (large cards)
   5. FULL TREATMENTS — 17 treatment grid
   6. DOCTORS SPOTLIGHT — 대표원장 큰 카드 + 6명 grid
   7. FACILITY — 병원 시설 showcase (엠브로스퀘어 7층)
   8. STATS — count-up (365일/7명/21시/무통마취 단계)
   9. CONTENT QUICKLINKS — before-after / blog / dictionary / faq
   10. CTA — 예약 contact
   ============================================================ */

export const HomePage = () => (
  <>
    <Navbar />

    {/* ======================================== */}
    {/* 1. HERO — EDITORIAL                     */}
    {/* ======================================== */}
    <section class="relative min-h-[100vh] hero-gradient overflow-hidden">
      <div class="blob" style="width:650px;height:650px;background:#c9a876;top:-150px;right:-150px;"></div>
      <div class="blob" style="width:520px;height:520px;background:#d4ba94;bottom:-150px;left:-150px;animation-delay:-10s;"></div>

      <div class="relative max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-24">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[85vh]">
          {/* Copy Column */}
          <div class="lg:col-span-7 relative z-10">
            <div class="section-label mb-10 fade-in">DAEGU 365 DENTAL · EST. 2024</div>

            <h1 class="hero-title mb-10 reveal-lines">
              <span class="block overflow-hidden">
                <span class="reveal-word"><span style="--d:0s">치과가</span></span>{' '}
                <span class="reveal-word"><span style="--d:.05s">두려워도</span></span>
              </span>
              <span class="block overflow-hidden">
                <span class="reveal-word"><span style="--d:.12s"><em>괜찮습니다</em>.</span></span>
              </span>
              <span class="block overflow-hidden mt-4" style="font-size:0.5em;font-weight:500;letter-spacing:-0.025em;color:var(--brown-600);">
                <span class="reveal-word"><span style="--d:.2s">천천히,</span></span>{' '}
                <span class="reveal-word"><span style="--d:.25s">함께</span></span>{' '}
                <span class="reveal-word"><span style="--d:.3s">가겠습니다.</span></span>
              </span>
            </h1>

            <p class="t-lead max-w-xl mb-12 fade-in">
              치과공포증을 가졌던 의사가 만드는, <strong class="font-semibold text-brown-900">두려움 없는 치과</strong>.<br/>
              <span class="text-brown-600">수면임플란트 · 인비절라인 · VINIQUE 라미네이트 전문.</span><br/>
              월·목 <strong class="font-semibold text-brown-900">21시</strong>까지, 주말도 진료합니다.
            </p>

            <div class="flex flex-wrap gap-4 fade-in">
              <a href="/mission" class="btn-primary magnetic">
                <span>우리의 이야기</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="tel:053-357-0365" class="btn-outline magnetic">
                <i class="fas fa-phone"></i>
                <span>053-357-0365</span>
              </a>
            </div>
          </div>

          {/* Image Column */}
          <div class="lg:col-span-5 fade-in relative">
            <div class="relative">
              <div class="img-frame aspect-[4/5] shadow-lux rounded-[32px]">
                <img src="/static/images/hero-interior.jpg" alt="대구365치과 프리미엄 인테리어" loading="eager" />
              </div>

              {/* Floating quote card */}
              <div class="absolute -bottom-10 -left-6 lg:-left-12 glass rounded-2xl p-6 shadow-lux max-w-xs">
                <div class="t-eyebrow mb-3" style="font-size:0.65rem;">DIRECTOR'S NOTE</div>
                <div class="display text-lg font-bold text-brown-900 leading-snug tracking-tight">
                  "치과 진입의 허들을 낮추고,<br/>경험의 혁신을 이룩한다."
                </div>
                <div class="text-xs text-brown-500 mt-3 font-medium">— 김성주 대표원장</div>
              </div>

              {/* Live status */}
              <div class="absolute -top-5 -right-4 glass rounded-full px-5 py-3 shadow-lg">
                <div class="flex items-center gap-2 text-sm">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span class="font-semibold text-brown-900">현재 진료 중</span>
                </div>
              </div>

              {/* Mini stat */}
              <div class="hidden lg:block absolute top-1/4 -right-10 glass rounded-2xl px-5 py-4 shadow-lg text-center">
                <div class="display text-3xl font-black text-brown-900 leading-none">365</div>
                <div class="text-[10px] tracking-[0.3em] text-brown-600 mt-1 font-semibold">DAYS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="scroll-indicator hidden lg:flex">
          <span>SCROLL</span>
          <div class="scroll-indicator-line"></div>
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 2. MARQUEE                                */}
    {/* ======================================== */}
    <section class="py-8 border-y border-brown-200 bg-cream overflow-hidden">
      <div class="marquee">
        <div class="marquee-inner">
          {[...Array(2)].map(() => (
            <span class="inline-flex items-center gap-12 display text-2xl font-black text-brown-800 px-6 tracking-tight">
              <span>수면임플란트</span><span class="text-gold">✦</span>
              <span>인비절라인 공인</span><span class="text-gold">✦</span>
              <span>VINIQUE 라미네이트</span><span class="text-gold">✦</span>
              <span>7인 전문 협진</span><span class="text-gold">✦</span>
              <span>3단계 무통마취</span><span class="text-gold">✦</span>
              <span>평생 임플란트 보증</span><span class="text-gold">✦</span>
              <span>원내 디지털 기공실</span><span class="text-gold">✦</span>
              <span>365일 진료</span><span class="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 3. MANIFESTO (대표원장 스토리)             */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40 relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <div class="lg:col-span-6 order-2 lg:order-1 fade-in">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="img-frame aspect-[3/4] rounded-[20px]">
                  <img src="/static/images/doctor-mood.jpg" alt="김성주 대표원장 무드" loading="lazy" />
                </div>
                <div class="img-frame aspect-square rounded-[20px]">
                  <img src="/static/images/detail-crown.jpg" alt="치과 디테일" loading="lazy" />
                </div>
              </div>
              <div class="space-y-4 pt-16">
                <div class="img-frame aspect-square rounded-[20px]">
                  <img src="/static/images/treatment-room.jpg" alt="진료실" loading="lazy" />
                </div>
                <div class="img-frame aspect-[3/4] rounded-[20px]">
                  <img src="/static/images/smile-portrait.jpg" alt="건강한 미소" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 order-1 lg:order-2 fade-in">
            <div class="section-label mb-8">OUR MISSION</div>
            <h2 class="section-title mb-10">
              <span class="t-gold">공감</span>으로 시작해서<br/>
              <span class="t-gold">신뢰</span>로 완성합니다
            </h2>
            <div class="space-y-5 t-lead mb-10">
              <p>
                저는 어린 시절부터 치과가 가장 무서운 곳이었습니다. 진료실 문 앞에서
                돌아섰던 기억, 그 두려움을 저는 아직도 또렷이 기억합니다.
              </p>
              <p class="text-brown-600">
                그래서 대구365치과는 <strong class="text-brown-900 font-semibold">"필요한 만큼, 정직하게"</strong>라는 원칙으로
                시작합니다. 한 번에 끝내려 하지 않고, 평생 함께 갈 치아를 만들어 드립니다.
              </p>
            </div>

            <div class="pullquote mb-10">
              치과 진입의 허들을 낮추고, 경험의 혁신을 이룩한다.
            </div>

            <a href="/mission" class="btn-ghost">
              <span>우리의 이야기 전체 보기</span>
              <i class="fas fa-arrow-right text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 4. SIGNATURE TREATMENTS                   */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40 bg-cream relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap justify-between items-end mb-16 lg:mb-20 gap-8 fade-in">
          <div class="max-w-2xl">
            <div class="section-label mb-6">SIGNATURE TREATMENT</div>
            <h2 class="section-title">
              우리가 <span class="t-gold">가장 잘하는</span><br/>세 가지
            </h2>
          </div>
          <p class="t-lead max-w-md">
            대구365치과의 시그니처 진료. 분야별 전문의가 함께 케이스를 설계하고,
            단계별 무통마취로 두려움을 제거합니다.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 fade-in-stagger">
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
              name: 'VINIQUE 라미네이트',
              tagline: '자연스러운 미소',
              num: '02',
              img: '/static/images/smile-portrait.jpg',
              points: ['얼굴형·스마일 라인 설계', '최소 삭제 · 자연광택', '원내 디지털 기공실'],
            },
            {
              slug: 'ortho',
              name: '인비절라인',
              tagline: '투명하게, 자유롭게',
              num: '03',
              img: '/static/images/detail-crown.jpg',
              points: ['인비절라인 공인 의료진', '3D 시뮬레이션', '티 나지 않는 교정'],
            },
          ].map((t: any) => (
            <a href={`/treatments/${t.slug}`} class="group block">
              <div class="lux-card h-full p-0 overflow-hidden">
                <div class="img-frame aspect-[4/3] rounded-t-[24px] rounded-b-none relative">
                  <img src={t.img} alt={t.name} loading="lazy" />
                  <div class="absolute top-5 left-5 glass rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.25em]">
                    {t.num}
                  </div>
                </div>
                <div class="p-8">
                  <h3 class="display text-3xl font-black mb-2 tracking-tight">{t.name}</h3>
                  <p class="text-brown-600 font-medium mb-6">{t.tagline}</p>
                  <ul class="space-y-2 mb-8">
                    {t.points.map((p: string) => (
                      <li class="flex gap-2 text-sm text-brown-700">
                        <i class="fas fa-check text-gold text-xs mt-1.5"></i>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div class="btn-ghost text-sm">
                    <span>자세히 보기</span>
                    <i class="fas fa-arrow-right text-xs"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div class="mt-14 flex justify-center fade-in">
          <a href="/treatments" class="btn-outline magnetic">
            <span>모든 진료 안내 보기 (17종)</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 5. DOCTOR SPOTLIGHT (김성주 대표)         */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex flex-wrap justify-between items-end mb-16 gap-6 fade-in">
          <div class="max-w-xl">
            <div class="section-label mb-6">MEDICAL TEAM</div>
            <h2 class="section-title">
              분야별 전문 <span class="t-gold">7인 협진</span>
            </h2>
          </div>
          <p class="t-lead max-w-md">
            보존·치주·소아·교정 각 분야 전문가가 <br/>하나의 케이스를 함께 설계합니다.
          </p>
        </div>

        {/* 대표원장 스포트라이트 */}
        <a href="/doctors/kim-seongju" class="block spotlight-card shadow-xl fade-in group mb-8">
          <img src="/static/images/doctor-mood.jpg" alt="김성주 대표원장" class="spotlight-card-img" loading="lazy" />
          <div class="relative h-full p-10 lg:p-16 flex flex-col justify-end min-h-[600px]">
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
              <span class="tag-gold tag">서울대 치의학과</span>
              <span class="tag-gold tag">통합치의학과 전문의</span>
              <span class="tag-gold tag">수면임플란트</span>
              <span class="tag-gold tag">보철·보존 진료</span>
            </div>
            <div class="flex items-center gap-3 text-gold font-semibold group-hover:gap-5 transition-all">
              <span>프로필 자세히 보기</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </a>

        {/* 나머지 6명 의료진 grid */}
        <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4 fade-in-stagger">
          {[
            { slug: 'jung-jaeheon', name: '정재헌', pos: '진료원장', spec: '보존·치아 시간', img: '/static/images/doctor-mood.jpg' },
            { slug: 'choi-hyejung', name: '최혜정', pos: '진료원장', spec: '보존·정직 치료', img: '/static/images/doctor-mood.jpg' },
            { slug: 'han-jieun', name: '한지은', pos: '진료원장', spec: '소아·따뜻한 기억', img: '/static/images/doctor-mood.jpg' },
            { slug: 'kim-jinduk', name: '김진덕', pos: '진료원장', spec: '교정·자신감 미소', img: '/static/images/doctor-mood.jpg' },
            { slug: 'kim-sangwon', name: '김상원', pos: '진료원장', spec: '자연치아 보존', img: '/static/images/doctor-mood.jpg' },
            { slug: 'lee-seoyoung', name: '이서영', pos: '진료원장', spec: '치주·세심한 치료', img: '/static/images/doctor-mood.jpg' },
          ].map((d: any) => (
            <a href={`/doctors/${d.slug}`} class="group block">
              <div class="img-frame aspect-[3/4] rounded-2xl mb-4">
                <img src={d.img} alt={d.name} loading="lazy" class="group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-1 font-bold">{d.pos.toUpperCase()}</div>
              <div class="display text-lg font-black tracking-tight mb-1">{d.name} 원장</div>
              <div class="text-xs text-brown-500">{d.spec}</div>
            </a>
          ))}
        </div>

        <div class="mt-12 text-center fade-in">
          <a href="/doctors" class="btn-ghost">
            <span>전체 의료진 보기</span>
            <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 6. DIFFERENTIATORS (왜 대구365)           */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:10%;right:-150px;opacity:0.15;"></div>
      <div class="blob" style="width:400px;height:400px;background:#8a6235;bottom:10%;left:-100px;opacity:0.2;"></div>

      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center mb-20 lg:mb-24 fade-in">
          <div class="section-label mb-8" style="color:var(--gold);border-color:var(--gold);background:rgba(26,18,10,0.3);">
            WHY DAEGU365
          </div>
          <h2 class="section-title text-ivory mx-auto max-w-4xl">
            왜 <span class="t-gold">대구365치과</span>인가
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-stagger">
          {[
            {
              icon: 'fa-layer-group',
              title: '분야별 협진',
              num: '01',
              desc: '보존·치주·소아·교정 전문가가 하나의 케이스를 함께 설계합니다.',
            },
            {
              icon: 'fa-syringe',
              title: '3단계 무통마취',
              num: '02',
              desc: '가글 → 도포 → 무통마취기 → 본마취. 주사의 공포를 완전히 제거했습니다.',
            },
            {
              icon: 'fa-infinity',
              title: '평생 임플란트 보증',
              num: '03',
              desc: '부작용/파절/소실에 대한 재치료·보수를 평생 보장합니다.',
            },
            {
              icon: 'fa-microscope',
              title: '원내 디지털 기공실',
              num: '04',
              desc: '외부 기공소 대신 원내 제작 — 당일 완성, 실시간 조정 가능.',
            },
          ].map((f: any) => (
            <div class="glass-dark p-8 rounded-2xl relative overflow-hidden">
              <div class="flex justify-between items-start mb-8">
                <div class="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold text-2xl">
                  <i class={`fas ${f.icon}`}></i>
                </div>
                <span class="text-[10px] tracking-[0.3em] text-gold/60 font-bold">{f.num}</span>
              </div>
              <h3 class="display text-2xl font-black mb-3 tracking-tight">{f.title}</h3>
              <p class="text-brown-300 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 7. FACILITY (엠브로스퀘어 7층)              */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div class="lg:col-span-5 fade-in">
            <div class="section-label mb-6">FACILITY</div>
            <h2 class="section-title mb-10">
              프리미엄<br/>
              <span class="t-gold">치과 공간</span>
            </h2>
            <div class="space-y-5 t-lead mb-10">
              <p>
                대구광역시 북구 침산로 <strong class="text-brown-900 font-semibold">엠브로스퀘어 7층</strong>.<br/>
                쾌적하고 정적인 환경에서 진료를 받을 수 있도록,<br/>
                공간의 디테일까지 설계했습니다.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              {[
                { icon: 'fa-car', label: '무료 주차' },
                { icon: 'fa-wifi', label: '무료 Wi-Fi' },
                { icon: 'fa-subway', label: '침산역 근처' },
                { icon: 'fa-calendar-check', label: '주말·야간' },
              ].map((i: any) => (
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-brown-100 flex items-center justify-center text-brown-800">
                    <i class={`fas ${i.icon} text-sm`}></i>
                  </div>
                  <span class="font-semibold text-brown-800">{i.label}</span>
                </div>
              ))}
            </div>

            <div class="flex gap-3">
              <a href="/directions" class="btn-primary magnetic">
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
              <div class="col-span-7 img-frame aspect-[4/5] rounded-[24px]">
                <img src="/static/images/hero-interior.jpg" alt="대구365치과 인테리어" loading="lazy" />
              </div>
              <div class="col-span-5 flex flex-col gap-4 pt-10">
                <div class="img-frame aspect-square rounded-[20px]">
                  <img src="/static/images/treatment-room.jpg" alt="진료실" loading="lazy" />
                </div>
                <div class="img-frame aspect-square rounded-[20px]">
                  <img src="/static/images/detail-crown.jpg" alt="디테일" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 8. STATS COUNT-UP                         */}
    {/* ======================================== */}
    <section class="py-28 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 fade-in-stagger">
          {[
            { num: 365, suffix: '일', label: '연중무휴 진료' },
            { num: 7, suffix: '명', label: '전문 의료진' },
            { num: 21, suffix: ':00', label: '월·목 야간 진료' },
            { num: 3, suffix: '단계', label: '무통마취 시스템' },
          ].map((s: any) => (
            <div class="text-center">
              <div class="stat-big count-up" data-count={s.num}>0<span class="text-brown-400">{s.suffix}</span></div>
              <div class="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ======================================== */}
    {/* 9. CONTENT QUICKLINKS                     */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16 fade-in">
          <div class="section-label mb-6">JOURNAL & RESOURCES</div>
          <h2 class="section-title">
            더 깊이 <span class="t-gold">알아가기</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 fade-in-stagger">
          {[
            { href: '/before-after', label: 'BEFORE & AFTER', title: '치료 사례', desc: '실제 진행된 케이스', img: '/static/images/smile-portrait.jpg' },
            { href: '/blog', label: 'JOURNAL', title: '블로그', desc: '의료진 직접 작성', img: '/static/images/doctor-mood.jpg' },
            { href: '/dictionary', label: 'KNOWLEDGE', title: '치과 백과', desc: '500+ 용어 사전', img: '/static/images/detail-crown.jpg' },
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

    {/* ======================================== */}
    {/* 10. CTA                                   */}
    {/* ======================================== */}
    <section class="py-28 lg:py-40 bg-brown-950 text-ivory relative overflow-hidden">
      <img src="/static/images/hero-interior.jpg" alt="" class="absolute inset-0 w-full h-full object-cover opacity-20" aria-hidden="true" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-b from-brown-950/70 via-brown-950/85 to-brown-950"></div>
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:10%;left:50%;transform:translateX(-50%);opacity:0.15;"></div>

      <div class="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div class="section-label mb-8 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">
          BOOK YOUR CONSULTATION
        </div>
        <h2 class="t-display text-ivory mb-10 fade-in">
          <span class="t-gold">지금 바로</span><br/>
          상담을 예약하세요.
        </h2>
        <p class="t-lead text-brown-200 mb-14 fade-in max-w-2xl mx-auto">
          월·목 21시까지 · 토·일 진료 · 전화 한 통이면 충분합니다.<br/>
          친절한 데스크 직원이 원하시는 시간에 맞춰 상담을 안내해드립니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4 fade-in">
          <a href="tel:053-357-0365" class="btn-primary magnetic text-base py-6 px-12">
            <i class="fas fa-phone"></i>
            <span class="text-lg font-semibold">053-357-0365</span>
          </a>
          <a href="/directions" class="btn-outline magnetic text-base py-6 px-12" style="border-color:var(--gold); color:var(--gold);">
            <i class="fas fa-map-marker-alt"></i>
            <span>오시는 길</span>
          </a>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in text-sm">
          <div>
            <div class="t-eyebrow mb-2" style="color:var(--gold);">ADDRESS</div>
            <div class="text-brown-200">대구광역시 북구 침산로 148<br/>엠브로스퀘어 7층</div>
          </div>
          <div>
            <div class="t-eyebrow mb-2" style="color:var(--gold);">HOURS</div>
            <div class="text-brown-200">월·목 09:30~21:00<br/>화·수·금 09:30~18:30<br/>토·일 09:30~17:00</div>
          </div>
          <div>
            <div class="t-eyebrow mb-2" style="color:var(--gold);">CONTACT</div>
            <div class="text-brown-200">
              <a href="tel:053-357-0365" class="hover:text-gold">053-357-0365</a><br/>
              <a href="mailto:daegu365dc@naver.com" class="hover:text-gold">daegu365dc@naver.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
)
