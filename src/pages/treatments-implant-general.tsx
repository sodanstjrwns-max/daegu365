import { Navbar, Footer, ComparisonTable } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 일반 임플란트 풀볼륨 상세 페이지 v1
   - 수가표 정답:
     · 일반 임플란트 패키지 (1개) : 100~180만원 (재료/시스템에 따라)
     · 뼈이식 (1부위)             : 20~100만원 (범위에 따라)
   - 픽스처 단가(부품)는 패키지 옵션으로만 표기:
     메가젠 ST 80 / 오스템 BA 110 / 메가젠 BD 120 / 오스템 SOI 120 / 스트라우만 앤서지 150
   - 픽스처 5년 · 상부보철 평생 보증
   - 수면임플란트(/treatments/implant)와 페어 페이지로 운영
   ============================================================ */

const FIXTURES = [
  {
    brand: '메가젠 (ST)',
    origin: '대한민국',
    price: '80만원',
    badge: 'BEST VALUE',
    desc: '국산 메가젠의 검증된 베스트셀러. 가성비와 안정성을 모두 잡은 합리적 표준 옵션.',
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
    desc: '메가젠 프리미엄 라인 BD. 짧은 픽스처가 필요한 까다로운 케이스에 강점.',
    points: ['BlueDiamond 표면', '짧은 픽스처 옵션', '맞춤기둥+지르코니아 포함'],
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
    desc: '3D 가상 식립으로 픽스처 위치·각도·깊이를 사전 시뮬레이션. 수술 가이드(Surgical Guide)를 제작합니다.',
    detail: ['3D 가상 식립 설계', '신경관·상악동 거리 계산', '서지컬 가이드 제작', '비용·기간 사전 안내'],
  },
  {
    step: '03',
    title: '4단계 무통마취',
    duration: '시술 당일',
    desc: '가글→도포→무통기→본마취 4단계 프로토콜로 마취 통증부터 부담 없이 시작합니다. (수면 진정은 옵션)',
    detail: ['표면도포 마취', '컴퓨터 무통기', '본마취 정밀 주입', '환자 속도에 맞춘 진행'],
  },
  {
    step: '04',
    title: '픽스처 식립 (수술)',
    duration: '1개당 약 15~30분',
    desc: '서지컬 가이드 기반 디지털 가이드 수술. 정확한 위치·각도·깊이로 1mm 오차 없이 식립합니다.',
    detail: ['디지털 가이드 식립', '필요 시 동시 골이식', '봉합·방사선 확인', '당일 귀가 가능'],
  },
  {
    step: '05',
    title: '골유착 대기 (Osseointegration)',
    duration: '하악 2~3개월 / 상악 4~6개월',
    desc: '픽스처와 뼈가 단단히 결합하는 기간. 임시치아로 일상생활을 유지하며 정기 체크.',
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
    desc: '3~6개월 정기 메인터넌스. 픽스처 5년·상부보철 평생 보증으로 끝까지 책임집니다.',
    detail: ['3~6개월 정기 검진', '에어플로우 GBT 관리', '픽스처 5년 보증', '상부 평생 보증'],
  },
]

