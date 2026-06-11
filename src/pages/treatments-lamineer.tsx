import { Navbar, Footer, ComparisonTable, DoctorProfileBlock } from '../components/Layout'
import { comparisonFor } from '../lib/comparison-data'
import { getDoctorPhoto } from './doctors'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 라미네이트 (VINIQUE) 풀볼륨 v1
   - 수가표(2026): 라미네이트 60만원 (VAT 10% 별도)
   - 무삭제·최소삭제 프로토콜, 원내 D.LAB 디지털 기공실
   ============================================================ */

/* ============================================================
   VINIQUE 2-Tier 라인업 (2026 라미네이트 가이드)
   - Standard: 입문용 솔루션, Nano Hybrid Ceramic, 213MPa, 1년 보증
   - Premium:  완벽 솔루션, Glass Ceramic Lithium Disilicate, 510MPa, 5년 보증
   ============================================================ */
const VINIQUE_TIERS = [
  {
    tier: 'STANDARD',
    name: 'VINIQUE Standard',
    tagline: '자연스러운 변화와 합리적 가격',
    headline: '라미네이트가 처음이거나 두려운 분께',
    material: 'Nano Hybrid Ceramic',
    materialKr: '나노 하이브리드 세라믹',
    block: 'Denbio NT Mill Hybrid (CAD/CAM 디스크)',
    strength: 213,
    warranty: '1년',
    image: '/r2/images/treatments/vinique/nt-mill-hybrid-disk.jpg',
    desc: '나노입자 세라믹(0.3~0.7㎛ 필러)으로 자연치아와 유사한 질감을 구현합니다. 최소 삭제 프로토콜로 자연 치아 건강을 우선적으로 보호합니다.',
    points: [
      '최소 삭제 — 자연치 건강 우선 보호',
      '나노 소재 — 0.3~0.7㎛ 필러로 정교한 심미성',
      '합리적 가격 — 입문용 솔루션',
      '추천: 앞니 벌어짐, 블랙 트라이앵글, 미세 형태 개선',
    ],
  },
  {
    tier: 'PREMIUM',
    name: 'VINIQUE Premium',
    tagline: '압도적 심미와 높은 강도',
    headline: '형태와 색상을 동시에 완벽하게',
    material: 'Glass Ceramic (Lithium Disilicate)',
    materialKr: '글라스 세라믹 리튬 디실리케이트',
    block: 'Rosetta SP / IPS e.max® Press (LS₂ ingot)',
    strength: 510,
    warranty: '5년',
    image: '/r2/images/treatments/vinique/rosetta-emax-ingots.jpg',
    desc: '프리미엄 글라스 세라믹 블록으로 치아의 형태와 색상을 동시에 완벽하게 개선합니다. Standard 대비 2.4배 강한 510MPa 굴곡강도로 5년의 반영구적 보증을 제공합니다.',
    points: [
      '강력한 강도 — Standard 대비 2.4배 (510MPa 굴곡강도)',
      '5년 반영구 보증 — 글로벌 프리미엄 등급',
      'Smile Design — 3D 구강스캔 + 안면 분석 시뮬레이션',
      '추천: 형태 + 색상 동시 개선, 스마일 라인 교정',
    ],
    badge: 'BEST',
  },
]

/* 라인업 비교 매트릭스 (PPT 3페이지 기반) */
const TIER_MATRIX = [
  { row: '주요 소재',  std: '나노 하이브리드 세라믹',         pre: '글라스 세라믹 리튬 디실리케이트' },
  { row: '굴곡 강도',  std: '213 MPa',                     pre: '510 MPa (Standard 대비 2.4×)' },
  { row: '보증 기간',  std: '1년',                          pre: '5년 (반영구)' },
  { row: '주요 특징',  std: '합리적 가격, 자연스러운 변화',     pre: '예측 가능한 Smile Design, 완벽한 개선' },
  { row: '권장 케이스', std: '가벼운 형태 개선, 미세 조정',     pre: '형태 + 색상 동시 개선, 스마일라인 교정' },
  { row: '추천 환자',  std: '라미네이트가 처음이신 분',         pre: '높은 품질 보증과 내구성을 원하는 분' },
]

