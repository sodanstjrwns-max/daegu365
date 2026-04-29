import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 보존치료 풀볼륨 v1
   - 자연치 보존 철학 / 레진·인레이·신경치료 통합
   ============================================================ */

const RESIN = [
  { name: '치경부', price: '7만원', desc: '잇몸 경계 마모·시린이 부위 충전.' },
  { name: '구치부 1면 (어금니)', price: '8만원', desc: '어금니 1면 충치. 가장 흔한 케이스.' },
  { name: '구치부 2면 이상', price: '10만원', desc: '어금니 2면 이상 광범위 충치.' },
  { name: '전치부 1면 (앞니)', price: '10만원', desc: '앞니 1면 변색·충치 심미 충전.' },
  { name: '전치부 2면 이상', price: '15만원', desc: '앞니 광범위 변색·파절 보존 충전.' },
  { name: '정중이개 1면당', price: '20만원', desc: '앞니 벌어짐 비삭제 보존 처치.' },
]

const PHILOSOPHY = [
  { icon: 'fa-shield-heart', title: '깎지 않는 보존', desc: '한 번 깎은 치아는 돌아오지 않습니다. 가능한 보존, 불가피할 때만 삭제.' },
  { icon: 'fa-microscope', title: '확대경·Q-ray', desc: '6배 확대 시야 + 형광 진단으로 충치 경계를 정확히 보고 깎습니다.' },
  { icon: 'fa-shield-virus', title: '러버댐 격리', desc: '치료 중 타액·세균 차단. 재감염률을 낮추는 표준 프로토콜.' },
  { icon: 'fa-syringe', title: '4단계 무통마취', desc: '바늘 통증부터 차단. 보존 시술 모두 기본 적용. 추가 비용 없음.' },
]

const DECISION = [
  { stage: 'C0~C1', name: '예방·레진 충전', desc: '자연치를 거의 그대로 유지. 1면 7~10만원.', tag: '보존', highlight: true },
  { stage: 'C2', name: '레진 / 인레이', desc: '범위에 따라 선택. 보존 vs 강도 균형.', tag: '경계' },
  { stage: 'C3', name: '신경치료 + 크라운', desc: '치수 침범 시 자연치를 살리는 마지막 기회.', tag: '집중' },
  { stage: 'C4', name: '발치 + 보철', desc: '뿌리만 남은 상태. 임플란트·브릿지 고려.', tag: '재건' },
]

