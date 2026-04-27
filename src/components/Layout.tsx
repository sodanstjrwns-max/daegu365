// Common Layout Components

export const Navbar = () => (
  <>
    <nav class="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex items-center justify-between h-20">
          <a href="/" class="flex items-center group" aria-label="대구365치과 홈">
            <img
              src="/static/images/logo-horizontal-brown.png"
              alt="대구365치과 DAEGU 365 DENTAL CLINIC"
              class="h-10 lg:h-11 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
              width="332" height="115"
            />
          </a>

          <div class="hidden lg:flex items-center gap-10">
            <a href="/mission" class="nav-link">병원미션</a>
            <div class="has-dropdown relative py-8">
              <a href="/doctors" class="nav-link">의료진</a>
              <div class="dropdown">
                <a href="/doctors">의료진 전체</a>
                <a href="/doctors/kim-seongju">김성주 대표원장</a>
                <a href="/doctors/jung-jaeheon">정재헌 원장</a>
                <a href="/doctors/choi-hyejung">최혜정 원장</a>
                <a href="/doctors/han-jieun">한지은 원장</a>
                <a href="/doctors/kim-jinduk">김진덕 원장</a>
                <a href="/doctors/kim-sangwon">김상원 원장</a>
                <a href="/doctors/lee-seoyoung">이서영 원장</a>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/treatments" class="nav-link">진료안내</a>
              <div class="dropdown" style="min-width:240px">
                <a href="/treatments/implant" class="font-semibold">✦ 수면임플란트</a>
                <a href="/treatments/lamineer" class="font-semibold">✦ 라미네이트</a>
                <a href="/treatments/ortho" class="font-semibold">✦ 인비절라인</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">특화 진료</div>
                <a href="/treatments/vinique">VINIQUE 프리미엄 라미네이트</a>
                <a href="/treatments/sleep-therapy">수면치료 시스템</a>
                <a href="/treatments/painless-anesthesia">3단계 무통마취</a>
                <a href="/treatments/airflow-gbt">에어플로우 (GBT)</a>
                <a href="/treatments/pediatric-ortho">소아 교정장치</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">일반 진료</div>
                <a href="/treatments/endo">충치·신경치료·크라운</a>
                <a href="/treatments/periodontics">치주치료</a>
                <a href="/treatments/pediatric">소아치과</a>
                <a href="/treatments/whitening">전문가 미백</a>
                <a href="/treatments/icon-resin">아이콘 레진 (백반)</a>
                <a href="/treatments/q-ray">Q-ray 정밀진단</a>
                <a href="/treatments/in-house-lab">원내 디지털 기공실</a>
                <div class="h-px bg-brown-200 my-2"></div>
                <div class="text-[10px] tracking-[0.2em] text-brown-500 px-3 py-1 uppercase">더 보기</div>
                <a href="/treatments/prosthetics">보철</a>
                <a href="/treatments/preventive">예방치과</a>
                <a href="/treatments/aesthetic">심미치료</a>
                <a href="/treatments/conservative">보존치료</a>
                <a href="/treatments/general">일반진료</a>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/before-after" class="nav-link">콘텐츠</a>
              <div class="dropdown">
                <a href="/before-after">비포애프터</a>
                <a href="/blog">블로그</a>
                <a href="/notices">공지사항</a>
                <a href="/dictionary">백과사전</a>
                <a href="/faq">자주묻는질문</a>
              </div>
            </div>
            <div class="has-dropdown relative py-8">
              <a href="/directions" class="nav-link">내원안내</a>
              <div class="dropdown">
                <a href="/directions">오시는 길</a>
                <a href="/fees">수가 안내</a>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <a href="/login" class="hidden md:inline-flex text-sm text-brown-700 hover:text-brown-900 font-medium">로그인</a>
            <a href="tel:053-357-0365" class="btn-primary text-sm">
              <i class="fas fa-phone text-xs"></i>
              <span>053-357-0365</span>
            </a>
            <button id="menuBtn" class="lg:hidden w-10 h-10 flex items-center justify-center text-brown-800">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div id="mobileMenu" class="mobile-menu lg:hidden">
      <div class="flex justify-between items-center p-6 border-b border-brown-200">
        <img
          src="/static/images/logo-horizontal-brown.png"
          alt="대구365치과"
          class="h-9 w-auto"
        />
        <button id="menuClose" class="w-10 h-10 flex items-center justify-center" aria-label="메뉴 닫기">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <a href="/mission" class="block text-2xl display font-medium">병원미션</a>
        <a href="/doctors" class="block text-2xl display font-medium">의료진</a>
        <div>
          <div class="text-2xl display font-medium mb-3">진료안내</div>
          <div class="pl-4 space-y-2 text-brown-700">
            <a href="/treatments/implant" class="block">· 수면임플란트</a>
            <a href="/treatments/lamineer" class="block">· 라미네이트</a>
            <a href="/treatments/ortho" class="block">· 인비절라인</a>
            <a href="/treatments" class="block text-sm underline">전체 보기 →</a>
          </div>
        </div>
        <a href="/before-after" class="block text-2xl display font-medium">비포애프터</a>
        <a href="/blog" class="block text-2xl display font-medium">블로그</a>
        <a href="/notices" class="block text-2xl display font-medium">공지사항</a>
        <a href="/dictionary" class="block text-2xl display font-medium">백과사전</a>
        <a href="/faq" class="block text-2xl display font-medium">자주묻는질문</a>
        <div>
          <div class="text-2xl display font-medium mb-3">내원안내</div>
          <div class="pl-4 space-y-2 text-brown-700">
            <a href="/directions" class="block">· 오시는 길</a>
            <a href="/fees" class="block">· 수가 안내</a>
          </div>
        </div>
        <div class="pt-4 border-t border-brown-200 space-y-3">
          <a href="/login" class="block">로그인</a>
          <a href="/signup" class="block">회원가입</a>
          <a href="tel:053-357-0365" class="btn-primary w-full justify-center">
            <i class="fas fa-phone"></i> 053-357-0365
          </a>
        </div>
      </div>
    </div>

    <div class="h-20" aria-hidden="true"></div>
  </>
)

