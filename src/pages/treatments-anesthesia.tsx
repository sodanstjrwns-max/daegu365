import { Navbar, Footer, TldrBox, ComparisonTable } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import { comparisonFor } from '../lib/comparison-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 4단계 무통마취 풀볼륨 상세 페이지 v1
   - 가글마취 → 도포마취 → 무통마취기 → 본마취
   - 통증 차단 프로토콜 (수면치료와 별개의 무통 시스템)
   ============================================================ */

const FOUR_STEPS = [
  {
    step: '01',
    name: '가글 마취',
    eng: 'Topical Gargle',
    desc: '구강 점막 전체를 약하게 마비시키는 가글로 시작합니다. 이 단계가 있어야 다음 단계인 도포 마취 시 “약 맛”과 “이물감”이 거의 느껴지지 않습니다.',
    why: '대부분의 치과는 이 단계를 건너뜁니다. 우리는 첫 자극부터 줄입니다.',
    icon: 'fa-droplet',
  },
  {
    step: '02',
    name: '도포 마취',
    eng: 'Topical Anesthetic',
    desc: '본 마취 주사를 놓을 잇몸 부위에 마취 연고를 충분히 도포해, 점막 표면을 완전히 마비시킵니다. 이 과정만 1~2분.',
    why: '도포가 부족하면 “바늘 끝이 닿는 그 순간”의 자극을 느낍니다. 충분한 시간이 핵심.',
    icon: 'fa-prescription-bottle',
  },
  {
    step: '03',
    name: '무통 마취기',
    eng: 'Computer-Controlled Injection',
    desc: '컴퓨터 제어 무통마취기로 약물을 일정한 압력·속도로 주입합니다. 손으로 누르는 일반 주사기와 달리, 압력이 튀지 않아 통증이 90% 이상 감소합니다.',
    why: '치과 통증의 대부분은 “약물이 들어가는 압력”에서 발생합니다. 기계가 그걸 해결합니다.',
    icon: 'fa-microchip',
  },
  {
    step: '04',
    name: '본 마취',
    eng: 'Block Anesthesia',
    desc: '시술 부위 신경을 완전히 차단하는 본 마취. 앞 3단계로 이미 점막이 충분히 마비된 상태이기 때문에, 환자분은 “언제 놓았지?” 하실 정도.',
    why: '본 마취는 어쩔 수 없는 단계지만, 앞 3단계 덕분에 환자 체감 통증이 결정적으로 달라집니다.',
    icon: 'fa-syringe',
  },
]

const PAIN_SCIENCE = [
  {
    title: '바늘 끝이 점막을 뚫는 자극',
    solution: '도포 마취로 점막 표면 완전 마비',
    icon: 'fa-circle-1',
  },
  {
    title: '약물이 들어가는 “압력 통증”',
    solution: '무통마취기로 일정한 저속 주입',
    icon: 'fa-circle-2',
  },
  {
    title: '약물 자체의 “쓰린 감각”',
    solution: '체온 가까이 데운 마취액 사용',
    icon: 'fa-circle-3',
  },
  {
    title: '주사 직후 “당기는 듯한 통증”',
    solution: '신경 주행 방향에 맞춘 각도 조절',
    icon: 'fa-circle-4',
  },
]

const EQUIPMENT = [
  {
    title: '컴퓨터 제어 무통마취기',
    spec: '일정 압력 · 일정 속도 자동 제어',
    desc: '손 압력에 따른 통증 변동을 0으로 만드는 핵심 장비. 일반 주사기 대비 통증 90% 이상 감소.',
    icon: 'fa-microchip',
  },
  {
    title: '마취액 워머',
    spec: '체온 36.5℃까지 사전 가온',
    desc: '차가운 마취액의 “쓰린 감각”을 제거. 체온과 동일한 온도로 주입해 이질감을 최소화합니다.',
    icon: 'fa-temperature-half',
  },
  {
    title: '극세 게이지 바늘',
    spec: '30G·31G 미세 침',
    desc: '일반 치과 바늘보다 가는 극세 게이지. 점막 통과 시 자극을 최소화합니다.',
    icon: 'fa-syringe',
  },
  {
    title: '진동 완화 핸드피스',
    spec: '저소음·저진동 시술 도구',
    desc: '드릴 소음과 진동이 곧 “심리적 통증”입니다. 저소음 핸드피스로 청각 자극도 줄입니다.',
    icon: 'fa-volume-low',
  },
]

