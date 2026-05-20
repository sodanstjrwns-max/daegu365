import { Navbar, Footer } from '../components/Layout'
import type { BeforeAfter, Doctor, Treatment } from '../lib/types'

// 진료 카테고리 — 비포애프터 필터 전용 (admin BA_CATEGORIES와 동기화)
// - 임플란트: 'implant'로 단일화 (수면임플란트·일반 임플란트 양쪽 페이지 노출은 진료 상세 라우터에서 처리)
// - 케이스 누적이 적은 항목(수면치료/에어플로우/기공실/무통마취/예방치과)은 노출 제외
export const TREATMENT_GROUPS = [
  { key: 'implant',           label: '임플란트',                  slugs: ['implant', 'implant-general'] },
  { key: 'ortho',             label: '인비절라인 (치아교정)',       slugs: ['ortho'] },
  { key: 'lamineer',          label: '비니크 라미네이트',          slugs: ['lamineer', 'vinique'] },
  { key: 'cavity-endo-crown', label: '충치·신경·크라운',           slugs: ['cavity-endo-crown'] },
  { key: 'perio',             label: '치주치료',                  slugs: ['perio'] },
  { key: 'pediatric',         label: '소아치과',                  slugs: ['pediatric'] },
  { key: 'pediatric-ortho',   label: '소아 교정',                 slugs: ['pediatric-ortho'] },
  { key: 'whitening',         label: '전문가 미백',                slugs: ['whitening'] },
  { key: 'icon-resin',        label: '아이콘 레진',                slugs: ['icon-resin'] },
  { key: 'prosthetic',        label: '보철',                      slugs: ['prosthetic'] },
  { key: 'aesthetic',         label: '심미치료',                  slugs: ['aesthetic'] },
  { key: 'conservative',      label: '보존치료',                  slugs: ['conservative'] },
  { key: 'general',           label: '기타',                      slugs: ['general'] },
] as const

