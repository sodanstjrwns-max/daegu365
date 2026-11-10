// ============================================================
// 구글 전용 검색 제외 (2026-11-10)
//
// 배경: 구글이 이 사이트를 사이트 단위로 판정해 홈 한 장만 색인하고 있다(직접 조치·기술 오류 없음,
//   백과·지역 조합을 대량 공개한 뒤 전체 탈락). 방문의 대부분은 네이버에서 백과·용어 페이지로 들어온다.
//   → 대량 생성 구역을 "구글에만" 검색 제외해서, 구글이 보는 사이트를 병원 핵심 페이지 수십 쪽으로 줄여 재평가를 받는다.
//
// 방식: 요청 User-Agent 가 구글 크롤러(Googlebot · Google-InspectionTool)이고 경로가 아래 대상 구역일 때만,
//   200 HTML 응답에 `X-Robots-Tag: googlebot: noindex` 를 붙인다(이미 값이 있으면 교체 — 두 값이 같이 나가지 않게).
//   그 밖의 모든 요청(네이버 Yeti · Bing · 일반 브라우저 · AI 봇)은 헤더와 본문이 한 글자도 달라지지 않는다.
//   HTML 메타 태그 · robots.txt · 사이트맵 · canonical · 제목 · 본문 · 스키마는 건드리지 않는다.
//   이 사이트는 HTML 응답을 캐시에 저장하지 않으므로(caches.default · KV 없음) 구글용 응답이 다른 방문자에게 재사용되지 않는다.
//   HTML 응답 캐시를 새로 넣게 되면, 이 헤더가 저장본에 들어가지 않게 캐시에서 꺼낸 뒤 요청마다 붙여야 한다.
//
// 되돌리는 방법: isGoogleHiddenPath 가 항상 false 를 돌려주게 하면 끝(첫 줄에 `return false`).
// ============================================================

/** 구글 색인 크롤러인가. Google-Extended · GoogleOther · AdsBot · Mediapartners 는 대상이 아니다. */
export const isGoogleCrawler = (ua: string | null | undefined): boolean =>
  /googlebot|google-inspectiontool/i.test(ua || '')

// 레포 마이그레이션(migrations/0040_blog_seo_batch2.sql)으로 일괄 발행한 칼럼 6편.
// 관리자 화면에서 올린 글(D1 에만 있는 나머지 칼럼)은 대상이 아니다 — 새 글을 올려도 여기에 넣지 않는 한 가려지지 않는다.
const BATCH_BLOG_SLUGS = new Set([
  'scaling-insurance-complete-guide',
  'wisdom-tooth-when-to-extract',
  'implant-bone-graft-explained',
  'root-canal-crown-necessity',
  'bruxism-nightguard-guide',
  'whitening-vs-laminate-choice',
])

/**
 * 구글에만 가리는 경로인가 (경로 판정은 이 함수 한 곳).
 * 가린다: 백과(/dictionary 목록 + /dictionary/*), 지역×진료 조합(/region/*), 일괄 발행 칼럼 6편.
 * 남긴다: 홈 · 진료 · 의료진 · 비용 · 소개 · 오시는 길 · 진료시간 · FAQ · 공지 · 치료 사례 · 칼럼 목록과 관리자 발행 칼럼,
 *         그리고 주 지역 허브 /regions("대구 북구 치과").
 */
export const isGoogleHiddenPath = (pathname: string): boolean => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (path === '/dictionary' || path.startsWith('/dictionary/')) return true
  if (path.startsWith('/region/')) return true // '/regions' 는 '/region/' 로 시작하지 않으므로 남는다
  if (path.startsWith('/blog/')) return BATCH_BLOG_SLUGS.has(path.slice('/blog/'.length))
  return false
}

export const GOOGLE_HIDE_HEADER = 'googlebot: noindex'
