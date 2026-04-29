import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 원내 디지털 기공실 (In-house D.LAB) 풀볼륨 v1
   ============================================================ */

const ADVANTAGES = [
  { icon: 'fa-clock', title: '제작 기간 단축', desc: '외주 왕복 시간 제거. 본뜨기 → 부착까지 최단 당일도 가능.' },
  { icon: 'fa-bullseye', title: '입에서 직접 조정', desc: '환자 입에서 즉시 색상·형태·교합을 미세 조정. 재제작 최소화.' },
  { icon: 'fa-eye', title: '색상 정밀 매칭', desc: '인접 자연치를 보면서 실시간 색상 결정. 외주의 “사진 매칭” 한계 극복.' },
  { icon: 'fa-shield-halved', title: '품질 통제', desc: '재료·공정 전체를 원내에서 관리. 외주 불일치·누락 차단.' },
]

const VS = [
  {
    item: '외주 기공소',
    points: ['왕복 3~7일 소요', '사진·인상으로만 매칭', '교합 조정 한계', '재제작 시 추가 시간'],
  },
  {
    item: '원내 D.LAB',
    points: ['최단 당일 제작 가능', '환자 입에서 직접 조정', '실시간 교합 분석', '즉시 재제작·미세 조정'],
    highlight: true,
  },
]

const EQUIPMENT = [
  { icon: 'fa-print', title: '치과용 3D 프린터', desc: '모형·임시치아·서지컬 가이드 출력. 시간당 정밀 적층.' },
  { icon: 'fa-microchip', title: 'CAD 설계 시스템', desc: 'exocad 등 정밀 설계 소프트웨어로 보철물 디자인.' },
  { icon: 'fa-cog', title: 'CNC 밀링 머신', desc: '지르코니아·세라믹 블록을 컴퓨터 제어로 정밀 가공.' },
  { icon: 'fa-fire', title: '신터링 퍼니스', desc: '지르코니아 소결로. 강도·심미를 동시에 완성하는 마무리 공정.' },
  { icon: 'fa-camera', title: 'iTero 5D 스캐너', desc: '환자 구강을 분진·구역질 없이 디지털 인상 채득.' },
  { icon: 'fa-palette', title: '쉐이드 매칭 시스템', desc: 'VITA 색상 분석. 인접 자연치에 정밀 일치.' },
]

