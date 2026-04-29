import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 에어플로우 (GBT) 풀볼륨 상세 페이지 v1
   - GBT 8단계 프로토콜 (EMS Switzerland Standard)
   - 일반 스케일링 vs GBT 비교
   - 비용 미언급 → 상담 안내
   ============================================================ */

const GBT_STEPS = [
  {
    step: '01',
    name: '구강 진단 (Assess)',
    desc: '구강 위생 상태·잇몸·기존 보철물 점검. 환자별 위험 요소를 파악합니다.',
  },
  {
    step: '02',
    name: '플라크 시각화 (Disclose)',
    desc: '특수 염색약으로 눈에 보이지 않는 플라크를 빨간색으로 가시화. “어디가 문제인지” 정확히 보여드립니다.',
  },
  {
    step: '03',
    name: '환자 동기 부여 (Motivate)',
    desc: '시각화된 부위를 함께 보며 칫솔질 사각지대를 코칭. 일회성 처치가 아닌 평생 위생 습관을 만듭니다.',
  },
  {
    step: '04',
    name: '에어플로우 (Airflow)',
    desc: '에리스리톨 분말과 미세한 물·공기를 혼합해 분사. 치아·잇몸 손상 없이 플라크와 착색을 동시에 제거합니다.',
  },
  {
    step: '05',
    name: '페리오플로우 (Perioflow)',
    desc: '잇몸 깊은 주머니(4mm 이상)에 글라이신 분말로 정밀 세척. 일반 스케일러가 닿지 못하는 곳까지.',
  },
  {
    step: '06',
    name: '피에조 스케일링 (Piezon)',
    desc: '남은 단단한 치석(스케일링 대상)만 미세 진동으로 정밀 제거. 부드러운 부위는 손대지 않습니다.',
  },
  {
    step: '07',
    name: '구강 점검 (Check)',
    desc: '제거 결과를 다시 점검하고 잔여물 확인. 필요 시 즉시 추가 처치합니다.',
  },
  {
    step: '08',
    name: '리콜 예약 (Recall)',
    desc: '환자별 위험도에 따라 다음 방문 일정 제안. 3·6·12개월 맞춤 리콜 시스템.',
  },
]

const VS_GENERAL = [
  {
    item: '일반 스케일링',
    points: [
      '금속 스케일러로 일괄 제거',
      '치아 표면 미세 손상 가능',
      '잇몸 출혈·시린 증상 흔함',
      '플라크 시각화 없음',
      '깊은 주머니 청소 어려움',
      '시술 시간 짧지만 자극적',
    ],
    color: 'brown-300',
  },
  {
    item: 'GBT 에어플로우',
    points: [
      '8단계 표준 프로토콜',
      '치아 손상 없이 플라크 제거',
      '잇몸 자극 최소화',
      '플라크 가시화 후 정밀 제거',
      '페리오플로우로 깊은 주머니까지',
      '시간은 길지만 매우 부드러움',
    ],
    color: 'gold',
    highlight: true,
  },
]

const INDICATIONS = [
  {
    title: '임플란트 환자',
    desc: '임플란트 주위염 예방의 핵심. 일반 스케일러는 임플란트 표면을 긁어 박테리아 부착을 늘립니다. GBT는 표면을 보호합니다.',
    icon: 'fa-screwdriver-wrench',
  },
  {
    title: '교정 치료 중',
    desc: '브라켓·와이어·인비절라인 어태치먼트 주변은 칫솔이 닿기 어려운 사각지대. GBT가 정밀 세정합니다.',
    icon: 'fa-grip-lines',
  },
  {
    title: '치주 치료 환자',
    desc: '잇몸 수술 후 또는 치주염 진행 환자에게 페리오플로우로 깊은 주머니 관리.',
    icon: 'fa-leaf',
  },
  {
    title: '보철·심미 보철 환자',
    desc: '라미네이트·크라운 표면은 일반 스케일러가 손상시킬 수 있어 더욱 GBT가 필수.',
    icon: 'fa-tooth',
  },
  {
    title: '구취가 신경 쓰이는 분',
    desc: '구취 원인의 80% 이상이 구강 내 박테리아·플라크. 시각화 후 정밀 제거로 즉각적 변화.',
    icon: 'fa-wind',
  },
  {
    title: '예방 관리를 원하는 분',
    desc: '연 1~2회 정기 GBT만으로도 충치·치주염 발생률을 큰 폭으로 낮춥니다.',
    icon: 'fa-shield-heart',
  },
]

