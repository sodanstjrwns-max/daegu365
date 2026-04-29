import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 인비절라인 풀볼륨 v1
   - 수가표(2026): 진단비 20 / Lite 500 / Moderate 600 / Comprehensive 750
   - First(성장기) 400 / 클리피씨 580 / S라인 580 / 부분교정 200 / 마르페 70 등
   ============================================================ */

const PACKAGES = [
  {
    name: '인비절라인 Lite',
    range: '단순 케이스',
    price: '500만원',
    desc: '경미한 부정교합·재교정·미세 정렬에 적합한 단축 패키지.',
    points: ['최대 14단계', '6~9개월', '단순 정렬·재교정'],
  },
  {
    name: '인비절라인 Moderate',
    range: '중등도',
    price: '600만원',
    desc: '일반적인 성인 교정 대부분을 커버하는 표준 패키지.',
    points: ['최대 26단계', '10~18개월', '표준 부정교합'],
  },
  {
    name: 'Comprehensive',
    range: '무제한',
    price: '750만원',
    badge: 'BEST CHOICE',
    desc: '단계 무제한 + 5년 리파인먼트 보장. 복잡한 케이스도 끝까지 책임.',
    points: ['단계 무제한', '5년 리파인먼트', '복잡 케이스 대응'],
  },
  {
    name: 'First (성장기)',
    range: '7~13세',
    price: '400만원',
    desc: '혼합치열기 어린이를 위한 인비절라인 First. 골격 성장 활용.',
    points: ['혼합치열기 전용', '성장 활용 교정', '습관 개선 동반'],
  },
  {
    name: '클리피씨',
    range: '자가결찰 브라켓',
    price: '580만원',
    desc: '마찰 없는 자가결찰 시스템. 통증·내원 횟수를 줄인 빠른 교정.',
    points: ['빠른 이동', '통증 감소', '내원 간격 연장'],
  },
  {
    name: 'S라인',
    range: '심미 브라켓',
    price: '580만원',
    desc: '심미성을 강조한 도재 브라켓. 자연스러운 외관.',
    points: ['심미 도재 브라켓', '눈에 잘 안 띔', '전체 교정 가능'],
  },
]

const ADD_ONS = [
  { name: '진단비', price: '20만원', desc: '3D 스캔·세팔로·파노라마 정밀 진단' },
  { name: '부분교정 (1/3악당)', price: '200만원', desc: '난이도에 따라 변동 가능' },
  { name: '소아 RPE (구개확장)', price: '50만원', desc: '소아 구개 확장 장치' },
  { name: '성인 마르페 MARPE', price: '70만원', desc: '성인용 구개 확장' },
  { name: '미니스크류', price: '10만원', desc: '교정 보조 장치' },
  { name: '가철식 유지장치', price: '20만원', desc: '악당 (Wrap around)' },
  { name: '고정식 유지장치', price: '20만원', desc: '악당 (Fixed Retainer)' },
  { name: '교정 발치 (비보험)', price: '5만원', desc: '교정 목적 발치' },
]

const PROCESS = [
  {
    step: '01',
    title: '정밀 진단',
    duration: '약 60분',
    desc: '파노라마·세팔로·3D 구강 스캔으로 치아·골격을 입체 분석.',
    detail: ['파노라마·세팔로 X-ray', '3D iTero 스캔', '교합 분석', '얼굴 사진 기록'],
  },
  {
    step: '02',
    title: '클린체크 (ClinCheck) 시뮬레이션',
    duration: '7~10일',
    desc: '인비절라인 본사에서 환자 맞춤 치료 시뮬레이션. 시작-끝 미리보기.',
    detail: ['단계별 이동 시뮬레이션', '치료 결과 미리보기', '기간·단계 수 산출', '환자 의견 반영'],
  },
  {
    step: '03',
    title: '치료 계획 확정',
    duration: '약 30분',
    desc: '시뮬레이션을 함께 보며 환자분과 최종 합의. 비용·기간 명확히 안내.',
    detail: ['시뮬레이션 함께 검토', '발치 여부 결정', '비용·기간 확정', '치료 동의서'],
  },
  {
    step: '04',
    title: '얼라이너 장착',
    duration: '약 30~45분',
    desc: '맞춤 제작된 얼라이너 첫 착용. 어태치먼트 부착 + 사용법 교육.',
    detail: ['어태치먼트 부착', '얼라이너 착용 연습', '관리법 교육', '응급 연락처 안내'],
  },
  {
    step: '05',
    title: '단계별 교환 + 정기 체크',
    duration: '6~24개월',
    desc: '1~2주마다 새 얼라이너로 교체. 4~8주마다 내원해 진행 점검.',
    detail: ['1~2주마다 얼라이너 교체', '4~8주 정기 내원', '하루 22시간 착용', 'My Invisalign 앱 활용'],
  },
  {
    step: '06',
    title: '리파인먼트 (Refinement)',
    duration: '필요시',
    desc: '미세조정이 필요하면 추가 얼라이너 제작. Comprehensive는 5년 무제한.',
    detail: ['미세 정렬 보정', '추가 얼라이너 제작', 'Comprehensive 무제한 보장', '치료 완성도 극대화'],
  },
  {
    step: '07',
    title: '유지장치 + 평생 관리',
    duration: '평생',
    desc: '치아가 원위치로 돌아가지 않도록 유지장치 착용. 6개월 정기 검진.',
    detail: ['가철식 또는 고정식 유지장치', '초기 24시간 착용 → 점차 야간만', '6개월 정기 검진', '재발 방지'],
  },
]

