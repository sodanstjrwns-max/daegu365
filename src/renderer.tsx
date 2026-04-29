import { jsxRenderer } from 'hono/jsx-renderer'

type RendererProps = {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  jsonLd?: any | any[]
  breadcrumb?: Array<{ name: string, url: string }>
  schemaType?: 'Dentist' | 'Article' | 'FAQPage' | 'MedicalWebPage'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export const SITE = {
  name: '대구365치과',
  nameEn: 'DAEGU 365 Dental Clinic',
  url: 'https://daegu365dc.pages.dev',
  phone: '053-357-0365',
  address: '대구광역시 북구 침산로 148 엠브로스퀘어 7층',
  streetAddress: '침산로 148 엠브로스퀘어 7층',
  addressLocality: '북구',
  addressRegion: '대구광역시',
  postalCode: '41545',
  email: 'daegu365dc@naver.com',
  lat: 35.888,
  lng: 128.584,
  logo: 'https://daegu365dc.pages.dev/static/images/logo-vertical-gold.png',
  logoHorizontal: 'https://daegu365dc.pages.dev/static/images/logo-horizontal-brown.png',
  founded: '2024',
  sameAs: [
    'https://blog.naver.com/nowhere2721',
    'https://www.instagram.com/chee_jaeee/',
    'http://pf.kakao.com/_PGaxmn',
  ]
}

// ============================================================
//  Schema.org Helper Functions (재사용)
// ============================================================

/** 전역 Dentist 스키마 — @id 기반으로 모든 다른 엔티티가 참조 */
export const dentistSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
  "@id": `${SITE.url}/#dentist`,
  "name": SITE.name,
  "alternateName": SITE.nameEn,
  "description": "대구 북구 침산동 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인 투명교정, VINIQUE 라미네이트 전문 치과. 월·목 21시까지, 주말 진료. 7명의 전문 의료진 협진.",
  "url": SITE.url,
  "telephone": SITE.phone,
  "email": SITE.email,
  "image": [
    `${SITE.url}/static/images/logo-vertical-gold.png`,
    `${SITE.url}/api/og.png?type=default`,
  ],
  "logo": SITE.logo,
  "foundingDate": SITE.founded,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": SITE.streetAddress,
    "addressLocality": SITE.addressLocality,
    "addressRegion": SITE.addressRegion,
    "postalCode": SITE.postalCode,
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": SITE.lat,
    "longitude": SITE.lng
  },
  "hasMap": "https://map.kakao.com/?urlX=473870&urlY=1119810&urlLevel=3",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Thursday"], "opens": "09:30", "closes": "21:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Friday"], "opens": "09:30", "closes": "18:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "09:30", "closes": "17:00" }
  ],
  "priceRange": "₩₩",
  "currenciesAccepted": "KRW",
  "paymentAccepted": "Cash, Credit Card",
  "medicalSpecialty": [
    "Dentistry",
    "OrthodonticMedicine",
    "Implantology",
    "PediatricDentistry",
    "Periodontics",
    "Endodontics",
    "Prosthodontics",
    "CosmeticDentistry"
  ],
  "availableService": [
    { "@type": "MedicalProcedure", "name": "수면임플란트", "url": `${SITE.url}/treatments/implant` },
    { "@type": "MedicalProcedure", "name": "VINIQUE 라미네이트", "url": `${SITE.url}/treatments/lamineer` },
    { "@type": "MedicalProcedure", "name": "인비절라인 투명교정", "url": `${SITE.url}/treatments/ortho` },
    { "@type": "MedicalProcedure", "name": "수면치료 시스템", "url": `${SITE.url}/treatments/sleep-therapy` },
    { "@type": "MedicalProcedure", "name": "4단계 무통마취", "url": `${SITE.url}/treatments/painless-anesthesia` },
    { "@type": "MedicalProcedure", "name": "에어플로우 GBT", "url": `${SITE.url}/treatments/airflow-gbt` },
  ],
  "areaServed": [
    { "@type": "City", "name": "대구광역시" },
    { "@type": "AdministrativeArea", "name": "대구 북구" },
    { "@type": "AdministrativeArea", "name": "침산동" },
    { "@type": "AdministrativeArea", "name": "수성구" }
  ],
  "knowsLanguage": ["ko", "en"],
  "sameAs": SITE.sameAs,
  "potentialAction": {
    "@type": "ReserveAction",
    "target": "https://naver.me/GhSIroMf",
    "name": "네이버 예약"
  }
})

/** WebSite 스키마 — 구글 사이트링크 검색박스 노출용 */
export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  "url": SITE.url,
  "name": SITE.name,
  "alternateName": SITE.nameEn,
  "description": "대구 북구 치과 · 수면임플란트 · 인비절라인 · 라미네이트 전문",
  "publisher": { "@id": `${SITE.url}/#dentist` },
  "inLanguage": "ko-KR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE.url}/dictionary?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
})

/** BreadcrumbList 헬퍼 — 모든 페이지에 박는 빵부스러기 */
export const breadcrumbSchema = (items: Array<{ name: string, url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((it, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": it.name,
    "item": it.url.startsWith('http') ? it.url : `${SITE.url}${it.url}`
  }))
})

