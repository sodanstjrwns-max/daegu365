import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 보철 (크라운 · 브릿지 · 인레이) 풀볼륨 v1
   ============================================================ */

const MATERIALS = [
  { name: '지르코니아 크라운', price: '50만원', desc: '세라믹 중 최고 강도. 어금니 1순위. 자연치 색상 재현.', highlight: true, tags: ['금속 X', '강도 ★★★★★', '심미 ★★★★★'] },
  { name: 'PFM 크라운', price: '45만원', desc: '금속 위 도재. 검증된 내구성, 잇몸 라인 회색 노출 가능.', tags: ['보험 가능', '강도 ★★★★', '심미 ★★★'] },
  { name: '하이브리드 인레이', price: '35만원', desc: '충치 부위만 부분 수복. 치아 보존 최대화.', tags: ['삭제 최소', '심미 우수', '구치부 적합'] },
  { name: '레진코어', price: '10만원', desc: '신경치료 후 치아 뼈대 강화용 코어.', tags: ['선행 처치', '강도 보강'] },
  { name: '포스트', price: '15만원', desc: '치아 뿌리 보강용 기둥. 캐스팅포스트 20만원.', tags: ['뿌리 보강', '심한 손상'] },
  { name: '임시치아', price: '10만원', desc: '본 치아 제작 기간 사용. 1치당.', tags: ['일시 사용', '본뜬 후'] },
]

const TYPES = [
  { icon: 'fa-crown', title: '크라운', desc: '치아 머리 전체를 덮는 보철. 신경치료 후·심한 충치·파절치에 적용.' },
  { icon: 'fa-link', title: '브릿지', desc: '인접 치아를 기둥으로 빠진 치아 자리 연결. 임플란트 대안.' },
  { icon: 'fa-square', title: '인레이·온레이', desc: '충치 부위만 정밀 제작·부착. 치질 삭제 최소화.' },
  { icon: 'fa-tooth', title: '라미네이트', desc: '앞니 표면 0.3mm 박편 부착. 심미 보철. (별도 페이지)' },
]

const PROCESS = [
  { step: '01', name: '진단·상담', desc: 'Q-ray·CT·확대경으로 치아 상태 평가. 재료별 장단점 안내.' },
  { step: '02', name: '본뜨기', desc: 'iTero 디지털 스캔으로 정밀 인상 채득. 분진·구역질 없음.' },
  { step: '03', name: '원내 제작', desc: 'In-house D.LAB에서 색상·교합·형태 정밀 조정. 외주 불일치 없음.' },
  { step: '04', name: '시적·조정', desc: '입에 맞춰 보고 교합·접촉점 정밀 조정. 환자 확인 필수.' },
  { step: '05', name: '최종 부착', desc: '레진 시멘트로 영구 접착. 치과 점검 1주 후.' },
  { step: '06', name: '유지 관리', desc: '6개월 정기 검진으로 마진·교합 모니터링. 평생 사용 목표.' },
]

