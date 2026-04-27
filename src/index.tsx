import { Hono } from 'hono'
import { renderer } from './renderer'
import type { Bindings } from './lib/types'
import {
  hashPassword, verifyPassword, setSession, getSession, clearSession,
  setAdmin, isAdmin, clearAdmin
} from './lib/auth'

// Pages
import { HomePage } from './pages/home'
import { MissionPage } from './pages/mission'
import { DoctorsListPage, DoctorDetailPage } from './pages/doctors'
import { TreatmentsListPage, TreatmentDetailPage } from './pages/treatments'
import { BeforeAfterListPage, BeforeAfterDetailPage } from './pages/beforeafter'
import { BlogListPage, BlogDetailPage } from './pages/blog'
import {
  NoticeListPage, NoticeDetailPage,
  DictionaryListPage, DictionaryDetailPage,
  FAQPage, DirectionsPage, HoursPage
} from './pages/misc'
import { FeesPage } from './pages/fees'
import { SignupPage, LoginPage, AdminLoginPage } from './pages/auth'
import { Navbar, Footer } from './components/Layout'
import {
  AdminDashboard, AdminMembersPage,
  AdminBAListPage, AdminBAFormPage,
  AdminBlogListPage, AdminBlogFormPage,
  AdminNoticesListPage, AdminNoticeFormPage
} from './pages/admin'

const app = new Hono<{ Bindings: Bindings }>()
app.use(renderer)

// ============ Helpers ============
async function getAdminPassword(DB: D1Database): Promise<string> {
  const r = await DB.prepare("SELECT value FROM settings WHERE key='admin_password'").first<{ value: string }>()
  return r?.value || 'daegu365!admin'
}

// ============ Public pages ============
app.get('/', (c) => c.render(<HomePage />, {
  title: '대구 북구 치과 · 수면임플란트 · 인비절라인 전문',
  description: '치과가 두려웠던 의사가 만든 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.',
  canonical: 'https://daegu365dc.pages.dev/'
}))

app.get('/mission', (c) => c.render(<MissionPage />, {
  title: '병원 미션',
  description: '치과가 무서웠던 한 의사의 다짐 — 치과 진입의 허들을 낮추고 경험의 혁신을 이룩한다.',
  canonical: 'https://daegu365dc.pages.dev/mission'
}))

// --- Doctors ---
app.get('/doctors', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY is_representative DESC, display_order, id').all()
  return c.render(<DoctorsListPage doctors={r.results as any} />, {
    title: '의료진 소개',
    description: '대구365치과 7인의 의료진. 보존·치주·소아·교정·보철·심미 각 분야 전문 협진.',
    canonical: 'https://daegu365dc.pages.dev/doctors'
  })
})

app.get('/doctors/:slug', async (c) => {
  const slug = c.req.param('slug')
  const doctor = await c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(slug).first<any>()
  if (!doctor) return c.notFound()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments').all()
  const cases = await c.env.DB.prepare('SELECT * FROM before_afters WHERE doctor_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
  return c.render(
    <DoctorDetailPage doctor={doctor} treatments={treatments.results as any} cases={cases.results as any} />, {
      title: `${doctor.name} ${doctor.position}`,
      description: `${doctor.name} ${doctor.position} — ${doctor.philosophy?.substring(0,140) || ''}`,
      canonical: `https://daegu365dc.pages.dev/doctors/${slug}`,
      jsonLd: {
        "@context":"https://schema.org","@type":"Physician",
        "name": doctor.name, "jobTitle": doctor.position,
        "worksFor": {"@type":"Dentist","name":"대구365치과"},
        "description": doctor.philosophy
      }
    }
  )
})

// --- Treatments ---
app.get('/treatments', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  return c.render(<TreatmentsListPage treatments={r.results as any} />, {
    title: '진료 안내',
    description: '대구365치과의 전체 진료 과목. 수면임플란트·라미네이트·인비절라인 3대 핵심 진료.',
    canonical: 'https://daegu365dc.pages.dev/treatments'
  })
})