/** MedicalProcedure 스키마 — 진료 페이지 17개에 박는 핵심 AEO 스키마 */
export const medicalProcedureSchema = (opts: {
  name: string
  description: string
  slug: string
  bodyLocation?: string
  procedureType?: string
  preparation?: string
  followup?: string
  howPerformed?: string
  indication?: string[]
  cost?: string
  image?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "@id": `${SITE.url}/treatments/${opts.slug}#procedure`,
  "name": opts.name,
  "description": opts.description,
  "url": `${SITE.url}/treatments/${opts.slug}`,
  ...(opts.image && { "image": opts.image }),
  ...(opts.bodyLocation && { "bodyLocation": opts.bodyLocation }),
  ...(opts.procedureType && { "procedureType": opts.procedureType }),
  ...(opts.preparation && { "preparation": opts.preparation }),
  ...(opts.followup && { "followup": opts.followup }),
  ...(opts.howPerformed && { "howPerformed": opts.howPerformed }),
  ...(opts.indication && opts.indication.length > 0 && {
    "indication": opts.indication.map(i => ({ "@type": "MedicalIndication", "name": i }))
  }),
  ...(opts.cost && {
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "KRW",
      "value": opts.cost
    }
  }),
  "performer": { "@id": `${SITE.url}/#dentist` },
  "availableService": { "@id": `${SITE.url}/#dentist` }
})

/** Physician 스키마 — 원장 프로필 강화 */
export const physicianSchema = (doctor: any) => {
  let education: string[] = []
  let career: string[] = []
  let specialties: string[] = []
  try { education = JSON.parse(doctor.education || '[]') } catch {}
  try { career = JSON.parse(doctor.career || '[]') } catch {}
  try { specialties = JSON.parse(doctor.specialties || '[]') } catch {}

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE.url}/doctors/${doctor.slug}#physician`,
    "name": doctor.name,
    "jobTitle": doctor.position,
    "description": doctor.philosophy || doctor.message || '',
    "url": `${SITE.url}/doctors/${doctor.slug}`,
    "image": `${SITE.url}/r2/images/doctors/${doctor.slug}.jpg`,
    "worksFor": { "@id": `${SITE.url}/#dentist` },
    "memberOf": { "@id": `${SITE.url}/#dentist` },
    "medicalSpecialty": specialties.length > 0 ? specialties : ["Dentistry"],
    ...(education.length > 0 && {
      "alumniOf": education.map(e => ({ "@type": "EducationalOrganization", "name": e }))
    }),
    ...(career.length > 0 && {
      "hasCredential": career.map(c => ({
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "name": c
      }))
    }),
    "knowsLanguage": ["ko"]
  }
}

/** VideoObject 스키마 — 원장 인터뷰 영상 */
export const videoObjectSchema = (opts: {
  doctorName: string
  doctorPosition: string
  doctorSlug: string
  description: string
  uploadDate?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `${SITE.url}/doctors/${opts.doctorSlug}#video`,
  "name": `${opts.doctorName} ${opts.doctorPosition} 인터뷰 — 대구365치과`,
  "description": opts.description,
  "thumbnailUrl": `${SITE.url}/r2/images/doctors/${opts.doctorSlug}.jpg`,
  "contentUrl": `${SITE.url}/api/videos/${opts.doctorSlug}`,
  "uploadDate": opts.uploadDate || '2024-12-01',
  "publisher": { "@id": `${SITE.url}/#dentist` },
  "actor": { "@id": `${SITE.url}/doctors/${opts.doctorSlug}#physician` },
  "inLanguage": "ko"
})

