import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 수면치료 시스템 풀볼륨 상세 페이지 v1
   - 의식하 진정(IV Sedation) 기반
   - 자체 안전 시스템 강조 (마취과 협진 언급 없음)
   - 비용은 상담 안내로 처리
   ============================================================ */

const SAFETY_SYSTEM = [
  {
    icon: 'fa-heart-pulse',
    title: '실시간 생체신호 모니터링',
    desc: '심전도·혈압·산소포화도·호흡수까지 4개 지표를 시술 전 과정 동안 실시간 추적. 미세한 변화도 즉각 인지합니다.',
  },
  {
    icon: 'fa-syringe',
    title: '맞춤 진정 용량 산정',
    desc: '체중·연령·전신 건강 상태·복용 중인 약물까지 사전 문진을 통해 1인 1처방. 표준 용량을 일괄 적용하지 않습니다.',
  },
  {
    icon: 'fa-shield-heart',
    title: '응급 대응 프로토콜',
    desc: '응급 약물·산소·기도 확보 장비를 진료실 내 비치. 정기적인 응급 시뮬레이션 훈련으로 모든 스태프가 즉시 대응합니다.',
  },
  {
    icon: 'fa-user-doctor',
    title: '회복실 1:1 케어',
    desc: '시술 종료 후 별도 회복실에서 의식이 또렷해질 때까지 1:1 모니터링. 보호자 동행으로 귀가까지 안전을 확인합니다.',
  },
]

const INDICATIONS = [
  {
    title: '치과공포증',
    desc: '드릴 소리·바늘에 대한 극심한 두려움으로 치과 방문 자체가 어려운 분.',
    icon: 'fa-face-grimace',
  },
  {
    title: '구역반사가 심한 분',
    desc: '인상 채득·진료 도구만 닿아도 구역반사가 심해 진료 진행이 어려운 분.',
    icon: 'fa-face-flushed',
  },
  {
    title: '장시간 수술',
    desc: '다수 임플란트·전악 보철처럼 2시간 이상 누워있어야 하는 시술이 부담스러운 분.',
    icon: 'fa-clock',
  },
  {
    title: '심리적 긴장이 큰 분',
    desc: '시술 자체보다 대기·치과의 분위기에서 오는 긴장으로 혈압·심박이 급상승하는 분.',
    icon: 'fa-heart-circle-bolt',
  },
  {
    title: '소아 협조 불가',
    desc: '협조가 어려운 어린이의 다수 충치 치료, 발치, 외상 치료 등.',
    icon: 'fa-child',
  },
  {
    title: '발달장애·특수 케어',
    desc: '진료실 내 의사소통이 어려워 일반적 진료가 곤란한 경우.',
    icon: 'fa-hands-holding-heart',
  },
]

const PROCESS = [
  {
    step: '01',
    title: '사전 상담 · 전신 건강 평가',
    duration: '시술 전일까지',
    desc: '복용 중인 약물·과거 마취 경험·기저질환·알러지를 정밀 문진. 필요 시 혈액검사·심전도까지 사전 점검합니다.',
    detail: ['약물 복용력 확인', '심혈관·호흡기 평가', '진정 적합성 판정', '동의서 설명'],
  },
  {
    step: '02',
    title: '시술 전 준비',
    duration: '시술 당일',
    desc: '8시간 금식 확인 후 정맥로 확보. 생체신호 모니터링 장비 부착으로 안전 기준선을 확보합니다.',
    detail: ['금식 확인', '정맥 라인 확보', '모니터링 장비 부착', '환자 컨디션 최종 점검'],
  },
  {
    step: '03',
    title: '의식하 진정 진입',
    duration: '약 5~10분',
    desc: '소량의 진정제를 천천히 주입. 환자분은 꿈결 같은 편안함 속에 의식이 흐려지지만, 호흡과 자발 반응은 유지됩니다.',
    detail: ['단계적 약물 주입', '의식 수준 평가', '4단계 무통마취 병행', '시술 시작 신호'],
  },
  {
    step: '04',
    title: '시술 진행 + 실시간 모니터링',
    duration: '시술 시간',
    desc: '진료팀과 모니터링팀이 분리되어 동시 진행. 환자분의 모든 생체 신호를 시술 종료 시점까지 추적합니다.',
    detail: ['진료팀·모니터팀 분리', '생체신호 연속 기록', '약물 추가 주입 조절', '환자 반응 즉시 대응'],
  },
  {
    step: '05',
    title: '회복실 케어',
    duration: '약 30~60분',
    desc: '별도 회복실로 이동, 의식이 또렷해질 때까지 1:1 케어. 어지러움·메스꺼움 없이 안전하게 깨어나도록 돕습니다.',
    detail: ['회복실 이동', '의식 수준 회복 평가', '귀가 가능 판정', '주의사항 안내'],
  },
  {
    step: '06',
    title: '보호자 동행 귀가',
    duration: '귀가 후 24시간',
    desc: '진정 후 24시간은 운전·중요 의사결정 금지. 보호자 동행을 원칙으로 하며, 다음날까지 컨디션 체크를 진행합니다.',
    detail: ['보호자 동행 필수', '24시간 운전 금지', '경과 관찰 콜', '익일 컨디션 확인'],
  },
]