app.get('/treatments/:slug', async (c) => {
  const slug = c.req.param('slug')
  const treatment = await c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(slug).first<any>()
  if (!treatment) return c.notFound()
  await c.env.DB.prepare('UPDATE treatments SET view_count=view_count+1 WHERE id=?').bind(treatment.id).run()

  const faqs = await c.env.DB.prepare('SELECT * FROM faqs WHERE treatment_slug=? ORDER BY display_order, id').bind(slug).all()
  // Doctors who specialize
  const allDocs = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const doctors = (allDocs.results as any[]).filter(d => {
    try { return JSON.parse(d.specialties || '[]').includes(slug) } catch { return false }
  })
  const cases = await c.env.DB.prepare('SELECT * FROM before_afters WHERE treatment_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
  const dictTerms = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category=? ORDER BY id LIMIT 20').bind(slug).all()

  // FAQPage schema
  const faqJsonLd = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": (faqs.results as any[]).map((f: any) => ({
      "@type":"Question","name":f.question,
      "acceptedAnswer":{"@type":"Answer","text":f.answer}
    }))
  }

  return c.render(
    <TreatmentDetailPage
      treatment={treatment}
      faqs={faqs.results as any}
      doctors={doctors}
      cases={cases.results as any}
      dictTerms={dictTerms.results as any}
    />, {
      title: `${treatment.name} - ${treatment.tagline || ''}`,
      description: `${treatment.short_desc} — 대구365치과 ${treatment.name} 전문 진료.`,
      canonical: `https://daegu365dc.pages.dev/treatments/${slug}`,
      jsonLd: faqJsonLd
    }
  )
})

// --- Before/After ---
app.get('/before-after', async (c) => {
  const session = await getSession(c)
  const { treatment, doctor, region, age, gender } = c.req.query()

  const where: string[] = ['is_published=1']
  const binds: any[] = []
  if (treatment) { where.push('treatment_slug=?'); binds.push(treatment) }
  if (doctor) { where.push('doctor_slug=?'); binds.push(doctor) }
  if (age) { where.push('age_group=?'); binds.push(age) }
  if (gender) { where.push('gender=?'); binds.push(gender) }
  if (region) {
    where.push('(region_dong LIKE ? OR region_sigungu LIKE ? OR region_sido LIKE ?)')
    binds.push(`%${region}%`, `%${region}%`, `%${region}%`)
  }
  const q = `SELECT * FROM before_afters WHERE ${where.join(' AND ')} ORDER BY id DESC`
  const items = await c.env.DB.prepare(q).bind(...binds).all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()

  return c.render(
    <BeforeAfterListPage
      items={items.results as any}
      doctors={doctors.results as any}
      treatments={treatments.results as any}
      filters={{ treatment, doctor, region, age, gender }}
      isLoggedIn={!!session}
    />, {
      title: '비포애프터 — 실제 치료 사례',
      description: '대구365치과 실제 치료 사례. 수면임플란트, 라미네이트, 인비절라인 등 검증된 결과.',
      canonical: 'https://daegu365dc.pages.dev/before-after'
    }
  )
})

app.get('/before-after/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  if (!id) return c.notFound()
  const item = await c.env.DB.prepare('SELECT * FROM before_afters WHERE id=? AND is_published=1').bind(id).first<any>()
  if (!item) return c.notFound()
  await c.env.DB.prepare('UPDATE before_afters SET view_count=view_count+1 WHERE id=?').bind(id).run()

  const [doctor, treatment] = await Promise.all([
    item.doctor_slug ? c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(item.doctor_slug).first<any>() : Promise.resolve(null),
    item.treatment_slug ? c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(item.treatment_slug).first<any>() : Promise.resolve(null),
  ])

  const session = await getSession(c)
  return c.render(
    <BeforeAfterDetailPage item={item} doctor={doctor} treatment={treatment} isLoggedIn={!!session} />, {
      title: `${item.title} · 치료사례`,
      description: item.description?.substring(0, 160) || '',
      canonical: `https://daegu365dc.pages.dev/before-after/${id}`
    }
  )
})

// --- Blog ---
app.get('/blog', async (c) => {
  const posts = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE is_published=1 ORDER BY created_at DESC').all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors').all()
  return c.render(<BlogListPage posts={posts.results as any} doctors={doctors.results as any} />, {
    title: '블로그 · 의료진 칼럼',
    description: '대구365치과 의료진이 직접 쓰는 치과 칼럼과 건강 이야기.',
    canonical: 'https://daegu365dc.pages.dev/blog'
  })
})

