import { Navbar, Footer } from '../components/Layout'

// ============================================================
// /regions — "대구 북구 치과" 대표 키워드 허브 (2026-10-08, 지역 SEO 웨이브 §1)
// - URL 은 기존 /regions 유지(홈·푸터·404 에서 이미 링크), title·H1 을 대표 키워드와 정확히 일치시킴
// - 본문은 레포에 이미 있는 사실만: 주소·전화·진료시간(renderer SITE·misc.tsx 진료시간/오시는 길), 의료진(D1 doctors),
//   진료 목록(D1 treatments). 거리·지하철 등 확인되지 않은 정보는 쓰지 않는다.
// - FAQ 는 화면과 FAQPage 스키마 1:1 (REGIONS_HUB_FAQS 한 곳에서 둘 다 생성)
// ============================================================

export const REGIONS_HUB_DATE = '2026-10-08'

export const REGIONS_HUB_TITLE = '대구 북구 치과'

export const REGIONS_HUB_DESC =
  '대구 북구 치과를 찾는 분께 — 침산로 148 엠브로스퀘어 7층 대구365치과의 위치·주차, 월·목 21시 야간과 토·일 진료시간, 의료진 6인, 임플란트·교정·충치·소아 진료를 한 페이지에 정리했습니다.'

export const REGIONS_HUB_FAQS: { q: string, a: string }[] = [
  {
    q: '대구 북구에서 퇴근 후에 치과 진료를 받을 수 있나요?',
    a: '대구365치과는 월요일과 목요일에 저녁 9시(21:00)까지 진료합니다. 화·수·금요일은 18시 30분까지이므로, 퇴근 후 방문이 필요하면 월·목 저녁 시간으로 예약하시는 것이 편합니다.',
  },
  {
    q: '토요일이나 일요일에도 진료하나요?',
    a: '토요일과 일요일 모두 09:30부터 17:00까지 진료합니다. 공휴일 진료 여부는 날짜마다 다를 수 있어 053-357-0365로 전화해 확인해 주세요.',
  },
  {
    q: '차를 가지고 가도 되나요? 주차는 어떻게 하나요?',
    a: '병원이 있는 엠브로스퀘어 건물에 주차할 수 있습니다. 대중교통을 이용하시면 엠브로스퀘어 버스 정류장 바로 앞에서 내리시면 됩니다.',
  },
  {
    q: '아이와 함께 가도 진료받을 수 있나요?',
    a: '소아치과 전문의가 진료하고 있어 어린이 충치 치료, 불소 도포·실란트 같은 예방 진료, 성장기 교정 상담을 받을 수 있습니다. 아이가 긴장하는 편이면 예약 때 미리 말씀해 주세요.',
  },
  {
    q: '치과가 너무 무서운데 상담만 먼저 받아도 되나요?',
    a: '상담만 먼저 받으셔도 됩니다. 치료가 필요하면 진정(수면) 치료나 단계별 마취 방법 중 어떤 방식이 맞는지 상태를 보고 함께 정합니다. 네이버 예약이나 전화로 상담 시간을 잡으실 수 있습니다.',
  },
]

const HOURS = [
  { day: '월·목', time: '09:30 – 21:00', note: '야간 진료' },
  { day: '화·수·금', time: '09:30 – 18:30', note: '' },
  { day: '토·일', time: '09:30 – 17:00', note: '주말 진료' },
]

const DOCTORS = [
  { slug: 'kim-seongju', name: '김성주', role: '대표원장 · 임플란트, 상악동 거상술, 사랑니 발치' },
  { slug: 'jung-jaeheon', name: '정재헌', role: '통합진료센터장 · 보존과 전문의' },
  { slug: 'kim-sangwon', name: '김상원', role: '자연치아살리기 센터장 · 보존과 전문의' },
  { slug: 'choi-hyejung', name: '최혜정', role: '비니크(라미네이트) 센터장 · 보존과 전문의' },
  { slug: 'kim-jinduk', name: '김진덕', role: '교정과 전문의 · 인비절라인, 소아·성인 교정' },
  { slug: 'han-jieun', name: '한지은', role: '소아치과 전문의 · 통합치의학 전문의' },
]

