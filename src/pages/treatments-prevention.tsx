import { Navbar, Footer, TldrBox } from '../components/Layout'
import { tldrFor } from '../lib/tldr-data'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 예방치과 풀볼륨 v1
   ============================================================ */

const PROGRAMS = [
  { icon: 'fa-spray-can-sparkles', title: '에어플로우 (GBT)', desc: 'EMS 스위스 정품 8단계 프로토콜. 바이오필름 정밀 제거.' },
  { icon: 'fa-droplet', title: '불소 도포', desc: '치아 표면 미네랄 강화. 초기 탈회 차단. 소아·성인 모두 적용.' },
  { icon: 'fa-shield-virus', title: '실란트 (홈메우기)', desc: '어금니 깊은 홈을 메워 충치 진입 차단. 보험 적용.' },
  { icon: 'fa-microscope', title: 'Q-ray 정량 진단', desc: '방사선 0의 형광 진단. 보이지 않는 초기 우식까지 발견.' },
  { icon: 'fa-toothbrush', title: '구강 위생 코칭', desc: '시각화된 플라크를 직접 보며 칫솔질 사각지대 교정.' },
  { icon: 'fa-calendar-check', title: '맞춤 리콜 시스템', desc: '개인 위험도별 3·6·12개월 자동 알림. 평생 관리.' },
]

const RECALL = [
  { period: '3개월', target: '치주 환자·임플란트 보유자', desc: '주기적 GBT + 치주낭 측정. 재발 차단.', highlight: true },
  { period: '6개월', target: '평균 위험군 (대부분)', desc: 'Q-ray 검진 + 스케일링·GBT. 일반적 표준.' },
  { period: '12개월', target: '저위험·관리 우수자', desc: '연 1회 정밀 검진. 최소 개입 유지.' },
]

const VS = [
  { item: '치료 중심 진료', points: ['증상 발생 후 방문', '큰 비용·시간 부담', '치아 삭제 동반', '재발률 ↑'] },
  { item: '예방 중심 진료', points: ['정기 추적·조기 발견', '저비용·소요 최소', '비삭제 처치 가능', '재발률 ↓'], highlight: true },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '예방치과가 왜 중요한가요?', answer: '치아는 한 번 손상되면 완전 회복되지 않습니다. 예방으로 “손상 자체를 막는 것”이 가장 경제적이며 평생 자연치 보존에 필수입니다.', category: 'prevention', order: 1 },
  { id: '2', question: '얼마나 자주 가야 하나요?', answer: '평균 6개월 1회. 치주 환자·임플란트 보유자는 3개월. 위험 요소 적은 분은 12개월 가능. 개인 맞춤 리콜로 자동 안내드립니다.', category: 'prevention', order: 2 },
  { id: '3', question: '스케일링과 GBT 차이는?', answer: '스케일링은 단단한 치석 제거 중심. GBT(에어플로우)는 바이오필름까지 손상 없이 씻어냄. GBT가 차세대 표준입니다.', category: 'prevention', order: 3 },
  { id: '4', question: '실란트는 모든 어금니에?', answer: '주로 6세·12세 영구 어금니에 적용. 깊은 홈이 있는 성인 어금니에도 가능합니다. 보험 적용 시술.', category: 'prevention', order: 4 },
  { id: '5', question: '불소 도포 안전한가요?', answer: '의료기관에서 사용하는 농도와 횟수 내에서 안전합니다. 소아·성인 모두 검증된 표준 시술.', category: 'prevention', order: 5 },
  { id: '6', question: '집에서 어떻게 관리?', answer: '하루 3회 칫솔질(2분 이상) + 치간칫솔/치실 매일 1회 + 6개월 정기 검진. 이 셋이 평생 자연치를 만듭니다.', category: 'prevention', order: 6 },
  { id: '7', question: '리콜 알림이 자동인가요?', answer: '네. 개인별 위험도에 따라 3·6·12개월 주기로 자동 안내드립니다. 카카오·문자 알림 운영.', category: 'prevention', order: 7 },
  { id: '8', question: '비용은?', answer: '보험 스케일링은 연 1회 적용. GBT·불소·실란트 일부는 별도. 자세한 견적은 상담 시 안내드립니다.', category: 'prevention', order: 8 },
]

export const PreventionTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-precision-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">PREVENTION · 예방치과</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            가장 좋은 치료는,<br/><span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">치료가 없는 것.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            GBT + Q-ray + 맞춤 리콜.<br/>
            평생 자연치를 만드는 365일 관리 시스템.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#programs" class="btn-outline-ivory">예방 프로그램 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">GBT</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">에어플로우 8단계</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">Q-ray</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">방사선 0 진단</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">3·6·12</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">맞춤 리콜 주기</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">365日</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">연중무휴 운영</div></div>
          </div>
        </div>
      </section>


      {/* 1.5 TL;DR — AEO 핵심 요약 (LLM 인용 직격) */}
      {(() => {
        const _tldr = tldrFor("prevention")
        return _tldr ? <TldrBox summary={_tldr.summary} bullets={_tldr.bullets} cta={_tldr.cta} label={_tldr.label} /> : null
      })()}

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">예방은,<br/><span class="t-gold italic">치료보다 큰 의료</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                치과는 “아플 때 가는 곳”이 아닙니다. <strong class="t-gold">아프기 전에 가는 곳</strong>이에요. 통증이 시작된 시점에는 이미 충치·치주염이 진행된 상태.
              </p>
              <p class="text-brown-700 leading-relaxed">
                대구365치과는 GBT 에어플로우, Q-ray 형광 진단, 개인 맞춤 리콜을 통합한 예방 시스템을 운영합니다. 평생 자연치를 만드는 가장 빠른 길은 “정기적으로 오는 것”입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">PROGRAMS · 02</div><h2 class="t-display">예방 <span class="t-gold italic">6프로그램.</span></h2></div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg"><i class={`fas ${p.icon}`}></i></div>
                <h3 class="t-display text-lg mb-2">{p.title}</h3>
                <p class="text-sm text-brown-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">RECALL · 03</div><h2 class="t-display">맞춤 <span class="t-gold italic">리콜.</span></h2></div>
          <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {RECALL.map((r) => (
              <div class={`p-8 rounded-xl ${r.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-cream border border-brown-200'}`}>
                <div class={`text-4xl font-black mb-4 ${r.highlight ? 'text-gold' : 't-gold'}`}>{r.period}</div>
                <div class={`text-xs uppercase tracking-wider mb-3 ${r.highlight ? 'text-gold' : 'text-brown-500'}`}>{r.target}</div>
                <p class={`text-sm ${!r.highlight ? 'text-brown-700' : ''}`} style={r.highlight ? 'color:#fdfbf7;opacity:0.9;' : ''}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16"><div class="section-label mb-6">COMPARE · 04</div><h2 class="t-display">치료 vs <span class="t-gold italic">예방.</span></h2></div>
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VS.map((v) => (
              <div class={`p-8 lg:p-10 rounded-xl ${v.highlight ? 'bg-brown-950 text-ivory border-2 border-gold' : 'bg-ivory border border-brown-200'}`}>
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

      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16"><div class="section-label mb-6">DOCTORS · 05</div><h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2></div>
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
          <div class="text-center mb-16"><div class="section-label mb-6">FAQ · 06</div><h2 class="t-display">자주 묻는 질문</h2></div>
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
          <div class="section-label text-gold mb-6">CONTACT · 07</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            아프기 전에,<br/><span class="italic" style="color:#c9a876;">365일 곁에.</span>
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
