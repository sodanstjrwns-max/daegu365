import { Navbar, Footer } from '../components/Layout'

export const MissionPage = () => (
  <>
    <Navbar />

    {/* HERO FULL-BLEED */}
    <section class="relative min-h-[100vh] flex items-center justify-center bg-brown-950 text-ivory overflow-hidden">
      <div class="blob" style="width:800px;height:800px;background:#c9a876;top:-20%;left:-10%;opacity:0.25;"></div>
      <div class="blob" style="width:700px;height:700px;background:#8a6235;bottom:-20%;right:-10%;opacity:0.3;animation-delay:-8s;"></div>

      <div class="relative max-w-5xl mx-auto px-6 text-center">
        <div class="text-xs tracking-[0.4em] text-gold mb-12 fade-in">OUR MISSION</div>
        <h1 class="display text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.95] mb-12 fade-in">
          <span class="block">치과가</span>
          <span class="block italic text-gold">무서웠던</span>
          <span class="block">한 의사의</span>
          <span class="block italic">다짐</span>
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

    {/* STORY CHAPTER 1 */}
    <section class="py-32 max-w-5xl mx-auto px-6">
      <div class="grid md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-3 fade-in">
          <div class="section-label">CHAPTER 1</div>
        </div>
        <div class="md:col-span-9 fade-in">
          <h2 class="display text-4xl md:text-5xl font-light leading-tight mb-8">
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

    {/* STORY CHAPTER 2 */}
    <section class="py-32 max-w-5xl mx-auto px-6">
      <div class="grid md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-3 fade-in">
          <div class="section-label">CHAPTER 2</div>
        </div>
        <div class="md:col-span-9 fade-in">
          <h2 class="display text-4xl md:text-5xl font-light leading-tight mb-8">
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

    {/* 3 VALUES */}
    <section class="py-32 bg-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20 fade-in">
          <div class="section-label mb-6">3 VALUES</div>
          <h2 class="section-title">우리의 <em class="italic text-brown-700">세 가지</em> 가치</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          {[
            { num: '01', title: '공감', en: 'EMPATHY', desc: '환자분의 두려움을 정확히 이해합니다. 치과공포증을 가졌던 사람만이 할 수 있는 섬세한 배려.' },
            { num: '02', title: '섬세함', en: 'DELICACY', desc: '작은 불편함 하나도 놓치지 않습니다. 눈빛과 손끝에 집중합니다.' },
            { num: '03', title: '안심', en: 'TRUST', desc: '이해하실 때까지 설명하고, 동의하실 때에만 치료합니다. 과잉도 축소도 없습니다.' },
          ].map((v: any) => (
            <div class="lux-card fade-in">
              <div class="text-xs tracking-[0.3em] text-brown-400 mb-8">{v.num} · {v.en}</div>
              <div class="display text-5xl font-light text-brown-900 mb-6 italic">{v.title}</div>
              <p class="text-brown-700 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* MISSION STATEMENT */}
    <section class="py-40 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.15;"></div>
      <div class="max-w-4xl mx-auto px-6 text-center relative">
        <div class="text-xs tracking-[0.4em] text-gold mb-8 fade-in">OUR MISSION</div>
        <h2 class="display text-4xl md:text-6xl font-light leading-tight fade-in">
          <em class="italic">"치과 진입의 허들을 낮추고</em><br/>
          <em class="italic">경험의 혁신을 이룩한다."</em>
        </h2>
        <div class="mt-16 display italic text-gold text-xl fade-in">— 김성주 대표원장</div>
      </div>
    </section>

    {/* CTA */}
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
