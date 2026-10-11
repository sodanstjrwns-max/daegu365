// /region/{slug} 지역 페이지 보강 데이터 (2026-10-08 작성·2026-10-11 반영, 지역 SEO 웨이브 — "숨기지 말고 살리는" 방향)
// - D1 region_seo 행은 존재 여부·지역명·진료 slug 만 쓰고, 화면 본문·title·H1·설명·FAQ 는 이 레포 데이터에서 렌더한다
//   (원격 D1 쓰기 없음). 예전 D1 본문은 지역끼리 5-gram 유사도 0.4~0.8 로 거의 같은 글이었고,
//   확인되지 않은 주장(의료진 수·장비 가동·협진·가격·지하철 등)과 마크다운 원문 노출이 섞여 있어 화면에서 내렸다.
// - 본문은 레포·화면에 있는 병원 사실(주소·정류장·주차·진료시간·의료진·장비)과 일반적인 지리·치의학 지식만 쓴다.
//   버스 번호·소요 시간·역 이름·가격·실적 수치는 쓰지 않는다.
// - 이 데이터가 있는 slug 만 index, follow + 사이트맵 포함. 데이터 없는 새 D1 행은 예전처럼 noindex.
import type { RegionPage } from './types'
import { REGION_GROUP_A } from './group-a'
import { REGION_GROUP_B } from './group-b'
import { REGION_GROUP_C } from './group-c'
import { REGION_GROUP_D } from './group-d'
import { REGION_GROUP_E } from './group-e'

export type { RegionPage } from './types'

/** 사이트 반영일(고정값 — new Date() 금지). 원고는 2026-10-08 작성, 2026-10-11 통합·배포. 사이트맵 lastmod·dateModified 로 쓴다. */
export const REGION_PAGES_DATE = '2026-10-11'

export const REGION_PAGES: Record<string, RegionPage> = {
  ...REGION_GROUP_A, ...REGION_GROUP_B, ...REGION_GROUP_C, ...REGION_GROUP_D, ...REGION_GROUP_E,
}

export const hasRegionPage = (slug: string): boolean => Object.prototype.hasOwnProperty.call(REGION_PAGES, slug)

/** 브랜드 접미사(" | 대구365치과")를 뗀 제목 — 렌더러가 접미사를 붙이는 경로용 */
export const regionTitleParts = (p: RegionPage, siteName: string): { title?: string, fullTitle?: string } => {
  const suffix = ` | ${siteName}`
  if (p.title.endsWith(suffix)) return { title: p.title.slice(0, -suffix.length) }
  return { fullTitle: p.title }
}

/** 스키마 audience/areaServed 용 행정구역 이름 (D1 region_name 기준) */
export const regionAreaName = (regionName: string): string => {
  const n = String(regionName || '').trim()
  const map: Record<string, string> = {
    '대구': '대구광역시',
    '대구 북구': '대구광역시 북구', '북구': '대구광역시 북구',
    '침산동': '대구광역시 북구 침산동', '산격동': '대구광역시 북구 산격동',
    '대구 수성구': '대구광역시 수성구', '수성구': '대구광역시 수성구', '범어동': '대구광역시 수성구 범어동',
    '중구': '대구광역시 중구', '동구': '대구광역시 동구', '서구': '대구광역시 서구', '남구': '대구광역시 남구',
    '달서구': '대구광역시 달서구', '달성군': '대구광역시 달성군',
  }
  return map[n] || (n.startsWith('대구') ? n.replace(/^대구\s*/, '대구광역시 ') : `대구광역시 ${n}`)
}
