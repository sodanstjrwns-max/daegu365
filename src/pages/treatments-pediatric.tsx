import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 소아치과 풀볼륨 상세 페이지 v1
   - 첫 치과 경험 설계 (치과공포증 예방)
   - 수가표 기반 가격: 유치레진 6~10만, SS크라운 15만, 지르코니아 20만
     실란트 5만, 불소바니쉬 3만, 웃음가스 2만, 공간유지 20~40만
   - 4단계 무통마취 + 수면치료 결합 가능 강조
   ============================================================ */

const FIRST_VISIT = [
  {
    step: '01',
    title: '편안한 첫 인사',
    desc: '치과복 대신 평상복으로, 진료 의자에 눕히지 않고 앉아서 시작합니다. “장비 만져보기”부터.',
    icon: 'fa-hand-wave',
  },
  {
    step: '02',
    title: 'TSD 기법 (Tell-Show-Do)',
    desc: '말로 알려주고 → 보여주고 → 그제서야 시행. 어떤 도구도 “몰래” 사용하지 않습니다.',
    icon: 'fa-eye',
  },
  {
    step: '03',
    title: '구강 점검 + 사진',
    desc: '거울로 함께 보는 시간. “여기 까만 점이 있네?” 아이가 “자기 입”을 알게 됩니다.',
    icon: 'fa-camera',
  },
  {
    step: '04',
    title: '불소·실란트 (선택)',
    desc: '협조도가 좋으면 첫 방문에 예방 처치까지. 안 되면 다음 방문으로 미루는 “여유”.',
    icon: 'fa-shield-heart',
  },
  {
    step: '05',
    title: '칭찬 의식',
    desc: '시술 끝났다고 끝이 아닙니다. 작은 보상·스티커로 “치과 = 좋은 곳” 기억을 만듭니다.',
    icon: 'fa-star',
  },
]

const TREATMENTS = [
  {
    name: '유치 레진 (충치 치료)',
    price: '6~10만원',
    desc: '면 수에 따라 1면 6만 / 2면 8만 / 3면 10만. 영구치 레진 동일가.',
    icon: 'fa-tooth',
  },
  {
    name: 'SS 크라운 (유구치)',
    price: '15만원',
    desc: '광범위 충치로 레진이 어려운 유구치에 적용하는 기성 크라운.',
    icon: 'fa-crown',
  },
  {
    name: '지르코니아 크라운 (유전치)',
    price: '20만원',
    desc: '심미가 중요한 유전치(앞니)에 적용하는 흰색 기성 크라운.',
    icon: 'fa-gem',
  },
  {
    name: '실란트 (홈메우기)',
    price: '5만원',
    desc: '어금니 씹는면 깊은 홈을 미리 메워 충치 예방. 보험진료 시 보험적용.',
    note: '보험적용',
    icon: 'fa-shield',
  },
  {
    name: '불소바니쉬',
    price: '3만원',
    desc: '치아 표면에 고농도 불소를 도포해 초기 충치 진행 차단·예방. 보험적용 가능.',
    note: '보험적용',
    icon: 'fa-droplet',
  },
  {
    name: '웃음가스 (N2O)',
    price: '2만원',
    desc: '아산화질소 흡입으로 가벼운 진정. 주사 공포가 있는 어린이의 협조 보조 수단.',
    note: '보험적용',
    icon: 'fa-wind',
  },
  {
    name: '공간유지장치',
    price: '20~40만원',
    desc: '유치를 일찍 잃은 자리를 영구치가 맹출할 때까지 지켜줍니다.',
    icon: 'fa-arrows-up-down-left-right',
  },
  {
    name: '근관치료 (소아)',
    price: '상담가',
    desc: '유치·영구치의 신경치료. 케이스에 따라 의료진이 적합한 방식 결정.',
    icon: 'fa-bolt',
  },
]

const COOPERATION_LEVELS = [
  {
    level: 'LEVEL 1',
    title: '잘 협조하는 어린이',
    desc: '말로 설명하면 따라옵니다. TSD 기법 + 4단계 무통마취로 일반 진료 가능.',
    method: ['TSD 기법', '4단계 무통마취', '단계별 칭찬'],
    color: 'green',
  },
  {
    level: 'LEVEL 2',
    title: '약간 두려워하는 어린이',
    desc: '협조하려 하지만 두려움이 큰 경우. 웃음가스(N2O)로 가벼운 진정 보조.',
    method: ['웃음가스 N2O', '4단계 무통마취', '부모 동반 진료'],
    color: 'gold',
  },
  {
    level: 'LEVEL 3',
    title: '협조가 어려운 어린이',
    desc: '광범위 충치·발치·외상 등 시술 자체가 어려운 경우. 의식하 진정(수면치료) 결합.',
    method: ['수면치료 (의식하 진정)', '4단계 무통마취', '4지표 모니터링'],
    color: 'brown',
  },
]

