import { Navbar, Footer } from '../components/Layout'

export const HomePage = () => (
  <>
    <Navbar />

    {/* HERO */}
    <section class="relative min-h-[100vh] hero-gradient overflow-hidden">
      <div class="blob" style="width:600px;height:600px;background:#c9a876;top:-100px;right:-100px;"></div>
      <div class="blob" style="width:500px;height:500px;background:#d4ba94;bottom:-100px;left:-100px;animation-delay:-10s;"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-32">
        <div class="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          <div class="lg:col-span-7">
            <div class="section-label mb-8 fade-in">DAEGU 365 DENTAL · 2025</div>
            <h1 class="hero-title mb-8 fade-in">
              <span class="block">치과가 두려워도</span>
              <span class="block"><em>괜찮습니다</em>.</span>
              <span class="block text-brown-700" style="font-size:0.6em;font-style:normal;">천천히, 함께 가겠습니다.</span>
            </h1>
            <p class="text-lg text-brown-700 leading-relaxed max-w-xl mb-10 fade-in">
              치과공포증을 가졌던 의사가 만드는, 두려움 없는 치과.<br/>
              <span class="italic display text-brown-600">수면임플란트, 인비절라인, 라미네이트 전문.</span><br/>
              월·목 21시까지, 주말도 진료합니다.
            </p>
            <div class="flex flex-wrap gap-4 fade-in">
              <a href="/mission" class="btn-primary magnetic">
                <span>우리의 이야기</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="/before-after" class="btn-outline magnetic">
                <span>치료 사례 보기</span>
              </a>
            </div>

            <div class="mt-16 grid grid-cols-3 gap-6 fade-in">
              <div>
                <div class="display text-4xl font-medium text-brown-900">365</div>
                <div class="text-xs text-brown-600 tracking-wider mt-1">연중무휴 진료</div>
              </div>
              <div>
                <div class="display text-4xl font-medium text-brown-900">7<span class="text-brown-400">명</span></div>
                <div class="text-xs text-brown-600 tracking-wider mt-1">분야별 의료진</div>
              </div>
              <div>
                <div class="display text-4xl font-medium text-brown-900">21<span class="text-brown-400">:00</span></div>
                <div class="text-xs text-brown-600 tracking-wider mt-1">월·목 야간 진료</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 fade-in">
            <div class="relative">
              <div class="aspect-[4/5] placeholder-img rounded-[40px] shadow-lux">
                <i class="fas fa-tooth"></i>
              </div>
              <div class="absolute -bottom-8 -left-8 glass rounded-2xl p-6 shadow-lux max-w-xs">
                <div class="text-xs tracking-[0.3em] text-brown-600 mb-2">TODAY'S QUOTE</div>
                <div class="display text-lg italic text-brown-900 leading-snug">
                  "치과 진입의 허들을 낮추고,<br/>경험의 혁신을 이룩한다."
                </div>
                <div class="text-xs text-brown-500 mt-3">— 김성주 대표원장</div>
              </div>
              <div class="absolute -top-6 -right-6 glass rounded-full px-5 py-3 shadow-lux">
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="font-medium text-brown-800">현재 진료 중</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-brown-500 text-xs tracking-[0.3em]">
          SCROLL ↓
        </div>
      </div>
    </section>

    {/* MARQUEE */}
    <section class="py-8 border-y border-brown-200 bg-cream overflow-hidden">
      <div class="marquee">
        <div class="marquee-inner">
          {[...Array(2)].map(() => (
            <span class="inline-flex items-center gap-12 display text-2xl italic text-brown-600 px-6">
              <span>수면임플란트</span><span class="text-gold">✦</span>
              <span>인비절라인 공인</span><span class="text-gold">✦</span>
              <span>분야별 전문 협진</span><span class="text-gold">✦</span>
              <span>단계별 무통마취</span><span class="text-gold">✦</span>
              <span>주말 진료</span><span class="text-gold">✦</span>
              <span>대구 북구 침산동</span><span class="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* MISSION PREVIEW */}
    <section class="py-32 max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="fade-in">
          <div class="section-label mb-6">OUR MISSION</div>
          <h2 class="section-title mb-8">
            <em class="italic text-brown-700">공감</em>으로 시작해서<br/>
            <em class="italic text-brown-700">신뢰</em>로 완성합니다
          </h2>
          <p class="text-brown-700 leading-relaxed mb-6 text-lg">
            저는 어린 시절부터 치과가 가장 무서운 곳이었습니다. 그 두려움을 기억하기에,
            환자분이 전하는 작은 불편함 하나하나에도 귀 기울입니다.
          </p>
          <p class="text-brown-600 leading-relaxed mb-10">
            우리의 치료는 "필요한 만큼, 정직하게"라는 원칙에서 시작합니다.
            꼭 필요한 치료만 권하고, 평생 함께 갈 수 있는 치아를 만들어 드립니다.
          </p>
          <a href="/mission" class="link-underline display text-xl italic text-brown-900">
            우리의 이야기 전체 보기 →
          </a>
        </div>
        <div class="fade-in grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="aspect-[3/4] placeholder-img rounded-2xl"><i class="fas fa-heart"></i></div>
            <div class="aspect-square placeholder-img rounded-2xl"><i class="fas fa-user-md"></i></div>
          </div>
          <div class="space-y-4 pt-12">
            <div class="aspect-square placeholder-img rounded-2xl"><i class="fas fa-hands-holding"></i></div>
            <div class="aspect-[3/4] placeholder-img rounded-2xl"><i class="fas fa-smile"></i></div>
          </div>
        </div>
      </div>
    </section>

    {/* CORE TREATMENTS */}
    <section class="py-32 bg-cream">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center mb-20 fade-in">
          <div class="section-label mb-6">SIGNATURE TREATMENT</div>
          <h2 class="section-title">
            우리가 <em class="italic text-brown-700">가장 잘하는</em> 세 가지
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          {[
            { slug: 'implant', name: '수면임플란트', tagline: '공포 없는 임플란트', icon: 'fa-bed', num: '01' },
            { slug: 'lamineer', name: '라미네이트', tagline: '자연스러운 미소', icon: 'fa-smile-beam', num: '02' },
            { slug: 'ortho', name: '인비절라인', tagline: '투명하게, 자유롭게', icon: 'fa-grin-alt', num: '03' },
          ].map((t: any) => (
            <a href={`/treatments/${t.slug}`} class="group fade-in">
              <div class="lux-card h-full">
                <div class="flex justify-between items-start mb-12">
                  <div class="text-xs tracking-[0.3em] text-brown-400">{t.num}</div>
                  <div class="w-14 h-14 rounded-full bg-brown-100 flex items-center justify-center text-2xl text-brown-700 group-hover:bg-brown-800 group-hover:text-gold transition">
                    <i class={`fas ${t.icon}`}></i>
                  </div>
                </div>
                <h3 class="display text-3xl font-medium mb-2">{t.name}</h3>
                <p class="text-brown-600 italic display">{t.tagline}</p>
                <div class="mt-8 text-sm text-brown-700 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition">
                  자세히 보기 <i class="fas fa-arrow-right text-xs"></i>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div class="text-center mt-12 fade-in">
          <a href="/treatments" class="btn-outline magnetic">모든 진료 안내 보기</a>
        </div>
      </div>
    </section>

    {/* DOCTORS PREVIEW */}
    <section class="py-32 max-w-7xl mx-auto px-6 lg:px-10">
      <div class="flex flex-wrap justify-between items-end mb-16 gap-6 fade-in">
        <div>
          <div class="section-label mb-6">MEDICAL TEAM</div>
          <h2 class="section-title">7명의 전문 의료진</h2>
        </div>
        <a href="/doctors" class="link-underline display italic text-xl">의료진 전체 보기 →</a>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { slug: 'kim-seongju', name: '김성주', pos: '대표원장' },
          { slug: 'jung-jaeheon', name: '정재헌', pos: '진료원장' },
          { slug: 'choi-hyejung', name: '최혜정', pos: '진료원장' },
          { slug: 'han-jieun', name: '한지은', pos: '진료원장' },
          { slug: 'kim-jinduk', name: '김진덕', pos: '진료원장' },
          { slug: 'kim-sangwon', name: '김상원', pos: '진료원장' },
          { slug: 'lee-seoyoung', name: '이서영', pos: '진료원장' },
        ].map((d: any) => (
          <a href={`/doctors/${d.slug}`} class="group fade-in">
            <div class="aspect-[3/4] placeholder-img rounded-2xl mb-4 overflow-hidden group-hover:shadow-lux transition">
              <i class="fas fa-user-md"></i>
            </div>
            <div class="text-xs tracking-[0.3em] text-brown-500 mb-1">{d.pos}</div>
            <div class="display text-2xl font-medium">{d.name}</div>
          </a>
        ))}
        <a href="/doctors" class="group fade-in flex items-center justify-center aspect-[3/4] border-2 border-dashed border-brown-300 rounded-2xl hover:bg-brown-50 transition">
          <div class="text-center">
            <i class="fas fa-arrow-right text-3xl text-brown-500 mb-3"></i>
            <div class="display text-lg text-brown-700">전체 의료진</div>
          </div>
        </a>
      </div>
    </section>

    {/* DIFFERENTIATORS */}
    <section class="py-32 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:400px;height:400px;background:#c9a876;top:10%;right:-100px;opacity:0.2;"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div class="text-center mb-20 fade-in">
          <div class="section-label mb-6" style="color:#c9a876;border-color:#c9a876;">WHY DAEGU365</div>
          <h2 class="section-title text-ivory">
            왜 <em class="italic text-gold">대구365치과</em>인가
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-12">
          {[
            { icon: 'fa-layer-group', title: '분야별 협진 시스템', desc: '보존·치주·소아·교정 전문가가 함께 케이스를 설계합니다.' },
            { icon: 'fa-syringe', title: '단계별 무통마취', desc: '가글 → 도포 → 무통마취기 → 본마취. 주사의 공포를 없앴습니다.' },
            { icon: 'fa-heart', title: '공감에서 출발', desc: '공포증을 아는 의사가, 당신의 속도에 맞춥니다.' },
          ].map((f: any) => (
            <div class="fade-in">
              <div class="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold text-2xl mb-8">
                <i class={`fas ${f.icon}`}></i>
              </div>
              <h3 class="display text-2xl font-medium mb-4">{f.title}</h3>
              <p class="text-brown-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CONTENT QUICKLINKS */}
    <section class="py-32 max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid md:grid-cols-2 gap-6">
        <a href="/before-after" class="group fade-in relative aspect-[16/10] rounded-3xl overflow-hidden">
          <div class="absolute inset-0 placeholder-img">
            <i class="fas fa-images"></i>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-10 text-ivory">
            <div class="text-xs tracking-[0.3em] text-gold mb-4">BEFORE & AFTER</div>
            <h3 class="display text-4xl mb-3">치료 사례</h3>
            <p class="opacity-80">실제 진행된 치료 결과를 확인해 보세요.</p>
          </div>
        </a>
        <a href="/blog" class="group fade-in relative aspect-[16/10] rounded-3xl overflow-hidden">
          <div class="absolute inset-0 placeholder-img">
            <i class="fas fa-feather"></i>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-10 text-ivory">
            <div class="text-xs tracking-[0.3em] text-gold mb-4">JOURNAL</div>
            <h3 class="display text-4xl mb-3">블로그</h3>
            <p class="opacity-80">의료진이 직접 쓰는 치과 이야기.</p>
          </div>
        </a>
      </div>
    </section>

    {/* CTA */}
    <section class="py-32 bg-cream">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div class="section-label mb-6 fade-in">CONTACT</div>
        <h2 class="section-title mb-8 fade-in">
          <em class="italic text-brown-700">지금 바로</em><br/>
          상담을 예약하세요
        </h2>
        <p class="text-brown-700 text-lg mb-12 fade-in">
          월·목 21시까지 · 토·일 진료 · 전화 한 통이면 충분합니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4 fade-in">
          <a href="tel:053-357-0365" class="btn-primary magnetic text-base py-5 px-10">
            <i class="fas fa-phone"></i> 053-357-0365
          </a>
          <a href="/directions" class="btn-outline magnetic text-base py-5 px-10">
            오시는 길
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </>
)