const WHY_US = [
  {
    icon: 'fa-certificate',
    title: 'EMS 스위스 정품 장비',
    desc: 'GBT 프로토콜의 원조 EMS Switzerland 정식 장비 운영. 분말·노즐·압력 모두 정품 표준.',
  },
  {
    icon: 'fa-list-ol',
    title: '8단계 표준 프로토콜 준수',
    desc: '한 단계도 생략하지 않는 풀 GBT 시퀀스. 시술 시간이 길어도 표준대로 진행합니다.',
  },
  {
    icon: 'fa-eye',
    title: '플라크 시각화로 환자 동기 부여',
    desc: '단순 처치를 넘어 평생 위생 습관을 만드는 코칭. 환자분이 “보면서” 배우십니다.',
  },
  {
    icon: 'fa-clock-rotate-left',
    title: '맞춤 리콜 시스템',
    desc: '구강 위생 위험도에 따라 3·6·12개월 맞춤 리콜. PRM 시스템으로 자동 알림 발송.',
  },
]

const CARE_AFTER = [
  '시술 후 2시간은 색소 강한 음식 자제 (커피·홍차·카레·와인)',
  '담배는 24시간 자제 권장',
  '시린 증상은 대부분 24시간 이내 회복',
  '평소 칫솔질을 유지하되 첫 12시간은 부드럽게',
  '치실·치간칫솔 사용을 일상화하세요',
  '권장 리콜 주기를 지켜주세요 (3·6·12개월)',
]

const DEFAULT_FAQS = [
  {
    q: '에어플로우(GBT)와 일반 스케일링의 가장 큰 차이는 무엇인가요?',
    a: 'GBT는 8단계 표준 프로토콜로 진행되는 “시스템”이고, 일반 스케일링은 단일 처치입니다. GBT는 플라크 시각화 → 미세 분말로 부드럽게 제거 → 깊은 주머니까지 정밀 세정 → 단단한 치석만 선택적 제거의 순서로, 치아·잇몸 자극을 결정적으로 줄입니다.',
  },
  {
    q: '시린 증상이 있나요?',
    a: '일반 스케일링보다 훨씬 덜합니다. 금속 스케일러가 치아 표면에 직접 닿지 않고, 미세 분말과 물의 혼합 분사로 작동하기 때문입니다. 시린 증상이 있어도 24시간 이내 대부분 회복됩니다.',
  },
  {
    q: '시술 시간은 얼마나 걸리나요?',
    a: '구강 상태에 따라 30~60분 정도. 8단계 프로토콜을 모두 진행하기 때문에 일반 스케일링보다 길지만, 자극은 훨씬 적습니다.',
  },
  {
    q: '임플란트가 있어도 받을 수 있나요?',
    a: '오히려 임플란트 환자에게 GBT를 강력히 권합니다. 일반 스케일러는 임플란트 표면을 긁어 박테리아 부착을 증가시키지만, GBT의 분말·물 혼합 분사는 임플란트 표면을 손상시키지 않으면서 주위염을 예방합니다.',
  },
  {
    q: '얼마나 자주 받아야 하나요?',
    a: '일반적으로 6~12개월 1회 권장합니다. 임플란트·교정·치주 치료 중인 분은 3~6개월 주기를 권합니다. 환자별 위험도에 따라 맞춤 리콜 일정을 안내드립니다.',
  },
  {
    q: '비용은 얼마인가요?',
    a: '구강 상태와 시술 범위에 따라 다릅니다. 사전 진단 후 정확한 비용을 안내드립니다. 일반 스케일링과는 다른 시스템이기에 가격 비교가 직접적으로 어렵다는 점을 양해 부탁드립니다.',
  },
]

