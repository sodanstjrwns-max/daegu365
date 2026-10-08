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
  home: '2026-10-08',
  mission: '2026-08-18',
  directions: '2026-08-02',
  hours: '2026-08-02',
  feesPage: '2026-06-05',
  doctorsData: '2026-08-02',
  treatmentsData: '2026-06-12',
  faqsData: '2026-06-12',
  regionsData: '2026-04-20',
  regionsHub: '2026-10-08',
}

export const isYmd = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)

const injected: Record<string, string> = (typeof __CONTENT_DATES__ !== 'undefined' && __CONTENT_DATES__) || {}

export const CONTENT_DATES: Record<string, string> = Object.fromEntries(
  Object.keys(FALLBACK).map((k) => [k, isYmd(injected[k]) ? injected[k] : FALLBACK[k]])
)

/** YYYY-MM-DD 문자열 중 가장 최근 값. 유효한 값이 없으면 '' */
export const latestDate = (...dates: (string | null | undefined)[]): string =>
  dates.filter(isYmd).sort().pop() || ''

// ============================================================
// D1 날짜 → ISO 8601 (2026-09-29)
// D1(SQLite) created_at/updated_at 은 DEFAULT CURRENT_TIMESTAMP·updated_at=CURRENT_TIMESTAMP 로 기록된
// 'YYYY-MM-DD HH:MM:SS' = UTC 시각(시간대 표기 없음). 예전엔 이 문자열을 스키마 datePublished/dateModified·
// og article:*_time 에 그대로 넣어 ISO 8601 이 아니었고(T·시간대 없음), 화면·사이트맵 날짜는 UTC 날짜였다.
// → 스키마·og 는 KST 오프셋을 붙인 ISO 8601('2026-08-02T19:09:59+09:00'), 화면·사이트맵은 KST 날짜로 통일.
// ============================================================
const KST_MS = 9 * 60 * 60 * 1000

/** D1 날짜 → 'YYYY-MM-DDTHH:MM:SS+09:00'. 시간대 없는 값은 UTC 로 해석, 날짜만 있으면 그대로, 무효·빈 값 → undefined */
export const toIsoKst = (v: unknown): string | undefined => {
  if (v == null || v === '') return undefined
  const s = String(v).trim().replace(' ', 'T')
  if (isYmd(s)) return s
  const d = new Date(/(Z|[+-]\d{2}:?\d{2})$/i.test(s) ? s : s + 'Z')
  if (isNaN(d.getTime())) return undefined
  return new Date(d.getTime() + KST_MS).toISOString().slice(0, 19) + '+09:00'
}

/** D1 날짜 → KST 기준 'YYYY-MM-DD'. 무효·빈 값 → '' */
export const kstYmd = (v: unknown): string => (toIsoKst(v) || '').slice(0, 10)