const WHY_US = [
  {
    icon: 'fa-shield-check',
    title: '치과공포증 의사가 만든 시스템',
    desc: '대표원장 본인이 치과 진료실 문 앞에서 돌아섰던 경험으로 설계한, 환자의 두려움을 가장 잘 이해하는 진정 시스템.',
  },
  {
    icon: 'fa-microscope',
    title: '진정 + 4단계 무통마취 병행',
    desc: '의식하 진정만으로는 부족합니다. 가글마취→도포마취→무통마취기→본마취까지 단계별 무통 프로토콜을 함께 적용합니다.',
  },
  {
    icon: 'fa-heart-pulse',
    title: '4지표 실시간 모니터링',
    desc: '심전도·혈압·산소포화도·호흡수를 시술 전 과정 동안 동시에 추적. 모든 변화는 진료팀과 별도의 모니터팀이 함께 봅니다.',
  },
  {
    icon: 'fa-clock-rotate-left',
    title: '한 번 누우면 끝나는 통합 진료',
    desc: '여러 진료를 단발 방문에 끝내고 싶은 분께 최적. 임플란트·신경치료·발치까지 한 번의 진정으로 완료 가능합니다.',
  },
]

const NOT_FOR = [
  {
    risk: '심한 심혈관 질환',
    desc: '최근 심근경색·불안정 협심증·중증 심부전이 있는 분은 진정이 부담될 수 있어 사전 평가가 필수입니다.',
  },
  {
    risk: '중증 호흡기 질환',
    desc: '중증 천식·수면무호흡증·만성폐쇄성폐질환이 있는 분은 진정 적합성을 별도로 평가합니다.',
  },
  {
    risk: '특정 약물 복용',
    desc: '항응고제·향정신성 약물 등을 복용 중이라면 사전에 반드시 알려주셔야 합니다.',
  },
  {
    risk: '임신 중',
    desc: '임신 중에는 의식하 진정을 권장하지 않습니다. 출산 후 또는 비진정 무통마취로 진행합니다.',
  },
]

const CARE_GUIDE = {
  before: [
    '시술 8시간 전부터 금식 (물 포함)',
    '복용 중인 모든 약물을 사전 알림',
    '편한 옷차림·낮은 신발로 내원',
    '반드시 보호자 동행',
    '콘택트렌즈·매니큐어·짙은 화장 자제',
  ],
  after: [
    '회복실 1:1 케어 30~60분',
    '귀가 후 24시간 운전·중요 의사결정 금지',
    '귀가 후 4시간은 절대 안정',
    '메스꺼움이 있으면 미지근한 물부터 천천히',
    '익일 컨디션 체크 콜 진행',
  ],
}

