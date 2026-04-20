import { Navbar, Footer } from '../components/Layout'
import type { Notice, DictEntry, FAQ, Treatment } from '../lib/types'

// === Notices ===
export const NoticeListPage = ({ notices }: { notices: Notice[] }) => {
  const main = notices.find(n => n.is_main)
  const rest = notices.filter(n => !n.is_main)
  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <div class="section-label mb-6">NOTICE</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">공지사항</h1>
        </div>
      </section>
      <section class="py-16 max-w-5xl mx-auto px-6">
        {main && (
          <a href={`/notices/${main.id}`} class="block mb-10 p-10 rounded-3xl bg-brown-950 text-ivory hover:bg-brown-900 transition fade-in">
            <div class="text-xs tracking-widest text-gold mb-4">★ MAIN</div>
            <h2 class="display text-3xl font-light mb-4">{main.title}</h2>
            <div class="text-brown-300 text-sm" dangerouslySetInnerHTML={{__html: main.content.replace(/<[^>]+>/g,'').substring(0,120)+'...'}}></div>
            <div class="mt-6 text-xs text-brown-400">{main.created_at?.split('T')[0]} · 조회 {main.view_count}</div>
          </a>
        )}
        {rest.length === 0 && !main ? (
          <div class="text-center py-24 text-brown-500">공지사항이 없습니다.</div>
        ) : (
          <div class="divide-y divide-brown-200">
            {rest.map(n => (
              <a href={`/notices/${n.id}`} class="group block py-6 fade-in">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <h3 class="display text-xl font-medium group-hover:text-brown-700 transition mb-2">{n.title}</h3>
                    <div class="text-xs text-brown-500">{n.created_at?.split('T')[0]} · 조회 {n.view_count}</div>
                  </div>
                  <i class="fas fa-arrow-right text-brown-400 group-hover:text-brown-700 group-hover:translate-x-1 transition mt-2"></i>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export const NoticeDetailPage = ({ notice }: { notice: Notice }) => (
  <>
    <Navbar />
    <article class="max-w-3xl mx-auto px-6 py-16">
      <a href="/notices" class="text-sm text-brown-600 hover:text-brown-900">← 공지사항 목록</a>
      {notice.is_main ? <div class="mt-8 text-xs tracking-widest text-gold">★ MAIN NOTICE</div> : <div class="mt-8 text-xs tracking-widest text-brown-500">NOTICE</div>}
      <h1 class="display text-4xl md:text-5xl font-light leading-tight my-6">{notice.title}</h1>
      <div class="text-sm text-brown-500 mb-10 pb-6 border-b border-brown-200">
        {notice.created_at?.split('T')[0]} · 조회 {notice.view_count}
      </div>
      {notice.thumbnail_url && <img src={notice.thumbnail_url} class="w-full rounded-2xl mb-10" alt="" />}
      <div class="prose-dental" dangerouslySetInnerHTML={{__html: notice.content}}></div>
    </article>
    <Footer />
  </>
)

// === Dictionary ===
export const DictionaryListPage = ({ items, selectedCategory, query }: { items: DictEntry[], selectedCategory?: string, query?: string }) => {
  const categories = ['implant','ortho','prosthetics','lamineer','aesthetic','whitening','conservative','endo','periodontics','pediatric','preventive','general','equipment']
  const categoryNames: Record<string,string> = {
    implant:'임플란트', ortho:'교정', prosthetics:'보철', lamineer:'라미네이트',
    aesthetic:'심미', whitening:'미백', conservative:'보존', endo:'신경치료',
    periodontics:'치주', pediatric:'소아', preventive:'예방', general:'일반',
    equipment:'장비/진단'
  }

  // 가나다 / 알파벳 초성 그룹화
  const groups: Record<string, DictEntry[]> = {}
  items.forEach(it => {
    const firstChar = it.term.charAt(0)
    let key = firstChar
    if (/[ㄱ-ㅎ가-힣]/.test(firstChar)) {
      const code = firstChar.charCodeAt(0) - 0xAC00
      const choIndex = Math.floor(code / (21 * 28))
      const choArr = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
      key = choArr[choIndex] || firstChar
      if (['ㄲ','ㄸ','ㅃ','ㅆ','ㅉ'].includes(key)) key = key.charAt(0)
    }
    if (!groups[key]) groups[key] = []
    groups[key].push(it)
  })

  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <div class="section-label mb-6">DICTIONARY</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">치과 <em class="italic text-brown-700">백과사전</em></h1>
          <p class="text-brown-700 max-w-2xl mx-auto fade-in">500여 개의 치과 용어를 담았습니다. 검색하거나 카테고리로 찾아보세요.</p>
        </div>
      </section>

      <section class="sticky top-20 bg-ivory/80 backdrop-blur border-b border-brown-200 z-40 py-4">
        <div class="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          <form method="get" class="flex-1 flex gap-2">
            <input name="q" placeholder="용어 검색 (예: 임플란트, 라미네이트)" value={query || ''} class="form-input flex-1" />
            <button class="btn-primary py-2 px-6 text-sm">검색</button>
          </form>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-3 overflow-x-auto no-scrollbar">
          <div class="flex gap-2 min-w-max">
            <a href="/dictionary" class={`tag ${!selectedCategory ? 'tag-gold' : 'tag-brown'} text-sm`}>전체</a>
            {categories.map(c => (
              <a href={`/dictionary?category=${c}`} class={`tag ${selectedCategory === c ? 'tag-gold' : 'tag-brown'} text-sm`}>
                {categoryNames[c]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="py-16 max-w-7xl mx-auto px-6">
        {items.length === 0 ? (
          <div class="text-center py-24 text-brown-500">검색 결과가 없습니다.</div>
        ) : (
          Object.keys(groups).sort().map(k => (
            <div class="mb-12 fade-in">
              <h2 class="display text-4xl font-light text-brown-800 mb-6 pb-3 border-b border-brown-200">{k}</h2>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups[k].map(d => (
                  <a href={`/dictionary/${d.slug}`} class="group p-4 rounded-xl hover:bg-cream transition">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="display text-lg font-medium group-hover:text-brown-700">{d.term}</div>
                        {d.term_en && <div class="text-xs text-brown-500 italic">{d.term_en}</div>}
                        <div class="text-sm text-brown-700 mt-1 line-clamp-2">{d.short_desc}</div>
                      </div>
                      <i class="fas fa-arrow-right text-xs text-brown-400 mt-2 group-hover:text-brown-700"></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
      <Footer />
    </>
  )
}

export const DictionaryDetailPage = ({
  entry, relatedTreatments, relatedEntries
}: { entry: DictEntry, relatedTreatments: Treatment[], relatedEntries: DictEntry[] }) => (
  <>
    <Navbar />
    <article class="max-w-3xl mx-auto px-6 py-16">
      <a href="/dictionary" class="text-sm text-brown-600 hover:text-brown-900">← 백과사전 목록</a>
      <div class="mt-8 text-xs tracking-widest text-brown-500">DICTIONARY</div>
      <h1 class="display text-5xl md:text-6xl font-light leading-tight my-4">{entry.term}</h1>
      {entry.term_en && <div class="display italic text-xl text-brown-600 mb-8">{entry.term_en}</div>}
      <div class="text-sm text-brown-500 mb-10 pb-6 border-b border-brown-200">
        카테고리: {entry.category} · 조회 {entry.view_count}
      </div>

      <p class="display italic text-2xl text-brown-800 border-l-4 border-gold pl-6 mb-10 leading-relaxed">
        {entry.short_desc}
      </p>

      <div class="prose-dental text-brown-700">
        <p>{entry.full_desc}</p>
      </div>

      {relatedTreatments.length > 0 && (
        <section class="mt-16 pt-12 border-t border-brown-200">
          <h2 class="display text-2xl font-medium mb-6">관련 진료</h2>
          <div class="flex flex-wrap gap-3">
            {relatedTreatments.map(t => (
              <a href={`/treatments/${t.slug}`} class="tag tag-gold hover:bg-brown-700 hover:text-ivory transition text-sm py-2 px-4">
                {t.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {relatedEntries.length > 0 && (
        <section class="mt-12">
          <h2 class="display text-2xl font-medium mb-6">비슷한 용어</h2>
          <div class="grid md:grid-cols-2 gap-3">
            {relatedEntries.map(r => (
              <a href={`/dictionary/${r.slug}`} class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition">
                <div class="display font-medium">{r.term}</div>
                <div class="text-xs text-brown-600 line-clamp-1">{r.short_desc}</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
    <Footer />
  </>
)

// === Integrated FAQ ===
export const FAQPage = ({ grouped, treatments }: { grouped: Record<string, FAQ[]>, treatments: Treatment[] }) => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <div class="section-label mb-6">FAQ</div>
        <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">자주 묻는 질문</h1>
        <p class="text-brown-700 max-w-2xl mx-auto fade-in">진료 과목별로 자주 묻는 질문들을 모았습니다.</p>
      </div>
    </section>

    <section class="py-16 max-w-5xl mx-auto px-6">
      {treatments.map(t => {
        const list = grouped[t.slug] || []
        if (list.length === 0) return null
        return (
          <div class="mb-16 fade-in">
            <div class="flex items-end justify-between mb-8">
              <h2 class="display text-3xl font-light">{t.name}</h2>
              <a href={`/treatments/${t.slug}`} class="text-sm link-underline">진료 안내 →</a>
            </div>
            <div class="space-y-3">
              {list.map((f, i) => (
                <details class="group bg-ivory rounded-2xl overflow-hidden border border-brown-200">
                  <summary class="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-brown-50">
                    <div class="flex gap-4 items-center flex-1">
                      <span class="text-gold display text-base flex-shrink-0">Q{String(i+1).padStart(2,'0')}</span>
                      <span class="font-medium">{f.question}</span>
                    </div>
                    <i class="fas fa-chevron-down text-brown-400 group-open:rotate-180 transition ml-4"></i>
                  </summary>
                  <div class="px-5 pb-5 pt-2 text-brown-700 leading-relaxed border-t border-brown-100">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )
      })}
    </section>
    <Footer />
  </>
)

// === 내원안내 ===
export const DirectionsPage = () => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <div class="section-label mb-6">DIRECTIONS</div>
        <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">오시는 길</h1>
      </div>
    </section>
    <section class="py-16 max-w-5xl mx-auto px-6">
      <div class="aspect-[16/9] rounded-3xl overflow-hidden mb-12 fade-in shadow-lux">
        <iframe src="https://map.kakao.com/?urlX=473870&urlY=1119810&urlLevel=3&map_type=TYPE_MAP" class="w-full h-full" title="대구365치과 위치"></iframe>
      </div>
      <div class="grid md:grid-cols-2 gap-6 fade-in">
        <div class="lux-card">
          <div class="text-xs tracking-widest text-brown-500 mb-3">ADDRESS</div>
          <h3 class="display text-2xl font-medium mb-3">주소</h3>
          <p class="text-brown-700 leading-relaxed">
            대구광역시 북구 침산로 148<br/>
            엠브로스퀘어 <strong>7층</strong>
          </p>
        </div>
        <div class="lux-card">
          <div class="text-xs tracking-widest text-brown-500 mb-3">CONTACT</div>
          <h3 class="display text-2xl font-medium mb-3">연락처</h3>
          <ul class="space-y-2 text-brown-700">
            <li><i class="fas fa-phone mr-2 text-gold"></i><a href="tel:053-357-0365" class="font-medium">053-357-0365</a></li>
            <li><i class="fas fa-envelope mr-2 text-gold"></i><a href="mailto:daegu365dc@naver.com">daegu365dc@naver.com</a></li>
          </ul>
        </div>
        <div class="lux-card">
          <div class="text-xs tracking-widest text-brown-500 mb-3">TRANSPORT</div>
          <h3 class="display text-2xl font-medium mb-3">대중교통</h3>
          <p class="text-brown-700 leading-relaxed text-sm">
            지하철 3호선 <strong>만평역</strong> 도보 10분<br/>
            버스 정류장 <strong>엠브로스퀘어</strong> 바로 앞<br/>
            빌딩 주차 가능
          </p>
        </div>
        <div class="lux-card">
          <div class="text-xs tracking-widest text-brown-500 mb-3">HOURS</div>
          <h3 class="display text-2xl font-medium mb-3">진료시간</h3>
          <ul class="space-y-1 text-brown-700 text-sm">
            <li><strong>월·목</strong>: 09:30 ~ 21:00 (야간)</li>
            <li><strong>화·수·금</strong>: 09:30 ~ 18:30</li>
            <li><strong>토·일</strong>: 09:30 ~ 17:00</li>
            <li class="text-xs text-brown-500 pt-2">점심시간: 13:00 ~ 14:00</li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
  </>
)

export const HoursPage = () => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div class="section-label mb-6">HOURS</div>
        <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">진료시간</h1>
        <p class="text-brown-700 max-w-xl mx-auto fade-in">
          월·목 야간 21시까지, 토·일도 진료합니다. 진정한 <em class="italic display">365</em>일 치과.
        </p>
      </div>
    </section>
    <section class="py-16 max-w-3xl mx-auto px-6">
      <div class="bg-brown-950 text-ivory rounded-3xl p-12 fade-in">
        <div class="space-y-6">
          {[
            { day: '월요일', time: '09:30 — 21:00', highlight: true, tag: '야간' },
            { day: '화요일', time: '09:30 — 18:30' },
            { day: '수요일', time: '09:30 — 18:30' },
            { day: '목요일', time: '09:30 — 21:00', highlight: true, tag: '야간' },
            { day: '금요일', time: '09:30 — 18:30' },
            { day: '토요일', time: '09:30 — 17:00', highlight: true, tag: '주말' },
            { day: '일요일', time: '09:30 — 17:00', highlight: true, tag: '주말' },
          ].map((row: any) => (
            <div class={`flex justify-between items-center pb-4 border-b ${row.highlight ? 'border-gold' : 'border-brown-800'}`}>
              <div class="flex items-center gap-3">
                <div class="display text-xl font-light">{row.day}</div>
                {row.tag && <span class="tag tag-gold text-xs">{row.tag}</span>}
              </div>
              <div class="display text-xl font-light text-gold">{row.time}</div>
            </div>
          ))}
        </div>
        <div class="mt-8 pt-6 border-t border-brown-800 text-sm text-brown-300">
          점심시간: 매일 13:00 — 14:00 · 공휴일은 전화 문의 바랍니다.
        </div>
      </div>
    </section>
    <Footer />
  </>
)

export const FeesPage = ({ fees }: { fees: any[] }) => {
  const grouped: Record<string, any[]> = {}
  fees.forEach(f => {
    if (!grouped[f.category]) grouped[f.category] = []
    grouped[f.category].push(f)
  })
  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="section-label mb-6">FEES</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">수가 안내</h1>
          <p class="text-brown-700 max-w-2xl mx-auto fade-in text-sm">
            아래 비용은 참고용이며, 실제 비용은 진단·난이도·재료에 따라 달라질 수 있습니다. 정확한 비용은 상담 시 안내드립니다.
          </p>
        </div>
      </section>
      <section class="py-16 max-w-4xl mx-auto px-6">
        {Object.keys(grouped).map(cat => (
          <div class="mb-12 fade-in">
            <h2 class="display text-3xl font-light mb-6">{cat}</h2>
            <div class="bg-ivory rounded-2xl border border-brown-200 overflow-hidden">
              {grouped[cat].map((f, i) => (
                <div class={`p-5 flex justify-between items-center gap-4 ${i>0 ? 'border-t border-brown-100':''}`}>
                  <div>
                    <div class="font-medium">{f.item_name}</div>
                    {f.note && <div class="text-xs text-brown-500 mt-1">{f.note}</div>}
                  </div>
                  <div class="display text-lg text-brown-800 text-right whitespace-nowrap">{f.price_range}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  )
}