const PARENT_TIPS = [
  {
    do: '“치과 = 이 닦는 곳”으로 일상화',
    dont: '“말 안 들으면 치과 가서 주사 맞을 거야” 협박 절대 금지',
  },
  {
    do: '첫 방문은 치료가 아닌 검진으로',
    dont: '갑자기 통증이 있을 때 첫 방문 → 공포 각인',
  },
  {
    do: '집에서 “치과 놀이” 미리 해보기',
    dont: '“하나도 안 아파” 거짓말 → 신뢰 무너짐',
  },
  {
    do: '시술 후 작은 보상으로 마무리',
    dont: '“잘했어?” 대신 “울었어?” 묻는 것',
  },
  {
    do: '6개월 1회 정기 검진',
    dont: '“충치 없으니까” 미루기 → 예방 골든타임 놓침',
  },
]

const WHY_US = [
  {
    icon: 'fa-shield-heart',
    title: '“첫 치과”의 기억을 설계합니다',
    desc: '치과공포증 의사가 만든 시스템. 첫 방문은 치료가 아니라 “편안함의 기억”을 만드는 시간입니다.',
  },
  {
    icon: 'fa-layer-group',
    title: '협조도 3단계 맞춤 진료',
    desc: 'TSD → 웃음가스 → 의식하 진정까지. 아이의 협조도에 맞춰 단계별로 옵션을 제공합니다.',
  },
  {
    icon: 'fa-syringe',
    title: '4단계 무통마취 기본 적용',
    desc: '어른보다 더 무통마취가 중요합니다. 가글→도포→무통기→본마취까지 어린이에게도 추가 비용 없이 표준 적용.',
  },
  {
    icon: 'fa-route',
    title: '평생 관리 로드맵',
    desc: '예방치과 → 소아 교정장치 → 1차 교정 → 영구치 → 2차 교정까지. 한 곳에서 평생 동행합니다.',
  },
]

const DEFAULT_FAQS = [
  {
    q: '아이의 첫 치과 방문은 언제가 좋은가요?',
    a: '첫 유치(보통 생후 6~12개월)가 나오면 1년 이내, 늦어도 만 1세에 첫 방문을 권장합니다. 첫 방문은 치료가 아니라 “치과에 익숙해지는 시간”으로 활용해주세요. 만 7세에는 1차 교정 검진을 위해 한 번 더 방문해주세요.',
  },
  {
    q: '아이가 치과를 너무 무서워해서 진료 자체가 어려워요.',
    a: '대구365치과는 협조도 3단계 맞춤 시스템을 운영합니다. (1) 잘 협조: TSD + 4단계 무통마취 (2) 약간 두려움: 웃음가스(N2O) 보조 (3) 협조 어려움: 의식하 진정(수면치료) 결합. 어떤 단계든 아이 속도에 맞춰 진행합니다. 부모님과 상담 후 함께 결정합니다.',
  },
  {
    q: '유치는 어차피 빠질 텐데 꼭 치료해야 하나요?',
    a: '반드시 치료해야 합니다. 유치 충치를 방치하면 (1) 통증으로 식사·수면 어려움 (2) 영구치 자리 어긋남으로 부정교합 (3) 영구치 자체에 충치 영향 등이 생깁니다. 유치는 “자리지킴이” 역할을 하며, 영구치 건강의 기초입니다.',
  },
  {
    q: '실란트와 불소바니쉬는 꼭 해야 하나요?',
    a: '강력히 권장합니다. 실란트는 어금니 씹는면 깊은 홈을 미리 메워 충치를 “물리적으로 차단”하고, 불소바니쉬는 치아 전체에 고농도 불소를 발라 초기 충치 진행을 막습니다. 두 처치 모두 보험적용이 가능하며, 6개월~1년 1회 권장합니다.',
  },
  {
    q: '아이가 충치가 너무 많은데 한 번에 끝낼 방법이 있나요?',
    a: '의식하 진정(수면치료)을 통해 한 번의 방문에 모든 치료를 완료할 수 있습니다. 협조가 어려운 어린이의 다수 충치·발치·외상 치료에 자주 적용되며, 환자분(아이)은 시술 시간을 통째로 기억하지 못합니다. 사전 전신 건강 평가가 필수입니다.',
  },
  {
    q: '비용은 어느 정도 예상해야 하나요?',
    a: '유치 레진 6~10만원(면 수), SS 크라운 15만원, 지르코니아 크라운(앞니) 20만원, 실란트 5만원(보험적용 가능), 불소바니쉬 3만원(보험적용 가능), 웃음가스 2만원(보험적용 가능). 공간유지장치는 20~40만원입니다. 정기 검진은 무료 상담입니다.',
  },
]