const DEFAULT_FAQS = [
  {
    q: '수면치료라고 하는데, 정말 잠드는 건가요? 전신마취와 다른가요?',
    a: '전신마취가 아닙니다. 의식하 진정(IV Sedation)으로, 환자분은 꿈결 같은 편안함 속에 의식이 흐려지지만 호흡과 자발 반응은 유지됩니다. 시술 후 대부분 시술 과정을 기억하지 못하지만, 회복은 전신마취보다 훨씬 빠르고 가볍습니다.',
  },
  {
    q: '시술 중에 깨면 어떡하나요?',
    a: '의식하 진정은 환자 컨디션에 따라 약물 용량을 실시간으로 조절합니다. 시술 자극이 커지면 추가 주입으로 진정 깊이를 유지하고, 시술이 끝나면 약물 작용이 빠르게 사라지도록 설계되어 있습니다. 시술 중간에 통증으로 깨는 일은 거의 없습니다.',
  },
  {
    q: '어떤 진료를 수면치료로 받을 수 있나요?',
    a: '임플란트·다발성 발치·신경치료·잇몸수술·소아의 광범위 충치 치료 등 거의 모든 외과·일반 진료가 가능합니다. 단, 적용 가능 여부는 사전 상담 후 환자분의 전신 건강 상태에 따라 결정됩니다.',
  },
  {
    q: '시술 후 후유증은 없나요?',
    a: '대부분 24시간 이내에 약물이 완전히 빠져나갑니다. 일시적으로 어지러움·메스꺼움·졸음이 있을 수 있어 24시간은 운전과 중요 의사결정을 금합니다. 익일 정상 일상이 가능합니다.',
  },
  {
    q: '비용은 얼마인가요?',
    a: '시술 종류·시술 시간·진정 깊이에 따라 다릅니다. 사전 상담에서 환자분 케이스에 맞는 정확한 비용을 안내드립니다. 일부 진료는 기존 시술비에 진정 비용을 추가하는 형태로 산정됩니다.',
  },
  {
    q: '소아도 수면치료가 가능한가요?',
    a: '가능합니다. 협조가 어려운 어린이의 다수 충치·외상·발치 치료에 자주 적용됩니다. 단, 만 3세 이상이며 사전 전신 건강 평가에서 적합 판정을 받은 경우에 한합니다. 보호자 면담 후 결정합니다.',
  },
]

