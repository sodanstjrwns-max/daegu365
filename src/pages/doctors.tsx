import { Navbar, Footer } from '../components/Layout'
import type { Doctor, Treatment, BeforeAfter, BlogPost } from '../lib/types'

// 의료진 슬러그 → 프로필 사진 매핑 (파일명 기준 7명 + 단체 4장)
// PPT 모바일 슬라이드 7 + PC1 슬라이드 13 — 최혜정 ↔ 김진덕 사진 서로 교체
// export: 진료별 페이지에서도 동일한 매핑을 공유하여 사진이 누락되지 않도록 함
export const DOCTOR_PHOTO: Record<string, string> = {
  'kim-seongju':  '/r2/images/doctors/kim-seongju.jpg',
  'jung-jaeheon': '/r2/images/doctors/jung-jaeheon.jpg',
  'kim-sangwon':  '/r2/images/doctors/kim-sangwon.jpg',
  'choi-hyejung': '/r2/images/doctors/kim-jinduk.jpg',
  'kim-jinduk':   '/r2/images/doctors/choi-hyejung.jpg',
  'han-jieun':    '/r2/images/doctors/han-jieun.jpg',
  'lee-seoyoung': '/r2/images/doctors/lee-seoyoung.jpg',
}
export const getDoctorPhoto = (slug: string) =>
  DOCTOR_PHOTO[slug] || '/r2/images/doctors/team-horizontal-smile.jpg'

// 의료진 슬러그 → 인터뷰 영상 R2 스트리밍 라우트 매핑
// (R2 버킷 daegu365dc-assets 의 한글 master 파일을 /api/videos/:slug 라우트로 서빙)
// ※ 영상은 R2 파일명과 슬러그가 정상 매칭됨 (사진만 스왑 처리됨)
const DOCTOR_VIDEO: Record<string, string> = {
  'kim-seongju':  '/api/videos/kim-seongju',
  'jung-jaeheon': '/api/videos/jung-jaeheon',
  'kim-sangwon':  '/api/videos/kim-sangwon',
  'choi-hyejung': '/api/videos/choi-hyejung',
  'kim-jinduk':   '/api/videos/kim-jinduk',
  'han-jieun':    '/api/videos/han-jieun',
  'lee-seoyoung': '/api/videos/lee-seoyoung',
}
const getDoctorVideo = (slug: string): string | null =>
  DOCTOR_VIDEO[slug] || null

