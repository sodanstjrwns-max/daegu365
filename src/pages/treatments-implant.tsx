import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 수면임플란트 풀볼륨 상세 페이지 v1
   - 수가표(2026 PPTX) 데이터 기반: 메가젠 ST 80 / 오스템 BA 110 /
     메가젠 BD 120 / 오스템 SOI 120 / 스트라우만 앤서지 150
   - 픽스쳐 5년 · 상부 평생 보증
   ============================================================ */

const FIXTURES = [
  {
    brand: '메가젠 (ST)',
    origin: '대한민국',
    price: '80만원',
    badge: 'BEST VALUE',
    desc: '국산 메가젠의 검증된 베스트셀러. 가성비와 안정성을 모두 잡은 표준 옵션.',
    points: ['SLA 표면처리', '국내 임상 데이터 풍부', '맞춤기둥+지르코니아 포함'],
  },
  {
    brand: '오스템 (BA)',
    origin: '대한민국',
    price: '110만원',
    desc: '국내 점유율 1위 오스템의 BA 라인. 골유착 속도와 초기 안정성이 우수.',
    points: ['SA 표면처리', '빠른 골유착', '맞춤기둥+지르코니아 포함'],
  },
  {
    brand: '메가젠 (블루다이아몬드)',
    origin: '대한민국',
    price: '120만원',
    badge: 'PREMIUM',
    desc: '메가젠 프리미엄 라인 BD. 짧은 픽스쳐가 필요한 까다로운 케이스에 강점.',
    points: ['BlueDiamond 표면', '짧은 픽스쳐 옵션', '맞춤기둥+지르코니아 포함'],
  },
  {
    brand: '오스템 (SOI)',
    origin: '대한민국',
    price: '120만원',
    desc: '오스템 프리미엄 SOI. 즉시 식립·즉시 부하 프로토콜에 최적화.',
    points: ['고정밀 가공', '즉시식립 가능', '맞춤기둥+지르코니아 포함'],
  },
  {
    brand: '스트라우만 (앤서지)',
    origin: '스위스',
    price: '150만원',
    badge: 'WORLD STANDARD',
    desc: '세계 1위 스위스 스트라우만의 앤서지 라인. 50년 임상·평생 안정성의 글로벌 표준.',
    points: ['Roxolid 합금', 'SLActive 표면', '맞춤기둥+지르코니아 포함'],
  },
]

const BONE_GRAFT = [
  { name: '골이식 (단순)', price: '30만원', desc: '소량의 골량 부족 시' },
  { name: '골이식 (복잡)', price: '50만원', desc: '광범위한 골재건이 필요한 경우' },
  { name: '상악동거상술 (수직)', price: '50만원~', desc: '50 / 100 / 150 / 200 (1치당)' },
  { name: '상악동거상술 (측방)', price: '100만원', desc: '상악 어금니 골량 부족' },
]

const PROCESS = [
  {
    step: '01',
    title: '정밀 진단',
    duration: '약 30~45분',
    desc: '파노라마, CBCT(3D 콘빔 CT), 구강 스캔까지 — 뼈의 양·신경 위치·잇몸 두께를 입체적으로 분석합니다.',
    detail: ['파노라마·CBCT 촬영', '디지털 구강 스캔', '교합 검사', '전신 건강 문진'],
  },
  {
    step: '02',
    title: '디지털 시뮬레이션',
    duration: '1~2일',
    desc: '3D 가상 식립으로 픽스쳐 위치·각도·깊이를 사전 시뮬레이션. 수술 가이드(Surgical Guide)를 제작합니다.',
    detail: ['3D 가상 식립 설계', '신경관·상악동 거리 계산', '서지컬 가이드 제작', '비용·기간 사전 안내'],
  },
  {
    step: '03',
    title: '수면 진정 + 4단계 무통마취',
    duration: '시술 당일',
    desc: '진정하요법(IV Sedation)으로 꿈결 같은 편안함 속에서 수술 진행. 가글→도포→무통기→본마취 4단계 프로토콜.',
    detail: ['전문 마취 모니터링', '생체신호 실시간 측정', '4단계 무통마취', '환자 속도에 맞춘 진행'],
  },
  {
    step: '04',
    title: '픽스쳐 식립 (수술)',
    duration: '1개당 약 15~30분',
    desc: '서지컬 가이드 기반 디지털 가이드 수술. 정확한 위치·각도·깊이로 1mm 오차 없이 식립합니다.',
    detail: ['디지털 가이드 식립', '필요 시 동시 골이식', '봉합·방사선 확인', '당일 귀가 가능'],
  },
  {
    step: '05',
    title: '골유착 대기 (Osseointegration)',
    duration: '하악 2~3개월 / 상악 4~6개월',
    desc: '픽스쳐와 뼈가 단단히 결합하는 기간. 임시치아로 일상생활을 유지하며 정기 체크.',
    detail: ['임시치아 제공', '월 1회 체크업', '식이 가이드', '구강위생 관리 코칭'],
  },
  {
    step: '06',
    title: '맞춤기둥 + 지르코니아 크라운',
    duration: '약 2주',
    desc: '원내 디지털 기공실(D.LAB)에서 환자 맞춤 어버트먼트와 지르코니아 크라운 제작·장착. 당일 미세조정 가능.',
    detail: ['디지털 인상', '맞춤기둥 제작', '지르코니아 크라운', '교합 정밀 조정'],
  },
  {
    step: '07',
    title: '평생 관리 (Lifetime Care)',
    duration: '평생',
    desc: '3~6개월 정기 메인터넌스. 픽스쳐 5년·상부보철 평생 보증으로 끝까지 책임집니다.',
    detail: ['3~6개월 정기 검진', '에어플로우 GBT 관리', '픽스쳐 5년 보증', '상부 평생 보증'],
  },
]

