// ============================================================
// "대구 북구 {진료}" 핵심 6페이지 사진 카드 (2026-10-14, 하위 페이지 카드 3b)
// - 같은 대표 사진 1장을 네 곳에 동일하게 쓴다: og:image(1200×630 jpg) · 본문 H1 아래 첫 이미지(같은 크롭 webp)
//   · MedicalWebPage.image/primaryImageOfPage · sitemap-regions <image:image>
// - 홈(/)과 허브(/regions)에 600×600 정사각 카드 그리드 + ItemList(화면과 같은 순서·이름·url·image 1:1)
// - 이미지 출처: 실사(원내 진료실·D.LAB 기공실 — R2 /r2/images/ 원본에서 크롭), 사이트 기존 이미지(투명교정 장치),
//   AI 생성 3장(임플란트 CBCT 상담·잇몸 검진·소아 진료실 — 사람 얼굴 비식별, 글자·로고 없음, 전후 암시 없음)
// - 카드 한 줄 설명은 각 페이지 H1(src/data/region-pages/group-c.ts)의 뒷부분을 그대로 쓴다
// ============================================================
import { SITE } from '../renderer'

/** 카드·대표 사진 반영일 (사이트맵 lastmod·dateModified, 고정값) */
export const REGION_CARDS_DATE = '2026-10-14'

export interface RegionCard {
  slug: string
  /** 카드 제목·ItemList name — "대구 북구 {진료}"로 시작 */
  name: string
  /** 카드 한 줄 (기존 H1 문구) */
  line: string
  /** 이미지 alt (페이지 주제) */
  alt: string
}

export const REGION_CARDS: RegionCard[] = [
  { slug: 'bukgu-implant',    name: '대구 북구 임플란트',     line: '뼈가 부족할 때의 선택',            alt: '대구 북구 임플란트 — CBCT 영상으로 잇몸뼈 높이와 폭을 확인하는 상담' },
  { slug: 'bukgu-ortho',      name: '대구 북구 치아교정',     line: '성인 교정, 직장 다니며 하는 방법',  alt: '대구 북구 치아교정 — 투명교정 장치' },
  { slug: 'bukgu-lamineer',   name: '대구 북구 라미네이트',   line: '상담에서 부착까지',                alt: '대구 북구 라미네이트 — 원내 기공실에서 라미네이트를 다듬는 모습' },
  { slug: 'bukgu-cavity-new', name: '대구 북구 충치·신경치료', line: '깊은 충치, 신경치료가 필요한 경우', alt: '대구 북구 충치·신경치료 — 대구365치과 진료실' },
  { slug: 'bukgu-perio',      name: '대구 북구 잇몸치료',     line: '잇몸병 진행 단계별 치료',          alt: '대구 북구 잇몸치료 — 잇몸 상태를 살피는 검진' },
  { slug: 'bukgu-kids',       name: '대구 북구 소아치과',     line: '아이가 긴장할 때',                 alt: '대구 북구 소아치과 — 보호자와 함께 진료 의자에 앉은 아이' },
]

export const REGION_CARD_BY_SLUG: Record<string, RegionCard> = Object.fromEntries(REGION_CARDS.map(c => [c.slug, c]))

const DIR = '/static/images/cards'
export const regionCardImages = (slug: string) => ({
  /** og:image · 스키마 · 사이트맵 (1200×630 jpg) */
  og: `${SITE.url}${DIR}/${slug}-1200x630.jpg`,
  /** 본문 H1 아래 (같은 크롭 1200×630 webp) */
  body: `${DIR}/${slug}-1200.webp`,
  bodyJpg: `${DIR}/${slug}-1200x630.jpg`,
  /** 카드 정사각 600×600 */
  square: `${DIR}/${slug}-600.jpg`,
  squareWebp: `${DIR}/${slug}-600.webp`,
})

/** 카드 그리드와 1:1인 ItemList — 홈·허브 공용 (id: 이 목록이 놓인 페이지의 @id) */
export const regionCardsItemList = (id: string) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": id,
  "name": "대구 북구 치과 주요 진료 안내",
  "numberOfItems": REGION_CARDS.length,
  "itemListElement": REGION_CARDS.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": c.name,
    "url": `${SITE.url}/region/${c.slug}`,
    "image": `${SITE.url}${regionCardImages(c.slug).square}`,
  })),
})

/** 페이지 본문 H1 바로 아래 대표 이미지 (og 와 같은 사진·같은 크롭) */
export const RegionHeroImage = ({ slug }: { slug: string }) => {
  const card = REGION_CARD_BY_SLUG[slug]
  if (!card) return null
  const img = regionCardImages(slug)
  return (
    <figure class="mt-2 mb-8 max-w-4xl">
      <picture>
        <source srcset={img.body} type="image/webp" />
        <img src={img.bodyJpg} alt={card.alt} width="1200" height="630" fetchpriority="high" decoding="async"
          class="w-full h-auto rounded-2xl shadow-sm" style="aspect-ratio:1200/630; object-fit:cover;" />
      </picture>
    </figure>
  )
}

/** 6장 사진 카드 그리드 (홈·허브 공용, 사이트 브라운/골드 토큰) */
export const RegionCardGrid = () => (
  <ul class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {REGION_CARDS.map(c => {
      const img = regionCardImages(c.slug)
      return (
        <li>
          <a href={`/region/${c.slug}`} class="group block rounded-2xl overflow-hidden border border-brown-200 bg-ivory hover:border-gold hover:shadow-xl transition-all duration-300">
            <div class="aspect-square overflow-hidden bg-brown-100">
              <picture>
                <source srcset={img.squareWebp} type="image/webp" />
                <img src={img.square} alt={c.alt} width="600" height="600" loading="lazy" decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </picture>
            </div>
            <div class="p-4 md:p-5">
              <div class="display text-base md:text-lg font-medium text-brown-900 leading-snug group-hover:text-brown-700">{c.name}</div>
              <div class="text-xs md:text-sm text-brown-600 mt-1.5 leading-relaxed">{c.line}</div>
            </div>
          </a>
        </li>
      )
    })}
  </ul>
)
