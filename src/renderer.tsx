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
  preloadImage?: string
}

export const SITE = {
  name: '대구365치과',
  nameEn: 'DAEGU 365 Dental Clinic',
  url: 'https://daegu365dc.kr',
  phone: '053-357-0365',
  address: '대구광역시 북구 침산로 148 엠브로스퀘어 7층',
  streetAddress: '침산로 148 엠브로스퀘어 7층',
  addressLocality: '북구',
  addressRegion: '대구광역시',
  postalCode: '41545',
  email: 'daegu365dc@naver.com',
  lat: 35.888,
  lng: 128.584,
  logo: 'https://daegu365dc.kr/static/images/logo-vertical-gold.png',
  logoHorizontal: 'https://daegu365dc.kr/static/images/logo-horizontal-brown.png',
  founded: '2025',
  // AEO 신선도(freshness) 신호 — 콘텐츠 최종 검토일. 배포 시 갱신.
  lastReviewed: '2026-06-11',
  sameAs: [
    'https://blog.naver.com/nowhere2721',
    'https://www.instagram.com/daegu365dc_',
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
  "description": "대구 북구 침산동 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인 투명교정, VINIQUE 라미네이트 전문 치과. 월·목 21시까지, 주말 진료. 6명의 전문 의료진 협진.",
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
  "slogan": "치과가 두려웠던 의사가 만든, 두려움 없는 치과",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 6, "unitText": "전문 의료진" },
  // AI 답변엔진 주제 권위 신호 (2026 AEO) — 검증 가능한 진료 영역만 명시
  "knowsAbout": [
    "수면임플란트", "디지털 가이드 임플란트", "전악 임플란트", "임플란트 재수술",
    "인비절라인 투명교정", "라미네이트", "VINIQUE 라미네이트", "심미보철",
    "치과공포증 진정치료", "4단계 무통마취", "정맥진정(IV sedation)",
    "치주치료", "잇몸치료", "에어플로우 GBT", "Q-ray 형광진단",
    "소아치과", "충치치료", "신경치료", "지르코니아 크라운", "치아미백",
    "원내 디지털 기공실", "통합치의학", "보존치과", "교정치과"
  ],
  // 진료과 계층 엔티티 (2026 AEO) — AI가 "이 치과가 어떤 진료과를 보유하고 누가 담당하는가" 매핑
  "department": [
    {
      "@type": "MedicalClinic", "name": "임플란트·구강외과",
      "medicalSpecialty": "Implantology",
      "availableService": { "@id": `${SITE.url}/treatments/implant#procedure` },
      "physician": { "@id": `${SITE.url}/doctors/kim-seongju#physician` }
    },
    {
      "@type": "MedicalClinic", "name": "치과교정과",
      "medicalSpecialty": "OrthodonticMedicine",
      "availableService": { "@id": `${SITE.url}/treatments/ortho#procedure` },
      "physician": { "@id": `${SITE.url}/doctors/kim-jinduk#physician` }
    },
    {
      "@type": "MedicalClinic", "name": "치과보존과·심미",
      "medicalSpecialty": "Endodontics",
      "availableService": { "@id": `${SITE.url}/treatments/lamineer#procedure` },
      "physician": { "@id": `${SITE.url}/doctors/choi-hyejung#physician` }
    },
    {
      "@type": "MedicalClinic", "name": "치주치료·평생관리",
      "medicalSpecialty": "Periodontics",
      "availableService": { "@id": `${SITE.url}/treatments/perio#procedure` },
      "physician": { "@id": `${SITE.url}/doctors/kim-seongju#physician` }
    },
    {
      "@type": "MedicalClinic", "name": "소아치과",
      "medicalSpecialty": "PediatricDentistry",
      "availableService": { "@id": `${SITE.url}/treatments/pediatric#procedure` },
      "physician": { "@id": `${SITE.url}/doctors/han-jieun#physician` }
    }
  ],
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
  lastReviewed?: string
  reviewedBy?: { name: string; slug: string; position: string }
}) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "@id": `${SITE.url}/treatments/${opts.slug}#procedure`,
  "name": opts.name,
  "description": opts.description,
  "url": `${SITE.url}/treatments/${opts.slug}`,
  // 신선도 신호 (2026 AEO) — AI가 콘텐츠 최신성을 판단하는 핵심 가중치
  "lastReviewed": opts.lastReviewed || SITE.lastReviewed,
  "dateModified": opts.lastReviewed || SITE.lastReviewed,
  // YMYL 의료 검수 신호 (2026 AEO 핵심) — 전문의가 의학적으로 검수했음을 기계가 읽도록
  ...(opts.reviewedBy && {
    "reviewedBy": {
      "@type": "Physician",
      "@id": `${SITE.url}/doctors/${opts.reviewedBy.slug}#physician`,
      "name": opts.reviewedBy.name,
      "jobTitle": opts.reviewedBy.position,
      "url": `${SITE.url}/doctors/${opts.reviewedBy.slug}`,
      "worksFor": { "@id": `${SITE.url}/#dentist` }
    }
  }),
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