/** Article 스키마 강화 — 블로그 */
export const articleSchema = (opts: {
  title: string
  description: string
  slug: string
  authorName?: string
  authorSlug?: string
  publishedTime?: string
  modifiedTime?: string
  image?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE.url}/blog/${opts.slug}#article`,
  "headline": opts.title,
  "description": opts.description,
  "url": `${SITE.url}/blog/${opts.slug}`,
  ...(opts.image && { "image": opts.image }),
  "datePublished": opts.publishedTime,
  "dateModified": opts.modifiedTime || opts.publishedTime,
  "author": opts.authorSlug ? {
    "@type": "Person",
    "@id": `${SITE.url}/doctors/${opts.authorSlug}#physician`,
    "name": opts.authorName,
    "url": `${SITE.url}/doctors/${opts.authorSlug}`
  } : { "@type": "Organization", "@id": `${SITE.url}/#dentist` },
  "publisher": {
    "@type": "Organization",
    "@id": `${SITE.url}/#dentist`,
    "name": SITE.name,
    "logo": { "@type": "ImageObject", "url": SITE.logo }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE.url}/blog/${opts.slug}`
  },
  "inLanguage": "ko-KR"
})

// ============================================================
//  Renderer
// ============================================================

export const renderer = jsxRenderer(({
  children, title, description, keywords, canonical, ogImage,
  ogType, jsonLd, breadcrumb, publishedTime, modifiedTime, author,
  naverVerify: nv, googleVerify: gv, msVerify: mv
}: any, c: any) => {
  // 환경변수 우선, props fallback (wrangler secret put 으로 한 번에 박기 위함)
  const env = (c?.env || {}) as any
  const naverVerify = nv || env.NAVER_SITE_VERIFICATION || ''
  const googleVerify = gv || env.GOOGLE_SITE_VERIFICATION || ''
  const msVerify = mv || env.MS_SITE_VERIFICATION || ''

  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | 대구 북구 치과 · 수면임플란트 · 인비절라인 전문`
  const pageDesc = description || '대구 북구 침산동 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.'
  const pageKw = keywords || '대구치과,대구365치과,침산동치과,북구치과,수면임플란트,인비절라인,라미네이트,대구임플란트,수성구치과,대구교정,투명교정,치과공포증'
  const pageCanonical = canonical || SITE.url
  const pageOg = ogImage || `${SITE.url}/static/og-default.svg`
  const pageOgType = ogType || 'website'

  // 모든 페이지에 박는 기본 스키마: Dentist + WebSite (전역 1회씩)
  const baseSchemas: any[] = [dentistSchema(), websiteSchema()]

  // breadcrumb 자동 추가
  if (breadcrumb && Array.isArray(breadcrumb) && breadcrumb.length > 0) {
    baseSchemas.push(breadcrumbSchema(breadcrumb))
  }

  // 페이지별 추가 스키마
  const pageSchemas: any[] = []
  if (jsonLd) {
    if (Array.isArray(jsonLd)) pageSchemas.push(...jsonLd)
    else pageSchemas.push(jsonLd)
  }

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=yes" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKw} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        {naverVerify && <meta name="naver-site-verification" content={naverVerify} />}
        {googleVerify && <meta name="google-site-verification" content={googleVerify} />}
        {msVerify && <meta name="msvalidate.01" content={msVerify} />}
        <meta name="author" content={author || SITE.name} />
        <meta name="publisher" content={SITE.name} />
        <meta name="theme-color" content="#6b4c2a" />
        <meta name="format-detection" content="telephone=yes,address=yes,email=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE.name} />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Geo / Region (네이버·로컬검색용) */}
        <meta name="geo.region" content="KR-27" />
        <meta name="geo.placename" content="대구광역시 북구 침산동" />
        <meta name="geo.position" content={`${SITE.lat};${SITE.lng}`} />
        <meta name="ICBM" content={`${SITE.lat}, ${SITE.lng}`} />

        <link rel="canonical" href={pageCanonical} />
        <link rel="alternate" hreflang="ko-KR" href={pageCanonical} />
        <link rel="alternate" hreflang="x-default" href={pageCanonical} />

        {/* OpenGraph */}
        <meta property="og:type" content={pageOgType} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:image" content={pageOg} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={pageTitle} />
        <meta property="og:locale" content="ko_KR" />
        {pageOgType === 'article' && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {pageOgType === 'article' && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}
        {pageOgType === 'article' && author && (
          <meta property="article:author" content={author} />
        )}

        {/* Business contact (페이스북 비즈니스용) */}
        <meta property="business:contact_data:street_address" content={SITE.streetAddress} />
        <meta property="business:contact_data:locality" content={SITE.addressLocality} />
        <meta property="business:contact_data:region" content={SITE.addressRegion} />
        <meta property="business:contact_data:postal_code" content={SITE.postalCode} />
        <meta property="business:contact_data:country_name" content="South Korea" />
        <meta property="business:contact_data:phone_number" content={SITE.phone} />
        <meta property="business:contact_data:email" content={SITE.email} />
        <meta property="business:contact_data:website" content={SITE.url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={pageOg} />
        <meta name="twitter:image:alt" content={pageTitle} />

        {/* Favicon */}
        <link rel="icon" href="/static/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/static/favicon-180.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Fonts */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="" />
        <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />

        {/* Tailwind + Icons */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/styles.css" rel="stylesheet" />

        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  brown: {50:'#faf7f3',100:'#f3ecdf',200:'#e6d7bf',300:'#d4ba94',400:'#b89468',500:'#a07747',600:'#8a6235',700:'#6b4c2a',800:'#4a3520',900:'#2c1f14',950:'#1a120a'},
                  ivory:'#fdfbf7', cream:'#f5efe5', gold:'#c9a876'
                },
                fontFamily: {
                  display:['Pretendard','-apple-system','BlinkMacSystemFont','Segoe UI','sans-serif'],
                  serif:['Pretendard','-apple-system','BlinkMacSystemFont','Segoe UI','sans-serif'],
                  sans:['Pretendard','-apple-system','BlinkMacSystemFont','Segoe UI','sans-serif']
                }
              }
            }
          }
        `}} />

        {/* JSON-LD: 전역 (Dentist + WebSite + Breadcrumb) + 페이지별 */}
        {baseSchemas.map((s) => (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(s)}} />
        ))}
        {pageSchemas.map((s) => (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(s)}} />
        ))}
      </head>
      <body class="bg-ivory text-brown-900">
        {children}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