app.get('/blog/:slug', async (c) => {
  const slug = c.req.param('slug')
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug=? AND is_published=1').bind(slug).first<any>()
  if (!post) return c.notFound()
  await c.env.DB.prepare('UPDATE blog_posts SET view_count=view_count+1 WHERE id=?').bind(post.id).run()

  const author = post.author_doctor_slug
    ? await c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(post.author_doctor_slug).first<any>()
    : null
  const related = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id!=? AND is_published=1 ORDER BY id DESC LIMIT 4').bind(post.id).all()

  return c.render(<BlogDetailPage post={post} author={author} related={related.results as any} />, {
    title: post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords,
    canonical: `https://daegu365dc.pages.dev/blog/${slug}`,
    jsonLd: {
      "@context":"https://schema.org","@type":"Article",
      "headline": post.title, "description": post.meta_description || post.excerpt,
      "datePublished": post.created_at, "dateModified": post.updated_at,
      "author": author ? {"@type":"Person","name":author.name} : {"@type":"Organization","name":"대구365치과"}
    }
  })
})

// --- Notices ---
app.get('/notices', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM notices WHERE is_published=1 ORDER BY is_main DESC, id DESC').all()
  return c.render(<NoticeListPage notices={r.results as any} />, {
    title: '공지사항',
    canonical: 'https://daegu365dc.pages.dev/notices'
  })
})

app.get('/notices/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const n = await c.env.DB.prepare('SELECT * FROM notices WHERE id=? AND is_published=1').bind(id).first<any>()
  if (!n) return c.notFound()
  await c.env.DB.prepare('UPDATE notices SET view_count=view_count+1 WHERE id=?').bind(id).run()
  return c.render(<NoticeDetailPage notice={n} />, {
    title: n.title, description: n.content?.replace(/<[^>]+>/g,'').substring(0,160),
    canonical: `https://daegu365dc.pages.dev/notices/${id}`
  })
})

// --- Dictionary ---
app.get('/dictionary', async (c) => {
  const { q, category } = c.req.query()
  const where: string[] = []
  const binds: any[] = []
  if (q) { where.push('(term LIKE ? OR term_en LIKE ? OR short_desc LIKE ?)'); binds.push(`%${q}%`,`%${q}%`,`%${q}%`) }
  if (category) { where.push('category=?'); binds.push(category) }
  const sql = 'SELECT * FROM dictionary' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY term LIMIT 1000'
  const r = await c.env.DB.prepare(sql).bind(...binds).all()
  return c.render(<DictionaryListPage items={r.results as any} selectedCategory={category} query={q} />, {
    title: '치과 백과사전 · 500+ 용어',
    description: '치과 용어 500여 개를 담은 대구365치과 백과사전. 임플란트·교정·라미네이트 등 전문 용어 해설.',
    canonical: 'https://daegu365dc.pages.dev/dictionary'
  })
})

app.get('/dictionary/:slug', async (c) => {
  const slug = c.req.param('slug')
  const entry = await c.env.DB.prepare('SELECT * FROM dictionary WHERE slug=?').bind(slug).first<any>()
  if (!entry) return c.notFound()
  await c.env.DB.prepare('UPDATE dictionary SET view_count=view_count+1 WHERE id=?').bind(entry.id).run()

  const relSlugs: string[] = (() => { try { return JSON.parse(entry.related_treatments || '[]') } catch { return [] } })()
  let relatedTreatments: any[] = []
  if (relSlugs.length) {
    const ph = relSlugs.map(() => '?').join(',')
    const rr = await c.env.DB.prepare(`SELECT * FROM treatments WHERE slug IN (${ph})`).bind(...relSlugs).all()
    relatedTreatments = rr.results as any[]
  }
  const relatedEntries = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category=? AND id!=? ORDER BY RANDOM() LIMIT 6').bind(entry.category, entry.id).all()

  return c.render(<DictionaryDetailPage entry={entry} relatedTreatments={relatedTreatments} relatedEntries={relatedEntries.results as any} />, {
    title: `${entry.term} - 치과 용어사전`,
    description: entry.short_desc,
    canonical: `https://daegu365dc.pages.dev/dictionary/${slug}`,
    jsonLd: {
      "@context":"https://schema.org","@type":"DefinedTerm",
      "name": entry.term, "description": entry.short_desc,
      "inDefinedTermSet": "대구365치과 치과 백과사전"
    }
  })
})

