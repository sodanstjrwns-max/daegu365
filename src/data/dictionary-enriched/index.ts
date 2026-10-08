// 치과 백과사전 보강 데이터 (2026-10-08, 지역 SEO 웨이브 §2 "허접한 걸 살리는" 방향)
// - 용어 본문은 D1 dictionary 행에 있고, 얇았던 용어의 추가 섹션·FAQ·관련 링크는 이 레포 데이터 파일에 둔다
//   (원격 D1 쓰기 없이 코드로 병합 — 렌더 시 slug 로 합침).
// - 색인 여부는 D1 indexable 플래그 대신 코드에서 판정: 보강 데이터가 있거나, 화면 본문이 임계값 이상이면 index.
// - 동의어 용어는 301 로 한쪽에 합친다(DICT_ALIASES). 합쳐진 쪽 slug 는 목록·사이트맵·관련 용어에서 제외.
import { kstYmd, latestDate } from '../../lib/content-dates'
import type { DictEnriched } from './types'
import { BATCH_01 } from './batch-01'
import { BATCH_02 } from './batch-02'
import { BATCH_03 } from './batch-03'
import { BATCH_04 } from './batch-04'
import { BATCH_05 } from './batch-05'
import { BATCH_06 } from './batch-06'
import { BATCH_07 } from './batch-07'
import { BATCH_08 } from './batch-08'
import { BATCH_09 } from './batch-09'

export type { DictEnriched, DictKind } from './types'

/** 보강 작성일(고정값 — new Date() 금지). 보강 용어의 lastmod·dateModified 로 쓴다. */
export const ENRICHED_DATE = '2026-10-08'

export const DICT_ENRICHED: Record<string, DictEnriched> = {
  ...BATCH_01, ...BATCH_02, ...BATCH_03, ...BATCH_04, ...BATCH_05,
  ...BATCH_06, ...BATCH_07, ...BATCH_08, ...BATCH_09,
}

/** 동의어·중복 용어 → 정식 용어 slug (301). 정식 쪽 페이지에 "같은 뜻으로 쓰는 말"로 표시된다. */
export const DICT_ALIASES: Record<string, { to: string, term: string }> = {
  'gbr': { to: 'guided-bone-regeneration', term: 'GBR치주' },
  'pocket': { to: 'periodontal-pocket', term: '치주포켓' },
  'dental-microscope': { to: 'microscope', term: '치과현미경' },
  'digital-guide': { to: 'surgical-guide', term: '디지털가이드' },
  'intraoral-scan': { to: 'digital-impression', term: '3D스캔' },
  'dental-ct': { to: 'cone-beam-ct', term: 'CT검사' },
  'biofilm': { to: 'plaque', term: '치아세균막' },
  'socket-preservation': { to: 'ridge-preservation', term: '소켓보존술' },
  'gum-line-contouring': { to: 'gingivectomy', term: '잇몸라인성형' },
}

export const isDictAlias = (slug: string): boolean => Object.prototype.hasOwnProperty.call(DICT_ALIASES, slug)

/** 정식 용어 slug 에 합쳐 들어온 동의어 이름들 */
export const dictAliasNames = (slug: string): string[] =>
  Object.values(DICT_ALIASES).filter(a => a.to === slug).map(a => a.term)

/** /dictionary/{alias} → /dictionary/{정식} 301 경로 맵 (index.tsx ALIAS_REDIRECTS 에 병합) */
export const DICT_ALIAS_REDIRECTS: Record<string, string> = Object.fromEntries(
  Object.entries(DICT_ALIASES).map(([from, a]) => [`/dictionary/${from}`, `/dictionary/${a.to}`])
)

/** 보강 없이도 색인할 화면 본문 글자수 임계값(요약·설명·상세·핵심·활용·주의·FAQ 합). */
export const DICT_MIN_INDEX_CHARS = 1500

const len = (v: unknown): number => (typeof v === 'string' ? v.trim().length : 0)

/** 화면에 보이는 본문 글자수(D1 필드 + 보강 섹션·FAQ) */
export const dictBodyChars = (row: any): number => {
  let n = len(row?.short_desc) + len(row?.full_desc) + len(row?.long_desc) + len(row?.key_points)
    + len(row?.usage_context) + len(row?.cautions) + len(row?.faq_json)
  const e = row?.slug ? DICT_ENRICHED[row.slug] : undefined
  if (e) {
    for (const s of e.sections) n += len(s.h) + s.p.reduce((a, p) => a + len(p), 0)
    for (const f of e.faq) n += len(f.q) + len(f.a)
  }
  return n
}

/** 색인 판정(코드) — 동의어(301) 제외, D1 리라이트 완료(indexable=1)·보강 데이터 보유·본문 임계값 이상이면 index */
export const isDictIndexable = (row: any): boolean => {
  if (!row?.slug || isDictAlias(row.slug)) return false
  if (Number(row.indexable) === 1) return true
  if (DICT_ENRICHED[row.slug]) return true
  return dictBodyChars(row) >= DICT_MIN_INDEX_CHARS
}

/** 용어 페이지의 실제 수정일(KST YYYY-MM-DD): max(D1 updated_at/created_at, 보강일) */
export const dictLastmod = (row: any): string =>
  latestDate(kstYmd(row?.updated_at || row?.created_at), row?.slug && DICT_ENRICHED[row.slug] ? ENRICHED_DATE : '')
