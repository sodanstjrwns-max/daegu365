export interface RegionPage {
  /** <title> 전체 (병원명 포함) */
  title: string
  h1: string
  /** 메타 설명 */
  description: string
  /** 첫 문단 */
  lead: string
  /** 화면에 h2 + 문단으로 렌더 (2~4개, 그중 하나는 지역 출발 기준 오시는 길·일정) */
  sections: { h: string, p: string[] }[]
  /** 화면 FAQ 와 FAQPage 스키마 1:1 (3개) */
  faq: { q: string, a: string }[]
  /** 관련 진료 slug (/treatments/{slug}) */
  treatments: string[]
}