const CARE = [
  { href: '/treatments/implant', name: '수면임플란트', line: '치과 치료가 두려운 분을 위해 진정 상태에서 임플란트를 진행하는 방식' },
  { href: '/treatments/implant-general', name: '임플란트', line: '상실 치아 진단부터 식립·보철·정기 관리까지의 과정' },
  { href: '/treatments/cavity-endo-crown', name: '충치·신경치료·크라운', line: '자연치아를 최대한 남기는 보존 치료 중심' },
  { href: '/treatments/ortho', name: '인비절라인(교정)', line: '교정과 전문의가 진단하는 투명교정·브라켓 교정' },
  { href: '/treatments/perio', name: '치주치료', line: '잇몸 출혈·시림·흔들림이 있을 때 받는 잇몸 치료' },
  { href: '/treatments/pediatric', name: '소아치과', line: '어린이 충치 치료와 불소·실란트 예방 진료' },
  { href: '/treatments/lamineer', name: '라미네이트', line: '앞니 모양·색을 다듬는 심미 보철' },
  { href: '/treatments/sleep-therapy', name: '수면치료 시스템', line: '치과 공포가 큰 분을 위한 진정 치료 안내' },
]

export const RegionsHubPage = ({ byRegion, tNameBySlug }: { byRegion: Record<string, any[]>, tNameBySlug: Record<string, string> }) => (
  <>
    <Navbar />
    <section class="pt-20 pb-12 bg-cream">
      <div class="max-w-5xl mx-auto px-6">
        <nav class="text-xs text-brown-500 mb-6" aria-label="breadcrumb">
          <a href="/" class="hover:text-brown-900">홈</a>
          <span class="mx-2">›</span>
          <span class="text-brown-900">대구 북구 치과</span>
        </nav>
        <div class="section-label mb-6">DAEGU BUK-GU · CHIMSAN</div>
        <h1 class="display text-4xl md:text-6xl font-light mb-6">대구 북구 치과</h1>
        <p class="text-brown-700 max-w-3xl text-lg leading-relaxed">
          대구365치과는 대구 북구 침산동, 침산로 148 엠브로스퀘어 7층에 있는 치과입니다.
          북구에서 치과를 찾으실 때 가장 많이 물어보시는 위치와 주차, 평일 야간·주말 진료시간, 어떤 의료진이 어떤 진료를 맡는지를 이 페이지 한 곳에 모았습니다.
        </p>
        <div class="mt-8 flex flex-wrap gap-3 text-sm">
          <a href="tel:053-357-0365" class="px-5 py-2.5 rounded-full bg-brown-900 text-ivory hover:bg-brown-800 transition">053-357-0365 전화 문의</a>
          <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="px-5 py-2.5 rounded-full text-white hover:opacity-90 transition" style="background:#03C75A;">네이버 예약</a>
          <a href="/directions" class="px-5 py-2.5 rounded-full border border-brown-400 text-brown-900 hover:bg-brown-100 transition">오시는 길 자세히</a>
        </div>
      </div>
    </section>

    <section class="py-14 max-w-5xl mx-auto px-6 text-brown-700 leading-loose">
      <h2 class="display text-3xl font-medium text-brown-900 mb-5">위치와 찾아오는 길</h2>
      <p>
        주소는 <strong class="text-brown-900">대구광역시 북구 침산로 148 엠브로스퀘어 7층</strong>(우편번호 41545)입니다.
        버스를 타고 오시면 건물 바로 앞 ‘엠브로스퀘어’ 정류장에서 내리시면 되고, 자가용으로 오시는 분은 같은 건물에 주차하실 수 있습니다.
        처음 오시는 길이라면 아래 지도 앱에서 ‘대구365치과’를 검색하면 건물 입구까지 안내받을 수 있습니다.
      </p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm">
        <a href="https://map.kakao.com/?q=%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%81%EA%B5%AC%20%EC%B9%A8%EC%82%B0%EB%A1%9C%20148" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full font-bold bg-yellow-400 text-brown-950">카카오맵 길찾기</a>
        <a href="https://map.naver.com/p/search/%EB%8C%80%EA%B5%AC365%EC%B9%98%EA%B3%BC" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full font-bold text-white" style="background:#03C75A;">네이버 지도</a>
      </div>

      <h2 class="display text-3xl font-medium text-brown-900 mt-14 mb-5">진료시간 — 평일 야간과 주말</h2>
      <p>
        직장이나 학교 때문에 평일 낮 시간을 내기 어려운 북구 주민을 위해 월·목요일은 밤 9시까지, 토·일요일은 오후 5시까지 진료합니다.
        점심시간(12:30~14:00)에는 접수가 쉬므로 그 전후로 방문 시간을 잡아 주세요.
      </p>
      <div class="mt-5 grid sm:grid-cols-3 gap-3">
        {HOURS.map(h => (
          <div class="lux-card">
            <div class="text-xs text-brown-500 mb-1">{h.note || '평일'}</div>
            <div class="display text-xl font-medium text-brown-900">{h.day}</div>
            <div class="text-brown-700">{h.time}</div>
          </div>
        ))}
      </div>
      <p class="text-sm text-brown-500 mt-3">공휴일 진료는 날짜마다 다를 수 있어 전화(053-357-0365)로 확인해 주세요.</p>

      <h2 class="display text-3xl font-medium text-brown-900 mt-14 mb-5">진료하는 의료진</h2>
      <p>
        여섯 명의 원장이 진료 분야를 나누어 맡고, 한 환자의 치료에 여러 분야가 얽혀 있으면 함께 상의해 계획을 세웁니다.
        이름을 누르면 각 원장의 진료 분야와 이력을 볼 수 있습니다.
      </p>
      <ul class="mt-5 grid md:grid-cols-2 gap-3">
        {DOCTORS.map(d => (
          <li class="lux-card">
            <a href={`/doctors/${d.slug}`} class="display text-lg font-medium text-brown-900 hover:underline">{d.name} 원장</a>
            <div class="text-sm text-brown-600 mt-1">{d.role}</div>
          </li>
        ))}
      </ul>

      <h2 class="display text-3xl font-medium text-brown-900 mt-14 mb-5">주요 진료 안내</h2>
      <p>
        빠진 치아를 대신하는 임플란트, 충치와 신경치료처럼 자연치아를 지키는 치료, 치열을 바로잡는 교정, 아이 진료까지 한 곳에서 받으실 수 있습니다.
        각 진료 페이지에는 진행 순서와 자주 묻는 질문이 정리되어 있습니다.
      </p>
      <ul class="mt-5 grid md:grid-cols-2 gap-3">
        {CARE.map(t => (
          <li>
            <a href={t.href} class="block lux-card hover:bg-brown-50 transition">
              <div class="display text-lg font-medium text-brown-900">{t.name}</div>
              <div class="text-sm text-brown-600 mt-1">{t.line}</div>
            </a>
          </li>
        ))}
      </ul>
      <p class="mt-4 text-sm"><a href="/treatments" class="underline">전체 진료 보기</a> · <a href="/fees" class="underline">비용 안내</a> · <a href="/doctors" class="underline">의료진 전체</a></p>

      <h2 class="display text-3xl font-medium text-brown-900 mt-14 mb-5">대구 북구 주민이 자주 묻는 질문</h2>
      <div class="space-y-3">
        {REGIONS_HUB_FAQS.map((f, i) => (
          <details class="group bg-ivory rounded-2xl overflow-hidden border border-brown-200" open={i === 0}>
            <summary class="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-brown-50">
              <span class="font-medium text-brown-900">{f.q}</span>
              <i class="fas fa-chevron-down text-brown-400 group-open:rotate-180 transition ml-4"></i>
            </summary>
            <div class="px-5 pb-5 pt-2 text-brown-700 leading-relaxed border-t border-brown-100">{f.a}</div>
          </details>
        ))}
      </div>
    </section>

    <section class="py-14 bg-cream">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="display text-3xl font-medium text-brown-900 mb-3">대구 다른 지역에서 오시는 분께</h2>
        <p class="text-brown-700 mb-10">수성구·중구·동구·서구·남구·달서구·달성군 등에서 오시는 분을 위한 진료별 안내도 함께 정리해 두었습니다.</p>
        {Object.entries(byRegion).map(([region, items]) => (
          <div class="mb-12">
            <h3 class="display text-2xl font-medium mb-6 pb-3 border-b border-brown-200">{region}</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(items as any[]).map((r: any) => (
                <a href={`/region/${r.slug}`} class="lux-card hover:shadow-lg transition">
                  <div class="text-xs text-brown-500 mb-2">{r.treatment_slug ? tNameBySlug[r.treatment_slug] || r.treatment_slug : '종합진료'}</div>
                  <div class="display text-lg font-medium mb-1">{r.h1}</div>
                  <div class="text-xs text-brown-600 line-clamp-2">{r.meta_description}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer />
  </>
)
