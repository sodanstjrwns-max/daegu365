import { Navbar, Footer, TldrBox, ComparisonTable } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import { comparisonFor } from '../lib/comparison-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 소아 교정장치 풀볼륨 상세 페이지 v1
   - 골든타임 7~10세 강조
   - RPE 50만원 / 근기능장치 70만원 / 페이스마스크 등 (수가표 기반)
   - 부모 가이드 챕터 포함
   ============================================================ */

const DEVICES = [
  {
    name: 'RPE (구개확장장치)',
    eng: 'Rapid Palatal Expander',
    price: '50만원',
    badge: 'BEST FOR 7-10세',
    desc: '좁은 위턱을 옆으로 넓혀주는 고정식 장치. 위·아래턱 폭이 안 맞는 경우, 영구치가 들어갈 자리를 만드는 핵심 장치.',
    points: ['고정식 (스스로 빼지 않음)', '하루 1~2회 키 돌리기', '평균 3~6개월 사용'],
  },
  {
    name: '근기능장치 (프리올소)',
    eng: 'Myofunctional Appliance',
    price: '70만원',
    desc: '입 호흡·혀 위치·삼킴 습관을 바로잡는 탈착식 장치. 잘못된 구강 습관이 부정교합의 진짜 원인일 때 적용.',
    points: ['탈착식 (밤·집에서 착용)', '구강 근육 기능 개선', '추가 시 20만원'],
  },
  {
    name: '페이스마스크',
    eng: 'Reverse Pull Headgear',
    price: '상담가',
    desc: '주걱턱(3급) 경향이 보이는 어린이의 위턱 성장을 앞으로 당겨주는 장치. 골든타임을 놓치면 수술해야 할 케이스를 비수술로.',
    points: ['집에서 12~14시간 착용', '7~10세 골든타임 한정', '얼굴형 자체를 바꿀 수 있음'],
  },
  {
    name: '공간유지장치',
    eng: 'Space Maintainer',
    price: '20~40만원',
    desc: '유치를 일찍 잃었을 때 영구치 자리를 미리 확보하는 장치. Band&Loop·Nance·Lingual arch 등 케이스별 맞춤.',
    points: ['Band & Loop 20만원', 'Nance/Lingual 40만원', '영구치 맹출까지 사용'],
  },
  {
    name: '할터만 장치',
    eng: 'Halterman Appliance',
    price: '35만원',
    desc: '제1대구치(#6번 어금니)가 잘못된 위치로 나오는 “락킹” 케이스를 풀어주는 장치. 재료 교체 시 3만원 추가.',
    points: ['제1대구치 위치 교정', '재료 교체 시 +3만원', '단기 적용'],
  },
  {
    name: 'MRC 마이오브레이스',
    eng: 'MRC Myobrace',
    price: '상담가',
    desc: '구강 습관 교정 + 부정교합 예방을 동시에 잡는 단계별 시스템. 4~12세 사이 적용 가능한 호주발 시스템.',
    points: ['단계별 트레이너 시리즈', '구강 근육 기능 통합 관리', '잠자는 동안 + 1시간 착용'],
  },
]

const GOLDEN_TIME = [
  {
    age: '4~6세',
    title: '예방기',
    desc: '유치열 완성기. 입 호흡·손가락 빨기·혀 내밀기 등 잘못된 구강 습관을 잡아주는 시기. MRC·근기능장치 적용.',
    color: 'from-yellow-100',
  },
  {
    age: '7~10세',
    title: '골든타임 ★',
    desc: '혼합치열기. 위·아래턱 성장이 가장 활발한 시기. RPE·페이스마스크가 가장 효과적이며, 골격성 부정교합을 비수술로 잡을 수 있는 마지막 기회.',
    color: 'from-gold/30',
    highlight: true,
  },
  {
    age: '11~12세',
    title: '준비기',
    desc: '영구치열로 전환되는 시기. 1차 교정(골격) → 2차 교정(치아 정렬) 사이 휴지기. 필요 시 공간유지·보정.',
    color: 'from-orange-100',
  },
  {
    age: '13세 이상',
    title: '본격 교정기',
    desc: '영구치열 완성. 인비절라인·브라켓 본격 교정 단계. 7~10세에 1차 교정을 받았다면 훨씬 단순해집니다.',
    color: 'from-brown-200',
  },
]