/* 원내 D.LAB STUDIO 365 갤러리 (실제 시술 공정 입증) */
const DLAB_GALLERY = [
  {
    img: '/r2/images/treatments/vinique/dlab-overview.jpg',
    title: 'D.LAB STUDIO 365',
    caption: '환자 대기실에서 직접 보이는 원내 디지털 기공실. 외주 대기 시간 0, 당일 조정 가능.',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    img: '/r2/images/treatments/vinique/milling-machine.jpg',
    title: 'CAD/CAM 5축 밀링',
    caption: '세라믹 디스크를 마이크로 단위로 정밀 가공하는 5축 밀링 머신.',
  },
  {
    img: '/r2/images/treatments/vinique/dlab-cad-station.jpg',
    title: 'Smile Design CAD',
    caption: '3D 구강스캔 데이터로 환자만의 미소를 디지털 설계.',
  },
  {
    img: '/r2/images/treatments/vinique/dlab-microscope.jpg',
    title: '현미경 정밀 마감',
    caption: '베니어 가장자리(margin)를 현미경으로 미세 조정 — 자연스러운 라인 완성.',
  },
  {
    img: '/r2/images/treatments/vinique/dlab-furnace.jpg',
    title: '세라믹 소결 퍼니스',
    caption: '고온 소결로 세라믹 강도와 광택을 최대치로 끌어올립니다.',
  },
  {
    img: '/r2/images/treatments/vinique/veneer-model-1829.jpg',
    title: 'Try-In 시연',
    caption: '실제 모형에 베니어를 시연 — 부착 전 형태·색·교합 최종 확인.',
  },
  {
    img: '/r2/images/treatments/vinique/veneer-macro-brush.jpg',
    title: '완성 베니어',
    caption: '0.3~0.7mm 박막 — 자연치 광택 그대로의 라미네이트.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: '디지털 스마일 진단',
    duration: '약 45~60분',
    desc: '얼굴 사진·구강 스캔·교합 분석으로 환자만의 골든 비율을 측정합니다.',
    detail: ['고해상도 얼굴 사진', '3D 구강 스캔', '교합 검사', '치아 색조 분석'],
  },
  {
    step: '02',
    title: 'VINIQUE 디자인 시뮬레이션',
    duration: '2~3일',
    desc: '디지털로 새로운 미소를 미리 설계해 환자분과 함께 보면서 확정합니다.',
    detail: ['디지털 스마일 디자인', '시뮬레이션 영상 제공', '환자 의견 반영', '톤·길이·형태 결정'],
  },
  {
    step: '03',
    title: '목업(Mock-up) 시연',
    duration: '약 30분',
    desc: '실제 치아 위에 임시 라미네이트를 붙여 디자인을 미리 체험하는 단계.',
    detail: ['임시 박막 부착', '거울로 확인', '필요 시 디자인 수정', '최종 디자인 승인'],
  },
  {
    step: '04',
    title: '최소 삭제 프로토콜',
    duration: '1~2시간',
    desc: '치아 표면을 0.3~0.7mm만 미세 삭제하거나, 케이스에 따라 무삭제로 진행합니다.',
    detail: ['디지털 가이드 삭제', '4단계 무통마취', '미세 인상 채득', '임시 라미네이트 부착'],
  },
  {
    step: '05',
    title: '원내 D.LAB 제작',
    duration: '1주~2주',
    desc: 'D.LAB STUDIO 365 원내 디지털 기공실에서 환자 맞춤 라미네이트를 직접 제작합니다.',
    detail: ['CAD/CAM 디자인', '세라믹 가공', '광택 처리', '품질 검수'],
  },
  {
    step: '06',
    title: '본 부착 (Bonding)',
    duration: '약 1~2시간',
    desc: '치아 표면에 라미네이트를 정밀하게 접착. 색·교합·길이를 마지막으로 미세조정.',
    detail: ['표면 처리', '광중합 접착', '교합 정밀 조정', '광택 마감'],
  },
  {
    step: '07',
    title: '평생 유지 관리',
    duration: '평생',
    desc: '6개월 정기 검진 + 에어플로우 GBT 관리로 라미네이트 수명을 극대화합니다.',
    detail: ['6개월 정기 검진', '에어플로우 관리', '광택 유지 케어', '교합 체크'],
  },
]

const WHY_US = [
  {
    icon: 'fa-pen-ruler',
    title: 'VINIQUE 맞춤 디자인',
    desc: '얼굴형·성별·연령·스마일 라인까지 분석해 환자만의 미소를 설계합니다. 천편일률적인 화이트가 아닌, 자연스럽고 어울리는 미소.',
    meta: 'Custom Design',
  },
  {
    icon: 'fa-feather',
    title: '최소 삭제 · 무삭제 프로토콜',
    desc: '0.3~0.7mm만 삭제하거나 케이스에 따라 무삭제로 진행. 치아 보존을 최우선으로 하는 보수적 접근.',
    meta: '0.3~0.7mm',
  },
  {
    icon: 'fa-flask',
    title: '원내 D.LAB STUDIO 365',
    desc: '원내 디지털 기공실에서 직접 제작. 외주 대기 시간이 없고, 당일 미세조정·재제작이 가능합니다.',
    meta: 'In-House Lab',
  },
  {
    icon: 'fa-eye',
    title: '디지털 시뮬레이션 + 목업',
    desc: '시술 전 디지털 시뮬레이션과 임시 라미네이트 목업으로 결과를 미리 확인. 후회 없는 선택.',
    meta: 'Try Before',
  },
  {
    icon: 'fa-gem',
    title: '프리미엄 세라믹',
    desc: 'e.max(독일 Ivoclar) · 지르코니아 등 글로벌 프리미엄 세라믹만 사용. 자연치와 동일한 광택.',
    meta: 'e.max · Zirconia',
  },
  {
    icon: 'fa-shield-heart',
    title: '평생 사후 관리',
    desc: '6개월 정기 검진 + 에어플로우 GBT 관리. 라미네이트의 광택과 수명을 평생 유지하도록 책임집니다.',
    meta: '6개월 메인터넌스',
  },
]

const COMPARE = [
  {
    item: '치아 삭제량',
    lamineer: '0.3~0.7mm (또는 무삭제)',
    crown: '치아 전체 둘레 1~2mm',
    whitening: '없음 (한계 톤 존재)',
  },
  {
    item: '심미 효과',
    lamineer: '색·모양·배열 모두 개선',
    crown: '색·모양 개선',
    whitening: '색만 개선 (제한적)',
  },
  {
    item: '치료 기간',
    lamineer: '2~3주',
    crown: '2주',
    whitening: '1~3회 (즉시)',
  },
  {
    item: '수명',
    lamineer: '10~20년',
    crown: '10~15년',
    whitening: '6개월~1년',
  },
  {
    item: '권장 적응증',
    lamineer: '앞니 심미 개선',
    crown: '치아 손상·신경치료 후',
    whitening: '단순 변색',
  },
]

const CARE_GUIDE = {
  before: [
    '시술 전 충치·잇몸질환 치료 우선 진행',
    '교합 검사로 이갈이·이악물기 여부 확인',
    '디자인 충분히 상의 후 진행 (서두르지 않기)',
  ],
  after_24h: [
    '부착 후 1시간은 음식 섭취 금지',
    '24시간 동안 단단한 음식·뜨거운 음식 자제',
    '금연·금주 권장 (착색 방지)',
    '양치는 부드럽게 회전하듯이',
  ],
  after_week: [
    '치실·치간칫솔 사용으로 라미네이트 경계부 청결 유지',
    '커피·홍차·와인 등 착색 음료는 빨대 사용',
    '단단한 음식(얼음·뼈·견과류) 직접 깨물지 않기',
    '정기 검진으로 부착 상태 확인',
  ],
  long_term: [
    '6개월마다 정기 검진 + 광택 케어',
    '이갈이 있다면 마우스가드 착용 필수',
    '강한 충격(스포츠·격투기) 시 보호 장치 사용',
    '에어플로우 GBT 관리로 광택 유지',
  ],
}

