// ============ Dynamic OG Image Generation ============
// 페이지 타입별 5종 SVG 템플릿: default / doctor / treatment / blog / before-after
// 카톡·페북·네이버 미리보기 호환을 위해 SVG → PNG 변환 없이도 OG에 SVG 직접 노출 가능한
// Cloudflare 환경에서 가장 가벼운 방법 = SVG 응답 + image/svg+xml.
// 단, 카톡 등은 SVG를 안 읽으므로 동일 URL을 .png 확장자로 받아서 imagemagick/satori 없이는 PNG로 줄 수 없음 →
// 따라서 본 구현은 SVG를 직접 렌더링하되, 페이지에서 og:image 메타에 .svg URL을 명시하고
// 카카오/페이스북에는 별도 og-default.png 정적 파일을 fallback으로 둘 수 있도록 ogImagePng 옵션도 제공.

const BRAND = {
  bg1: '#1a120a',
  bg2: '#4a3520',
  gold: '#c9a876',
  goldDim: '#b89468',
  cream: '#fdfbf7',
  brown: '#6b4c2a',
  brownLight: '#8a6235',
  brownDeep: '#2c1f14',
}

// XML 안전 이스케이프
export function xmlEscape(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// 텍스트 길이 기준 자동 폰트 사이즈 + 줄바꿈
function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  if (!text) return []
  const words = text.split('')
  const lines: string[] = []
  let cur = ''
  for (const ch of words) {
    if ((cur + ch).length > maxCharsPerLine) {
      lines.push(cur)
      cur = ch
      if (lines.length >= maxLines) break
    } else {
      cur += ch
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur)
  // 마지막 줄이 잘렸을 때 ...
  if (text.length > lines.join('').length && lines.length === maxLines) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + '…'
  }
  return lines
}

// 동적 폰트 사이즈 (제목 길이 기반)
function titleFontSize(text: string): number {
  const len = (text || '').length
  if (len <= 12) return 96
  if (len <= 18) return 80
  if (len <= 26) return 68
  if (len <= 36) return 56
  return 48
}

// ============ 공통 SVG 헤더 (그라디언트·로고 카드) ============
function commonDefs() {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.bg1}"/>
      <stop offset="100%" stop-color="${BRAND.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.7">
      <stop offset="0%" stop-color="${BRAND.gold}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${BRAND.gold}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="overlay" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="${BRAND.bg1}" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="${BRAND.bg1}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${BRAND.bg1}" stop-opacity="0.15"/>
    </linearGradient>
    <filter id="softShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="2"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`
}

// 365 골드 서클 로고
function brandBadge(x: number, y: number, r: number = 60) {
  return `
  <g transform="translate(${x},${y})">
    <circle cx="0" cy="0" r="${r}" fill="none" stroke="${BRAND.gold}" stroke-width="2"/>
    <text x="0" y="${r * 0.27}" text-anchor="middle" font-family="Georgia, 'Noto Serif KR', serif" font-size="${r * 0.85}" fill="${BRAND.gold}">365</text>
  </g>`
}

// 푸터: 클리닉 정보
function footerInfo() {
  return `
  <text x="80" y="565" font-family="'Pretendard', system-ui, sans-serif" font-size="22" fill="${BRAND.goldDim}" letter-spacing="1">대구 북구 침산로 148 · 053-357-0365 · daegu365dc.kr</text>`
}

