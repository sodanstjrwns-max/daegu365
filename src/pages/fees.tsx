import { Navbar, Footer } from '../components/Layout'

/* ============================================================
   대구365치과 · 비급여 의료수가표
   - DB(fees 테이블)에서 동적으로 로드 (관리자 페이지에서 편집)
   - DB가 비어있거나 오류시 FALLBACK 상수 사용 (PPTX 2026 원본)
   ============================================================ */

export type FeeRow = {
  name: string
  price: string
  note?: string | null
  highlight?: boolean
}

export type FeeGroup = {
  category: string
  icon: string
  rows: FeeRow[]
  groupNote?: string | null
}

/* ============= FALLBACK (DB 없을 때만 사용) ============= */
export const FEES_FALLBACK: FeeGroup[] = [
  {
    category: '임플란트', icon: 'fa-tooth',
    groupNote: '맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)',
    rows: [
      { name: '메가젠 (ST)', price: '80만원', highlight: true },
      { name: '오스템 (BA)', price: '110만원' },
      { name: '메가젠 (블루다이아몬드)', price: '120만원' },
      { name: '오스템 (SOI)', price: '120만원' },
      { name: '스트라우만 (앤서지)', price: '150만원' },
      { name: '임플란트 연결치 (폰틱)', price: '50만원' },
      { name: '맞춤기둥', price: '25만원' },
      { name: '타치과 임플란트 크라운 (지르코니아)', price: '50만원' },
      { name: '타치과 임플란트 나사조임', price: '10만원', note: '레진홀 포함' },
      { name: '타치과 레진홀', price: '2만원', note: '단순 홀메움' },
    ],
  },
]

/* ============= 제증명 수수료 ============= */
type CertRow = { name: string; basis: string; price: string }

const CERTS: CertRow[] = [
  { name: '일반진단서', basis: '의료법 시행규칙 [별지 제5호의2서식]에 따라 의사가 진찰하거나 검사한 결과를 종합하여 작성한 진단서', price: '20,000원' },
  { name: '상해진단서 (3주 미만)', basis: '의료법 시행규칙 [별지 제5호의3서식]에 따라 질병의 원인이 상해로 상해진단기간이 3주 미만인 경우', price: '100,000원' },
  { name: '상해진단서 (3주 이상)', basis: '의료법 시행규칙 [별지 제5호의3서식]에 따라 질병의 원인이 상해로 상해진단기간이 3주 이상인 경우', price: '150,000원' },
  { name: '병무용 진단서', basis: '병역법 시행규칙 [별지 제106호서식]에 따라 군복무 등을 위해 의사가 작성한 진단서', price: '20,000원' },
  { name: '통원확인서', basis: '환자의 인적사항과 외래 진료일을 기재하여, 외래진료사실에 대하여 행정적으로 발급하는 확인서', price: '1,000원' },
  { name: '진료확인서', basis: '환자의 인적사항과 특정 진료내역을 기재한 확인서 (방사선 치료, 검사 및 의약품 등)', price: '3,000원' },
  { name: '향후진료비추정서 (천만원 미만)', basis: '계속적인 진료가 요구되는 환자에게 향후 발생이 예상되는 치료비가 1천만원 미만일 경우', price: '20,000원' },
  { name: '향후진료비추정서 (천만원 이상)', basis: '계속적인 진료가 요구되는 환자에게 향후 발생이 예상되는 치료비가 1천만원 이상일 경우', price: '50,000원' },
  { name: '진료기록사본 (1~5매)', basis: '진료기록부 등을 복사하는 경우 (1~5매까지, 1매당 금액) · 파노라마 인쇄/이메일 전송 동일 금액', price: '1,000원' },
  { name: '진료기록사본 (6매 이상)', basis: '진료기록부 등을 복사하는 경우 (6매부터, 1매당 금액)', price: '100원' },
  { name: '진료기록영상 (CD)', basis: '영상진단, 내시경사진, 진료 중 촬영한 신체부위 등 영상 자료 (CD 포함)', price: '10,000원' },
  { name: '제증명서 사본', basis: '기존의 제증명서를 복사(재발급)하는 경우 (동시 발급 시 최초 1통 외 추가본은 사본으로 간주)', price: '1,000원' },
]

