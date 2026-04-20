import { Navbar, Footer } from '../components/Layout'
import type { Doctor, Treatment, BeforeAfter, BlogPost } from '../lib/types'

export const DoctorsListPage = ({ doctors }: { doctors: Doctor[] }) => (
  <>
    <Navbar />

    <section class="pt-20 pb-16 bg-cream relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:-150px;right:-100px;opacity:0.25;"></div>
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center fade-in">
          <div class="section-label mb-8">MEDICAL TEAM</div>
          <h1 class="t-display mb-8">
            7명의 <span class="t-gold">전문</span> 의료진
          </h1>
          <p class="t-lead max-w-2xl mx-auto">
            보존·치주·소아·교정·보철·심미.<br/>
            각 분야 전문성을 갖춘 의료진이 협진으로 완성도 있는 치료를 제공합니다.
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-stagger">
        {doctors.map(d => (
          <a href={`/doctors/${d.slug}`} class="group block">
            <div class="img-frame aspect-[3/4] rounded-[24px] mb-6 group-hover:shadow-xl transition-all duration-500">
              <img src="/static/images/doctor-mood.jpg" alt={d.name} loading="lazy" class="group-hover:scale-105 transition-transform duration-700" />
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

    <Footer />
  </>
)

export const DoctorDetailPage = ({
  doctor, treatments, cases
}: { doctor: Doctor, treatments: Treatment[], cases: BeforeAfter[] }) => {
  const specialties = JSON.parse(doctor.specialties || '[]') as string[]
  const education = JSON.parse(doctor.education || '[]') as string[]
  const career = JSON.parse(doctor.career || '[]') as string[]

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section class="py-20 bg-cream relative overflow-hidden">
        <div class="blob" style="width:450px;height:450px;background:#c9a876;top:-100px;right:-100px;opacity:0.2;"></div>
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5 fade-in">
              <div class="img-frame aspect-[3/4] rounded-[32px] shadow-xl">
                <img src="/static/images/doctor-mood.jpg" alt={doctor.name} loading="eager" />
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