export const Footer = () => (
  <footer class="footer pt-24 pb-10 mt-0 relative">
    {/* Big brand headline */}
    <div class="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 relative">
      <div class="overflow-hidden">
        <h2 class="display font-black tracking-tight leading-[0.9] text-ivory/95" style="font-size:clamp(3rem,11vw,10rem);letter-spacing:-0.05em;">
          DAEGU<span class="text-gold">365</span>DENTAL
        </h2>
      </div>
      <div class="gold-divider mt-8" style="width:100%;"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
      <div class="grid md:grid-cols-12 gap-12 mb-16">
        <div class="md:col-span-4">
          <div class="mb-6">
            <img
              src="/static/images/logo-vertical-gold.png"
              alt="대구365치과 DAEGU 365 DENTAL CLINIC"
              class="h-28 w-auto"
              width="562" height="562"
            />
          </div>
          <p class="text-brown-300 text-sm leading-relaxed mb-6">
            치과공포증을 가졌던 의사가 만드는,<br/>
            두려움 없는 치과.<br/>
            <span class="text-gold display font-bold">"치과 진입의 허들을 낮추고 경험의 혁신을 이룩한다"</span>
          </p>
          <div class="flex gap-3">
            <a href="https://blog.naver.com/nowhere2721" target="_blank" rel="noopener" class="w-10 h-10 rounded-full border border-brown-700 flex items-center justify-center hover:bg-brown-800 transition">
              <span class="text-xs font-bold">blog</span>
            </a>
            <a href="https://www.instagram.com/chee_jaeee" target="_blank" rel="noopener" class="w-10 h-10 rounded-full border border-brown-700 flex items-center justify-center hover:bg-brown-800 transition">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div class="md:col-span-2">
          <h4 class="display text-base text-gold mb-4 font-bold tracking-tight">진료안내</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/treatments/implant">수면임플란트</a></li>
            <li><a href="/treatments/lamineer">라미네이트</a></li>
            <li><a href="/treatments/ortho">인비절라인</a></li>
            <li><a href="/treatments">전체 진료</a></li>
          </ul>
        </div>
        <div class="md:col-span-2">
          <h4 class="display text-base text-gold mb-4 font-bold tracking-tight">콘텐츠</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/before-after">비포애프터</a></li>
            <li><a href="/blog">블로그</a></li>
            <li><a href="/dictionary">백과사전</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div class="md:col-span-4">
          <h4 class="display text-base text-gold mb-4 font-bold tracking-tight">내원안내</h4>
          <ul class="space-y-3 text-sm text-brown-200">
            <li class="flex gap-2"><i class="fas fa-map-marker-alt mt-1 text-gold"></i>
              <span>대구광역시 북구 침산로 148<br/>엠브로스퀘어 7층</span>
            </li>
            <li class="flex gap-2"><i class="fas fa-phone mt-1 text-gold"></i>
              <a href="tel:053-357-0365">053-357-0365</a>
            </li>
            <li class="flex gap-2"><i class="fas fa-envelope mt-1 text-gold"></i>
              <a href="mailto:daegu365dc@naver.com">daegu365dc@naver.com</a>
            </li>
            <li class="flex gap-2"><i class="fas fa-clock mt-1 text-gold"></i>
              <span class="text-xs leading-relaxed">
                월·목 09:30~21:00<br/>
                화·수·금 09:30~18:30<br/>
                토·일 09:30~17:00
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-brown-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-brown-400">
        <div class="space-y-1">
          <div>사업자: 대구365치과 · 대표: 김성주</div>
          <div>주소: 대구광역시 북구 침산로 148 엠브로스퀘어 7층</div>
          <div>TEL: 053-357-0365 · E: daegu365dc@naver.com</div>
        </div>
        <div class="text-right">
          <div>© <span data-year></span> DAEGU365 DENTAL. All Rights Reserved.</div>
          <div class="mt-1"><a href="/admin" class="opacity-40 hover:opacity-80">관리자</a></div>
        </div>
      </div>
    </div>
  </footer>
)
