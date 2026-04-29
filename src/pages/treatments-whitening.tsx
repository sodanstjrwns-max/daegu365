import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 전문가 미백 풀볼륨 상세 페이지 v1
   - 1회 / 2회 / 3회 패키지
   - 셀프 미백 vs 전문가 미백
   ============================================================ */

const PACKAGES = [
  { name: '1회 미백', price: '15만원', sessions: '진료실 1회', desc: '가벼운 변색·이벤트 직전. 즉시 효과를 원할 때.', tone: '1~2단계 밝기' },
  { name: '2회 미백', price: '30만원', sessions: '진료실 2회', desc: '평균 변색·결혼·면접 준비. 가장 인기 있는 패키지.', tone: '2~3단계 밝기', highlight: true },
  { name: '3회 미백', price: '40만원', sessions: '진료실 3회', desc: '심한 변색·테트라사이클린·노화 변색. 깊이 있는 케어.', tone: '3~4단계 밝기' },
]

const VS = [
  {
    item: '셀프 미백 키트',
    points: ['일반 농도 (3~6%)', '효과 제한적 · 불균일', '잇몸 자극·시린이 위험', '평균 4~8주 소요'],
  },
  {
    item: '전문가 미백',
    points: ['고농도 (35%) 안전 적용', '치아별 균일한 톤 조정', '잇몸 보호제 적용', '1회 1시간 즉시 효과'],
    highlight: true,
  },
]

const PROCESS = [
  { step: '01', name: '구강 검진', desc: '충치·잇몸 상태 점검. 미백 전 필수 처치(스케일링·충전) 우선 진행.' },
  { step: '02', name: '톤 측정', desc: 'VITA Shade Guide로 현재 톤 기록. Before 사진 촬영.' },
  { step: '03', name: '잇몸 보호', desc: '잇몸 라인에 보호제 도포. 약물 자극으로부터 연조직 차단.' },
  { step: '04', name: '미백제 도포', desc: '고농도 과산화수소 젤 도포. 광원으로 활성화.' },
  { step: '05', name: '세션 반복', desc: '15분 × 3세션 (패키지에 따라). 톤 변화 실시간 확인.' },
  { step: '06', name: '톤 측정·관리법', desc: 'After 톤 기록·사진. 음식·관리법 안내. 후속 셀프 키트 제공 가능.' },
]