const DEFAULT_FAQS = [
  {
    q: '라미네이트하면 치아가 많이 깎이나요?',
    a: '대구365치과는 0.3~0.7mm의 최소 삭제 프로토콜을 표준으로 합니다. 케이스에 따라 무삭제 라미네이트도 가능하며, 디지털 가이드를 통해 필요한 만큼만 정밀하게 삭제합니다. 치아 전체 둘레를 깎는 크라운(1~2mm)과는 비교할 수 없을 정도로 보수적인 접근입니다.',
  },
  {
    q: 'VINIQUE 라미네이트가 일반 라미네이트와 어떻게 다른가요?',
    a: 'VINIQUE는 환자 개인의 얼굴형, 스마일 라인, 치아 톤을 분석하여 맞춤 설계하는 대구365치과만의 프리미엄 라미네이트입니다. 천편일률적인 화이트가 아닌, 자연스럽고 어울리는 미소를 디지털 시뮬레이션 + 목업으로 미리 확인하고 진행합니다. 원내 D.LAB에서 직접 제작하여 당일 조정·완성이 가능합니다.',
  },
  {
    q: '아프지 않나요?',
    a: '거의 아프지 않습니다. 최소 삭제 프로토콜에 4단계 무통마취를 적용하기 때문에 시술 중 통증을 거의 느끼지 못하십니다. 시술 후에도 일반적으로 진통제가 필요하지 않을 정도로 회복이 빠릅니다.',
  },
  {
    q: '라미네이트는 얼마나 오래 쓸 수 있나요?',
    a: '평균 10~20년입니다. 정기 검진과 올바른 관리(이갈이 마우스가드, 단단한 음식 주의, 6개월 정기 메인터넌스)를 함께 하시면 더 오래 사용하실 수 있습니다. 6개월마다 광택 유지 케어와 부착 상태 점검을 받으시면 좋습니다.',
  },
  {
    q: '착색이나 변색이 되나요?',
    a: '세라믹 라미네이트는 자연치보다 착색에 강합니다. 다만 라미네이트와 자연치의 경계부, 잇몸 라인은 관리가 필요해요. 커피·와인·흡연 등은 빨대 사용·즉시 양치로 예방 가능하며, 정기 광택 케어로 새것 같은 광택을 유지할 수 있습니다.',
  },
  {
    q: '부분만 해도 되나요? 몇 개부터 가능한가요?',
    a: '한 개부터 가능합니다. 보통 위 앞니 4~8개를 진행하시는 분들이 많지만, 단순 변색·미세 균열은 1~2개 부분 라미네이트도 충분합니다. 진단 후 환자분 상태에 가장 적합한 개수를 안내드립니다.',
  },
]