export const DoctorsListPage = ({ doctors }: { doctors: Doctor[] }) => (
  <>
    <Navbar />

    {/* HERO — PPT PC3-S2 반영: 메인 단체사진 삭제, 타이포 중심 + 칩 + CTA */}
    <section class="relative bg-brown-950 text-ivory overflow-hidden">
      {/* 배경 — 부드러운 그라데이션 + 골드 글로우 (단체 사진 제거) */}
      <div
        class="absolute inset-0"
        style="background:
          radial-gradient(ellipse at 20% 30%, rgba(201,168,118,0.18) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 70%, rgba(201,168,118,0.10) 0%, transparent 50%),
          linear-gradient(180deg, #1a1108 0%, #2a1a0d 100%);"
      ></div>
      {/* 장식 라인 */}
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      <div class="relative max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-36 text-center fade-in">
        <div class="text-xs tracking-[0.5em] text-gold mb-8 font-bold">MEDICAL TEAM · 대구365치과</div>

        {/* 7인의 전문 의료진 — 폰트 키움 (PPT 요청) */}
        <h1 class="display font-black tracking-tight leading-[0.92] text-ivory mb-10"
            style="font-size: clamp(3.5rem, 9vw, 8rem);">
          <span class="block">7인의</span>
          <span class="block text-gold mt-2">전문 의료진</span>
        </h1>

        {/* 4개 칩 — 7인 협진 / 365일 진료 / 평일 야간 21시 / 대구침산동 */}
        <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 max-w-3xl mx-auto">
          {[
            { icon: 'fa-user-doctor', text: '7인 협진' },
            { icon: 'fa-calendar-check', text: '365일 진료' },
            { icon: 'fa-moon', text: '평일 야간 21시' },
            { icon: 'fa-location-dot', text: '대구 침산동' },
          ].map(chip => (
            <div class="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/40 bg-gold/5 backdrop-blur-sm">
              <i class={`fas ${chip.icon} text-gold text-sm`}></i>
              <span class="text-sm md:text-base font-semibold text-ivory tracking-wide">{chip.text}</span>
            </div>
          ))}
        </div>

        {/* 카피 */}
        <p class="text-brown-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          보존 · 치주 · 소아 · 교정, 각 분야 전문성을 갖춘 의료진이<br class="hidden md:inline"/>
          협진으로 완성도 있는 치료를 제공합니다.
        </p>

        {/* 2개 CTA — 상담예약하기 + 전화번호 */}
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
          <button
            type="button"
            onclick="window.dispatchEvent(new Event('open-consultation-modal'))"
            class="group flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold text-brown-950 font-bold tracking-wide hover:bg-gold-light hover:-translate-y-0.5 transition-all shadow-lg shadow-gold/20"
          >
            <i class="fas fa-calendar-check"></i>
            <span>상담예약하기</span>
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
          <a
            href="tel:053-357-0365"
            class="group flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-gold/60 text-gold font-bold tracking-wide hover:bg-gold/10 hover:border-gold transition-all"
          >
            <i class="fas fa-phone"></i>
            <span>053-357-0365</span>
          </a>
        </div>
      </div>

      {/* 하단 장식 라인 */}
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
    </section>

    {/* WEEKLY SCHEDULE — 인터랙티브 요일 탭 + 오늘 진료 원장 카드 */}
    <section id="weekly-schedule-section" class="py-24 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:-150px;right:-100px;opacity:0.12;"></div>
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center mb-12 fade-in">
          <div class="text-xs tracking-[0.5em] text-gold mb-6">WEEKLY SCHEDULE</div>
          {/* 7인 글자 잘림 방지 — whitespace-nowrap + 폭 여유 */}
          <h2 class="display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ivory mb-6 leading-[1.15]" style="padding:0.1em 0.05em;">
            <span class="inline-block" style="white-space:nowrap;">원장님 <span class="t-gold" style="padding:0 0.08em;">7인</span></span>{' '}
            <span class="inline-block">요일별 진료 스케줄</span>
          </h2>
          <p class="text-brown-200 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            오늘 진료 중인 원장님을 한눈에 — 요일을 눌러 다른 날 스케줄을 확인하세요.
          </p>
        </div>

        {/* 요일 탭 — 7개 버튼 */}
        <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10 fade-in" id="weekly-tabs">
          {[
            { key: 'mon', day: '월', en: 'MON', hours: '09:30 ~ 21:00', late: true },
            { key: 'tue', day: '화', en: 'TUE', hours: '09:30 ~ 18:30' },
            { key: 'wed', day: '수', en: 'WED', hours: '09:30 ~ 18:30' },
            { key: 'thu', day: '목', en: 'THU', hours: '09:30 ~ 21:00', late: true },
            { key: 'fri', day: '금', en: 'FRI', hours: '09:30 ~ 18:30' },
            { key: 'sat', day: '토', en: 'SAT', hours: '09:30 ~ 17:00' },
            { key: 'sun', day: '일', en: 'SUN', hours: '09:30 ~ 17:00', holiday: true },
          ].map((t: any) => (
            <button
              type="button"
              class="weekly-tab group flex flex-col items-center justify-center min-w-[68px] sm:min-w-[88px] px-3 sm:px-5 py-3 sm:py-4 rounded-2xl border transition-all"
              data-day={t.key}
              data-hours={t.hours}
              data-late={t.late ? '1' : ''}
              data-holiday={t.holiday ? '1' : ''}
              style="background:rgba(255,250,240,0.04); border-color:rgba(201,168,118,0.18);"
            >
              <span class="display text-2xl sm:text-3xl font-black leading-none">{t.day}</span>
              <span class="text-[9px] sm:text-[10px] tracking-[0.25em] text-gold/70 font-bold mt-1.5">{t.en}</span>
              {t.late && <span class="text-[8px] mt-1 px-1.5 py-0.5 rounded bg-gold/20 text-gold tracking-widest">야간</span>}
              {t.holiday && <span class="text-[8px] mt-1 px-1.5 py-0.5 rounded bg-red-400/20 text-red-300 tracking-widest">공휴</span>}
            </button>
          ))}
        </div>

        {/* 선택된 요일 헤더 — 진료시간 + 오늘 표시 */}
        <div class="text-center mb-8 fade-in" id="weekly-active-header">
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/30">
            <i class="far fa-clock text-gold"></i>
            <span class="text-sm text-ivory/90">
              <span id="weekly-active-day" class="font-bold text-gold">월요일</span>
              <span class="mx-2 text-ivory/40">·</span>
              <span id="weekly-active-hours" class="font-semibold">09:30 ~ 21:00</span>
            </span>
            <span id="weekly-today-badge" class="hidden ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-[10px] font-bold tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              TODAY
            </span>
          </div>
        </div>

        {/* 원장 프로필 카드 영역 — 요일별 표시 전환 */}
        <div id="weekly-doctors-stage" class="relative">
          {(() => {
            // 한국어 이름 → slug + 직책 매핑 (사진 가져오기 위함)
            const NAME_TO_SLUG: Record<string, string> = {
              '김성주': 'kim-seongju',
              '정재헌': 'jung-jaeheon',
              '김상원': 'kim-sangwon',
              '최혜정': 'choi-hyejung',
              '김진덕': 'kim-jinduk',
              '한지은': 'han-jieun',
              '이서영': 'lee-seoyoung',
            }
            const SCHEDULE: Record<string, { doctors: { name: string; hours?: string; tag?: string }[] }> = {
              mon: { doctors: [
                { name: '김성주' }, { name: '정재헌' }, { name: '김상원' },
                { name: '이서영', hours: '09:30 ~ 19:00', tag: '단축' },
              ]},
              tue: { doctors: [
                { name: '정재헌' }, { name: '김상원' }, { name: '최혜정' }, { name: '한지은' },
              ]},
              wed: { doctors: [
                { name: '정재헌' }, { name: '김상원' }, { name: '최혜정' }, { name: '이서영' },
              ]},
              thu: { doctors: [
                { name: '김성주' }, { name: '최혜정' }, { name: '이서영' }, { name: '김진덕' },
              ]},
              fri: { doctors: [
                { name: '김성주' }, { name: '정재헌' }, { name: '김상원' }, { name: '김진덕' },
              ]},
              sat: { doctors: [
                { name: '김성주' }, { name: '최혜정' }, { name: '김진덕' }, { name: '한지은' },
              ]},
              sun: { doctors: [
                { name: '김성주' }, { name: '정재헌' }, { name: '김상원' }, { name: '이서영' },
              ]},
            }
            // 각 의료진의 직책 (대표원장/원장)을 doctors prop에서 추출
            const positionMap: Record<string, string> = {}
            doctors.forEach((d: any) => {
              positionMap[d.name] = d.is_representative ? '대표원장' : '원장'
            })

            return Object.entries(SCHEDULE).map(([dayKey, info]) => (
              <div
                class="weekly-doctors-panel fade-in-stagger"
                data-day-panel={dayKey}
                style="display:none;"
              >
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1200px] mx-auto">
                  {info.doctors.map(doc => {
                    const slug = NAME_TO_SLUG[doc.name]
                    const photo = slug ? getDoctorPhoto(slug) : '/r2/images/doctors/team-horizontal-smile.jpg'
                    const pos = positionMap[doc.name] || '원장'
                    return (
                      <a
                        href={slug ? `/doctors/${slug}` : '/doctors'}
                        class="weekly-doctor-card group block rounded-2xl overflow-hidden border border-ivory/10 hover:border-gold/50 transition-all duration-500 bg-gradient-to-b from-ivory/[0.04] to-ivory/[0.02] hover:shadow-2xl"
                      >
                        {/* 프로필 사진 — 4:5 */}
                        <div class="relative aspect-[4/5] overflow-hidden bg-brown-900">
                          <img
                            src={photo}
                            alt={`${doc.name} ${pos}`}
                            loading="lazy"
                            class="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brown-950 via-brown-950/60 to-transparent"></div>
                          {/* 배지 — 좌상단 */}
                          <div class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brown-950/70 backdrop-blur-sm border border-gold/40">
                            <i class="fas fa-user-doctor text-gold text-[10px]"></i>
                            <span class="text-[10px] font-bold text-gold tracking-wider">{pos}</span>
                          </div>
                          {/* 단축 진료 등 태그 */}
                          {doc.tag && (
                            <div class="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full bg-orange-400/20 backdrop-blur-sm border border-orange-300/40 text-orange-200 text-[9px] font-bold tracking-wider">
                              {doc.tag}
                            </div>
                          )}
                          {/* 이름 — 사진 위 */}
                          <div class="absolute inset-x-0 bottom-0 p-4">
                            <div class="display text-xl md:text-2xl font-black text-ivory leading-tight tracking-tight">
                              {doc.name} <span class="text-gold text-base">원장</span>
                            </div>
                            {doc.hours && (
                              <div class="mt-1.5 inline-flex items-center gap-1 text-[10px] text-gold font-semibold">
                                <i class="far fa-clock"></i>
                                <span>{doc.hours}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* 푸터 — 프로필 보기 */}
                        <div class="px-4 py-3 flex items-center justify-between text-[11px] font-bold text-ivory/70 group-hover:text-gold transition-colors">
                          <span class="tracking-wider">프로필 보기</span>
                          <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))
          })()}
        </div>

        <div class="mt-12 text-center text-[11px] text-brown-300/80 tracking-wide max-w-2xl mx-auto fade-in">
          ※ 점심시간 12:30 ~ 14:00 · 진료 일정은 사정에 따라 변동될 수 있으니 예약 시 재확인 부탁드립니다.
        </div>
      </div>

      {/* 인터랙티브 스크립트 — 요일 탭 전환 + 오늘 자동 선택 */}
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var DAY_KEYS = ['sun','mon','tue','wed','thu','fri','sat']; // JS getDay() 인덱스 순서
  var DAY_LABELS = {
    mon:'월요일', tue:'화요일', wed:'수요일', thu:'목요일',
    fri:'금요일', sat:'토요일', sun:'일요일'
  };

  function selectDay(key, isAuto) {
    // 탭 active 토글
    document.querySelectorAll('#weekly-tabs .weekly-tab').forEach(function(btn) {
      var active = btn.getAttribute('data-day') === key;
      if (active) {
        btn.style.background = 'linear-gradient(160deg, rgba(201,168,118,0.35), rgba(201,168,118,0.12))';
        btn.style.borderColor = 'rgba(201,168,118,0.7)';
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 10px 25px -8px rgba(201,168,118,0.4)';
      } else {
        btn.style.background = 'rgba(255,250,240,0.04)';
        btn.style.borderColor = 'rgba(201,168,118,0.18)';
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }
    });

    // 패널 전환
    document.querySelectorAll('#weekly-doctors-stage .weekly-doctors-panel').forEach(function(p) {
      p.style.display = (p.getAttribute('data-day-panel') === key) ? 'block' : 'none';
    });

    // 헤더 갱신 (진료시간 + 요일명)
    var activeBtn = document.querySelector('#weekly-tabs .weekly-tab[data-day="'+key+'"]');
    if (activeBtn) {
      var hours = activeBtn.getAttribute('data-hours') || '';
      document.getElementById('weekly-active-day').textContent = DAY_LABELS[key] || '';
      document.getElementById('weekly-active-hours').textContent = hours;
    }

    // TODAY 배지 — 실제 오늘이면 표시
    var todayKey = DAY_KEYS[new Date().getDay()];
    var todayBadge = document.getElementById('weekly-today-badge');
    if (todayBadge) {
      todayBadge.style.display = (key === todayKey) ? 'inline-flex' : 'none';
    }
  }

  // 초기화 — 오늘 요일 자동 선택
  document.addEventListener('DOMContentLoaded', function() {
    var todayKey = DAY_KEYS[new Date().getDay()];
    selectDay(todayKey, true);

    document.querySelectorAll('#weekly-tabs .weekly-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        selectDay(btn.getAttribute('data-day'), false);
      });
    });
  });
})();
      `}} />
    </section>

    <section class="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 fade-in-stagger">
        {/* PPT PC3-S7 v2 — 참고사진 스타일: 사진 축소(3/4) + 배지·이름·메시지 가독성 대폭 강화 */}
        {doctors.map(d => {
          const specialtyLabel = d.is_representative ? '대표원장' : d.position
          return (
            <a href={`/doctors/${d.slug}`} class="doctor-card group block bg-cream rounded-[20px] overflow-hidden border border-brown-200/60 hover:border-gold/70 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              {/* 사진 — 3:4 비율로 축소 (이전 4:5 → 더 짧고 컴팩트) */}
              <div class="img-frame aspect-[3/4] overflow-hidden bg-brown-100 relative">
                <img
                  src={getDoctorPhoto(d.slug)}
                  alt={`${d.name} ${specialtyLabel}`}
                  loading="lazy"
                  class="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 정보 영역 — 패딩 늘림 + 글자 키움 */}
              <div class="px-5 pt-5 pb-6">
                {/* 전문의 배지 — 골드 채움 칩 (가독성 대폭 강화) */}
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md mb-3 shadow-sm" style="background:linear-gradient(135deg, #c9a876 0%, #b08a4a 100%);">
                  <i class="fas fa-user-doctor text-white text-[11px]"></i>
                  <span class="text-[13px] md:text-[14px] font-black text-white tracking-wide" style="letter-spacing:0.02em;">
                    {specialtyLabel}
                  </span>
                </div>

                {/* 이름 + 진료과 한 줄 */}
                <h3 class="display font-black tracking-tight mb-3 text-brown-950 leading-tight" style="font-size:clamp(1.6rem, 2.2vw, 2rem);">
                  {d.name} <span class="text-brown-500 font-bold" style="font-size:0.7em;">원장</span>
                </h3>

                {/* 메시지 — 골드 좌측 보더 + 따옴표 강조 */}
                <div class="relative pl-3 border-l-[3px] border-gold/70 mb-5">
                  <p class="text-brown-800 text-[14px] leading-[1.55] font-medium line-clamp-2 min-h-[2.85em]">
                    <span class="text-gold/80 font-bold mr-0.5">"</span>{d.message}<span class="text-gold/80 font-bold ml-0.5">"</span>
                  </p>
                </div>

                {/* 프로필 보기 CTA */}
                <div class="pt-4 border-t border-brown-200 flex items-center justify-between text-[13px] font-bold text-brown-900 group-hover:text-gold transition-colors">
                  <span class="tracking-wide">프로필 보기</span>
                  <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>

    {/* TEAM GROUP — 다양한 단체 컷 (가로 + 세로 비율 매거진 레이아웃) */}
    <section class="py-24 bg-cream">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16 fade-in">
          <div class="section-label mb-6">TEAM PORTRAIT</div>
          <h2 class="t-display">
            함께, <em class="text-brown-700 not-italic">협진</em>으로 완성합니다
          </h2>
          <p class="mt-6 text-brown-700 max-w-2xl mx-auto leading-relaxed">
            7인의 전문의가 한 자리에서 케이스를 검토하고 진단합니다.<br/>
            한 환자의 모든 진료를 같은 기준으로, 그것이 협진의 약속입니다.
          </p>
        </div>

        {/* 12-col 매거진 그리드: 가로 사진(7) + 세로 사진(5) */}
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 fade-in-stagger items-stretch">
          {/* 왼쪽 — 가로 단체 컷 (3:2) */}
          <figure class="md:col-span-7 group">
            <div class="img-frame aspect-[3/2] rounded-[24px] overflow-hidden bg-brown-100">
              <img
                src="/r2/images/doctors/team-2rows.jpg"
                alt="대구365치과 7인 의료진 가로 단체컷 — 2열 구성"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption class="mt-4 flex items-baseline gap-3 text-xs tracking-[0.3em] text-brown-700">
              <span class="text-gold font-bold">01</span>
              <span class="uppercase">Wide Group · 한 자리에서</span>
            </figcaption>
          </figure>

          {/* 오른쪽 — 세로 단체 컷 (2:3 = 세로 비율) */}
          <figure class="md:col-span-5 group">
            <div class="img-frame aspect-[2/3] rounded-[24px] overflow-hidden bg-brown-100">
              <img
                src="/r2/images/doctors/team-3rows.jpg"
                alt="대구365치과 7인 의료진 세로 단체컷 — 3열 클로즈업"
                loading="lazy"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption class="mt-4 flex items-baseline gap-3 text-xs tracking-[0.3em] text-brown-700">
              <span class="text-gold font-bold">02</span>
              <span class="uppercase">Close Group · 가까이에서</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/* PPT PC3-S8 반영: 의료진 메뉴 제일 하단 — "어떤 원장님께 진료받고 싶으신가요?" 진료과목 매칭 섹션 */}
    <section class="py-24 lg:py-32 bg-brown-950 text-ivory relative overflow-hidden">
      <div class="blob" style="width:480px;height:480px;background:#c9a876;bottom:-160px;left:-120px;opacity:0.12;"></div>
      <div class="blob" style="width:360px;height:360px;background:#c9a876;top:-80px;right:-100px;opacity:0.08;"></div>

      <div class="max-w-[1280px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center mb-16 fade-in">
          <div class="text-xs tracking-[0.5em] text-gold mb-6 font-bold">FIND YOUR DOCTOR</div>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-ivory mb-6 leading-tight">
            어떤 원장님께<br/>
            진료받고 <span class="not-italic text-gold">싶으신가요?</span>
          </h2>
          <p class="text-brown-200 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            진료 분야별로 담당 전문의를 안내해드립니다.<br class="hidden md:inline"/>
            아래에서 원하시는 진료를 선택하시면 담당 원장님 프로필로 이동합니다.
          </p>
        </div>

        {/* 진료분야별 매칭 카드 */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 fade-in-stagger">
          {[
            { icon: 'fa-bed', title: '수면 임플란트', sub: '4단계 무통마취 · 평생 보증', doctor: '김성주 대표원장', slug: 'kim-seongju', href: '/treatments/implant', accent: 'gold' },
            { icon: 'fa-tooth', title: '충치 · 신경치료 · 크라운', sub: '보존이 가능하면 보존부터', doctor: '정재헌 원장', slug: 'jung-jaeheon', href: '/treatments/cavity' },
            { icon: 'fa-leaf', title: '자연치아 살리기', sub: '재신경치료 · 재생 근관치료', doctor: '김상원 원장', slug: 'kim-sangwon', href: '/treatments/conservative' },
            { icon: 'fa-gem', title: '비니크 라미네이트', sub: '0.3mm 박막 심미보철', doctor: '최혜정 원장', slug: 'choi-hyejung', href: '/treatments/lamineer', accent: 'gold' },
            { icon: 'fa-grip', title: '인비절라인 · 교정', sub: '성장기 · 중장년 · 디지털 교정', doctor: '김진덕 원장', slug: 'kim-jinduk', href: '/treatments/ortho' },
            { icon: 'fa-child', title: '소아치과 · 소아교정', sub: '웃음가스 진정치료 · 인비절라인 퍼스트', doctor: '한지은 원장', slug: 'han-jieun', href: '/treatments/pediatric' },
            { icon: 'fa-shield-heart', title: '치주치료 · 평생관리', sub: '에어플로우 GBT · 잇몸치료', doctor: '이서영 원장', slug: 'lee-seoyoung', href: '/treatments/perio' },
            { icon: 'fa-wind', title: '에어플로우 GBT', sub: '스케일링이 아닌 첨단 잇몸케어', doctor: '이서영 원장', slug: 'lee-seoyoung', href: '/treatments/airflow' },
            { icon: 'fa-syringe', title: '4단계 무통마취', sub: '가글 → 도포 → 무통기 → 본마취', doctor: '김성주 대표원장', slug: 'kim-seongju', href: '/treatments/anesthesia' },
          ].map((item: any) => (
            <a href={item.href}
               class={`group relative block p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                 item.accent === 'gold'
                   ? 'border-gold/40 bg-gold/8 hover:border-gold hover:bg-gold/12'
                   : 'border-ivory/15 bg-ivory/5 hover:border-gold/50 hover:bg-ivory/8'
               }`}
               style={item.accent === 'gold' ? 'background: linear-gradient(135deg, rgba(201,168,118,0.15), rgba(201,168,118,0.05));' : ''}>
              <div class="flex items-start gap-4">
                <div class={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.accent === 'gold' ? 'bg-gold/25 text-gold' : 'bg-ivory/10 text-gold'
                }`}>
                  <i class={`fas ${item.icon} text-lg`}></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="display text-lg font-black tracking-tight text-ivory mb-1.5 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p class="text-xs text-brown-300 mb-3 leading-relaxed">{item.sub}</p>
                  <div class="flex items-center justify-between pt-3 border-t border-ivory/10">
                    <span class="text-sm font-bold text-gold">{item.doctor}</span>
                    <i class="fas fa-arrow-right text-xs text-gold group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 추가 CTA */}
        <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto fade-in">
          <button
            type="button"
            onclick="window.dispatchEvent(new Event('open-consultation-modal'))"
            class="group flex-1 flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gold text-brown-950 font-bold tracking-wide hover:bg-gold-light hover:-translate-y-0.5 transition-all shadow-lg shadow-gold/20"
          >
            <i class="fas fa-calendar-check"></i>
            <span>상담예약하기</span>
          </button>
          <a
            href="tel:053-357-0365"
            class="group flex-1 flex items-center justify-center gap-3 px-7 py-4 rounded-full border-2 border-gold/60 text-gold font-bold tracking-wide hover:bg-gold/10 hover:border-gold transition-all"
          >
            <i class="fas fa-phone"></i>
            <span>053-357-0365</span>
          </a>
        </div>
      </div>
    </section>

    {/* 참고사진 스타일 최종 CTA 박스 — 단일 갈색 라운드 박스 */}
    <section class="py-16 lg:py-20 bg-cream">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div
          class="relative rounded-[28px] px-6 py-14 md:px-12 md:py-16 text-center text-ivory overflow-hidden shadow-xl"
          style="background: linear-gradient(135deg, #6b4c2a 0%, #4a3320 100%);"
        >
          {/* 상단 작은 라벨 */}
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/15 backdrop-blur-sm mb-6">
            <i class="fas fa-headset text-ivory text-xs"></i>
            <span class="text-xs font-semibold tracking-wider text-ivory">상담 안내</span>
          </div>

          {/* 메인 타이틀 */}
          <h2 class="display text-2xl md:text-4xl lg:text-[2.5rem] font-black tracking-tight text-ivory mb-4 leading-tight">
            어떤 원장님께 진료받고 <span class="not-italic" style="color:#e8c98c;">싶으신가요?</span>
          </h2>
          <p class="text-ivory/75 text-sm md:text-base mb-9 max-w-xl mx-auto">
            예약 시 희망 원장님을 선택하실 수 있습니다.
          </p>

          {/* 2개의 동그란 알약 버튼 */}
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-lg mx-auto">
            <button
              type="button"
              onclick="window.dispatchEvent(new Event('open-consultation-modal'))"
              class="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-ivory text-brown-900 font-bold text-sm md:text-base hover:bg-white hover:-translate-y-0.5 transition-all shadow-lg whitespace-nowrap"
            >
              <i class="fas fa-calendar-check"></i>
              <span>상담 예약하기</span>
            </button>
            <a
              href="tel:053-357-0365"
              class="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-ivory/40 text-ivory font-bold text-sm md:text-base hover:bg-ivory/10 hover:border-ivory transition-all whitespace-nowrap"
            >
              <i class="fas fa-phone"></i>
              <span>053-357-0365</span>
            </a>
          </div>

          {/* 하단 진료시간 안내 */}
          <div class="mt-7 inline-flex items-center gap-2 text-[12px] md:text-[13px] text-ivory/65 flex-wrap justify-center">
            <i class="far fa-clock text-ivory/70"></i>
            <span>365일 진료</span>
            <span class="text-ivory/30">·</span>
            <span>평일 09:30~21:00</span>
            <span class="text-ivory/30">·</span>
            <span>토·일 09:30~17:00</span>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
)

