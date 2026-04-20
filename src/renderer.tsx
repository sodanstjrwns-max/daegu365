import { jsxRenderer } from 'hono/jsx-renderer'

type RendererProps = {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  jsonLd?: any
  schemaType?: 'Dentist' | 'Article' | 'FAQPage' | 'MedicalWebPage'
}

const SITE = {
  name: '대구365치과',
  url: 'https://daegu365dc.pages.dev',
  phone: '053-357-0365',
  address: '대구광역시 북구 침산로 148 엠브로스퀘어 7층',
  email: 'daegu365dc@naver.com',
  lat: 35.888,
  lng: 128.584
}

export const renderer = jsxRenderer(({ children, title, description, keywords, canonical, ogImage, jsonLd, schemaType }: any) => {
  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | 대구 북구 치과 · 수면임플란트 · 인비절라인 전문`
  const pageDesc = description || '대구 북구 침산동 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.'
  const pageKw = keywords || '대구치과,대구365치과,침산동치과,북구치과,수면임플란트,인비절라인,라미네이트,대구임플란트'
  const pageCanonical = canonical || SITE.url
  const pageOg = ogImage || `${SITE.url}/static/og-default.svg`

  // Default Dentist schema
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": SITE.name,
    "description": pageDesc,
    "url": SITE.url,
    "telephone": SITE.phone,
    "email": SITE.email,
    "image": pageOg,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "침산로 148 엠브로스퀘어 7층",
      "addressLocality": "북구",
      "addressRegion": "대구광역시",
      "addressCountry": "KR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": SITE.lat, "longitude": SITE.lng },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Thursday"], "opens": "09:30", "closes": "21:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "09:30", "closes": "17:00" }
    ],
    "priceRange": "₩₩",
    "medicalSpecialty": ["Dentistry", "OrthodonticMedicine", "Implantology"]
  }

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKw} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content={SITE.name} />
        <meta name="theme-color" content="#6b4c2a" />
        <link rel="canonical" href={pageCanonical} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:image" content={pageOg} />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={pageOg} />

        {/* Favicon */}
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/static/favicon.svg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
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
                  display:['Cormorant Garamond','Noto Serif KR','serif'],
                  serif:['Playfair Display','Noto Serif KR','serif'],
                  sans:['Pretendard','system-ui','sans-serif']
                }
              }
            }
          }
        `}} />

        {/* Default Dentist JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(dentistSchema)}} />
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
        )}
      </head>
      <body class="bg-ivory text-brown-900">
        {children}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