const WHY_US = [
  {
    icon: 'fa-bed',
    title: '진정하요법 (수면진정)',
    desc: '의식하 진정 마취로 꿈결처럼 편안한 수술. 시술 시간이 길거나 공포가 심한 분들도 부담 없이 진행 가능합니다.',
    meta: '+ 진정하요법 20만원',
  },
  {
    icon: 'fa-microchip',
    title: '디지털 가이드 수술',
    desc: 'CBCT + 3D 시뮬레이션 + 서지컬 가이드. 신경·혈관 손상 위험을 최소화하며 1mm 오차 없는 정확도로 식립합니다.',
    meta: '오차 < 1mm',
  },
  {
    icon: 'fa-shield-heart',
    title: '평생 임플란트 보증',
    desc: '픽스쳐(뿌리) 5년, 상부보철(크라운) 평생 무상 보증. 환자 부주의로 인한 파손을 제외한 모든 부작용·파절·소실을 책임집니다.',
    meta: '픽스쳐 5년 · 상부 평생',
  },
  {
    icon: 'fa-flask',
    title: '원내 디지털 기공실',
    desc: 'D.LAB STUDIO 365 — 원내 디지털 기공실에서 맞춤기둥과 크라운을 직접 제작. 당일 조정·재제작 가능, 외주 대기 시간 0.',
    meta: 'D.LAB STUDIO 365',
  },
  {
    icon: 'fa-user-md',
    title: '7명 전문 의료진 협진',
    desc: '구강악안면외과·치주·보존·보철 전문 협진. 단순 식립이 아닌 평생 가는 임플란트를 함께 설계합니다.',
    meta: '통합치의학과 전문의',
  },
  {
    icon: 'fa-handshake',
    title: '투명한 비용 안내',
    desc: '맞춤기둥·지르코니아 크라운 포함 가격. 진단 후 모든 비용을 사전에 투명하게 안내, 동의 없이 추가 진료 없음.',
    meta: '추가비용 No',
  },
]

const COMPLICATIONS = [
  {
    risk: '신경 손상',
    prob: '< 0.5%',
    prevention: 'CBCT로 하치조신경 위치를 3D로 사전 분석. 서지컬 가이드로 안전 거리를 확보합니다.',
  },
  {
    risk: '상악동 천공',
    prob: '< 1%',
    prevention: '상악 어금니 식립 시 상악동거상술을 동시 진행. 측방·수직 접근법을 케이스별로 선택합니다.',
  },
  {
    risk: '골유착 실패',
    prob: '약 2~3%',
    prevention: '국제 학회 평균(5%)의 절반 수준. 실패 시 재식립 무상 진행 (보증기간 내).',
  },
  {
    risk: '임플란트 주위염',
    prob: '관리 시 < 5%',
    prevention: '3~6개월 정기 메인터넌스 + 에어플로우 GBT 예방 시스템으로 장기 관리.',
  },
]