/** Physician 스키마 — 원장 프로필 강화 (2026 YMYL 자격 신호 정밀화) */
export const physicianSchema = (doctor: any) => {
  let education: string[] = []
  let career: string[] = []
  let specialties: string[] = []
  try { education = JSON.parse(doctor.education || '[]') } catch {}
  try { career = JSON.parse(doctor.career || '[]') } catch {}
  try { specialties = JSON.parse(doctor.specialties || '[]') } catch {}

  // 항목을 의미 단위로 분류 — AI가 자격/학위/소속을 정확히 식별하도록
  const isCredential = (s: string) => /전문의|인정의|펠로우|fellow|자격|board/i.test(s)
  const isDegree = (s: string) => /석사|박사|학사|졸업|수료|대학원|대학|레지던트|인턴|residency|master|phd/i.test(s)
  const isMembership = (s: string) => /정회원|학회|협회|위원|member/i.test(s)

  // 출신 교육기관 (학위/수련) → alumniOf
  const alumni = [...education, ...career].filter(isDegree)
  // 전문의·인정의 등 자격증 → hasCredential (Certification)
  const certs = [...education, ...career].filter(isCredential)
  // 학회/협회 소속 → memberOf 보조 (텍스트)
  const memberships = career.filter(isMembership)

  const credentials: any[] = []
  certs.forEach(c => {
    // 국가 전문의 자격은 보건복지부, 학회 인정의·펠로우는 해당 학회가 인증
    const isBoardSpecialist = /전문의/.test(c)
    const societyMatch = c.match(/(대한[가-힣]+학회)/)
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": isBoardSpecialist ? "Specialist Certification" : "Society Certification",
      "name": c,
      "recognizedBy": isBoardSpecialist
        ? { "@type": "GovernmentOrganization", "name": "보건복지부" }
        : societyMatch
          ? { "@type": "Organization", "name": societyMatch[1] }
          : { "@type": "Organization", "name": "대한치과의사협회" }
    })
  })
  memberships.forEach(m => credentials.push({
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional Membership",
    "name": m
  }))

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE.url}/doctors/${doctor.slug}#physician`,
    "name": doctor.name,
    "jobTitle": doctor.position,
    "description": doctor.philosophy || doctor.message || '',
    "url": `${SITE.url}/doctors/${doctor.slug}`,
    "image": `${SITE.url}/r2/images/doctors/${doctor.slug}.jpg`,
    "hasOccupation": {
      "@type": "Occupation",
      "name": "치과의사",
      "occupationalCategory": "치과 전문의"
    },
    "worksFor": { "@id": `${SITE.url}/#dentist` },
    "memberOf": { "@id": `${SITE.url}/#dentist` },
    "medicalSpecialty": specialties.length > 0 ? specialties : ["Dentistry"],
    ...(alumni.length > 0 && {
      "alumniOf": Array.from(new Set(alumni)).map(e => ({ "@type": "EducationalOrganization", "name": e }))
    }),
    ...(credentials.length > 0 && { "hasCredential": credentials }),
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

