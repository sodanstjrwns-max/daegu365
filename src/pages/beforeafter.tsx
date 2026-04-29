import { Navbar, Footer } from '../components/Layout'
import type { BeforeAfter, Doctor, Treatment } from '../lib/types'

export const BeforeAfterListPage = ({
  items, doctors, treatments, filters, isLoggedIn
}: {
  items: BeforeAfter[], doctors: Doctor[], treatments: Treatment[],
  filters: { treatment?: string, doctor?: string, region?: string, age?: string, gender?: string },
  isLoggedIn: boolean
}) => (
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

    {/* Filters */}
    <section class="py-8 sticky top-20 z-40 bg-ivory/80 backdrop-blur border-b border-brown-200">
      <div class="max-w-7xl mx-auto px-6">
        <form method="get" class="flex flex-wrap gap-3 items-center">
          <select name="treatment" class="form-input py-2 text-sm max-w-xs" onchange="this.form.submit()">
            <option value="">전체 진료</option>
            {treatments.map(t => (
              <option value={t.slug} selected={filters.treatment === t.slug}>{t.name}</option>
            ))}
          </select>
          <select name="doctor" class="form-input py-2 text-sm max-w-xs" onchange="this.form.submit()">
            <option value="">전체 원장</option>
            {doctors.map(d => (
              <option value={d.slug} selected={filters.doctor === d.slug}>{d.name} 원장</option>
            ))}
          </select>
          <select name="age" class="form-input py-2 text-sm max-w-xs" onchange="this.form.submit()">
            <option value="">전체 연령</option>
            {['10대','20대','30대','40대','50대','60대','70대'].map(a => (
              <option value={a} selected={filters.age === a}>{a}</option>
            ))}
          </select>
          <select name="gender" class="form-input py-2 text-sm max-w-xs" onchange="this.form.submit()">
            <option value="">전체 성별</option>
            <option value="female" selected={filters.gender === 'female'}>여성</option>
            <option value="male" selected={filters.gender === 'male'}>남성</option>
          </select>
          <input name="region" placeholder="지역 (예: 침산동, 북구)" value={filters.region || ''} class="form-input py-2 text-sm max-w-xs" />
          <button class="btn-primary py-2 px-6 text-sm">필터 적용</button>
          <a href="/before-after" class="text-sm text-brown-600 hover:text-brown-900 underline">초기화</a>
        </form>
      </div>
    </section>

    {/* Grid */}
    <section class="py-16 max-w-7xl mx-auto px-6">
      <h2 class="display text-3xl font-black tracking-tight text-brown-900 mb-8">치료 사례 갤러리</h2>
      {items.length === 0 ? (
        <div class="text-center py-24 text-brown-500">해당 조건의 사례가 없습니다.</div>
      ) : (
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(ba => (
            <a href={`/before-after/${ba.id}`} class="group fade-in">
              <div class="aspect-[4/3] relative rounded-2xl overflow-hidden mb-4 shadow-card group-hover:shadow-lux transition">
                <div class="absolute inset-0 placeholder-img"><i class="fas fa-tooth"></i></div>
                {!isLoggedIn && (
                  <div class="absolute inset-0 bg-brown-950/50 flex items-center justify-center text-ivory text-center">
                    <div>
                      <i class="fas fa-lock text-2xl mb-2"></i>
                      <div class="text-xs tracking-widest">애프터 사진<br/>로그인 후 공개</div>
                    </div>
                  </div>
                )}
              </div>
              <div class="flex gap-2 mb-3 flex-wrap">
                <span class="tag tag-gold">{ba.age_group}</span>
                <span class="tag tag-brown">{ba.treatment_period}</span>
                {ba.region_dong && <span class="tag tag-brown">{ba.region_dong}</span>}
              </div>
              <h3 class="display text-xl font-medium mb-2">{ba.title}</h3>
              <p class="text-sm text-brown-600 line-clamp-2">{ba.description}</p>
            </a>
          ))}
        </div>
      )}
    </section>

    <Footer />
  </>
)

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
                <div class="w-full h-full placeholder-img"><i class="fas fa-x-ray text-6xl"></i></div>
              </div>
              <div class="ba-after-wrap">
                {isLoggedIn ? (
                  <div class="w-full h-full placeholder-img" style="background:linear-gradient(135deg,#e6d7bf,#c9a876);"><i class="fas fa-x-ray text-6xl text-brown-800"></i></div>
                ) : (
                  <div class="w-full h-full bg-brown-950/80 flex items-center justify-center text-ivory">
                    <div class="text-center">
                      <i class="fas fa-lock text-3xl mb-3"></i>
                      <div>로그인 후 확인 가능</div>
                      <a href="/login" class="mt-4 inline-block underline">로그인하기 →</a>
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
                <div class="w-full h-full placeholder-img"><i class="fas fa-camera text-6xl"></i></div>
              </div>
              <div class="ba-after-wrap">
                {isLoggedIn ? (
                  <div class="w-full h-full placeholder-img" style="background:linear-gradient(135deg,#e6d7bf,#c9a876);"><i class="fas fa-camera text-6xl text-brown-800"></i></div>
                ) : (
                  <div class="w-full h-full bg-brown-950/80 flex items-center justify-center text-ivory">
                    <div class="text-center">
                      <i class="fas fa-lock text-3xl mb-3"></i>
                      <div>로그인 후 확인 가능</div>
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