export const LamineerTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const displayFaqs = faqs.length > 0
    ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'lamineer', question: f.q, answer: f.a, display_order: i } as FAQ))

  // PPT 슬라이드 34 — 라미네이트(VINIQUE) 담당 의료진은 최혜정 원장(센터장)을 먼저, 정재헌 원장을 다음으로
  const orderedDoctors = [...doctors].sort((a: any, b: any) => {
    const rank = (s: string) => (s === 'choi-hyejung' ? 0 : s === 'jung-jaeheon' ? 1 : 2)
    return rank(a.slug) - rank(b.slug)
  })

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <img
          src="/r2/images/treatments/vinique/vinique-package.jpg"
          alt="VINIQUE 프리미엄 라미네이트 패키지"
          class="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div class="absolute inset-0" style="background:linear-gradient(95deg, rgba(20,14,8,0.96) 0%, rgba(20,14,8,0.92) 35%, rgba(26,18,10,0.7) 70%, rgba(26,18,10,0.55) 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 60%);"></div>
        <div class="blob" style="width:700px;height:700px;background:#c9a876;top:-20%;right:-15%;opacity:0.18;"></div>

        <div class="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="max-w-4xl fade-in">
            <div class="text-xs tracking-[0.4em] text-gold mb-8 font-bold">SIGNATURE TREATMENT · 02</div>
            <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
              <span class="block" style="color:#fdfbf7;">당신만의</span>
              <span class="block not-italic" style="color:var(--gold); text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.6);">미소를</span>
              <span class="block" style="color:#fdfbf7;">설계합니다.</span>
            </h1>
            <p class="t-lead mb-10 max-w-2xl" style="color:rgba(253,251,247,0.92); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
              VINIQUE — 얼굴형·스마일라인·치아톤까지 분석한 맞춤 디자인.<br/>
              0.3~0.7mm 최소 삭제, 원내 D.LAB STUDIO 365에서 직접 제작합니다.
            </p>

            <div class="flex flex-wrap gap-4 mb-16">
              <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <i class="fas fa-phone"></i>
                <span class="font-bold">053-357-0365 디자인 상담</span>
              </a>
              <a href="#materials" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <span>재료 비교</span>
                <i class="fas fa-arrow-down text-sm"></i>
              </a>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/15">
              {[
                { num: '0.3mm~', label: '최소 삭제 프로토콜' },
                { num: 'VINIQUE', label: '맞춤 스마일 디자인' },
                { num: '10~20년', label: '평균 사용 기간' },
                { num: 'D.LAB', label: '원내 디지털 기공실' },
              ].map((s: any) => (
                <div>
                  <div class="display text-2xl lg:text-4xl font-black text-ivory tracking-tight leading-none mb-2">{s.num}</div>
                  <div class="text-[10px] lg:text-xs tracking-[0.25em] text-ivory/60 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}
      {/* ===== Comparison Table — AEO 'A vs B' 검색 직격 ===== */}
      {(() => {
        const _cmp = comparisonFor("lamineer")
        return _cmp ? (
          <section class="py-12 lg:py-16 bg-ivory" aria-label="비교 표">
            <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
              <ComparisonTable title={_cmp.title} headers={_cmp.headers} rows={_cmp.rows} caption={_cmp.caption} />
            </div>
          </section>
        ) : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 mb-16 items-center">
            <div class="lg:col-span-5 fade-in lamineer-whatis-head">
              <div class="section-label mb-6">WHAT IS · 02</div>
              {/* PPT 슬라이드 14: "라미네이트란?" 한 줄 표기 + 폰트 통일 (네이트랑 동일하게) */}
              <h2 class="lamineer-whatis-title font-black">
                <span class="lamineer-whatis-keyword">라미</span><span class="lamineer-whatis-rest">네이트</span><span class="lamineer-whatis-mark">란?</span>
              </h2>
              <p class="mt-6 text-sm tracking-[0.2em] text-brown-500 font-semibold uppercase">Laminate Veneer</p>
            </div>
            <div class="lg:col-span-7 fade-in space-y-6 text-brown-700 text-lg leading-relaxed">
              <p>
                <strong class="text-brown-900">라미네이트(Laminate Veneer)</strong>는<br class="hidden md:inline"/>
                치아 앞면에 얇은 세라믹 박막을 붙여<br class="hidden md:inline"/>
                치아의 모양·색·배열을 자연스럽게 개선하는<br class="hidden md:inline"/>
                심미 보철입니다.
              </p>
              <p>
                두께 <strong class="text-brown-900">0.3~0.7mm</strong>의 박막으로,<br class="hidden md:inline"/>
                케이스에 따라 무삭제 라미네이트도 가능합니다.
              </p>
              <p>
                대구365치과 <strong class="text-brown-900">VINIQUE</strong>는<br class="hidden md:inline"/>
                단순히 치아를 하얗게 만드는 것이 아닙니다.
              </p>
              <p>
                얼굴형·성별·연령·스마일라인을 종합적으로 분석해<br class="hidden md:inline"/>
                <strong class="text-brown-900">환자만의 자연스러운 미소를 디지털로 설계</strong>합니다.
              </p>
              <p>
                목업(Mock-up)으로 결과를 미리 확인한 후 진행하기 때문에,<br class="hidden md:inline"/>
                후회 없는 선택이 가능합니다.
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 fade-in">
            <div class="bg-cream rounded-2xl p-8 border border-brown-200/60">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-full bg-brown-900 text-gold flex items-center justify-center"><i class="fas fa-check"></i></div>
                <h3 class="display text-2xl font-black tracking-tight">이런 분께 추천</h3>
              </div>
              <ul class="space-y-3 text-brown-700">
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>변색·착색이 심해 미백으로 한계가 있는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>앞니 사이가 벌어졌거나 모양이 마음에 안 드는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>약한 부정교합으로 교정까지는 부담스러운 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>이가 닳아서 길이가 짧아진 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>웨딩·면접 등 빠른 시간 내 미소를 바꾸고 싶은 분</span></li>
              </ul>
            </div>

            <div class="bg-brown-50 rounded-2xl p-8 border border-brown-200/60">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-full bg-brown-100 text-brown-700 flex items-center justify-center border border-brown-300"><i class="fas fa-exclamation"></i></div>
                <h3 class="display text-2xl font-black tracking-tight">신중한 검토 필요</h3>
              </div>
              <ul class="space-y-3 text-brown-700">
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>심한 이갈이·이악물기 (마우스가드 필수)</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>심한 부정교합 (교정 우선 권장)</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>잇몸 질환·충치가 활발한 상태</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>치아 마모가 심해 보철 두께 확보 어려움</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>에나멜이 거의 없는 치아</span></li>
              </ul>
              <p class="text-xs text-brown-500 mt-5">※ 사전 치료 후 라미네이트 가능한 케이스가 많습니다. 상담 시 정확히 안내드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY DAEGU365 */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">WHY DAEGU365 · 03</div>
            <h2 class="t-display">
              <span class="font-black" style="color:#4a3520;">VINIQUE</span>가<br/>
              <span class="t-gold">다른 이유</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-stagger">
            {WHY_US.map((f: any, i: number) => (
              <div class="lux-card hover:-translate-y-1 transition-all duration-500 relative">
                <div class="absolute top-6 right-6 text-[10px] tracking-[0.25em] text-brown-400 font-bold">0{i + 1}</div>
                <div class="w-14 h-14 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-6 text-lg shadow-lg">
                  <i class={`fas ${f.icon}`}></i>
                </div>
                <h3 class="display text-xl lg:text-2xl font-black tracking-tight mb-3 text-brown-900">{f.title}</h3>
                <p class="text-brown-700 text-sm leading-relaxed mb-5">{f.desc}</p>
                <div class="text-xs tracking-wider font-bold text-gold border-t border-brown-200 pt-4">{f.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MATERIALS — VINIQUE 2-Tier 라인업 */}
      <section id="materials" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">LINEUP · 04</div>
            <h2 class="t-display mb-6">
              <span class="font-black" style="color:#4a3520;">VINIQUE</span> <span class="t-gold">2-Tier</span><br/>
              <span class="text-brown-900">라인업</span>
            </h2>
            <p class="t-lead max-w-3xl">
              합리적인 입문용 <strong class="text-brown-900">Standard</strong>부터 압도적 심미·강도의 <strong class="text-brown-900">Premium</strong>까지.<br/>
              모든 라인업은 원내 D.LAB STUDIO 365에서 직접 제작합니다.
            </p>
          </div>

          {/* 2-Tier 카드 */}
          <div class="grid lg:grid-cols-2 gap-6 mb-16 fade-in-stagger">
            {VINIQUE_TIERS.map((t: any) => (
              <div class={`relative bg-cream rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-lux ${t.badge ? 'border-gold' : 'border-brown-200/60'}`}>
                {t.badge && (
                  <div class="absolute top-6 right-6 text-[10px] tracking-[0.25em] font-bold text-brown-950 bg-gold px-4 py-1.5 rounded-full z-10">{t.badge}</div>
                )}
                <div class="aspect-[16/9] bg-brown-100 overflow-hidden">
                  <img src={t.image} alt={t.name} class="w-full h-full object-cover" loading="lazy" />
                </div>
                <div class="p-8 lg:p-10">
                  <div class="text-[10px] tracking-[0.4em] text-gold mb-3 font-bold">{t.tier}</div>
                  <h3 class="display text-3xl lg:text-4xl font-black tracking-tight mb-2 text-brown-900">{t.name}</h3>
                  <p class="text-sm text-brown-600 mb-5 not-italic">{t.tagline}</p>
                  <div class="bg-brown-950 text-ivory rounded-xl p-4 mb-6">
                    <div class="text-[10px] tracking-[0.25em] text-gold mb-1 font-bold">HEADLINE</div>
                    <div class="text-sm font-semibold">{t.headline}</div>
                  </div>
                  <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-ivory rounded-lg p-3 border border-brown-200/60">
                      <div class="text-[9px] tracking-[0.2em] text-brown-500 mb-1 font-bold">FLEXURAL STRENGTH</div>
                      <div class="display text-2xl font-black text-brown-900">{t.strength} <span class="text-xs">MPa</span></div>
                    </div>
                    <div class="bg-ivory rounded-lg p-3 border border-brown-200/60">
                      <div class="text-[9px] tracking-[0.2em] text-brown-500 mb-1 font-bold">WARRANTY</div>
                      <div class="display text-2xl font-black text-brown-900">{t.warranty}</div>
                    </div>
                  </div>
                  <div class="text-xs text-brown-600 mb-2">
                    <strong>소재:</strong> {t.materialKr}
                  </div>
                  <div class="text-xs text-brown-600 mb-5">
                    <strong>블록:</strong> {t.block}
                  </div>
                  <p class="text-sm text-brown-700 leading-relaxed mb-5">{t.desc}</p>
                  <ul class="space-y-2 border-t border-brown-200 pt-5">
                    {t.points.map((p: string) => (
                      <li class="flex gap-2 items-start text-xs text-brown-700">
                        <i class="fas fa-check text-gold text-[10px] mt-1"></i>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 굴곡 강도 비교 차트 — 시각화 */}
          <div class="bg-brown-950 text-ivory rounded-3xl p-8 lg:p-12 mb-12 fade-in">
            <div class="text-[10px] tracking-[0.4em] text-gold mb-3 font-bold">FLEXURAL STRENGTH · 굴곡 강도</div>
            <h3 class="display text-3xl lg:text-4xl font-black tracking-tight mb-8" style="color:#fdfbf7;">
              Premium은 Standard 대비 <span style="color:var(--gold);">2.4배</span> 더 강합니다
            </h3>
            <div class="space-y-6">
              {/* Standard 바 */}
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <div class="text-sm font-bold text-ivory">VINIQUE Standard</div>
                  <div class="display text-2xl font-black" style="color:var(--gold);">213 MPa</div>
                </div>
                <div class="h-4 bg-ivory/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-brown-400 to-brown-300 rounded-full" style="width:42%;"></div>
                </div>
                <div class="text-[10px] text-ivory/50 mt-1">나노 하이브리드 세라믹</div>
              </div>
              {/* Premium 바 */}
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <div class="text-sm font-bold text-ivory">VINIQUE Premium</div>
                  <div class="display text-3xl font-black" style="color:var(--gold);">510 MPa</div>
                </div>
                <div class="h-4 bg-ivory/10 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" style="width:100%; background:linear-gradient(90deg, var(--gold), #e9c98a);"></div>
                </div>
                <div class="text-[10px] text-ivory/50 mt-1">글라스 세라믹 리튬 디실리케이트 (LS₂)</div>
              </div>
            </div>
            <p class="text-xs text-ivory/60 mt-6 leading-relaxed">
              ※ 굴곡 강도(Flexural Strength)는 라미네이트가 외부 압력·교합력에 견디는 정도를 나타내는 핵심 지표입니다.
              510MPa 글라스 세라믹은 자연 치아 법랑질(법랑질 약 380MPa)을 능가하는 강도를 가집니다.
            </p>
          </div>

          {/* 라인업 비교 매트릭스 */}
          <div class="bg-cream rounded-2xl border border-brown-200/60 overflow-hidden shadow-sm fade-in">
            <div class="grid grid-cols-3 gap-3 px-6 lg:px-8 py-4 bg-brown-50 border-b border-brown-200 text-[10px] lg:text-xs tracking-[0.2em] font-bold text-brown-600">
              <div>구분</div>
              <div>VINIQUE Standard</div>
              <div class="text-gold">VINIQUE Premium</div>
            </div>
            {TIER_MATRIX.map((row: any, i: number) => (
              <div class={`grid grid-cols-3 gap-3 px-6 lg:px-8 py-5 items-center text-xs lg:text-sm ${i > 0 ? 'border-t border-brown-100' : ''}`}>
                <div class="font-bold text-brown-900">{row.row}</div>
                <div class="text-brown-700">{row.std}</div>
                <div class="text-brown-800 bg-gold/8 -mx-2 px-2 py-1 rounded font-semibold">{row.pre}</div>
              </div>
            ))}
          </div>

          <div class="mt-6 text-xs text-brown-500">
            ※ 부가세 10% 별도. 진단 결과·치아 개수에 따라 최종 비용이 안내됩니다. 가격은 상담 시 정확히 안내드립니다.
          </div>
        </div>
      </section>

      {/* 4-2. D.LAB STUDIO 365 갤러리 — 원내 디지털 기공실 */}
      <section class="py-24 lg:py-32 bg-brown-950 text-ivory overflow-hidden">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in max-w-3xl">
            <div class="text-[10px] tracking-[0.4em] text-gold mb-6 font-bold">D.LAB STUDIO 365 · 04-2</div>
            <h2 class="display font-black tracking-tight leading-[0.95] mb-8" style="font-size:clamp(2.5rem, 5vw, 5rem); color:#fdfbf7;">
              <span class="block">당일 조정 가능한</span>
              <span class="block not-italic" style="color:var(--gold);">원내 디지털</span>
              <span class="block">기공실</span>
            </h2>
            <p class="text-lg leading-relaxed" style="color:rgba(253,251,247,0.85);">
              VINIQUE는 외주 제작이 아닙니다. 환자 대기실에서 직접 보이는 <strong style="color:var(--gold);">D.LAB STUDIO 365</strong>에서
              CAD 디자인 → 5축 밀링 → 세라믹 소결 → 현미경 마감까지 직접 진행합니다. 외주 대기 0, 당일 조정 가능.
            </p>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 fade-in-stagger" style="grid-auto-rows:220px;">
            {DLAB_GALLERY.map((g: any) => (
              <div class={`relative rounded-2xl overflow-hidden group border border-ivory/10 ${g.span || ''}`}>
                <img src={g.img} alt={g.title} class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div class="absolute inset-0" style="background:linear-gradient(180deg, rgba(20,14,8,0) 40%, rgba(20,14,8,0.92) 100%);"></div>
                <div class="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h3 class="display text-lg lg:text-xl font-black tracking-tight mb-1.5" style="color:#fdfbf7;">{g.title}</h3>
                  <p class="text-xs leading-relaxed" style="color:rgba(253,251,247,0.7);">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div class="grid md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-ivory/15 fade-in">
            {[
              { num: '0', label: '외주 대기 시간' },
              { num: '5축', label: 'CAD/CAM 밀링' },
              { num: '당일', label: '시연·조정 가능' },
              { num: '365', label: '연중 직접 제작' },
            ].map((s: any) => (
              <div>
                <div class="display text-3xl lg:text-5xl font-black tracking-tight leading-none mb-2" style="color:var(--gold);">{s.num}</div>
                <div class="text-[10px] lg:text-xs tracking-[0.25em] font-semibold" style="color:rgba(253,251,247,0.6);">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-3. CINEMATIC BEFORE & AFTER — 사이니지 마스터 영상 */}
      <section class="py-24 lg:py-32 bg-ivory overflow-hidden">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div class="mb-12 lg:mb-16 fade-in max-w-3xl">
            <div class="section-label mb-6">BEFORE &amp; AFTER · 04-3</div>
            <h2 class="t-display mb-6">
              <span class="text-brown-900">실제</span> <span class="t-gold">비포애프터</span><br/>
              <span class="text-brown-900">시네마틱</span>
            </h2>
            <p class="t-lead break-keep">
              대구365치과 사이니지에서 상영 중인 <strong class="text-brown-900">VINIQUE 비포애프터 마스터 영상</strong>.<br/>
              실제 환자분의 미소 변화를 4K 세로형으로 담았습니다.
            </p>
          </div>

          <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center fade-in">
            {/* 9:16 세로 영상 플레이어 */}
            <div class="lg:col-span-5">
              <div class="relative mx-auto" style="max-width:380px;">
                <div class="absolute -inset-3 bg-gradient-to-br from-gold/30 via-brown-200/0 to-brown-900/20 rounded-[2.5rem] blur-2xl opacity-60" aria-hidden="true"></div>
                <div class="relative bg-brown-950 rounded-[2rem] p-3 shadow-lux">
                  <div class="relative rounded-[1.5rem] overflow-hidden bg-black" style="aspect-ratio: 9/16;">
                    <video
                      src="/r2/videos/treatments/vinique/vinique-beforeafter-master.mp4"
                      poster="/r2/images/treatments/vinique/vinique-package.jpg"
                      class="absolute inset-0 w-full h-full object-cover"
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="metadata"
                      controls
                      controlslist="nodownload"
                    ></video>
                    <div class="absolute top-4 left-4 bg-brown-950/85 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] tracking-[0.3em] font-bold pointer-events-none" style="color:var(--gold);">
                      VINIQUE
                    </div>
                    <div class="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] font-bold text-white pointer-events-none">
                      <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      LIVE
                    </div>
                  </div>
                </div>
                <div class="text-center mt-5 text-xs text-brown-500 tracking-wider">
                  <i class="fas fa-volume-mute mr-1.5"></i> 음소거 자동재생 — 사운드는 컨트롤바에서 ON
                </div>
              </div>
            </div>

            {/* 우측 카피 + 메타 */}
            <div class="lg:col-span-7">
              <div class="grid grid-cols-3 gap-3 lg:gap-4 mb-8">
                {[
                  { num: '4K', label: '세로형 마스터' },
                  { num: '20s', label: '시네마틱 컷' },
                  { num: '실사례', label: '환자 동의 후 공개' },
                ].map((s: any) => (
                  <div class="bg-cream rounded-2xl p-4 lg:p-5 border border-brown-200/60 text-center">
                    <div class="display text-2xl lg:text-3xl font-black text-brown-900 tracking-tight leading-none mb-1.5">{s.num}</div>
                    <div class="text-[9px] lg:text-[10px] tracking-[0.2em] text-brown-500 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>

              <div class="space-y-5 text-brown-700 leading-relaxed">
                <p>
                  대구365치과 진료 대기실에 설치된 <strong class="text-brown-900">사이니지 디스플레이</strong>에서 직접 상영 중인 마스터 영상입니다.
                  치아 변색·앞니 사이 벌어짐·길이 불균형이 <strong class="text-brown-900">VINIQUE 디자인</strong>으로 어떻게 변화했는지 한 컷에 담았습니다.
                </p>
                <p>
                  영상 속 결과물은 모두 <strong class="text-brown-900">원내 D.LAB STUDIO 365</strong>에서 직접 제작·시연·미세 조정을 거친 케이스입니다.
                  외주 라미네이트로는 구현하기 어려운 <strong class="text-brown-900">자연치 광택</strong>과 <strong class="text-brown-900">스마일라인</strong>을 직접 확인해 보세요.
                </p>
              </div>

              <div class="flex flex-wrap gap-3 mt-8">
                <a href="/before-after?group=lamineer" class="btn-primary btn-shine magnetic">
                  <span>VINIQUE 케이스 더 보기</span>
                  <i class="fas fa-arrow-right text-sm"></i>
                </a>
                <a href="tel:053-357-0365" class="btn-outline magnetic">
                  <i class="fas fa-phone"></i>
                  <span>디자인 상담</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARE — 라미네이트 vs 크라운 vs 미백 */}
      <section class="py-24 bg-cream">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-12 fade-in">
            <div class="section-label mb-6">COMPARE · 05</div>
            <h2 class="t-display">
              나에게 맞는 <span class="t-gold">선택</span>
            </h2>
            <p class="t-lead max-w-2xl mt-4">라미네이트·크라운·미백, 어떤 게 가장 적합한지 한눈에 비교.</p>
          </div>

          <div class="bg-ivory rounded-2xl border border-brown-200/60 overflow-hidden shadow-sm fade-in">
            <div class="grid grid-cols-4 gap-3 px-5 lg:px-7 py-4 bg-brown-50 border-b border-brown-200 text-[10px] lg:text-xs tracking-[0.2em] font-bold text-brown-600">
              <div>구분</div>
              <div class="text-gold">라미네이트</div>
              <div>크라운</div>
              <div>미백</div>
            </div>
            {COMPARE.map((row: any, i: number) => (
              <div class={`grid grid-cols-4 gap-3 px-5 lg:px-7 py-5 items-center text-xs lg:text-sm ${i > 0 ? 'border-t border-brown-100' : ''}`}>
                <div class="font-bold text-brown-900">{row.item}</div>
                <div class="text-brown-800 bg-gold/8 -mx-2 px-2 py-1 rounded font-semibold">{row.lamineer}</div>
                <div class="text-brown-700">{row.crown}</div>
                <div class="text-brown-700">{row.whitening}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">PROCESS · 06</div>
            <h2 class="t-display mb-6">
              <span class="text-brown-900">7단계</span><br/>
              <span class="t-gold">디자인 여정</span>
            </h2>
            <p class="t-lead max-w-3xl">진단부터 평생 관리까지, 미소가 완성되는 모든 과정.</p>
          </div>

          <div class="space-y-4">
            {PROCESS.map((p: any) => (
              <div class="grid md:grid-cols-12 gap-6 p-6 lg:p-8 rounded-2xl bg-cream border border-brown-200/40 hover:border-gold/60 transition-all duration-500 fade-in">
                <div class="md:col-span-2">
                  <div class="display text-5xl lg:text-6xl font-black text-gold tracking-tight leading-none">{p.step}</div>
                  <div class="text-xs text-brown-500 mt-2 tracking-wider font-semibold">{p.duration}</div>
                </div>
                <div class="md:col-span-5">
                  <h3 class="display text-2xl font-black tracking-tight mb-3 text-brown-900">{p.title}</h3>
                  <p class="text-brown-700 text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div class="md:col-span-5">
                  <ul class="space-y-2">
                    {p.detail.map((d: string) => (
                      <li class="flex gap-2 items-start text-sm text-brown-700">
                        <i class="fas fa-check text-gold text-[10px] mt-1.5"></i>
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

      {/* 7. CARE GUIDE */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">CARE GUIDE · 07</div>
            <h2 class="t-display">
              <span class="text-brown-900">시술 전·후</span><br/>
              <span class="t-gold">관리 가이드</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 fade-in-stagger">
            {[
              { title: '시술 전', icon: 'fa-clipboard-check', items: CARE_GUIDE.before },
              { title: '시술 후 24시간', icon: 'fa-clock', items: CARE_GUIDE.after_24h },
              { title: '시술 후 1주', icon: 'fa-calendar-week', items: CARE_GUIDE.after_week },
              { title: '평생 관리', icon: 'fa-infinity', items: CARE_GUIDE.long_term },
            ].map((g: any) => (
              <div class="bg-ivory rounded-2xl p-6 border border-brown-200/60 hover:border-gold/60 transition h-full">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-5">
                  <i class={`fas ${g.icon}`}></i>
                </div>
                <h3 class="display text-lg font-black tracking-tight mb-4 text-brown-900">{g.title}</h3>
                <ul class="space-y-2.5">
                  {g.items.map((item: string) => (
                    <li class="flex gap-2 items-start text-xs text-brown-700 leading-relaxed">
                      <i class="fas fa-circle text-gold text-[5px] mt-1.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DOCTORS */}
      {orderedDoctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="mb-16 fade-in">
              <div class="section-label mb-6">OUR TEAM · 08</div>
              <h2 class="t-display">담당 <span class="t-gold">의료진</span></h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-stagger">
              {orderedDoctors.map((d: any) => (
                <a href={`/doctors/${d.slug}`} class="group">
                  <div class="aspect-[3/4] rounded-2xl mb-4 overflow-hidden bg-brown-100 group-hover:shadow-lux transition">
                    <img
                      src={d.photo_url || getDoctorPhoto(d.slug)}
                      alt={d.name}
                      class="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div class="text-xs tracking-[0.3em] text-brown-500 mb-1 font-semibold">{d.is_representative ? '대표원장' : d.position}</div>
                  <div class="display text-2xl font-black tracking-tight text-brown-900">{d.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CASES — 비포애프터 연동 */}
      {cases.length > 0 && (
        <section class="py-24 bg-cream">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-end mb-12 fade-in">
              <div>
                <div class="section-label mb-6">CASES · 09</div>
                <h2 class="t-display">치료 <span class="t-gold">사례</span></h2>
              </div>
              <a href="/before-after?treatment=lamineer" class="link-underline display not-italic">전체 보기 →</a>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
              {cases.slice(0, 3).map((ba: any) => {
                const beforeImg = ba.intra_before_url || ba.pano_before_url
                return (
                  <a href={`/before-after/${ba.id}`} class="fade-in lux-card p-0 overflow-hidden hover:-translate-y-1 transition-all duration-500 group">
                    <div class="aspect-[4/3] relative overflow-hidden bg-brown-100">
                      {beforeImg ? (
                        <img src={beforeImg} alt={ba.title} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div class="w-full h-full placeholder-img flex items-center justify-center text-brown-400">
                          <i class="fas fa-images text-3xl"></i>
                        </div>
                      )}
                      <div class="absolute top-3 left-3 text-[10px] tracking-[0.25em] font-bold text-ivory bg-brown-950/80 px-3 py-1 rounded-full backdrop-blur">BEFORE</div>
                      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-950/85 via-brown-950/40 to-transparent p-4">
                        <div class="text-[10px] tracking-[0.2em] text-gold font-bold flex items-center gap-2">
                          <i class="fas fa-lock text-[9px]"></i>
                          <span>AFTER 사진은 로그인 후 공개</span>
                        </div>
                      </div>
                    </div>
                    <div class="p-6">
                      <div class="flex gap-2 mb-3 flex-wrap">
                        {ba.age_group && String(ba.age_group).trim() && <span class="tag tag-brown">{ba.age_group}</span>}
                        {ba.treatment_period && String(ba.treatment_period).trim() && <span class="tag tag-brown">{ba.treatment_period}</span>}
                        {ba.region_dong && String(ba.region_dong).trim() && <span class="tag tag-brown">{ba.region_dong}</span>}
                      </div>
                      <div class="display text-lg font-bold tracking-tight mb-2 text-brown-900">{ba.title}</div>
                      {ba.description && <p class="text-sm text-brown-600 line-clamp-2 leading-relaxed">{ba.description}</p>}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {cases.length === 0 && (
        <section class="py-24 bg-cream">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-end mb-12 fade-in">
              <div>
                <div class="section-label mb-6">CASES · 09</div>
                <h2 class="t-display">치료 <span class="t-gold">사례</span></h2>
              </div>
              <a href="/before-after" class="link-underline display not-italic">전체 사례 보기 →</a>
            </div>
            <div class="bg-ivory rounded-2xl p-12 text-center border border-brown-200/60">
              <i class="fas fa-images text-4xl text-brown-300 mb-4"></i>
              <p class="text-brown-600">실제 VINIQUE 라미네이트 사례를 곧 공개합니다.</p>
              <p class="text-xs text-brown-500 mt-2">환자분 동의 하에 업로드되며, AFTER 사진은 로그인 후 확인하실 수 있습니다.</p>
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">FAQ · 10</div>
            <h2 class="t-display">자주 묻는 <span class="t-gold">질문</span></h2>
          </div>
          <div class="space-y-3">
            {displayFaqs.map((f: any, i: number) => (
              <details class="group fade-in bg-cream rounded-2xl overflow-hidden border border-brown-200/60">
                <summary class="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-brown-50 gap-4">
                  <div class="flex gap-4 items-start flex-1">
                    <span class="text-gold display text-base font-black tracking-wider flex-shrink-0">Q{String(i + 1).padStart(2, '0')}</span>
                    <span class="font-bold text-brown-900 tracking-tight">{f.question}</span>
                  </div>
                  <i class="fas fa-chevron-down text-brown-400 group-open:rotate-180 transition flex-shrink-0"></i>
                </summary>
                <div class="px-6 pb-6 pt-2 text-brown-700 leading-relaxed border-t border-brown-100">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DICTIONARY */}
      {dictTerms.length > 0 && (
        <section class="py-20 bg-cream">
          <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div class="section-label mb-6 fade-in">DICTIONARY · 11</div>
            <h2 class="t-display mb-10 fade-in">관련 <span class="t-gold">용어</span></h2>
            <div class="flex flex-wrap gap-3 fade-in">
              {dictTerms.slice(0, 24).map((d: any) => (
                <a href={`/dictionary/${d.slug}`} class="tag tag-brown hover:bg-brown-900 hover:text-ivory transition text-sm py-2 px-4">{d.term}</a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <img src="/r2/images/journal/before-after.jpg?v=3" alt="" class="absolute inset-0 w-full h-full object-cover opacity-15" loading="lazy" aria-hidden="true" />
        <div class="absolute inset-0" style="background:linear-gradient(135deg, rgba(26,18,10,0.92) 0%, rgba(26,18,10,0.75) 100%);"></div>
        <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.18;"></div>
        <div class="relative max-w-3xl mx-auto px-6 text-center">
          <div class="section-label mb-6 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">VINIQUE 디자인 상담</div>
          <h2 class="mb-8 fade-in font-black tracking-tight leading-[1]" style="font-size:clamp(2.5rem, 6vw, 5rem);color:var(--ivory); text-shadow: 0 4px 24px rgba(0,0,0,0.6);">
            <span class="t-gold not-italic">당신만의 미소</span>를<br/>지금 설계하세요
          </h2>
          <p class="t-lead mb-10 fade-in" style="color:rgba(253,251,247,0.85); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
            첫 디자인 상담은 무료입니다. 디지털 시뮬레이션으로 결과를 미리 확인하세요.
          </p>
          <div class="flex flex-wrap justify-center gap-4 fade-in">
            <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
              <i class="fas fa-phone"></i><span class="font-bold">053-357-0365</span>
            </a>
            <a href="/directions" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
              <i class="fas fa-map-marker-alt"></i><span>오시는 길</span>
            </a>
          </div>
        </div>
      </section>

      {/* PPT PC2 슬라이드 13-14 — 비니크 프리미엄 라미네이트 담당 최혜정 원장 프로필 박스 */}
      <DoctorProfileBlock
        slug="choi-hyejung"
        name="최혜정"
        position="비니크(라미네이트) 센터장 · 보존과 전문의"
        quote={'결과를 본래의 치아처럼.'}
        credentials={['비니크(라미네이트) 센터장', '보존과 전문의', 'VINIQUE 디자인 워크플로우']}
        treatmentLabel="비니크 프리미엄 라미네이트"
      />

      <Footer />
    </>
  )
}
