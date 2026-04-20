import { Navbar, Footer } from '../components/Layout'
import type { BlogPost, Doctor } from '../lib/types'

export const BlogListPage = ({ posts, doctors }: { posts: BlogPost[], doctors: Doctor[] }) => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="section-label mb-6">JOURNAL</div>
        <h1 class="t-display mb-6 fade-in">
          대구365치과 <em class="italic text-brown-700">블로그</em>
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
                <div class="aspect-[16/10] placeholder-img rounded-2xl mb-5 overflow-hidden group-hover:shadow-lux transition">
                  <i class="fas fa-newspaper text-4xl"></i>
                </div>
                <div class="text-xs tracking-widest text-brown-500 mb-3">
                  {author ? `by ${author.name} ${author.position}` : 'DAEGU365'}
                </div>
                <h2 class="display text-2xl font-medium mb-3 group-hover:text-brown-700 transition">{p.title}</h2>
                <p class="text-brown-700 text-sm line-clamp-2 leading-relaxed">{p.excerpt}</p>
                <div class="mt-4 text-xs text-brown-500 flex items-center gap-3">
                  <span><i class="fas fa-eye mr-1"></i>{p.view_count}</span>
                  <span>·</span>
                  <span>{p.created_at?.split('T')[0]?.replace(/-/g,'.') || ''}</span>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </section>
    <Footer />
  </>
)

export const BlogDetailPage = ({ post, author, related }: { post: BlogPost, author: Doctor | null, related: BlogPost[] }) => (
  <>
    <Navbar />
    <article class="max-w-3xl mx-auto px-6 py-16">
      <div class="fade-in mb-10">
        <a href="/blog" class="text-sm text-brown-600 hover:text-brown-900">← 블로그 목록</a>
      </div>
      <header class="mb-12 fade-in">
        <div class="text-xs tracking-[0.3em] text-brown-500 mb-6">JOURNAL</div>
        <h1 class="display text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">{post.title}</h1>
        {post.excerpt && <p class="text-brown-700 text-lg italic display">{post.excerpt}</p>}
        <div class="mt-6 flex items-center gap-3 text-sm text-brown-500">
          {author && <a href={`/doctors/${author.slug}`} class="font-medium text-brown-700 hover:underline">by {author.name} {author.position}</a>}
          <span>·</span>
          <span>{post.created_at?.split('T')[0]?.replace(/-/g,'.') || ''}</span>
          <span>·</span>
          <span><i class="fas fa-eye mr-1"></i>{post.view_count}</span>
        </div>
      </header>

      {post.thumbnail_url && (
        <div class="aspect-[16/10] rounded-2xl overflow-hidden mb-12 fade-in">
          <img src={post.thumbnail_url} alt={post.title} class="w-full h-full object-cover" />
        </div>
      )}

      <div class="prose-dental fade-in" dangerouslySetInnerHTML={{__html: post.content}}></div>

      {related.length > 0 && (
        <section class="mt-24 pt-12 border-t border-brown-200">
          <h2 class="display text-2xl font-medium mb-8">다른 이야기</h2>
          <div class="grid md:grid-cols-2 gap-6">
            {related.map(r => (
              <a href={`/blog/${r.slug}`} class="group">
                <div class="aspect-[16/9] placeholder-img rounded-xl mb-3"><i class="fas fa-newspaper"></i></div>
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