const CARE_GUIDE = {
  before: [
    '시술 6시간 전부터 금식 (진정하요법 진행 시)',
    '전신 건강 상태(고혈압·당뇨·혈액응고제 등) 사전 안내',
    '편안한 복장·운전이 어려우니 보호자 동반 권장',
  ],
  after_24h: [
    '거즈를 30~40분간 꽉 물어 지혈',
    '시술 부위 반대쪽으로 식사, 미지근한 음식만',
    '24시간 금연·금주, 격렬한 운동 금지',
    '얼음찜질로 부기·통증 완화',
  ],
  after_week: [
    '처방받은 항생제·진통제 정시 복용',
    '부드러운 음식 위주, 시술 부위 양치 시 주의',
    '7~10일 후 봉합사 제거 방문',
  ],
  long_term: [
    '하루 2회 이상 양치 + 치간칫솔·치실 필수',
    '3~6개월 정기 메인터넌스 방문',
    '딱딱하거나 질긴 음식 주의 (얼음·오징어·견과류)',
    '이갈이·이악물기 있다면 마우스가드 착용',
  ],
}

const DEFAULT_FAQS_IMPLANT = [
  {
    q: '임플란트는 평생 쓸 수 있나요?',
    a: '대구365치과의 임플란트는 픽스쳐 5년·상부보철 평생 무상 보증입니다. 환자 부주의에 의한 파손을 제외한 모든 부작용·파절·소실에 대해 재치료를 제공합니다. 3~6개월 정기 메인터넌스에 참여하시면 장기 성공률이 95% 이상입니다.',
  },
  {
    q: '수면임플란트는 전신마취인가요?',
    a: '아닙니다. 수면임플란트는 의식하 진정(IV Sedation)으로, 환자분이 자발 호흡을 유지한 채 꿈결처럼 편안한 상태로 수술받으시는 방식입니다. 전신마취보다 회복이 빠르고 안전하며, 수술 후 가볍게 깨어나십니다.',
  },
  {
    q: '뼈가 부족하다고 들었는데, 가능할까요?',
    a: '대부분 가능합니다. CBCT 정밀 진단 후 골이식(단순 30만원 / 복잡 50만원), 상악동거상술(수직 50만원~ / 측방 100만원) 등 환자 상태에 맞는 골재건을 동시 진행합니다. 다른 치과에서 안 된다고 하셨던 케이스도 상담해 보세요.',
  },
  {
    q: '시술 후 일상 복귀는 얼마나 걸리나요?',
    a: '단순 식립의 경우 다음 날 일상생활 가능합니다. 단, 격렬한 운동·음주·흡연은 1주일간 자제하시고, 부드러운 음식 위주로 식사하셔야 합니다. 골이식·상악동거상술이 동반되면 회복 기간이 1~2주 정도 소요됩니다.',
  },
  {
    q: '식립부터 보철 완성까지 얼마나 걸리나요?',
    a: '하악(아래턱)은 식립 후 2~3개월, 상악(위턱)은 4~6개월의 골유착 기간이 필요합니다. 그 사이 임시치아로 일상생활이 가능하며, 골유착 완료 후 맞춤기둥+지르코니아 크라운 제작에 약 2주가 소요됩니다.',
  },
  {
    q: '메가젠과 스트라우만 중 어떤 게 좋나요?',
    a: '의학적으로는 모든 옵션이 검증된 안전한 픽스쳐입니다. 메가젠 ST(80만원)는 가성비, 오스템 BA(110만원)는 점유율 1위, 스트라우만 앤서지(150만원)는 50년 임상의 글로벌 표준입니다. 환자분의 골 상태·생활 패턴·예산을 고려해 의료진이 가장 적합한 옵션을 추천드립니다.',
  },
]