// ============ 1. DEFAULT (홈/기타) ============
export function ogDefault(opts: { title?: string; subtitle?: string }): string {
  const title = opts.title || '치과가 두려워도'
  const sub = opts.subtitle || '괜찮습니다.'
  const titleSize = titleFontSize(title)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${commonDefs()}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="160" font-family="Georgia, 'Noto Serif KR', serif" font-size="26" fill="${BRAND.gold}" letter-spacing="8">DAEGU 365 DENTAL CLINIC</text>
  <line x1="80" y1="190" x2="200" y2="190" stroke="${BRAND.gold}" stroke-width="2"/>
  <text x="80" y="${230 + titleSize * 0.7}" font-family="'Pretendard', 'Noto Sans KR', sans-serif" font-size="${titleSize}" font-weight="600" fill="${BRAND.cream}">${xmlEscape(title)}</text>
  <text x="80" y="${230 + titleSize * 0.7 + titleSize * 1.05}" font-family="Georgia, 'Noto Serif KR', serif" font-size="${titleSize}" font-weight="400" font-style="italic" fill="${BRAND.gold}">${xmlEscape(sub)}</text>
  <text x="80" y="510" font-family="'Pretendard', system-ui, sans-serif" font-size="24" fill="${BRAND.goldDim}">수면임플란트 · 인비절라인 · 라미네이트 전문</text>
  ${footerInfo()}
  ${brandBadge(1050, 150, 80)}
</svg>`
}

// ============ 2. DOCTOR (의료진 개인 페이지) ============
export function ogDoctor(opts: { name: string; position: string; specialty?: string; photo?: string }): string {
  const { name, position, specialty } = opts
  const titleSize = titleFontSize(name)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${commonDefs()}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="120" font-family="Georgia, 'Noto Serif KR', serif" font-size="22" fill="${BRAND.gold}" letter-spacing="6">MEDICAL TEAM · 의료진</text>
  <line x1="80" y1="150" x2="180" y2="150" stroke="${BRAND.gold}" stroke-width="2"/>
  <text x="80" y="240" font-family="'Pretendard', sans-serif" font-size="32" fill="${BRAND.goldDim}" font-weight="300">${xmlEscape(position || '')}</text>
  <text x="80" y="${240 + 100}" font-family="'Pretendard', sans-serif" font-size="${titleSize + 30}" font-weight="700" fill="${BRAND.cream}">${xmlEscape(name)}</text>
  ${specialty ? `<text x="80" y="${240 + 100 + 60}" font-family="'Pretendard', sans-serif" font-size="28" fill="${BRAND.gold}">${xmlEscape(specialty)}</text>` : ''}
  <text x="80" y="510" font-family="'Pretendard', sans-serif" font-size="22" fill="${BRAND.goldDim}">대구365치과 의료진 · 평생 가는 진료</text>
  ${footerInfo()}
  ${brandBadge(1050, 130, 75)}
  <!-- decorative right column -->
  <g opacity="0.3">
    <rect x="900" y="280" width="220" height="220" fill="none" stroke="${BRAND.gold}" stroke-width="1"/>
    <rect x="920" y="300" width="220" height="220" fill="none" stroke="${BRAND.gold}" stroke-width="1"/>
  </g>
</svg>`
}

// ============ 3. TREATMENT (진료 상세) ============
export function ogTreatment(opts: { name: string; tagline?: string; category?: string }): string {
  const { name, tagline, category } = opts
  const titleSize = titleFontSize(name)
  const taglineLines = tagline ? wrapText(tagline, 28, 2) : []
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${commonDefs()}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="120" font-family="Georgia, 'Noto Serif KR', serif" font-size="22" fill="${BRAND.gold}" letter-spacing="6">TREATMENT · ${xmlEscape((category || '진료').toUpperCase())}</text>
  <line x1="80" y1="150" x2="180" y2="150" stroke="${BRAND.gold}" stroke-width="2"/>
  <text x="80" y="${230 + titleSize * 0.7}" font-family="'Pretendard', sans-serif" font-size="${titleSize}" font-weight="700" fill="${BRAND.cream}">${xmlEscape(name)}</text>
  ${taglineLines.map((line, i) =>
    `<text x="80" y="${230 + titleSize * 0.7 + 50 + i * 44}" font-family="'Pretendard', sans-serif" font-size="34" fill="${BRAND.gold}" font-weight="300">${xmlEscape(line)}</text>`
  ).join('\n  ')}
  <text x="80" y="510" font-family="'Pretendard', sans-serif" font-size="22" fill="${BRAND.goldDim}">대구365치과 · 4단계 무통마취 · 수면치료 시스템</text>
  ${footerInfo()}
  ${brandBadge(1050, 150, 80)}
</svg>`
}

// ============ 4. BLOG (블로그 글) ============
export function ogBlog(opts: { title: string; author?: string; thumbnail?: string }): string {
  const { title, author } = opts
  const lines = wrapText(title, 18, 3)
  // 동적 폰트 사이즈 (줄 수 기반)
  const fs = lines.length === 1 ? 88 : lines.length === 2 ? 72 : 60
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${commonDefs()}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="120" font-family="Georgia, 'Noto Serif KR', serif" font-size="22" fill="${BRAND.gold}" letter-spacing="6">BLOG · 의료진 칼럼</text>
  <line x1="80" y1="150" x2="180" y2="150" stroke="${BRAND.gold}" stroke-width="2"/>
  ${lines.map((line, i) =>
    `<text x="80" y="${230 + fs * 0.8 + i * (fs * 1.15)}" font-family="'Pretendard', sans-serif" font-size="${fs}" font-weight="600" fill="${BRAND.cream}">${xmlEscape(line)}</text>`
  ).join('\n  ')}
  ${author ? `<text x="80" y="510" font-family="'Pretendard', sans-serif" font-size="24" fill="${BRAND.gold}">by ${xmlEscape(author)} · 대구365치과</text>` : `<text x="80" y="510" font-family="'Pretendard', sans-serif" font-size="24" fill="${BRAND.gold}">대구365치과 의료진 칼럼</text>`}
  ${footerInfo()}
  ${brandBadge(1050, 150, 80)}
</svg>`
}