const WHY_US = [
  {
    icon: 'fa-user-graduate',
    title: '인비절라인 공인 교정의',
    desc: '인비절라인 본사 공인 인증을 받은 교정 전문 의료진이 상주합니다. 풍부한 임상 경험.',
    meta: 'Certified Provider',
  },
  {
    icon: 'fa-cube',
    title: '3D iTero 디지털 스캔',
    desc: '본 뜨는 고무 인상이 아닌 3D 스캐너로 정밀하게 측정. 시뮬레이션도 즉시 확인 가능.',
    meta: 'iTero Element',
  },
  {
    icon: 'fa-eye',
    title: '치료 전 결과 미리보기',
    desc: 'ClinCheck 시뮬레이션으로 시작-끝 모습을 미리 보고 치료 시작. 후회 없는 선택.',
    meta: 'ClinCheck',
  },
  {
    icon: 'fa-mug-saucer',
    title: '식사·양치 자유로움',
    desc: '얼라이너는 탈부착식. 식사·양치 시 빼고, 평소엔 끼우면 끝. 음식 제한 없음.',
    meta: 'Removable',
  },
  {
    icon: 'fa-eye-slash',
    title: '거의 보이지 않는 투명함',
    desc: '투명 플라스틱 소재로 가까이서도 잘 안 보입니다. 직장인·웨딩 준비 중에도 부담 없이.',
    meta: 'Invisible',
  },
  {
    icon: 'fa-shield-heart',
    title: '5년 리파인먼트 보장',
    desc: 'Comprehensive 패키지는 단계 무제한 + 5년 리파인먼트. 복잡한 케이스도 끝까지 책임.',
    meta: '5년 보장',
  },
]

const COMPARE = [
  {
    item: '심미성',
    invisalign: '거의 안 보임 (투명)',
    bracket: '눈에 잘 띔 (메탈)',
    sline: '도재 (반투명)',
  },
  {
    item: '탈부착',
    invisalign: '가능 (식사·양치 시 제거)',
    bracket: '불가능',
    sline: '불가능',
  },
  {
    item: '음식 제한',
    invisalign: '없음 (제거 후 식사)',
    bracket: '많음 (단단·끈적이는 음식)',
    sline: '많음',
  },
  {
    item: '내원 간격',
    invisalign: '4~8주',
    bracket: '3~4주',
    sline: '4~6주',
  },
  {
    item: '구내염·통증',
    invisalign: '거의 없음',
    bracket: '초기 통증·구내염',
    sline: '초기 통증',
  },
  {
    item: '비용',
    invisalign: '500~750만원',
    bracket: '평균',
    sline: '580만원',
  },
]

const CARE_GUIDE = {
  daily: [
    '하루 22시간 이상 착용 (식사·양치 외 항상)',
    '식사 후 양치하고 다시 끼우기',
    '얼라이너는 미지근한 물·전용 세정제로 세척',
    '뜨거운 물·뜨거운 음식 시 제거 (변형 위험)',
  ],
  attention: [
    '얼라이너 착용 중 음료는 물만 가능 (커피·주스 X)',
    '흡연 시 변색 — 가급적 금연 권장',
    '검 종류·끈적이는 음식 금지',
    '얼라이너 분실 시 즉시 연락 — 단계 지연 방지',
  ],
  visit: [
    '4~8주마다 정기 체크 방문',
    '새 얼라이너 수령 + 진행 점검',
    'My Invisalign 앱으로 사진 기록 추천',
    '문제 발생 시 즉시 053-357-0365',
  ],
  long_term: [
    '치료 종료 후 유지장치 필수 착용',
    '초기 1년: 24시간 → 점차 야간만',
    '6개월 정기 검진으로 재발 방지',
    '평생 유지장치 착용이 가장 안전',
  ],
}