export const PediatricTreatmentPage = ({
  treatment, faqs, doctors, cases, dictTerms,
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[],
}) => {
  const finalFaqs = faqs && faqs.length > 0 ? faqs
    : DEFAULT_FAQS.map((f, i) => ({ id: i, treatment_slug: 'pediatric', question: f.q, answer: f.a, display_order: i } as FAQ))

  return (
    <>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="absolute top-1/2 left-[20%] w-[500px] h-[500px] -translate-y-1/2 rounded-full" style="background:radial-gradient(circle,rgba(20,14,8,0.4) 0%,transparent 70%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PEDIATRIC · 소아치과</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            아이의 첫 치과,<br/>
            평생을 결정하는<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">한 번의 경험.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            치과공포증을 가졌던 의사가 설계한 어린이 진료.<br/>
            첫 방문은 치료가 아닌, “편안함의 기억”을 만드는 시간.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#first-visit" class="btn-outline-ivory">첫 방문 동선 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">3단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">협조도 맞춤 시스템</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">+ 4단계</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">무통마취 기본 적용</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">웃음가스</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">N2O 진정 보조</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 진료</div></div>
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
                첫 치과는<br/>
                <span class="t-gold italic">“기억의 설계”입니다.</span>
              </h2>
            </div>
            <div class="lg:col-span-7 space-y-6 t-body text-lg">
              <p>
                대부분의 치과공포증은 <b>어린 시절 첫 치과 방문에서 시작</b>됩니다. 갑자기 통증이 있어 끌려간 첫 방문, 영문도 모르고 누워서 받은 시술, 도구 소리, 차가운 진료실 — 그 한 번의 기억이 평생을 갑니다.
              </p>
              <p>
                대구365치과의 소아치과는 <b>“오늘 충치 하나를 더 잡느냐”</b>가 아니라 <b>“이 아이가 평생 치과를 어떻게 기억할 것인가”</b>를 우선합니다. 협조도가 부족하면 다음 방문으로 미루는 여유를, 협조가 잘 되면 적극적인 예방 처치를.
              </p>
              <p>
                대표원장 본인이 <b>치과 진료실 문 앞에서 돌아섰던 어린 시절</b>이 있기에, 어떤 두려움이 평생을 좌우하는지 가장 잘 압니다. 그 기억을 다음 세대에는 물려주지 않겠다는 다짐이 소아치과의 출발점입니다.
              </p>
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
              치과공포증 의사가<br/>
              <span class="t-gold italic">설계한 어린이 진료.</span>
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

      {/* 4. FIRST VISIT */}
      <section id="first-visit" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">FIRST VISIT · 04</div>
            <h2 class="t-display mb-6">
              첫 방문 5단계 동선,<br/>
              <span class="t-gold italic">치료보다 기억을.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto text-brown-700">
              치과 의자에 눕히는 것부터가 아닙니다. “편안함의 기억”을 만드는 5단계.
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {FIRST_VISIT.map((s: any) => (
              <div class="bg-cream p-6 rounded-xl border-t-4 border-gold">
                <div class="t-gold display text-3xl font-bold mb-3">{s.step}</div>
                <i class={`fas ${s.icon} text-gold text-xl mb-3`}></i>
                <h3 class="t-display text-base mb-2">{s.title}</h3>
                <p class="t-body text-xs text-brown-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COOPERATION LEVELS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">COOPERATION · 05</div>
            <h2 class="t-display">
              아이마다 다른 협조도,<br/>
              <span class="t-gold italic">3단계 맞춤 시스템.</span>
            </h2>
            <p class="t-lead max-w-2xl mx-auto mt-4 text-brown-700">
              모든 아이를 같은 방식으로 진료할 수 없습니다. 협조도에 맞춰 단계별로.
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {COOPERATION_LEVELS.map((l: any) => (
              <div class="bg-ivory p-8 rounded-xl border-l-4 border-gold flex flex-col">
                <div class="text-xs text-gold uppercase tracking-wider mb-2 font-bold">{l.level}</div>
                <h3 class="t-display text-xl mb-3">{l.title}</h3>
                <p class="t-body text-sm text-brown-700 mb-5 flex-1">{l.desc}</p>
                <div class="pt-4 border-t border-brown-200">
                  <div class="text-xs text-brown-500 uppercase tracking-wider mb-2">METHOD</div>
                  <ul class="space-y-1">
                    {l.method.map((m: string) => (
                      <li class="flex items-start gap-2 text-sm text-brown-700">
                        <i class="fas fa-check text-gold mt-1 text-xs"></i><span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TREATMENTS */}
      <section id="treatments" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">TREATMENTS · 06</div>
            <h2 class="t-display mb-6">
              소아치과<br/>
              <span class="t-gold italic">진료 항목 & 비용.</span>
            </h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TREATMENTS.map((t: any) => (
              <div class="bg-cream p-6 rounded-xl flex flex-col">
                <i class={`fas ${t.icon} text-gold text-2xl mb-3`}></i>
                <h3 class="t-display text-base mb-2">{t.name}</h3>
                <div class="t-gold text-xl font-bold display mb-2">{t.price}</div>
                {t.note && <div class="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold inline-block self-start mb-3">{t.note}</div>}
                <p class="t-body text-xs text-brown-700">{t.desc}</p>
              </div>
            ))}
          </div>
          <div class="mt-12 text-center">
            <a href="/fees" class="text-sm text-gold underline">전체 수가 안내 보기 →</a>
          </div>
        </div>
      </section>

      {/* 7. PARENT TIPS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-6xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PARENT TIPS · 07</div>
            <h2 class="t-display">
              부모님께 드리는<br/>
              <span class="t-gold italic">5가지 약속.</span>
            </h2>
          </div>
          <div class="space-y-4">
            {PARENT_TIPS.map((t: any, i: number) => (
              <div class="grid md:grid-cols-2 gap-4 bg-ivory p-6 rounded-xl">
                <div class="flex items-start gap-3 p-4 rounded-lg" style="background:rgba(201,168,118,0.08);">
                  <div class="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-gold text-sm"></i></div>
                  <div>
                    <div class="text-xs text-gold uppercase tracking-wider mb-1 font-bold">DO</div>
                    <div class="t-body text-sm">{t.do}</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-lg" style="background:rgba(120,90,70,0.05);">
                  <div class="w-8 h-8 rounded-full bg-brown-200 flex items-center justify-center flex-shrink-0"><i class="fas fa-xmark text-brown-700 text-sm"></i></div>
                  <div>
                    <div class="text-xs text-brown-500 uppercase tracking-wider mb-1 font-bold">DON'T</div>
                    <div class="t-body text-sm text-brown-700">{t.dont}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RELATED — 수면치료 결합 */}
      <section class="py-24 relative text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div class="section-label text-gold mb-6">COMBINED · 08</div>
          <h2 class="t-display mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            협조가 어려운 아이에겐,<br/>
            <span class="italic" style="color:#c9a876;">수면치료를 권합니다.</span>
          </h2>
          <p class="t-lead max-w-2xl mx-auto mb-10" style="color:#fdfbf7; opacity:0.9;">
            다수 충치·발치·외상 등 협조가 어려운 케이스는 의식하 진정(수면치료)으로 한 번에 해결할 수 있습니다.
          </p>
          <a href="/treatments/sleep-therapy" class="btn-outline-ivory">수면치료 시스템 자세히 보기 <i class="fas fa-arrow-right ml-2"></i></a>
        </div>
      </section>

      {/* 9. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 09</div>
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
                <div class="px-6 lg:px-8 pb-6 lg:pb-8 t-body text-brown-700 leading-relaxed">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-10" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 11</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            그 두려움,<br/>
            <span class="italic" style="color:#c9a876;">다음 세대에는 물려주지 않겠습니다.</span>
          </h2>
          <p class="t-lead text-lg lg:text-xl mb-10" style="color:#fdfbf7; opacity:0.9;">
            첫 방문은 무료 상담입니다. 치료보다 기억을 먼저.
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