export const AirflowGBTTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const finalFaqs = faqs && faqs.length > 0 ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'airflow-gbt', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-digital-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">AIRFLOW · GBT 8단계 프로토콜</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            긁어내지 않습니다.<br/>
            플라크만<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">씻어냅니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            EMS 스위스 정품 장비, GBT 8단계 표준 프로토콜.<br/>
            치아·잇몸 손상 없는 차세대 구강 위생 관리.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#protocol" class="btn-outline-ivory">8단계 프로토콜 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">8단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">EMS 표준 프로토콜</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">EMS</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">스위스 정품 장비</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">3·6·12</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">맞춤 리콜 주기</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 예약</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-16">
            <div class="lg:col-span-5">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                GBT는 “스케일링”이<br/>
                <span class="t-gold italic">아닙니다.</span>
              </h2>
            </div>
            <div class="lg:col-span-7 space-y-6 t-body text-lg">
              <p>
                <b>GBT(Guided Biofilm Therapy)</b>는 스위스 EMS사가 개발한 차세대 구강 위생 시스템입니다. 단일 처치가 아닌 <b>8단계 표준 프로토콜</b>로 운영되며, 전 세계 임상에서 “치아 손상 없는 위생 관리”의 새로운 기준이 되었습니다.
              </p>
              <p>
                전통적인 스케일링이 “단단한 치석을 금속으로 긁어내는” 방식이었다면, GBT는 <b>“플라크(생물막)를 가시화한 뒤 미세 분말과 물로 부드럽게 씻어내는”</b> 방식입니다. 플라크는 모든 충치·치주염의 시작점입니다.
              </p>
              <p>
                대구365치과는 EMS 스위스 정품 장비를 운영하며, 8단계 프로토콜을 한 단계도 생략하지 않고 표준대로 진행합니다.
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="border-l-2 border-brown-300 pl-4">
                  <div class="text-xs text-brown-500 uppercase tracking-wider mb-1">전통 스케일링</div>
                  <div class="t-body">단단한 치석 → 금속으로 긁기<br/><span class="text-sm text-brown-500">→ 표면 손상 가능</span></div>
                </div>
                <div class="border-l-2 border-gold pl-4">
                  <div class="text-xs text-gold uppercase tracking-wider mb-1">GBT 에어플로우</div>
                  <div class="t-body">플라크 시각화 → 분말로 씻기<br/><span class="text-sm text-gold">→ 표면 손상 없음</span></div>
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
              한 단계도<br/>
              <span class="t-gold italic">생략하지 않습니다.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {WHY_US.map((f: any) => (
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

      {/* 4. PROTOCOL — 8 STEPS */}
      <section id="protocol" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROTOCOL · 04</div>
            <h2 class="t-display mb-6">
              GBT 8단계,<br/>
              <span class="t-gold italic">전 과정을 공개합니다.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto text-brown-700">
              EMS Switzerland가 정의한 표준 시퀀스. 한 단계도 빠지지 않습니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            {GBT_STEPS.map((s: any) => (
              <div class="bg-cream p-6 lg:p-8 rounded-xl border-l-4 border-gold">
                <div class="flex items-start gap-4">
                  <div class="t-gold display text-4xl lg:text-5xl font-bold flex-shrink-0">{s.step}</div>
                  <div>
                    <h3 class="t-display text-lg mb-2">{s.name}</h3>
                    <p class="t-body text-sm text-brown-700">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARE */}
      <section class="py-24 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">COMPARE · 05</div>
            <h2 class="t-display">
              일반 스케일링 vs<br/>
              <span class="t-gold italic">GBT 에어플로우.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {VS_GENERAL.map((c: any) => (
              <div class={`p-8 lg:p-10 rounded-xl ${c.highlight ? 'bg-brown-950' : 'bg-ivory'}`}>
                <div class={`text-xs uppercase tracking-wider mb-4 ${c.highlight ? 'text-gold' : 'text-brown-500'}`}>{c.highlight ? 'OUR STANDARD' : 'GENERAL'}</div>
                <h3 class="t-display text-2xl mb-6" style={c.highlight ? 'color:#fdfbf7;' : ''}>{c.item}</h3>
                <ul class="space-y-3">
                  {c.points.map((p: string) => (
                    <li class="flex items-start gap-3">
                      <i class={`fas ${c.highlight ? 'fa-check text-gold' : 'fa-minus text-brown-400'} mt-1`}></i>
                      <span style={c.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''} class={!c.highlight ? 'text-brown-700' : ''}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDICATIONS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">INDICATIONS · 06</div>
            <h2 class="t-display">
              이런 분들께<br/>
              <span class="t-gold italic">반드시 권합니다.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDICATIONS.map((ind: any) => (
              <div class="bg-cream p-6 lg:p-8 rounded-xl">
                <i class={`fas ${ind.icon} text-gold text-2xl mb-4`}></i>
                <h3 class="t-display text-lg mb-2">{ind.title}</h3>
                <p class="t-body text-sm text-brown-700">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CARE AFTER */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">CARE AFTER · 07</div>
            <h2 class="t-display">
              시술 후<br/>
              <span class="t-gold italic">관리 가이드.</span>
            </h2>
          </div>
          <div class="bg-ivory p-8 lg:p-12 rounded-xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><i class="fas fa-heart text-gold"></i></div>
              <h3 class="t-display text-xl">시술 직후 ~ 24시간</h3>
            </div>
            <ul class="grid md:grid-cols-2 gap-4">
              {CARE_AFTER.map((c: string) => (
                <li class="flex items-start gap-3"><i class="fas fa-check text-gold mt-1"></i><span class="t-body">{c}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 08</div>
              <h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2>
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

      {/* 9. FAQ */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <div class="section-label mb-6">FAQ · 09</div>
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

      {/* 10. DICTIONARY */}
      {dictTerms && dictTerms.length > 0 && (
        <section class="py-20 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="section-label mb-6">DICTIONARY · 10</div>
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

      {/* 11. FINAL CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-10" style="background-image:url('/r2/images/clinic/care-digital-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 11</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            예방이<br/>
            <span class="italic" style="color:#c9a876;">치료보다 빠릅니다.</span>
          </h2>
          <p class="t-lead text-lg lg:text-xl mb-10" style="color:#fdfbf7; opacity:0.9;">
            구강 위생도 시스템입니다. 정기 GBT로 시작하세요.
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