export const BeforeAfterListPage = ({
  items, doctors, treatments, filters, isLoggedIn
}: {
  items: BeforeAfter[], doctors: Doctor[], treatments: Treatment[],
  filters: { group?: string, doctor?: string },
  isLoggedIn: boolean
}) => {
  const buildHref = (params: { group?: string, doctor?: string }) => {
    const qs = new URLSearchParams()
    if (params.group) qs.set('group', params.group)
    if (params.doctor) qs.set('doctor', params.doctor)
    const s = qs.toString()
    return s ? `/before-after?${s}` : '/before-after'
  }
  const activeG = filters.group || ''
  const activeD = filters.doctor || ''
  return (
  <>
    <Navbar />

    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="section-label mb-6">BEFORE & AFTER</div>
        <h1 class="t-display mb-6 fade-in">
          실제 <em class="italic text-brown-700">치료 사례</em>
        </h1>
        <p class="text-brown-700 max-w-2xl mx-auto fade-in">
          환자분의 동의를 받은 실제 사례입니다. <em class="italic text-brown-600">애프터 사진은 로그인 후 확인 가능</em>합니다.
        </p>
      </div>
    </section>

    {/* Filters — 드롭다운 (진료 / 의료진) */}
    <section class="py-4 sticky top-20 z-40 bg-ivory/90 backdrop-blur border-b border-brown-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* 진료 드롭다운 */}
          <div class="flex items-center gap-2 flex-1 min-w-[140px] sm:flex-none">
            <span class="text-[11px] tracking-[0.2em] text-brown-500 font-bold uppercase whitespace-nowrap">진료</span>
            <select
              onchange="location.href=this.value"
              class="flex-1 sm:flex-none sm:min-w-[180px] px-3 py-2 rounded-lg border border-brown-300 bg-ivory text-sm text-brown-800 font-medium focus:outline-none focus:border-brown-600 cursor-pointer"
            >
              <option value={buildHref({ doctor: activeD })} selected={activeG === ''}>전체</option>
              {TREATMENT_GROUPS.map(g => (
                <option value={buildHref({ group: g.key, doctor: activeD })} selected={activeG === g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {/* 의료진 드롭다운 */}
          <div class="flex items-center gap-2 flex-1 min-w-[140px] sm:flex-none">
            <span class="text-[11px] tracking-[0.2em] text-brown-500 font-bold uppercase whitespace-nowrap">의료진</span>
            <select
              onchange="location.href=this.value"
              class="flex-1 sm:flex-none sm:min-w-[160px] px-3 py-2 rounded-lg border border-brown-300 bg-ivory text-sm text-brown-800 font-medium focus:outline-none focus:border-brown-600 cursor-pointer"
            >
              <option value={buildHref({ group: activeG })} selected={activeD === ''}>전체</option>
              {doctors.map(d => (
                <option value={buildHref({ group: activeG, doctor: d.slug })} selected={activeD === d.slug}>
                  {d.name} 원장
                </option>
              ))}
            </select>
          </div>

          {(activeG || activeD) && (
            <a href="/before-after" class="text-xs text-brown-600 hover:text-brown-900 underline inline-flex items-center gap-1 whitespace-nowrap">
              <i class="fas fa-times text-[10px]"></i> 초기화
            </a>
          )}
        </div>
      </div>
    </section>

    {/* Grid */}
    <section class="py-16 max-w-7xl mx-auto px-6">
      <h2 class="display text-3xl font-black tracking-tight text-brown-900 mb-8">치료 사례 갤러리</h2>
      {items.length === 0 ? (
        <div class="text-center py-24 text-brown-500">해당 조건의 사례가 없습니다.</div>
      ) : (
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(ba => {
            const beforeImg = ba.intra_before_url || ba.pano_before_url
            return (
            <a href={`/before-after/${ba.id}`} class="group fade-in">
              <div class="aspect-[4/3] relative rounded-2xl overflow-hidden mb-4 shadow-card group-hover:shadow-lux transition bg-cream">
                {/* Before 사진만 노출 - 로그인 여부와 무관 */}
                {beforeImg ? (
                  <img src={beforeImg} alt={`${ba.title} - Before`} loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div class="absolute inset-0 placeholder-img flex items-center justify-center"><i class="fas fa-tooth text-4xl"></i></div>
                )}
                {/* BEFORE 라벨 (좌상단) */}
                <span class="absolute top-3 left-3 bg-brown-950/70 text-ivory text-[10px] tracking-[0.2em] px-2 py-1 rounded">BEFORE</span>
                {/* AFTER 잠금 배지 (우상단) - 비로그인 시에만 표시 */}
                {!isLoggedIn && (
                  <span class="absolute top-3 right-3 bg-brown-950/70 text-ivory text-[10px] tracking-[0.2em] px-2 py-1 rounded inline-flex items-center gap-1">
                    <i class="fas fa-lock text-[9px]"></i> AFTER 로그인 후
                  </span>
                )}
                {/* hover 안내 (커서 올렸을 때만) */}
                <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-brown-950/80 to-transparent text-ivory text-xs opacity-0 group-hover:opacity-100 transition">
                  클릭하여 상세 보기 →
                </div>
              </div>
              <div class="flex gap-2 mb-3 flex-wrap">
                <span class="tag tag-gold">{ba.age_group}</span>
                <span class="tag tag-brown">{ba.treatment_period}</span>
                {ba.region_dong && <span class="tag tag-brown">{ba.region_dong}</span>}
              </div>
              <h3 class="display text-xl font-medium mb-2">{ba.title}</h3>
              <p class="text-sm text-brown-600 line-clamp-2">{ba.description}</p>
            </a>
            )
          })}
        </div>
      )}
    </section>

    <Footer />
  </>
  )
}

export const BeforeAfterDetailPage = ({
  item, doctor, treatment, isLoggedIn
}: { item: BeforeAfter, doctor: Doctor | null, treatment: Treatment | null, isLoggedIn: boolean }) => (
  <>
    <Navbar />

    <section class="py-16 max-w-5xl mx-auto px-6">
      <div class="fade-in mb-10">
        <a href="/before-after" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
      </div>

      <div class="fade-in">
        <div class="flex flex-wrap gap-2 mb-6">
          {treatment && <a href={`/treatments/${treatment.slug}`} class="tag tag-gold">{treatment.name}</a>}
          <span class="tag tag-brown">{item.age_group}</span>
          <span class="tag tag-brown">{item.gender === 'female' ? '여성' : '남성'}</span>
          <span class="tag tag-brown">{item.treatment_period}</span>
          {item.region_sigungu && <span class="tag tag-brown">{item.region_sido} {item.region_sigungu} {item.region_dong}</span>}
        </div>
        <h1 class="display text-4xl md:text-5xl font-black tracking-tight mb-6">{item.title}</h1>
        <p class="text-brown-700 text-lg leading-relaxed mb-10">{item.description}</p>
      </div>

      {/* Slider Before/After */}
      <div class="space-y-12 mb-16">
        {(item.pano_before_url || item.pano_after_url) && (
          <div class="fade-in">
            <h2 class="display text-2xl font-medium mb-6">파노라마</h2>
            <div class="ba-slider">
              <div class="absolute inset-0">
                {item.pano_before_url ? (
                  <img src={item.pano_before_url} alt={`${item.title} 파노라마 Before`} class="w-full h-full object-cover" />
                ) : (
                  <div class="w-full h-full placeholder-img flex items-center justify-center"><i class="fas fa-x-ray text-6xl"></i></div>
                )}
              </div>
              <div class="ba-after-wrap">
                {isLoggedIn ? (
                  item.pano_after_url ? (
                    <img src={item.pano_after_url} alt={`${item.title} 파노라마 After`} class="w-full h-full object-cover" />
                  ) : (
                    <div class="w-full h-full placeholder-img flex items-center justify-center" style="background:linear-gradient(135deg,#e6d7bf,#c9a876);"><i class="fas fa-x-ray text-6xl text-brown-800"></i></div>
                  )
                ) : (
                  <div class="ba-locked w-full h-full flex items-center justify-center text-ivory">
                    <div class="text-center relative z-10 px-4">
                      <i class="fas fa-lock text-4xl mb-4 text-gold"></i>
                      <div class="display text-lg font-medium mb-1">AFTER 사진</div>
                      <div class="text-sm text-brown-200 mb-4">로그인 후 확인 가능합니다</div>
                      <a href="/login" class="inline-block btn-primary text-sm py-2 px-5">로그인하기 →</a>
                    </div>
                  </div>
                )}
              </div>
              <div class="ba-handle"></div>
              <span class="ba-label" style="left:16px;">BEFORE</span>
              <span class="ba-label" style="right:16px;">AFTER</span>
            </div>
          </div>
        )}

        {(item.intra_before_url || item.intra_after_url) && (
          <div class="fade-in">
            <h2 class="display text-2xl font-medium mb-6">구내 사진</h2>
            <div class="ba-slider">
              <div class="absolute inset-0">
                {item.intra_before_url ? (
                  <img src={item.intra_before_url} alt={`${item.title} 구내 Before`} class="w-full h-full object-cover" />
                ) : (
                  <div class="w-full h-full placeholder-img flex items-center justify-center"><i class="fas fa-camera text-6xl"></i></div>
                )}
              </div>
              <div class="ba-after-wrap">
                {isLoggedIn ? (
                  item.intra_after_url ? (
                    <img src={item.intra_after_url} alt={`${item.title} 구내 After`} class="w-full h-full object-cover" />
                  ) : (
                    <div class="w-full h-full placeholder-img flex items-center justify-center" style="background:linear-gradient(135deg,#e6d7bf,#c9a876);"><i class="fas fa-camera text-6xl text-brown-800"></i></div>
                  )
                ) : (
                  <div class="ba-locked w-full h-full flex items-center justify-center text-ivory">
                    <div class="text-center relative z-10 px-4">
                      <i class="fas fa-lock text-4xl mb-4 text-gold"></i>
                      <div class="display text-lg font-medium mb-1">AFTER 사진</div>
                      <div class="text-sm text-brown-200 mb-4">로그인 후 확인 가능합니다</div>
                      <a href="/login" class="inline-block btn-primary text-sm py-2 px-5">로그인하기 →</a>
                    </div>
                  </div>
                )}
              </div>
              <div class="ba-handle"></div>
              <span class="ba-label" style="left:16px;">BEFORE</span>
              <span class="ba-label" style="right:16px;">AFTER</span>
            </div>
          </div>
        )}
      </div>

      {/* Case details grid */}
      <div class="grid md:grid-cols-2 gap-6 mb-16 fade-in">
        {doctor && (
          <a href={`/doctors/${doctor.slug}`} class="lux-card">
            <div class="text-xs tracking-widest text-brown-500 mb-2">담당 원장</div>
            <div class="display text-2xl font-medium mb-2">{doctor.name}</div>
            <div class="text-sm text-brown-600">{doctor.position}</div>
            <p class="text-sm text-brown-700 mt-3 italic">"{doctor.message}"</p>
          </a>
        )}
        {treatment && (
          <a href={`/treatments/${treatment.slug}`} class="lux-card">
            <div class="text-xs tracking-widest text-brown-500 mb-2">진료 카테고리</div>
            <div class="display text-2xl font-medium mb-2">{treatment.name}</div>
            <p class="text-sm text-brown-700 mt-3">{treatment.short_desc}</p>
          </a>
        )}
      </div>

      <div class="text-center fade-in">
        <a href="tel:053-357-0365" class="btn-primary">
          <i class="fas fa-phone"></i> 이런 사례 상담받기
        </a>
      </div>
    </section>

    <Footer />
  </>
)
