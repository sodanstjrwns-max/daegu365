import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 충치·신경치료·크라운 풀볼륨 상세 페이지 v1
   - 충치 단계별 분류 (C0~C4)
   - 보존 우선 철학
   - Q-ray 정밀 진단 연계
   ============================================================ */

const CARIES_STAGES = [
  {
    stage: 'C0',
    name: '초기 탈회',
    desc: '에나멜 표면 미세 탈회. 통증 없음. 불소·식이 관리로 재석회화 가능.',
    treat: '예방 관리',
    color: 'safe',
  },
  {
    stage: 'C1',
    name: '에나멜 우식',
    desc: '에나멜층에 국한된 충치. 통증 거의 없음. 작은 레진 충전으로 해결.',
    treat: '레진 충전',
    color: 'safe',
  },
  {
    stage: 'C2',
    name: '상아질 우식',
    desc: '상아질까지 진행. 시린 증상·찬 음식 통증. 신경 침범 전 단계.',
    treat: '레진/인레이',
    color: 'warning',
  },
  {
    stage: 'C3',
    name: '치수 침범',
    desc: '신경(치수)까지 도달. 지속적 통증·욱신거림·온수 자극. 신경치료 필요.',
    treat: '신경치료 + 크라운',
    color: 'danger',
    highlight: true,
  },
  {
    stage: 'C4',
    name: '치근 잔존',
    desc: '치아 머리가 거의 없는 상태. 발치 후 임플란트·브릿지 고려.',
    treat: '발치 + 보철',
    color: 'critical',
  },
]

const PHILOSOPHY = [
  {
    icon: 'fa-shield-heart',
    title: '내 치아가 가장 좋다',
    desc: '한 번 깎은 치아는 돌아오지 않습니다. 가능한 보존, 불가피할 때만 삭제—이것이 대구365치과의 보존 우선 원칙입니다.',
  },
  {
    icon: 'fa-microscope',
    title: '정확한 진단이 우선',
    desc: 'Q-ray 형광 진단·디지털 X-ray·확대경으로 “보이지 않는 충치”까지 발견. 과잉 진료 없이, 놓치지도 않습니다.',
  },
  {
    icon: 'fa-syringe',
    title: '4단계 무통마취 기본',
    desc: '바늘 통증부터 차단합니다. 추가 비용 없이 모든 충치 치료에 기본 적용.',
  },
  {
    icon: 'fa-tooth',
    title: '신경치료 ≠ 발치',
    desc: '신경치료는 자연치를 살리는 마지막 기회. 정밀 근관 치료 + 크라운 보호로 평생 사용 가능합니다.',
  },
]

const ENDO_PROCESS = [
  { step: '01', name: '진단·마취', desc: '치수 생활력 검사·X-ray로 신경 상태 확인. 4단계 무통마취 적용.' },
  { step: '02', name: '치수 제거', desc: '충치·감염된 신경 제거. 마이크로엔진으로 정밀하게.' },
  { step: '03', name: '근관 성형', desc: '근관 모양을 충전 가능한 형태로 다듬고 소독. 세균 완전 제거가 핵심.' },
  { step: '04', name: '근관 충전', desc: 'MTA·구타페르카로 빈 공간 밀봉. 재감염 차단.' },
  { step: '05', name: '코어·기둥', desc: '레진코어/포스트로 치아 뼈대 강화.' },
  { step: '06', name: '크라운 보호', desc: '신경치료 받은 치아는 약해집니다. 크라운으로 평생 보호.' },
]

const CROWN_MATERIALS = [
  {
    name: '지르코니아 크라운',
    price: '50만원',
    feature: '강도·심미 모두 우수. 어금니 1순위 추천.',
    pros: ['세라믹 중 최고 강도', '자연치 색상 재현', '금속 알레르기 없음'],
    highlight: true,
  },
  {
    name: 'PFM 크라운',
    price: '45만원',
    feature: '금속 위 도재. 강도 우수, 잇몸 라인 회색 노출 가능성.',
    pros: ['검증된 내구성', '광범위 적용 가능', '경제적 선택'],
  },
  {
    name: '하이브리드 인레이',
    price: '35만원',
    feature: '충치 부위만 부분 수복. 치아 보존 최대화.',
    pros: ['치질 삭제 최소화', '심미적 마무리', '구치부 적합'],
  },
]