/** Article 스키마 — 구글 권장 풀 스펙 (NewsArticle 호환) */
export const articleSchema = (opts: {
  title: string
  description: string
  slug: string
  authorName?: string
  authorSlug?: string
  authorPosition?: string
  publishedTime?: string
  modifiedTime?: string
  image?: string
  keywords?: string
  wordCount?: number
  articleSection?: string
}) => ({
  "@context": "https://schema.org",
  "@type": ["Article", "BlogPosting"],
  "@id": `${SITE.url}/blog/${opts.slug}#article`,
  "headline": opts.title,
  "name": opts.title,
  "description": opts.description,
  "url": `${SITE.url}/blog/${opts.slug}`,
  "image": opts.image ? {
    "@type": "ImageObject",
    "url": opts.image,
    "width": 1200,
    "height": 630
  } : {
    "@type": "ImageObject",
    "url": `${SITE.url}/static/og-default.svg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": opts.publishedTime,
  "dateModified": opts.modifiedTime || opts.publishedTime,
  ...(opts.keywords && { "keywords": opts.keywords }),
  ...(opts.wordCount && { "wordCount": opts.wordCount }),
  ...(opts.articleSection && { "articleSection": opts.articleSection }),
  "author": opts.authorSlug && opts.authorName ? {
    "@type": "Person",
    "@id": `${SITE.url}/doctors/${opts.authorSlug}#physician`,
    "name": opts.authorName,
    "jobTitle": opts.authorPosition || '치과의사',
    "worksFor": { "@type": "Dentist", "@id": `${SITE.url}/#dentist`, "name": SITE.name },
    "url": `${SITE.url}/doctors/${opts.authorSlug}`
  } : {
    "@type": "Organization",
    "@id": `${SITE.url}/#dentist`,
    "name": SITE.name,
    "url": SITE.url
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${SITE.url}/#dentist`,
    "name": SITE.name,
    "logo": { "@type": "ImageObject", "url": SITE.logo, "width": 600, "height": 60 }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE.url}/blog/${opts.slug}`
  },
  "isAccessibleForFree": true,
  "inLanguage": "ko-KR"
})

/** 비포애프터 케이스 스키마 — MedicalCaseStudy + Article 듀얼 */
export const caseStudySchema = (opts: {
  id: number
  title: string
  description: string
  beforeImage?: string
  afterImage?: string
  beforeAlt?: string
  afterAlt?: string
  doctorName?: string
  doctorSlug?: string
  treatmentName?: string
  treatmentSlug?: string
  createdAt?: string
  updatedAt?: string
}) => {
  const images: any[] = []
  if (opts.beforeImage) images.push({
    "@type": "ImageObject",
    "url": opts.beforeImage,
    "caption": opts.beforeAlt || `${opts.title} - 치료 전`,
    "representativeOfPage": true
  })
  if (opts.afterImage) images.push({
    "@type": "ImageObject",
    "url": opts.afterImage,
    "caption": opts.afterAlt || `${opts.title} - 치료 후`
  })
  return [
    // (1) MedicalCaseStudy — 의료 도메인 신호
    {
      "@context": "https://schema.org",
      "@type": "MedicalCaseStudy",
      "@id": `${SITE.url}/before-after/${opts.id}#case`,
      "name": opts.title,
      "description": opts.description,
      "url": `${SITE.url}/before-after/${opts.id}`,
      ...(images.length > 0 && { "image": images }),
      ...(opts.treatmentName && {
        "medicalSpecialty": "Dentistry",
        "about": {
          "@type": "MedicalProcedure",
          "@id": `${SITE.url}/treatments/${opts.treatmentSlug}#procedure`,
          "name": opts.treatmentName
        }
      }),
      ...(opts.doctorSlug && opts.doctorName && {
        "author": {
          "@type": "Physician",
          "@id": `${SITE.url}/doctors/${opts.doctorSlug}#physician`,
          "name": opts.doctorName,
          "url": `${SITE.url}/doctors/${opts.doctorSlug}`
        }
      }),
      "provider": { "@id": `${SITE.url}/#dentist` },
      "datePublished": opts.createdAt,
      "dateModified": opts.updatedAt || opts.createdAt
    },
    // (2) Article — 구글이 인덱싱 잘하는 보조 스키마
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.url}/before-after/${opts.id}#article`,
      "headline": opts.title,
      "description": opts.description,
      "url": `${SITE.url}/before-after/${opts.id}`,
      ...(images[0] && { "image": images[0] }),
      "datePublished": opts.createdAt,
      "dateModified": opts.updatedAt || opts.createdAt,
      "publisher": {
        "@type": "Organization",
        "@id": `${SITE.url}/#dentist`,
        "name": SITE.name,
        "logo": { "@type": "ImageObject", "url": SITE.logo }
      },
      "author": opts.doctorSlug && opts.doctorName ? {
        "@type": "Person",
        "@id": `${SITE.url}/doctors/${opts.doctorSlug}#physician`,
        "name": opts.doctorName
      } : { "@id": `${SITE.url}/#dentist` },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE.url}/before-after/${opts.id}`
      },
      "inLanguage": "ko-KR"
    }
  ]
}

/** HowTo 스키마 — 진료 PROCESS 단계를 AI/구글이 "절차 가이드"로 인식 (2026 AEO 핵심)
 *  AI 답변엔진이 "임플란트 어떻게 진행돼요?" 같은 질문에 단계별로 인용하기 쉬워짐 */
export const howToSchema = (opts: {
  name: string
  description?: string
  slug: string
  steps: Array<{ name: string, text: string }>
  totalTime?: string  // ISO 8601 duration, 예: "P3M" (3개월)
  image?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE.url}/treatments/${opts.slug}#howto`,
  "name": opts.name,
  ...(opts.description && { "description": opts.description }),
  ...(opts.image && { "image": opts.image }),
  ...(opts.totalTime && { "totalTime": opts.totalTime }),
  "step": opts.steps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.name,
    "text": s.text,
    "url": `${SITE.url}/treatments/${opts.slug}#step-${i + 1}`
  })),
  "supply": { "@id": `${SITE.url}/#dentist` },
  "inLanguage": "ko-KR"
})