// --- FAQ aggregate ---
app.get('/faq', async (c) => {
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  const faqs = await c.env.DB.prepare('SELECT * FROM faqs WHERE treatment_slug IS NOT NULL ORDER BY treatment_slug, display_order').all()
  const grouped: Record<string, any[]> = {}
  for (const f of faqs.results as any[]) {
    const k = f.treatment_slug
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(f)
  }
  return c.render(<FAQPage grouped={grouped} treatments={treatments.results as any} />, {
    title: '자주 묻는 질문 · 전체 FAQ',
    description: '진료 과목별 자주 묻는 질문 200개 이상. 대구365치과가 성심껏 답변드립니다.',
    canonical: 'https://daegu365dc.pages.dev/faq',
    jsonLd: {
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity": (faqs.results as any[]).slice(0, 50).map((f: any) => ({
        "@type":"Question","name":f.question,
        "acceptedAnswer":{"@type":"Answer","text":f.answer}
      }))
    }
  })
})

// --- Visitor info ---
app.get('/directions', (c) => c.render(<DirectionsPage />, {
  title: '오시는 길 · 내원 안내', canonical: 'https://daegu365dc.pages.dev/directions'
}))
app.get('/hours', (c) => c.render(<HoursPage />, {
  title: '진료시간', canonical: 'https://daegu365dc.pages.dev/hours'
}))
app.get('/fees', (c) => c.render(<FeesPage />, {
  title: '비급여 의료수가표 · 수가 안내',
  description: '대구365치과 비급여 의료수가표. 임플란트·교정·라미네이트·보철·소아치과 등 전 항목 투명 공개. 진료 전 정확한 비용을 안내드립니다.',
  canonical: 'https://daegu365dc.pages.dev/fees'
}))

// --- Region SEO pages ---
app.get('/region/:slug', async (c) => {
  const slug = c.req.param('slug')
  const r = await c.env.DB.prepare('SELECT * FROM region_seo WHERE slug=?').bind(slug).first<any>()
  if (!r) return c.notFound()
  await c.env.DB.prepare('UPDATE region_seo SET view_count=view_count+1 WHERE id=?').bind(r.id).run()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC').all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors WHERE is_representative=1 OR display_order<=3').all()
  return c.render(
    <RegionSEOInline r={r} treatments={treatments.results as any} doctors={doctors.results as any} />,
    {
      title: r.title, description: r.meta_description,
      canonical: `https://daegu365dc.pages.dev/region/${slug}`
    }
  )
})

// ============ Address autocomplete API ============
app.get('/api/addresses', async (c) => {
  const q = (c.req.query('q') || '').trim()
  if (!q) return c.json({ items: [] })
  const items = await c.env.DB.prepare(
    'SELECT sido, sigungu, dong, full_name FROM addresses WHERE dong LIKE ? OR full_name LIKE ? OR sigungu LIKE ? LIMIT 12'
  ).bind(`${q}%`, `%${q}%`, `${q}%`).all()
  return c.json({ items: items.results })
})

// ============ R2 video streaming (with HTTP Range support) ============
// 의료진 인터뷰 영상 슬러그 → R2 객체 키 매핑
const VIDEO_KEYS: Record<string, string> = {
  'jung-jaeheon-interview': 'videos/jung-jaeheon-interview.mp4',
}

