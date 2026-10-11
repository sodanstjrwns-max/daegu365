// 대표 키워드 허브 내부 링크 (2026-10-11, INTERNAL_LINK_RULES) — 허브 /regions, 앵커는 정확히 "대구 북구 치과"
// - 한 페이지에 허브 링크 최대 2개(본문 1 + 푸터 1), nofollow 금지, 허브 자신에는 자기 링크 없음
// - 블로그 끝 문장은 4개 문형 중 slug 해시로 고정 선택(글마다 같은 문장 반복 방지, 요청마다 바뀌지 않음)

export const HUB_PATH = '/regions'
export const HUB_ANCHOR = '대구 북구 치과'

const HubA = () => <a href={HUB_PATH} class="underline underline-offset-4 hover:text-brown-900">{HUB_ANCHOR}</a>

/** slug → 0..n-1 고정 해시 */
const pick = (key: string, n: number): number => {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h % n
}

/** 본문 HTML 에 이미 허브 링크가 있으면 끝 문장을 생략한다 */
export const htmlHasHubLink = (html: string): boolean =>
  /href=["'](?:https?:\/\/(?:www\.)?daegu365dc\.kr)?\/regions["'?#]/.test(String(html || ''))

/** 블로그 상세 본문 끝(작성 박스 위) 지역 안내 1문장 */
export const BlogHubSentence = ({ slug }: { slug: string }) => {
  const i = pick(String(slug || ''), 4)
  return (
    <p class="mt-12 text-[15px] text-brown-700 leading-relaxed">
      {i === 0 && <>대구365치과는 <HubA />를 찾는 침산동·북구 주민분들께 진료시간과 찾아오는 길을 한곳에 정리해 두었습니다.</>}
      {i === 1 && <>침산동 엠브로스퀘어 7층의 위치와 진료시간은 <HubA /> 안내에서 확인하실 수 있습니다.</>}
      {i === 2 && <>북구에서 다닐 치과를 알아보고 계시다면 <HubA /> 페이지에서 진료 과목과 오시는 길을 함께 보실 수 있습니다.</>}
      {i === 3 && <>월·목 야간과 토·일 진료 일정, 주차 안내는 <HubA /> 안내 페이지에 모아 두었습니다.</>}
    </p>
  )
}

/** 진료 상세 하단(상담 CTA 아래·푸터 위) 한 줄 */
export const TreatmentHubLine = () => (
  <section class="py-8 bg-cream">
    <p class="max-w-4xl mx-auto px-6 text-center text-sm text-brown-700">
      침산동 엠브로스퀘어 7층 위치와 진료시간·의료진은 <HubA /> 안내에서 한눈에 볼 수 있습니다.
    </p>
  </section>
)

/** 백과사전 용어 상세 하단 관련 링크 영역 한 줄 */
export const DictionaryHubLine = () => (
  <p class="mt-10 text-sm text-brown-600">대구365치과의 위치·진료시간은 <HubA /> 안내에서 확인할 수 있습니다.</p>
)