// ───────────────────────────────────────────────
// 의료진 텍스트 정제 헬퍼 (PPT 1차 수정건 일괄 반영)
// - "제목 — 부제" 형태에서 "ㅡ"(긴 대시·em-dash) 제거 → 한 줄 정리
// - 인용구 끝에 닫는 따옴표 보정
// - signature 끝의 "." 보정
// ───────────────────────────────────────────────
const stripEmDash = (text: string): string => {
  if (!text) return text
  // " — " / " ㅡ " / " – " (em/en/긴대시) → " · " (가운뎃점)으로 치환
  // 일반 hyphen "-"은 단어 구분에 쓰이므로 보존
  // 멱등성 보장: 이미 " · "로 변환된 경우 그대로 유지
  // 원장님 요청 #3: em/en/긴대시(— ㅡ –) 모두 완전 제거 (공백으로 치환)
  // 일반 hyphen "-"은 단어 구분(예: SCRP-1)에 쓰이므로 보존
  return text
    .replace(/\s*[—ㅡ–]\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// 인용문 정제 헬퍼
// - JSX 측에서 따옴표 장식을 직접 감싸므로(예: "{intro}"), 본문 안의 따옴표는 모두 제거해야
//   화면에 따옴표가 두 번 찍히지 않음.
// - 본문 양쪽 끝 따옴표("/"/"/" 등)와 본문 내부 따옴표를 일괄 제거해 깔끔한 텍스트만 반환.
const ensureClosingQuote = (text: string): string => {
  if (!text) return text
  let t = text.trim()
  // 본문에 포함된 모든 큰따옴표 제거 (스마트 따옴표 포함)
  t = t.replace(/["“”„‟"]/g, '')
  // 정리 후 양 끝 공백/마침표 중복 정리
  t = t.replace(/\s+/g, ' ').trim()
  return t
}

export const DoctorDetailPage = ({
  doctor, treatments, cases, allDoctors
}: { doctor: Doctor, treatments: Treatment[], cases: BeforeAfter[], allDoctors?: Doctor[] }) => {
  // 다른 의료진 보기 — 현재 원장 제외 (안전 폴백: prop 없으면 빈 배열)
  const otherDoctors = (allDoctors || []).filter(d => d.slug !== doctor.slug)
  const specialties = JSON.parse(doctor.specialties || '[]') as string[]
  const education = JSON.parse(doctor.education || '[]') as string[]
  const career = JSON.parse(doctor.career || '[]') as string[]
  type InterviewSection = { title: string, content: string }
  type InterviewQA = { q: string, a: string }
  type InterviewData = { intro?: string, sections?: InterviewSection[], qa?: InterviewQA[], signature?: string }
  let interview: InterviewData | null = null
  try { interview = doctor.interview ? JSON.parse(doctor.interview) as InterviewData : null } catch { interview = null }

  // 인터뷰 데이터에 ㅡ(em-dash) 일괄 제거 — PPT 1차 수정건 S14~S42 요청 반영
  // - 제목/부제: ㅡ 삭제 + 한 줄 정리
  // - 본문: ㅡ 삭제 (단, 줄바꿈 \n은 보존)
  // - 인용문(intro/signature): 닫는 따옴표 보정 + ㅡ 제거
  const stripEmDashKeepNewlines = (text: string): string => {
    if (!text) return text
    return text
      .split('\n')
      .map(line => stripEmDash(line))
      .join('\n')
  }
  // 원장님 요청 #4: 인터뷰 섹션 제목의 가운뎃점(·) / 중간점류 → 줄바꿈으로 교체
  const splitMiddleDot = (text: string): string => {
    if (!text) return text
    return text
      .replace(/\s*[·‧․∙•・]\s*/g, '\n')
      .replace(/\n+/g, '\n')
      .trim()
  }
  if (interview) {
    if (interview.intro) interview.intro = ensureClosingQuote(stripEmDash(interview.intro))
    if (interview.signature) interview.signature = ensureClosingQuote(stripEmDash(interview.signature))
    if (interview.sections) {
      interview.sections = interview.sections.map(s => ({
        title: splitMiddleDot(stripEmDash(s.title)),
        content: stripEmDashKeepNewlines(s.content),
      }))
    }
    if (interview.qa) {
      interview.qa = interview.qa.map(qa => ({
        q: stripEmDash(qa.q),
        a: stripEmDashKeepNewlines(qa.a),
      }))
    }
  }

  const cleanedMessage = ensureClosingQuote(stripEmDash(doctor.message || ''))
  const videoUrl = getDoctorVideo(doctor.slug)

  // 모바일 Keynote [23][24][25][26] "일부볼드 해 주세요" 반영:
  // 인터뷰 본문의 **...** 마크다운 볼드를 <strong>으로 렌더링.
  // whitespace-pre-line이 \n을 줄바꿈으로 보존하므로, 텍스트 노드는 그대로 두고 ** 구간만 strong 처리.
  const renderBold = (text: string) => {
    if (!text) return text
    if (text.indexOf('**') === -1) return text
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((p) =>
      p.startsWith('**') && p.endsWith('**') && p.length > 4
        ? <strong class="font-bold text-brown-950">{p.slice(2, -2)}</strong>
        : p
    )
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section class="py-20 bg-cream relative overflow-hidden">
        <div class="blob" style="width:450px;height:450px;background:#c9a876;top:-100px;right:-100px;opacity:0.2;"></div>
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5 fade-in">
              <div class="img-frame aspect-[3/4] rounded-[32px] shadow-xl overflow-hidden">
                <img
                  src={getDoctorPhoto(doctor.slug)}
                  alt={`${doctor.name} ${doctor.is_representative ? '대표원장' : doctor.position}`}
                  loading="eager"
                  class="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            </div>
            <div class="md:col-span-7 fade-in">
              <div class="section-label mb-6">
                {doctor.is_representative ? 'REPRESENTATIVE DOCTOR' : 'DOCTOR'}
              </div>
              <h1 class="t-display mb-3 leading-none">
                {doctor.name} <span class="t-gold">{doctor.position}</span>
              </h1>
              {/* PPT PC2 슬라이드 1 — 경북대학교 외래교수 등 핵심 학력 hero에 배지로 강조 */}
              {(() => {
                const allCreds = [...education, ...career]
                const credentialBadges = allCreds.filter(c =>
                  /외래교수|임상교수|전문의|박사|석사|인정의|펠로우/.test(c)
                ).slice(0, 4)
                return credentialBadges.length > 0 ? (
                  <div class="flex flex-wrap gap-2 mb-4">
                    {credentialBadges.map(c => (
                      <span class="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-brown-950/5 border border-brown-300 text-brown-700 font-semibold tracking-tight">
                        <i class="fas fa-certificate text-gold text-[10px]"></i>
                        {c}
                      </span>
                    ))}
                  </div>
                ) : null
              })()}
              <div class="gold-divider my-6"></div>
              <div class="pullquote mb-8" style="white-space: pre-line;">
                {cleanedMessage}
              </div>
              <div class="flex flex-wrap gap-2 mb-8">
                {specialties.map(s => {
                  const t = treatments.find(x => x.slug === s)
                  if (!t) return null
                  return <a href={`/treatments/${t.slug}`} class="tag tag-gold">{t.name}</a>
                })}
              </div>

              {/* PPT PC3 슬라이드 10·12 — 의사 프로필 hero에 상담예약·전화 CTA 버튼 */}
              <div class="flex flex-wrap gap-3">
                <button
                  type="button"
                  onclick="document.getElementById('openConsultModal')?.click()"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg"
                  style="background:linear-gradient(135deg, var(--gold), var(--brown-500));color:var(--brown-950);"
                  aria-label={`${doctor.name} 원장님께 상담 예약하기`}
                >
                  <i class="fas fa-calendar-check"></i>
                  <span>{doctor.name} 원장님께 상담예약</span>
                </button>
                <a
                  href="tel:053-357-0365"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg"
                  style="background:var(--brown-950);color:var(--gold);"
                  aria-label="전화 상담"
                >
                  <i class="fas fa-phone"></i>
                  <span style="white-space:nowrap;">053-357-0365</span>
                </a>
                <a
                  href="https://naver.me/GhSIroMf"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-md transition hover:shadow-lg"
                  style="background:#03C75A;color:#fff;"
                  aria-label="네이버 예약"
                >
                  <span class="text-[11px] font-black" style="background:#fff;color:#03C75A;border-radius:4px;padding:1px 5px;">N</span>
                  <span>네이버 예약</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — 원장님 요청 #1: 여유있는 줄바꿈 + #3: 대시 제거 */}
      <section class="py-24 max-w-5xl mx-auto px-6">
        <div class="fade-in">
          <div class="section-label mb-6">PHILOSOPHY</div>
          <h2 class="display text-4xl font-black tracking-tight mb-8">진료 철학</h2>
          <p class="text-brown-700 text-lg md:text-xl leading-[2.1] md:leading-[2.2] whitespace-pre-line tracking-[-0.005em]">
            {(doctor.philosophy || '')
              .replace(/\s*[—ㅡ–]\s*/g, ' ')
              .replace(/([。.!?])\s+/g, '$1\n\n')
              .replace(/[ \t]{2,}/g, ' ')
              .trim()}
          </p>
        </div>
      </section>

      {/* EDU & CAREER — PPT PC3 슬라이드 11: 읽기 쉬운 카드형 디자인 */}
      <section class="py-24 bg-cream">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div class="fade-in bg-ivory rounded-3xl p-8 lg:p-10 shadow-card border border-brown-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div>
                <div class="section-label mb-1">EDUCATION</div>
                <h2 class="display text-2xl font-black tracking-tight text-brown-900">학력</h2>
              </div>
            </div>
            <ul class="space-y-3">
              {education.map((e) => (
                <li class="flex gap-3 items-start py-2 border-b border-brown-100 last:border-b-0">
                  <i class="fas fa-circle text-gold text-[6px] mt-2.5 flex-shrink-0"></i>
                  <span class="text-brown-800 leading-relaxed text-[15px]">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div class="fade-in bg-ivory rounded-3xl p-8 lg:p-10 shadow-card border border-brown-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-brown-950/10 text-brown-800 flex items-center justify-center">
                <i class="fas fa-briefcase-medical"></i>
              </div>
              <div>
                <div class="section-label mb-1">CAREER</div>
                <h2 class="display text-2xl font-black tracking-tight text-brown-900">경력</h2>
              </div>
            </div>
            <ul class="space-y-3">
              {career.map((c) => (
                <li class="flex gap-3 items-start py-2 border-b border-brown-100 last:border-b-0">
                  <i class="fas fa-circle text-brown-700 text-[6px] mt-2.5 flex-shrink-0"></i>
                  <span class="text-brown-800 leading-relaxed text-[15px]">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INTERVIEW — 8개 섹션 + Q&A */}
      {interview && (interview.intro || (interview.sections && interview.sections.length > 0)) && (
        /* PPT v3 — 어두운 다단 → 밝은 단일 컬럼 + 골드 좌측 보더 헤더 + 골드 인용박스 (가독성 대폭 강화) */
        <section class="py-24 lg:py-28 bg-ivory relative overflow-hidden">
          <div class="max-w-3xl mx-auto px-6 lg:px-8 relative">
            {/* 섹션 헤더 — 밝은 톤 */}
            <div class="text-center mb-16 fade-in">
              <div class="text-xs tracking-[0.5em] text-gold mb-5 font-bold">INTERVIEW</div>
              <h2 class="display text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-brown-950 mb-6 leading-[1.2]">
                <span class="block text-sm md:text-base italic text-brown-500 font-medium mb-3 tracking-tight">
                  {doctor.position}
                </span>
                <span class="block">{doctor.name} 원장의 이야기</span>
              </h2>
              {interview.intro && (
                <div class="relative max-w-2xl mx-auto mt-8 px-6 py-5 rounded-2xl" style="background:rgba(201,168,118,0.08); border:1px solid rgba(201,168,118,0.25);">
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl text-gold leading-none font-serif" style="font-family: Georgia, serif;">"</div>
                  <p class="text-brown-800 text-base md:text-lg leading-relaxed not-italic">
                    {interview.intro}"
                  </p>
                </div>
              )}
            </div>

            {/* INTERVIEW VIDEO — 세로 9:16 (밝은 톤 적용) */}
            {videoUrl && (
              <div class="fade-in mb-16">
                <div class="text-center mb-6">
                  <div class="text-[10px] tracking-[0.4em] text-gold mb-2 font-bold">FULL INTERVIEW</div>
                  <h3 class="display text-xl md:text-2xl font-black tracking-tight text-brown-950">
                    원장님 목소리로 직접 듣는 인터뷰
                  </h3>
                </div>
                <div
                  class="interview-video-wrap relative rounded-[20px] overflow-hidden shadow-xl bg-black mx-auto"
                  style="border: 1px solid rgba(201, 168, 118, 0.4); aspect-ratio: 9 / 16; width: 100%; max-width: 380px;"
                >
                  <video
                    controls
                    preload="metadata"
                    playsinline
                    poster={getDoctorPhoto(doctor.slug)}
                    class="interview-video w-full h-full object-contain bg-black"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    브라우저가 비디오 태그를 지원하지 않습니다.
                  </video>
                  {/* 가운데 재생 버튼 오버레이 — 클릭 시 재생되고 사라짐 (PPT slide 15) */}
                  <button
                    type="button"
                    class="video-play-overlay absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300 cursor-pointer"
                    aria-label="인터뷰 영상 재생"
                  >
                    <span class="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-gold/90 shadow-2xl ring-4 ring-white/30 transition-transform duration-200 hover:scale-110">
                      <i class="fas fa-play text-brown-950 text-2xl ml-1"></i>
                    </span>
                  </button>
                </div>
                <p class="text-center text-brown-500 text-xs mt-3 tracking-wider">
                  <i class="fas fa-circle-play text-gold mr-2"></i>
                  재생 버튼을 눌러 인터뷰 영상을 시청하실 수 있습니다
                </p>
                <script dangerouslySetInnerHTML={{ __html: `
                  (function(){
                    document.querySelectorAll('.interview-video-wrap').forEach(function(wrap){
                      var v = wrap.querySelector('.interview-video');
                      var btn = wrap.querySelector('.video-play-overlay');
                      if(!v || !btn) return;
                      btn.addEventListener('click', function(){ v.play(); });
                      v.addEventListener('play', function(){ btn.style.opacity='0'; btn.style.pointerEvents='none'; });
                      v.addEventListener('pause', function(){ if(!v.ended){ btn.style.opacity='1'; btn.style.pointerEvents='auto'; } });
                      v.addEventListener('ended', function(){ btn.style.opacity='1'; btn.style.pointerEvents='auto'; });
                    });
                  })();
                `}} />
              </div>
            )}

            {/* 인터뷰 섹션들 — 단일 컬럼 + 골드 좌측 보더 헤더 */}
            <div class="space-y-14">
              {(interview.sections || []).map((s, i) => {
                // 본문 안에 따옴표("..." 또는 "...")로 감싸진 부분이 있으면 골드 인용박스로 분리
                const content = s.content || ''
                // "...": 본문 첫 줄이 따옴표로 시작/끝나는 경우 인용박스로 추출
                const quoteMatch = content.match(/^([""][^""]+[""])\s*\n?/)
                let quote: string | null = null
                let rest = content
                if (quoteMatch) {
                  quote = quoteMatch[1].replace(/[""]/g, '').trim()
                  rest = content.slice(quoteMatch[0].length).trim()
                }
                // 모바일 Keynote [24][25][26] "슬래시 부분에서 줄변경 후 : 넣어주세요"
                // splitMiddleDot이 가운뎃점/슬래시를 \n으로 바꿔둠 → 첫 줄=라벨, 나머지=부제
                const titleLines = String(s.title || '').split('\n').map(t => t.trim()).filter(Boolean)
                const labelLine = titleLines[0] || ''
                const subLine = titleLines.slice(1).join(' ')
                return (
                  <div class="fade-in">
                    {/* 섹션 헤더 — 골드 좌측 보더 + 라벨(콜론) + 줄바꿈 후 부제 (모바일 가독성) */}
                    <div class="flex items-start gap-3 mb-5 pb-3 border-b border-brown-200">
                      <div class="w-1 h-6 rounded-full bg-gold flex-shrink-0 mt-1"></div>
                      <h3 class="display font-black tracking-tight leading-tight">
                        <span class="block text-xl md:text-[1.4rem] text-brown-950">
                          {labelLine}{subLine ? ' :' : ''}
                        </span>
                        {subLine && (
                          <span class="block text-base md:text-lg text-gold mt-1.5 break-keep">
                            {subLine}
                          </span>
                        )}
                      </h3>
                    </div>
                    {/* 본문 — 큰 글씨, 진한 톤, 넓은 행간 */}
                    {quote && (
                      <div class="my-5 px-5 py-4 rounded-xl" style="background:rgba(201,168,118,0.08); border-left:3px solid #c9a876;">
                        <p class="text-brown-900 text-[15px] md:text-base font-bold leading-relaxed mb-1">
                          "{quote}"
                        </p>
                      </div>
                    )}
                    <p class="text-brown-800 text-[15px] md:text-base leading-[1.85] whitespace-pre-line">
                      {renderBold(rest)}
                    </p>

                    {/* 섹션 사이 장식 구분자 (마지막 제외) */}
                    {i < (interview.sections?.length || 0) - 1 && (
                      <div class="flex items-center justify-center mt-14">
                        <span class="text-gold/40 text-xl">✦</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {interview.qa && interview.qa.length > 0 && (
              <div class="mt-24">
                <div class="text-center mb-10 fade-in">
                  <div class="text-xs tracking-[0.5em] text-gold mb-4 font-bold">Q &amp; A</div>
                  <h3 class="display text-2xl md:text-3xl font-black tracking-tight text-brown-950">
                    {doctor.name}<em class="not-italic text-gold"> 원장에게 묻습니다</em>
                  </h3>
                </div>
                <div class="space-y-6">
                  {interview.qa.map((qa) => (
                    <div class="fade-in p-5 md:p-6 rounded-2xl bg-cream border border-brown-200">
                      <div class="flex gap-3 mb-3">
                        <span class="display text-xl italic text-gold font-black flex-shrink-0">Q.</span>
                        <p class="text-brown-950 text-base md:text-lg font-bold leading-snug">{qa.q}</p>
                      </div>
                      <div class="flex gap-3 pl-4 border-l-2 border-gold/40 ml-1">
                        <span class="display text-xl italic text-brown-500 font-black flex-shrink-0">A.</span>
                        <p class="text-brown-800 text-[15px] md:text-base leading-[1.8] whitespace-pre-line">{renderBold(qa.a)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {interview.signature && (
              <div class="mt-20 text-center fade-in">
                <div class="inline-block w-12 h-px bg-gold mb-6"></div>
                <p class="display text-xl md:text-2xl not-italic text-brown-900 leading-relaxed max-w-2xl mx-auto font-semibold">
                  "{interview.signature}"
                </p>
                <div class="text-[11px] tracking-[0.4em] text-brown-500 mt-6 font-bold">
                  {doctor.name} · {doctor.is_representative ? '대표원장' : doctor.position}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CASES */}
      {cases.length > 0 && (
        <section class="py-24 max-w-7xl mx-auto px-6">
          <div class="flex justify-between items-end mb-12 fade-in">
            <div>
              <div class="section-label mb-6">CASES</div>
              <h2 class="display text-4xl font-black tracking-tight">
                {doctor.name} 원장 <em class="not-italic text-brown-700">치료 사례</em>
              </h2>
            </div>
            <a href={`/before-after?doctor=${doctor.slug}`} class="link-underline display not-italic">전체 보기 →</a>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            {cases.slice(0, 3).map((ba) => {
              const beforeImg = ba.intra_before_url || ba.pano_before_url
              return (
              <a href={`/before-after/${ba.id}`} class="fade-in lux-card p-0 overflow-hidden group">
                <div class="aspect-[4/3] relative overflow-hidden bg-cream">
                  {beforeImg ? (
                    <img src={beforeImg} alt={`${ba.title} - Before`} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div class="w-full h-full placeholder-img flex items-center justify-center"><i class="fas fa-images text-3xl"></i></div>
                  )}
                  <span class="absolute top-3 left-3 bg-brown-950/70 text-ivory text-[10px] tracking-[0.2em] px-2 py-1 rounded">BEFORE</span>
                </div>
                <div class="p-6">
                  <div class="flex gap-2 mb-3">
                    <span class="tag tag-brown">{ba.age_group}</span>
                    <span class="tag tag-brown">{ba.treatment_period}</span>
                  </div>
                  <div class="display text-lg font-medium">{ba.title}</div>
                </div>
              </a>
              )
            })}
          </div>
        </section>
      )}

      {/* ========== PPT PC3-S12 v2 — 진료케이스 밑 3단 CTA (참고사진 매칭)
          1) 다른 의료진 보기 (작은 원형 사진 그리드)
          2) ○○○ 원장님께 상담받으세요 (갈색 박스 + 상담예약하기)
          3) ○○○ 원장님께 진료받고 싶으시다면 (진한 갈색 박스 + 예약·전화 두 버튼) ========== */}

      {/* 1) 다른 의료진 보기 — 작은 원형 사진 그리드 */}
      {otherDoctors.length > 0 && (
        <section class="py-16 lg:py-20 bg-cream">
          <div class="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div class="text-center mb-10 fade-in">
              <h3 class="display text-2xl md:text-3xl font-black tracking-tight text-brown-950">
                다른 의료진 보기
              </h3>
              <div class="mt-3 mx-auto w-12 h-[3px] bg-gold rounded-full"></div>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 md:gap-6 fade-in-stagger">
              {otherDoctors.map((d) => {
                const pos = d.is_representative ? '대표원장' : (d.position || '원장')
                return (
                  <a href={`/doctors/${d.slug}`} class="group block text-center">
                    <div class="relative mx-auto w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden border-2 border-brown-100 group-hover:border-gold group-hover:shadow-xl transition-all duration-500">
                      <img
                        src={getDoctorPhoto(d.slug)}
                        alt={`${d.name} ${pos}`}
                        loading="lazy"
                        class="w-full h-full object-cover object-[center_15%] group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div class="mt-3 display text-[15px] md:text-base font-black text-brown-950 group-hover:text-brown-700 transition-colors leading-tight">
                      {d.name} <span class="text-brown-500 font-bold text-[13px]">원장</span>
                    </div>
                    <div class="text-[11px] text-brown-600 mt-0.5 tracking-wide">
                      {pos}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2) ○○○ 원장님께 상담받으세요 — 갈색 그라데이션 박스 */}
      <section class="px-6 lg:px-12 bg-cream pb-10">
        <div class="max-w-[900px] mx-auto rounded-3xl overflow-hidden relative fade-in"
             style="background:linear-gradient(135deg, #8b6f4b 0%, #6b5235 50%, #4f3d28 100%); box-shadow:0 25px 50px -12px rgba(75,55,35,0.35);">
          <div class="px-8 sm:px-12 py-12 sm:py-14 text-center">
            <h3 class="display text-xl sm:text-2xl md:text-[1.75rem] font-black tracking-tight text-ivory leading-tight">
              <span class="text-gold">{doctor.name} 원장님</span>께 상담받으세요
            </h3>
            <p class="mt-3 text-sm sm:text-base text-ivory/75 leading-relaxed">
              {doctor.position || '전문의'} 전문성 상담
            </p>
            <div class="mt-7 flex justify-center">
              <button
                type="button"
                onclick="window.dispatchEvent(new Event('open-consultation-modal'))"
                class="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-ivory text-brown-950 font-black text-sm sm:text-base tracking-wide hover:bg-gold hover:text-brown-950 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
              >
                <i class="fas fa-calendar-check text-[15px]"></i>
                <span>상담 예약하기</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3) ○○○ 원장님께 진료받고 싶으시다면 — 진한 갈색 박스 + 두 버튼 + 진료시간 */}
      <section class="px-6 lg:px-12 bg-cream pb-24">
        <div class="max-w-[900px] mx-auto rounded-3xl overflow-hidden relative fade-in"
             style="background:linear-gradient(135deg, #5d4630 0%, #3f2f20 50%, #2a1f15 100%); box-shadow:0 25px 50px -12px rgba(40,28,18,0.45);">
          <div class="px-8 sm:px-12 py-12 sm:py-14 text-center">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/35 mb-5">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span class="text-[11px] tracking-[0.3em] text-gold font-bold">상담 안내</span>
            </div>
            <h3 class="display text-xl sm:text-2xl md:text-[1.75rem] font-black tracking-tight text-ivory leading-tight">
              <span class="text-gold">{doctor.name} 원장님</span>께 진료받고 싶으시다면
            </h3>
            <p class="mt-3 text-sm sm:text-base text-ivory/70 leading-relaxed">
              예약 시 희망 원장님을 선택하실 수 있습니다.
            </p>
            <div class="mt-7 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <button
                type="button"
                onclick="window.dispatchEvent(new Event('open-consultation-modal'))"
                class="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-ivory text-brown-950 font-black text-sm sm:text-base tracking-wide hover:bg-gold hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
              >
                <i class="fas fa-calendar-check text-[14px]"></i>
                <span>상담 예약</span>
              </button>
              <a
                href="tel:053-357-0365"
                class="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-transparent border-2 border-ivory/70 text-ivory font-black text-sm sm:text-base tracking-wide hover:bg-ivory hover:text-brown-950 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
              >
                <i class="fas fa-phone text-[14px]"></i>
                <span>053-357-0365</span>
              </a>
            </div>
            <div class="mt-7 pt-6 border-t border-ivory/12 text-[12px] sm:text-[13px] text-ivory/65 tracking-wide leading-relaxed">
              <i class="fas fa-clock text-gold/80 mr-1.5"></i>
              365일 진료 · 평일 09:00 ~ 21:00 &nbsp;|&nbsp; 토 · 일 09:00 ~ 17:00
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
