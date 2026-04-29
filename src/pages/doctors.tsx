import { Navbar, Footer } from '../components/Layout'
import type { Doctor, Treatment, BeforeAfter, BlogPost } from '../lib/types'

// 의료진 슬러그 → 프로필 사진 매핑 (파일명 기준 7명 + 단체 4장)
const DOCTOR_PHOTO: Record<string, string> = {
  'kim-seongju':  '/r2/images/doctors/kim-seongju.jpg',
  'jung-jaeheon': '/r2/images/doctors/jung-jaeheon.jpg',
  'kim-sangwon':  '/r2/images/doctors/kim-sangwon.jpg',
  'choi-hyejung': '/r2/images/doctors/choi-hyejung.jpg',
  'kim-jinduk':   '/r2/images/doctors/kim-jinduk.jpg',
  'han-jieun':    '/r2/images/doctors/han-jieun.jpg',
  'lee-seoyoung': '/r2/images/doctors/lee-seoyoung.jpg',
}
const getDoctorPhoto = (slug: string) =>
  DOCTOR_PHOTO[slug] || '/r2/images/doctors/team-horizontal-smile.jpg'

// 의료진 슬러그 → 인터뷰 영상 R2 스트리밍 라우트 매핑
// (R2 버킷 daegu365dc-assets 의 한글 master 파일을 /api/videos/:slug 라우트로 서빙)
const DOCTOR_VIDEO: Record<string, string> = {
  'kim-seongju':  '/api/videos/kim-seongju',
  'jung-jaeheon': '/api/videos/jung-jaeheon',
  'kim-sangwon':  '/api/videos/kim-sangwon',
  'choi-hyejung': '/api/videos/choi-hyejung',
  'kim-jinduk':   '/api/videos/kim-jinduk',
  'han-jieun':    '/api/videos/han-jieun',
  'lee-seoyoung': '/api/videos/lee-seoyoung',
}
const getDoctorVideo = (slug: string): string | null =>
  DOCTOR_VIDEO[slug] || null

export const DoctorsListPage = ({ doctors }: { doctors: Doctor[] }) => (
  <>
    <Navbar />

    {/* HERO with team group photo */}
    <section class="relative bg-brown-950 text-ivory overflow-hidden">
      {/* 머리 윗부분 여유 공간 확보 — 높이를 키우고, 사진을 아래쪽 정렬해서 인물의 머리·어깨·상체가 모두 노출되도록 */}
      <div class="relative h-[78vh] min-h-[640px] md:min-h-[720px] overflow-hidden">
        <img
          src="/r2/images/doctors/team-horizontal-smile.jpg"
          alt="대구365치과 의료진 7인"
          class="w-full h-full object-cover object-[center_85%]"
          style="animation: kenburns-doctors 24s ease-in-out infinite alternate;"
        />
        {/* 머리 위 여백을 더 확보하기 위해 상단 어둡기 살짝 줄이고, 헤드라인 가독성은 중앙 글로우로 보조 */}
        <div
          class="absolute inset-0"
          style="background:
            linear-gradient(180deg, rgba(28,18,11,0.45) 0%, rgba(28,18,11,0.25) 35%, rgba(28,18,11,0.55) 70%, rgba(28,18,11,1) 100%),
            radial-gradient(ellipse at center 60%, rgba(28,18,11,0.55) 0%, transparent 60%);"
        ></div>
        {/* 카피는 아래쪽 1/3 지점에 배치 — 인물 머리와 겹치지 않도록 */}
        <div class="absolute inset-x-0 bottom-0 pb-20 md:pb-28">
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

      {/* HERO 전용 Ken Burns — 머리 윗부분이 잘리지 않도록 object-position 기준에서 미세하게만 움직임 */}
      <style>{`
        @keyframes kenburns-doctors {
          0%   { transform: scale(1.04); }
          100% { transform: scale(1.10); }
        }
      `}</style>
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

    {/* TEAM GROUP — 다양한 단체 컷 (가로 + 세로 비율 매거진 레이아웃) */}
    <section class="py-24 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16 fade-in">
          <div class="section-label mb-6">TEAM PORTRAIT</div>
          <h2 class="t-display">
            함께, <em class="italic text-brown-700">협진</em>으로 완성합니다
          </h2>
          <p class="mt-6 text-brown-700 max-w-2xl mx-auto leading-relaxed">
            7인의 전문의가 한 자리에서 케이스를 검토하고 진단합니다.
            한 환자의 모든 진료를 같은 기준으로 — 그것이 협진의 약속입니다.
          </p>
        </div>

        {/* 12-col 매거진 그리드: 가로 사진(7) + 세로 사진(5) */}
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 fade-in-stagger items-stretch">
          {/* 왼쪽 — 가로 단체 컷 (3:2) */}
          <figure class="md:col-span-7 group">
            <div class="img-frame aspect-[3/2] rounded-[24px] overflow-hidden bg-brown-100">
              <img
                src="/r2/images/doctors/team-2rows.jpg"
                alt="대구365치과 7인 의료진 가로 단체컷 — 2열 구성"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption class="mt-4 flex items-baseline gap-3 text-xs tracking-[0.3em] text-brown-700">
              <span class="text-gold font-bold">01</span>
              <span class="uppercase">Wide Group · 한 자리에서</span>
            </figcaption>
          </figure>

          {/* 오른쪽 — 세로 단체 컷 (2:3 = 세로 비율) */}
          <figure class="md:col-span-5 group">
            <div class="img-frame aspect-[2/3] rounded-[24px] overflow-hidden bg-brown-100">
              <img
                src="/r2/images/doctors/team-3rows.jpg"
                alt="대구365치과 7인 의료진 세로 단체컷 — 3열 클로즈업"
                loading="lazy"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption class="mt-4 flex items-baseline gap-3 text-xs tracking-[0.3em] text-brown-700">
              <span class="text-gold font-bold">02</span>
              <span class="uppercase">Close Group · 가까이에서</span>
            </figcaption>
          </figure>
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
  const videoUrl = getDoctorVideo(doctor.slug)

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

            {/* INTERVIEW VIDEO — 세로 9:16 인터뷰 영상 */}
            {videoUrl && (
              <div class="fade-in mb-20">
                <div class="text-center mb-8">
                  <div class="text-[10px] tracking-[0.4em] text-gold mb-3 font-bold">FULL INTERVIEW</div>
                  <h3 class="display text-2xl md:text-3xl font-black tracking-tight text-ivory">
                    원장님의 목소리로 직접 듣는 인터뷰
                  </h3>
                </div>
                {/* 세로 영상 컨테이너 — 9:16 비율, 데스크탑에서도 좌우 여백을 두고 중앙 정렬 */}
                <div
                  class="relative rounded-[24px] overflow-hidden shadow-2xl bg-black mx-auto"
                  style="border: 1px solid rgba(201, 168, 118, 0.3); aspect-ratio: 9 / 16; width: 100%; max-width: 420px;"
                >
                  <video
                    controls
                    preload="metadata"
                    playsinline
                    poster={getDoctorPhoto(doctor.slug)}
                    class="w-full h-full object-contain bg-black"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    브라우저가 비디오 태그를 지원하지 않습니다.
                  </video>
                </div>
                <p class="text-center text-brown-300 text-xs mt-4 tracking-wider">
                  <i class="fas fa-circle-play text-gold mr-2"></i>
                  재생 버튼을 눌러 인터뷰 영상을 시청하실 수 있습니다
                </p>
              </div>
            )}

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