const WHY_US = [
  {
    title: 'Q-ray 형광 진단',
    desc: '눈·X-ray로 안 보이는 초기 충치까지 형광 발색으로 가시화. 조기 발견 = 보존 가능성 ↑',
  },
  {
    title: '확대경 정밀 처치',
    desc: '루페·마이크로스코프로 6배 이상 확대 시야. 충치 경계를 정확히 보고 깎습니다.',
  },
  {
    title: '러버댐 격리',
    desc: '신경치료 시 러버댐으로 타액·세균 차단. 재감염률을 낮추는 표준 프로토콜.',
  },
  {
    title: '원내 디지털 기공실',
    desc: '크라운 색상·형태를 원내에서 즉시 조정. 외주 불일치를 없앤 정밀 보철.',
  },
  {
    title: 'MTA·니켈티타늄',
    desc: '최신 근관 재료로 재치료율 ↓. 한 번에 정확하게.',
  },
  {
    title: '4단계 무통마취',
    desc: '바늘 통증·압력 통증 모두 차단. 충치 치료 = 안 아픈 치료.',
  },
]

const DEFAULT_FAQS_CAVITY: FAQ[] = [
  { id: '1', question: '충치는 꼭 치료해야 하나요?', answer: 'C1 이상은 자연 치유되지 않습니다. 방치 시 신경까지 침범해 신경치료·발치로 이어집니다. 조기에 작은 레진으로 해결하는 것이 가장 경제적입니다.', category: 'cavity', order: 1 },
  { id: '2', question: '신경치료 받으면 치아가 죽는 건가요?', answer: '신경(치수)을 제거하므로 “생활력”은 잃지만, 뿌리·치아 자체는 보존됩니다. 크라운으로 보호하면 자연치처럼 평생 사용 가능합니다.', category: 'cavity', order: 2 },
  { id: '3', question: '레진과 인레이, 어느 쪽이 좋나요?', answer: '충치 크기에 따라 다릅니다. 작으면 레진(직접 충전), 크면 인레이(간접 수복)가 강도·내구성 면에서 유리합니다. Q-ray·확대경 진단 후 결정합니다.', category: 'cavity', order: 3 },
  { id: '4', question: '크라운은 꼭 해야 하나요?', answer: '신경치료 받은 치아는 영양 공급이 끊겨 약해집니다. 씹는 힘에 의해 깨지기 쉬우므로 크라운 보호가 필수입니다.', category: 'cavity', order: 4 },
  { id: '5', question: '치료 중 통증이 걱정됩니다.', answer: '4단계 무통마취가 모든 충치 치료에 기본 적용됩니다. 가글 → 도포 → 무통마취기 → 본마취 순으로 바늘 통증을 차단합니다. 추가 비용 없습니다.', category: 'cavity', order: 5 },
  { id: '6', question: '신경치료 후 다시 아프면 어떻게 하나요?', answer: '재감염이 의심되는 경우입니다. 디지털 X-ray·CT로 정확한 원인 파악 후 재치료(Re-Endo) 또는 치근단절제술을 고려합니다.', category: 'cavity', order: 6 },
  { id: '7', question: '한 번에 얼마나 걸리나요?', answer: '단순 레진은 1회 30분. 신경치료는 보통 2~4회(회당 30~60분). 크라운은 본뜨기 1회 + 장착 1회로 마무리됩니다.', category: 'cavity', order: 7 },
  { id: '8', question: '보험 적용되나요?', answer: '레진 충전·신경치료·PFM 크라운(어금니)은 건강보험 적용. 지르코니아·심미 크라운은 비급여입니다. 자세한 내역은 상담 시 안내드립니다.', category: 'cavity', order: 8 },
]

