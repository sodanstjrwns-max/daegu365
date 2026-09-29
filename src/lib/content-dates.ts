// ============================================================
// 사이트맵 lastmod 용 콘텐츠 날짜 (2026-09-29)
// 예전엔 sitemap-main 정적 13개 URL 이 매일 new Date()(오늘)였다 → 콘텐츠의 실제 수정일로 교체.
// - 정적 페이지: 해당 페이지 파일(컴포넌트)의 마지막 커밋 날짜 — vite.config.ts 가 빌드 시 __CONTENT_DATES__ 로 주입
// - 마이그레이션으로만 내용이 바뀌는 D1 테이블(의료진·진료·FAQ·지역): 그 테이블을 쓰는 마이그레이션의 마지막 커밋 날짜
// - 얕은 클론·git 없음 → 아래 폴백(2026-09-29 산출값)
// 날짜를 알 수 없으면 lastmod 를 생략한다(오늘 날짜로 채우지 않음).
// ============================================================
declare const __CONTENT_DATES__: Record<string, string> | undefined

const FALLBACK: Record<string, string> = {
  home: '2026-09-29',
  mission: '2026-08-18',
  directions: '2026-08-02',
  hours: '2026-08-02',
  feesPage: '2026-06-05',
  doctorsData: '2026-08-02',
  treatmentsData: '2026-06-12',
  faqsData: '2026-06-12',
  regionsData: '2026-04-20',
}

export const isYmd = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)

const injected: Record<string, string> = (typeof __CONTENT_DATES__ !== 'undefined' && __CONTENT_DATES__) || {}

export const CONTENT_DATES: Record<string, string> = Object.fromEntries(
  Object.keys(FALLBACK).map((k) => [k, isYmd(injected[k]) ? injected[k] : FALLBACK[k]])
)

/** YYYY-MM-DD 문자열 중 가장 최근 값. 유효한 값이 없으면 '' */
export const latestDate = (...dates: (string | null | undefined)[]): string =>
  dates.filter(isYmd).sort().pop() || ''