const PROCESS = [
  { step: '01', name: '진단', desc: 'Q-ray + 확대경 + X-ray 3중 진단으로 충치 범위 정밀 측정.' },
  { step: '02', name: '러버댐 격리', desc: '시술 부위만 노출시켜 타액·세균 차단.' },
  { step: '03', name: '4단계 마취', desc: '가글 → 도포 → 무통마취기 → 본마취. 통증 최소화.' },
  { step: '04', name: '충치 제거', desc: '확대 시야로 충치 경계만 정밀 제거. 건강한 치질 보존.' },
  { step: '05', name: '레진 충전', desc: '자연치 색상 매칭 + 광중합. 즉시 일상 복귀.' },
  { step: '06', name: '연마·교합 점검', desc: '표면 광택 + 씹기 균형 정밀 조정.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '보존치료가 무엇인가요?', answer: '자연치를 최대한 살리는 모든 시술을 통칭합니다. 레진 충전·인레이·신경치료가 대표적이며, 발치 대신 자연치 유지가 목표입니다.', category: 'conservative', order: 1 },
  { id: '2', question: '레진과 인레이 어느 쪽이 좋나요?', answer: '충치 범위가 작으면 레진(직접 충전), 크면 인레이(간접 수복)가 강도·내구성 면에서 유리합니다. Q-ray·확대경 진단 후 결정.', category: 'conservative', order: 2 },
  { id: '3', question: '한 번 한 레진이 자꾸 떨어집니다.', answer: '러버댐 격리 없이 시술됐거나, 재발 우식·교합 과부하 가능성. 정확한 격리·접착 프로토콜로 재시술하면 장기 안정성 확보됩니다.', category: 'conservative', order: 3 },
  { id: '4', question: '아픈가요?', answer: '4단계 무통마취 기본 적용. 가글 → 도포 → 무통마취기 → 본마취 순으로 바늘 통증 차단. 추가 비용 없음.', category: 'conservative', order: 4 },
  { id: '5', question: '치료 시간은?', answer: '단순 레진 1회 30분 내. 다발성·신경치료 동반 시 회당 30~60분, 2~4회 분산.', category: 'conservative', order: 5 },
  { id: '6', question: '보험 적용되나요?', answer: '레진·신경치료·일부 인레이는 건강보험 적용. 심미·정중이개 처치 일부는 비급여. 자세한 내역은 상담 안내.', category: 'conservative', order: 6 },
  { id: '7', question: '치아가 시린데 충치인가요?', answer: '치경부 마모·잇몸 퇴축·초기 우식 가능성. Q-ray·확대경 진단으로 정확히 확인 후 보존 충전 가능합니다.', category: 'conservative', order: 7 },
  { id: '8', question: '얼마나 유지되나요?', answer: '레진은 평균 5~10년, 인레이는 10~15년. 6개월 정기 검진과 적절한 교합 관리로 평생 사용도 가능합니다.', category: 'conservative', order: 8 },
]

export const ConservativeTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-precision-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">CONSERVATIVE · 보존치료</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            가능한 한,<br/><span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">남깁니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            확대경 + Q-ray + 러버댐 + 4단계 무통.<br/>
            자연치를 살리는 가장 정확한 방법.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#decision" class="btn-outline-ivory">치료 분기 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">7만원~</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">레진 시작가</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">Q-ray</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">정밀 진단</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">러버댐</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">표준 격리 프로토콜</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 진료</div></div>
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">보존은,<br/><span class="t-gold italic">철학</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                보존치료는 단순한 “때우기”가 아닙니다. <strong class="t-gold">자연치를 최대한 살리는 모든 결정</strong>이에요. 한 번 깎은 치아는 돌아오지 않으니까요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                정확한 진단(Q-ray + 확대경 + X-ray)으로 “꼭 깎아야 할 부분”만 식별. 러버댐으로 격리하고 4단계 무통마취로 통증을 차단한 뒤, 확대 시야로 정밀하게 보존합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="decision" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">DECISION · 02</div><h2 class="t-display">단계별 <span class="t-gold italic">치료 분기.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DECISION.map((d) => (
              <div class={`p-7 rounded-xl ${d.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-ivory border border-brown-200'}`}>
                <div class={`text-2xl font-black mb-3 ${d.highlight ? 'text-gold' : 't-gold'}`}>{d.stage}</div>
                <div class={`text-xs uppercase tracking-wider mb-2 ${d.highlight ? 'text-gold' : 'text-brown-500'}`}>{d.tag}</div>
                <h3 class="t-display text-lg mb-3" style={d.highlight ? 'color:#fdfbf7;' : ''}>{d.name}</h3>
                <p class={`text-sm ${!d.highlight ? 'text-brown-700' : ''}`} style={d.highlight ? 'color:#fdfbf7;opacity:0.85;' : ''}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PHILOSOPHY · 03</div><h2 class="t-display">우리의 <span class="t-gold italic">원칙.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PHILOSOPHY.map((p) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${p.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{p.title}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">RESIN PRICES · 04</div><h2 class="t-display">레진 <span class="t-gold italic">가격표.</span></h2><p class="t-lead text-brown-700 mt-6 max-w-2xl mx-auto">정직한 가격, 무통마취 기본 포함. 신경치료·인레이는 별도 안내.</p></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESIN.map((r) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <h3 class="t-display text-lg mb-2">{r.name}</h3>
                <div class="t-gold text-3xl font-bold mb-3">{r.price}</div>
                <p class="text-sm text-brown-700">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PROCESS · 05</div><h2 class="t-display">시술 <span class="t-gold italic">6단계.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <div class="t-gold text-3xl font-black mb-3">{p.step}</div>
                <h3 class="t-display text-xl mb-2">{p.name}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 text-ivory relative overflow-hidden" style="background:var(--brown-950);">
        <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div class="section-label text-gold mb-6">COMBINED · 06</div>
          <h2 class="t-display mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            보존이 어려운 단계라면,<br/><span class="italic" style="color:#c9a876;">신경치료로 살립니다.</span>
          </h2>
          <p class="t-lead max-w-2xl mx-auto mb-10" style="color:#fdfbf7; opacity:0.9;">신경 침범(C3) 단계도 자연치를 살리는 마지막 기회. 러버댐·니켈티타늄·MTA 표준 프로토콜.</p>
          <a href="/treatments/cavity-endo-crown" class="btn-outline-ivory">충치·신경치료·크라운 자세히 <i class="fas fa-arrow-right ml-2"></i></a>
        </div>
      </section>

      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">DOCTORS · 07</div><h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2></div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((d) => (
                <a href={`/doctors/${d.id}`} class="block p-7 rounded-xl bg-cream border border-brown-200 hover:border-gold">
                  <div class="w-16 h-16 rounded-full bg-brown-950 text-gold flex items-center justify-center mb-5 text-2xl"><i class="fas fa-user-md"></i></div>
                  <h3 class="t-display text-xl mb-1">{d.name}</h3>
                  <div class="text-sm text-brown-500">{d.position || ''}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">FAQ · 08</div><h2 class="t-display">자주 묻는 질문</h2></div>
          <div class="space-y-3">
            {faqs.map((f) => (
              <details class="group p-6 rounded-xl bg-ivory border border-brown-200">
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

      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 09</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            남길 수 있다면,<br/><span class="italic" style="color:#c9a876;">남깁니다.</span>
          </h2>
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
