import { Navbar, Footer } from '../components/Layout'
import type { BlogPost, Doctor } from '../lib/types'
import { kstYmd } from '../lib/content-dates'

export const BlogListPage = ({ posts, doctors, page = 1, totalPages = 1 }: { posts: BlogPost[], doctors: Doctor[], page?: number, totalPages?: number }) => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="section-label mb-6">JOURNAL</div>
        <h1 class="t-display mb-6 fade-in">
          대구365치과 <em class="not-italic text-brown-700">블로그</em>
        </h1>
        <p class="text-brown-700 max-w-2xl mx-auto fade-in">
          의료진이 직접 쓰는 치과 이야기. 정확한 정보와 따뜻한 마음을 담아 전합니다.
        </p>
      </div>
    </section>

    <section class="py-16 max-w-7xl mx-auto px-6">
      {posts.length === 0 ? (
        <div class="text-center py-24 text-brown-500">아직 작성된 글이 없습니다.</div>
      ) : (
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(p => {
            const author = doctors.find(d => d.slug === p.author_doctor_slug)
            return (
              <a href={`/blog/${p.slug}`} class="group fade-in">
                <div class="aspect-[16/10] rounded-2xl mb-5 overflow-hidden group-hover:shadow-lux transition relative bg-cream">
                  {p.thumbnail_url ? (
                    <img src={p.thumbnail_url} alt={p.title} loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div class="w-full h-full placeholder-img flex items-center justify-center">
                      <i class="fas fa-newspaper text-4xl"></i>
                    </div>
                  )}
                </div>
                <div class="text-xs tracking-widest text-brown-500 mb-3">
                  {author ? `by ${author.name} ${author.position}` : 'DAEGU365'}
                </div>
                <h2 class="display text-2xl font-medium mb-3 group-hover:text-brown-700 transition">{p.title}</h2>
                <p class="text-brown-700 text-sm line-clamp-2 leading-relaxed">{p.excerpt}</p>
                <div class="mt-4 text-xs text-brown-500 flex items-center gap-3">
                  <span><i class="fas fa-eye mr-1"></i>{p.view_count}</span>
                  <span>·</span>
                  <span>{kstYmd(p.created_at).replace(/-/g,'.')}</span>
                </div>
              </a>
            )
          })}
        </div>
      )}
      {totalPages > 1 && (
        <div class="flex flex-wrap justify-center gap-2 mt-16" role="navigation" aria-label="페이지">
          {page > 1 && <a href={page - 1 === 1 ? '/blog' : `/blog?page=${page - 1}`} rel="prev" class="px-4 py-2 rounded-full border border-brown-200 text-sm text-brown-700">이전</a>}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => n === page
            ? <span aria-current="page" class="px-4 py-2 rounded-full bg-brown-900 text-ivory text-sm">{n}</span>
            : <a href={n === 1 ? '/blog' : `/blog?page=${n}`} class="px-4 py-2 rounded-full border border-brown-200 text-sm text-brown-700">{n}</a>)}
          {page < totalPages && <a href={`/blog?page=${page + 1}`} rel="next" class="px-4 py-2 rounded-full border border-brown-200 text-sm text-brown-700">다음</a>}
        </div>
      )}
    </section>
    <Footer />
  </>
)