const WHY_US = [
  { title: '원내 디지털 기공실', desc: 'In-house D.LAB으로 색상·형태를 즉시 조정. 외주 보철의 불일치를 제거.' },
  { title: 'iTero 디지털 스캔', desc: '5D 스캐너로 분진·구역질 없는 정밀 인상. 다중 재제작 방지.' },
  { title: 'CAD/CAM 제작', desc: '컴퓨터 설계·밀링으로 마진 정밀도 ↑. 누출률 ↓.' },
  { title: '교합 분석', desc: '디지털 교합기로 씹는 힘 분포 시각화. 보철 수명 ↑.' },
  { title: '심미 색상 매칭', desc: '인접 자연치와 색·투명도 정밀 매칭. 자연스러운 마무리.' },
  { title: '보증 시스템', desc: '재제작 보증으로 안심. 자세한 보증 조건은 상담 안내.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '크라운과 인레이 차이?', answer: '크라운은 치아 머리 전체를 덮습니다. 인레이는 충치 부위만 정밀 제작해 부착. 충치 크기·범위에 따라 결정합니다.', category: 'prosthetic', order: 1 },
  { id: '2', question: '지르코니아가 더 비싼 이유는?', answer: '세라믹 중 강도·심미·생체친화성이 모두 최상급이기 때문. 금속 알레르기·잇몸 회색 노출 우려가 없어 어금니부터 앞니까지 모두 적용 가능합니다.', category: 'prosthetic', order: 2 },
  { id: '3', question: '브릿지와 임플란트, 어느 쪽이 좋나요?', answer: '브릿지는 인접 치아를 깎습니다. 임플란트는 깎지 않고 독립적으로 심습니다. 인접 치아 상태가 좋다면 임플란트가 1순위.', category: 'prosthetic', order: 3 },
  { id: '4', question: '본뜨기 시 구역질이 걱정됩니다.', answer: 'iTero 5D 디지털 스캔으로 진행해 분진·구역질이 없습니다. 영상으로 즉시 확인 가능.', category: 'prosthetic', order: 4 },
  { id: '5', question: '얼마나 사용할 수 있나요?', answer: '재료·관리·교합에 따라 다릅니다. 평균 10~15년, 정기 검진으로 평생 사용도 가능합니다.', category: 'prosthetic', order: 5 },
  { id: '6', question: '제작 기간은?', answer: '평균 본뜨기 1회 + 부착 1회로 약 1주. 원내 기공실 활용 시 최단 당일도 가능합니다.', category: 'prosthetic', order: 6 },
  { id: '7', question: '보험 적용되나요?', answer: 'PFM 크라운(어금니)은 일부 적용. 지르코니아·심미 보철은 비급여입니다. 자세한 내역은 상담 안내.', category: 'prosthetic', order: 7 },
  { id: '8', question: '재치료가 필요한 경우는?', answer: '마진 누출·재발 우식·파절 시 재제작합니다. 정기 검진으로 조기 발견이 핵심.', category: 'prosthetic', order: 8 },
]

export const ProstheticTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-digital-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PROSTHETICS · 크라운·브릿지·인레이</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            잘 만든 보철은,<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">평생을 갑니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            원내 디지털 기공실 + iTero 5D 스캔.<br/>
            외주 불일치 없는 정밀 보철 시스템.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#materials" class="btn-outline-ivory">재료 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">In-house</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">원내 D.LAB 운영</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">iTero</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">5D 디지털 스캔</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">CAD/CAM</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">정밀 밀링 제작</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">35~50万</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">재료별 합리가</div></div>
          </div>
        </div>
      </section>


      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("prosthetic")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">보철은,<br/><span class="t-gold italic">치아의 옷</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                손상되거나 잃은 치아 부위를 인공 재료로 복원하는 시술이에요. <strong class="t-gold">기능·심미·내구성</strong>이 동시에 충족되어야 진짜 보철입니다.
              </p>
              <p class="text-brown-700 leading-relaxed">
                대구365치과는 본뜨기부터 제작까지 원내 디지털 기공실에서 직접 처리합니다. 외주 불일치를 없애고, 환자 입에서 직접 색상·형태를 조정해 마진 정밀도를 극대화합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">TYPES · 02</div><h2 class="t-display">보철 <span class="t-gold italic">4종.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TYPES.map((t) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${t.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{t.title}</h3>
                <p class="text-sm text-brown-700">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="materials" class="py-24 lg:py-32 bg-ivory scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">MATERIALS · 03</div><h2 class="t-display">재료 <span class="t-gold italic">6종.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MATERIALS.map((m) => (
              <div class={`p-7 rounded-xl ${m.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-cream border border-brown-200'}`}>
                {m.highlight && <div class="text-xs px-3 py-1 rounded-full bg-gold text-brown-950 font-bold inline-block mb-3">RECOMMENDED</div>}
                <h3 class="t-display text-xl mb-2" style={m.highlight ? 'color:#fdfbf7;' : ''}>{m.name}</h3>
                <div class={`text-2xl font-bold mb-3 ${m.highlight ? 'text-gold' : 't-gold'}`}>{m.price}</div>
                <p class={`text-sm mb-4 ${!m.highlight ? 'text-brown-700' : ''}`} style={m.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''}>{m.desc}</p>
                <div class="flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span class={`text-xs px-2 py-1 rounded-full ${m.highlight ? 'bg-brown-900/60 text-gold' : 'bg-brown-100 text-brown-700'}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PROCESS · 04</div><h2 class="t-display">제작 <span class="t-gold italic">6단계.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="t-gold text-3xl font-black mb-3">{p.step}</div>
                <h3 class="t-display text-xl mb-2">{p.name}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">WHY DAEGU365 · 05</div><h2 class="t-display">대구365치과의 <span class="t-gold italic">정밀함.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((w) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <h3 class="t-display text-xl mb-3">{w.title}</h3>
                <p class="text-brown-700 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 text-ivory relative overflow-hidden" style="background:var(--brown-950);">
        <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div class="section-label text-gold mb-6">COMBINED · 06</div>
          <h2 class="t-display mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            보철의 정확함은,<br/><span class="italic" style="color:#c9a876;">기공실에서 결정됩니다.</span>
          </h2>
          <p class="t-lead max-w-2xl mx-auto mb-10" style="color:#fdfbf7; opacity:0.9;">원내 디지털 기공실(D.LAB)에서 직접 제작·조정합니다. 외주 불일치 없는 정밀도.</p>
          <a href="/treatments/in-house-lab" class="btn-outline-ivory">디지털 기공실 자세히 <i class="fas fa-arrow-right ml-2"></i></a>
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

      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">CASES · 08</div><h2 class="t-display">실제 케이스</h2></div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.slice(0, 6).map((c) => (
                <a href={`/before-after/${c.id}`} class="block group">
                  <div class="aspect-[4/3] rounded-xl overflow-hidden bg-brown-950 mb-4 relative">
                    {c.before_image && <img src={c.before_image} alt={c.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform"/>}
                    <div class="absolute top-3 left-3 text-[10px] tracking-[0.25em] font-bold text-ivory bg-brown-950/80 px-3 py-1 rounded-full">CASE</div>
                  </div>
                  <h3 class="t-display text-base mb-1">{c.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">FAQ · 09</div><h2 class="t-display">자주 묻는 질문</h2></div>
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

      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 10</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            정확한 보철의 시작,<br/><span class="italic" style="color:#c9a876;">상담입니다.</span>
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