/** Speakable 스키마 — 음성비서/AI가 "소리내어 읽을" 핵심 문장 지정 (2026 voice AEO)
 *  cssSelector 로 지정된 영역을 AI가 우선 발췌 */
export const speakableSchema = (opts: {
  url: string
  cssSelectors?: string[]
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${opts.url}#speakable`,
  "url": opts.url,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": opts.cssSelectors && opts.cssSelectors.length > 0
      ? opts.cssSelectors
      : [".tldr-answer", "h1", ".page-lead"]
  },
  "inLanguage": "ko-KR"
})

// ============================================================
//  Renderer
// ============================================================

export const renderer = jsxRenderer(({
  children, title, description, keywords, canonical, ogImage,
  ogType, jsonLd, breadcrumb, publishedTime, modifiedTime, author,
  robots, preloadImage,
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
        <meta name="robots" content={robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
        <meta name="googlebot" content={robots || "index, follow, max-image-preview:large, max-snippet:-1"} />
        <meta name="bingbot" content={robots || "index, follow"} />
        <meta name="yeti" content={robots || "index, follow"} />
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
        <link rel="alternate" type="application/rss+xml" title="대구365치과 블로그 RSS" href={`${SITE.url}/rss.xml`} />

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

        {/* LCP 이미지 preload (F2 페이지 경험 — 핵심 리소스 힌트) */}
        {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchpriority="high" />}

        {/* Fonts */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="" />
        <link rel="dns-prefetch" href="https://cdn.tailwindcss.com" />
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
      {/* GA4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZLNLY4JWXR"></script>
      <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-ZLNLY4JWXR',{anonymize_ip:true});" }} />
      <script dangerouslySetInnerHTML={{ __html: '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","yc7wel27et");' }} />
      <script defer src="https://pf-dashboard-2nt.pages.dev/beacon.js"></script>
      </head>
      <body class="bg-ivory text-brown-900">
        {children}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