const APPLICABLE = [
  { name: '충치 치료', icon: 'fa-tooth', detail: '단순 레진부터 신경치료까지 전 단계 적용' },
  { name: '신경치료', icon: 'fa-bolt', detail: '치수강 진입 시점부터 마무리까지' },
  { name: '발치', icon: 'fa-scissors', detail: '단순발치·매복사랑니 모두 적용' },
  { name: '임플란트', icon: 'fa-screwdriver-wrench', detail: '식립 + 골이식 동반 케이스' },
  { name: '잇몸 수술', icon: 'fa-leaf', detail: '치주수술·잇몸성형술' },
  { name: '소아 진료', icon: 'fa-child', detail: '협조 가능한 어린이의 충치·발치' },
]

const WHY_US = [
  {
    icon: 'fa-shield-check',
    title: '치과공포증 의사가 만든 4단계',
    desc: '대표원장 본인의 두려움 경험에서 출발한 프로토콜. 환자 입장에서 “덜 아픈 것”이 아니라 “안 아픈 것”을 목표로 설계.',
  },
  {
    icon: 'fa-microchip',
    title: '컴퓨터 제어 주입',
    desc: '손 압력 대신 기계가 일정한 속도로 마취액을 주입. 일반 주사기 대비 통증 90% 이상 감소를 임상에서 확인.',
  },
  {
    icon: 'fa-clock',
    title: '단계별 충분한 시간',
    desc: '도포 마취 1~2분, 본 마취 후 충분한 대기. “빨리 빨리”가 아니라 “환자 속도에 맞춰” 진행합니다.',
  },
  {
    icon: 'fa-bed',
    title: '수면치료와 결합 가능',
    desc: '4단계 무통만으로도 충분하지만, 두려움이 큰 분께는 의식하 진정과 결합해 “이중 안심” 시스템으로 운영합니다.',
  },
]

const COMPARE = [
  {
    item: '일반 치과',
    points: ['바로 본 마취 시작', '수동 주사기 (손 압력 의존)', '차가운 마취액 그대로', '바늘 굵기 표준'],
    color: 'brown-300',
  },
  {
    item: '대구365치과',
    points: ['4단계 프로토콜 (가글→도포→무통기→본마취)', '컴퓨터 제어 무통마취기', '체온 가온 마취액', '30G·31G 극세 바늘'],
    color: 'gold',
    highlight: true,
  },
]

const DEFAULT_FAQS = [
  {
    q: '“무통마취”라는데, 정말 안 아픈가요?',
    a: '“통증 0”을 약속드리지는 않습니다. 다만 4단계 프로토콜로 환자 체감 통증이 일반 치과 대비 결정적으로 달라집니다. 특히 “바늘이 들어가는 순간”과 “약물이 들어가는 압력”이라는 두 핵심 통증을 도포 마취와 무통마취기로 차단합니다. 대다수 환자분이 “언제 놓았지?” 하시는 이유입니다.',
  },
  {
    q: '4단계 무통마취는 추가 비용이 있나요?',
    a: '추가 비용 없이 모든 진료에 기본 적용됩니다. “옵션”이 아니라 “기본 표준”으로 운영합니다.',
  },
  {
    q: '수면치료와 무통마취는 어떻게 다른가요?',
    a: '서로 다른 차원의 시스템입니다. <b>수면치료(의식하 진정)</b>은 “마음의 두려움”을 가라앉히고, <b>4단계 무통마취</b>는 “물리적 통증”을 차단합니다. 두려움이 큰 분께는 두 시스템을 결합해 적용합니다.',
  },
  {
    q: '소아도 4단계 무통마취가 가능한가요?',
    a: '가능하며, 오히려 더 효과적입니다. 어린이는 “바늘이 보이는 순간”부터 공포가 시작되므로 도포 마취와 무통마취기가 결정적인 차이를 만듭니다. 협조가 어려운 어린이는 수면치료와 결합합니다.',
  },
  {
    q: '마취 후 얼마나 마비된 상태가 유지되나요?',
    a: '시술 부위와 마취 종류에 따라 다르지만, 통상 2~4시간 정도입니다. 마비가 풀릴 때까지 입술·혀를 깨물지 않도록 주의해 주시고, 뜨거운 음식은 피해주세요.',
  },
  {
    q: '마취 알러지가 걱정됩니다.',
    a: '사전 문진에서 과거 마취 경험·알러지 이력을 반드시 확인합니다. 알러지가 의심되는 경우 다른 계열 마취제를 사용하거나, 필요 시 사전 알러지 검사를 권장합니다.',
  },
]