const SIGNS = [
  { sign: '자주 입을 벌리고 있어요', cause: '입 호흡 습관 → 위턱 좁아짐', icon: 'fa-face-tired' },
  { sign: '코를 자주 골아요', cause: '비좁은 위턱 / 아데노이드 문제', icon: 'fa-bed' },
  { sign: '아래턱이 위턱보다 나와 있어요', cause: '주걱턱 경향 (3급)', icon: 'fa-arrow-down' },
  { sign: '치아가 비뚤어져 나오고 있어요', cause: '공간 부족 → 영구치 맹출 이상', icon: 'fa-tooth' },
  { sign: '음식을 한쪽으로만 씹어요', cause: '교합 비대칭', icon: 'fa-burger' },
  { sign: '발음이 부정확해요', cause: '혀 위치·구개 형태 문제', icon: 'fa-comment' },
]

const PROCESS = [
  {
    step: '01',
    title: '정밀 진단 (1회 방문)',
    duration: '약 60분',
    desc: '파노라마·세팔로·구강스캔으로 골격·치아·기도까지 입체 분석. 부정교합의 진짜 원인을 찾습니다.',
    detail: ['파노라마·세팔로 X-ray', '디지털 구강 스캔', '얼굴형 사진', '구강 습관 문진'],
  },
  {
    step: '02',
    title: '부모 상담 + 치료 계획',
    duration: '진단 후 1주 이내',
    desc: '진단 결과를 부모님께 직접 설명. 골든타임·예상 기간·비용·장치 종류를 모두 공개합니다.',
    detail: ['진단 결과 공유', '장치 선택지 안내', '예상 기간·비용', '협조도 확인'],
  },
  {
    step: '03',
    title: '장치 제작 + 적응기',
    duration: '1~2주',
    desc: '맞춤 장치 제작. 첫 장치 끼울 때 어색함을 줄이는 단계별 적응 가이드 제공.',
    detail: ['디지털 모형 채득', '기공실 정밀 제작', '아이 적응 코칭', '부모 사용법 교육'],
  },
  {
    step: '04',
    title: '주기 점검 (4~6주 1회)',
    duration: '치료 기간 내내',
    desc: '장치 조절·구강 상태 점검. 협조도가 떨어지면 부모와 함께 점검하고 조정합니다.',
    detail: ['장치 조절', '구강 위생 점검', '협조도 평가', '다음 단계 안내'],
  },
  {
    step: '05',
    title: '1차 교정 종료',
    duration: '평균 6~12개월',
    desc: '골격 교정이 끝나면 보정 장치 단계로. 영구치가 모두 나올 때까지 정기 관찰.',
    detail: ['결과 평가', '보정 장치 전환', '영구치 맹출 추적', '필요 시 2차 교정 안내'],
  },
]

const WHY_US = [
  {
    icon: 'fa-bullseye',
    title: '골든타임을 놓치지 않는 정밀 진단',
    desc: '파노라마·세팔로·기도 분석까지 입체적 진단. “지금 시작해야 하는지” 정확히 판단합니다.',
  },
  {
    icon: 'fa-puzzle-piece',
    title: '6종 장치 풀라인업',
    desc: 'RPE·근기능·페이스마스크·MRC·공간유지·할터만까지 한 곳에서. 케이스마다 가장 적합한 장치 선택.',
  },
  {
    icon: 'fa-handshake',
    title: '부모 동행 시스템',
    desc: '아이 협조도가 1차 교정의 성패를 좌우합니다. 매 점검마다 부모님과 함께 진행 상황을 공유합니다.',
  },
  {
    icon: 'fa-route',
    title: '평생 관리 로드맵',
    desc: '1차 교정 → 영구치 맹출 추적 → 2차 인비절라인까지. 한 병원에서 평생 관리되는 장점.',
  },
]