app.on(['GET', 'HEAD'], '/api/videos/:slug', async (c) => {
  const slug = c.req.param('slug')
  const key = VIDEO_KEYS[slug]
  if (!key) return c.notFound()

  const range = c.req.header('range')

  // HEAD 또는 Range 없는 GET → 메타데이터만 (HEAD) 또는 전체 스트림 (GET)
  if (!range) {
    const obj = c.req.method === 'HEAD'
      ? await c.env.R2.head(key)
      : await c.env.R2.get(key)
    if (!obj) return c.notFound()
    const headers = new Headers()
    headers.set('Content-Type', 'video/mp4')
    headers.set('Content-Length', String(obj.size))
    headers.set('Accept-Ranges', 'bytes')
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    if (c.req.method === 'HEAD') return new Response(null, { status: 200, headers })
    return new Response((obj as R2ObjectBody).body, { status: 200, headers })
  }

  // Range 요청 파싱: "bytes=START-END"
  const m = /^bytes=(\d*)-(\d*)$/.exec(range)
  if (!m) return new Response('Invalid Range', { status: 416 })

  // 먼저 head로 전체 사이즈 확인
  const head = await c.env.R2.head(key)
  if (!head) return c.notFound()
  const total = head.size

  let start = m[1] ? parseInt(m[1], 10) : 0
  let end = m[2] ? parseInt(m[2], 10) : total - 1
  if (isNaN(start) || isNaN(end) || start > end || end >= total) {
    return new Response('Range Not Satisfiable', {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` }
    })
  }

  const obj = await c.env.R2.get(key, {
    range: { offset: start, length: end - start + 1 }
  })
  if (!obj) return c.notFound()

  const headers = new Headers()
  headers.set('Content-Type', 'video/mp4')
  headers.set('Content-Length', String(end - start + 1))
  headers.set('Content-Range', `bytes ${start}-${end}/${total}`)
  headers.set('Accept-Ranges', 'bytes')
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  return new Response((obj as R2ObjectBody).body, { status: 206, headers })
})

// ============ Auth ============
app.get('/signup', (c) => c.render(<SignupPage />, { title: '회원가입' }))

app.post('/signup', async (c) => {
  const body = await c.req.parseBody()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const phone = String(body.phone || '').trim()
  const password = String(body.password || '')
  const privacy = body.privacy ? 1 : 0
  const marketing = body.marketing ? 1 : 0

  if (!name || !email || !phone || !password) {
    return c.render(<SignupPage error="모든 필수 항목을 입력해주세요." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  if (!privacy) {
    return c.render(<SignupPage error="개인정보 수집·이용에 동의해주세요." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  if (password.length < 6) {
    return c.render(<SignupPage error="비밀번호는 6자 이상이어야 합니다." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }

  const exists = await c.env.DB.prepare('SELECT id FROM members WHERE email=?').bind(email).first()
  if (exists) {
    return c.render(<SignupPage error="이미 가입된 이메일입니다." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  const hash = await hashPassword(password)
  const r = await c.env.DB.prepare(
    'INSERT INTO members (name,email,phone,password_hash,privacy_agreed,marketing_agreed) VALUES (?,?,?,?,?,?)'
  ).bind(name, email, phone, hash, privacy, marketing).run()
  await setSession(c, Number(r.meta.last_row_id), email)
  return c.redirect('/before-after')
})

app.get('/login', (c) => {
  const next = c.req.query('next')
  return c.render(<LoginPage next={next} />, { title: '로그인' })
})

app.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const next = String(body.next || '/before-after')

  const user = await c.env.DB.prepare('SELECT id, password_hash FROM members WHERE email=?').bind(email).first<any>()
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return c.render(<LoginPage error="이메일 또는 비밀번호가 올바르지 않습니다." next={next} />, { title: '로그인' })
  }
  await setSession(c, user.id, email)
  return c.redirect(next)
})

app.get('/logout', (c) => {
  clearSession(c)
  return c.redirect('/')
})

// ============ Admin (password-only) ============
app.get('/admin/login', (c) => c.render(<AdminLoginPage />, { title: '관리자 로그인' }))

app.post('/admin/login', async (c) => {
  const body = await c.req.parseBody()
  const password = String(body.password || '')
  const correct = await getAdminPassword(c.env.DB)
  if (password !== correct) {
    return c.render(<AdminLoginPage error="비밀번호가 올바르지 않습니다." />, { title: '관리자 로그인' })
  }
  await setAdmin(c)
  return c.redirect('/admin')
})

app.get('/admin/logout', (c) => {
  clearAdmin(c)
  return c.redirect('/admin/login')
})

// Admin guard middleware (exempts login/logout)
app.use('/admin/*', async (c, next) => {
  const path = c.req.path
  if (path === '/admin/login' || path === '/admin/logout') return next()
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  return next()
})
app.use('/admin', async (c, next) => {
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  return next()
})

// Admin dashboard
app.get('/admin', async (c) => {
  const DB = c.env.DB
  const stats: any = {}
  const tables = ['members','before_afters','blog_posts','notices','treatments','doctors','faqs','dictionary','region_seo']
  for (const t of tables) {
    const r = await DB.prepare(`SELECT COUNT(*) as n FROM ${t}`).first<any>()
    stats[t] = r?.n || 0
  }
  return c.render(<AdminDashboard stats={stats} />, { title: 'Admin · Dashboard' })
})

app.get('/admin/members', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM members ORDER BY created_at DESC').all()
  return c.render(<AdminMembersPage members={r.results as any} />, { title: 'Admin · 회원' })
})

// --- Admin: Before/After ---
app.get('/admin/before-after', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM before_afters ORDER BY id DESC').all()
  return c.render(<AdminBAListPage items={r.results as any} />, { title: 'Admin · 비포애프터' })
})
app.get('/admin/before-after/new', async (c) => {
  const [doctors, treatments] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all(),
    c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  ])
  return c.render(<AdminBAFormPage doctors={doctors.results as any} treatments={treatments.results as any} />, { title: 'Admin · 새 비포애프터' })
})
app.post('/admin/before-after/new', async (c) => {
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `INSERT INTO before_afters (title,description,pano_before_url,pano_after_url,intra_before_url,intra_after_url,age_group,gender,treatment_slug,region_sido,region_sigungu,region_dong,doctor_slug,treatment_period,is_published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0
  ).run()
  return c.redirect('/admin/before-after')
})
app.get('/admin/before-after/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const [item, doctors, treatments] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM before_afters WHERE id=?').bind(id).first<any>(),
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all(),
    c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  ])
  if (!item) return c.notFound()
  return c.render(<AdminBAFormPage item={item} doctors={doctors.results as any} treatments={treatments.results as any} />, { title: 'Admin · 비포애프터 수정' })
})
app.post('/admin/before-after/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `UPDATE before_afters SET title=?,description=?,pano_before_url=?,pano_after_url=?,intra_before_url=?,intra_after_url=?,age_group=?,gender=?,treatment_slug=?,region_sido=?,region_sigungu=?,region_dong=?,doctor_slug=?,treatment_period=?,is_published=? WHERE id=?`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0, id
  ).run()
  return c.redirect('/admin/before-after')
})
app.post('/admin/before-after/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM before_afters WHERE id=?').bind(id).run()
  return c.redirect('/admin/before-after')
})

