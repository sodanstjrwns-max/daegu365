// 용어 유형 — 유형마다 소제목·섹션 순서를 달리해 템플릿 유사도를 낮춘다
// disease: 질환·증상 / procedure: 시술·술식 / material: 재료·약제 / equipment: 장비·검사
// anatomy: 해부·구조·발달 / system: 보험·제도·행정·디지털·생활
export type DictKind = 'disease' | 'procedure' | 'material' | 'equipment' | 'anatomy' | 'system'

export interface DictEnriched {
  kind: DictKind
  /** 화면에 h2 + 문단으로 렌더되는 추가 섹션(3~4개) */
  sections: { h: string, p: string[] }[]
  /** 화면 FAQ 와 FAQPage 스키마에 1:1 로 쓰이는 질문(2~3개) */
  faq: { q: string, a: string }[]
  /** 관련 용어 slug(/dictionary/{slug}) */
  related: string[]
  /** 관련 진료 slug(/treatments/{slug}) */
  treatments: string[]
}
