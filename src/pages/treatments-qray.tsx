import { Navbar, Footer, TldrBox, ComparisonTable } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import { comparisonFor } from '../lib/comparison-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · Q-ray 형광 충치 진단 풀볼륨 상세 페이지 v1
   - QLF 기술 (Quantitative Light-induced Fluorescence)
   - 비방사선 진단 시스템
   ============================================================ */

const ADVANTAGES = [
  { icon: 'fa-eye', title: '보이지 않는 충치까지', desc: '눈·일반 X-ray로 안 보이는 초기 우식·잇몸 플라크를 형광 발색으로 가시화.' },
  { icon: 'fa-shield-halved', title: '방사선 0', desc: '청색광(405nm)을 사용해 방사선 노출이 전혀 없습니다. 임산부·소아도 안심.' },
  { icon: 'fa-camera', title: '환자와 함께 보기', desc: '실시간 영상으로 환자가 직접 확인. “정말 있는지” 의심할 필요 없습니다.' },
  { icon: 'fa-chart-line', title: '정량 추적', desc: '같은 부위를 시간차 촬영해 진행 정도를 수치로 비교. 과잉 진료 방지.' },
]

const VS = [
  {
    item: '일반 검진 (눈·X-ray)',
    points: ['육안 가능 단계만 발견', '방사선 노출 동반', '초기 우식 놓치기 쉬움', '환자가 신뢰하기 어려움'],
  },
  {
    item: 'Q-ray 형광 진단',
    points: ['초기 탈회·우식까지 발견', '방사선 0 (청색광)', '플라크·치석도 시각화', '실시간 영상 공유'],
    highlight: true,
  },
]

const APPLICATIONS = [
  { title: '초기 충치 발견', desc: 'C0~C1 단계의 미세 탈회·우식. 깎지 않고 불소·아이콘 레진으로 차단 가능한 단계.' },
  { title: '교정 환자 모니터링', desc: '교정 장치 주변 탈회 발생을 매 내원 시 추적. 반점치 진행 차단.' },
  { title: '소아 정기 검진', desc: '방사선 부담 없는 안전한 진단. 매 6개월 정기 추적.' },
  { title: '플라크·치석 시각화', desc: '바이오필름 분포를 적색 발색으로 확인. 칫솔질 사각지대 코칭.' },
  { title: '보철물 경계 점검', desc: '크라운·인레이 마진의 미세 누출·재발 우식 조기 발견.' },
  { title: 'Before·After 기록', desc: '치료 전후 정량 비교로 효과 확인. 환자 신뢰도 ↑.' },
]

const PROCESS = [
  { step: '01', name: '구강 세척', desc: '잔여 음식물·표면 착색 제거. 정확한 형광 측정 환경 조성.' },
  { step: '02', name: '청색광 조사', desc: '특정 파장(405nm) 청색광으로 치아 표면 활성화.' },
  { step: '03', name: '형광 영상 촬영', desc: '건강한 부위는 녹색, 우식·플라크 부위는 적색으로 발색.' },
  { step: '04', name: '실시간 분석', desc: '소프트웨어로 영역 자동 인식·면적·강도 정량화.' },
  { step: '05', name: '환자 공유', desc: '모니터로 같이 확인. 진단 근거를 투명하게 공유.' },
  { step: '06', name: '치료 계획', desc: '단계별 분류(C0~C4)에 따라 보존 우선의 맞춤 플랜 수립.' },
]