export const CavityTreatmentPage = ({
  treatment,
  doctors = [],
  cases = [],
  dict = [],
  faqs = DEFAULT_FAQS_CAVITY,
}: {
  treatment?: Treatment
  doctors?: Doctor[]
  cases?: BeforeAfter[]
  dict?: DictEntry[]
  faqs?: FAQ[]
}) => {
  return (
    <>
      <Navbar />

      {/* 1. HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-precision-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">CAVITY · ENDO · CROWN</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            한 번 깎은 치아는,<br/>
            돌아오지<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">않습니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            보존 우선 · 정밀 진단 · 무통 처치.<br/>
            내 치아가 가장 좋다는, 가장 단순한 진실.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#stages" class="btn-outline-ivory">충치 단계 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">5단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">C0~C4 정밀 분류</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">Q-ray</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">형광 충치 진단</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">4단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">무통마취 기본 적용</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 진료</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS — 충치란 */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">
                충치는,<br/><span class="t-gold italic">감염 질환</span>입니다.
              </h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                충치는 단순한 “구멍”이 아닙니다. 뮤탄스균이 만든 산이 치아 미네랄을 녹여 진행하는 <strong class="t-gold">감염성 진행 질환</strong>이에요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                초기에는 통증이 없습니다. 통증을 느낄 때는 이미 신경 가까이 도달한 상태. 그래서 “안 아프니까 괜찮다”는 가장 위험한 신호입니다. 정기 검진과 Q-ray 형광 진단으로 <strong>보이지 않는 단계</strong>에서 잡는 것이 핵심입니다.
              </p>
              <div class="grid sm:grid-cols-2 gap-4 pt-4">
                <div class="p-5 rounded-xl bg-cream border border-brown-200">
                  <div class="t-gold font-bold mb-1">조기 발견 = 레진</div>
                  <div class="text-sm text-brown-700">7만원 · 1회 30분 · 마취 최소</div>
                </div>
                <div class="p-5 rounded-xl bg-brown-950 text-ivory">
                  <div class="text-gold font-bold mb-1">방치 = 신경치료 + 크라운</div>
                  <div class="text-sm" style="opacity:0.85;">95만원~ · 4~6회 방문 · 마취 필수</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STAGES — C0~C4 */}
      <section id="stages" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">STAGES · 02</div>
            <h2 class="t-display">충치 5단계, <span class="t-gold italic">정확한 분류.</span></h2>
            <p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">
              단계마다 치료법이 다릅니다. 정확한 진단 없이 시작하지 않습니다.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CARIES_STAGES.map((s) => (
              <div class={`p-6 rounded-xl ${s.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-ivory border border-brown-200'}`}>
                <div class={`text-4xl font-black mb-3 ${s.highlight ? 'text-gold' : 't-gold'}`}>{s.stage}</div>
                <h3 class="t-display text-xl mb-3" style={s.highlight ? 'color:#fdfbf7;' : ''}>{s.name}</h3>
                <p class={`text-sm mb-4 ${!s.highlight ? 'text-brown-700' : ''}`} style={s.highlight ? 'color:#fdfbf7;opacity:0.85;' : ''}>{s.desc}</p>
                <div class={`text-xs uppercase tracking-wider pt-3 border-t ${s.highlight ? 'border-gold/30 text-gold' : 'border-brown-200 text-brown-500'}`}>
                  → {s.treat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PHILOSOPHY · 03</div>
            <h2 class="t-display">우리의 <span class="t-gold italic">원칙.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {PHILOSOPHY.map((p) => (
              <div class="p-8 lg:p-10 rounded-xl bg-cream border border-brown-200">
                <div class="w-14 h-14 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-6 text-xl">
                  <i class={`fas ${p.icon}`}></i>
                </div>
                <h3 class="t-display text-2xl mb-3">{p.title}</h3>
                <p class="text-brown-700 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ENDO PROCESS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">ENDO · 04</div>
            <h2 class="t-display">신경치료 <span class="t-gold italic">6단계.</span></h2>
            <p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">
              자연치를 살리는 마지막 기회. 한 번에 정확하게.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENDO_PROCESS.map((p) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="t-gold text-3xl font-black mb-3">{p.step}</div>
                <h3 class="t-display text-xl mb-2">{p.name}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CROWN MATERIALS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">CROWN · 05</div>
            <h2 class="t-display">크라운 <span class="t-gold italic">3종.</span></h2>
            <p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">
              치아 위치·기능·심미 요구에 따라 최적 재료를 선택합니다.
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {CROWN_MATERIALS.map((m) => (
              <div class={`p-8 rounded-xl ${m.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-cream border border-brown-200'}`}>
                {m.highlight && <div class="text-xs px-3 py-1 rounded-full bg-gold text-brown-950 font-bold inline-block mb-4">RECOMMENDED</div>}
                <h3 class="t-display text-2xl mb-3" style={m.highlight ? 'color:#fdfbf7;' : ''}>{m.name}</h3>
                <div class={`text-3xl font-bold mb-4 ${m.highlight ? 'text-gold' : 't-gold'}`}>{m.price}</div>
                <p class={`text-sm mb-5 ${!m.highlight ? 'text-brown-700' : ''}`} style={m.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''}>{m.feature}</p>
                <ul class="space-y-2">
                  {m.pros.map((pr) => (
                    <li class="flex items-start gap-2 text-sm">
                      <i class={`fas fa-check mt-1 ${m.highlight ? 'text-gold' : 't-gold'}`}></i>
                      <span style={m.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''} class={!m.highlight ? 'text-brown-700' : ''}>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY DAEGU365 */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 06</div>
            <h2 class="t-display">대구365치과의 <span class="t-gold italic">정확함.</span></h2>
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
                <a href={`/doctors/${d.id}`} class="block p-7 rounded-xl bg-cream border border-brown-200 hover:border-gold transition-colors">
                  <div class="w-16 h-16 rounded-full bg-brown-950 text-gold flex items-center justify-center mb-5 text-2xl">
                    <i class="fas fa-user-md"></i>
                  </div>
                  <h3 class="t-display text-xl mb-1">{d.name}</h3>
                  <div class="text-sm text-brown-500">{d.position || ''}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CASES */}
      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">CASES · 08</div>
              <h2 class="t-display">실제 <span class="t-gold italic">케이스.</span></h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.slice(0, 6).map((c) => (
                <a href={`/before-after/${c.id}`} class="block group">
                  <div class="aspect-[4/3] rounded-xl overflow-hidden bg-brown-950 mb-4 relative">
                    {c.before_image && <img src={c.before_image} alt={c.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform"/>}
                    <div class="absolute top-3 left-3 text-[10px] tracking-[0.25em] font-bold text-ivory bg-brown-950/80 px-3 py-1 rounded-full">CASE</div>
                  </div>
                  <h3 class="t-display text-base mb-1">{c.title}</h3>
                  {c.summary && <p class="text-sm text-brown-700 line-clamp-2">{c.summary}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">FAQ · 09</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
          <div class="space-y-3">
            {faqs.map((f) => (
              <details class="group p-6 rounded-xl bg-cream border border-brown-200">
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

      {/* 11. DICTIONARY */}
      {dict && dict.length > 0 && (
        <section class="py-20 bg-cream">
          <div class="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 class="t-display mb-8">관련 용어</h2>
            <div class="grid md:grid-cols-2 gap-4">
              {dict.slice(0, 6).map((d) => (
                <a href={`/dictionary/${d.slug}`} class="p-5 rounded-xl bg-ivory border border-brown-200 hover:border-gold">
                  <div class="t-display text-base mb-1">{d.term}</div>
                  <div class="text-sm text-brown-700 line-clamp-2">{d.definition}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 10</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            늦었다고요?<br/>
            <span class="italic" style="color:#c9a876;">지금이 가장 빠릅니다.</span>
          </h2>
          <p class="t-lead mb-10" style="color:#fdfbf7; opacity:0.9;">
            정확한 진단 · 보존 우선 · 무통 처치.
          </p>
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
