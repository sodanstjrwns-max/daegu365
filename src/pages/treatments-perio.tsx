import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 치주치료 풀볼륨 상세 페이지 v1
   - 잇몸병 4단계 (건강 → 치은염 → 초기 → 중기 → 말기)
   - 비외과·외과 단계별 치료
   - 에어플로우(GBT) 연계
   ============================================================ */

const PERIO_STAGES = [
  { stage: '건강', name: '건강한 잇몸', desc: '분홍색·탄력. 출혈 없음. 정기 스케일링으로 유지.', treat: '예방 관리', color: 'safe' },
  { stage: '치은염', name: '치은염', desc: '잇몸 붓기·출혈. 뼈 손상 없음. 가역적 단계.', treat: '스케일링', color: 'safe' },
  { stage: '초기', name: '초기 치주염', desc: '뼈 손상 시작. 잇몸 주머니 4mm. 시린 증상.', treat: '잇몸치료(SRP)', color: 'warning', highlight: true },
  { stage: '중기', name: '중등도 치주염', desc: '뼈 1/3 소실. 주머니 5~6mm. 흔들림 시작.', treat: 'SRP + 외과', color: 'danger' },
  { stage: '말기', name: '진행성 치주염', desc: '뼈 1/2 이상 소실. 발치 위험. 임플란트 고려.', treat: '치주수술/발치', color: 'critical' },
]

const PROCESS = [
  { step: '01', name: '정밀 진단', desc: '치주낭 깊이 측정·X-ray·CT로 뼈 소실 정량화. Q-ray로 플라크·치석 가시화.' },
  { step: '02', name: '에어플로우 (GBT)', desc: '비외과 1차 처치. 플라크·바이오필름을 손상 없이 제거.' },
  { step: '03', name: '스케일링·SRP', desc: '치아 표면·치근면 치석 제거. 잇몸선 아래까지 정밀 세척.' },
  { step: '04', name: '재평가', desc: '4~6주 후 잇몸 회복 정도 측정. 다음 단계 결정.' },
  { step: '05', name: '치주 수술 (필요시)', desc: '주머니 깊거나 뼈 결손 큰 부위는 판막 수술·뼈이식 진행.' },
  { step: '06', name: '리콜·유지관리', desc: '3·6개월 맞춤 리콜. 재발 차단이 핵심.' },
]

const WHY_US = [
  { title: '에어플로우(GBT) 연계', desc: '치주치료 전 GBT 8단계로 바이오필름 완벽 제거. 치료 효과 극대화.' },
  { title: '치주낭 정밀 측정', desc: '6포인트 차팅으로 치아 하나하나 정밀 평가. 시각화된 진단서 제공.' },
  { title: '확대경·마이크로스코프', desc: '잇몸선 아래 치석을 6배 확대 시야로 정확히 제거.' },
  { title: '4단계 무통마취', desc: 'SRP·치주수술 모두 무통마취 기본 적용. 추가 비용 없음.' },
  { title: '뼈이식·재생술', desc: '소실된 치조골을 재생. 발치 직전 단계도 살릴 수 있는 골재생술 시행.' },
  { title: '평생 유지 관리', desc: '치료보다 중요한 것은 재발 차단. 3·6개월 리콜 시스템 운영.' },
]

