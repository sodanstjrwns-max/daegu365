import { Navbar, Footer } from '../components/Layout'
import type { Treatment, FAQ, Doctor, BeforeAfter, DictEntry } from '../lib/types'

export const TreatmentsListPage = ({ treatments }: { treatments: Treatment[] }) => {
  const core = treatments.filter(t => t.is_core)
  const others = treatments.filter(t => !t.is_core)

  return (
    <>
      <Navbar />
      <section class="pt-20 pb-16 bg-cream">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <div class="section-label mb-6">ALL TREATMENTS</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">
            당신의 모든 치과 고민,<br/><em class="italic text-brown-700">한 곳에서</em>
          </h1>
        </div>
      </section>

      <section class="py-24 max-w-7xl mx-auto px-6">
        <div class="mb-20 fade-in">
          <div class="section-label mb-6">SIGNATURE</div>
          <h2 class="section-title mb-12">핵심 진료 <em class="italic text-brown-700">3가지</em></h2>
          <div class="grid md:grid-cols-3 gap-6">
            {core.map(t => (
              <a href={`/treatments/${t.slug}`} class="group lux-card">
                <div class="text-xs tracking-[0.3em] text-brown-400 mb-6">SIGNATURE</div>
                <div class="display text-4xl font-light mb-4">{t.name}</div>
                <p class="display italic text-brown-600 mb-8">{t.tagline}</p>
                <p class="text-brown-700 text-sm leading-relaxed">{t.short_desc}</p>
                <div class="mt-8 text-sm flex items-center gap-2 text-brown-800">
                  자세히 보기 <i class="fas fa-arrow-right text-xs"></i>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div class="fade-in">
          <div class="section-label mb-6">OTHERS</div>
          <h2 class="section-title mb-12">전체 진료 과목</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map(t => (
              <a href={`/treatments/${t.slug}`} class="group flex items-center justify-between p-6 rounded-2xl border border-brown-200 hover:border-brown-700 hover:bg-brown-50 transition">
                <div>
                  <div class="display text-xl font-medium">{t.name}</div>
                  <div class="text-sm text-brown-600 mt-1">{t.tagline}</div>
                </div>
                <i class="fas fa-arrow-right text-brown-400 group-hover:text-brown-700 group-hover:translate-x-1 transition"></i>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export const TreatmentDetailPage = ({
  treatment, faqs, doctors, cases, dictTerms
}: {
  treatment: Treatment, faqs: FAQ[], doctors: Doctor[],
  cases: BeforeAfter[], dictTerms: DictEntry[]
}) => {
  const isCore = !!treatment.is_core
  const icons: Record<string, string> = {
    implant: 'fa-bed', lamineer: 'fa-smile-beam', ortho: 'fa-grin-alt',
    prosthetics: 'fa-crown', endo: 'fa-syringe', periodontics: 'fa-leaf',
    pediatric: 'fa-child', preventive: 'fa-shield-alt', whitening: 'fa-sun',
    aesthetic: 'fa-star', conservative: 'fa-tooth', general: 'fa-stethoscope'
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section class={`${isCore ? 'py-32' : 'py-24'} ${isCore ? 'bg-brown-950 text-ivory' : 'bg-cream'} relative overflow-hidden`}>
        {isCore && <div class="blob" style="width:600px;height:600px;background:#c9a876;top:-20%;right:-10%;opacity:0.25;"></div>}
        <div class="max-w-7xl mx-auto px-6 relative">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-7 fade-in">
              {isCore && <div class="text-xs tracking-[0.4em] text-gold mb-6">SIGNATURE TREATMENT</div>}
              {!isCore && <div class="section-label mb-6">TREATMENT</div>}
              <h1 class={`display ${isCore ? 'text-6xl md:text-8xl' : 'text-5xl md:text-6xl'} font-light leading-[1] mb-8`}>
                {treatment.name}
              </h1>
              <p class={`display italic text-2xl ${isCore ? 'text-gold' : 'text-brown-700'} mb-8`}>
                {treatment.tagline}
              </p>
              <p class={`${isCore ? 'text-brown-200' : 'text-brown-700'} text-lg leading-relaxed max-w-xl`}>
                {treatment.short_desc}
              </p>
              <div class="mt-10 flex flex-wrap gap-4">
                <a href="tel:053-357-0365" class="btn-primary magnetic">
                  <i class="fas fa-phone"></i> 상담 예약
                </a>
                <a href={`/before-after?treatment=${treatment.slug}`} class={isCore ? 'btn-outline magnetic' : 'btn-outline magnetic'} style={isCore ? 'border-color:#fdfbf7;color:#fdfbf7' : ''}>
                  치료 사례 보기
                </a>
              </div>
            </div>
            <div class="md:col-span-5 fade-in">
              <div class="aspect-square rounded-full placeholder-img flex items-center justify-center text-7xl" style={isCore ? 'background:linear-gradient(135deg,#6b4c2a,#2c1f14);color:#c9a876;' : ''}>
                <i class={`fas ${icons[treatment.slug] || 'fa-tooth'}`}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS (for core) */}
      {isCore && (
        <>
          <section class="py-24 max-w-5xl mx-auto px-6">
            <div class="fade-in">
              <div class="section-label mb-6">WHAT IS</div>
              <h2 class="section-title mb-10">
                {treatment.name}이란?
              </h2>
              <div class="prose-dental text-brown-700 text-lg">
                <p>
                  {treatment.slug === 'implant' && (
                    <>수면임플란트는 의식하 진정(IV sedation) 하에 진행하는 임플란트 시술로, 치과공포증이나 장시간 수술이 어려운 환자분들에게 특히 적합합니다. 시술 중 환자분은 꿈결처럼 편안하시며, 수술이 끝나면 가볍게 깨어나십니다.</>
                  )}
                  {treatment.slug === 'lamineer' && (
                    <>라미네이트는 치아 앞면에 얇은 세라믹 박막을 붙여 치아의 모양·색·배열을 자연스럽게 개선하는 심미 보철입니다. 최소 삭제(0.3~0.7mm) 프로토콜과 무삭제 라미네이트 옵션을 모두 제공합니다.</>
                  )}
                  {treatment.slug === 'ortho' && (
                    <>인비절라인은 투명한 플라스틱 장치(얼라이너)를 사용해 치아를 단계별로 이동시키는 첨단 교정 시스템입니다. 탈부착이 가능해 식사·양치가 편리하고, 심미성도 뛰어납니다.</>
                  )}
                </p>
              </div>
            </div>
          </section>

          <section class="py-24 bg-cream">
            <div class="max-w-7xl mx-auto px-6">
              <div class="section-label mb-6 fade-in">WHY US</div>
              <h2 class="section-title mb-16 fade-in">
                <em class="italic text-brown-700">대구365치과</em>에서 하면<br/>무엇이 다른가
              </h2>
              <div class="grid md:grid-cols-3 gap-6">
                {treatment.slug === 'implant' && [
                  { title: '의식하 진정 마취', desc: '전문 마취 모니터링 하에 안전하게 진행합니다.' },
                  { title: '디지털 가이드', desc: 'CT 기반 3D 가이드로 정확도를 극대화합니다.' },
                  { title: '협진 시스템', desc: '치주·보존 협진으로 장기 성공률을 높입니다.' },
                ].map((f: any) => (
                  <div class="lux-card fade-in">
                    <div class="w-12 h-12 rounded-full bg-brown-800 text-gold flex items-center justify-center mb-6">
                      <i class="fas fa-check"></i>
                    </div>
                    <h3 class="display text-2xl font-medium mb-3">{f.title}</h3>
                    <p class="text-brown-700">{f.desc}</p>
                  </div>
                ))}
                {treatment.slug === 'lamineer' && [
                  { title: '최소 삭제 프로토콜', desc: '치아를 최대한 보존하며 자연스러움을 구현합니다.' },
                  { title: '디지털 시뮬레이션', desc: '시술 전 디자인을 미리 확인하실 수 있습니다.' },
                  { title: '프리미엄 재료', desc: 'e.max · 지르코니아 등 최고급 세라믹 사용.' },
                ].map((f: any) => (
                  <div class="lux-card fade-in">
                    <div class="w-12 h-12 rounded-full bg-brown-800 text-gold flex items-center justify-center mb-6">
                      <i class="fas fa-check"></i>
                    </div>
                    <h3 class="display text-2xl font-medium mb-3">{f.title}</h3>
                    <p class="text-brown-700">{f.desc}</p>
                  </div>
                ))}
                {treatment.slug === 'ortho' && [
                  { title: '인비절라인 공인 교정의', desc: '풍부한 임상 경험을 갖춘 교정의가 상주합니다.' },
                  { title: '디지털 진단', desc: '3D 스캔·클린체크로 정밀하게 설계합니다.' },
                  { title: '맞춤형 설계', desc: '환자 라이프스타일에 맞춘 치료 계획을 수립합니다.' },
                ].map((f: any) => (
                  <div class="lux-card fade-in">
                    <div class="w-12 h-12 rounded-full bg-brown-800 text-gold flex items-center justify-center mb-6">
                      <i class="fas fa-check"></i>
                    </div>
                    <h3 class="display text-2xl font-medium mb-3">{f.title}</h3>
                    <p class="text-brown-700">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section class="py-24 max-w-5xl mx-auto px-6">
            <div class="section-label mb-6 fade-in">PROCESS</div>
            <h2 class="section-title mb-16 fade-in">진행 과정</h2>
            <div class="space-y-6">
              {[
                { num: '01', title: '상담 및 정밀 검사', desc: '파노라마·CT·구강 스캔으로 상태를 파악합니다.' },
                { num: '02', title: '치료 계획 수립', desc: '환자의 상황에 맞춘 맞춤 플랜을 제안합니다.' },
                { num: '03', title: '시술', desc: '단계별 무통마취 프로토콜로 편안하게 진행합니다.' },
                { num: '04', title: '사후 관리', desc: '정기 검진과 리콜 시스템으로 장기 관리합니다.' },
              ].map((step: any) => (
                <div class="fade-in flex gap-8 p-6 rounded-2xl hover:bg-cream transition">
                  <div class="text-5xl display font-light text-gold flex-shrink-0">{step.num}</div>
                  <div>
                    <h3 class="display text-2xl font-medium mb-2">{step.title}</h3>
                    <p class="text-brown-700 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* NON-CORE CONTENT (moderately detailed) */}
      {!isCore && (
        <section class="py-20 max-w-5xl mx-auto px-6">
          <div class="fade-in prose-dental text-brown-700 text-lg">
            <h2>{treatment.name}에 대해</h2>
            <p>{treatment.short_desc}. 대구365치과는 분야별 협진 시스템을 통해 완성도 높은 {treatment.name} 치료를 제공합니다.</p>
            <h3>대구365치과의 {treatment.name}</h3>
            <ul>
              <li>정확한 진단을 위한 디지털 검사 시스템 활용</li>
              <li>단계별 무통마취로 편안한 진료 경험</li>
              <li>보존·치주 전문 협진으로 완성도 있는 치료</li>
              <li>정기 리콜 시스템을 통한 장기 관리</li>
            </ul>
            <h3>담당 의료진</h3>
            <p>아래 의료진이 {treatment.name}을(를) 담당합니다.</p>
          </div>
        </section>
      )}

      {/* DOCTORS */}
      {doctors.length > 0 && (
        <section class="py-24 bg-cream">
          <div class="max-w-7xl mx-auto px-6">
            <div class="section-label mb-6 fade-in">OUR TEAM</div>
            <h2 class="section-title mb-12 fade-in">담당 의료진</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map(d => (
                <a href={`/doctors/${d.slug}`} class="group fade-in">
                  <div class="aspect-[3/4] placeholder-img rounded-2xl mb-4 group-hover:shadow-lux transition">
                    <i class="fas fa-user-md"></i>
                  </div>
                  <div class="text-xs tracking-[0.3em] text-brown-500 mb-1">{d.is_representative ? '대표원장' : d.position}</div>
                  <div class="display text-2xl font-medium">{d.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASES */}
      {cases.length > 0 && (
        <section class="py-24 max-w-7xl mx-auto px-6">
          <div class="flex justify-between items-end mb-12 fade-in">
            <div>
              <div class="section-label mb-6">CASES</div>
              <h2 class="section-title">치료 사례</h2>
            </div>
            <a href={`/before-after?treatment=${treatment.slug}`} class="link-underline display italic">전체 보기 →</a>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {cases.slice(0, 3).map(ba => (
              <a href={`/before-after/${ba.id}`} class="fade-in lux-card p-0 overflow-hidden">
                <div class="aspect-[4/3] placeholder-img"><i class="fas fa-images"></i></div>
                <div class="p-6">
                  <div class="flex gap-2 mb-3">
                    <span class="tag tag-brown">{ba.age_group}</span>
                    <span class="tag tag-brown">{ba.treatment_period}</span>
                  </div>
                  <div class="display text-lg font-medium">{ba.title}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section class="py-24 bg-cream">
          <div class="max-w-4xl mx-auto px-6">
            <div class="section-label mb-6 fade-in">FAQ</div>
            <h2 class="section-title mb-16 fade-in">자주 묻는 질문</h2>
            <div class="space-y-3">
              {faqs.map((f, i) => (
                <details class="group fade-in bg-ivory rounded-2xl overflow-hidden border border-brown-200">
                  <summary class="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-brown-50">
                    <div class="flex gap-4 items-center">
                      <span class="text-gold display text-xl">Q{String(i+1).padStart(2,'0')}</span>
                      <span class="font-medium">{f.question}</span>
                    </div>
                    <i class="fas fa-chevron-down text-brown-400 group-open:rotate-180 transition"></i>
                  </summary>
                  <div class="px-6 pb-6 pt-2 text-brown-700 leading-relaxed border-t border-brown-100">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED DICTIONARY */}
      {dictTerms.length > 0 && (
        <section class="py-24 max-w-5xl mx-auto px-6">
          <div class="section-label mb-6 fade-in">DICTIONARY</div>
          <h2 class="section-title mb-12 fade-in">관련 용어</h2>
          <div class="flex flex-wrap gap-3">
            {dictTerms.slice(0, 20).map(d => (
              <a href={`/dictionary/${d.slug}`} class="tag tag-brown hover:bg-brown-800 hover:text-ivory transition text-sm py-2 px-4">
                {d.term}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section class="py-24 bg-brown-950 text-ivory text-center">
        <div class="max-w-3xl mx-auto px-6">
          <h2 class="display text-4xl md:text-5xl font-light mb-8 fade-in">
            <em class="italic text-gold">{treatment.name}</em>, 지금 상담하세요
          </h2>
          <div class="flex flex-wrap justify-center gap-4 fade-in">
            <a href="tel:053-357-0365" class="btn-primary magnetic">
              <i class="fas fa-phone"></i> 053-357-0365
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
