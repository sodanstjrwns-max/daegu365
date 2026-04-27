import { Navbar, Footer } from '../components/Layout'
import type { Doctor, Treatment, BeforeAfter, BlogPost } from '../lib/types'

// 의료진 슬러그 → 프로필 사진 매핑 (파일명 기준 7명 + 단체 4장)
const DOCTOR_PHOTO: Record<string, string> = {
  'kim-seongju':  '/static/images/doctors/kim-seongju.jpg',
  'jung-jaeheon': '/static/images/doctors/jung-jaeheon.jpg',
  'kim-sangwon':  '/static/images/doctors/kim-sangwon.jpg',
  'choi-hyejung': '/static/images/doctors/choi-hyejung.jpg',
  'kim-jinduk':   '/static/images/doctors/kim-jinduk.jpg',
  'han-jieun':    '/static/images/doctors/han-jieun.jpg',
  'lee-seoyoung': '/static/images/doctors/lee-seoyoung.jpg',
}
const getDoctorPhoto = (slug: string) =>
  DOCTOR_PHOTO[slug] || '/static/images/doctors/team-horizontal-smile.jpg'

export const DoctorsListPage = ({ doctors }: { doctors: Doctor[] }) => (
  <>
    <Navbar />

    {/* HERO with team group photo */}
    <section class="relative bg-brown-950 text-ivory overflow-hidden">
      <div class="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src="/static/images/doctors/team-horizontal-smile.jpg"
          alt="대구365치과 의료진 7인"
          class="w-full h-full object-cover"
          style="animation: kenburns 24s ease-in-out infinite alternate;"
        />
        <div class="absolute inset-0" style="background:linear-gradient(180deg, rgba(28,18,11,0.55) 0%, rgba(28,18,11,0.35) 50%, rgba(28,18,11,1) 100%);"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center px-6 fade-in">
            <div class="text-xs tracking-[0.5em] text-gold mb-6">MEDICAL TEAM · 7</div>
            <h1 class="display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-ivory mb-8">
              <span class="block text-ivory">7명의</span>
              <span class="block italic text-gold">전문 의료진</span>
            </h1>
            <p class="text-brown-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              보존·치주·소아·교정. 각 분야 전문성을 갖춘 의료진이<br/>
              협진으로 완성도 있는 치료를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-stagger">
        {doctors.map(d => (
          <a href={`/doctors/${d.slug}`} class="group block">
            <div class="img-frame aspect-[3/4] rounded-[24px] mb-6 overflow-hidden group-hover:shadow-xl transition-all duration-500">
              <img
                src={getDoctorPhoto(d.slug)}
                alt={`${d.name} ${d.is_representative ? '대표원장' : d.position}`}
                loading="lazy"
                class="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-2 font-bold">
              {(d.is_representative ? '대표원장' : d.position).toUpperCase()}
            </div>
            <h3 class="display text-3xl font-black tracking-tight mb-3">{d.name}</h3>
            <p class="text-brown-600 text-sm leading-relaxed line-clamp-2">
              {d.message}
            </p>
            <div class="mt-5 text-sm text-brown-800 flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
              프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* TEAM GROUP — 다양한 단체 컷 */}
    <section class="py-24 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16 fade-in">
          <div class="section-label mb-6">TEAM PORTRAIT</div>
          <h2 class="t-display">
            함께, <em class="italic text-brown-700">협진</em>으로 완성합니다
          </h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 fade-in-stagger">
          <div class="img-frame aspect-[3/2] rounded-[24px] overflow-hidden">
            <img src="/static/images/doctors/team-2rows.jpg" alt="대구365치과 의료진 단체 컷" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div class="img-frame aspect-[3/2] rounded-[24px] overflow-hidden">
            <img src="/static/images/doctors/team-3rows.jpg" alt="대구365치과 의료진 단체 컷" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
)

export const DoctorDetailPage = ({
  doctor, treatments, cases
}: { doctor: Doctor, treatments: Treatment[], cases: BeforeAfter[] }) => {
  const specialties = JSON.parse(doctor.specialties || '[]') as string[]
  const education = JSON.parse(doctor.education || '[]') as string[]
  const career = JSON.parse(doctor.career || '[]') as string[]
  type InterviewSection = { title: string, content: string }
  type InterviewQA = { q: string, a: string }
  type InterviewData = { intro?: string, sections?: InterviewSection[], qa?: InterviewQA[], signature?: string }
  let interview: InterviewData | null = null
  try { interview = doctor.interview ? JSON.parse(doctor.interview) as InterviewData : null } catch { interview = null }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section class="py-20 bg-cream relative overflow-hidden">
        <div class="blob" style="width:450px;height:450px;background:#c9a876;top:-100px;right:-100px;opacity:0.2;"></div>
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5 fade-in">
              <div class="img-frame aspect-[3/4] rounded-[32px] shadow-xl overflow-hidden">
                <img
                  src={getDoctorPhoto(doctor.slug)}
                  alt={`${doctor.name} ${doctor.is_representative ? '대표원장' : doctor.position}`}
                  loading="eager"
                  class="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            </div>
            <div class="md:col-span-7 fade-in">
              <div class="section-label mb-6">
                {doctor.is_representative ? 'REPRESENTATIVE DOCTOR' : 'DOCTOR'}
              </div>
              <h1 class="t-display mb-3 leading-none">
                {doctor.name} <span class="t-gold">{doctor.position}</span>
              </h1>
              <div class="gold-divider my-6"></div>
              <div class="pullquote mb-8">
                {doctor.message}
              </div>
              <div class="flex flex-wrap gap-2 mb-8">
                {specialties.map(s => {
                  const t = treatments.find(x => x.slug === s)
                  if (!t) return null
                  return <a href={`/treatments/${t.slug}`} class="tag tag-gold">{t.name}</a>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section class="py-24 max-w-5xl mx-auto px-6">
        <div class="fade-in">
          <div class="section-label mb-6">PHILOSOPHY</div>
          <h2 class="display text-4xl font-black tracking-tight mb-8">진료 철학</h2>
          <p class="text-brown-700 text-lg leading-relaxed">{doctor.philosophy}</p>
        </div>
      </section>

      {/* EDU & CAREER */}
      <section class="py-24 bg-cream">
        <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div class="fade-in">
            <div class="section-label mb-6">EDUCATION</div>
            <h2 class="display text-3xl font-black tracking-tight mb-8">학력</h2>
            <ul class="space-y-3">
              {education.map(e => (
                <li class="flex gap-3 text-brown-700">
                  <span class="text-gold">·</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div class="fade-in">
            <div class="section-label mb-6">CAREER</div>
            <h2 class="display text-3xl font-black tracking-tight mb-8">경력</h2>
            <ul class="space-y-3">
              {career.map(c => (
                <li class="flex gap-3 text-brown-700">
                  <span class="text-gold">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INTERVIEW — 8개 섹션 + Q&A */}
      {interview && (interview.intro || (interview.sections && interview.sections.length > 0)) && (
        <section class="py-32 bg-brown-950 text-ivory relative overflow-hidden">
          <div class="blob" style="width:600px;height:600px;background:#c9a876;top:-200px;left:-150px;opacity:0.12;"></div>
          <div class="blob" style="width:500px;height:500px;background:#8a6235;bottom:-150px;right:-100px;opacity:0.18;animation-delay:-6s;"></div>
          <div class="max-w-4xl mx-auto px-6 lg:px-12 relative">
            <div class="text-center mb-20 fade-in">
              <div class="text-xs tracking-[0.5em] text-gold mb-6">INTERVIEW</div>
              <h2 class="display text-4xl md:text-5xl font-black tracking-tight text-ivory mb-8">
                {doctor.name} <em class="italic text-gold">{doctor.position}</em>의 이야기
              </h2>
              {interview.intro && (
                <p class="text-brown-200 text-lg leading-relaxed max-w-3xl mx-auto italic">
                  "{interview.intro}"
                </p>
              )}
              <div class="gold-divider mx-auto mt-10" style="background:#c9a876;"></div>
            </div>

            <div class="space-y-16">
              {(interview.sections || []).map((s, i) => (
                <div class="fade-in grid md:grid-cols-12 gap-8 items-start">
                  <div class="md:col-span-3">
                    <div class="text-[10px] tracking-[0.4em] text-gold mb-3 font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 class="display text-xl md:text-2xl font-black tracking-tight text-ivory leading-tight">
                      {s.title}
                    </h3>
                  </div>
                  <div class="md:col-span-9">
                    <p class="text-brown-100 text-base md:text-lg leading-[1.9] whitespace-pre-line">
                      {s.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {interview.qa && interview.qa.length > 0 && (
              <div class="mt-32">
                <div class="text-center mb-12 fade-in">
                  <div class="text-xs tracking-[0.5em] text-gold mb-6">Q &amp; A</div>
                  <h3 class="display text-3xl md:text-4xl font-black tracking-tight text-ivory">
                    원장에게 <em class="italic text-gold">묻습니다</em>
                  </h3>
                </div>
                <div class="space-y-8">
                  {interview.qa.map((qa) => (
                    <div class="fade-in border-l-2 border-gold pl-6 md:pl-8">
                      <div class="flex gap-4 mb-3">
                        <span class="display text-2xl italic text-gold font-black flex-shrink-0">Q.</span>
                        <p class="text-ivory text-lg md:text-xl font-semibold leading-relaxed">{qa.q}</p>
                      </div>
                      <div class="flex gap-4">
                        <span class="display text-2xl italic text-brown-300 font-black flex-shrink-0">A.</span>
                        <p class="text-brown-100 text-base md:text-lg leading-[1.9]">{qa.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {interview.signature && (
              <div class="mt-24 text-center fade-in">
                <div class="gold-divider mx-auto mb-8" style="background:#c9a876;"></div>
                <p class="display text-2xl md:text-3xl italic text-gold leading-relaxed max-w-3xl mx-auto">
                  "{interview.signature}"
                </p>
                <div class="text-xs tracking-[0.4em] text-brown-300 mt-8">
                  — {doctor.name} {doctor.position}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CASES */}
      {cases.length > 0 && (
        <section class="py-24 max-w-7xl mx-auto px-6">
          <div class="flex justify-between items-end mb-12 fade-in">
            <div>
              <div class="section-label mb-6">CASES</div>
              <h2 class="display text-4xl font-black tracking-tight">
                {doctor.name} 원장 <em class="italic text-brown-700">치료 사례</em>
              </h2>
            </div>
            <a href={`/before-after?doctor=${doctor.slug}`} class="link-underline display italic">전체 보기 →</a>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {cases.slice(0, 3).map((ba) => (
              <a href={`/before-after/${ba.id}`} class="fade-in lux-card p-0 overflow-hidden">
                <div class="aspect-[4/3] placeholder-img">
                  <i class="fas fa-images"></i>
                </div>
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

      <Footer />
    </>
  )
}