// ============ 5. BEFORE-AFTER (치료 사례) ============
export function ogBeforeAfter(opts: { title: string; treatment?: string; doctor?: string }): string {
  const { title, treatment, doctor } = opts
  const lines = wrapText(title, 22, 2)
  const fs = lines.length === 1 ? 76 : 60
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${commonDefs()}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- BEFORE / AFTER 라벨 (좌우 대칭 데코) -->
  <g opacity="0.18">
    <text x="80" y="380" font-family="Georgia, serif" font-size="180" font-weight="700" fill="${BRAND.gold}" letter-spacing="6">BEFORE</text>
    <text x="600" y="560" font-family="Georgia, serif" font-size="180" font-weight="700" fill="${BRAND.gold}" letter-spacing="6">AFTER</text>
  </g>

  <text x="80" y="120" font-family="Georgia, 'Noto Serif KR', serif" font-size="22" fill="${BRAND.gold}" letter-spacing="6">CASE · 실제 치료 사례</text>
  <line x1="80" y1="150" x2="180" y2="150" stroke="${BRAND.gold}" stroke-width="2"/>
  ${lines.map((line, i) =>
    `<text x="80" y="${220 + fs * 0.8 + i * (fs * 1.15)}" font-family="'Pretendard', sans-serif" font-size="${fs}" font-weight="700" fill="${BRAND.cream}">${xmlEscape(line)}</text>`
  ).join('\n  ')}
  ${(treatment || doctor) ?
    `<text x="80" y="445" font-family="'Pretendard', sans-serif" font-size="28" fill="${BRAND.gold}" font-weight="300">${xmlEscape([treatment, doctor].filter(Boolean).join(' · '))}</text>` : ''
  }
  <text x="80" y="510" font-family="'Pretendard', sans-serif" font-size="22" fill="${BRAND.goldDim}">대구365치과 · 검증된 결과</text>
  ${footerInfo()}
  ${brandBadge(1050, 150, 80)}
</svg>`
}

// ============ 메인 분기 함수 ============
export type OgType = 'default' | 'doctor' | 'treatment' | 'blog' | 'before-after'

export function buildOgSvg(type: OgType, params: URLSearchParams): string {
  switch (type) {
    case 'doctor':
      return ogDoctor({
        name: params.get('name') || '의료진',
        position: params.get('position') || '대표원장',
        specialty: params.get('specialty') || undefined,
      })
    case 'treatment':
      return ogTreatment({
        name: params.get('name') || '진료',
        tagline: params.get('tagline') || undefined,
        category: params.get('category') || undefined,
      })
    case 'blog':
      return ogBlog({
        title: params.get('title') || '블로그',
        author: params.get('author') || undefined,
      })
    case 'before-after':
      return ogBeforeAfter({
        title: params.get('title') || '치료 사례',
        treatment: params.get('treatment') || undefined,
        doctor: params.get('doctor') || undefined,
      })
    default:
      return ogDefault({
        title: params.get('title') || undefined,
        subtitle: params.get('subtitle') || undefined,
      })
  }
}

// ============ URL 헬퍼 (페이지에서 ogImage 값을 만들 때 사용) ============
const SITE_URL = 'https://daegu365dc.kr'

function buildUrl(type: OgType, q: Record<string, string | undefined>): string {
  const sp = new URLSearchParams()
  sp.set('type', type)
  for (const [k, v] of Object.entries(q)) {
    if (v) sp.set(k, v)
  }
  // PNG (카카오톡·페이스북·네이버 미리보기 호환)
  return `${SITE_URL}/api/og.png?${sp.toString()}`
}

export const ogUrl = {
  default: (title?: string, subtitle?: string) =>
    buildUrl('default', { title, subtitle }),
  doctor: (name: string, position: string, specialty?: string) =>
    buildUrl('doctor', { name, position, specialty }),
  treatment: (name: string, tagline?: string, category?: string) =>
    buildUrl('treatment', { name, tagline, category }),
  blog: (title: string, author?: string) =>
    buildUrl('blog', { title, author }),
  beforeAfter: (title: string, treatment?: string, doctor?: string) =>
    buildUrl('before-after', { title, treatment, doctor }),
}