const DEFAULT_FAQS = [
  {
    q: '인비절라인은 얼마나 걸리나요?',
    a: '평균 10~18개월입니다. 단순 케이스(Lite)는 6~9개월, 일반 케이스(Moderate)는 10~18개월, 복잡한 케이스(Comprehensive)는 18~24개월 정도 소요됩니다. 정확한 기간은 ClinCheck 시뮬레이션 단계에서 확정됩니다.',
  },
  {
    q: '메탈 브라켓 교정과 비교했을 때 효과가 떨어지나요?',
    a: '아닙니다. 인비절라인은 9백만 케이스 이상의 글로벌 임상 데이터를 바탕으로, 대부분의 부정교합 치료가 가능합니다. 단순 정렬부터 발치 교정·복잡 케이스까지 메탈 브라켓과 동일한 수준의 결과를 얻을 수 있으며, 환자 편의성은 훨씬 뛰어납니다.',
  },
  {
    q: '하루에 얼마나 착용해야 하나요?',
    a: '하루 22시간 이상 착용이 필수입니다. 식사·양치 시간 외에는 항상 끼고 계셔야 단계대로 치아가 이동합니다. 착용 시간이 부족하면 치료가 지연되거나 결과가 달라질 수 있어요. My Invisalign 앱으로 착용 시간을 기록할 수 있습니다.',
  },
  {
    q: '발치를 꼭 해야 하나요?',
    a: '진단 결과에 따라 다릅니다. 치아 공간이 부족하거나 돌출이 심한 경우 소구치 발치가 필요할 수 있고, 미니스크류·구개확장(MARPE)으로 발치 없이 진행 가능한 경우도 있습니다. ClinCheck 시뮬레이션에서 발치 vs 비발치 결과를 미리 비교해보고 결정합니다.',
  },
  {
    q: '비용이 일반 교정보다 비싸나요?',
    a: '대구365치과 인비절라인 비용은 Lite 500만원 / Moderate 600만원 / Comprehensive 750만원입니다. 일반 메탈 교정과 큰 차이가 없으며, S라인 심미 브라켓(580만원)·클리피씨 자가결찰(580만원)과도 비슷한 가격대입니다. 별도 진단비 20만원이 추가됩니다.',
  },
  {
    q: '교정 후 다시 비뚤어지지 않나요?',
    a: '유지장치 착용을 잘 하시면 재발하지 않습니다. 치료 종료 후 가철식(20만원/악) 또는 고정식(20만원/악) 유지장치를 처방하며, 초기 1년은 24시간, 그 이후엔 야간만 착용하시면 됩니다. 6개월 정기 검진으로 재발 가능성을 조기에 발견할 수 있어요.',
  },
]

