import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 심미치료 풀볼륨 v1
   - 통합 심미: 라미네이트·미백·아이콘·심미보철·잇몸성형
   ============================================================ */

const PROGRAMS = [
  { icon: 'fa-tooth', title: 'VINIQUE 라미네이트', desc: '0.3mm 박편 보철. 자연치 삭제 최소화한 프리미엄 심미.', link: '/treatments/lamineer' },
  { icon: 'fa-wand-magic-sparkles', title: '전문가 미백', desc: '깎지 않고 자연치 톤만 밝힙니다. 1·2·3회 패키지.', link: '/treatments/whitening' },
  { icon: 'fa-spray-can', title: '아이콘 침투 레진', desc: '교정 후 흰 반점·초기 변색을 비삭제로 제거. DMG ICON.', link: '/treatments/icon-resin' },
  { icon: 'fa-crown', title: '심미 보철', desc: '지르코니아 크라운으로 자연치와 일체감 있게 마무리.', link: '/treatments/prosthetic' },
  { icon: 'fa-grip-lines', title: '인비절라인', desc: '투명교정으로 치열까지 다듬어 진정한 미소 라인.', link: '/treatments/ortho' },
  { icon: 'fa-spa', title: '잇몸 라인 케어', desc: '잇몸 비대칭·검은 잇몸·과노출 잇몸을 정밀 조정.', link: null },
]

const PROCESS = [
  { step: '01', name: '심미 진단', desc: '얼굴·미소·치열을 종합적으로 분석. 디지털 시뮬레이션.' },
  { step: '02', name: '톤·형태 설계', desc: 'VITA 색상 매칭 + 디자인 미러. 결과를 미리 확인.' },
  { step: '03', name: '단계별 시술', desc: '미백 → 아이콘 → 라미네이트/보철 순서로 자연치를 최대한 보존.' },
  { step: '04', name: '교합·기능 점검', desc: '심미만이 아닌 씹는 힘·발음까지 균형 있게 마무리.' },
  { step: '05', name: '최종 마무리', desc: '연마·광택·미세 조정. 자연치와 일체화된 결과.' },
  { step: '06', name: '유지 관리', desc: '6개월 정기 검진으로 톤 유지·마진 점검. 평생 케어.' },
]

