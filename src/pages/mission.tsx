import { Navbar, Footer } from '../components/Layout'

export const MissionPage = () => (
  <>
    <Navbar />

    {/* ================================================== */}
    {/* 1. HERO — 치과가 무서웠던 한 의사의 다짐               */}
    {/* ================================================== */}
    <section class="relative min-h-[100vh] flex items-center justify-center bg-brown-950 text-ivory overflow-hidden">
      <div class="blob" style="width:800px;height:800px;background:#c9a876;top:-20%;left:-10%;opacity:0.22;"></div>
      <div class="blob" style="width:700px;height:700px;background:#8a6235;bottom:-20%;right:-10%;opacity:0.28;animation-delay:-8s;"></div>

      <div class="relative max-w-5xl mx-auto px-6 text-center">
        <div class="text-xs tracking-[0.4em] text-gold mb-12 fade-in">PHILOSOPHY · MISSION · VISION · VALUE</div>
        <h1 class="display text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight leading-[0.95] mb-12 fade-in text-ivory">
          <span class="block text-ivory">치과가</span>
          <span class="block italic text-gold">무서웠던</span>
          <span class="block text-ivory">한 의사의</span>
          <span class="block italic text-ivory">다짐</span>
        </h1>
        <p class="text-brown-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed fade-in">
          치과공포증을 가졌던 사람으로서,<br/>
          치과공포증 환자를 위한 치과를 만들고 싶었습니다.
        </p>
        <div class="mt-20 fade-in">
          <div class="inline-block animate-bounce">
            <i class="fas fa-chevron-down text-gold"></i>
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 2. CHAPTER 1 — 저도 치과가 무서웠습니다                */}
    {/* ================================================== */}
    <section class="py-32 max-w-5xl mx-auto px-6">
      <div class="grid md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-3 fade-in">
          <div class="section-label">CHAPTER 1</div>
        </div>
        <div class="md:col-span-9 fade-in">
          <h2 class="display text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
            저도 치과가<br/><em class="italic text-brown-700">무서웠습니다.</em>
          </h2>
          <div class="prose-dental text-brown-700 text-lg leading-relaxed space-y-6">
            <p>
              어릴 적부터 치과 의자에 앉는 것이 세상에서 가장 두려운 일이었습니다.
              '치- 치- 치-' 드릴 소리, 마스크 너머의 차가운 눈빛, 뭔지 모르는 기구들.
              공포는 미루기를 만들었고, 미루기는 더 큰 치료를 불렀습니다.
            </p>
            <p>
              치과의사가 된 후에도 저는 그 감각을 잊지 않았습니다.
              오히려 그 경험이 지금의 저를 만들었습니다. 지금도 저는 진료실 문 앞에서 긴장하는
              환자분들의 마음을 <span class="italic display text-brown-600">정확히</span> 읽습니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px max-w-5xl mx-auto bg-brown-200"></div>

    {/* ================================================== */}
    {/* 3. CHAPTER 2 — 그래서 다르게 만들기로 했습니다         */}
    {/* ================================================== */}
    <section class="py-32 max-w-5xl mx-auto px-6">
      <div class="grid md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-3 fade-in">
          <div class="section-label">CHAPTER 2</div>
        </div>
        <div class="md:col-span-9 fade-in">
          <h2 class="display text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
            그래서 저는<br/><em class="italic text-brown-700">다르게 만들기로</em> 했습니다.
          </h2>
          <div class="prose-dental text-brown-700 text-lg leading-relaxed space-y-6">
            <p>
              환자가 전하는 작은 불편함 하나까지, 부드러운 말투로 진심을 다해 소통합니다.
              충분히 이해하고 안심하실 때까지 설명해 드립니다. 환자의 상황에 공감하며,
              <strong>꼭 필요한, 정직한 치료 계획</strong>만을 제시합니다.
            </p>
            <p class="display italic text-2xl text-brown-900 py-4 border-l-4 border-gold pl-6 my-8">
              "의료진보다 인터넷 정보를 더 신뢰하며 무리한 진료를 요구하는 분,
              저수가치과와 비교하며 무리한 할인을 요구하는 분은 정중히 사양합니다.
              대신, 신뢰와 소통을 중시하는 분께는 최선을 다합니다."
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 4. MISSION — 디지털기공 쇼룸                          */}
    {/* ================================================== */}
    <section class="relative min-h-[100vh] flex items-center bg-brown-950 text-ivory overflow-hidden">
      {/* 풀블리드 이미지 */}
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image:url('/static/images/clinic/dlab-studio-365.jpg');"
      ></div>
      {/* 그라디언트 오버레이 (좌측 텍스트 가독성 확보) */}
      <div class="absolute inset-0" style="background:linear-gradient(90deg, rgba(28,18,11,0.95) 0%, rgba(28,18,11,0.78) 40%, rgba(28,18,11,0.25) 100%);"></div>

      <div class="relative w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-center py-32">
        <div class="lg:col-span-7 lg:col-start-1">
          <div class="text-xs tracking-[0.5em] text-gold mb-8 fade-in">01 · MISSION</div>
          <div class="text-[7rem] md:text-[10rem] font-black leading-[0.85] mb-10 fade-in display italic" style="color:transparent;-webkit-text-stroke:2px #c9a876;">
            Mission
          </div>
          <h2 class="display text-3xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.15] mb-10 fade-in text-ivory">
            <span class="text-ivory">치과를 두려워하는 환자가</span><br/>
            <span class="text-ivory">불안 없이 병원 문을 열 수 있도록,</span><br/>
            <em class="italic text-gold">진입의 허들을 낮추고<br/>
            치과경험의 혁신</em><span class="text-ivory">을 이룩한다.</span>
          </h2>
          <div class="text-xs tracking-[0.3em] text-brown-300 fade-in">
            <i class="fas fa-camera mr-2 text-gold"></i>
            대구365치과 디지털기공 SHOW ROOM
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 5. VISION — 메인 사이니지                            */}
    {/* ================================================== */}
    <section class="bg-cream py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          {/* 좌: 이미지 */}
          <div class="lg:col-span-6 fade-in">
            <div class="relative overflow-hidden rounded-sm">
              <img
                src="/static/images/clinic/clinic-entrance.jpg"
                alt="대구365치과 대기실 메인 사이니지"
                class="w-full h-[640px] object-cover hover:scale-105 transition-transform duration-[1200ms]"
                loading="lazy"
              />
              <div class="absolute bottom-6 left-6 text-xs tracking-[0.3em] text-ivory/90 bg-brown-950/60 px-4 py-2">
                <i class="fas fa-camera mr-2 text-gold"></i>
                대기실 메인 사이니지
              </div>
            </div>
          </div>

          {/* 우: 비전 */}
          <div class="lg:col-span-6 fade-in">
            <div class="text-xs tracking-[0.5em] text-gold mb-8">02 · VISION</div>
            <div class="text-[7rem] md:text-[10rem] font-black leading-[0.85] mb-10 display italic" style="color:transparent;-webkit-text-stroke:2px #2c1f14;">
              Vision
            </div>
            <h2 class="display text-3xl md:text-5xl font-black tracking-tight leading-[1.15] text-brown-950 mb-10">
              치과가 두려운 사람들에게<br/>
              <em class="italic text-brown-700">대구에서 가장 먼저</em><br/>
              떠오르는<br/>
              <em class="italic text-gold">'안심과 신뢰의 상징'</em><br/>
              치과가 되는 것.
            </h2>
            <div class="h-px w-24 bg-gold mb-6"></div>
            <p class="text-brown-700 leading-relaxed">
              브랜드는 한 줄로 기억됩니다. 우리는 '대구에서 무서움 없는 치과'라는 단 한 줄로
              떠올려지길 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 6. CORE VALUE — VIP ROOM                            */}
    {/* ================================================== */}
    <section class="relative bg-brown-950 text-ivory overflow-hidden">
      {/* 상단 풀블리드 이미지 (높이 60vh) */}
      <div class="relative h-[60vh] overflow-hidden">
        <img
          src="/static/images/clinic/vip-treatment-walnut.jpg"
          alt="대구365치과 VIP room"
          class="w-full h-full object-cover"
          style="animation: kenburns 24s ease-in-out infinite alternate;"
        />
        <div class="absolute inset-0" style="background:linear-gradient(180deg, rgba(28,18,11,0.4) 0%, rgba(28,18,11,0.15) 50%, rgba(28,18,11,1) 100%);"></div>
        <div class="absolute bottom-8 right-8 text-xs tracking-[0.3em] text-ivory/90">
          <i class="fas fa-camera mr-2 text-gold"></i>
          VIP ROOM
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-32">
        <div class="text-center mb-16 fade-in">
          <div class="text-xs tracking-[0.5em] text-gold mb-8">03 · CORE VALUE</div>
          <div class="text-[6rem] md:text-[9rem] font-black leading-[0.85] mb-6 display italic" style="color:transparent;-webkit-text-stroke:2px #c9a876;">
            Core Value
          </div>
          <p class="text-brown-300 max-w-2xl mx-auto">
            세 가지 가치는 순서대로 작동합니다 — 감정에서 시작해, 경험을 완성하고, 결합으로 이어집니다.
          </p>
        </div>

        {/* 3 VALUES — PPTX 1:1 */}
        <div class="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: '공감',
              en: 'EMPATHY',
              stage: '감정의 시작',
              desc: '두려움을 가볍게 여기지 않습니다. 환자의 마음에서 출발하는 것이 모든 진료의 첫 단추입니다.',
              icon: 'fa-heart'
            },
            {
              num: '02',
              title: '섬세함',
              en: 'DELICACY',
              stage: '경험의 완성',
              desc: '작은 디테일까지 진심을 담습니다. 보이지 않는 곳에서 결정되는 것이 진짜 차이입니다.',
              icon: 'fa-feather'
            },
            {
              num: '03',
              title: '안심',
              en: 'TRUST',
              stage: '감정과 경험의 결합',
              desc: '마음 놓고 진료받을 수 있도록, 처음부터 끝까지 배려합니다. 결국 남는 것은 안도감입니다.',
              icon: 'fa-shield-halved'
            },
          ].map((v: any) => (
            <div class="relative bg-brown-900/80 backdrop-blur border border-brown-800 p-10 rounded-sm hover:border-gold transition-all duration-500 fade-in group">
              {/* Top label */}
              <div class="flex items-center justify-between mb-10">
                <div class="text-xs tracking-[0.3em] text-brown-400">{v.num}</div>
                <i class={`fas ${v.icon} text-gold text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}></i>
              </div>

              {/* Title */}
              <div class="display text-6xl font-black tracking-tight italic text-ivory mb-3 group-hover:text-gold transition-colors duration-500">
                {v.title}
              </div>
              <div class="text-xs tracking-[0.4em] text-gold mb-2">{v.en}</div>
              <div class="text-xs text-brown-400 mb-8 italic">— {v.stage}</div>

              <div class="h-px w-12 bg-gold mb-6"></div>

              <p class="text-brown-200 leading-relaxed text-[15px]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 6.5 THE SPACE — 럭셔리 매거진 스타일 원내 투어         */}
    {/* ================================================== */}

    {/* OPENING SPREAD — 매거진 표지 느낌의 풀블리드 */}
    <section id="the-space" class="relative bg-ivory pt-32 pb-20 overflow-hidden scroll-mt-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-12 gap-8 items-end mb-16">
          <div class="md:col-span-7 fade-in">
            <div class="text-[10px] tracking-[0.5em] text-gold font-semibold mb-6">EDITORIAL · ISSUE 01</div>
            <h2 class="display text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-brown-950">
              The<br/>
              <em class="italic text-brown-700">Space.</em>
            </h2>
          </div>
          <div class="md:col-span-5 fade-in">
            <div class="border-t border-brown-300 pt-6">
              <p class="text-xs tracking-[0.3em] text-brown-500 mb-4">A QUIET ARCHITECTURE OF CARE</p>
              <p class="display italic text-brown-700 text-xl leading-relaxed">
                "두려움이 머무는 자리를<br/>
                고요함으로 바꾸는 일."
              </p>
              <p class="text-sm text-brown-600 mt-6 leading-relaxed">
                400평 규모의 공간을 다섯 챕터로 풀어냅니다.<br/>
                도착부터 평생관리까지, 모든 동선에 의도가 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CHAPTER I — ARRIVAL */}
    <section class="bg-ivory pb-32">
      <div class="max-w-7xl mx-auto px-6">
        {/* Chapter Header */}
        <div class="grid md:grid-cols-12 gap-8 mb-12 fade-in">
          <div class="md:col-span-2">
            <div class="display italic text-7xl md:text-8xl text-gold font-black leading-none">I.</div>
          </div>
          <div class="md:col-span-7">
            <div class="text-[10px] tracking-[0.5em] text-brown-500 mb-3">CHAPTER ONE</div>
            <h3 class="display text-4xl md:text-5xl font-black tracking-tight text-brown-950">
              Arrival<span class="text-gold">.</span>
            </h3>
            <p class="display italic text-brown-600 text-lg mt-2">도착의 순간</p>
          </div>
          <div class="md:col-span-3 flex items-end">
            <p class="text-sm text-brown-700 leading-relaxed border-l-2 border-gold pl-4">
              문을 여는 그 순간부터, 환자의 호흡이 한 박자 느려지길 바랐습니다.
            </p>
          </div>
        </div>

        {/* Hero shot — 입구 풀블리드 */}
        <div class="mb-8 fade-in">
          <div class="aspect-[16/9] overflow-hidden rounded-sm">
            <img src="/static/images/clinic/clinic-entrance.jpg" alt="대구365치과 입구"
                 class="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-1000" loading="lazy"/>
          </div>
          <div class="flex justify-between items-baseline mt-3 text-xs text-brown-500">
            <span class="tracking-[0.3em]">PLATE 01 · ENTRANCE</span>
            <span class="display italic">DAEGU 365 — Front Door</span>
          </div>
        </div>

        {/* Asymmetric grid — 로비 와이드 + 리셉션 클로즈업 */}
        <div class="grid md:grid-cols-12 gap-8 mb-16">
          <div class="md:col-span-8 fade-in">
            <div class="aspect-[16/10] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/lobby-pano.jpg" alt="대구365치과 로비 파노라마"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-xs text-brown-500 mt-3 tracking-[0.2em]">PLATE 02 · LOBBY · 곡선의 흐름이 시야의 긴장을 풀어줍니다.</p>
          </div>
          <div class="md:col-span-4 fade-in flex flex-col justify-between">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/reception-curve-sculpt.jpg" alt="조각적 리셉션 데스크"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="mt-4">
              <p class="display italic text-brown-700 text-lg leading-snug">"건축이 곧, 첫 인사가 됩니다."</p>
              <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-2">PLATE 03 · RECEPTION</p>
            </div>
          </div>
        </div>

        {/* Editorial 3-up — 4가지 약속, 아트, 와이드 로비 */}
        <div class="grid md:grid-cols-3 gap-6 mb-16">
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/promise-wall-burgundy.jpg" alt="대구365치과의 4가지 약속"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 04</p>
            <p class="display italic text-brown-700 mt-1">4가지 약속</p>
          </div>
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/art-niche-portrait.jpg" alt="아트 니치 — 컨템포러리 페인팅"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 05</p>
            <p class="display italic text-brown-700 mt-1">Art Niche</p>
          </div>
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/lobby-reception-wide.jpg" alt="로비 와이드 뷰"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 06</p>
            <p class="display italic text-brown-700 mt-1">Wide View</p>
          </div>
        </div>
      </div>
    </section>

    {/* CHAPTER II — PRECISION (다크 톤 인터미션) */}
    <section class="bg-brown-950 text-ivory py-32 relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:10%;right:-15%;opacity:0.15;"></div>

      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="grid md:grid-cols-12 gap-8 mb-12 fade-in">
          <div class="md:col-span-2">
            <div class="display italic text-7xl md:text-8xl text-gold font-black leading-none">II.</div>
          </div>
          <div class="md:col-span-7">
            <div class="text-[10px] tracking-[0.5em] text-gold mb-3">CHAPTER TWO</div>
            <h3 class="display text-4xl md:text-5xl font-black tracking-tight text-ivory">
              Precision<span class="text-gold">.</span>
            </h3>
            <p class="display italic text-brown-300 text-lg mt-2">정밀의 영역</p>
          </div>
          <div class="md:col-span-3 flex items-end">
            <p class="text-sm text-brown-200 leading-relaxed border-l-2 border-gold pl-4">
              D.LAB · 임플란트 수술센터 · 안전 동선. 보이지 않는 곳에서 완성도가 결정됩니다.
            </p>
          </div>
        </div>

        {/* Magazine spread — D.LAB 풀폭 */}
        <div class="mb-12 fade-in">
          <div class="aspect-[16/8] overflow-hidden rounded-sm">
            <img src="/static/images/clinic/dlab-window.jpg" alt="D.LAB STUDIO 365"
                 class="w-full h-full object-cover" loading="lazy"/>
          </div>
          <div class="flex justify-between items-baseline mt-3 text-xs text-brown-400">
            <span class="tracking-[0.3em]">PLATE 07 · D.LAB STUDIO 365</span>
            <span class="display italic">In-house Digital Laboratory</span>
          </div>
        </div>

        {/* 2-column quote spread */}
        <div class="grid md:grid-cols-12 gap-8 mb-12">
          <div class="md:col-span-5 fade-in flex flex-col justify-center">
            <div class="text-gold text-5xl mb-6"><i class="fas fa-quote-left"></i></div>
            <p class="display text-2xl md:text-3xl italic leading-relaxed text-ivory">
              "기공실을 <span class="text-gold">유리벽 안</span>으로 들였습니다.<br/>
              환자의 보철은 환자의 시야 안에서 만들어집니다."
            </p>
            <p class="text-xs tracking-[0.3em] text-brown-400 mt-8">— DESIGN PHILOSOPHY</p>
          </div>
          <div class="md:col-span-7 fade-in">
            <div class="aspect-[4/3] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/dlab-studio-365.jpg" alt="D.LAB 라운지"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 08 · LAB LOUNGE</p>
          </div>
        </div>

        {/* 3-up dark grid — 임플란트 수술센터 + 안전 동선 + 볼트 복도 */}
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-5 fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/implant-surgery-center.jpg" alt="임플란트 수술센터 입구"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 09 · IMPLANT SURGERY</p>
            <p class="display italic text-ivory mt-1">독립 수술센터</p>
          </div>
          <div class="md:col-span-7 fade-in flex flex-col gap-6">
            <div class="aspect-[16/9] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/safety-corridor.jpg" alt="안전 동선 — Solution safety matter"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="aspect-[16/9] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/vault-corridor.jpg" alt="볼트형 천장 복도"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 10 · 11 · SAFETY · VAULT</p>
          </div>
        </div>
      </div>
    </section>

    {/* CHAPTER III — CARE (화이트 톤 복귀) */}
    <section class="bg-cream py-32 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-12 gap-8 mb-12 fade-in">
          <div class="md:col-span-2">
            <div class="display italic text-7xl md:text-8xl text-gold font-black leading-none">III.</div>
          </div>
          <div class="md:col-span-7">
            <div class="text-[10px] tracking-[0.5em] text-brown-500 mb-3">CHAPTER THREE</div>
            <h3 class="display text-4xl md:text-5xl font-black tracking-tight text-brown-950">
              Care<span class="text-gold">.</span>
            </h3>
            <p class="display italic text-brown-600 text-lg mt-2">진료의 시간</p>
          </div>
          <div class="md:col-span-3 flex items-end">
            <p class="text-sm text-brown-700 leading-relaxed border-l-2 border-gold pl-4">
              개별 진료실 · VIP룸 · 상담실. 모든 의자에 사적인 거리가 있습니다.
            </p>
          </div>
        </div>

        {/* Hero — 진료실 풀폭 */}
        <div class="mb-8 fade-in">
          <div class="aspect-[16/9] overflow-hidden rounded-sm">
            <img src="/static/images/clinic/treatment-rooms.jpg" alt="개별 진료실"
                 class="w-full h-full object-cover" loading="lazy"/>
          </div>
          <div class="flex justify-between items-baseline mt-3 text-xs text-brown-500">
            <span class="tracking-[0.3em]">PLATE 12 · TREATMENT ROOMS</span>
            <span class="display italic">Independent Bays</span>
          </div>
        </div>

        {/* Editorial 2-up — 유닛체어 + 다크 시그니처 룸 */}
        <div class="grid md:grid-cols-2 gap-6 mb-16">
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/unit-chair-bright.jpg" alt="밝은 톤 유닛체어"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="flex justify-between items-baseline mt-3">
              <span class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 13</span>
              <span class="display italic text-brown-700 text-sm">Bright Operatory</span>
            </div>
          </div>
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/vip-room-dark-ceiling.jpg" alt="VIP 다크 시그니처 룸"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="flex justify-between items-baseline mt-3">
              <span class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 14</span>
              <span class="display italic text-brown-700 text-sm">Signature Suite</span>
            </div>
          </div>
        </div>

        {/* VIP triptych — 매거진식 3분할 */}
        <div class="grid md:grid-cols-12 gap-6 mb-16">
          <div class="md:col-span-4 fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/vip-corridor-tiffany.jpg" alt="VIP 복도 — 티파니 블루 액센트"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 15 · VIP CORRIDOR</p>
          </div>
          <div class="md:col-span-5 fade-in">
            <div class="aspect-[4/3] overflow-hidden rounded-sm mb-4">
              <img src="/static/images/clinic/vip-treatment-walnut.jpg" alt="VIP 진료실 — 월넛 우드"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="display italic text-brown-700 text-lg leading-snug">
              "VVIP · VIP1 · VIP2.<br/>
              <span class="text-brown-500 text-sm not-italic">세 개의 독립 스위트가 있습니다.</span>"
            </p>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 16 · VIP TREATMENT</p>
          </div>
          <div class="md:col-span-3 fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/consult-room-03.jpg" alt="03 상담실"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 17 · CONSULT 03</p>
            <p class="display italic text-brown-700 text-sm mt-1">"치료보다 먼저, 마음부터"</p>
          </div>
        </div>

        {/* Wide spread — 아치 글래스 룸 */}
        <div class="fade-in">
          <div class="aspect-[16/8] overflow-hidden rounded-sm">
            <img src="/static/images/clinic/arch-glass-rooms.jpg" alt="아치형 유리 진료실 군"
                 class="w-full h-full object-cover" loading="lazy"/>
          </div>
          <div class="flex justify-between items-baseline mt-3 text-xs text-brown-500">
            <span class="tracking-[0.3em]">PLATE 18 · ARCH GLASS ROOMS</span>
            <span class="display italic">Daylight + Privacy</span>
          </div>
        </div>
      </div>
    </section>

    {/* CHAPTER IV — LIFETIME (밝은 화이트, 평생관리) */}
    <section class="bg-ivory py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-12 gap-8 mb-12 fade-in">
          <div class="md:col-span-2">
            <div class="display italic text-7xl md:text-8xl text-gold font-black leading-none">IV.</div>
          </div>
          <div class="md:col-span-7">
            <div class="text-[10px] tracking-[0.5em] text-brown-500 mb-3">CHAPTER FOUR</div>
            <h3 class="display text-4xl md:text-5xl font-black tracking-tight text-brown-950">
              Lifetime<span class="text-gold">.</span>
            </h3>
            <p class="display italic text-brown-600 text-lg mt-2">평생의 관리</p>
          </div>
          <div class="md:col-span-3 flex items-end">
            <p class="text-sm text-brown-700 leading-relaxed border-l-2 border-gold pl-4">
              EMS AIRFLOW ZONE. 치료가 끝난 자리에서 평생관리가 시작됩니다.
            </p>
          </div>
        </div>

        {/* 60/40 split — 입구 + 내부 */}
        <div class="grid md:grid-cols-5 gap-6 mb-8">
          <div class="md:col-span-3 fade-in">
            <div class="aspect-[4/5] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/airflow-zone-entrance.jpg" alt="평생치아관리센터 입구"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 19 · AIRFLOW ZONE ENTRANCE</p>
          </div>
          <div class="md:col-span-2 fade-in flex flex-col gap-6">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/airflow-zone.jpg" alt="EMS 에어플로우 진료 부스"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div>
              <p class="display italic text-brown-700 text-lg leading-snug">
                "EMS Airflow.<br/>
                국내 정상급 평생관리 시스템."
              </p>
              <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 20</p>
            </div>
          </div>
        </div>

        {/* 2-up wide — 평생관리 복도 + 곡선 복도 */}
        <div class="grid md:grid-cols-2 gap-6 fade-in">
          <div>
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/lifetime-care-corridor.jpg" alt="평생관리센터 복도"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 21 · CARE CORRIDOR</p>
          </div>
          <div>
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/corridor-arch-light.jpg" alt="곡선 LED 복도"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p class="text-[10px] tracking-[0.3em] text-brown-400 mt-3">PLATE 22 · LIGHT CORRIDOR</p>
          </div>
        </div>
      </div>
    </section>

    {/* CHAPTER V — DETAILS (디테일, 어두운 풋노트) */}
    <section class="bg-brown-950 text-ivory py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-12 gap-8 mb-12 fade-in">
          <div class="md:col-span-2">
            <div class="display italic text-7xl md:text-8xl text-gold font-black leading-none">V.</div>
          </div>
          <div class="md:col-span-7">
            <div class="text-[10px] tracking-[0.5em] text-gold mb-3">CHAPTER FIVE</div>
            <h3 class="display text-4xl md:text-5xl font-black tracking-tight text-ivory">
              Details<span class="text-gold">.</span>
            </h3>
            <p class="display italic text-brown-300 text-lg mt-2">사소한 디테일</p>
          </div>
          <div class="md:col-span-3 flex items-end">
            <p class="text-sm text-brown-200 leading-relaxed border-l-2 border-gold pl-4">
              파우더룸 · 화장실 · 365 STUDIO. 보이지 않는 곳에서 진심이 드러납니다.
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/restroom-stone.jpg" alt="스톤 파티션 화장실"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="mt-4">
              <p class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 23 · RESTROOM</p>
              <p class="display italic text-ivory text-lg mt-1">Stone Partition</p>
            </div>
          </div>
          <div class="fade-in md:translate-y-12">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/powder-room.jpg" alt="파우더룸 — 아치 미러"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="mt-4">
              <p class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 24 · POWDER ROOM</p>
              <p class="display italic text-ivory text-lg mt-1">Arch Mirror</p>
            </div>
          </div>
          <div class="fade-in">
            <div class="aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/static/images/clinic/studio-365.jpg" alt="365 STUDIO — 포토 스튜디오"
                   class="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div class="mt-4">
              <p class="text-[10px] tracking-[0.3em] text-brown-400">PLATE 25 · 365 STUDIO</p>
              <p class="display italic text-ivory text-lg mt-1">In-house Studio</p>
            </div>
          </div>
        </div>

        {/* COLOPHON — 매거진의 마지막 페이지 */}
        <div class="mt-32 pt-16 border-t border-brown-800 grid md:grid-cols-12 gap-8 fade-in">
          <div class="md:col-span-4">
            <div class="text-[10px] tracking-[0.5em] text-gold mb-4">COLOPHON</div>
            <h4 class="display italic text-2xl text-ivory leading-snug">
              "공간은<br/>
              <span class="text-gold">치료의 일부</span>입니다."
            </h4>
          </div>
          <div class="md:col-span-4 text-sm text-brown-300 leading-relaxed">
            <p class="mb-3"><span class="text-brown-400 text-xs tracking-[0.2em] block mb-1">SCALE</span>총 400평 · 2개 층</p>
            <p class="mb-3"><span class="text-brown-400 text-xs tracking-[0.2em] block mb-1">FACILITIES</span>독립 진료실 다수 · VIP 스위트 3실 · 임플란트 수술센터 · D.LAB · EMS AIRFLOW ZONE · 365 STUDIO</p>
            <p><span class="text-brown-400 text-xs tracking-[0.2em] block mb-1">DESIGN INTENT</span>두려움 없는 진료 경험 · 사적인 거리 · 평생의 관계</p>
          </div>
          <div class="md:col-span-4 text-sm text-brown-300 leading-relaxed">
            <p class="mb-3"><span class="text-brown-400 text-xs tracking-[0.2em] block mb-1">LOCATION</span>대구광역시 · 365치과</p>
            <p class="mb-3"><span class="text-brown-400 text-xs tracking-[0.2em] block mb-1">PHILOSOPHY</span>치과 진입의 허들을 낮추고, 경험의 혁신을 이룩한다.</p>
            <a href="tel:053-357-0365" class="inline-flex items-center gap-2 text-gold hover:text-ivory transition mt-2">
              <i class="fas fa-phone text-xs"></i>
              <span class="tracking-[0.2em] text-xs">053-357-0365</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 7. SIGNATURE QUOTE — 대표원장 다짐                   */}
    {/* ================================================== */}
    <section class="py-40 bg-cream relative overflow-hidden">
      <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.18;"></div>
      <div class="max-w-4xl mx-auto px-6 text-center relative">
        <div class="text-gold text-5xl mb-8 fade-in">
          <i class="fas fa-quote-left"></i>
        </div>
        <h2 class="display text-3xl md:text-5xl font-black tracking-tight leading-tight text-brown-950 fade-in">
          <em class="italic">치과 진입의 허들을 낮추고</em><br/>
          <em class="italic text-brown-700">경험의 혁신</em>을 이룩한다.
        </h2>
        <div class="mt-16 display italic text-brown-700 text-xl fade-in">— 김성주 대표원장</div>
      </div>
    </section>

    {/* ================================================== */}
    {/* 8. CTA                                              */}
    {/* ================================================== */}
    <section class="py-32 max-w-4xl mx-auto px-6 text-center">
      <h2 class="section-title mb-8 fade-in">
        당신의 <em class="italic text-brown-700">두려움</em>,<br/>이제 저희가 함께 합니다
      </h2>
      <p class="text-brown-700 text-lg mb-12 fade-in">
        상담은 전화 한 통이면 충분합니다. 편하게, 언제든 연락 주세요.
      </p>
      <div class="flex flex-wrap justify-center gap-4 fade-in">
        <a href="tel:053-357-0365" class="btn-primary magnetic text-base py-5 px-10">
          <i class="fas fa-phone"></i> 053-357-0365
        </a>
        <a href="/doctors/kim-seongju" class="btn-outline magnetic text-base py-5 px-10">
          대표원장 만나기
        </a>
      </div>
    </section>

    <Footer />
  </>
)
