// 칼럼(블로그)·비포애프터 SEO/AEO 헬퍼 — PFWE-COLUMN-CASE-SEO.md 표준 (2026-10-03)
// 원칙: 본문·DB 값만 사용(새 문장 생성 없음), 화면과 JSON-LD 일치.

/** 블로그 글 → 관련 진료 slug (D1 blog_posts 에 진료 컬럼이 없어 제목 키워드로 매핑). 없으면 '' */
const BLOG_TX_RULES: [RegExp, string][] = [
  [/미백/, 'whitening'],
  [/라미네이트|VINIQUE|비니크/i, 'lamineer'],
  [/인비절라인|교정/, 'ortho'],
  [/임플란트|뼈이식/, 'implant'],
  [/신경치료|크라운|충치/, 'cavity-endo-crown'],
  [/스케일링|잇몸|치주/, 'perio'],
  [/소아|아이/, 'pediatric'],
]
export function blogTreatmentSlug(title: string): string {
  for (const [re, slug] of BLOG_TX_RULES) if (re.test(title || '')) return slug
  return ''
}
/** 진료 페이지 slug → 같은 그룹으로 보는 slug 목록 (임플란트·라미네이트는 두 slug 통합 운영) */
export function treatmentGroup(slug: string): string[] {
  if (slug === 'implant' || slug === 'implant-general') return ['implant', 'implant-general']
  if (slug === 'lamineer' || slug === 'vinique') return ['lamineer', 'vinique']
  return [slug]
}

/** 비포애프터 doctor_slug 옛 표기 → doctors.slug (같은 의료진, 표기만 다름) */
export const DOCTOR_SLUG_ALIAS: Record<string, string> = {
  'kim-sung-ju': 'kim-seongju',
  'kim-sang-won': 'kim-sangwon',
}

export function stripTags(html: string): string {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
}

/** 핵심 답변: 작성자 요약(excerpt) 우선, 없으면 본문 첫 문단 앞 2~3문장 */
export function answerSummary(excerpt: string | null | undefined, html: string): string {
  const ex = (excerpt || '').trim()
  if (ex.length >= 20) return ex
  const p = (html || '').match(/<p(?:\s[^>]*)?>((?:(?!<\/p>)[\s\S])*)<\/p>/i)
  if (!p) return ''
  const text = stripTags(p[1])
  if (text.length < 40) return ''
  const parts = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text]
  let out = ''
  for (const s of parts.slice(0, 3)) { if (out && (out + s).length > 220) break; out += s }
  return out.trim()
}

/** 질문형 H3(…?) + 바로 다음 <p> → FAQ. 화면 문장 그대로 */
export function faqsFromArticleHtml(html: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = []
  const re = /<h3[^>]*>((?:(?!<\/h3>)[\s\S])*)<\/h3>\s*<p(?:\s[^>]*)?>((?:(?!<\/p>)[\s\S])*)<\/p>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html || '')) !== null) {
    const q = stripTags(m[1]).replace(/^\d+\.\s*/, '').trim()
    const a = stripTags(m[2])
    if (/[?？]$/.test(q) && a && !out.some(x => x.q === q)) out.push({ q, a })
  }
  return out.slice(0, 10)
}

/** 본문 이미지: alt 없으면 제목 기반, loading=lazy·decoding=async */
export function enhanceContentImages(html: string, title: string): string {
  let n = 0
  return (html || '').replace(/<img\b([^>]*)>/gi, (_m, attrs: string) => {
    let a = attrs.replace(/\s*\/\s*$/, '')
    n++
    if (!/\salt\s*=\s*["'][^"']+["']/i.test(a)) a = a.replace(/\salt\s*=\s*["']\s*["']/i, '') + ` alt="${title.replace(/"/g, '&quot;')} 관련 이미지 ${n}"`
    if (!/\sloading\s*=/i.test(a)) a += ' loading="lazy"'
    if (!/\sdecoding\s*=/i.test(a)) a += ' decoding="async"'
    return `<img${a}>`
  })
}

/** 치료 기간 값이 단위 없는 숫자('3')면 의미가 불분명하므로 요약에서 제외 */
export function periodLabel(v: string | null | undefined): string {
  const s = (v || '').trim()
  return s && /[^\d\s.]/.test(s) ? s : ''
}