const WHY_US = [
  { title: '국산 정품 시스템', desc: '검증된 QLF 기반 Q-ray 정품 장비를 보유.' },
  { title: '루틴화된 진단 프로토콜', desc: '신환·정기 검진 시 Q-ray 영상이 기본 포함됩니다. 별도 비용 없음.' },
  { title: '소아·임산부 친화', desc: '방사선 0의 안전 진단으로 부담 없는 정기 추적.' },
  { title: '교정 통합 모니터링', desc: '교정 환자에게 매 내원 시 탈회 모니터링 자동 적용.' },
  { title: '데이터 기반 상담', desc: '정량 수치로 진단 근거 제공. “과잉 진료” 의혹 차단.' },
  { title: '확대경·CT 통합', desc: 'Q-ray + 확대경 + CBCT 3중 진단으로 정밀도 극대화.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: 'Q-ray가 뭔가요?', answer: 'QLF(Quantitative Light-induced Fluorescence) 기술 기반의 형광 진단 시스템입니다. 특정 파장의 청색광을 비추면 건강한 치아는 녹색, 충치·플라크는 적색으로 발색해 미세 변화까지 시각화합니다.', category: 'qray', order: 1 },
  { id: '2', question: '방사선 안전한가요?', answer: '청색광(405nm)을 사용해 방사선 노출이 전혀 없습니다. 임산부·소아·반복 검진에도 부담이 없어요.', category: 'qray', order: 2 },
  { id: '3', question: 'X-ray와 어떻게 다른가요?', answer: 'X-ray는 “구조”(뼈·치아 내부)를 봅니다. Q-ray는 “표면 미네랄 상태”와 “플라크”를 봅니다. 둘은 보완적이라 함께 사용해야 정확합니다.', category: 'qray', order: 3 },
  { id: '4', question: '비용이 추가되나요?', answer: '대구365치과는 정기 검진·신환 진단 시 기본 포함되어 별도 비용 없이 진행합니다.', category: 'qray', order: 4 },
  { id: '5', question: '얼마나 정확한가요?', answer: '초기 탈회·미세 균열까지 정량 측정 가능한 수준입니다. 다만 치아 깊은 곳·인접면은 X-ray와 병행해야 정확합니다.', category: 'qray', order: 5 },
  { id: '6', question: '소아도 가능한가요?', answer: '오히려 소아에게 가장 적합합니다. 방사선 0, 비침습, 협조도 우수. 대구365치과 소아 정기 검진의 표준 항목입니다.', category: 'qray', order: 6 },
  { id: '7', question: '진단 시간은?', answer: '구강 세척 포함 약 5~10분. 일반 검진 시간 안에 통합 진행됩니다.', category: 'qray', order: 7 },
  { id: '8', question: '결과를 받아볼 수 있나요?', answer: '네. 영상 캡처와 정량 수치 리포트를 제공합니다. 매 검진마다 비교 추적 가능.', category: 'qray', order: 8 },
]

export const QrayTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      {/* 1. HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-digital-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">Q-RAY · 형광 충치 진단</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            보이지 않는 충치를,<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">빛으로 봅니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            방사선 0의 형광 진단 시스템.<br/>
            초기 우식·플라크까지 가시화하는 차세대 검진.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#process" class="btn-outline-ivory">진단 절차 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">QLF</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">정량 형광 기술</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">방사선 0</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">청색광 진단</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">5~10分</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">검진 통합 진행</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">기본 포함</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">정기 검진 시</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("qray")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}
      {/* ===== Comparison Table — AEO 'A vs B' 검색 직격 ===== */}
      {(() => {
        const _cmp = comparisonFor("qray")
        return _cmp ? (
          <section class="py-12 lg:py-16 bg-ivory" aria-label="비교 표">
            <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
              <ComparisonTable title={_cmp.title} headers={_cmp.headers} rows={_cmp.rows} caption={_cmp.caption} />
            </div>
          </section>
        ) : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">Q-ray는,<br/><span class="t-gold italic">빛으로 보는 진단</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                특정 파장의 <strong class="t-gold">청색광(405nm)</strong>을 치아에 비추면, 건강한 치아는 녹색으로, 우식·플라크 부위는 적색으로 발색합니다.
              </p>
              <p class="text-brown-700 leading-relaxed">
                눈·일반 X-ray로는 보이지 않는 초기 탈회·잠재 우식·잇몸 플라크까지 가시화하는 비방사선 정량 진단 기술이에요. 임산부·소아·반복 검진에도 안전하게 사용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVANTAGES */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">ADVANTAGES · 02</div>
            <h2 class="t-display">4가지 <span class="t-gold italic">강점.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg">
                  <i class={`fas ${a.icon}`}></i>
                </div>
                <h3 class="t-display text-lg mb-2">{a.title}</h3>
                <p class="text-sm text-brown-700">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">COMPARE · 03</div>
            <h2 class="t-display">기존 검진 vs <span class="t-gold italic">Q-ray.</span></h2>
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

      {/* 5. APPLICATIONS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">APPLICATIONS · 04</div>
            <h2 class="t-display">언제 <span class="t-gold italic">활용되는가.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.map((a) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <h3 class="t-display text-xl mb-3">{a.title}</h3>
                <p class="text-brown-700 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section id="process" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 05</div>
            <h2 class="t-display">진단 <span class="t-gold italic">6단계.</span></h2>
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

      {/* 7. WHY US */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 06</div>
            <h2 class="t-display">대구365치과의 <span class="t-gold italic">진단력.</span></h2>
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
            안 보이던 충치가,<br/>
            <span class="italic" style="color:#c9a876;">빨갛게 보입니다.</span>
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