export const ImplantTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const displayFaqs = faqs.length > 0
    ? faqs
    : DEFAULT_FAQS_IMPLANT.map((f, i) => ({ id: i, treatment_slug: 'implant', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* ========================================== */}
      {/* 1. CINEMATIC HERO                            */}
      {/* ========================================== */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <img
          src="/r2/images/clinic/precision-implant-center.jpg?v=1"
          alt="365 임플란트 수술센터"
          class="absolute inset-0 w-full h-full object-cover opacity-15"
          loading="eager"
        />
        {/* 가독성 강화 그라디언트 — 좌측을 거의 단색으로 깔아 텍스트 영역 확보 */}
        <div class="absolute inset-0" style="background:linear-gradient(95deg, rgba(20,14,8,0.96) 0%, rgba(20,14,8,0.92) 35%, rgba(26,18,10,0.7) 70%, rgba(26,18,10,0.55) 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 60%);"></div>
        <div class="blob" style="width:700px;height:700px;background:#c9a876;top:-20%;right:-15%;opacity:0.18;"></div>

        <div class="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="max-w-4xl fade-in">
            <div class="text-xs tracking-[0.4em] text-gold mb-8 font-bold">SIGNATURE TREATMENT · 01</div>
            <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
              <span class="block" style="color:#fdfbf7;">치과가</span>
              <span class="block" style="color:#fdfbf7;">두려워도,</span>
              <span class="block italic" style="color:var(--gold); text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.6);">잠든 사이</span>
              <span class="block" style="color:#fdfbf7;">끝납니다.</span>
            </h1>
            <p class="t-lead mb-10 max-w-2xl" style="color:rgba(253,251,247,0.92); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
              의식하 진정(IV Sedation) + 4단계 무통마취 + 디지털 가이드 수술.<br/>
              꿈결 같은 편안함 속에서 평생 가는 임플란트를 완성합니다.
            </p>

            <div class="flex flex-wrap gap-4 mb-16">
              <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <i class="fas fa-phone"></i>
                <span class="font-bold">053-357-0365 상담 예약</span>
              </a>
              <a href="#fixtures" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <span>픽스쳐 5종 비교</span>
                <i class="fas fa-arrow-down text-sm"></i>
              </a>
            </div>

            {/* 핵심 메트릭 4개 */}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/15">
              {[
                { num: '5종', label: '픽스쳐 옵션' },
                { num: '< 1mm', label: '디지털 가이드 오차' },
                { num: '95%+', label: '10년 성공률' },
                { num: '∞', label: '상부보철 평생보증' },
              ].map((s: any) => (
                <div>
                  <div class="display text-3xl lg:text-5xl font-black text-ivory tracking-tight leading-none mb-2">{s.num}</div>
                  <div class="text-[10px] lg:text-xs tracking-[0.25em] text-ivory/60 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. WHAT IS — 의학적 정의 + 적응증 + 비적응증   */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 mb-16">
            <div class="lg:col-span-4 fade-in">
              <div class="section-label mb-6">WHAT IS · 02</div>
              <h2 class="t-display">
                <span class="t-outline">수면</span><br/>
                <span class="t-gold">임플란트</span><br/>란?
              </h2>
            </div>
            <div class="lg:col-span-8 fade-in space-y-6 text-brown-700 text-lg leading-relaxed">
              <p>
                <strong class="text-brown-900">수면임플란트(Sedation Implant)</strong>는 의식하 진정(IV Sedation) 하에 진행하는 임플란트 시술입니다.
                정맥으로 진정제를 투여해 환자분이 <strong class="text-brown-900">자발 호흡을 유지한 채 꿈결처럼 편안한 상태</strong>에서 수술을 받으시는 방식이에요.
              </p>
              <p>
                전신마취와 달리 회복이 빠르고, 일반 마취만 하는 임플란트와 달리 시술 시간이 길거나 치과 공포증이 있는 분들도 부담이 없습니다.
                대구365치과는 <strong class="text-brown-900">전문 마취 모니터링과 생체 신호 실시간 측정 시스템</strong>으로 안전하게 진행합니다.
              </p>
            </div>
          </div>

          {/* 적응증 / 비적응증 2분할 */}
          <div class="grid md:grid-cols-2 gap-6 fade-in">
            <div class="bg-cream rounded-2xl p-8 border border-brown-200/60">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-full bg-brown-900 text-gold flex items-center justify-center"><i class="fas fa-check"></i></div>
                <h3 class="display text-2xl font-black tracking-tight">이런 분께 추천</h3>
              </div>
              <ul class="space-y-3 text-brown-700">
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>치과 공포증으로 시술이 두려우신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>여러 개의 임플란트를 한 번에 진행하시는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>구역 반사가 심해 장시간 입을 벌리기 어려우신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>골이식·상악동거상술 등 복합 수술이 필요하신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>이전 치과 경험이 트라우마로 남아 있는 분</span></li>
              </ul>
            </div>

            <div class="bg-brown-50 rounded-2xl p-8 border border-brown-200/60">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-full bg-brown-100 text-brown-700 flex items-center justify-center border border-brown-300"><i class="fas fa-exclamation"></i></div>
                <h3 class="display text-2xl font-black tracking-tight">신중한 검토 필요</h3>
              </div>
              <ul class="space-y-3 text-brown-700">
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>조절되지 않는 고혈압·당뇨·심장질환</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>혈액응고제 복용 중인 분 (의사 협진 필수)</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>임신·수유 중이신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>심한 골다공증으로 약물 치료 중이신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-brown-400 text-[6px] mt-2.5"></i><span>흡연이 많거나 구강위생 관리가 어려우신 분</span></li>
              </ul>
              <p class="text-xs text-brown-500 mt-5">※ 비적응증이라도 내과 협진 후 진행 가능한 경우가 많습니다. 상담 시 정확히 안내드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. WHY DAEGU365 — 6 KEY DIFFERENTIATORS    */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">WHY DAEGU365 · 03</div>
            <h2 class="t-display">
              <em class="italic text-brown-700">대구365치과</em>에서<br/>
              하면 무엇이 <span class="t-gold">다른가</span>
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

      {/* ========================================== */}
      {/* 4. FIXTURES — 5종 비교 (수가표 기반)         */}
      {/* ========================================== */}
      <section id="fixtures" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">FIXTURES · 04</div>
            <h2 class="t-display mb-6">
              <span class="t-outline">5종</span> <span class="t-gold">픽스쳐 비교</span>
            </h2>
            <p class="t-lead max-w-3xl">
              모든 픽스쳐는 <strong class="text-brown-900">맞춤기둥 + 지르코니아 크라운 포함 가격</strong>이며,
              <strong class="text-brown-900"> 픽스쳐 5년 · 상부보철 평생 보증</strong>이 적용됩니다.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-stagger">
            {FIXTURES.map((fx: any) => (
              <div class={`relative bg-cream rounded-2xl p-7 border-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-lux ${fx.badge ? 'border-gold/60' : 'border-brown-200/60'}`}>
                {fx.badge && (
                  <div class="absolute -top-3 left-7 text-[9px] tracking-[0.25em] font-bold text-brown-950 bg-gold px-3 py-1 rounded-full">{fx.badge}</div>
                )}
                <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-3 font-bold">{fx.origin}</div>
                <h3 class="display text-2xl font-black tracking-tight mb-3 text-brown-900">{fx.brand}</h3>
                <div class="display text-4xl font-black text-brown-900 mb-5">{fx.price}</div>
                <p class="text-sm text-brown-700 leading-relaxed mb-5">{fx.desc}</p>
                <ul class="space-y-2 border-t border-brown-200 pt-5">
                  {fx.points.map((p: string) => (
                    <li class="flex gap-2 items-start text-xs text-brown-700">
                      <i class="fas fa-check text-gold text-[10px] mt-1"></i>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 추가 정보 카드 */}
            <div class="bg-brown-950 text-ivory rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">ADDITIONAL</div>
                <h3 class="display text-2xl font-black tracking-tight mb-5">추가 항목</h3>
                <ul class="space-y-3 text-sm text-ivory/85">
                  <li class="flex justify-between border-b border-ivory/15 pb-2">
                    <span>임플란트 연결치 (폰틱)</span><span class="font-bold text-gold">50만원</span>
                  </li>
                  <li class="flex justify-between border-b border-ivory/15 pb-2">
                    <span>맞춤기둥 (단독)</span><span class="font-bold text-gold">25만원</span>
                  </li>
                  <li class="flex justify-between border-b border-ivory/15 pb-2">
                    <span>타치과 임플란트 크라운</span><span class="font-bold text-gold">50만원</span>
                  </li>
                  <li class="flex justify-between">
                    <span>진정하요법 (수면)</span><span class="font-bold text-gold">20만원</span>
                  </li>
                </ul>
              </div>
              <a href="/fees" class="text-xs tracking-wider text-gold mt-6 inline-flex items-center gap-2 font-bold">
                전체 수가표 보기 <i class="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. BONE GRAFT — 골이식 옵션                  */}
      {/* ========================================== */}
      <section class="py-24 bg-cream">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-5 fade-in">
              <div class="section-label mb-6">BONE GRAFT · 05</div>
              <h2 class="t-display mb-6">
                뼈가 부족해도<br/>
                <span class="t-gold">괜찮습니다</span>
              </h2>
              <p class="text-brown-700 text-base leading-relaxed mb-6">
                CBCT로 잇몸뼈 양을 정확히 측정하고, 부족한 만큼만 골이식을 동시 진행합니다.
                다른 치과에서 안 된다고 하셨던 케이스도 대부분 가능해요.
              </p>
              <div class="text-xs text-brown-500 leading-relaxed">
                ※ 상악동거상술은 1치당 50/100/150/200만원으로 케이스별 차등 적용됩니다.
              </div>
            </div>
            <div class="lg:col-span-7 fade-in space-y-3">
              {BONE_GRAFT.map((b: any) => (
                <div class="bg-ivory rounded-xl p-5 border border-brown-200/60 flex items-center justify-between gap-4 hover:border-brown-400 transition">
                  <div class="flex-1">
                    <div class="font-bold text-brown-900 mb-1">{b.name}</div>
                    <div class="text-xs text-brown-600">{b.desc}</div>
                  </div>
                  <div class="display text-xl font-black text-brown-900 tracking-tight whitespace-nowrap">{b.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 6. PROCESS — 7단계 상세                      */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">PROCESS · 06</div>
            <h2 class="t-display mb-6">
              <span class="t-outline">7단계</span><br/>
              <span class="t-gold">치료 여정</span>
            </h2>
            <p class="t-lead max-w-3xl">상담부터 평생 관리까지, 모든 단계를 명확하게 안내합니다.</p>
          </div>

          <div class="space-y-4">
            {PROCESS.map((p: any, i: number) => (
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

      {/* ========================================== */}
      {/* 7. SAFETY — 부작용 & 예방 시스템              */}
      {/* ========================================== */}
      <section class="py-24 bg-brown-950 text-ivory relative overflow-hidden">
        <div class="blob" style="width:600px;height:600px;background:#c9a876;bottom:-20%;left:-15%;opacity:0.15;"></div>
        <div class="relative max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="text-xs tracking-[0.4em] text-gold mb-6 font-bold">SAFETY · 07</div>
            <h2 class="t-display mb-6" style="color:var(--ivory);">
              <span style="color:var(--ivory);">부작용</span>은 <span class="t-gold">예방</span>이 먼저입니다
            </h2>
            <p class="t-lead max-w-3xl" style="color:rgba(253,251,247,0.75);">
              모든 수술에는 위험이 있습니다. 그러나 위험을 정확히 알고, 시스템으로 예방하는 곳이 좋은 병원입니다.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-5 fade-in-stagger">
            {COMPLICATIONS.map((c: any) => (
              <div class="bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-2xl p-7 hover:bg-ivory/10 transition">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="display text-xl font-black tracking-tight text-ivory">{c.risk}</h3>
                  <div class="text-xs tracking-[0.2em] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">{c.prob}</div>
                </div>
                <p class="text-sm text-ivory/75 leading-relaxed">{c.prevention}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. CARE GUIDE — 시술 전·중·후 가이드          */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">CARE GUIDE · 08</div>
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
              <div class="bg-cream rounded-2xl p-6 border border-brown-200/60 hover:border-gold/60 transition h-full">
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

      {/* ========================================== */}
      {/* 9. DOCTORS                                  */}
      {/* ========================================== */}
      {doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="mb-16 fade-in">
              <div class="section-label mb-6">OUR TEAM · 09</div>
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

      {/* ========================================== */}
      {/* 10. CASES — 비포애프터 어드민 업로드 연동       */}
      {/* ========================================== */}
      {cases.length > 0 && (
        <section class="py-24 bg-ivory">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-end mb-12 fade-in">
              <div>
                <div class="section-label mb-6">CASES · 10</div>
                <h2 class="t-display">치료 <span class="t-gold">사례</span></h2>
              </div>
              <a href="/before-after?treatment=implant" class="link-underline display italic">전체 보기 →</a>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
              {cases.slice(0, 3).map((ba: any) => {
                // 어드민에서 업로드한 비포 이미지를 우선 노출 (구강 → 파노라마 순)
                const beforeImg = ba.intra_before_url || ba.pano_before_url
                return (
                  <a href={`/before-after/${ba.id}`} class="fade-in lux-card p-0 overflow-hidden hover:-translate-y-1 transition-all duration-500 group">
                    <div class="aspect-[4/3] relative overflow-hidden bg-brown-100">
                      {beforeImg ? (
                        <img
                          src={beforeImg}
                          alt={ba.title}
                          loading="lazy"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div class="w-full h-full placeholder-img flex items-center justify-center text-brown-400">
                          <i class="fas fa-images text-3xl"></i>
                        </div>
                      )}
                      <div class="absolute top-3 left-3 text-[10px] tracking-[0.25em] font-bold text-ivory bg-brown-950/80 px-3 py-1 rounded-full backdrop-blur">
                        BEFORE
                      </div>
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
                      {ba.description && (
                        <p class="text-sm text-brown-600 line-clamp-2 leading-relaxed">{ba.description}</p>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CASES가 비어있을 때 — 어드민 비포애프터 업로드 유도 placeholder */}
      {cases.length === 0 && (
        <section class="py-24 bg-ivory">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-end mb-12 fade-in">
              <div>
                <div class="section-label mb-6">CASES · 10</div>
                <h2 class="t-display">치료 <span class="t-gold">사례</span></h2>
              </div>
              <a href="/before-after" class="link-underline display italic">전체 사례 보기 →</a>
            </div>
            <div class="bg-cream rounded-2xl p-12 text-center border border-brown-200/60">
              <i class="fas fa-images text-4xl text-brown-300 mb-4"></i>
              <p class="text-brown-600">실제 임플란트 치료 사례를 곧 공개합니다.</p>
              <p class="text-xs text-brown-500 mt-2">환자분 동의 하에 업로드되며, AFTER 사진은 로그인 후 확인하실 수 있습니다.</p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* 11. FAQ                                     */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">FAQ · 11</div>
            <h2 class="t-display">자주 묻는 <span class="t-gold">질문</span></h2>
          </div>
          <div class="space-y-3">
            {displayFaqs.map((f: any, i: number) => (
              <details class="group fade-in bg-ivory rounded-2xl overflow-hidden border border-brown-200/60">
                <summary class="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-brown-50 gap-4">
                  <div class="flex gap-4 items-start flex-1">
                    <span class="text-gold display text-base font-black tracking-wider flex-shrink-0">Q{String(i + 1).padStart(2, '0')}</span>
                    <span class="font-bold text-brown-900 tracking-tight">{f.question}</span>
                  </div>
                  <i class="fas fa-chevron-down text-brown-400 group-open:rotate-180 transition flex-shrink-0"></i>
                </summary>
                <div class="px-6 pb-6 pt-2 text-brown-700 leading-relaxed border-t border-brown-100">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 12. RELATED DICTIONARY                       */}
      {/* ========================================== */}
      {dictTerms.length > 0 && (
        <section class="py-20 bg-ivory">
          <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div class="section-label mb-6 fade-in">DICTIONARY · 12</div>
            <h2 class="t-display mb-10 fade-in">관련 <span class="t-gold">용어</span></h2>
            <div class="flex flex-wrap gap-3 fade-in">
              {dictTerms.slice(0, 24).map((d: any) => (
                <a href={`/dictionary/${d.slug}`} class="tag tag-brown hover:bg-brown-900 hover:text-ivory transition text-sm py-2 px-4">
                  {d.term}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* 13. FINAL CTA                                */}
      {/* ========================================== */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <img
          src="/r2/images/clinic/precision-implant-center.jpg?v=1"
          alt=""
          class="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy"
          aria-hidden="true"
        />
        <div class="absolute inset-0" style="background:linear-gradient(135deg, rgba(26,18,10,0.92) 0%, rgba(26,18,10,0.75) 100%);"></div>
        <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.18;"></div>
        <div class="relative max-w-3xl mx-auto px-6 text-center">
          <div class="section-label mb-6 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">
            상담 예약
          </div>
          <h2 class="mb-8 fade-in font-black tracking-tight leading-[1]" style="font-size:clamp(2.5rem, 6vw, 5rem);color:var(--ivory);">
            <span class="t-gold italic">잠든 사이</span>,<br/>
            평생 가는 임플란트
          </h2>
          <p class="t-lead mb-10 fade-in" style="color:rgba(253,251,247,0.8);">
            첫 상담은 무료입니다. 정확한 진단과 비용은 사전에 투명하게 안내해드립니다.
          </p>
          <div class="flex flex-wrap justify-center gap-4 fade-in">
            <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
              <i class="fas fa-phone"></i>
              <span class="font-bold">053-357-0365</span>
            </a>
            <a href="/directions" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
              <i class="fas fa-map-marker-alt"></i>
              <span>오시는 길</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