export const BlogDetailPage = ({ post, author, reviewer, summary, treatment, cases, related }: { post: BlogPost, author: Doctor | null, reviewer: Doctor | null, summary: string, treatment: { slug: string, name: string, short_desc?: string } | null, cases: { id: number, title: string, treatment_period?: string }[], related: BlogPost[] }) => (
  <>
    <Navbar />
    <article class="max-w-3xl mx-auto px-6 py-16">
      <nav class="fade-in mb-10 text-sm text-brown-600 flex flex-wrap gap-2" aria-label="breadcrumb">
        <a href="/" class="hover:text-brown-900">홈</a><span aria-hidden="true">›</span>
        <a href="/blog" class="hover:text-brown-900">블로그</a>
        {treatment && <><span aria-hidden="true">›</span><a href={`/treatments/${treatment.slug}`} class="hover:text-brown-900">{treatment.name}</a></>}
      </nav>
      <header class="mb-10 fade-in">
        <div class="text-xs tracking-[0.3em] text-brown-500 mb-6">JOURNAL</div>
        <h1 class="display text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">{post.title}</h1>
        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-brown-500">
          {author ? <a href={`/doctors/${author.slug}`} class="font-medium text-brown-700 hover:underline">by {author.name} {author.position}</a> : <span class="font-medium text-brown-700">대구365치과</span>}
          <span>·</span>
          <time datetime={kstYmd(post.created_at)}>{kstYmd(post.created_at).replace(/-/g,'.')}</time>
          {kstYmd(post.updated_at) && kstYmd(post.updated_at) !== kstYmd(post.created_at) && <><span>·</span><span>수정 <time datetime={kstYmd(post.updated_at)}>{kstYmd(post.updated_at).replace(/-/g,'.')}</time></span></>}
        </div>
      </header>

      {summary && (
        <div class="answer-summary fade-in mb-12 rounded-2xl border border-brown-200 bg-cream px-6 py-5" style="border-left:4px solid #c9a876;">
          <p class="text-xs tracking-widest text-brown-500 mb-2">핵심 답변</p>
          <p class="text-brown-800 text-lg leading-relaxed">{summary}</p>
        </div>
      )}

      {post.thumbnail_url && (
        <div class="aspect-[16/10] rounded-2xl overflow-hidden mb-12 fade-in">
          <img src={post.thumbnail_url} alt={post.title} class="w-full h-full object-cover" decoding="async" fetchpriority="high" />
        </div>
      )}

      <div class="prose-dental fade-in" dangerouslySetInnerHTML={{__html: post.content}}></div>

      {reviewer && (
        <aside class="mt-16 flex items-start gap-5 lux-card fade-in" aria-label="작성·감수 의료진">
          <a href={`/doctors/${reviewer.slug}`} class="shrink-0">
            {reviewer.photo_url
              ? <img src={reviewer.photo_url} alt={`${reviewer.name} ${reviewer.position}`} width="72" height="72" loading="lazy" decoding="async" class="w-[72px] h-[72px] rounded-full object-cover object-top" />
              : <div class="w-[72px] h-[72px] rounded-full bg-cream flex items-center justify-center"><i class="fas fa-user-doctor text-2xl text-brown-500"></i></div>}
          </a>
          <div class="min-w-0">
            <div class="text-xs tracking-widest text-brown-500 mb-1">{author ? '작성' : '작성 대구365치과 · 감수'}</div>
            <a href={`/doctors/${reviewer.slug}`} class="display text-xl font-medium hover:text-brown-700">{reviewer.name} <span class="text-sm text-brown-600">{reviewer.position}</span></a>
            {reviewer.message && <p class="text-sm text-brown-700 mt-2">"{reviewer.message}"</p>}
            <p class="text-xs text-brown-500 mt-2">최종 업데이트 <time datetime={kstYmd(post.updated_at || post.created_at)}>{kstYmd(post.updated_at || post.created_at).replace(/-/g,'.')}</time></p>
          </div>
        </aside>
      )}

      <p class="mt-8 text-xs text-brown-500">※ 이 글은 일반적인 치과 정보입니다. 정확한 진단과 치료 방법은 검사 후 결정되며, 개인에 따라 결과가 다를 수 있습니다.</p>

      {treatment && (
        <section class="mt-12 fade-in">
          <h2 class="display text-2xl font-medium mb-4">관련 진료</h2>
          <a href={`/treatments/${treatment.slug}`} class="lux-card block">
            <div class="display text-xl font-medium mb-1">{treatment.name} →</div>
            {treatment.short_desc && <p class="text-sm text-brown-700">{treatment.short_desc}</p>}
          </a>
          {cases.length > 0 && (
            <ul class="mt-4 space-y-2 text-sm">
              {cases.map(cs => <li><a href={`/before-after/${cs.id}`} class="text-brown-700 hover:underline">비포애프터: {cs.title}</a></li>)}
            </ul>
          )}
        </section>
      )}

      {related.length > 0 && (
        <section class="mt-20 pt-12 border-t border-brown-200">
          <h2 class="display text-2xl font-medium mb-8">{treatment ? '관련 칼럼' : '다른 이야기'}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            {related.map(r => (
              <a href={`/blog/${r.slug}`} class="group">
                <div class="aspect-[16/9] rounded-xl mb-3 overflow-hidden relative bg-cream">
                  {r.thumbnail_url ? (
                    <img src={r.thumbnail_url} alt={r.title} loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div class="w-full h-full placeholder-img flex items-center justify-center"><i class="fas fa-newspaper"></i></div>
                  )}
                </div>
                <h3 class="display text-lg font-medium group-hover:text-brown-700">{r.title}</h3>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
    <Footer />
  </>
)
