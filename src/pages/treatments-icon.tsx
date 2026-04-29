import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

/* ============================================================
   대구365치과 · 아이콘 레진 (ICON Resin) 풀볼륨 상세 페이지 v1
   - 반점치(white spot) 비삭제 침투 레진
   - DMG ICON 시스템
   ============================================================ */

const INDICATIONS = [
  { icon: 'fa-tooth', title: '반점치 (White Spot)', desc: '교정 후 남은 흰 반점, 불소 과다 섭취로 생긴 백색 변색.' },
  { icon: 'fa-heart-pulse', title: '초기 우식 (C0~C1)', desc: '에나멜에 국한된 초기 충치. 깎지 않고 침투 레진으로 차단.' },
  { icon: 'fa-baby', title: '소아 변색', desc: '유치·영구치 초기 변색. 비삭제로 처치해 자연치 보존.' },
  { icon: 'fa-graduation-cap', title: '교정 후 케어', desc: '교정 장치 제거 후 드러난 탈회 부위. 교정 마무리의 표준 단계.' },
]

const VS_RESIN = [
  {
    item: '일반 레진 충전',
    points: ['치아 삭제 필요', '국소마취 동반', '경계선 변색 가능성', '재료 vs 자연치 경계 보임'],
  },
  {
    item: '아이콘 레진',
    points: ['삭제 0% · 침투형', '마취 불필요', '에나멜 내부 침투 차단', '자연치와 일체화'],
    highlight: true,
  },
]

const PROCESS = [
  { step: '01', name: '진단·상태 평가', desc: 'Q-ray·확대경으로 변색 깊이 측정. 적응증 판별.' },
  { step: '02', name: '치아 격리', desc: '러버댐으로 시술 부위 완전 격리. 타액 차단.' },
  { step: '03', name: '에칭 (HCl 15%)', desc: '변색 표면을 화학적으로 개방. 침투 경로 확보.' },
  { step: '04', name: '건조 (에탄올)', desc: '수분 완전 제거. 침투 환경 조성.' },
  { step: '05', name: '아이콘 침투', desc: '저점도 레진이 모세관 현상으로 미세 결손부 침투.' },
  { step: '06', name: '광중합·연마', desc: '광원으로 경화. 표면 연마로 마무리. 즉시 일상 복귀.' },
]

const WHY_US = [
  { title: 'DMG ICON 정품', desc: '독일 DMG社 정품 시스템. 검증된 침투력과 안정성.' },
  { title: '확대경 정밀 시술', desc: '6배 이상 확대 시야로 변색 경계까지 정확히 침투.' },
  { title: '교정 마무리 케어', desc: '인비절라인·클리피씨 교정 환자에게 통합 패키지 적용.' },
  { title: '비삭제 보존 원칙', desc: '한 번 깎은 치아는 돌아오지 않습니다. 깎지 않는 선택지.' },
  { title: '소아 친화 시술', desc: '마취·삭제 없이 진행. 소아 협조도 높음.' },
  { title: '비용 합리성', desc: '25만원부터 시작. 추가 1회당 5만원으로 다발성 케이스도 부담 적음.' },
]

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', question: '반점치가 뭔가요?', answer: '치아에 흰 반점이 보이는 상태. 교정 후 칫솔질 미흡, 불소 과다, 초기 우식이 원인입니다. 치아 표면 미네랄이 빠진 “탈회” 상태에서 발생합니다.', category: 'icon', order: 1 },
  { id: '2', question: '치아를 정말 안 깎나요?', answer: '네. 아이콘 레진은 비삭제(no-prep) 침투형 레진입니다. 화학 에칭 후 모세관 현상으로 에나멜 안에 스며드는 방식이라 삭제가 필요 없어요.', category: 'icon', order: 2 },
  { id: '3', question: '효과가 영구적인가요?', answer: '에나멜 내부에 결합된 침투 레진은 일반적으로 반영구적입니다. 다만 표면 마모·식이 습관에 따라 부분 보강이 필요할 수 있습니다.', category: 'icon', order: 3 },
  { id: '4', question: '미백과 어떻게 다른가요?', answer: '미백은 “전체 톤”을 밝힙니다. 아이콘은 “부분 흰 반점”을 자연치 톤과 맞추는 시술. 둘은 보완적이며 함께 진행하기도 합니다.', category: 'icon', order: 4 },
  { id: '5', question: '한 번에 끝나나요?', answer: '대부분 1회 60~90분에 마무리됩니다. 변색이 깊은 경우 2회로 분산해 단계적으로 침투시킵니다.', category: 'icon', order: 5 },
  { id: '6', question: '비용은?', answer: '아이콘 레진(반점치) 25만원부터, 추가 1회당 5만원. 다발성 케이스는 사전 상담으로 정확한 견적 안내드립니다.', category: 'icon', order: 6 },
  { id: '7', question: '아픈가요?', answer: '치아 삭제·신경 침범이 없어 통증이 거의 없습니다. 마취 불필요. 소아도 협조 가능한 수준입니다.', category: 'icon', order: 7 },
  { id: '8', question: '교정 끝난 직후 받을 수 있나요?', answer: '네, 교정 장치 제거 직후가 가장 좋은 타이밍입니다. 탈회 부위가 더 진행되기 전에 차단할 수 있어요.', category: 'icon', order: 8 },
]