const HOME_CARE = [
  { icon: 'fa-toothbrush', title: '바스법 칫솔질', desc: '잇몸선 45도, 작은 진동. 하루 3회 · 2분 이상.' },
  { icon: 'fa-grip-lines', title: '치간칫솔·치실', desc: '치아 사이 70% 영역은 칫솔로 안 닿습니다. 매일 1회 필수.' },
  { icon: 'fa-prescription-bottle', title: '치주 가글', desc: '클로르헥시딘·CPC 함유. 단기간(2주) 보조 사용.' },
  { icon: 'fa-ban-smoking', title: '금연·금주', desc: '흡연은 치주염 진행 속도를 3배 가속화합니다.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '잇몸에서 피가 나요. 치료해야 하나요?', answer: '출혈은 치은염의 가장 첫 신호입니다. 이 단계에서 치료하면 뼈 손상 없이 회복 가능. 방치 시 치주염으로 진행됩니다.', category: 'perio', order: 1 },
  { id: '2', question: '스케일링과 SRP는 뭐가 다른가요?', answer: '스케일링은 잇몸선 위 치석 제거(예방). SRP(치주소파술)는 잇몸선 아래까지 정밀 세척하는 치료. 잇몸병 진단 시 SRP가 필요합니다.', category: 'perio', order: 2 },
  { id: '3', question: '치주수술 받으면 잇몸이 내려가나요?', answer: '염증으로 부어있던 잇몸이 정상 위치로 회복되면서 “내려간 것처럼” 보이는 경우가 있습니다. 이는 치유 과정이며 뼈 보호에 더 유리합니다.', category: 'perio', order: 3 },
  { id: '4', question: '보험 적용되나요?', answer: '스케일링·SRP·치주수술은 건강보험 적용. 비급여 스케일링(추가)·뼈이식 일부는 비급여입니다.', category: 'perio', order: 4 },
  { id: '5', question: '한 번 치료하면 끝인가요?', answer: '아닙니다. 치주염은 만성 질환. 3·6개월 리콜과 매일 홈케어로 평생 관리해야 합니다.', category: 'perio', order: 5 },
  { id: '6', question: '임플란트 전에 치주치료가 꼭 필요한가요?', answer: '필수입니다. 잇몸이 건강하지 않은 상태에서 임플란트를 심으면 임플란트 주위염으로 빠르게 실패합니다.', category: 'perio', order: 6 },
  { id: '7', question: '아픈가요?', answer: '4단계 무통마취 기본 적용. 시술 중 통증은 거의 없으며, 시술 후 2~3일 시린 증상은 정상입니다.', category: 'perio', order: 7 },
  { id: '8', question: '치료 기간은 얼마나?', answer: '비외과 치료(SRP)는 2~4회. 외과 수술 포함 시 2~3개월. 이후 평생 리콜 관리.', category: 'perio', order: 8 },
]

export const PerioTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      {/* 1. HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-precision-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PERIODONTICS · 치주치료</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            치아를 잃는 1순위,<br/>
            충치가 아닌<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">잇몸병입니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            건강 → 치은염 → 치주염 4단계 정밀 진단.<br/>
            에어플로우(GBT) 연계, 비외과·외과 통합 시스템.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#stages" class="btn-outline-ivory">잇몸병 단계 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">5단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">정밀 진단</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">GBT</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">에어플로우 연계</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">3·6個月</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">맞춤 리콜</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 진료</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("perio")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">잇몸병은,<br/><span class="t-gold italic">소리 없는 도둑</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                통증 없이 진행되어 깨달을 때는 이미 <strong class="t-gold">치아를 받치는 뼈가 녹아내린 상태</strong>예요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                40대 이상 한국인의 80% 이상이 어떤 형태로든 치주 문제를 가지고 있습니다. 충치가 아닌 잇몸병이 치아 상실의 1순위 원인. 정기 검진과 GBT(에어플로우) 관리로 <strong>녹기 전에</strong> 잡는 것이 핵심입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STAGES */}
      <section id="stages" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">STAGES · 02</div>
            <h2 class="t-display">잇몸병 <span class="t-gold italic">5단계.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {PERIO_STAGES.map((s) => (
              <div class={`p-6 rounded-xl ${s.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-ivory border border-brown-200'}`}>
                <div class={`text-2xl font-black mb-3 ${s.highlight ? 'text-gold' : 't-gold'}`}>{s.stage}</div>
                <h3 class="t-display text-lg mb-3" style={s.highlight ? 'color:#fdfbf7;' : ''}>{s.name}</h3>
                <p class={`text-sm mb-4 ${!s.highlight ? 'text-brown-700' : ''}`} style={s.highlight ? 'color:#fdfbf7;opacity:0.85;' : ''}>{s.desc}</p>
                <div class={`text-xs uppercase tracking-wider pt-3 border-t ${s.highlight ? 'border-gold/30 text-gold' : 'border-brown-200 text-brown-500'}`}>→ {s.treat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 03</div>
            <h2 class="t-display">치주치료 <span class="t-gold italic">6단계.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="t-gold text-3xl font-black mb-3">{p.step}</div>
                <h3 class="t-display text-xl mb-2">{p.name}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY US */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 04</div>
            <h2 class="t-display">대구365치과의 <span class="t-gold italic">정밀함.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((w) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <h3 class="t-display text-xl mb-3">{w.title}</h3>
                <p class="text-brown-700 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOME CARE */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">HOME CARE · 05</div>
            <h2 class="t-display">집에서의 <span class="t-gold italic">관리.</span></h2>
            <p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">
              치료보다 중요한 것은 매일의 습관. 365일 관리가 평생 치아를 만듭니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOME_CARE.map((h) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg">
                  <i class={`fas ${h.icon}`}></i>
                </div>
                <h3 class="t-display text-lg mb-2">{h.title}</h3>
                <p class="text-sm text-brown-700">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMBINED */}
      <section class="py-24 text-ivory relative overflow-hidden" style="background:var(--brown-950);">
        <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div class="section-label text-gold mb-6">COMBINED · 06</div>
          <h2 class="t-display mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            치주치료의 시작은,<br/>
            <span class="italic" style="color:#c9a876;">에어플로우입니다.</span>
          </h2>
          <p class="t-lead max-w-2xl mx-auto mb-10" style="color:#fdfbf7; opacity:0.9;">
            바이오필름을 먼저 제거해야 치주 처치 효과가 극대화됩니다. 대구365치과는 GBT 8단계 프로토콜과 치주치료를 통합 운영합니다.
          </p>
          <a href="/treatments/airflow-gbt" class="btn-outline-ivory">에어플로우(GBT) 자세히 보기 <i class="fas fa-arrow-right ml-2"></i></a>
        </div>
      </section>

      {/* 8. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 07</div>
              <h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2>
            </div>
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

      {/* 9. CASES */}
      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">CASES · 08</div>
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

      {/* 10. FAQ */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">FAQ · 09</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
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

      {/* 11. CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 10</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            잇몸이 보내는 신호,<br/>
            <span class="italic" style="color:#c9a876;">놓치지 마세요.</span>
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
