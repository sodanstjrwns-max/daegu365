import { Navbar, Footer, TldrBox, ComparisonTable } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import { comparisonFor } from '../lib/comparison-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 라미네이트 (VINIQUE) 풀볼륨 v1
   - 수가표(2026): 라미네이트 60만원 (VAT 10% 별도)
   - 무삭제·최소삭제 프로토콜, 원내 D.LAB 디지털 기공실
   ============================================================ */

const MATERIALS = [
  {
    name: 'e.max (이맥스)',
    type: '리튬 디실리케이트',
    price: '60만원~',
    badge: 'SIGNATURE',
    desc: '독일 Ivoclar의 프리미엄 글래스 세라믹. 자연치와 가장 유사한 반투명도와 광택.',
    points: ['최고급 심미성', '자연스러운 투명감', '얇고 강한 박막 구현'],
  },
  {
    name: '지르코니아',
    type: '고강도 세라믹',
    price: '60만원~',
    desc: '강도와 내구성이 뛰어난 단단한 세라믹. 후방 치아·이갈이 환자에게 적합.',
    points: ['높은 강도', '파절 저항', '장기 안정성'],
  },
  {
    name: 'VINIQUE Custom',
    type: '맞춤 디자인 라미네이트',
    price: '상담 안내',
    badge: 'EXCLUSIVE',
    desc: '얼굴형·스마일라인·치아 톤을 분석해 환자만의 미소를 설계하는 대구365치과 시그니처.',
    points: ['디지털 스마일 디자인', '원내 D.LAB 직접 제작', '당일 미세조정 가능'],
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

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <img
          src="/r2/images/journal/before-after.jpg?v=3"
          alt="VINIQUE 라미네이트"
          class="absolute inset-0 w-full h-full object-cover opacity-15"
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
              <span class="block italic" style="color:var(--gold); text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.6);">미소를</span>
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

      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("lamineer")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}
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
          <div class="grid lg:grid-cols-12 gap-12 mb-16">
            <div class="lg:col-span-4 fade-in">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                <span class="t-outline">라미</span><br/>
                <span class="t-gold">네이트</span><br/>란?
              </h2>
            </div>
            <div class="lg:col-span-8 fade-in space-y-6 text-brown-700 text-lg leading-relaxed">
              <p>
                <strong class="text-brown-900">라미네이트(Laminate Veneer)</strong>는 치아 앞면에 얇은 세라믹 박막을 붙여 치아의 모양·색·배열을 자연스럽게 개선하는 심미 보철입니다.
                두께 <strong class="text-brown-900">0.3~0.7mm</strong>의 박막으로, 케이스에 따라 무삭제 라미네이트도 가능합니다.
              </p>
              <p>
                대구365치과 <strong class="text-brown-900">VINIQUE</strong>는 단순히 치아를 하얗게 만드는 것이 아닙니다.
                얼굴형·성별·연령·스마일라인을 종합적으로 분석해 <strong class="text-brown-900">환자만의 자연스러운 미소를 디지털로 설계</strong>합니다.
                목업(Mock-up)으로 결과를 미리 확인한 후 진행하기 때문에, 후회 없는 선택이 가능합니다.
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
              <em class="italic text-brown-700">VINIQUE</em>가<br/>
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

      {/* 4. MATERIALS */}
      <section id="materials" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">MATERIALS · 04</div>
            <h2 class="t-display mb-6">
              <span class="t-outline">프리미엄</span> <span class="t-gold">세라믹</span>
            </h2>
            <p class="t-lead max-w-3xl">
              <strong class="text-brown-900">라미네이트 60만원</strong> (1치당, 부가세 10% 별도).
              모든 재료는 글로벌 프리미엄 등급만 사용합니다.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-stagger">
            {MATERIALS.map((m: any) => (
              <div class={`relative bg-cream rounded-2xl p-7 border-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-lux ${m.badge ? 'border-gold/60' : 'border-brown-200/60'}`}>
                {m.badge && (
                  <div class="absolute -top-3 left-7 text-[9px] tracking-[0.25em] font-bold text-brown-950 bg-gold px-3 py-1 rounded-full">{m.badge}</div>
                )}
                <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-3 font-bold">{m.type}</div>
                <h3 class="display text-2xl font-black tracking-tight mb-3 text-brown-900">{m.name}</h3>
                <div class="display text-3xl font-black text-brown-900 mb-5">{m.price}</div>
                <p class="text-sm text-brown-700 leading-relaxed mb-5">{m.desc}</p>
                <ul class="space-y-2 border-t border-brown-200 pt-5">
                  {m.points.map((p: string) => (
                    <li class="flex gap-2 items-start text-xs text-brown-700">
                      <i class="fas fa-check text-gold text-[10px] mt-1"></i>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div class="mt-6 text-xs text-brown-500">
            ※ 부가세 10% 별도. 진단 결과·치아 개수에 따라 최종 비용이 안내됩니다.
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
              <span class="t-outline">7단계</span><br/>
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
              <span class="t-outline">시술 전·후</span><br/>
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
      {doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="mb-16 fade-in">
              <div class="section-label mb-6">OUR TEAM · 08</div>
              <h2 class="t-display">담당 <span class="t-gold">의료진</span></h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-stagger">
              {doctors.map((d: any) => (
                <a href={`/doctors/${d.slug}`} class="group">
                  <div class="aspect-[3/4] rounded-2xl mb-4 overflow-hidden bg-brown-100 group-hover:shadow-lux transition">
                    <img
                      src={d.photo_url || `/r2/images/doctors/${d.slug}.jpg`}
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
              <a href="/before-after?treatment=lamineer" class="link-underline display italic">전체 보기 →</a>
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
                        <span class="tag tag-brown">{ba.age_group}</span>
                        <span class="tag tag-brown">{ba.treatment_period}</span>
                        {ba.region_dong && <span class="tag tag-brown">{ba.region_dong}</span>}
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
              <a href="/before-after" class="link-underline display italic">전체 사례 보기 →</a>
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
            <span class="t-gold italic">당신만의 미소</span>를<br/>지금 설계하세요
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

      <Footer />
    </>
  )
}