export const IconTreatmentPage = ({
  treatment, doctors = [], cases = [], dict = [], faqs = DEFAULT_FAQS,
}: { treatment?: Treatment; doctors?: Doctor[]; cases?: BeforeAfter[]; dict?: DictEntry[]; faqs?: FAQ[] }) => {
  return (
    <>
      <Navbar />

      {/* 1. HERO */}
      <section class="relative bg-brown-950 text-ivory pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-precision-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(20,14,8,0.96) 0%,rgba(20,14,8,0.85) 35%,rgba(20,14,8,0.55) 100%);"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div class="section-label text-gold mb-6">ICON RESIN · 아이콘 침투 레진</div>
          <h1 class="display font-black tracking-tight leading-[0.95] mb-10" style="font-size:clamp(3rem, 8vw, 7.5rem); color:#fdfbf7; text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);">
            깎지 않고,<br/>
            반점만<br/>
            <span class="italic" style="color:#c9a876; text-shadow: 0 4px 24px rgba(201,168,118,0.3), 0 1px 3px rgba(0,0,0,0.8);">지웁니다.</span>
          </h1>
          <p class="t-lead text-xl lg:text-2xl max-w-2xl mb-12" style="color:#fdfbf7; opacity:0.92; text-shadow:0 2px 12px rgba(0,0,0,0.6);">
            DMG ICON · 독일 정품 침투형 레진.<br/>
            교정 후 흰 반점, 마취·삭제 없이 한 번에.
          </p>
          <div class="flex flex-wrap gap-4 mb-16">
            <a href="tel:053-357-0365" class="btn-primary"><i class="fas fa-phone"></i> 053-357-0365</a>
            <a href="#process" class="btn-outline-ivory">시술 단계 보기 <i class="fas fa-arrow-right ml-2"></i></a>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t" style="border-color:rgba(253,251,247,0.2);">
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">25만원~</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">반점치 시작가</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">0%</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">치아 삭제율</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">60분</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">평균 시술 시간</div></div>
            <div><div class="t-gold text-4xl lg:text-5xl font-bold mb-1">DMG</div><div class="text-sm" style="color:#fdfbf7;opacity:0.7;">독일 정품 시스템</div></div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-4">
              <div class="section-label mb-6">WHAT IS · 01</div>
              <h2 class="t-display">아이콘은,<br/><span class="t-gold italic">스며드는 레진</span>입니다.</h2>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <p class="t-lead text-brown-700">
                일반 레진은 “충전”입니다. 충치 부위를 깎고 채웁니다. 아이콘은 다릅니다. <strong class="t-gold">에나멜 내부의 미세 결손부에 스며들어</strong> 변색·초기 우식을 차단해요.
              </p>
              <p class="text-brown-700 leading-relaxed">
                치아를 깎지 않으니 마취가 필요 없고, 시술 후에도 자연치 그대로입니다. 교정 후 흰 반점, 초기 충치, 소아 변색에 가장 효과적인 비삭제 옵션이에요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDICATIONS */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">INDICATIONS · 02</div>
            <h2 class="t-display">언제 <span class="t-gold italic">필요한가.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDICATIONS.map((i) => (
              <div class="p-7 rounded-xl bg-ivory border border-brown-200">
                <div class="w-12 h-12 rounded-2xl bg-brown-950 text-gold flex items-center justify-center mb-4 text-lg">
                  <i class={`fas ${i.icon}`}></i>
                </div>
                <h3 class="t-display text-lg mb-2">{i.title}</h3>
                <p class="text-sm text-brown-700">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VS RESIN */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">COMPARE · 03</div>
            <h2 class="t-display">일반 레진 vs <span class="t-gold italic">아이콘.</span></h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VS_RESIN.map((v) => (
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

      {/* 5. PROCESS */}
      <section id="process" class="py-24 lg:py-32 bg-cream scroll-mt-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">PROCESS · 04</div>
            <h2 class="t-display">시술 <span class="t-gold italic">6단계.</span></h2>
          </div>
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

      {/* 6. WHY US */}
      <section class="py-24 lg:py-32 bg-ivory">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">WHY DAEGU365 · 05</div>
            <h2 class="t-display">대구365치과의 <span class="t-gold italic">디테일.</span></h2>
          </div>
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

      {/* 7. DOCTORS */}
      {doctors && doctors.length > 0 && (
        <section class="py-24 lg:py-32 bg-cream">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">DOCTORS · 06</div>
              <h2 class="t-display">담당 <span class="t-gold italic">의료진.</span></h2>
            </div>
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

      {/* 8. CASES */}
      {cases && cases.length > 0 && (
        <section class="py-24 lg:py-32 bg-ivory">
          <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="text-center mb-16">
              <div class="section-label mb-6">CASES · 07</div>
              <h2 class="t-display">실제 케이스</h2>
            </div>
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

      {/* 9. FAQ */}
      <section class="py-24 lg:py-32 bg-cream">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-16">
            <div class="section-label mb-6">FAQ · 08</div>
            <h2 class="t-display">자주 묻는 질문</h2>
          </div>
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

      {/* 10. CTA */}
      <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
        <div class="absolute inset-0 opacity-15" style="background-image:url('/r2/images/clinic/care-luxury-room.jpg?v=1');background-size:cover;background-position:center;"></div>
        <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
          <div class="section-label text-gold mb-6">CONTACT · 09</div>
          <h2 class="t-display text-4xl lg:text-6xl mb-6" style="color:#fdfbf7; text-shadow:0 2px 12px rgba(0,0,0,0.4);">
            교정 끝난 그 자리,<br/>
            <span class="italic" style="color:#c9a876;">반점이 보이시나요?</span>
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