const PARENT_GUIDE = {
  do: [
    '하루 1회는 장치 청소 직접 도와주세요',
    '협조하는 날엔 칭찬·작은 보상으로 동기부여',
    '주기 점검 일정을 우선순위로 잡아주세요',
    '아이 불편함을 “과장 말기”로 듣고 격려',
    '입 호흡·손빨기 습관을 조용히 알려주기',
  ],
  dont: [
    '장치 빼라고 야단치지 마세요 (역효과)',
    '장치 깨끗이 못한다고 비교·꾸짖기 금물',
    '딱딱하거나 끈적이는 음식은 잠시 멈추기',
    '“언제 끝나?” 압박은 협조도 저하 원인',
    '장치 분실 시 즉시 병원 연락 (방치 금지)',
  ],
}

const DEFAULT_FAQS = [
  {
    q: '소아 교정은 언제 시작해야 하나요?',
    a: '“7세 첫 검진”이 국제 표준입니다. 모든 아이가 7세에 교정을 받는다는 뜻이 아니라, 7세에 한 번 진단을 받아 “지금 필요한지·언제 필요한지”를 확인하라는 의미입니다. 7~10세는 골격 교정의 골든타임이라 이 시기를 놓치면 수술해야 할 케이스도 있습니다.',
  },
  {
    q: '1차 교정만 하면 2차(영구치) 교정은 안 해도 되나요?',
    a: '케이스에 따라 다릅니다. 골격 부정교합(주걱턱·좁은 위턱 등)을 1차에서 잡으면 2차가 단순해지거나 생략 가능합니다. 다만 치아 정렬은 영구치가 모두 난 후 다시 평가해야 하므로, 1차 종료 후에도 정기 관찰이 필요합니다.',
  },
  {
    q: 'RPE는 정말 효과가 있나요? 아이가 아파하지 않나요?',
    a: '7~10세 위턱 봉합선이 닫히기 전에 사용하면 매우 효과적입니다. 키 돌리는 첫 1~2일은 약간의 압박감이 있지만 통증이라기보다 “당김” 정도이며, 1주 내 적응합니다. 장기적으로는 영구치 공간 확보·코 호흡 개선까지 가져옵니다.',
  },
  {
    q: '아이가 장치를 잘 안 끼면 어떻게 하나요?',
    a: '아이의 협조도는 1차 교정의 성패를 좌우합니다. 대구365치과는 매 점검 시 부모님과 함께 협조도를 공유하고, 동기부여 코칭을 함께 진행합니다. 협조가 어려우면 탈착식 → 고정식으로 장치 종류를 바꾸기도 합니다.',
  },
  {
    q: '비용은 얼마인가요?',
    a: 'RPE 50만원, 근기능장치(프리올소) 70만원, 공간유지장치 20~40만원, 할터만 35만원, 페이스마스크·MRC는 케이스별 상담가입니다. 사전 진단 후 정확한 비용을 안내드립니다.',
  },
  {
    q: '소아 교정 중에도 충치 치료·예방 관리가 필요한가요?',
    a: '오히려 더 중요합니다. 장치가 들어가면 칫솔 사각지대가 늘어나서 충치 위험이 커집니다. 정기 GBT 에어플로우와 불소바니쉬, 실란트(홈메우기)를 병행 권장합니다.',
  },
]