export const SleepTherapyTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const finalFaqs = faqs && faqs.length > 0 ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'sleep-therapy', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">SLEEP THERAPY · 수면치료 시스템</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            치과의 기억을<br/>
            바꿔드립니다,<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">꿈결처럼.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            의식하 진정(IV Sedation)으로 진료 시간을 통째로 잊으시는 경험.<br/>
            치과공포증 의사가 직접 설계한, 안전 4중 모니터링 시스템.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#process" class="btn-outline-ivory">시술 과정 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/20">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">4지표</div><div class="text-sm opacity-70">심전도·혈압·산소·호흡 동시 모니터링</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">1:1</div><div class="text-sm opacity-70">회복실 1:1 케어</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">+ 4단계</div><div class="text-sm opacity-70">무통마취 병행</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm opacity-70">연중무휴 상담</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("sleep-therapy")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-16">
            <div class="lg:col-span-5">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                의식하 진정,<br/>
                <span class="t-gold italic">전신마취가 아닙니다.</span>
              </h2>
            </div>
            <div class="lg:col-span-7 space-y-6 t-body text-lg">
              <p>
                <b>의식하 진정(IV Sedation)</b>은 정맥으로 소량의 진정제를 천천히 주입해, 환자분이 꿈결 같은 편안함 속에서 진료를 받으시도록 돕는 마취 방식입니다.
              </p>
              <p>
                <b>전신마취와 다릅니다.</b> 호흡과 자발 반응은 유지된 채, 의식만 흐려지는 상태입니다. 시술 후에는 대부분 진료 과정을 기억하지 못하지만, 회복은 전신마취보다 훨씬 빠르고 가볍습니다.
              </p>
              <p>
                대구365치과의 수면치료는 단순한 진정에서 그치지 않습니다. <b>4단계 무통마취 프로토콜과 함께 적용</b>하여, 진정으로 마음을 가라앉히고 무통마취로 통증을 차단하는 이중 안심 구조를 갖췄습니다.
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="border-l-2 border-gold pl-4">
                  <div class="text-xs text-brown-500 uppercase tracking-wider mb-1">전신마취</div>
                  <div class="t-body">의식·호흡·반응 모두 정지<br/><span class="text-sm text-brown-500">→ 회복실 장시간 필요</span></div>
                </div>
                <div class="border-l-2 border-gold pl-4">
                  <div class="text-xs text-gold uppercase tracking-wider mb-1">의식하 진정</div>
                  <div class="t-body">의식만 흐려짐, 호흡은 자발<br/><span class="text-sm text-gold">→ 30~60분 회복</span></div>
                </div>
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
              두려움을 가장<br/>
              <span class="t-gold italic">잘 아는 의사가 만든 시스템.</span>
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

      {/* 4. SAFETY SYSTEM */}
      <section id="safety" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">SAFETY · 04</div>
            <h2 class="t-display mb-6">
              4중 안전 시스템,<br/>
              <span class="t-gold italic">단 하나의 변수도 놓치지 않습니다.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto text-brown-700">
              진정 시술의 핵심은 약물이 아니라 모니터링입니다. 모든 변화를 동시에 추적하는 4중 시스템.
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {SAFETY_SYSTEM.map((s: any, i: number) => (
              <div class="bg-cream p-8 lg:p-10 rounded-xl border-l-4 border-gold">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <i class={`fas ${s.icon} text-gold text-2xl`}></i>
                  </div>
                  <div>
                    <div class="text-xs text-gold uppercase tracking-wider mb-2">SYSTEM 0{i+1}</div>
                    <h3 class="t-display text-xl mb-3">{s.title}</h3>
                    <p class="t-body text-brown-700">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDICATIONS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">INDICATIONS · 05</div>
            <h2 class="t-display">
              이런 분들께<br/>
              <span class="t-gold italic">특히 권합니다.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDICATIONS.map((ind: any) => (
              <div class="bg-ivory p-6 lg:p-8 rounded-xl">
                <i class={`fas ${ind.icon} text-gold text-2xl mb-4`}></i>
                <h3 class="t-display text-lg mb-2">{ind.title}</h3>
                <p class="t-body text-sm text-brown-700">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section id="process" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 06</div>
            <h2 class="t-display">
              사전 상담부터 익일 케어까지,<br/>
              <span class="t-gold italic">6단계 안전 동선.</span>
            </h2>
          </div>
          <div class="space-y-6">
            {PROCESS.map((p: any) => (
              <div class="grid lg:grid-cols-12 gap-6 bg-cream p-8 lg:p-10 rounded-xl">
                <div class="lg:col-span-2">
                  <div class="t-gold text-5xl lg:text-6xl font-bold display">{p.step}</div>
                  <div class="text-xs text-brown-500 uppercase tracking-wider mt-2">{p.duration}</div>
                </div>
                <div class="lg:col-span-6">
                  <h3 class="t-display text-2xl mb-3">{p.title}</h3>
                  <p class="t-body text-brown-700">{p.desc}</p>
                </div>
                <div class="lg:col-span-4">
                  <ul class="space-y-2">
                    {p.detail.map((d: string) => (
                      <li class="flex items-start gap-2 text-sm text-brown-700">
                        <i class="fas fa-check text-gold mt-1 text-xs"></i>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NOT FOR — 적합성 안내 */}
      <section class="py-24 bg-brown-950 text-ivory relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label text-gold mb-6">PRE-CHECK · 07</div>
            <h2 class="t-display" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
              사전 확인이<br/>
              <span class="italic" style="color:#c9a876;">반드시 필요한 경우.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto mt-4" style="color:#fdfbf7; opacity:0.8;">
              아래 해당 사항이 있으시면 시술 전 상담에서 반드시 알려주세요. 진정 적합성을 사전에 평가합니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            {NOT_FOR.map((n: any) => (
              <div class="bg-ivory/5 backdrop-blur p-6 lg:p-8 rounded-xl border border-ivory/10">
                <div class="flex items-start gap-3">
                  <i class="fas fa-circle-exclamation text-gold mt-1"></i>
                  <div>
                    <h3 class="t-display text-lg text-ivory mb-2">{n.risk}</h3>
                    <p class="text-sm opacity-80">{n.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CARE GUIDE */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">CARE GUIDE · 08</div>
            <h2 class="t-display">
              시술 전후<br/>
              <span class="t-gold italic">반드시 지켜주세요.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-cream p-8 lg:p-10 rounded-xl">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><i class="fas fa-clock-rotate-left text-gold"></i></div>
                <h3 class="t-display text-xl">시술 전</h3>
              </div>
              <ul class="space-y-3">
                {CARE_GUIDE.before.map((b: string) => (
                  <li class="flex items-start gap-3"><i class="fas fa-check text-gold mt-1"></i><span class="t-body">{b}</span></li>
                ))}
              </ul>
            </div>
            <div class="bg-cream p-8 lg:p-10 rounded-xl">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><i class="fas fa-heart text-gold"></i></div>
                <h3 class="t-display text-xl">시술 후</h3>
              </div>
              <ul class="space-y-3">
                {CARE_GUIDE.after.map((b: string) => (
                  <li class="flex items-start gap-3"><i class="fas fa-check text-gold mt-1"></i><span class="t-body">{b}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 09</div>
              <h2 class="t-display">
                수면치료를<br/>
                <span class="t-gold italic">담당하는 의료진.</span>
              </h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(0, 6).map((d: any) => (
                <a href={`/doctors/${d.slug}`} class="block bg-ivory rounded-xl overflow-hidden hover:shadow-lg transition group">
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

      {/* 10. CASES */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="flex items-end justify-between mb-12">
            <div>
              <div class="section-label mb-6">CASES · 10</div>
              <h2 class="t-display">실제 케이스</h2>
            </div>
            <a href="/before-after?treatment=sleep-therapy" class="hidden md:inline-flex text-sm text-gold underline">전체 보기 →</a>
          </div>
          {cases && cases.length > 0 ? (
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.slice(0, 6).map((ca: any) => (
                <a href={`/before-after/${ca.id}`} class="block group">
                  <div class="aspect-[4/3] rounded-xl overflow-hidden bg-cream mb-3">
                    {(ca.intra_before_url || ca.pano_before_url)
                      ? <img src={ca.intra_before_url || ca.pano_before_url} alt={ca.title} class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy"/>
                      : <div class="w-full h-full flex items-center justify-center text-brown-300"><i class="fas fa-image text-4xl"></i></div>}
                  </div>
                  <div class="text-xs text-gold mb-1">AFTER 사진은 로그인 후 공개</div>
                  <h3 class="t-display text-base mb-1">{ca.title}</h3>
                  <p class="text-xs text-brown-600 line-clamp-2">{ca.description}</p>
                  <div class="flex flex-wrap gap-1 mt-2">
                    {ca.age_group && <span class="text-[10px] px-2 py-0.5 bg-cream rounded-full text-brown-600">{ca.age_group}</span>}
                    {ca.treatment_period && <span class="text-[10px] px-2 py-0.5 bg-cream rounded-full text-brown-600">{ca.treatment_period}</span>}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div class="text-center py-16 bg-cream rounded-xl">
              <i class="fas fa-camera text-4xl text-brown-300 mb-4"></i>
              <p class="t-body text-brown-600">수면치료 케이스를 곧 공개합니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 11. FAQ */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">FAQ · 11</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
          <div class="space-y-3">
            {finalFaqs.map((f: any) => (
              <details class="bg-ivory rounded-xl group">
                <summary class="cursor-pointer p-6 lg:p-8 flex items-start justify-between gap-4">
                  <span class="t-display text-base lg:text-lg pr-4">{f.question}</span>
                  <i class="fas fa-plus text-gold mt-1 group-open:rotate-45 transition"></i>
                </summary>
                <div class="px-6 lg:px-8 pb-6 lg:pb-8 t-body text-brown-700 leading-relaxed">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. DICTIONARY */}
      {dictTerms && dictTerms.length > 0 && (
        <section class="py-20 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="section-label mb-6">DICTIONARY · 12</div>
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

      {/* 13. FINAL CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-10" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 13</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            치과의 기억은<br/>
            <span class="italic" style="color:#c9a876;">바꿀 수 있습니다.</span>
          </h2>
          <p class="t-lead text-lg lg:text-xl mb-10" style="color:#fdfbf7; opacity:0.9;">
            상담은 무료입니다. 두려움부터, 천천히 풀어드릴게요.
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