// --- Admin: Blog ---
app.get('/admin/blog', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM blog_posts ORDER BY id DESC').all()
  return c.render(<AdminBlogListPage posts={r.results as any} />, { title: 'Admin · 블로그' })
})
app.get('/admin/blog/new', async (c) => {
  const d = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  return c.render(<AdminBlogFormPage doctors={d.results as any} />, { title: 'Admin · 새 블로그' })
})
app.post('/admin/blog/new', async (c) => {
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `INSERT INTO blog_posts (slug,title,excerpt,content,thumbnail_url,author_doctor_slug,meta_description,meta_keywords,is_published)
     VALUES (?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''), b.is_published ? 1 : 0
  ).run()
  return c.redirect('/admin/blog')
})
app.get('/admin/blog/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const [post, doctors] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM blog_posts WHERE id=?').bind(id).first<any>(),
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  ])
  if (!post) return c.notFound()
  return c.render(<AdminBlogFormPage post={post} doctors={doctors.results as any} />, { title: 'Admin · 블로그 수정' })
})
app.post('/admin/blog/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `UPDATE blog_posts SET slug=?,title=?,excerpt=?,content=?,thumbnail_url=?,author_doctor_slug=?,meta_description=?,meta_keywords=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''), b.is_published ? 1 : 0, id
  ).run()
  return c.redirect('/admin/blog')
})
app.post('/admin/blog/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM blog_posts WHERE id=?').bind(id).run()
  return c.redirect('/admin/blog')
})