const PHILOSOPHY = [
  { icon: 'fa-shield-heart', title: '보존 우선', desc: '깎지 않을 수 있다면 깎지 않습니다. 미백·아이콘 → 라미네이트 순.' },
  { icon: 'fa-balance-scale', title: '심미 + 기능', desc: '예쁜 것만으로는 부족. 씹기·발음까지 완성되어야 진짜 심미.' },
  { icon: 'fa-eye', title: '디지털 시뮬레이션', desc: 'iTero 5D + 디자인 미러로 결과를 미리 확인하고 조정.' },
  { icon: 'fa-user-md', title: '맞춤 설계', desc: '얼굴·성별·직업·라이프스타일에 따른 톤·형태 개인화.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '어떤 시술부터 시작해야 하나요?', answer: '대부분 미백 → 아이콘 → 라미네이트/보철 순서. 자연치를 가장 적게 깎는 단계부터 진행합니다.', category: 'aesthetic', order: 1 },
  { id: '2', question: '결과를 미리 볼 수 있나요?', answer: '네. iTero 5D 스캔과 디자인 미러로 시뮬레이션 결과를 미리 확인하고 환자가 원하는 방향으로 조정합니다.', category: 'aesthetic', order: 2 },
  { id: '3', question: '비용은 어느 정도?', answer: '시술 조합에 따라 차이. 미백 15만원~, 아이콘 25만원~, 라미네이트 60만원~/치, 지르코니아 50만원~/치. 통합 견적은 상담 안내.', category: 'aesthetic', order: 3 },
  { id: '4', question: '얼마나 자연스러운가요?', answer: '인접 자연치와 색·투명도·형태가 일체화된 결과를 목표합니다. 원내 디지털 기공실에서 직접 색상 매칭.', category: 'aesthetic', order: 4 },
  { id: '5', question: '얼마나 유지되나요?', answer: '미백 1~2년, 아이콘 반영구, 라미네이트·보철 평균 10~15년 이상. 6개월 정기 관리로 평생 사용 가능.', category: 'aesthetic', order: 5 },
  { id: '6', question: '잇몸 라인도 조정 가능한가요?', answer: '네. 잇몸 비대칭·과노출 잇몸·색소 침착도 정밀 시술 가능. 상담 시 적응증 확인합니다.', category: 'aesthetic', order: 6 },
  { id: '7', question: '진료 기간은?', answer: '단순 미백 1~3주, 라미네이트 2~3주, 통합 케이스 1~3개월. 디자인 시뮬레이션 단계가 결과 만족도를 결정합니다.', category: 'aesthetic', order: 7 },
  { id: '8', question: '치아 외에 미소도 바뀔까요?', answer: '치아 톤·형태·치열·잇몸 라인이 동시에 정돈되면 미소 자체의 인상이 달라집니다. 얼굴 비례까지 고려한 통합 디자인.', category: 'aesthetic', order: 8 },
]

export const AestheticTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">AESTHETIC · 심미치료</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            예쁜 치아가 아닌,<br/><span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">예쁜 미소.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            라미네이트 · 미백 · 아이콘 · 심미보철의 통합 설계.<br/>
            얼굴 비례까지 고려한 디지털 시뮬레이션.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#programs" class="btn-outline-ivory">심미 프로그램 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">통합</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">미백·아이콘·보철</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">시뮬</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">결과 사전 확인</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">In-house</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">원내 색상 매칭</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">보존</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">우선 원칙</div></div>
          </div>
        </div>
      </section>


      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("aesthetic")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">심미는,<br/><span class="t-gold italic">조화의 기술</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                치아 하나만 새하얀 것은 아름답지 않습니다. <strong class="t-gold">얼굴·치열·잇몸 라인의 균형</strong>이 함께 잡혀야 진짜 심미예요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                대구365치과는 미백·아이콘·라미네이트·심미보철·교정·잇몸 케어를 통합 설계합니다. 자연치를 최대한 보존하면서, 얼굴 비례에 맞춘 디자인으로 미소 자체를 다듬어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PROGRAMS · 02</div><h2 class="t-display">심미 <span class="t-gold italic">6프로그램.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p) => (
              p.link ? (
                <a href={p.link} class="block p-7 rounded-xl bg-ivory border border-brown-200 hover:border-gold">
                  <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${p.icon}`}></i></div>
                  <h3 class="t-display text-lg mb-2">{p.title}</h3>
                  <p class="text-sm text-brown-700 mb-3">{p.desc}</p>
                  <span class="text-xs t-gold uppercase tracking-wider">자세히 →</span>
                </a>
              ) : (
                <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                  <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${p.icon}`}></i></div>
                  <h3 class="t-display text-lg mb-2">{p.title}</h3>
                  <p class="text-sm text-brown-700">{p.desc}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PHILOSOPHY · 03</div><h2 class="t-display">우리의 <span class="t-gold italic">원칙.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PHILOSOPHY.map((p) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${p.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{p.title}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PROCESS · 04</div><h2 class="t-display">심미 디자인 <span class="t-gold italic">6단계.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="t-gold text-3xl font-black mb-3">{p.step}</div>
                <h3 class="t-display text-xl mb-2">{p.name}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">DOCTORS · 05</div><h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2></div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((d) => (
                <a href={`/doctors/${d.id}`} class="block p-7 rounded-xl bg-cream border border-brown-200 hover:border-gold">
                  <div class="w-16 h-16 rounded-full bg-brown-950 text-gold flex items-center justify-center mb-5 text-2xl"><i class="fas fa-user-md"></i></div>
                  <h3 class="t-display text-xl mb-1">{d.name}</h3>
                  <div class="text-sm text-brown-500">{d.position || ''}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">CASES · 06</div><h2 class="t-display">실제 케이스</h2></div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.slice(0, 6).map((c) => (
                <a href={`/before-after/${c.id}`} class="block group">
                  <div class="aspect-[4/3] rounded-xl overflow-hidden bg-brown-950 mb-4 relative">
                    {c.before_image && <img src={c.before_image} alt={c.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform"/>}
                    <div class="absolute top-3 left-3 text-[10px] tracking-[0.25em] font-bold text-ivory bg-brown-950/80 px-3 py-1 rounded-full">CASE</div>
                  </div>
                  <h3 class="t-display text-base mb-1">{c.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">FAQ · 07</div><h2 class="t-display">자주 묻는 질문</h2></div>
          <div class="space-y-3">
            {faqs.map((f) => (
              <details class="group p-6 rounded-xl bg-cream border border-brown-200">
                <summary class="flex justify-between items-center cursor-pointer">
                  <span class="t-display text-base lg:text-lg pr-4">{f.question}</span>
                  <i class="fas fa-plus text-gold group-open:rotate-45 transition-transform"></i>
                </summary>
                <p class="mt-4 text-brown-700 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 08</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            치아가 아닌,<br/><span class="italic" style="color:#c9a876;">미소를 디자인합니다.</span>
          </h2>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="/directions" class="btn-outline-ivory">오시는 길</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