const WHY_US = [
  {
    icon: 'fa-microchip',
    title: '디지털 가이드 수술',
    desc: 'CBCT + 3D 시뮬레이션 + 서지컬 가이드. 신경·혈관 손상 위험을 최소화하며 1mm 오차 없는 정확도로 식립합니다.',
    meta: '오차 < 1mm',
  },
  {
    icon: 'fa-shield-heart',
    title: '평생 임플란트 보증',
    desc: '픽스처(뿌리) 5년, 상부보철(크라운) 평생 무상 보증. 환자 부주의로 인한 파손을 제외한 모든 부작용·파절·소실을 책임집니다.',
    meta: '픽스처 5년 · 상부 평생',
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
    desc: '통합치의학과·치주·보존·보철 전문 협진. 단순 식립이 아닌 평생 가는 임플란트를 함께 설계합니다.',
    meta: '통합치의학과 전문의',
  },
  {
    icon: 'fa-handshake',
    title: '투명한 비용 안내',
    desc: '맞춤기둥·지르코니아 크라운 포함 패키지 가격. 진단 후 모든 비용을 사전에 투명하게 안내, 동의 없이 추가 진료 없음.',
    meta: '추가비용 No',
  },
  {
    icon: 'fa-bed',
    title: '수면 진정 옵션',
    desc: '치과 공포·다수 식립이 부담스러우신 분은 의식하 진정(IV Sedation)을 선택할 수 있습니다. 별도 수면임플란트 페이지에서 자세히 안내.',
    meta: '+ 진정 20~50만원',
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
    '진료 1~2일 전부터 충분한 수면',
    '전신 건강 상태(고혈압·당뇨·혈액응고제 등) 사전 안내',
    '시술 당일 가벼운 식사 권장',
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

const DEFAULT_FAQS_IMPLANT_GENERAL = [
  {
    q: '임플란트 1개에 비용이 얼마나 드나요?',
    a: '대구365치과 일반 임플란트는 픽스처 + 맞춤기둥 + 지르코니아 크라운이 모두 포함된 패키지 가격으로 1개당 100만원~180만원입니다. 메가젠 ST 100만원대, 오스템 BA·메가젠 BD·오스템 SOI 130만원대, 스트라우만 앤서지 180만원대로, 환자 골상태와 시스템 선호에 따라 선택하실 수 있습니다. 별도 추가 비용 없이 정찰제로 운영합니다.',
  },
  {
    q: '일반 임플란트와 수면임플란트의 차이는 무엇인가요?',
    a: '치료의 본질(픽스처 식립·골유착·보철)은 동일합니다. 차이는 마취 방식뿐입니다. 일반 임플란트는 4단계 무통마취만으로 진행하며, 수면임플란트는 여기에 의식하 진정(IV Sedation)을 더해 꿈결처럼 편안한 상태로 수술받는 방식입니다. 수면 진정은 +20~50만원 추가 옵션이며, 단순 1~2개 식립이라면 일반 임플란트로 충분히 편안하게 진행됩니다.',
  },
  {
    q: '임플란트는 평생 쓸 수 있나요?',
    a: '대구365치과의 임플란트는 픽스처 5년·상부보철 평생 무상 보증입니다. 환자 부주의에 의한 파손을 제외한 모든 부작용·파절·소실에 대해 재치료를 제공합니다. 3~6개월 정기 메인터넌스에 참여하시면 장기 성공률이 95% 이상입니다.',
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
    a: '의학적으로는 모든 옵션이 검증된 안전한 픽스처입니다. 메가젠 ST(패키지 100만원대)는 가성비, 오스템 BA(130만원대)는 점유율 1위, 스트라우만 앤서지(180만원대)는 50년 임상의 글로벌 표준입니다. 환자분의 골 상태·생활 패턴·예산을 고려해 의료진이 가장 적합한 옵션을 추천드립니다.',
  },
]

export const ImplantGeneralTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const displayFaqs = faqs.length > 0
    ? faqs
    : DEFAULT_FAQS_IMPLANT_GENERAL.map((f, i) => ({ id: i, treatment_slug: 'implant-general', question: f.q, answer: f.a, display_order: i } as FAQ))

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
        <div class="absolute inset-0" style="background:linear-gradient(95deg, rgba(20,14,8,0.96) 0%, rgba(20,14,8,0.92) 35%, rgba(26,18,10,0.7) 70%, rgba(26,18,10,0.55) 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 60%);"></div>
        <div class="blob" style="width:700px;height:700px;background:#c9a876;top:-20%;right:-15%;opacity:0.18;"></div>

        <div class="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div class="max-w-4xl fade-in">
            <div class="text-xs tracking-[0.4em] text-gold mb-8 font-bold">SIGNATURE TREATMENT · 02</div>
            <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
              <span class="block" style="color:#fdfbf7;">검증된 표준,</span>
              <span class="block italic" style="color:var(--gold); text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.6);">합리적 선택의</span>
              <span class="block" style="color:#fdfbf7;">임플란트.</span>
            </h1>
            <p class="t-lead mb-10 max-w-2xl" style="color:rgba(253,251,247,0.92); text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
              디지털 가이드 수술 + 4단계 무통마취 + 원내 디지털 기공실.<br/>
              과한 옵션 없이 핵심만 갖춘 표준 패키지로, 평생 가는 임플란트를 합리적으로 완성합니다.
            </p>

            <div class="flex flex-wrap gap-4 mb-16">
              <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <i class="fas fa-phone"></i>
                <span class="font-bold">053-357-0365 상담 예약</span>
              </a>
              <a href="#fixtures" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
                <span>픽스처 5종 비교</span>
                <i class="fas fa-arrow-down text-sm"></i>
              </a>
              <a href="/treatments/implant" class="btn-outline magnetic" style="border-color:var(--gold); color:var(--gold);">
                <i class="fas fa-bed"></i>
                <span>수면임플란트 보러가기</span>
              </a>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-ivory/15">
              {[
                { num: '5종', label: '픽스처 옵션' },
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
              <h2 class="whatis-headline">
                <span class="text-brown-900">임플란트</span><br/>
                <span class="t-gold">란?</span>
              </h2>
            </div>
            <div class="lg:col-span-8 fade-in space-y-6 text-brown-700 text-lg leading-relaxed">
              <p>
                <strong class="text-brown-900">임플란트(Dental Implant)</strong>는 상실된 자연치아의 자리에 인공 치근(픽스처)을
                식립하고, 그 위에 맞춤기둥(어버트먼트)과 지르코니아 크라운을 올려 <strong class="text-brown-900">제2의 자연치아</strong>를 완성하는 치료입니다.
              </p>
              <p>
                틀니·브릿지와 달리 옆 치아를 깎지 않으며, 자연치아와 가장 유사한 씹힘 강도(약 80~95%)를 제공합니다.
                대구365치과는 <strong class="text-brown-900">픽스처 + 맞춤기둥 + 지르코니아 크라운을 포함한 패키지 가격(100~180만원)</strong>으로
                추가 비용 없이 투명하게 운영합니다.
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
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>1~2개 단일·소수 임플란트가 필요하신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>틀니·브릿지 대신 자연치아에 가까운 회복을 원하시는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>합리적 비용·정찰제 패키지를 선호하시는 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>장기 보증과 평생 관리 시스템이 필요하신 분</span></li>
                <li class="flex gap-3"><i class="fas fa-circle text-gold text-[6px] mt-2.5"></i><span>디지털 가이드 수술로 정확한 식립을 원하시는 분</span></li>
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

          {/* 일반 임플란트 vs 수면임플란트 안내 박스 */}
          <div class="mt-10 bg-brown-950 text-ivory rounded-2xl p-8 lg:p-10 fade-in">
            <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div>
                <div class="text-[10px] tracking-[0.3em] text-gold mb-3 font-bold">COMPARE</div>
                <h3 class="display text-2xl lg:text-3xl font-black tracking-tight mb-3">치과 공포가 크거나 다수 식립이 필요하신가요?</h3>
                <p class="text-ivory/80 text-sm leading-relaxed max-w-2xl">
                  의식하 진정(IV Sedation) 하에 꿈결처럼 편안하게 받는 <strong class="text-gold">수면임플란트</strong> 페이지를 참고해 주세요.
                  치료의 본질은 동일하며, 마취 옵션만 추가됩니다 (+20~50만원).
                </p>
              </div>
              <a href="/treatments/implant" class="btn-primary btn-shine whitespace-nowrap" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
                <i class="fas fa-bed"></i>
                <span class="font-bold">수면임플란트 보기</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. WHY DAEGU365                              */}
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
              <span class="text-brown-900">5종</span> <span class="t-gold">픽스처 비교</span>
            </h2>
            <p class="t-lead max-w-3xl">
              표기 가격은 <strong class="text-brown-900">픽스처 + 맞춤기둥 + 지르코니아 크라운이 모두 포함된 패키지 가격(1개 기준)</strong>이며,
              <strong class="text-brown-900"> 픽스처 5년 · 상부보철 평생 보증</strong>이 적용됩니다.
              <span class="block mt-2 text-sm text-brown-600">※ 수면 진정(IV Sedation)을 추가하시는 경우 <strong class="text-brown-900">+20~50만원</strong>이 별도 적용됩니다.</span>
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
                    <span>수면 진정 (옵션)</span><span class="font-bold text-gold">20~50만원</span>
                  </li>
                </ul>
              </div>
              <a href="/fees" class="text-xs tracking-wider text-gold mt-6 inline-flex items-center gap-2 font-bold">
                전체 비용 안내 보기 <i class="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. BONE GRAFT                                */}
      {/* ========================================== */}
      <section class="py-24 bg-cream">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-5 fade-in">
              <div class="section-label mb-6">BONE GRAFT · 05</div>
              <h2 class="t-display mb-6">
                뼈가 부족해도{' '}
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
      {/* 6. PROCESS — 7단계                           */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-16 fade-in">
            <div class="section-label mb-6">PROCESS · 06</div>
            <h2 class="t-display mb-6">
              <span class="text-brown-900">7단계</span><br/>
              <span class="t-gold">치료 여정</span>
            </h2>
            <p class="t-lead max-w-3xl">상담부터 평생 관리까지, 모든 단계를 명확하게 안내합니다.</p>
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
                  <ul class="grid grid-cols-2 gap-2">
                    {p.detail.map((d: string) => (
                      <li class="flex gap-2 items-start text-xs text-brown-600">
                        <i class="fas fa-check text-gold text-[10px] mt-1"></i>
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
      {/* 7. COMPLICATIONS — 부작용·합병증 투명 안내   */}
      {/* ========================================== */}
      <section class="py-24 bg-brown-950 text-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-12 fade-in">
            <div class="section-label mb-6 text-gold">COMPLICATIONS · 07</div>
            <h2 class="t-display mb-6 text-ivory">
              부작용·합병증을<br/>
              <span class="t-gold">투명하게</span> 안내합니다
            </h2>
            <p class="text-ivory/80 text-base max-w-3xl">
              모든 수술에는 일정 위험이 따릅니다. 대구365치과는 발생 가능한 합병증과 그 예방·대처를 사전에 명확히 알려드립니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-5 fade-in-stagger">
            {COMPLICATIONS.map((c: any) => (
              <div class="bg-brown-900/60 rounded-2xl p-7 border border-ivory/10">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="display text-xl font-black text-ivory">{c.risk}</h3>
                  <div class="text-xs text-gold font-bold tracking-widest">{c.prob}</div>
                </div>
                <p class="text-ivory/75 text-sm leading-relaxed">{c.prevention}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. CARE GUIDE — 시술 전·후 관리              */}
      {/* ========================================== */}
      <section class="py-24 bg-cream">
        <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div class="mb-12 fade-in">
            <div class="section-label mb-6">CARE GUIDE · 08</div>
            <h2 class="t-display mb-6">
              시술 전·후<br/>
              <span class="t-gold">관리 가이드</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 fade-in-stagger">
            {[
              { title: '시술 전', icon: 'fa-clipboard-list', items: CARE_GUIDE.before, accent: 'border-brown-200' },
              { title: '시술 후 24시간', icon: 'fa-bandage', items: CARE_GUIDE.after_24h, accent: 'border-gold/60' },
              { title: '시술 후 1주일', icon: 'fa-calendar-week', items: CARE_GUIDE.after_week, accent: 'border-brown-200' },
              { title: '평생 관리', icon: 'fa-infinity', items: CARE_GUIDE.long_term, accent: 'border-brown-200' },
            ].map((g: any) => (
              <div class={`bg-ivory rounded-2xl p-6 border-2 ${g.accent}`}>
                <div class="w-12 h-12 rounded-xl bg-brown-950 text-gold flex items-center justify-center mb-4">
                  <i class={`fas ${g.icon}`}></i>
                </div>
                <h3 class="display text-lg font-black tracking-tight mb-4 text-brown-900">{g.title}</h3>
                <ul class="space-y-2.5">
                  {g.items.map((it: string) => (
                    <li class="flex gap-2 items-start text-xs text-brown-700 leading-relaxed">
                      <i class="fas fa-circle text-gold text-[5px] mt-1.5"></i>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 9. FAQ                                        */}
      {/* ========================================== */}
      <section class="py-24 bg-ivory">
        <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div class="mb-12 fade-in">
            <div class="section-label mb-6">FAQ · 09</div>
            <h2 class="t-display mb-6">
              <span class="text-brown-900">자주 묻는</span><br/>
              <span class="t-gold">질문</span>
            </h2>
          </div>
          <div class="space-y-3 fade-in">
            {displayFaqs.map((f: any) => (
              <details class="group bg-cream rounded-xl border border-brown-200/60 hover:border-gold/60 transition">
                <summary class="cursor-pointer list-none p-6 flex items-start justify-between gap-4">
                  <span class="font-bold text-brown-900 text-base lg:text-lg">{f.question}</span>
                  <i class="fas fa-plus text-gold text-sm mt-1.5 group-open:rotate-45 transition-transform duration-300"></i>
                </summary>
                <div class="px-6 pb-6 text-brown-700 text-sm leading-relaxed border-t border-brown-200/60 pt-4">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 10. CTA                                       */}
      {/* ========================================== */}
      <section class="py-24 lg:py-32 bg-brown-950 text-ivory text-center">
        <div class="max-w-3xl mx-auto px-6 lg:px-12">
          <div class="text-xs tracking-[0.4em] text-gold mb-6 font-bold">START YOUR JOURNEY</div>
          <h2 class="display text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            평생 가는 임플란트를<br/>
            <span class="italic text-gold">합리적으로</span> 시작하세요
          </h2>
          <p class="text-ivory/80 text-lg mb-10 leading-relaxed">
            패키지 100~180만원, 픽스처 5년·상부보철 평생 보증.<br/>
            지금 053-357-0365로 상담 예약하시면 정밀 진단부터 비용 안내까지 한 번에 받으실 수 있습니다.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
              <i class="fas fa-phone"></i>
              <span class="font-bold">053-357-0365 상담 예약</span>
            </a>
            <a href="/fees" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
              <span>전체 비용 안내 보기</span>
              <i class="fas fa-arrow-right text-sm"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ImplantGeneralTreatmentPage
