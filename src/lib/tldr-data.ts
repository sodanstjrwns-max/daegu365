/**
 * 17개 진료 페이지 TL;DR 데이터
 * - summary: LLM 인용 직격 1-2문장 (AEO 핵심)
 * - bullets: 4-6개 핵심 팩트 (가격/기간/장비/적응증 등)
 * - cta: 다음 단계 안내 (선택)
 *
 * 사용처: src/pages/treatments-*.tsx HERO 직후
 */

export type TldrEntry = {
  summary: string
  bullets: Array<{ label: string; value: string }>
  cta?: { text: string; href: string }
  label?: string
}

export const TLDR_DATA: Record<string, TldrEntry> = {
  'implant': {
    summary: '수면임플란트는 의식하 진정(IV Sedation) 하에 진행하는 임플란트로, 치과공포증 환자도 꿈결처럼 편안하게 받을 수 있습니다. 메가젠·오스템·스트라우만 5종 픽스쳐, 픽스쳐 5년·상부 평생 보증.',
    bullets: [
      { label: '가격', value: '80만원 ~ 150만원 (브랜드별)' },
      { label: '소요 기간', value: '식립 1회 + 골유착 7~12주 + 보철' },
      { label: '핵심 장비', value: 'CBCT + 디지털 가이드 + IV 진정' },
      { label: '보증', value: '픽스쳐 5년 / 상부 보철 평생' },
      { label: '추천 대상', value: '치과공포증 / 뼈 부족 / 다수 결손' },
      { label: '마취', value: '4단계 무통마취 기본 포함' },
    ],
    cta: { text: '수면임플란트 상담 예약', href: '/contact' },
  },
  'lamineer': {
    summary: 'VINIQUE 라미네이트는 0.3mm 미세 보철 프리미엄 라미네이트입니다. 자연치 삭제를 최소화하고, 원내 D.LAB에서 즉시 색상·교합을 조정합니다. 결혼·면접·이벤트 직전에도 가능합니다.',
    bullets: [
      { label: '가격', value: '60만원 ~ (재료별)' },
      { label: '치아 삭제량', value: '0.3mm (일반 라미네이트 0.5~1mm)' },
      { label: '재료', value: '이마젝스 / E.max / 지르코니아' },
      { label: '소요 기간', value: '2~3회 내원 (1~2주)' },
      { label: '제작', value: '원내 D.LAB 즉시 조정' },
      { label: '추천 대상', value: '변색·모양·간격 고민 / 단기 결과' },
    ],
    cta: { text: 'VINIQUE 라미네이트 상담', href: '/contact' },
  },
  'ortho': {
    summary: '인비절라인 투명교정은 iTero 5D 스캔과 ClinCheck 시뮬레이션으로 결과를 미리 확인하는 디지털 교정입니다. 투명·탈착식이라 식사·양치·일상이 그대로 유지됩니다.',
    bullets: [
      { label: '가격', value: '450만원 ~' },
      { label: '평균 기간', value: '12~18개월 (2주마다 교체)' },
      { label: '핵심 장비', value: 'iTero 5D + ClinCheck 시뮬레이션' },
      { label: '교체 주기', value: '2주마다 새 얼라이너' },
      { label: '추천 대상', value: '심미 중시 성인 / 결과 미리 확인' },
      { label: '유지 장치', value: '교정 후 24개월 이상 권장' },
    ],
    cta: { text: '인비절라인 ClinCheck 무료 상담', href: '/contact' },
  },
  'sleep-therapy': {
    summary: '수면치료 시스템은 의식하 진정(IV Sedation) + 4단계 무통마취 + 4지표 실시간 모니터링으로, 치과공포증 의사가 직접 설계했습니다. 시술 중 꿈결처럼 편안하시고, 통증 기억이 거의 없습니다.',
    bullets: [
      { label: '가격', value: '시술 항목별 별도 적용' },
      { label: '진정 방식', value: 'IV Sedation (의식하 진정)' },
      { label: '모니터링', value: '심박·산소포화도·혈압·호흡 4지표' },
      { label: '준비', value: '8시간 금식 + 동행자 필수' },
      { label: '회복', value: '시술 후 회복실 1시간' },
      { label: '추천 대상', value: '치과공포증 / 구역 반사 / 장시간 시술' },
    ],
    cta: { text: '수면치료 사전 상담', href: '/contact' },
  },
  'painless-anesthesia': {
    summary: '4단계 무통마취는 가글 → 도포 → 컴퓨터 제어 무통마취기(The Wand) → 본마취로 이어지는 모든 진료 기본 적용 프로토콜입니다. 추가 비용 없습니다. 바늘이 들어가는 그 순간을 없앱니다.',
    bullets: [
      { label: '가격', value: '추가 비용 없음 (모든 진료 기본)' },
      { label: '1단계', value: '가글마취 (점막 1차 둔감화)' },
      { label: '2단계', value: '도포마취 (주사 부위 표면)' },
      { label: '3단계', value: 'The Wand 컴퓨터 제어 (0.005mL/sec)' },
      { label: '4단계', value: '본마취' },
      { label: '추천 대상', value: '주사 통증 민감 / 치과공포증 / 소아' },
    ],
    cta: { text: '무통마취 진료 예약', href: '/contact' },
  },
  'airflow-gbt': {
    summary: '에어플로우 GBT는 EMS 스위스 정품 장비와 8단계 표준 프로토콜로 진행하는 차세대 구강 위생 관리입니다. 치아·잇몸 손상 없이 플라크와 착색을 동시에 제거합니다. 긁어내지 않습니다, 씻어냅니다.',
    bullets: [
      { label: '가격', value: '15만원 ~' },
      { label: '장비', value: 'EMS 스위스 정품 (AIRFLOW Prophylaxis Master)' },
      { label: '파우더', value: '글리신 / 에리스리톨 (저자극)' },
      { label: '소요 시간', value: '60~90분 (8단계 풀 프로토콜)' },
      { label: '권장 주기', value: '3~6개월 정기 케어' },
      { label: '추천 대상', value: '교정 중·후 / 임플란트 / 착색' },
    ],
    cta: { text: 'GBT 에어플로우 예약', href: '/contact' },
  },
  'pediatric-ortho': {
    summary: '소아 교정장치는 RPE·근기능장치·페이스마스크·MRC·공간유지 6종 풀라인업으로 골격성 부정교합을 비수술로 잡는 7~10세 골든타임 1차 교정입니다. 영구치가 모두 나기 전에 골격을 잡아두면 평생이 달라집니다.',
    bullets: [
      { label: '가격', value: '150만원 ~ (장치별)' },
      { label: '골든타임', value: '7~10세 영구치 혼합치열기' },
      { label: '장치', value: 'RPE·근기능·페이스마스크·MRC·공간유지' },
      { label: '소요 기간', value: '6~12개월 (1차 교정)' },
      { label: '검진 주기', value: '월 1회 정기 점검' },
      { label: '추천 대상', value: '주걱턱 / 구호흡 / 손가락 빨기' },
    ],
    cta: { text: '소아 교정 골든타임 상담', href: '/contact' },
  },
  'pediatric': {
    summary: '소아치과는 치과공포증 의사가 설계한 어린이 진료 시스템입니다. TSD(Tell-Show-Do)·웃음가스·수면치료까지 협조도 3단계 맞춤 + 4단계 무통마취 기본. 아이의 첫 치과, 평생을 결정합니다.',
    bullets: [
      { label: '가격', value: '진료 항목별 별도 적용' },
      { label: '대상 연령', value: '만 0~12세' },
      { label: '협조도 1단계', value: 'TSD 행동 유도' },
      { label: '협조도 2단계', value: '웃음가스 (N2O)' },
      { label: '협조도 3단계', value: '수면치료 시스템' },
      { label: '예방', value: '불소 도포·실런트 6개월 권장' },
    ],
    cta: { text: '아이 첫 치과 친숙화 투어', href: '/contact' },
  },
  'cavity-endo-crown': {
    summary: '충치·신경치료·크라운은 Q-ray 형광 진단 + 4단계 무통마취 + 보존 우선 원칙으로 진행합니다. C0~C4 정밀 분류로 과잉 진료 없이, 놓치지도 않습니다. 한 번 깎은 치아는 돌아오지 않습니다.',
    bullets: [
      { label: '레진', value: '7만원 ~' },
      { label: '인레이', value: '25만원 ~' },
      { label: '크라운', value: '35만원 ~' },
      { label: '진단', value: 'Q-ray 형광 + C0~C4 정밀 분류' },
      { label: '치료 원칙', value: '보존 우선 (남길 수 있다면 남깁니다)' },
      { label: '신경치료', value: '6단계 표준 프로토콜' },
    ],
    cta: { text: 'Q-ray 정밀 충치 진단 예약', href: '/contact' },
  },
  'perio': {
    summary: '치주치료는 잇몸병 5단계 정밀 진단 + 에어플로우(GBT) 연계 + SRP·치주수술·골재생술 통합 시스템입니다. 3·6개월 맞춤 리콜로 평생 유지 관리. 치아를 잃는 1순위, 잇몸병입니다.',
    bullets: [
      { label: '가격', value: '비급여 5만원 ~ (보험 일부 적용)' },
      { label: '1단계', value: 'SRP (스케일링·치근활택)' },
      { label: '2단계', value: 'GBT 페리오플로우' },
      { label: '3단계', value: '치주수술' },
      { label: '4단계', value: '골재생술 (중증)' },
      { label: '리콜', value: '3·6개월 정기 관리 (흡연자 더 짧게)' },
    ],
    cta: { text: '잇몸 정밀 진단 예약', href: '/contact' },
  },
  'whitening': {
    summary: '전문가 미백은 1·2·3회 패키지(15/30/40만원) 시스템입니다. 잇몸 보호제 + 고농도 안전 적용 + VITA Shade 정량 측정. 결혼·면접·이벤트 직전 60분 케어. 깎지 않습니다, 톤만 밝힙니다.',
    bullets: [
      { label: '1회 패키지', value: '15만원' },
      { label: '2회 패키지', value: '30만원' },
      { label: '3회 패키지', value: '40만원' },
      { label: '소요 시간', value: '회당 60분' },
      { label: '측정', value: 'VITA Shade 정량 (시술 전후 비교)' },
      { label: '주의', value: '시술 후 48시간 컬러푸드 자제' },
    ],
    cta: { text: '미백 패키지 상담', href: '/contact' },
  },
  'icon-resin': {
    summary: '아이콘 레진은 DMG ICON 독일 정품 침투형 레진으로, 교정 후 흰 반점·초기 우식·소아 변색까지 마취·삭제 없이 60분 한 번에 해결합니다. 깎지 않고, 반점만 지웁니다.',
    bullets: [
      { label: '가격', value: '25만원 ~' },
      { label: '소요 시간', value: '60분 1회 완료' },
      { label: '마취', value: '불필요 (무통)' },
      { label: '치아 삭제', value: '없음' },
      { label: '재료', value: 'DMG ICON 독일 정품' },
      { label: '추천 대상', value: '교정 후 흰 반점 / 초기 우식 / 소아' },
    ],
    cta: { text: '아이콘 레진 상담', href: '/contact' },
  },
  'qray': {
    summary: 'Q-ray 형광 충치 진단은 QLF 정량 형광 기술 기반의 차세대 진단 시스템으로, 방사선 0입니다. 초기 우식·플라크·교정 탈회까지 가시화. 보이지 않는 충치를 빛으로 봅니다.',
    bullets: [
      { label: '가격', value: '진단 패키지 포함' },
      { label: '방사선', value: '0 (405nm 청색광)' },
      { label: '진단 항목', value: '초기 우식 / 플라크 / 교정 탈회' },
      { label: '비교 촬영', value: '6개월 정량 추적' },
      { label: '추천 대상', value: '소아·임산부 / 교정 중 / 정기 검진' },
      { label: '소요 시간', value: '5~10분' },
    ],
    cta: { text: 'Q-ray 형광 진단 받기', href: '/contact' },
  },
  'prosthetic': {
    summary: '보철(크라운·브릿지·인레이)은 원내 D.LAB + iTero 5D 스캔 + CAD/CAM 정밀 밀링 시스템으로 제작합니다. 지르코니아·PFM·하이브리드 풀라인업. 잘 만든 보철은 평생을 갑니다.',
    bullets: [
      { label: '인레이', value: '25만원 ~' },
      { label: '크라운', value: '35만원 ~' },
      { label: '재료', value: '지르코니아 / PFM / 하이브리드' },
      { label: '제작', value: '원내 D.LAB iTero 5D + CAD/CAM' },
      { label: '소요 기간', value: '2~3회 내원 (1~2주)' },
      { label: '추천 대상', value: '신경치료 후 / 파절 / 큰 충전물 교체' },
    ],
    cta: { text: '보철 상담 예약', href: '/contact' },
  },
  'in-house-lab': {
    summary: '원내 디지털 기공실 D.LAB은 iTero 5D + CAD/CAM + 3D 프린터 + 신터링 퍼니스를 갖춘 환자 입에서 즉시 색상·교합을 조정 가능한 원내 기공실입니다. 외주 불일치 0. 보철의 정밀함은 기공실에서 결정됩니다.',
    bullets: [
      { label: '장비', value: 'iTero 5D + CAD/CAM + 3D 프린터' },
      { label: '신터링', value: '원내 퍼니스 (외주 0)' },
      { label: '조정', value: '환자 입에서 즉시 색상·교합' },
      { label: '소요 기간', value: '당일 임시 보철 가능' },
      { label: '강점', value: '외주 불일치 0 / 정밀도 ↑' },
      { label: '적용', value: '크라운·브릿지·인레이·라미네이트' },
    ],
    cta: { text: 'D.LAB 보철 상담', href: '/contact' },
  },
  'prevention': {
    summary: '예방치과는 GBT 에어플로우 + Q-ray 형광 진단 + 3·6·12개월 맞춤 리콜로 평생 자연치를 만드는 365일 관리 시스템입니다. 가장 좋은 치료는 치료가 없는 것.',
    bullets: [
      { label: '가격', value: '15만원 ~ (검진 패키지)' },
      { label: '핵심 장비', value: 'Q-ray 형광 진단 + GBT 에어플로우' },
      { label: '불소 도포', value: '6개월 권장' },
      { label: '실런트', value: '소아 영구치 맞춤 적용' },
      { label: '리콜 주기', value: '3·6·12개월 맞춤' },
      { label: '추천 대상', value: '전 연령 / 교정·임플란트 환자' },
    ],
    cta: { text: '365 예방 검진 예약', href: '/contact' },
  },
  'aesthetic': {
    summary: '심미치료는 라미네이트·미백·아이콘·심미보철·교정의 통합 심미 디자인 시스템입니다. iTero 5D 시뮬레이션으로 결과를 미리 확인하고, 얼굴 비례까지 고려한 맞춤 설계. 예쁜 치아가 아닌, 예쁜 미소.',
    bullets: [
      { label: '가격', value: '치료 항목별 별도 적용' },
      { label: '시뮬레이션', value: 'iTero 5D 디지털 미소 디자인' },
      { label: '통합 진료', value: '라미네이트 / 미백 / 아이콘 / 교정' },
      { label: '분석', value: '미소 사진 + 얼굴 비례' },
      { label: '추천 대상', value: '결혼·취업 / 콤플렉스 해소 / 종합 개선' },
      { label: '상담', value: '대표원장 직접 디자인' },
    ],
    cta: { text: '심미 디자인 상담', href: '/contact' },
  },
  'conservative': {
    summary: '보존치료는 확대경 + Q-ray + 러버댐 + 4단계 무통마취로 자연치를 살리는 가장 정확한 방법입니다. 레진 7만원부터, 정직한 가격. 가능한 한, 남깁니다.',
    bullets: [
      { label: '레진', value: '7만원 ~' },
      { label: '핵심 장비', value: '확대경 + Q-ray + 러버댐' },
      { label: '진단', value: 'Q-ray 형광 정밀 분류' },
      { label: '치료 원칙', value: '보존 우선 (자연치 최대 보존)' },
      { label: '마취', value: '4단계 무통마취 기본' },
      { label: '추천 대상', value: '초기·중기 충치 / 신경치료 회피 가능' },
    ],
    cta: { text: '보존치료 정밀 진단', href: '/contact' },
  },
}

/**
 * 슬러그로 TLDR 데이터 가져오기 (없으면 null)
 */
export const tldrFor = (slug: string): TldrEntry | null => TLDR_DATA[slug] || null