export const FeesPage = ({ groups }: { groups: FeeGroup[] }) => {
  const FEES = (groups && groups.length > 0) ? groups : FEES_FALLBACK
  return (
  <>
    <Navbar />

    {/* ============= HERO ============= */}
    <section class="pt-32 pb-20 bg-cream relative overflow-hidden">
      <div class="blob" style="width:500px;height:500px;background:#c9a876;top:-200px;right:-150px;opacity:0.12;"></div>
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div class="max-w-3xl fade-in">
          <div class="section-label mb-6">FEES · 비용 안내</div>
          <h1 class="t-display mb-8">
            <span class="text-brown-900">투명한</span><br/>
            <span class="t-gold">비용 안내</span>
          </h1>
          <p class="t-lead mb-8">
            대구365치과는 모든 비급여 항목의 비용을 투명하게 공개합니다.<br/>
            진료 전 정확한 비용을 안내받으실 수 있습니다.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic">
              <i class="fas fa-phone"></i>
              <span>상담 전화 053-357-0365</span>
            </a>
            <a href="#certs" class="btn-outline magnetic">
              <span>제증명 수수료</span>
              <i class="fas fa-arrow-down text-sm"></i>
            </a>
          </div>
        </div>

        {/* 안내 카드 4개 */}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 fade-in-stagger">
          {[
            { icon: 'fa-calculator', label: '명확한 비용', desc: '진료 전 전체 비용 안내' },
            { icon: 'fa-shield-heart', label: '평생 보증', desc: '임플란트 픽스쳐 5년 · 상부 평생' },
            { icon: 'fa-receipt', label: '카드 결제', desc: '전 카드사 무이자 할부' },
            { icon: 'fa-handshake', label: '추가 비용 無', desc: '동의 없이 추가 진료 No' },
          ].map(item => (
            <div class="bg-ivory rounded-2xl p-6 border border-brown-200/60 hover:border-brown-400 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
              <div class="w-11 h-11 rounded-full bg-brown-50 flex items-center justify-center text-brown-900 mb-4 border border-brown-200">
                <i class={`fas ${item.icon}`}></i>
              </div>
              <div class="display text-base font-black tracking-tight mb-1">{item.label}</div>
              <div class="text-xs text-brown-600 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============= 안내 문구 ============= */}
    <section class="py-12 bg-ivory border-b border-brown-100">
      <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div class="bg-brown-50 border-l-4 border-gold rounded-r-2xl p-6 lg:p-8">
          <div class="flex gap-4">
            <div class="text-gold text-2xl pt-1"><i class="fas fa-circle-info"></i></div>
            <div class="flex-1">
              <div class="display text-lg font-black tracking-tight mb-2 text-brown-900">비용 안내 이용 안내</div>
              <ul class="text-sm text-brown-700 leading-relaxed space-y-1.5">
                <li>· 본 비급여 의료수가표는 <strong class="text-brown-900">시행일자 2026년 5월 25일</strong> 기준이며, 모든 금액은 <strong class="text-brown-900">부가세 10% 별도</strong>입니다.</li>
                <li>· 본 수가표는 <strong class="text-brown-900">의료법 제45조</strong>에 의거하여 고지하며, 고지 항목 변경 및 재료대에 따라 변동될 수 있습니다.</li>
                <li>· 실제 비용은 <strong class="text-brown-900">진단 결과 · 난이도 · 사용 재료</strong>에 따라 달라질 수 있습니다.</li>
                <li>· 정확한 비용은 <strong class="text-brown-900">상담 시 사전에 투명하게 안내</strong>해드립니다.</li>
                <li>· 임플란트는 <strong class="text-brown-900">픽스쳐 5년, 상부보철 평생 보증</strong>이 적용됩니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============= 카테고리 네비 (앵커) ============= */}
    <section class="sticky top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-brown-100">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="flex gap-2 overflow-x-auto py-4 no-scrollbar text-sm">
          {FEES.map((g, i) => (
            <a
              href={`#cat-${i}`}
              class="flex-shrink-0 px-4 py-2 rounded-full bg-brown-50 hover:bg-brown-900 hover:text-ivory border border-brown-200 hover:border-brown-900 text-brown-700 font-semibold tracking-tight transition-all duration-300 whitespace-nowrap"
            >
              <i class={`fas ${g.icon} text-xs mr-2 opacity-70`}></i>
              {g.category}
            </a>
          ))}
          <a href="#certs" class="flex-shrink-0 px-4 py-2 rounded-full bg-gold/10 hover:bg-gold hover:text-brown-950 border border-gold/40 hover:border-gold text-brown-800 font-semibold tracking-tight transition-all duration-300 whitespace-nowrap">
            <i class="fas fa-file-contract text-xs mr-2 opacity-70"></i>
            제증명 수수료
          </a>
        </div>
      </div>
    </section>

    {/* ============= 비급여 수가 그룹 ============= */}
    <section class="py-20 lg:py-24">
      <div class="max-w-[1100px] mx-auto px-6 lg:px-12 space-y-16">
        {FEES.map((group, gIdx) => (
          <div id={`cat-${gIdx}`} class="fade-in scroll-mt-44">
            {/* 그룹 헤더 */}
            <div class="flex items-end justify-between gap-6 mb-8 flex-wrap">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-brown-950 text-gold flex items-center justify-center text-xl lg:text-2xl shadow-lg">
                  <i class={`fas ${group.icon}`}></i>
                </div>
                <div>
                  <div class="text-[10px] tracking-[0.3em] text-brown-500 mb-1 font-bold">CATEGORY · {String(gIdx + 1).padStart(2, '0')}</div>
                  <h2 class="display text-3xl lg:text-4xl font-black tracking-tight text-brown-900">{group.category}</h2>
                </div>
              </div>
              <div class="text-xs text-brown-500 font-semibold">총 {group.rows.length}개 항목</div>
            </div>

            {group.groupNote && (
              <div class="mb-5 px-5 py-3 bg-gold/8 border-l-2 border-gold rounded-r-lg text-sm text-brown-700">
                <i class="fas fa-info-circle text-gold mr-2"></i>
                {group.groupNote}
              </div>
            )}

            {/* 수가 테이블 */}
            <div class="bg-ivory rounded-2xl border border-brown-200/60 overflow-hidden shadow-sm">
              {/* 헤더 (데스크탑만) */}
              <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-brown-50 border-b border-brown-200 text-[10px] tracking-[0.3em] font-bold text-brown-600">
                <div class="col-span-7">세부 내역</div>
                <div class="col-span-3">비고</div>
                <div class="col-span-2 text-right">비용</div>
              </div>

              {group.rows.map((row, rIdx) => (
                <div
                  class={`px-6 py-5 grid md:grid-cols-12 gap-2 md:gap-4 items-center hover:bg-brown-50/50 transition-colors ${rIdx > 0 ? 'border-t border-brown-100' : ''} ${row.highlight ? 'bg-gold/5' : ''}`}
                >
                  <div class="md:col-span-7">
                    <div class="flex items-center gap-2 flex-wrap">
                      {row.highlight && (
                        <span class="text-[9px] tracking-[0.2em] font-bold text-brown-950 bg-gold px-2 py-0.5 rounded-full">SIGNATURE</span>
                      )}
                      <span class="text-base font-semibold text-brown-900 tracking-tight">{row.name}</span>
                    </div>
                  </div>
                  <div class="md:col-span-3 text-xs text-brown-500 leading-relaxed">
                    {row.note && <span><i class="fas fa-asterisk text-[8px] text-gold mr-1"></i>{row.note}</span>}
                  </div>
                  <div class="md:col-span-2 md:text-right">
                    <span class="display text-xl font-black text-brown-900 tracking-tight whitespace-nowrap">
                      {row.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ============= 제증명 수수료 ============= */}
    <section id="certs" class="py-24 lg:py-28 bg-cream scroll-mt-32">
      <div class="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div class="mb-12 fade-in">
          <div class="section-label mb-6">CERTIFICATES</div>
          <h2 class="t-display mb-6">
            <span class="text-brown-900">제증명</span> <span class="t-gold">수수료</span>
          </h2>
          <p class="text-brown-600 max-w-2xl">
            보건복지부 고시 「의료기관의 제증명수수료 항목 및 금액에 관한 기준」 에 따라 운영합니다.
          </p>
        </div>

        <div class="bg-ivory rounded-2xl border border-brown-200/60 overflow-hidden shadow-sm">
          <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-brown-50 border-b border-brown-200 text-[10px] tracking-[0.3em] font-bold text-brown-600">
            <div class="col-span-3">항목</div>
            <div class="col-span-7">기준</div>
            <div class="col-span-2 text-right">금액</div>
          </div>

          {CERTS.map((c, i) => (
            <div class={`px-6 py-5 grid md:grid-cols-12 gap-2 md:gap-4 items-start hover:bg-brown-50/50 transition-colors ${i > 0 ? 'border-t border-brown-100' : ''}`}>
              <div class="md:col-span-3">
                <div class="font-bold text-brown-900 tracking-tight">{c.name}</div>
              </div>
              <div class="md:col-span-7 text-xs text-brown-600 leading-relaxed">
                {c.basis}
              </div>
              <div class="md:col-span-2 md:text-right">
                <span class="display text-base font-black text-brown-900 tracking-tight whitespace-nowrap">{c.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div class="mt-6 text-xs text-brown-500">
          ※ 상한금액은 진찰료 및 각종 검사료 등 진료비용을 포함하지 않습니다.
        </div>
      </div>
    </section>

    {/* ============= CTA ============= */}
    <section class="relative py-24 lg:py-32 text-ivory overflow-hidden" style="background:var(--brown-950);">
      <div class="blob" style="width:600px;height:600px;background:#c9a876;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.18;"></div>
      <div class="relative max-w-3xl mx-auto px-6 text-center">
        <div class="section-label mb-6 fade-in" style="color:var(--gold); border-color:var(--gold); background:rgba(26,18,10,0.5);">
          NEED CONSULTATION
        </div>
        <h2 class="mb-8 fade-in font-black tracking-tight leading-[1]" style="font-size:clamp(2rem,5vw,4rem);color:var(--ivory);">
          정확한 비용은<br/>
          <span class="t-gold">상담 시 안내</span>해드립니다.
        </h2>
        <p class="t-lead mb-10 fade-in" style="color:rgba(253,251,247,0.75);">
          진단 결과와 난이도, 사용 재료에 따라 비용이 달라질 수 있어요.<br/>
          전화 한 통이면 친절한 데스크에서 안내해드립니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4 fade-in">
          <a href="tel:053-357-0365" class="btn-primary btn-shine magnetic" style="background:linear-gradient(135deg, var(--gold), var(--brown-500)); color:var(--brown-950);">
            <i class="fas fa-phone"></i>
            <span class="font-bold">053-357-0365</span>
          </a>
          <a href="/directions" class="btn-outline magnetic" style="border-color:var(--ivory); color:var(--ivory);">
            <i class="fas fa-map-marker-alt"></i>
            <span>오시는 길</span>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </>
  )
}