export const OrthoTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const displayFaqs = faqs.length > 0
    ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'ortho', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <img
          src="/r2/images/clinic/precision-dlab.jpg?v=1"
          alt="인비절라인 디지털 교정"
          class="absolute inset-0 w-full h-full object-cover opacity-15"
          loading="eager"
        />
        <div class="absolute inset-0" style="background:linear-gradient(95deg, rgba(20,14,8,0.96) 0%, rgba(20,14,8,0.92) 35%, rgba(26,18,10,0.7) 70%, rgba(26,18,10,0.55) 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 60%);"></div>
        <div class="blob" style="width:700px;height:700px;background:#c9a876;top:-20%;right:-15%;opacity:0.18;"></div>

        <div class="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="max-w-4xl fade-in">
            <div class="text-xs tracking-[0.4em] text-gold mb-8 font-bold">SIGNATURE TREATMENT · 03</div>
            <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
              <span class="block" style="color:#fdfbf7;">티 안 나게,</span>
              <span class="block italic" style="color:var(--gold); text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.6);">일상 그대로</span>
              <span class="block" style="color:#fdfbf7;">교정합니다.</span>
            </h1>
            <p class="t-lead mb-10 max-w-2xl" style="color:rgba(253,251,247,0.92); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
              인비절라인 공인 교정의 + 3D iTero 디지털 스캔 + ClinCheck 결과 미리보기.<br/>
              식사·양치 그대로, 거의 보이지 않는 투명 교정.
            </p>

            <div class="flex flex-wrap gap-4 mb-16">
              <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <i class="fas fa-phone"></i>
                <span class="font-bold">053-357-0365 교정 상담</span>
              </a>
              <a href="#packages" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <span>패키지 비교</span>
                <i class="fas fa-arrow-down text-sm"></i>
              </a>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/15">
              {[
                { num: '900만+', label: '글로벌 임상 케이스' },
                { num: 'iTero', label: '3D 디지털 스캔' },
                { num: '22h+', label: '하루 권장 착용' },
                { num: '5년', label: '리파인먼트 보장' },
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
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 mb-16">
            <div class="lg:col-span-4 fade-in">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                <span class="t-outline">인비절</span><br/>
                <span class="t-gold">라인</span><br/>이란?
              </h2>
            </div>
            <div class="lg:col-span-8 fade-in space-y-6 text-brown-700 text-lg leading-relaxed">
              <p>
                <strong class="text-brown-900">인비절라인(Invisalign)</strong>은 미국 Align Technology가 개발한 투명 얼라이너 교정 시스템입니다.
                전 세계 <strong class="text-brown-900">9백만 명 이상</strong>이 사용한 글로벌 표준이며,
                투명한 플라스틱 얼라이너를 단계별로 교체하며 치아를 이동시키는 방식입니다.
              </p>
              <p>
                대구365치과는 <strong class="text-brown-900">인비절라인 공인 교정의</strong>가 상주하며,
                3D iTero 스캐너 + ClinCheck 시뮬레이션으로 <strong class="text-brown-900">치료 결과를 미리 보고 시작</strong>합니다.
                메탈 브라켓 교정과 동일한 결과를, 훨씬 편안하고 심미적으로 받으실 수 있습니다.
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
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>교정장치가 보이는 게 부담스러우신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>직장·결혼·면접 등 사회생활을 활발히 하시는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>음식·양치의 자유를 원하시는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>금속 알레르기가 있으신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>치료 결과를 미리 보고 결정하고 싶으신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>혼합치열기(7~13세) 자녀의 조기 교정</span></li>
              </ul>
            </div>

            <div class="bg-brown-50 rounded-2xl p-8 border border-brown-200/60">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-full bg-brown-100 text-brown-700 flex items-center justify-center border border-brown-300"><i class="fas fa-exclamation"></i></div>
                <h3 class="display text-2xl font-black tracking-tight">신중한 검토 필요</h3>
              </div>
              <ul class="space-y-3 text-brown-700">
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>하루 22시간 착용을 지키기 어려우신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>매우 복잡한 골격성 부정교합 (악교정 수술 동반)</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>심한 잇몸 질환이 활발한 상태</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>다수의 치아 결손 (보철 우선 필요)</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>구강위생 관리가 매우 어려우신 분</span></li>
              </ul>
              <p class="text-xs text-brown-500 mt-5">※ 사전 치료·내과 협진 후 진행 가능한 경우가 많습니다. 상담 시 정확히 안내드립니다.</p>
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
              <em class="italic text-brown-700">인비절라인</em>을<br/>
              <span class="t-gold">제대로 하는 곳</span>
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

      {/* 4. PACKAGES — 6종 비교 */}
      <section id="packages" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">PACKAGES · 04</div>
            <h2 class="t-display mb-6">
              <span class="t-outline">6종</span> <span class="t-gold">교정 패키지</span>
            </h2>
            <p class="t-lead max-w-3xl">
              부정교합 정도와 라이프스타일에 맞는 패키지를 선택할 수 있어요.
              진단 후 ClinCheck 시뮬레이션으로 가장 적합한 옵션을 안내드립니다.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-stagger">
            {PACKAGES.map((p: any) => (
              <div class={`relative bg-cream rounded-2xl p-7 border-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-lux ${p.badge ? 'border-gold/60' : 'border-brown-200/60'}`}>
                {p.badge && (
                  <div class="absolute -top-3 left-7 text-[9px] tracking-[0.25em] font-bold text-brown-950 bg-gold px-3 py-1 rounded-full">{p.badge}</div>
                )}
                <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-3 font-bold">{p.range}</div>
                <h3 class="display text-2xl font-black tracking-tight mb-3 text-brown-900">{p.name}</h3>
                <div class="display text-3xl font-black text-brown-900 mb-5">{p.price}</div>
                <p class="text-sm text-brown-700 leading-relaxed mb-5">{p.desc}</p>
                <ul class="space-y-2 border-t border-brown-200 pt-5">
                  {p.points.map((pt: string) => (
                    <li class="flex gap-2 items-start text-xs text-brown-700">
                      <i class="fas fa-check text-gold text-[10px] mt-1"></i>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 추가 항목 */}
          <div class="mt-12 bg-brown-950 text-ivory rounded-2xl p-8 lg:p-10 fade-in">
            <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <div class="text-[10px] tracking-[0.3em] text-gold mb-2 font-bold">ADD-ONS · 부속 항목</div>
                <h3 class="display text-2xl font-black tracking-tight">교정 추가 항목</h3>
              </div>
              <a href="/fees" class="text-xs tracking-wider text-gold inline-flex items-center gap-2 font-bold">
                전체 수가표 <i class="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADD_ONS.map((a: any) => (
                <div class="bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-xl p-4">
                  <div class="text-sm font-bold text-ivory mb-1">{a.name}</div>
                  <div class="text-lg font-black text-gold mb-2">{a.price}</div>
                  <div class="text-[10px] text-ivory/70 leading-relaxed">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARE */}
      <section class="py-24 bg-cream">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-12 fade-in">
            <div class="section-label mb-6">COMPARE · 05</div>
            <h2 class="t-display">
              인비절라인 vs <span class="t-gold">기존 교정</span>
            </h2>
          </div>

          <div class="bg-ivory rounded-2xl border border-brown-200/60 overflow-hidden shadow-sm fade-in">
            <div class="grid grid-cols-4 gap-3 px-5 lg:px-7 py-4 bg-brown-50 border-b border-brown-200 text-[10px] lg:text-xs tracking-[0.2em] font-bold text-brown-600">
              <div>구분</div>
              <div class="text-gold">인비절라인</div>
              <div>메탈 브라켓</div>
              <div>S라인 도재</div>
            </div>
            {COMPARE.map((row: any, i: number) => (
              <div class={`grid grid-cols-4 gap-3 px-5 lg:px-7 py-5 items-center text-xs lg:text-sm ${i > 0 ? 'border-t border-brown-100' : ''}`}>
                <div class="font-bold text-brown-900">{row.item}</div>
                <div class="text-brown-800 bg-gold/8 -mx-2 px-2 py-1 rounded font-semibold">{row.invisalign}</div>
                <div class="text-brown-700">{row.bracket}</div>
                <div class="text-brown-700">{row.sline}</div>
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
              <span class="t-gold">교정 여정</span>
            </h2>
            <p class="t-lead max-w-3xl">진단부터 평생 유지까지, 인비절라인 전 과정을 안내합니다.</p>
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
              <span class="t-outline">교정 중·후</span><br/>
              <span class="t-gold">관리 가이드</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 fade-in-stagger">
            {[
              { title: '매일 관리', icon: 'fa-sun', items: CARE_GUIDE.daily },
              { title: '주의사항', icon: 'fa-triangle-exclamation', items: CARE_GUIDE.attention },
              { title: '내원 일정', icon: 'fa-calendar-week', items: CARE_GUIDE.visit },
              { title: '교정 후', icon: 'fa-infinity', items: CARE_GUIDE.long_term },
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

      {/* 9. CASES */}
      {cases.length > 0 && (
        <section class="py-24 bg-cream">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-end mb-12 fade-in">
              <div>
                <div class="section-label mb-6">CASES · 09</div>
                <h2 class="t-display">치료 <span class="t-gold">사례</span></h2>
              </div>
              <a href="/before-after?treatment=ortho" class="link-underline display italic">전체 보기 →</a>
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
              <p class="text-brown-600">실제 인비절라인 교정 사례를 곧 공개합니다.</p>
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
        <img src="/r2/images/clinic/precision-dlab.jpg?v=1" alt="" class="absolute inset-0 w-full h-full object-cover opacity-15" loading="lazy" aria-hidden="true" />
        <div class="absolute inset-0" style="background:linear-gradient(135deg, rgba(26,18,10,0.92) 0%, rgba(26,18,10,0.75) 100%);"></div>
        <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.18;"></div>
        <div class="relative max-w-3xl mx-auto px-6 text-center">
          <div class="section-label mb-6 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">교정 상담 · ClinCheck 시뮬레이션</div>
          <h2 class="mb-8 fade-in font-black tracking-tight leading-[1]" style="font-size:clamp(2.5rem, 6vw, 5rem);color:var(--ivory); text-shadow: 0 4px 24px rgba(0,0,0,0.6);">
            결과를 <span class="t-gold italic">먼저 본 다음</span><br/>시작하세요
          </h2>
          <p class="t-lead mb-10 fade-in" style="color:rgba(253,251,247,0.85); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
            ClinCheck로 시작-끝 모습을 미리 확인하고 결정하세요. 첫 상담 무료.
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