const SERVICES = [
  { title: '크라운·인레이', desc: '지르코니아·PFM·하이브리드 인레이 정밀 제작.' },
  { title: '라미네이트', desc: '0.3mm 박편 보철. VINIQUE 프리미엄 라미네이트 원내 제작.' },
  { title: '임플란트 보철', desc: '커스텀 어버트먼트·맞춤형 임플란트 크라운.' },
  { title: '서지컬 가이드', desc: '임플란트 수술용 정밀 가이드 즉시 출력.' },
  { title: '임시치아', desc: '본 치아 제작 기간용 정밀 임시치아 당일 제작.' },
  { title: '나이트가드', desc: '이갈이·턱관절 보호 장치 맞춤 제작.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '원내 기공실이 왜 더 좋나요?', answer: '환자 입에서 직접 색상·교합을 조정할 수 있어 외주 불일치를 제거합니다. 또한 왕복 시간이 없어 제작 기간이 단축됩니다.', category: 'in-house-lab', order: 1 },
  { id: '2', question: '기공사가 상주하나요?', answer: '네. 원내 디지털 기공실(D.LAB)에 전담 인력이 상주하며 즉시 대응합니다.', category: 'in-house-lab', order: 2 },
  { id: '3', question: '제작 기간이 정말 줄어드나요?', answer: '평균 외주 1주 → 원내 1~3일. 단순 보철은 당일 제작도 가능합니다. 케이스 복잡도에 따라 차이.', category: 'in-house-lab', order: 3 },
  { id: '4', question: '비용이 더 비싼가요?', answer: '아니요. 동일 가격 또는 더 합리적입니다. 외주 마진을 줄여 환자 부담을 낮춥니다.', category: 'in-house-lab', order: 4 },
  { id: '5', question: '재제작이 필요할 때는?', answer: '원내에서 즉시 재제작합니다. 추가 방문·대기 없이 당일 해결 가능한 케이스가 많습니다.', category: 'in-house-lab', order: 5 },
  { id: '6', question: '어떤 보철까지 가능한가요?', answer: '크라운·인레이·라미네이트·임플란트 보철·서지컬 가이드·나이트가드 등 대부분의 디지털 보철을 원내에서 처리합니다.', category: 'in-house-lab', order: 6 },
  { id: '7', question: '품질이 외주보다 떨어지지 않나요?', answer: '오히려 우수합니다. 환자 입에서 직접 미세 조정 가능, 즉각 피드백 반영. 외주의 정보 손실을 제거합니다.', category: 'in-house-lab', order: 7 },
  { id: '8', question: '원내 기공실 견학 가능한가요?', answer: '예약 시 일부 시간대에 안내 가능합니다. 데스크에 문의해 주세요.', category: 'in-house-lab', order: 8 },
]

export const InhouseLabPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-digital-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">IN-HOUSE D.LAB · 원내 디지털 기공실</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            보철의 정밀함은,<br/><span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">기공실에서 결정됩니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            iTero 5D + CAD/CAM + 3D 프린터 + 신터링.<br/>
            본뜨기부터 부착까지 한 공간에서.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#equipment" class="btn-outline-ivory">장비 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">D.LAB</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">원내 디지털 랩</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">당일</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">최단 제작 기간</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">CAD/CAM</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">디지털 정밀 제작</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">상주</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">전담 기공 인력</div></div>
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">기공실은,<br/><span class="t-gold italic">보이지 않는 손</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                보철의 품질은 <strong class="t-gold">기공실의 정밀도</strong>에서 결정됩니다. 아무리 잘 본을 떠도 기공실에서 색·형태·교합이 어긋나면 환자 입에서 어색해지죠.
              </p>
              <p class="text-brown-700 leading-relaxed">
                대구365치과는 원내 디지털 기공실 D.LAB을 운영합니다. 환자 입에서 즉시 조정 가능한 거리, 외주 왕복이 없는 속도, 외주 마진을 제거한 합리성. 이 셋을 모두 갖추는 유일한 방법입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">ADVANTAGES · 02</div><h2 class="t-display">4가지 <span class="t-gold italic">강점.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${a.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{a.title}</h3>
                <p class="text-sm text-brown-700">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">COMPARE · 03</div><h2 class="t-display">외주 vs <span class="t-gold italic">원내.</span></h2></div>
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VS.map((v) => (
              <div class={`p-8 lg:p-10 rounded-xl ${v.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-cream border border-brown-200'}`}>
                <div class={`text-xs uppercase tracking-wider mb-4 ${v.highlight ? 'text-gold' : 'text-brown-500'}`}>{v.highlight ? 'OUR STANDARD' : 'GENERAL'}</div>
                <h3 class="t-display text-2xl mb-6" style={v.highlight ? 'color:#fdfbf7;' : ''}>{v.item}</h3>
                <ul class="space-y-3">
                  {v.points.map((pt) => (
                    <li class="flex items-start gap-3">
                      <i class={`fas ${v.highlight ? 'fa-check text-gold' : 'fa-minus text-brown-400'} mt-1`}></i>
                      <span style={v.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''} class={!v.highlight ? 'text-brown-700' : ''}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">EQUIPMENT · 04</div><h2 class="t-display">D.LAB <span class="t-gold italic">장비.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPMENT.map((e) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${e.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{e.title}</h3>
                <p class="text-sm text-brown-700">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">SERVICES · 05</div><h2 class="t-display">제작 <span class="t-gold italic">범위.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div class="p-7 rounded-xl bg-cream border border-brown-200">
                <h3 class="t-display text-xl mb-3">{s.title}</h3>
                <p class="text-brown-700 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">DOCTORS · 06</div><h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2></div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((d) => (
                <a href={`/doctors/${d.id}`} class="block p-7 rounded-xl bg-ivory border border-brown-200 hover:border-gold">
                  <div class="w-16 h-16 rounded-full bg-brown-950 text-gold flex items-center justify-center mb-5 text-2xl"><i class="fas fa-user-md"></i></div>
                  <h3 class="t-display text-xl mb-1">{d.name}</h3>
                  <div class="text-sm text-brown-500">{d.position || ''}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">FAQ · 07</div><h2 class="t-display">자주 묻는 질문</h2></div>
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
          <div class="section-label text-gold mb-6">CONTACT · 08</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            한 공간에서,<br/><span class="italic" style="color:#c9a876;">한 번에.</span>
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