const CARE = [
  { icon: 'fa-mug-hot', title: '커피·차·와인', desc: '시술 후 48시간 절제. 이후도 빨대 사용 권장.' },
  { icon: 'fa-ban-smoking', title: '흡연 금지', desc: '니코틴 착색은 미백 효과를 가장 빨리 무력화시킵니다.' },
  { icon: 'fa-toothbrush', title: '미백 치약', desc: '주 2~3회 보조 사용. 매일 사용은 마모를 가속화.' },
  { icon: 'fa-calendar-check', title: '6개월 리터치', desc: '톤 유지를 위한 단기 보충 세션. 가벼운 케어.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '치아가 손상되지 않나요?', answer: '의료기관에서 사용하는 미백제는 검증된 농도와 시간 내에서 안전합니다. 잇몸 보호제·시간 제어로 손상을 최소화합니다.', category: 'whitening', order: 1 },
  { id: '2', question: '시린 증상이 있을까요?', answer: '시술 직후 24~48시간 일시적 시린이 가능합니다. 미네랄 함유 치약·미온수 식이로 빠르게 회복됩니다.', category: 'whitening', order: 2 },
  { id: '3', question: '얼마나 유지되나요?', answer: '평균 1~2년. 흡연·커피·와인 섭취 빈도에 따라 차이. 6개월 리터치로 톤 유지 가능합니다.', category: 'whitening', order: 3 },
  { id: '4', question: '라미네이트와 어떻게 다른가요?', answer: '미백은 “자연치 톤 변화”, 라미네이트는 “표면 부착 보철”. 자연치를 깎지 않고 톤만 밝히려면 미백이 정답.', category: 'whitening', order: 4 },
  { id: '5', question: '보철물(크라운·라미네이트)도 미백되나요?', answer: '아니요. 인공 재료는 미백되지 않습니다. 자연치를 먼저 미백 후 보철 색상을 맞추는 것이 정석입니다.', category: 'whitening', order: 5 },
  { id: '6', question: '임산부도 가능한가요?', answer: '임신·수유 중에는 권장하지 않습니다. 출산·수유 종료 후 진행하세요.', category: 'whitening', order: 6 },
  { id: '7', question: '몇 살부터 가능한가요?', answer: '치아 발달이 완료되는 만 18세 이후 권장. 청소년기에는 자제합니다.', category: 'whitening', order: 7 },
  { id: '8', question: '시술 시간은?', answer: '1세션 약 60~90분. 패키지 회수에 따라 1~3주 분산 진행.', category: 'whitening', order: 8 },
]

export const WhiteningTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      {/* 1. HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PROFESSIONAL WHITENING · 전문가 미백</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            깎지 않습니다.<br/>
            톤만<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">밝힙니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            치아 삭제 없이, 자연치 본연의 밝기를 회복.<br/>
            결혼·면접·이벤트 직전, 60분으로 끝나는 케어.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#packages" class="btn-outline-ivory">패키지 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">15만원~</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">1회 시작가</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">60분</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">1세션 기준</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">3패키지</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">1·2·3회 선택</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">즉시</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">당일 효과 확인</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("whitening")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">미백은,<br/><span class="t-gold italic">색소 분해</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                치아를 깎거나 표면에 무언가를 붙이는 시술이 아닙니다. <strong class="t-gold">에나멜 안쪽의 색소를 분해</strong>해 자연치 본연의 밝기를 회복시키는 시술이에요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                커피·홍차·와인·니코틴·노화로 누적된 색소가 분해되면서 톤이 단계적으로 밝아집니다. 시술 후에도 자연치이며, 라미네이트와 달리 보철물이 아닙니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PACKAGES */}
      <section id="packages" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PACKAGES · 02</div>
            <h2 class="t-display">3개의 <span class="t-gold italic">패키지.</span></h2>
            <p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">
              현재 변색 정도와 목표 톤에 맞춰 선택. 부가세 10% 별도.
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <div class={`p-8 rounded-xl ${p.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-ivory border border-brown-200'}`}>
                {p.highlight && <div class="text-xs px-3 py-1 rounded-full bg-gold text-brown-950 font-bold inline-block mb-4">MOST POPULAR</div>}
                <h3 class="t-display text-2xl mb-3" style={p.highlight ? 'color:#fdfbf7;' : ''}>{p.name}</h3>
                <div class={`text-4xl font-bold mb-2 ${p.highlight ? 'text-gold' : 't-gold'}`}>{p.price}</div>
                <div class={`text-xs uppercase tracking-wider mb-5 ${p.highlight ? 'text-gold' : 'text-brown-500'}`}>{p.sessions} · {p.tone}</div>
                <p class={`text-sm ${!p.highlight ? 'text-brown-700' : ''}`} style={p.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VS SELF */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">COMPARE · 03</div>
            <h2 class="t-display">셀프 vs <span class="t-gold italic">전문가 미백.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VS.map((v) => (
              <div class={`p-8 lg:p-10 rounded-xl ${v.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-cream border border-brown-200'}`}>
                <div class={`text-xs uppercase tracking-wider mb-4 ${v.highlight ? 'text-gold' : 'text-brown-500'}`}>{v.highlight ? 'OUR STANDARD' : 'GENERAL'}</div>
                <h3 class="t-display text-2xl mb-6" style={v.highlight ? 'color:#fdfbf7;' : ''}>{v.item}</h3>
                <ul class="space-y-3">
                  {v.points.map((pt) => (
                    <li class="flex items-start gap-3">
                      <i class={`fas ${v.highlight ? 'fa-check text-gold' : 'fa-minus text-brown-400'} mt-1`}></i>
                      <span style={v.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''} class={!v.highlight ? 'text-brown-700' : ''}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 04</div>
            <h2 class="t-display">시술 <span class="t-gold italic">6단계.</span></h2>
          </div>
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

      {/* 6. CARE GUIDE */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">CARE · 05</div>
            <h2 class="t-display">시술 후 <span class="t-gold italic">관리.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CARE.map((c) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg">
                  <i class={`fas ${c.icon}`}></i>
                </div>
                <h3 class="t-display text-lg mb-2">{c.title}</h3>
                <p class="text-sm text-brown-700">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 06</div>
              <h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((d) => (
                <a href={`/doctors/${d.id}`} class="block p-7 rounded-xl bg-ivory border border-brown-200 hover:border-gold">
                  <div class="w-16 h-16 rounded-full bg-brown-950 text-gold flex items-center justify-center mb-5 text-2xl"><i class="fas fa-user-md"></i></div>
                  <h3 class="t-display text-xl mb-1">{d.name}</h3>
                  <div class="text-sm text-brown-500">{d.position || ''}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CASES */}
      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">CASES · 07</div>
              <h2 class="t-display">실제 케이스</h2>
            </div>
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

      {/* 9. FAQ */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">FAQ · 08</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
          <div class="space-y-3">
            {faqs.map((f) => (
              <details class="group p-6 rounded-xl bg-ivory border border-brown-200">
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

      {/* 10. CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 09</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            중요한 날 전,<br/>
            <span class="italic" style="color:#c9a876;">한 톤 더.</span>
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