export const PainlessAnesthesiaTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const finalFaqs = faqs && faqs.length > 0 ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'painless-anesthesia', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/precision-implant-center.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PAINLESS ANESTHESIA · 4단계 무통마취</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            바늘이 들어가는<br/>
            그 순간을,<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">없애드립니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            가글 → 도포 → 무통마취기 → 본마취.<br/>
            모든 진료에 기본 적용되는, 추가 비용 없는 4단계 프로토콜.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#steps" class="btn-outline-ivory">4단계 자세히 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/20">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">4단계</div><div class="text-sm opacity-70">통증 차단 프로토콜</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">90%↓</div><div class="text-sm opacity-70">일반 주사 대비 통증 감소</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">+0원</div><div class="text-sm opacity-70">추가 비용 없음</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">전 진료</div><div class="text-sm opacity-70">기본 표준 적용</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("painless-anesthesia")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}
      {/* ===== Comparison Table — AEO 'A vs B' 검색 직격 ===== */}
      {(() => {
        const _cmp = comparisonFor("painless-anesthesia")
        return _cmp ? (
          <section class="py-12 lg:py-16 bg-ivory" aria-label="비교 표">
            <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
              <ComparisonTable title={_cmp.title} headers={_cmp.headers} rows={_cmp.rows} caption={_cmp.caption} />
            </div>
          </section>
        ) : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-16">
            <div class="lg:col-span-5">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                치과 통증의 정체를<br/>
                <span class="t-gold italic">먼저 이해해야 합니다.</span>
              </h2>
            </div>
            <div class="lg:col-span-7 space-y-6 t-body text-lg">
              <p>
                많은 분이 “치과 마취가 아프다”고 하시지만, 정확히 말하면 <b>마취 그 자체가 아니라 마취를 놓는 과정의 4가지 자극</b>이 통증의 정체입니다.
              </p>
              <p>
                대구365치과의 4단계 무통마취는 이 4가지 자극을 <b>각각 분리해서 차단</b>합니다. “마취 한 번으로 끝내겠다”가 아니라, “네 가지 자극을 네 단계로 풀어내겠다”는 접근입니다.
              </p>
              <div class="grid grid-cols-1 gap-3 pt-4">
                {PAIN_SCIENCE.map((p: any) => (
                  <div class="flex items-start gap-4 p-4 bg-cream rounded-lg">
                    <i class={`fas ${p.icon} text-gold text-xl mt-1`}></i>
                    <div class="flex-1">
                      <div class="t-body font-medium">{p.title}</div>
                      <div class="text-sm text-brown-600 mt-1">→ {p.solution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY DAEGU365 */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 03</div>
            <h2 class="t-display">
              “덜 아픈 것”이 아니라<br/>
              <span class="t-gold italic">“안 아픈 것”을 목표로.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {WHY_US.map((f: any, i: number) => (
              <div class="bg-ivory p-8 lg:p-10 rounded-xl">
                <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <i class={`fas ${f.icon} text-gold text-xl`}></i>
                </div>
                <h3 class="t-display text-xl mb-3">{f.title}</h3>
                <p class="t-body text-brown-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOUR STEPS */}
      <section id="steps" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROTOCOL · 04</div>
            <h2 class="t-display mb-6">
              4단계 무통마취<br/>
              <span class="t-gold italic">프로토콜 전 과정.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto text-brown-700">
              한 번의 마취가 아닌, 네 번의 분리된 단계. 각 단계마다 다른 자극을 차단합니다.
            </p>
          </div>
          <div class="space-y-6">
            {FOUR_STEPS.map((s: any) => (
              <div class="grid lg:grid-cols-12 gap-6 bg-cream p-8 lg:p-10 rounded-xl border-l-4 border-gold">
                <div class="lg:col-span-2">
                  <div class="t-gold text-5xl lg:text-6xl font-bold display">{s.step}</div>
                  <div class="text-xs text-brown-500 uppercase tracking-wider mt-2">{s.eng}</div>
                </div>
                <div class="lg:col-span-2 flex lg:justify-center lg:items-center">
                  <div class="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                    <i class={`fas ${s.icon} text-gold text-2xl`}></i>
                  </div>
                </div>
                <div class="lg:col-span-8">
                  <h3 class="t-display text-2xl mb-3">{s.name}</h3>
                  <p class="t-body text-brown-700 mb-3">{s.desc}</p>
                  <div class="text-sm text-gold border-t border-gold/20 pt-3"><b>POINT.</b> {s.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EQUIPMENT */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">EQUIPMENT · 05</div>
            <h2 class="t-display">
              프로토콜은 결국,<br/>
              <span class="t-gold italic">장비가 뒷받침합니다.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {EQUIPMENT.map((e: any) => (
              <div class="bg-ivory p-8 lg:p-10 rounded-xl">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <i class={`fas ${e.icon} text-gold text-2xl`}></i>
                  </div>
                  <div>
                    <div class="text-xs text-gold uppercase tracking-wider mb-2">{e.spec}</div>
                    <h3 class="t-display text-xl mb-3">{e.title}</h3>
                    <p class="t-body text-brown-700">{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPARE */}
      <section class="py-24 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">COMPARE · 06</div>
            <h2 class="t-display">
              일반 치과 vs<br/>
              <span class="t-gold italic">대구365치과.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {COMPARE.map((c: any) => (
              <div class={`p-8 lg:p-10 rounded-xl ${c.highlight ? 'bg-brown-950 text-ivory' : 'bg-cream'}`}>
                <div class={`text-xs uppercase tracking-wider mb-4 ${c.highlight ? 'text-gold' : 'text-brown-500'}`}>{c.highlight ? 'OUR STANDARD' : 'GENERAL'}</div>
                <h3 class={`t-display text-2xl mb-6 ${c.highlight ? 'text-ivory' : ''}`}>{c.item}</h3>
                <ul class="space-y-3">
                  {c.points.map((p: string) => (
                    <li class="flex items-start gap-3">
                      <i class={`fas ${c.highlight ? 'fa-check text-gold' : 'fa-minus text-brown-400'} mt-1`}></i>
                      <span class={c.highlight ? 'text-ivory/90' : 'text-brown-700'}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. APPLICABLE */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">APPLICABLE · 07</div>
            <h2 class="t-display">
              어떤 진료에<br/>
              <span class="t-gold italic">적용되나요?</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto mt-4 text-brown-700">
              마취가 필요한 모든 진료에 기본 적용됩니다. 특정 진료의 옵션이 아닌, 병원 표준입니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {APPLICABLE.map((a: any) => (
              <div class="bg-ivory p-6 lg:p-8 rounded-xl">
                <i class={`fas ${a.icon} text-gold text-2xl mb-4`}></i>
                <h3 class="t-display text-lg mb-2">{a.name}</h3>
                <p class="t-body text-sm text-brown-700">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RELATED — 수면치료 결합 */}
      <section class="py-24 bg-brown-950 text-ivory relative overflow-hidden">
        <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div class="section-label text-gold mb-6">COMBINED · 08</div>
          <h2 class="t-display mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            두려움이 더 큰 분이라면,<br/>
            <span class="italic" style="color:#c9a876;">수면치료와 결합하세요.</span>
          </h2>
          <p class="t-lead opacity-90 max-w-2xl mx-auto mb-10">
            4단계 무통마취만으로도 충분하지만, 치과 자체가 두려운 분께는 의식하 진정과 결합한 “이중 안심” 시스템을 권합니다.
          </p>
          <div class="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            <div class="bg-ivory/5 backdrop-blur p-6 rounded-xl border border-ivory/10 text-left">
              <div class="text-xs text-gold uppercase tracking-wider mb-2">PHYSICAL</div>
              <h3 class="t-display text-lg text-ivory mb-2">4단계 무통마취</h3>
              <p class="text-sm opacity-80">물리적 통증 차단</p>
            </div>
            <div class="bg-ivory/5 backdrop-blur p-6 rounded-xl border border-ivory/10 text-left">
              <div class="text-xs text-gold uppercase tracking-wider mb-2">MENTAL</div>
              <h3 class="t-display text-lg text-ivory mb-2">수면치료 (의식하 진정)</h3>
              <p class="text-sm opacity-80">심리적 두려움 차단</p>
            </div>
          </div>
          <a href="/treatments/sleep-therapy" class="btn-outline-ivory">수면치료 시스템 자세히 보기 <i class="fas fa-arrow-right ml-2"></i></a>
        </div>
      </section>

      {/* 9. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 09</div>
              <h2 class="t-display">
                무통마취를<br/>
                <span class="t-gold italic">담당하는 의료진.</span>
              </h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(0, 6).map((d: any) => (
                <a href={`/doctors/${d.slug}`} class="block bg-cream rounded-xl overflow-hidden hover:shadow-lg transition group">
                  <div class="aspect-[3/4] overflow-hidden bg-brown-100">
                    {d.photo_url
                      ? <img src={d.photo_url} alt={d.name} class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy"/>
                      : <div class="w-full h-full flex items-center justify-center text-6xl text-brown-300"><i class="fas fa-user-doctor"></i></div>}
                  </div>
                  <div class="p-6">
                    <div class="text-xs text-gold uppercase tracking-wider mb-2">{d.position}</div>
                    <h3 class="t-display text-xl mb-1">{d.name}</h3>
                    <p class="text-sm text-brown-600 line-clamp-2">{d.message || ''}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">FAQ · 10</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
          <div class="space-y-3">
            {finalFaqs.map((f: any) => (
              <details class="bg-ivory rounded-xl group">
                <summary class="cursor-pointer p-6 lg:p-8 flex items-start justify-between gap-4">
                  <span class="t-display text-base lg:text-lg pr-4">{f.question}</span>
                  <i class="fas fa-plus text-gold mt-1 group-open:rotate-45 transition"></i>
                </summary>
                <div class="px-6 lg:px-8 pb-6 lg:pb-8 t-body text-brown-700 leading-relaxed" dangerouslySetInnerHTML={{__html: f.answer}}></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DICTIONARY */}
      {dictTerms && dictTerms.length > 0 && (
        <section class="py-20 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="section-label mb-6">DICTIONARY · 11</div>
            <h2 class="t-display mb-8">관련 용어</h2>
            <div class="flex flex-wrap gap-2">
              {dictTerms.slice(0, 20).map((t: any) => (
                <a href={`/dictionary/${t.slug}`} class="px-4 py-2 rounded-full bg-cream hover:bg-gold/10 text-sm text-brown-700 hover:text-gold transition">
                  {t.term}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. FINAL CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-10" style="background-image:url('/r2/images/clinic/precision-implant-center.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 12</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            “언제 놓으셨어요?”<br/>
            <span class="italic" style="color:#c9a876;">그 한마디를 위해.</span>
          </h2>
          <p class="t-lead text-lg lg:text-xl mb-10" style="color:#fdfbf7; opacity:0.9;">
            모든 진료에 기본 적용. 추가 비용 없음.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="/directions" class="btn-outline-ivory">오시는 길 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