// --- Admin: Notices ---
app.get('/admin/notices', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM notices ORDER BY is_main DESC, id DESC').all()
  return c.render(<AdminNoticesListPage notices={r.results as any} />, { title: 'Admin · 공지' })
})
app.get('/admin/notices/new', (c) => c.render(<AdminNoticeFormPage />, { title: 'Admin · 새 공지' }))
app.post('/admin/notices/new', async (c) => {
  const b = await c.req.parseBody()
  const isMain = b.is_main ? 1 : 0
  if (isMain) await c.env.DB.prepare('UPDATE notices SET is_main=0').run()
  await c.env.DB.prepare(
    `INSERT INTO notices (title,content,thumbnail_url,is_main,is_published) VALUES (?,?,?,?,?)`
  ).bind(
    String(b.title||''), String(b.content||''),
    String(b.thumbnail_url||'') || null, isMain, b.is_published ? 1 : 0
  ).run()
  return c.redirect('/admin/notices')
})
app.get('/admin/notices/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const n = await c.env.DB.prepare('SELECT * FROM notices WHERE id=?').bind(id).first<any>()
  if (!n) return c.notFound()
  return c.render(<AdminNoticeFormPage notice={n} />, { title: 'Admin · 공지 수정' })
})
app.post('/admin/notices/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  const isMain = b.is_main ? 1 : 0
  if (isMain) await c.env.DB.prepare('UPDATE notices SET is_main=0').run()
  await c.env.DB.prepare(
    `UPDATE notices SET title=?,content=?,thumbnail_url=?,is_main=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.title||''), String(b.content||''),
    String(b.thumbnail_url||'') || null,
    isMain, b.is_published ? 1 : 0, id
  ).run()
  return c.redirect('/admin/notices')
})
app.post('/admin/notices/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM notices WHERE id=?').bind(id).run()
  return c.redirect('/admin/notices')
})

// ============ robots + sitemap ============
app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://daegu365dc.pages.dev/sitemap.xml\n`, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
})

app.get('/sitemap.xml', async (c) => {
  const base = 'https://daegu365dc.pages.dev'
  const [doctors, treatments, blogs, ba, dict, regions] = await Promise.all([
    c.env.DB.prepare('SELECT slug FROM doctors').all(),
    c.env.DB.prepare('SELECT slug FROM treatments').all(),
    c.env.DB.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published=1').all(),
    c.env.DB.prepare('SELECT id FROM before_afters WHERE is_published=1').all(),
    c.env.DB.prepare('SELECT slug FROM dictionary').all(),
    c.env.DB.prepare('SELECT slug FROM region_seo').all()
  ])

  const urls: string[] = []
  const add = (loc: string, pri='0.8', chf='weekly') => {
    urls.push(`<url><loc>${base}${loc}</loc><priority>${pri}</priority><changefreq>${chf}</changefreq></url>`)
  }
  add('/', '1.0', 'daily')
  add('/mission', '0.9')
  add('/doctors', '0.9')
  add('/treatments', '0.9')
  add('/before-after', '0.9')
  add('/blog', '0.9')
  add('/notices', '0.7')
  add('/dictionary', '0.8')
  add('/faq', '0.8')
  add('/directions', '0.7')
  add('/hours', '0.6')
  add('/fees', '0.6')
  ;(doctors.results as any[]).forEach(d => add(`/doctors/${d.slug}`, '0.8'))
  ;(treatments.results as any[]).forEach(t => add(`/treatments/${t.slug}`, '0.9'))
  ;(blogs.results as any[]).forEach(b => add(`/blog/${b.slug}`, '0.7'))
  ;(ba.results as any[]).forEach(b => add(`/before-after/${b.id}`, '0.7'))
  ;(dict.results as any[]).forEach(d => add(`/dictionary/${d.slug}`, '0.5'))
  ;(regions.results as any[]).forEach(r => add(`/region/${r.slug}`, '0.7'))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  return c.text(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8' })
})

// ============ Region SEO inline component ============
function RegionSEOInline({ r, treatments, doctors }: any) {
  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <div class="section-label mb-6">REGIONAL</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">{r.h1}</h1>
          <p class="text-brown-700 max-w-2xl mx-auto fade-in">{r.meta_description}</p>
        </div>
      </section>
      <section class="py-16 max-w-4xl mx-auto px-6 prose-dental fade-in" dangerouslySetInnerHTML={{__html: r.content}}></section>

      <section class="py-16 bg-cream">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="display text-3xl font-light mb-8">주요 진료</h2>
          <div class="grid md:grid-cols-3 gap-4">
            {treatments.filter((t: any) => t.is_core).map((t: any) => (
              <a href={`/treatments/${t.slug}`} class="lux-card">
                <div class="display text-2xl font-medium mb-2">{t.name}</div>
                <p class="text-brown-700 text-sm">{t.short_desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default app
