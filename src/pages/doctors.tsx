import { Navbar, Footer } from '../components/Layout'
import type { Doctor, Treatment, BeforeAfter, BlogPost } from '../lib/types'

export const DoctorsListPage = ({ doctors }: { doctors: Doctor[] }) => (
  <>
    <Navbar />

    <section class="pt-20 pb-16 bg-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center fade-in">
          <div class="section-label mb-6">MEDICAL TEAM</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6">
            7명의 <em class="italic text-brown-700">전문</em> 의료진
          </h1>
          <p class="text-brown-700 max-w-2xl mx-auto text-lg">
            보존·치주·소아·교정·보철·심미. 각 분야 전문성을 갖춘 의료진이 협진으로 완성도 있는 치료를 제공합니다.
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map(d => (
          <a href={`/doctors/${d.slug}`} class="group fade-in block">
            <div class="aspect-[3/4] placeholder-img rounded-3xl mb-6 overflow-hidden group-hover:shadow-lux transition">
              <i class="fas fa-user-md"></i>
            </div>
            <div class="text-xs tracking-[0.3em] text-brown-500 mb-2">
              {d.is_representative ? '대표원장' : d.position}
            </div>
            <h3 class="display text-3xl font-medium mb-3">{d.name}</h3>
            <p class="text-brown-600 italic display text-sm leading-relaxed line-clamp-2">
              {d.message}
            </p>
            <div class="mt-4 text-sm text-brown-700 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition">
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
      <section class="py-20 bg-cream">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5 fade-in">
              <div class="aspect-[3/4] placeholder-img rounded-3xl shadow-lux">
                <i class="fas fa-user-md"></i>
              </div>
            </div>
            <div class="md:col-span-7 fade-in">
              <div class="text-xs tracking-[0.3em] text-brown-500 mb-4">
                {doctor.is_representative ? 'REPRESENTATIVE DOCTOR' : 'DOCTOR'}
              </div>
              <h1 class="display text-6xl md:text-7xl font-light mb-2">{doctor.name}</h1>
              <div class="text-xl text-brown-600 display italic mb-8">{doctor.position}</div>
              <p class="display italic text-xl text-brown-800 border-l-4 border-gold pl-6 mb-8 leading-relaxed">
                "{doctor.message}"
              </p>
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
          <h2 class="display text-4xl font-light mb-8">진료 철학</h2>
          <p class="text-brown-700 text-lg leading-relaxed">{doctor.philosophy}</p>
        </div>
      </section>

      {/* EDU & CAREER */}
      <section class="py-24 bg-cream">
        <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div class="fade-in">
            <div class="section-label mb-6">EDUCATION</div>
            <h2 class="display text-3xl font-light mb-8">학력</h2>
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
            <h2 class="display text-3xl font-light mb-8">경력</h2>
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
              <h2 class="display text-4xl font-light">
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
