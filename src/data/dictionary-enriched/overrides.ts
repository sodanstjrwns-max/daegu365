// 용어명·정의 코드 오버라이드 (2026-10-08 작성, 2026-10-11 반영) — 원격 D1 쓰기 없이 화면·title·스키마·빵부스러기에 바른 이름을 쓴다.
// D1 dictionary 행의 이름(term)이나 짧은 정의(short_desc)가 실제 내용(보강 본문·D1 상세 설명)과 어긋나는 용어만 둔다.
// - term / short_desc: 지정하면 그대로 덮어씀
// - replace: D1 본문 필드(term·short_desc·full_desc·long_desc·key_points·usage_context·cautions·faq_json)에서
//   잘못된 표기를 바른 표기로 바꿈 (보강 데이터 batch-*.ts 쪽은 파일에서 직접 고쳤다)
// 쓰는 곳: 용어 상세·목록·허브 추천·진료 페이지 용어 칩·지역 페이지 관련 용어 등 dictionary 행을 읽는 모든 라우트(applyDictOverride).

export interface DictOverride {
  term?: string
  short_desc?: string
  replace?: [string, string][]
}

export const DICT_OVERRIDES: Record<string, DictOverride> = {
  // D1 이름 '영구조직억제제'는 엉뚱한 이름 — 실제는 에나멜 기질 유도체(EMD) 젤, 상품명 엠도게인
  'emdogain': {
    term: '엠도게인',
    short_desc: '에나멜 기질 유도체(EMD) 젤 — 치주 재생 수술에서 뿌리 표면에 바르는 재료',
    replace: [['영구조직억제제', '엠도게인']],
  },
  // '어트랙트먼트'는 오기 — 바른 표기 어태치먼트(attachment)
  'attachment': {
    term: '투명교정 어태치먼트',
    replace: [['투명교정어트랙트먼트', '투명교정 어태치먼트'], ['어트랙트먼트', '어태치먼트']],
  },
  // '근관파절'은 치아(뿌리)가 깨진 것으로 읽힘 — 실제 내용은 근관 안에서 기구(파일)가 부러진 상황
  'instrument-fracture': {
    term: '근관 내 기구 파절',
    replace: [['근관파절', '기구 파절']],
  },
  // '부직접치수복'은 잘린 이름 — 표준 용어는 간접치수복조(indirect pulp capping)
  'indirect-pulp-capping': {
    term: '간접치수복조',
    replace: [['부직접치수복조술', '간접치수복조술'], ['부직접치수복조', '간접치수복조'], ['부직접치수복', '간접치수복조']],
  },
  // '직접치수복'은 잘린 이름 — 직접치수복조(direct pulp capping)
  'direct-pulp-capping': {
    term: '직접치수복조',
  },
  // '측두두부'는 오기 — 세팔로그램은 두부 계측 방사선 사진(측모 두부 방사선)
  'cephalogram': {
    short_desc: '두부 계측 방사선 사진(측모 두부 방사선)',
    replace: [['측두두부', '측모 두부']],
  },
  // '치관천공'은 범위가 좁은 이름 — 설명은 치관·치근(근관 벽·바닥) 천공 전체를 다룸
  'perforation': {
    term: '치아 천공',
    short_desc: '치아 천공(치관·치근)',
    replace: [['치관천공', '치아 천공']],
  },
}

/** 오버라이드·표기 수정이 실제 반영된 날짜(고정값 — new Date() 금지). 해당 용어의 lastmod·dateModified 에 쓴다. */
export const DICT_REVISED_DATE = '2026-10-11'

/** 2026-10-11 에 이름·표기가 바뀐 용어: 오버라이드 대상 + 보강 본문(batch-01·07·08)에서 표기를 고친 용어 */
export const DICT_REVISED_SLUGS: ReadonlySet<string> = new Set([
  ...Object.keys(DICT_OVERRIDES),
  'bodily-movement', 'clincheck', 'deep-bite', 'remote-monitoring', 'rotation',
])

const TEXT_FIELDS = ['term', 'short_desc', 'full_desc', 'long_desc', 'key_points', 'usage_context', 'cautions', 'faq_json'] as const

/** dictionary 행 하나에 오버라이드 적용(원본 객체는 건드리지 않고 복사본 반환) */
export function applyDictOverride<T>(row: T): T {
  const r = row as any
  if (!r || !r.slug) return row
  const o = DICT_OVERRIDES[r.slug]
  if (!o) return row
  const out: any = { ...r }
  if (o.replace) {
    for (const f of TEXT_FIELDS) {
      if (typeof out[f] !== 'string' || !out[f]) continue
      let v: string = out[f]
      for (const [from, to] of o.replace) v = v.split(from).join(to)
      out[f] = v
    }
  }
  if (o.term) out.term = o.term
  if (o.short_desc) out.short_desc = o.short_desc
  return out as T
}

/** 여러 행에 적용 */
export const applyDictOverrides = <T>(rows: T[] | undefined | null): T[] => ((rows || []) as T[]).map(applyDictOverride)
