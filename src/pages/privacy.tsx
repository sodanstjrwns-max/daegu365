import { Navbar, Footer } from '../components/Layout'

// 개인정보처리방침 — 홈페이지(daegu365dc.kr)가 실제로 처리하는 항목 기준으로 작성.
// 근거 코드: 상담 모달(POST /api/consultations → D1 consultations), 회원가입(POST /signup → D1 members),
// 쿠키(session·admin), GA4·Clarity·1st-party 비콘(renderer.tsx), 호스팅(Cloudflare Pages·D1·R2).
// 수집 항목·업체가 바뀌면 이 페이지도 함께 고친다.

export const PRIVACY_EFFECTIVE_DATE = '2026-09-29'

const H2 = ({ id, children }: { id: string, children: any }) => (
  <h2 id={id} class="display text-xl md:text-2xl font-black tracking-tight text-brown-950 mt-14 mb-4 scroll-mt-28">{children}</h2>
)

const Table = ({ head, rows }: { head: string[], rows: (string | any)[][] }) => (
  <div class="overflow-x-auto my-4">
    <table class="w-full text-[13px] border border-brown-200 bg-ivory">
      <thead class="bg-brown-50">
        <tr>{head.map((h) => <th class="text-left p-3 border-b border-brown-200 font-bold text-brown-900 whitespace-nowrap">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr class="align-top">{r.map((cell) => <td class="p-3 border-b border-brown-100 text-brown-800 leading-relaxed">{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
)

const TOC: [string, string][] = [
  ['purpose', '1. 개인정보의 처리 목적'],
  ['items', '2. 처리하는 개인정보 항목'],
  ['period', '3. 보유·이용 기간'],
  ['third-party', '4. 제3자 제공'],
  ['outsourcing', '5. 처리 위탁'],
  ['overseas', '6. 국외 이전'],
  ['destroy', '7. 파기 절차 및 방법'],
  ['rights', '8. 정보주체의 권리와 행사 방법'],
  ['security', '9. 안전성 확보 조치'],
  ['cookies', '10. 쿠키·분석도구의 설치·운영 및 거부'],
  ['officer', '11. 개인정보 보호책임자'],
  ['remedy', '12. 권익침해 구제 방법'],
  ['change', '13. 방침의 변경'],
]

export const PrivacyPage = () => (
  <>
    <Navbar />
    <section class="pt-20 pb-10 bg-cream">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="section-label mb-6">PRIVACY</div>
        <h1 class="t-display mb-6">개인정보처리방침</h1>
        <p class="text-brown-700 text-sm leading-relaxed">
          대구365치과(이하 ‘병원’)는 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위해
          다음과 같이 개인정보처리방침을 둡니다.
        </p>
        <p class="text-brown-500 text-xs mt-3">시행일: {PRIVACY_EFFECTIVE_DATE}</p>
      </div>
    </section>

    <section class="py-12 max-w-3xl mx-auto px-6 text-[15px] text-brown-800 leading-relaxed">
      <p class="text-sm text-brown-600 bg-brown-50 border border-brown-100 rounded-xl p-4">
        이 방침은 병원 홈페이지(daegu365dc.kr)의 온라인 상담 신청·회원가입·방문 통계에 적용됩니다.
        내원 진료 과정에서 작성되는 진료기록 등은 「의료법」 등 관계 법령에 따라 별도로 관리됩니다.
      </p>

      <nav aria-label="목차" class="mt-8 p-5 rounded-2xl border border-brown-200 bg-ivory">
        <div class="text-xs font-bold tracking-widest text-brown-500 mb-3">목차</div>
        <ol class="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {TOC.map(([id, label]) => <li><a href={`#${id}`} class="text-brown-800 hover:underline">{label}</a></li>)}
        </ol>
      </nav>

      <H2 id="purpose">1. 개인정보의 처리 목적</H2>
      <p>병원은 다음 목적을 위해서만 개인정보를 처리하며, 목적이 바뀌면 법령에 따라 별도 동의를 받는 등 필요한 조치를 합니다.</p>
      <ul class="list-disc pl-5 mt-3 space-y-1.5">
        <li><strong>온라인 상담·예약 신청</strong>: 신청자 확인, 상담 답변과 예약 안내를 위한 연락, 중복·부정 신청 방지</li>
        <li><strong>회원 관리</strong>: 회원 식별과 로그인 유지, 회원 전용 콘텐츠(치료 사례 애프터 사진) 열람 제공, 문의 답변</li>
        <li><strong>진료 정보·이벤트 안내</strong>(선택 동의한 경우에 한함): 진료 정보와 이벤트·프로모션 안내</li>
        <li><strong>홈페이지 개선</strong>: 방문 통계 분석, 서비스 품질 개선과 보안 유지</li>
      </ul>

      <H2 id="items">2. 처리하는 개인정보 항목</H2>
      <Table
        head={['구분', '항목', '수집 방법']}
        rows={[
          ['온라인 상담·예약 신청', <>필수: 이름, 연락처(휴대전화번호), 상담 희망 진료<br />선택: 희망 일자, 희망 시간대, 추가 메시지, 진료 정보·이벤트 안내 수신 동의 여부<br />자동 수집: 접속 IP 주소, 브라우저 정보(User-Agent), 신청한 페이지 주소, 신청 일시</>, '상담 신청 창'],
          ['회원가입', <>필수: 성함, 이메일, 휴대폰번호, 비밀번호(암호화 저장)<br />선택: 마케팅 정보 수신 동의 여부</>, '회원가입 화면'],
          ['홈페이지 이용', '쿠키, 방문 페이지, 방문 일시, 기기·브라우저 정보, 대략적 위치(국가·지역 수준), 스크롤·클릭 등 이용 기록', '쿠키·분석도구(10항 참조)'],
        ]}
      />
      <p class="text-sm text-brown-600">
        추가 메시지란은 선택 항목입니다. 증상 등 건강에 관한 내용은 이용자가 직접 적은 경우에만 상담 답변 목적으로 이용하며,
        상담에 꼭 필요한 범위를 넘는 정보는 적지 않도록 권장드립니다.
      </p>

      <H2 id="period">3. 보유·이용 기간</H2>
      <Table
        head={['구분', '보유·이용 기간']}
        rows={[
          ['온라인 상담·예약 신청 정보(자동 수집 항목 포함)', '상담 완료 후 1년'],
          ['회원 정보', '회원 탈퇴 시까지'],
          ['진료 정보·이벤트 안내 수신 동의', '동의 철회 또는 회원 탈퇴 시까지'],
          ['로그인 쿠키(session)', '최대 30일 또는 로그아웃 시까지'],
        ]}
      />
      <p class="text-sm text-brown-600">다른 법령에 따라 보존해야 하는 경우에는 해당 법령이 정한 기간 동안 보관합니다.</p>

      <H2 id="third-party">4. 개인정보의 제3자 제공</H2>
      <p>
        병원은 이용자의 개인정보를 제1항의 목적 범위에서만 처리하며, 이용자의 별도 동의가 있거나 법률에 특별한 규정이 있는 경우 등
        「개인정보 보호법」 제17조·제18조에 해당하는 경우를 제외하고는 제3자에게 제공하지 않습니다. 현재 제3자에게 제공하는 개인정보는 없습니다.
      </p>

      <H2 id="outsourcing">5. 개인정보 처리 위탁</H2>
      <p>병원은 홈페이지 운영을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.</p>
      <Table
        head={['수탁자', '위탁 업무']}
        rows={[
          ['Cloudflare, Inc.', '홈페이지 호스팅, 상담 신청·회원 정보 데이터베이스 및 파일 저장(Cloudflare Pages·D1·R2)'],
        ]}
      />
      <p class="text-sm text-brown-600">
        위탁 계약 시 「개인정보 보호법」 제26조에 따라 위탁 업무 수행 목적 외 처리 금지, 안전성 확보 조치, 재위탁 제한 등을 정하고
        수탁자가 개인정보를 안전하게 처리하는지 감독합니다. 수탁자나 위탁 업무가 바뀌면 이 방침을 통해 알립니다.
      </p>

      <H2 id="overseas">6. 개인정보의 국외 이전</H2>
      <p>홈페이지 운영과 방문 통계를 위해 다음과 같이 개인정보가 국외로 이전됩니다.</p>
      <Table
        head={['이전받는 자(국가)', '이전 항목', '목적', '이전 일시·방법', '보유 기간']}
        rows={[
          [<>Cloudflare, Inc.(미국 등 Cloudflare 데이터센터 소재 국가)<br /><a class="underline" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">개인정보처리방침</a></>, '2항의 상담 신청·회원 정보 및 자동 수집 항목', '홈페이지 호스팅·데이터 저장', '홈페이지 이용 시 네트워크를 통해 수시 전송', '3항의 보유 기간 또는 위탁 계약 종료 시까지'],
          [<>Google LLC(미국)<br /><a class="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener">개인정보처리방침</a></>, '쿠키 식별자, 방문 페이지, 기기·브라우저 정보, 대략적 위치 등 이용 기록', '방문 통계 분석(Google Analytics 4)', '홈페이지 방문 시 네트워크를 통해 수시 전송', 'Google 데이터 보관 설정 기간'],
          [<>Microsoft Corporation(미국)<br /><a class="underline" href="https://privacy.microsoft.com/ko-kr/privacystatement" target="_blank" rel="noopener">개인정보처리방침</a></>, '쿠키 식별자, 방문 페이지, 기기·브라우저 정보, 스크롤·클릭 등 이용 기록', '이용 행태 분석(Microsoft Clarity)', '홈페이지 방문 시 네트워크를 통해 수시 전송', 'Microsoft Clarity 보관 기간'],
        ]}
      />
      <p class="text-sm text-brown-600">
        국외 이전을 원하지 않으시면 온라인 상담 신청 대신 전화(053-357-0365)로 상담하실 수 있으며, 분석도구는 10항의 방법으로 거부할 수 있습니다.
        이 경우 홈페이지를 통한 온라인 상담 신청·회원 서비스는 이용이 제한될 수 있습니다.
      </p>

      <H2 id="destroy">7. 개인정보의 파기 절차 및 방법</H2>
      <ul class="list-disc pl-5 space-y-1.5">
        <li><strong>파기 절차</strong>: 보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 다른 법령에 따라 보존해야 하면 별도로 분리해 보관합니다.</li>
        <li><strong>파기 방법</strong>: 전자적 파일은 복구할 수 없는 방법으로 삭제하고, 종이에 출력된 정보는 분쇄하거나 소각합니다.</li>
      </ul>

      <H2 id="rights">8. 정보주체의 권리와 행사 방법</H2>
      <p>
        이용자는 언제든지 자신의 개인정보 열람, 정정·삭제, 처리정지, 동의 철회(진료 정보·이벤트 안내 수신 거부 포함), 회원 탈퇴를 요구할 수 있습니다.
        전화(053-357-0365), 이메일(daegu365dc@naver.com) 또는 내원하여 요청하시면 본인 확인 후 지체 없이 조치합니다.
        법정대리인이나 위임을 받은 사람을 통해서도 요청할 수 있으며, 이때는 위임 사실을 확인할 수 있는 서류가 필요합니다.
      </p>
      <p class="mt-3 text-sm text-brown-600">
        다른 법령에서 수집 대상으로 정한 개인정보는 삭제를 요구할 수 없고, 법률에 특별한 규정이 있는 경우 등에는 열람·처리정지 요구가 제한될 수 있습니다.
      </p>

      <H2 id="security">9. 개인정보의 안전성 확보 조치</H2>
      <ul class="list-disc pl-5 space-y-1.5">
        <li><strong>관리적 조치</strong>: 개인정보를 다루는 직원을 최소화하고, 상담 신청 내역은 관리자 권한이 있는 사람만 확인합니다.</li>
        <li><strong>기술적 조치</strong>: 암호화 통신(HTTPS) 적용, 관리자 화면 비밀번호 인증과 검색 노출 차단, 회원 비밀번호 일방향 암호화 저장, 동일 번호의 반복 신청 제한</li>
        <li><strong>물리적 조치</strong>: 홈페이지 데이터는 수탁자(Cloudflare)의 데이터센터에 저장되며, 출입 통제 등 물리적 보안은 수탁자의 보안 정책에 따릅니다.</li>
      </ul>

      <H2 id="cookies">10. 쿠키·분석도구의 설치·운영 및 거부</H2>
      <p>병원 홈페이지는 다음 쿠키와 분석도구를 사용합니다.</p>
      <Table
        head={['구분', '용도', '비고']}
        rows={[
          ['session 쿠키', '회원 로그인 상태 유지', '로그인 시에만 생성, 최대 30일'],
          ['admin 쿠키', '병원 관리자 로그인 상태 유지', '관리자만 해당, 최대 1일'],
          ['Google Analytics 4 (_ga 등)', '방문 수·유입 경로·이용 페이지 통계', 'IP 익명화 설정 적용'],
          ['Microsoft Clarity (_clck·_clsk 등)', '스크롤·클릭 등 이용 행태 분석(화면 이용 기록 포함)', '서비스 개선 목적'],
          ['자체 방문 통계(pf-dashboard-2nt.pages.dev)', '페이지 조회·스크롤·전화/예약 버튼 클릭 수 집계', '쿠키·개인 식별자 없이 사이트 주소·페이지 주소·이벤트 종류만 전송, 브라우저의 추적 거부(DNT·GPC) 설정 시 전송하지 않음, 로그인·회원가입 화면 제외'],
        ]}
      />
      <p class="mt-3">
        <strong>거부 방법</strong>: 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다
        (예: Chrome 설정 › 개인정보 및 보안 › 서드파티 쿠키 / Safari 설정 › 개인정보 보호 / Edge 설정 › 쿠키 및 사이트 권한).
        Google Analytics는 <a class="underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">차단 부가 기능</a>으로도 거부할 수 있습니다.
        쿠키를 거부하면 회원 로그인 등 일부 기능 이용이 어려울 수 있습니다.
      </p>

      <H2 id="officer">11. 개인정보 보호책임자</H2>
      <p>병원은 개인정보 처리에 관한 업무를 총괄하고 관련 고충 처리와 피해 구제를 위해 아래와 같이 개인정보 보호책임자를 지정합니다.</p>
      <Table
        head={['구분', '내용']}
        rows={[
          ['성명', '김성주'],
          ['직책', '대표원장'],
          ['연락처', <><a class="underline" href="tel:053-357-0365">053-357-0365</a> · <a class="underline" href="mailto:daegu365dc@naver.com">daegu365dc@naver.com</a></>],
          ['주소', '(41545) 대구광역시 북구 침산로 148 엠브로스퀘어 7층 대구365치과'],
        ]}
      />
      <p class="text-sm text-brown-600">개인정보 열람 청구와 관련 문의도 위 연락처로 접수합니다.</p>

      <H2 id="remedy">12. 권익침해 구제 방법</H2>
      <p>개인정보 침해에 대한 피해 구제나 상담이 필요하시면 아래 기관에 문의하실 수 있습니다.</p>
      <ul class="list-disc pl-5 mt-3 space-y-1.5">
        <li>개인정보분쟁조정위원회: (국번 없이) 1833-6972 · <a class="underline" href="https://www.kopico.go.kr" target="_blank" rel="noopener">www.kopico.go.kr</a></li>
        <li>개인정보침해신고센터(한국인터넷진흥원): (국번 없이) 118 · <a class="underline" href="https://privacy.kisa.or.kr" target="_blank" rel="noopener">privacy.kisa.or.kr</a></li>
        <li>대검찰청: (국번 없이) 1301 · <a class="underline" href="https://www.spo.go.kr" target="_blank" rel="noopener">www.spo.go.kr</a></li>
        <li>경찰청: (국번 없이) 182 · <a class="underline" href="https://ecrm.police.go.kr" target="_blank" rel="noopener">ecrm.police.go.kr</a></li>
      </ul>

      <H2 id="change">13. 개인정보처리방침의 변경</H2>
      <p>이 개인정보처리방침은 {PRIVACY_EFFECTIVE_DATE}부터 적용됩니다. 내용이 추가·삭제·수정되면 시행 전에 홈페이지를 통해 알립니다.</p>
    </section>
    <Footer />
  </>
)