export const PediatricOrthoTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const finalFaqs = faqs && faqs.length > 0 ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'pediatric-ortho', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/precision-arch-corridor.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PEDIATRIC ORTHO · 소아 교정장치</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            7~10세,<br/>
            얼굴이 만들어지는<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">단 한 번의 시기.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            골격성 부정교합을 비수술로 잡을 수 있는 골든타임.<br/>
            RPE·페이스마스크·근기능 장치 6종 풀라인업.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#golden" class="btn-outline-ivory">골든타임 자세히 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">7세</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">첫 교정 검진 권장 시기</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">6종</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">장치 풀라인업</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">50만원~</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">RPE 시작가</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">평생</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">2차 교정까지 관리</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("pediatric-ortho")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}
      {/* ===== Comparison Table — AEO 'A vs B' 검색 직격 ===== */}
      {(() => {
        const _cmp = comparisonFor("pediatric-ortho")
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
                소아 교정은<br/>
                <span class="t-gold italic">치아가 아니라 “턱”입니다.</span>
              </h2>
            </div>
            <div class="lg:col-span-7 space-y-6 t-body text-lg">
              <p>
                많은 부모님이 “아이 치아가 비뚤어졌으니 교정해야 할까?”로 시작하시지만, 사실 소아 교정의 핵심은 <b>치아가 아니라 턱(골격)</b>입니다. 7~10세는 위·아래턱이 가장 활발하게 성장하는 시기로, 이때만 가능한 골격 교정이 평생을 좌우합니다.
              </p>
              <p>
                이 시기를 놓치면 어떻게 될까요? 골격성 부정교합(주걱턱·좁은 위턱 등)은 영구치열이 되면 <b>양악수술 외에는 답이 없는 케이스</b>가 됩니다. 반대로 7~10세에 RPE·페이스마스크로 잡으면 비수술로 끝납니다.
              </p>
              <p>
                대구365치과의 소아 교정은 <b>“얼굴이 만들어지는 단 한 번의 시기”</b>를 놓치지 않는 정밀 진단에서 시작합니다.
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="border-l-2 border-brown-300 pl-4">
                  <div class="text-xs text-brown-500 uppercase tracking-wider mb-1">놓친 케이스</div>
                  <div class="t-body">영구치열 + 양악수술<br/><span class="text-sm text-brown-500">→ 수백만원·전신마취</span></div>
                </div>
                <div class="border-l-2 border-gold pl-4">
                  <div class="text-xs text-gold uppercase tracking-wider mb-1">제때 시작</div>
                  <div class="t-body">7~10세 + 1차 교정<br/><span class="text-sm text-gold">→ 비수술·얼굴형 자체 변화</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOLDEN TIME */}
      <section id="golden" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">GOLDEN TIME · 03</div>
            <h2 class="t-display">
              연령별<br/>
              <span class="t-gold italic">소아 교정 타임라인.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GOLDEN_TIME.map((g: any) => (
              <div class={`p-6 lg:p-8 rounded-xl ${g.highlight ? 'bg-brown-950 border-2 border-gold relative overflow-hidden' : 'bg-ivory'}`}>
                {g.highlight && <div class="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-gold text-brown-950 font-bold">GOLDEN</div>}
                <div class={`text-xs uppercase tracking-wider mb-3 ${g.highlight ? 'text-gold' : 'text-brown-500'}`}>{g.age}</div>
                <h3 class="t-display text-xl mb-3" style={g.highlight ? 'color:#fdfbf7;' : ''}>{g.title}</h3>
                <p class={`text-sm ${!g.highlight ? 'text-brown-700' : ''}`} style={g.highlight ? 'color:#fdfbf7;opacity:0.85;' : ''}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIGNS — 부모 체크리스트 */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PARENT CHECK · 04</div>
            <h2 class="t-display">
              이런 신호가 있다면,<br/>
              <span class="t-gold italic">바로 검진을.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto mt-4 text-brown-700">
              아래 한 가지라도 해당되면 7세 전후 첫 교정 진단을 권장합니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SIGNS.map((s: any) => (
              <div class="bg-cream p-6 lg:p-8 rounded-xl border-l-4 border-gold">
                <i class={`fas ${s.icon} text-gold text-2xl mb-4`}></i>
                <h3 class="t-display text-lg mb-2">{s.sign}</h3>
                <p class="text-sm text-brown-600">→ {s.cause}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY DAEGU365 */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 05</div>
            <h2 class="t-display">
              아이 협조도까지<br/>
              <span class="t-gold italic">설계합니다.</span>
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

      {/* 6. DEVICES */}
      <section id="devices" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">DEVICES · 06</div>
            <h2 class="t-display mb-6">
              6종 장치<br/>
              <span class="t-gold italic">풀라인업.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto text-brown-700">
              한 가지 장치로 모든 케이스를 해결할 수 없습니다. 케이스마다 가장 적합한 장치를 선택합니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEVICES.map((d: any) => (
              <div class="bg-cream p-6 lg:p-8 rounded-xl flex flex-col">
                {d.badge && <div class="text-xs px-2 py-1 rounded-full bg-gold text-brown-950 font-bold inline-block self-start mb-3">{d.badge}</div>}
                <div class="text-xs text-brown-500 uppercase tracking-wider mb-1">{d.eng}</div>
                <h3 class="t-display text-xl mb-2">{d.name}</h3>
                <div class="t-gold text-2xl font-bold display mb-3">{d.price}</div>
                <p class="t-body text-sm text-brown-700 mb-4 flex-1">{d.desc}</p>
                <ul class="space-y-1 pt-3 border-t border-brown-200">
                  {d.points.map((p: string) => (
                    <li class="flex items-start gap-2 text-xs text-brown-600">
                      <i class="fas fa-check text-gold mt-1 text-[10px]"></i><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 07</div>
            <h2 class="t-display">
              진단부터 1차 교정 종료까지,<br/>
              <span class="t-gold italic">5단계 동선.</span>
            </h2>
          </div>
          <div class="space-y-6">
            {PROCESS.map((p: any) => (
              <div class="grid lg:grid-cols-12 gap-6 bg-ivory p-8 lg:p-10 rounded-xl">
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
                        <i class="fas fa-check text-gold mt-1 text-xs"></i><span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARENT GUIDE */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PARENT GUIDE · 08</div>
            <h2 class="t-display">
              부모님께 드리는<br/>
              <span class="t-gold italic">동행 가이드.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto mt-4 text-brown-700">
              아이의 협조도가 1차 교정의 성패를 좌우합니다. 부모님이 함께 만들어 주세요.
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-cream p-8 lg:p-10 rounded-xl border-l-4 border-gold">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><i class="fas fa-check text-gold"></i></div>
                <h3 class="t-display text-xl">DO · 함께 해주세요</h3>
              </div>
              <ul class="space-y-3">
                {PARENT_GUIDE.do.map((d: string) => (
                  <li class="flex items-start gap-3"><i class="fas fa-circle-check text-gold mt-1"></i><span class="t-body">{d}</span></li>
                ))}
              </ul>
            </div>
            <div class="bg-cream p-8 lg:p-10 rounded-xl border-l-4 border-brown-400">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-full bg-brown-200 flex items-center justify-center"><i class="fas fa-xmark text-brown-700"></i></div>
                <h3 class="t-display text-xl">DON'T · 피해주세요</h3>
              </div>
              <ul class="space-y-3">
                {PARENT_GUIDE.dont.map((d: string) => (
                  <li class="flex items-start gap-3"><i class="fas fa-circle-xmark text-brown-400 mt-1"></i><span class="t-body">{d}</span></li>
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
              <h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2>
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
            <a href="/before-after?treatment=pediatric-ortho" class="hidden md:inline-flex text-sm text-gold underline">전체 보기 →</a>
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
                </a>
              ))}
            </div>
          ) : (
            <div class="text-center py-16 bg-cream rounded-xl">
              <i class="fas fa-camera text-4xl text-brown-300 mb-4"></i>
              <p class="t-body text-brown-600">소아 교정 케이스를 곧 공개합니다.</p>
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

      {/* 12. FINAL CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-10" style="background-image:url('/r2/images/clinic/precision-arch-corridor.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 12</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            7세,<br/>
            <span class="italic" style="color:#c9a876;">한 번의 검진이 평생을 바꿉니다.</span>
          </h2>
          <p class="t-lead text-lg lg:text-xl mb-10" style="color:#fdfbf7; opacity:0.9;">
            첫 진단은 “시작”이 아니라 “필요한지 확인”입니다.
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
