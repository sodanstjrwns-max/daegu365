import { Hono } from 'hono'
import {
  renderer, SITE,
  medicalProcedureSchema, physicianSchema, videoObjectSchema, articleSchema, caseStudySchema,
  dentistSchema, breadcrumbSchema, howToSchema, speakableSchema
} from './renderer'
import type { Bindings } from './lib/types'
import {
  hashPassword, verifyPassword, setSession, getSession, clearSession,
  setAdmin, isAdmin, clearAdmin
} from './lib/auth'
import { buildOgSvg, ogUrl, type OgType } from './lib/og'
import { renderOgPng } from './lib/og-png'

// Pages
import { HomePage } from './pages/home'
import { MissionPage } from './pages/mission'
import { DoctorsListPage, DoctorDetailPage } from './pages/doctors'
import { TreatmentsListPage, TreatmentDetailPage } from './pages/treatments'
import { ImplantTreatmentPage, PROCESS as IMPLANT_PROCESS } from './pages/treatments-implant'
import { ImplantGeneralTreatmentPage } from './pages/treatments-implant-general'
import { LamineerTreatmentPage, PROCESS as LAMINEER_PROCESS } from './pages/treatments-lamineer'
import { OrthoTreatmentPage, PROCESS as ORTHO_PROCESS } from './pages/treatments-ortho'
import { SleepTherapyTreatmentPage } from './pages/treatments-sleep'
import { PainlessAnesthesiaTreatmentPage } from './pages/treatments-anesthesia'
import { AirflowGBTTreatmentPage } from './pages/treatments-airflow'
import { PediatricOrthoTreatmentPage } from './pages/treatments-pediatric-ortho'
import { PediatricTreatmentPage } from './pages/treatments-pediatric'
import { CavityTreatmentPage } from './pages/treatments-cavity'
import { PerioTreatmentPage, PROCESS as PERIO_PROCESS } from './pages/treatments-perio'
import { WhiteningTreatmentPage, PROCESS as WHITENING_PROCESS } from './pages/treatments-whitening'
import { IconTreatmentPage } from './pages/treatments-icon'
import { QrayTreatmentPage } from './pages/treatments-qray'
import { ProstheticTreatmentPage } from './pages/treatments-prosthetic'
import { InhouseLabPage } from './pages/treatments-inhouse-lab'
import { PreventionTreatmentPage } from './pages/treatments-prevention'
import { AestheticTreatmentPage } from './pages/treatments-aesthetic'
import { ConservativeTreatmentPage } from './pages/treatments-conservative'
import { BeforeAfterListPage, BeforeAfterDetailPage } from './pages/beforeafter'
import { BlogListPage, BlogDetailPage } from './pages/blog'
import {
  NoticeListPage, NoticeDetailPage,
  DictionaryListPage, DictionaryDetailPage,
  FAQPage, DirectionsPage, HoursPage
} from './pages/misc'
import { FeesPage } from './pages/fees'
import { PlayHubPage } from './pages/play'
import { PlayDefensePage } from './pages/play-defense'
import { PlayBtiPage } from './pages/play-bti'
import { PlayRushPage } from './pages/play-rush'
import { SignupPage, LoginPage, AdminLoginPage } from './pages/auth'
import { Navbar, Footer } from './components/Layout'
import {
  AdminDashboard, AdminMembersPage,
  AdminBAListPage, AdminBAFormPage,
  AdminBlogListPage, AdminBlogFormPage,
  AdminNoticesListPage, AdminNoticeFormPage,
  AdminFeesPage,
  AdminSeoGuidePage,
  AdminConsultationsPage
} from './pages/admin'

const app = new Hono<{ Bindings: Bindings }>()
app.use(renderer)

// ============ Helpers ============
async function getAdminPassword(DB: D1Database): Promise<string> {
  const r = await DB.prepare("SELECT value FROM settings WHERE key='admin_password'").first<{ value: string }>()
  return r?.value || 'daegu365!admin'
}

// ============ MedicalProcedure 메타데이터 (17개 진료 슬러그) ============
// AEO 핵심: AI 답변 엔진이 "대구 임플란트", "투명교정 비용" 등에 인용할 구조화 데이터
const PROCEDURE_META: Record<string, {
  name: string
  description: string
  bodyLocation?: string
  procedureType?: string
  preparation?: string
  followup?: string
  howPerformed?: string
  indication?: string[]
  cost?: string
}> = {
  'implant': {
    name: '수면임플란트',
    description: '의식하 진정(IV Sedation) 하에 진행하는 임플란트 시술. 4단계 무통마취와 디지털 가이드 수술을 결합해 치과공포증 환자도 편안하게 받을 수 있는 수면임플란트입니다. 메가젠·오스템·스트라우만 5종 픽스쳐, 픽스쳐 5년·상부보철 평생 보증.',
    bodyLocation: '구강 / 상하악골',
    procedureType: 'SurgicalProcedure',
    preparation: 'CT·파노라마 정밀 진단, 골밀도 평가, 전신 건강 상태 체크',
    followup: '시술 직후 익일 내원, 1주·1개월·3개월·6개월 정기 점검, 평생 보증 리콜',
    howPerformed: '의식하 진정(IV Sedation) → 4단계 무통마취 → 디지털 가이드 식립 → 7~12주 골유착 대기 → 상부 보철 장착',
    indication: ['치아 결손 1개 이상', '브릿지·틀니로 불편하신 분', '치과공포증으로 시술이 어려웠던 분', '뼈가 부족해 식립이 거절되었던 분'],
    cost: '120만원~'
  },
  'implant-general': {
    name: '임플란트',
    description: '대구365치과 일반 임플란트. 픽스처 + 맞춤기둥 + 지르코니아 크라운이 모두 포함된 패키지 가격(1개 100~180만원)으로 정찰제 운영. 메가젠 ST·오스템 BA·메가젠 BD·오스템 SOI·스트라우만 앤서지 5종 픽스처, 디지털 가이드 수술, 4단계 무통마취. 픽스처 5년·상부보철 평생 보증.',
    bodyLocation: '구강 / 상하악골',
    procedureType: 'SurgicalProcedure',
    preparation: 'CBCT·파노라마 정밀 진단, 골밀도 평가, 전신 건강 상태 체크',
    followup: '시술 직후 익일 내원, 1주·1개월·3개월·6개월 정기 점검, 평생 보증 리콜',
    howPerformed: '4단계 무통마취 → 디지털 가이드 식립 → 7~24주 골유착 대기 → 맞춤기둥+지르코니아 크라운 장착',
    indication: ['치아 결손 1~소수개', '브릿지·틀니 대신 자연치 회복을 원하시는 분', '합리적 정찰제 패키지를 선호하시는 분', '평생 보증·정기 관리가 필요하신 분'],
    cost: '100~180만원 (1개, 패키지)'
  },
  'lamineer': {
    name: 'VINIQUE 라미네이트',
    description: '0.3mm 미세 보철 VINIQUE 프리미엄 라미네이트. Standard(나노 하이브리드 213MPa) / Premium(글라스 세라믹 510MPa) 2-Tier 라인업. 자연치 삭제를 최소화하고, 원내 디지털 기공실(D.LAB)에서 즉시 색상·교합 조정. 결혼·면접·이벤트 직전에도 가능한 심미 보철.',
    bodyLocation: '치아 전치부',
    procedureType: 'TherapeuticProcedure',
    preparation: 'iTero 5D 스캔, 미소선 분석, 셰이드 매칭, 디지털 시뮬레이션',
    followup: '장착 후 1주·3개월·1년 점검, 무삭제 라미네이트는 분리 가능',
    howPerformed: '디지털 미소 디자인 → 0.3mm 미세 삭제 → iTero 디지털 인상 → 원내 D.LAB 제작 → 즉시 가봉·조정 → 본접착',
    indication: ['치아 변색·착색이 심하신 분', '치아 모양·크기·간격이 고민이신 분', '교정 후 미세 정렬을 원하시는 분', '결혼·면접 등 단기간 결과를 원하시는 분'],
    cost: '60만원~'
  },
  'ortho': {
    name: '인비절라인 투명교정',
    description: 'iTero 5D 디지털 스캔 기반 인비절라인 투명교정. ClinCheck 시뮬레이션으로 결과를 미리 확인하고, 투명·탈착식 얼라이너로 일상에 자유로움. 식사·양치 그대로, 보이지 않는 교정.',
    bodyLocation: '구강 / 치열궁',
    procedureType: 'TherapeuticProcedure',
    preparation: 'iTero 5D 스캔, ClinCheck 시뮬레이션, 치주·보존 협진 검토',
    followup: '4~6주 간격 정기 점검, 교정 종료 후 유지 장치 24개월 이상 권장',
    howPerformed: 'iTero 디지털 스캔 → ClinCheck 시뮬레이션 → 단계별 얼라이너 제작 → 2주마다 교체 → 평균 12~18개월',
    indication: ['덧니·치아 비뚤어짐이 신경 쓰이는 분', '심미를 중시하는 직업·성인', '브라켓 교정에 부담이 큰 분', '교정 결과를 미리 보고 결정하고 싶은 분'],
    cost: '450만원~'
  },
  'sleep-therapy': {
    name: '수면치료 시스템',
    description: '의식하 진정(IV Sedation) + 4단계 무통마취 + 4지표 실시간 모니터링. 치과공포증 의사가 직접 설계한 수면치료 시스템. 시술 중 환자분은 꿈결처럼 편안하시며, 시술 후엔 통증 기억이 거의 없습니다.',
    bodyLocation: '구강 전반',
    procedureType: 'TherapeuticProcedure',
    preparation: '8시간 금식, 동행자 필수, 전신 건강 상태 체크, 약물 알레르기 확인',
    followup: '시술 직후 회복실 1시간 모니터링, 익일 케어 콜',
    howPerformed: '사전 상담 → 정맥 진정제 투여 → 4지표 실시간 모니터링(심박·산소포화도·혈압·호흡) → 시술 → 회복 → 익일 케어',
    indication: ['치과공포증·외상 후 트라우마가 있으신 분', '구역 반사가 심한 분', '장시간 시술이 필요한 임플란트·발치', '소아·장애인 등 협조도가 낮은 환자'],
    cost: '시술 항목별 별도 적용'
  },
  'painless-anesthesia': {
    name: '4단계 무통마취',
    description: '가글마취 → 도포마취 → 컴퓨터 제어 무통마취기(iject BTS) → 본마취. 모든 진료에 기본 적용되는 추가 비용 없는 4단계 프로토콜. 바늘이 들어가는 그 순간을 없앱니다.',
    bodyLocation: '구강',
    procedureType: 'TherapeuticProcedure',
    preparation: '특별한 준비 불필요',
    followup: '시술 후 마취 풀림 1~2시간 내 식사 가능',
    howPerformed: '1단계 가글마취(점막 1차 둔감화) → 2단계 도포마취(주사 부위 표면 마취) → 3단계 iject BTS 컴퓨터 제어(0.005mL/sec 초저속 주입) → 4단계 본마취',
    indication: ['주사 통증에 민감한 모든 환자', '치과공포증 환자', '소아 환자', '바늘 자체에 거부감이 있는 분'],
    cost: '추가 비용 없음 (모든 진료 기본 포함)'
  },
  'airflow-gbt': {
    name: '에어플로우 (GBT)',
    description: 'EMS 스위스 정품 장비, GBT(Guided Biofilm Therapy) 8단계 표준 프로토콜. 치아·잇몸 손상 없이 플라크와 착색을 동시에 제거하는 차세대 구강 위생 관리. 긁어내지 않습니다, 씻어냅니다.',
    bodyLocation: '치아 표면 / 잇몸',
    procedureType: 'PreventiveProcedure',
    preparation: '특별한 준비 불필요',
    followup: '3개월·6개월 정기 GBT 케어 권장',
    howPerformed: '바이오필름 가시화 → 동기 부여 → 글리신/에리스리톨 파우더 분사 → 잇몸 위 바이오필름 제거 → 잇몸 아래 페리오플로우 → 잔여 치석 PIEZON → 결과 확인 → 정기 리콜',
    indication: ['교정 중·교정 후 관리', '임플란트 주변 위생', '착색·니코틴 스테인 제거', '잇몸병 초기 관리', '정기 검진 모든 환자'],
    cost: '15만원~'
  },
  'pediatric-ortho': {
    name: '소아 교정장치',
    description: 'RPE·근기능장치·페이스마스크·MRC·공간유지 6종 풀라인업. 골격성 부정교합을 비수술로 잡는 7~10세 골든타임 1차 교정. 영구치가 모두 나기 전에 골격을 잡아두면 평생이 달라집니다.',
    bodyLocation: '소아 구강 / 악골',
    procedureType: 'TherapeuticProcedure',
    preparation: '소아 X-ray, 손목골 평가, 부모 동반 상담',
    followup: '월 1회 정기 점검, 1차 교정 후 영구치 정렬 시 2차 교정 검토',
    howPerformed: '발달 단계 평가 → 골격성 vs 치성 진단 → 장치 선택(RPE·근기능·MRC 등) → 6~12개월 1차 교정 → 모니터링',
    indication: ['7~10세 영구치 혼합치열기', '주걱턱·돌출입 골격성 문제', '구호흡·이갈이·코골이', '치열 부족 공간', '구강 습관(손가락 빨기 등)'],
    cost: '150만원~'
  },
  'pediatric': {
    name: '소아치과',
    description: '치과공포증 의사가 설계한 어린이 진료. TSD(Tell-Show-Do)·웃음가스까지 협조도 3단계 맞춤 시스템 + 4단계 무통마취 기본 적용. 아이의 첫 치과, 평생을 결정합니다.',
    bodyLocation: '소아 구강',
    procedureType: 'TherapeuticProcedure',
    preparation: '진료 전 친숙화(클리닉 투어), 부모 사전 동의',
    followup: '3개월 정기 검진, 불소 도포 6개월 권장',
    howPerformed: '협조도 평가 → TSD 행동 유도 → 필요 시 웃음가스(N2O) → 협조 어려울 때 분할 단계 진료 → 불소 도포·실런트 마무리',
    indication: ['만 0~12세 모든 어린이', '치과공포증·울음·발버둥', '특수 아동(자폐·장애)', '구강 습관 교정', '예방 관리'],
    cost: '진료 항목별 별도 적용'
  },
  'cavity-endo-crown': {
    name: '충치·신경치료·크라운',
    description: 'Q-ray 형광 진단 + 4단계 무통마취 + 보존 우선 원칙. C0~C4 정밀 분류로 과잉 진료 없이, 놓치지도 않습니다. 신경치료 6단계·크라운 3종 풀라인업. 한 번 깎은 치아는 돌아오지 않습니다.',
    bodyLocation: '치아',
    procedureType: 'TherapeuticProcedure',
    preparation: 'X-ray, Q-ray 형광 진단, 치수 활력 검사',
    followup: '레진·인레이 1주 후 점검, 신경치료 후 6개월 정기 검진',
    howPerformed: 'Q-ray 진단 → C분류 → C0~C1: 불소·관찰 / C2: 레진·인레이 / C3: 신경치료 후 크라운 / C4: 발치 검토',
    indication: ['치아 시린 증상', '음식 씹을 때 통증', '검진 시 발견된 충치', '기존 충전물 변색·파절'],
    cost: '레진 7만원~ / 인레이 25만원~ / 크라운 35만원~'
  },
  'perio': {
    name: '치주치료',
    description: '잇몸병 5단계 정밀 진단 + 에어플로우(GBT) 연계 + SRP·치주수술·골재생술 통합. 3·6개월 맞춤 리콜로 평생 유지 관리. 치아를 잃는 1순위, 잇몸병입니다.',
    bodyLocation: '잇몸 / 치주조직',
    procedureType: 'TherapeuticProcedure',
    preparation: '치주낭 측정, X-ray, 박테리아 검사(필요 시)',
    followup: '3·6개월 정기 GBT 리콜, 흡연자는 더 짧은 주기 권장',
    howPerformed: '치주낭 평가 → 1단계 SRP(스케일링·치근활택) → 2단계 GBT 페리오플로우 → 3단계 치주수술 → 4단계 골재생술(중증) → 5단계 유지 관리',
    indication: ['칫솔질 시 출혈', '잇몸 부음·고름', '치아 흔들림', '구취', '40대 이상 정기 검진'],
    cost: '비급여 5만원~ (보험 일부 적용)'
  },
  'whitening': {
    name: '전문가 미백',
    description: '1·2·3회 패키지 (15만원/30만원/40만원). 잇몸 보호제 + 고농도 안전 적용 + VITA Shade 정량 측정. 결혼·면접·이벤트 직전 60분 케어. 깎지 않습니다, 톤만 밝힙니다.',
    bodyLocation: '치아 전치부',
    procedureType: 'TherapeuticProcedure',
    preparation: '치아 표면 상태 점검, 시린이 여부 확인, VITA Shade 측정',
    followup: '시술 후 48시간 컬러푸드 자제, 6개월~1년 후 부스터 권장',
    howPerformed: '셰이드 측정 → 잇몸 보호제 도포 → 미백제 적용 → 광원 활성화(Zoom·LED) → 60분 1회 → 결과 확인',
    indication: ['커피·차·와인으로 인한 착색', '나이로 인한 자연 변색', '결혼·면접 등 이벤트 직전', '셀프 미백 효과 미흡'],
    cost: '15만원/30만원/40만원'
  },
  'icon-resin': {
    name: '아이콘 레진 (Icon)',
    description: 'DMG ICON 독일 정품 침투형 레진. 교정 후 흰 반점·초기 우식·소아 변색까지 마취·삭제 없이 60분 한 번에. 깎지 않고, 반점만 지웁니다.',
    bodyLocation: '치아 전치부',
    procedureType: 'TherapeuticProcedure',
    preparation: '특별한 준비 불필요, 마취 불필요',
    followup: '시술 후 즉시 일상 복귀, 6개월·1년 점검',
    howPerformed: '치아 표면 청소 → 산성 에칭(반점 표면 미세 개방) → 건조 → ICON 레진 침투 → 광중합 → 폴리싱',
    indication: ['교정 후 잔여 흰 반점', '소아·청소년 초기 우식', '에나멜 형성부전 변색', '마취가 어려운 환자'],
    cost: '25만원~'
  },
  'qray': {
    name: 'Q-ray 형광 충치 진단',
    description: 'QLF 정량 형광 기술, 방사선 0의 차세대 진단 시스템. 초기 우식·플라크·교정 탈회까지 가시화. 정기 검진 기본 포함. 보이지 않는 충치를 빛으로 봅니다.',
    bodyLocation: '치아',
    procedureType: 'DiagnosticProcedure',
    preparation: '치아 표면 가벼운 닦음 외 특별한 준비 불필요',
    followup: '6개월 정기 비교 촬영',
    howPerformed: '405nm 청색광 조사 → 형광 변화 측정 → 디지털 영상 기록 → 우식·플라크·탈회 정량 분석',
    indication: ['초기 우식 진단', '교정 중 탈회 모니터링', '소아·임산부(방사선 회피)', '정기 검진 기본'],
    cost: '진단 패키지 포함'
  },
  'prosthetic': {
    name: '보철 (크라운·브릿지·인레이)',
    description: '원내 디지털 기공실(D.LAB) + iTero 5D 스캔 + CAD/CAM 정밀 밀링. 지르코니아·PFM·하이브리드 인레이 풀라인업. 잘 만든 보철은 평생을 갑니다.',
    bodyLocation: '치아',
    procedureType: 'TherapeuticProcedure',
    preparation: '전치부 색상 매칭, 교합 분석, 디지털 인상',
    followup: '장착 후 1주 점검, 6개월·1년 정기 검진',
    howPerformed: '치아 형성 → iTero 5D 디지털 인상 → CAD 설계 → CAM 밀링 → 신터링 → 색상·교합 조정 → 본접착',
    indication: ['신경치료 후 보강', '치아 파절·균열', '큰 충전물 교체', '치아 결손 브릿지'],
    cost: '인레이 25만원~ / 크라운 35만원~'
  },
  'in-house-lab': {
    name: '원내 디지털 기공실 D.LAB',
    description: 'iTero 5D + CAD/CAM + 3D 프린터 + 신터링 퍼니스. 환자 입에서 즉시 색상·교합 조정 가능한 원내 기공실. 외주 불일치 0. 보철의 정밀함은 기공실에서 결정됩니다.',
    bodyLocation: '치아 보철',
    procedureType: 'TherapeuticProcedure',
    preparation: '디지털 인상 채득',
    followup: '당일 내 가봉 조정 가능',
    howPerformed: 'iTero 디지털 인상 → CAD 설계 → CAM 밀링/3D 프린팅 → 신터링 → 즉시 색상·교합 조정 → 본접착',
    indication: ['외주 보철 일정 부담이 큰 분', '색상·교합이 정밀해야 하는 전치부', '당일 임시 보철 필요'],
    cost: '진료 항목별 별도 적용'
  },
  'prevention': {
    name: '예방치과',
    description: 'GBT 에어플로우 + Q-ray 형광 진단 + 3·6·12개월 맞춤 리콜. 평생 자연치를 만드는 365일 관리 시스템. 가장 좋은 치료는 치료가 없는 것.',
    bodyLocation: '구강 전반',
    procedureType: 'PreventiveProcedure',
    preparation: '특별한 준비 불필요',
    followup: '3·6·12개월 맞춤 정기 리콜',
    howPerformed: 'Q-ray 정밀 진단 → GBT 에어플로우 케어 → 불소 도포 → 실런트(소아) → 맞춤 양치법 코칭 → 정기 리콜',
    indication: ['모든 연령 정기 검진', '교정 중·교정 후 관리', '임플란트 환자 평생 관리', '소아 충치 예방'],
    cost: '15만원~ (검진 패키지)'
  },
  'aesthetic': {
    name: '심미치료',
    description: '라미네이트·미백·아이콘·심미보철·교정의 통합 심미 디자인. iTero 5D 시뮬레이션으로 결과를 미리 확인. 얼굴 비례까지 고려한 맞춤 설계. 예쁜 치아가 아닌, 예쁜 미소.',
    bodyLocation: '치아 전치부 / 미소선',
    procedureType: 'TherapeuticProcedure',
    preparation: 'iTero 5D 스캔, 미소 사진 분석, 디지털 시뮬레이션',
    followup: '치료별 정기 점검 적용',
    howPerformed: '미소 분석 → 디지털 시뮬레이션 → 환자 동의 → 라미네이트·미백·교정 통합 진행',
    indication: ['결혼·취업·이벤트 준비', '오랜 콤플렉스 해소', '치아 색·모양·정렬 종합 개선'],
    cost: '치료 항목별 별도 적용'
  },
  'conservative': {
    name: '보존치료',
    description: '확대경 + Q-ray + 러버댐 + 4단계 무통마취. 자연치를 살리는 가장 정확한 방법. 레진 7만원부터, 정직한 가격. 가능한 한, 남깁니다.',
    bodyLocation: '치아',
    procedureType: 'TherapeuticProcedure',
    preparation: '진단·X-ray',
    followup: '1주 후 점검, 6개월 정기 검진',
    howPerformed: 'Q-ray 정밀 진단 → 4단계 무통마취 → 러버댐 격리 → 확대경 시야 → 미세 우식 제거 → 레진/인레이 충전',
    indication: ['초기·중기 충치', '기존 충전물 교체', '치아 파절 일부 보존 가능', '신경치료 회피 가능 케이스'],
    cost: '레진 7만원~'
  }
}

/** 슬러그로 진료 페이지 빵부스러기 만들기 */
const treatmentBreadcrumb = (slug: string, name: string) => [
  { name: '홈', url: '/' },
  { name: '진료안내', url: '/treatments' },
  { name, url: `/treatments/${slug}` }
]

// ============ 진료별 의료 검수 전문의 매핑 (reviewedBy · YMYL 신뢰 신호) ============
// 각 진료를 전공이 일치하는 전문의가 검수 — 실제 DB doctors 자격 기반 (검증 가능 사실)
const REVIEWERS: Record<string, { name: string; slug: string; position: string }> = {
  'kim-seongju':   { name: '김성주', slug: 'kim-seongju',  position: '대표원장 · 통합치의학과 전문의' },
  'jung-jaeheon':  { name: '정재헌', slug: 'jung-jaeheon', position: '통합진료센터장 · 치과보존과 전문의' },
  'kim-sangwon':   { name: '김상원', slug: 'kim-sangwon',  position: '자연치아살리기 센터장 · 치과보존과/통합치의학과 전문의' },
  'choi-hyejung':  { name: '최혜정', slug: 'choi-hyejung', position: '비니크 센터장 · 치과보존과 전문의' },
  'kim-jinduk':    { name: '김진덕', slug: 'kim-jinduk',   position: '치과교정과 전문의' },
  'han-jieun':     { name: '한지은', slug: 'han-jieun',    position: '소아치과 전문의 · 통합치의학과 전문의' },
}
// 진료 슬러그 → 검수 담당 전문의 (전공 일치). 미지정 시 대표원장 검수.
const PROCEDURE_REVIEWER: Record<string, string> = {
  'implant': 'kim-seongju', 'implant-general': 'kim-seongju', 'sleep-therapy': 'kim-seongju',
  'painless-anesthesia': 'kim-seongju', 'general': 'kim-seongju',
  'lamineer': 'choi-hyejung', 'vinique': 'choi-hyejung', 'aesthetic': 'choi-hyejung',
  'cavity-endo-crown': 'kim-sangwon', 'conservative': 'kim-sangwon',
  'icon-resin': 'jung-jaeheon', 'prosthetic': 'jung-jaeheon', 'in-house-lab': 'jung-jaeheon',
  'ortho': 'kim-jinduk', 'pediatric-ortho': 'kim-jinduk',
  'pediatric': 'han-jieun',
  'perio': 'kim-seongju', 'airflow-gbt': 'kim-seongju', 'qray': 'kim-seongju', 'prevention': 'kim-seongju',
}
const reviewerFor = (slug: string) => REVIEWERS[PROCEDURE_REVIEWER[slug] || 'kim-seongju']

/** 슬러그로 MedicalProcedure 스키마 가져오기 */
const procedureSchemaFor = (slug: string) => {
  const meta = PROCEDURE_META[slug]
  if (!meta) return null
  return medicalProcedureSchema({ slug, ...meta, reviewedBy: reviewerFor(slug) })
}

// ============ HowTo 스키마용 진료 절차(PROCESS) 데이터 ============
// 각 진료 페이지에서 export 한 PROCESS 배열을 그대로 재사용 (텍스트 중복 방지)
// PROCESS 구조 2종 정규화: {step,title,desc} 또는 {step,name,desc}
const cleanStepText = (t: string) => (t || '').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
const normalizeSteps = (arr: any[]) =>
  (arr || [])
    .filter(s => (s?.title || s?.name) && s?.desc)
    .map(s => ({ name: cleanStepText(s.title || s.name), text: cleanStepText(s.desc) }))

const HOWTO_CONFIG: Record<string, { name: string, description: string, steps: any[], totalTime?: string }> = {
  'implant': {
    name: '수면 임플란트 진행 과정',
    description: '대구365치과의 디지털 가이드 수면 임플란트 단계별 절차',
    steps: IMPLANT_PROCESS, totalTime: 'P3M'
  },
  'ortho': {
    name: '인비절라인 투명교정 진행 과정',
    description: '대구365치과의 인비절라인 투명교정 단계별 절차',
    steps: ORTHO_PROCESS, totalTime: 'P12M'
  },
  'lamineer': {
    name: 'VINIQUE 라미네이트 진행 과정',
    description: '대구365치과의 디지털 스마일 라미네이트 단계별 절차',
    steps: LAMINEER_PROCESS, totalTime: 'P2W'
  },
  'perio': {
    name: '잇몸치료(치주치료) 진행 과정',
    description: '대구365치과의 단계별 잇몸치료 절차',
    steps: PERIO_PROCESS, totalTime: 'P2M'
  },
  'whitening': {
    name: '치아미백 진행 과정',
    description: '대구365치과의 전문 치아미백 단계별 절차',
    steps: WHITENING_PROCESS, totalTime: 'P1W'
  },
}

/** 슬러그로 HowTo 스키마 가져오기 (PROCESS 단계가 정의된 진료만) */
const howToSchemaFor = (slug: string) => {
  const cfg = HOWTO_CONFIG[slug]
  if (!cfg) return null
  const steps = normalizeSteps(cfg.steps)
  if (steps.length < 2) return null
  return howToSchema({ slug, name: cfg.name, description: cfg.description, steps, totalTime: cfg.totalTime })
}

// ============ 원장 인터뷰 영상 메타 ============
const DOCTOR_INTERVIEW_DESC: Record<string, string> = {
  'kim-seongju': '대구365치과 김성주 대표원장의 진료 철학과 병원 비전 인터뷰. 치과공포증을 가졌던 의사가 설계한 두려움 없는 치과의 시작.',
  'jung-jaeheon': '대구365치과 정재헌 원장의 진료 철학과 전문 분야 인터뷰.',
  'kim-sangwon': '대구365치과 김상원 원장의 진료 철학과 전문 분야 인터뷰.',
  'choi-hyejung': '대구365치과 최혜정 원장의 진료 철학과 전문 분야 인터뷰.',
  'kim-jinduk': '대구365치과 김진덕 원장의 진료 철학과 전문 분야 인터뷰.',
  'han-jieun': '대구365치과 한지은 원장의 진료 철학과 전문 분야 인터뷰.',
}

// ============ SEO: trailing slash + alias redirect 미들웨어 ============
// GSC 에서 발견된 404 패턴 정리:
// 1) trailing slash (/dictionary/) → /dictionary 301 redirect
// 2) 흔한 alias 키워드 (/implant 등) → 정식 경로 301 redirect
// 3) 누락된 흔한 SEO 경로 (/about, /contact 등) → 적절한 페이지 301 redirect
const ALIAS_REDIRECTS: Record<string, string> = {
  // 퇴사 원장 프로필 → 의료진 목록 (2026-08 원장단 7인→6인 변동, 색인 잔존 대비)
  '/doctors/lee-seoyoung': '/doctors',
  // 진료 단축 경로 → /treatments/:slug
  '/implant': '/treatments/implant',
  '/implants': '/treatments/implant',
  '/sleep-implant': '/treatments/implant',
  '/ortho': '/treatments/ortho',
  '/orthodontics': '/treatments/ortho',
  '/invisalign': '/treatments/ortho',
  '/lamineer': '/treatments/lamineer',
  '/laminate': '/treatments/lamineer',
  '/veneer': '/treatments/lamineer',
  '/whitening': '/treatments/whitening',
  '/teeth-whitening': '/treatments/whitening',
  '/cavity': '/treatments/cavity-endo-crown',
  '/cavity-treatment': '/treatments/cavity-endo-crown',
  '/perio-treatment': '/treatments/perio',
  '/perio': '/treatments/perio',
  '/prosthetics': '/treatments/prosthetic',
  '/kids': '/treatments/pediatric',
  '/kids-dental': '/treatments/pediatric',
  '/pediatric': '/treatments/pediatric',
  // 자주 검색되는 페이지 → 정식 페이지
  '/about': '/mission',
  '/contact': '/directions',
  '/location': '/directions',
  '/map': '/directions',
  '/clinic': '/mission',
  '/reservation': '/directions',
  '/booking': '/directions',
  '/naver-booking': '/directions',
  '/event': '/notices',
  '/events': '/notices',
  '/promotion': '/notices',
  '/news': '/notices',
  '/columns': '/blog',
  '/column': '/blog',
  '/articles': '/blog',
  '/dictionary-list': '/dictionary',
  '/terms': '/dictionary',
  '/glossary': '/dictionary',
  // home alias
  '/index': '/',
  '/home': '/',
  '/main': '/',
}

app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const path = url.pathname
  // 0) SEO: pages.dev(중복 도메인) + www 서브도메인 → daegu365dc.kr 301 통합
  //    구글 중복 콘텐츠 신호 제거 — canonical 방어에 더해 리다이렉트로 확정 (A4 canonical 정합성)
  if (url.hostname.endsWith('.pages.dev') || url.hostname === 'www.daegu365dc.kr') {
    return c.redirect(`https://daegu365dc.kr${path}${url.search}`, 301)
  }
  // 1) trailing slash 제거 (단, 루트는 제외, 그리고 정적 파일은 제외)
  if (path.length > 1 && path.endsWith('/') && !path.startsWith('/static/') && !path.startsWith('/r2/') && !path.startsWith('/api/')) {
    const q = new URL(c.req.url).search
    return c.redirect(path.slice(0, -1) + q, 301)
  }
  // 2) alias redirect
  if (ALIAS_REDIRECTS[path]) {
    return c.redirect(ALIAS_REDIRECTS[path], 301)
  }
  return next()
})

// ============ SEO: 민감 페이지 X-Robots-Tag noindex ============
// robots.txt 차단 + noindex 헤더 이중 보호 (GSC "robots.txt에 의해 차단됨" 경고 정리)
app.use('*', async (c, next) => {
  await next()
  const path = new URL(c.req.url).pathname
  if (
    path.startsWith('/admin') ||
    path.startsWith('/login') ||
    path.startsWith('/signup') ||
    path.startsWith('/logout') ||
    path.startsWith('/api/admin') ||
    path === '/api/consultations'
  ) {
    c.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  // SEO Step1+3: 얇은 중복 페이지(용어사전 detail·지역 detail) 색인 철수
  // 허브(/dictionary, /regions)는 색인 유지 — trailing slash 로 detail 만 매칭
  // Step3: 리라이트 완료(indexable=1) 용어는 라우트에서 dictIndexable 플래그를 세트해 색인 복귀
  if (
    (path.startsWith('/dictionary/') || path.startsWith('/region/')) &&
    !c.get('dictIndexable' as never)
  ) {
    c.res.headers.set('X-Robots-Tag', 'noindex, follow')
  }
})

// ============ Public pages ============
app.get('/', async (c) => {
  // B1 리치 스키마 — 홈 노출 타입 8종+ (Dentist·WebSite·BreadcrumbList + 아래 추가)
  const [faqRows, doctorRows] = await Promise.all([
    c.env.DB.prepare('SELECT question, answer FROM faqs ORDER BY display_order LIMIT 10').all(),
    c.env.DB.prepare('SELECT * FROM doctors WHERE is_representative=1 LIMIT 1').all()
  ])
  const homeSchemas: any[] = []
  // FAQPage — 대표 FAQ 10개
  const faqs = (faqRows.results as any[]) || []
  if (faqs.length > 0) {
    homeSchemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      "mainEntity": faqs.map((f: any) => ({
        "@type": "Question", "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    })
  }
  // Physician — 대표원장 knowledge graph 연결
  const rep = (doctorRows.results as any[])?.[0]
  if (rep) homeSchemas.push(physicianSchema(rep))
  // MedicalWebPage — 페이지 성격 명시
  homeSchemas.push({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE.url}/#webpage`,
    "url": `${SITE.url}/`,
    "name": "대구365치과 — 대구 북구 치과 · 수면임플란트 · 인비절라인 전문",
    "about": { "@id": `${SITE.url}/#dentist` },
    "isPartOf": { "@id": `${SITE.url}/#website` },
    "inLanguage": "ko-KR",
    "medicalAudience": { "@type": "Patient" },
    "lastReviewed": "2026-08-18",
    "reviewedBy": { "@id": `${SITE.url}/doctors/kim-seongju#physician` }
  })
  // ItemList — 대표 진료 6종 carousel
  homeSchemas.push({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/#treatments-list`,
    "name": "대구365치과 대표 진료",
    "itemListElement": [
      { name: '수면임플란트', url: '/treatments/implant' },
      { name: 'VINIQUE 라미네이트', url: '/treatments/lamineer' },
      { name: '인비절라인 투명교정', url: '/treatments/ortho' },
      { name: '수면치료 시스템', url: '/treatments/sleep-therapy' },
      { name: '4단계 무통마취', url: '/treatments/painless-anesthesia' },
      { name: '에어플로우 GBT', url: '/treatments/airflow-gbt' }
    ].map((t, i) => ({
      "@type": "ListItem", "position": i + 1, "name": t.name, "url": `${SITE.url}${t.url}`
    }))
  })
  return c.render(<HomePage />, {
    title: '대구 북구 치과 · 수면임플란트 · 인비절라인 전문',
    description: '치과가 두려웠던 의사가 만든 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.',
    canonical: 'https://daegu365dc.kr/',
    ogImage: ogUrl.default('치과가 두려워도', '괜찮습니다.'),
    preloadImage: '/r2/images/hero/lobby-curve.webp',
    breadcrumb: [{ name: '홈', url: '/' }],
    jsonLd: homeSchemas
  })
})

app.get('/mission', (c) => c.render(<MissionPage />, {
  title: '병원 미션',
  description: '치과가 무서웠던 한 의사의 다짐 — 치과 진입의 허들을 낮추고 경험의 혁신을 이룩한다.',
  canonical: 'https://daegu365dc.kr/mission',
  ogImage: ogUrl.default('치과의 진입 허들을', '낮추는 일.'),
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '병원 미션', url: '/mission' }
  ]
}))

// --- Doctors ---
app.get('/doctors', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY is_representative DESC, display_order, id').all()
  const doctorRows = (r.results as any[]) || []
  // 개별 Physician 스키마들 (knowledge graph용)
  const physicianSchemas = doctorRows.map((d: any) => physicianSchema(d))
  // ItemList 스키마 — 의료진 명단 carousel
  const doctorsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/doctors#itemlist`,
    "name": "대구365치과 의료진",
    "description": "대구365치과 6인의 의료진 — 보존·소아·교정·보철·심미 분야 전문 협진",
    "url": `${SITE.url}/doctors`,
    "numberOfItems": doctorRows.length,
    "itemListElement": doctorRows.map((d: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE.url}/doctors/${d.slug}`,
      "name": `${d.name} ${d.position || ''}`.trim(),
      "item": { "@id": `${SITE.url}/doctors/${d.slug}#physician` }
    }))
  }
  return c.render(<DoctorsListPage doctors={r.results as any} />, {
    title: '의료진 소개',
    description: '대구365치과 6인의 의료진. 보존·소아·교정·보철·심미 각 분야 전문 협진.',
    canonical: 'https://daegu365dc.kr/doctors',
    ogImage: ogUrl.default('의료진 소개', '6인의 전문 협진.'),
    ogType: 'profile',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '의료진', url: '/doctors' }
    ],
    jsonLd: [doctorsItemListSchema, ...physicianSchemas]
  })
})

app.get('/doctors/:slug', async (c) => {
  const slug = c.req.param('slug')
  const doctor = await c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(slug).first<any>()
  if (!doctor) return c.notFound()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments').all()
  const cases = await c.env.DB.prepare('SELECT * FROM before_afters WHERE doctor_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
  // 다른 의료진 보기 — 현재 원장 제외한 전체 명단 (이름·슬러그·직책만)
  const allDoctors = await c.env.DB.prepare('SELECT slug, name, position, is_representative FROM doctors ORDER BY is_representative DESC, display_order ASC, id ASC').all()
  // 전문분야 첫 항목을 OG에 노출
  let specialty = ''
  try {
    const sp = JSON.parse(doctor.specialties || '[]')
    if (Array.isArray(sp) && sp.length) specialty = sp.slice(0, 3).join(' · ')
  } catch {}
  // 강화 Physician 스키마 + VideoObject(인터뷰 영상이 있을 때) + ProfilePage
  const schemas: any[] = [physicianSchema(doctor)]
  const videoDesc = DOCTOR_INTERVIEW_DESC[slug]
  if (videoDesc) {
    schemas.push(videoObjectSchema({
      doctorName: doctor.name,
      doctorPosition: doctor.position || '원장',
      doctorSlug: slug,
      description: videoDesc,
      uploadDate: doctor.created_at?.substring(0,10) || '2024-12-01'
    }))
  }
  // ProfilePage 스키마 (구글 Knowledge Graph용)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE.url}/doctors/${slug}#profilepage`,
    "mainEntity": { "@id": `${SITE.url}/doctors/${slug}#physician` },
    "about": { "@id": `${SITE.url}/doctors/${slug}#physician` },
    "isPartOf": { "@id": `${SITE.url}/#website` }
  })
  return c.render(
    <DoctorDetailPage doctor={doctor} treatments={treatments.results as any} cases={cases.results as any} allDoctors={allDoctors.results as any} />, {
      title: `${doctor.name} ${doctor.position}`,
      description: `${doctor.name} ${doctor.position}. ${(doctor.philosophy || '').replace(/[—ㅡ–]/g, ' ').replace(/\s{2,}/g, ' ').substring(0,140)}`,
      canonical: `https://daegu365dc.kr/doctors/${slug}`,
      ogImage: ogUrl.doctor(doctor.name, doctor.position || '', specialty || undefined),
      ogType: 'profile',
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '의료진', url: '/doctors' },
        { name: `${doctor.name} ${doctor.position || ''}`.trim(), url: `/doctors/${slug}` }
      ],
      jsonLd: schemas
    }
  )
})

// --- Treatments ---
app.get('/treatments', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  const treatmentRows = (r.results as any[]) || []
  // ItemList 스키마 — 전체 진료 과목 명시 (carousel rich result 후보)
  const treatmentsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/treatments#itemlist`,
    "name": "대구365치과 전체 진료 과목",
    "description": "수면임플란트·라미네이트·인비절라인 등 대구365치과 전체 진료",
    "url": `${SITE.url}/treatments`,
    "numberOfItems": treatmentRows.length,
    "itemListElement": treatmentRows.map((t: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE.url}/treatments/${t.slug}`,
      "name": t.name,
      "item": {
        "@type": "MedicalProcedure",
        "@id": `${SITE.url}/treatments/${t.slug}#procedure`,
        "name": t.name,
        "url": `${SITE.url}/treatments/${t.slug}`,
        ...(t.short_desc && { "description": t.short_desc })
      }
    }))
  }
  return c.render(<TreatmentsListPage treatments={r.results as any} />, {
    title: '진료 안내',
    description: '대구365치과의 전체 진료 과목. 수면임플란트·라미네이트·인비절라인 3대 핵심 진료.',
    canonical: 'https://daegu365dc.kr/treatments',
    ogImage: ogUrl.default('진료 안내', '평생 가는 치료.'),
    breadcrumb: [
      { name: '홈', url: 'https://daegu365dc.kr/' },
      { name: '진료 안내', url: 'https://daegu365dc.kr/treatments' }
    ],
    jsonLd: treatmentsItemListSchema
  })
})

app.get('/treatments/:slug', async (c) => {
  const slug = c.req.param('slug')
  const treatment = await c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(slug).first<any>()
  if (!treatment) return c.notFound()
  await c.env.DB.prepare('UPDATE treatments SET view_count=view_count+1 WHERE id=?').bind(treatment.id).run()

  const faqs = await c.env.DB.prepare('SELECT * FROM faqs WHERE treatment_slug=? ORDER BY display_order, id').bind(slug).all()
  // Doctors who specialize
  // PPT 모바일 슬라이드 249 — vinique(특화진료>라미네이트) 페이지도 핵심진료 라미네이트와 동일 의료진(정재헌·최혜정) 노출
  const doctorMatchSlug = slug === 'vinique' ? 'lamineer' : slug
  const allDocs = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const doctors = (allDocs.results as any[]).filter(d => {
    try { return JSON.parse(d.specialties || '[]').includes(doctorMatchSlug) } catch { return false }
  })
  // 임플란트 페이지는 'implant' / 'implant-general' 케이스를 통합 노출
  const isImplantPage = (slug === 'implant' || slug === 'implant-general')
  const cases = isImplantPage
    ? await c.env.DB.prepare("SELECT * FROM before_afters WHERE treatment_slug IN ('implant','implant-general') AND is_published=1 ORDER BY id DESC LIMIT 6").all()
    : await c.env.DB.prepare('SELECT * FROM before_afters WHERE treatment_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
  const dictTerms = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category=? ORDER BY id LIMIT 20').bind(slug).all()

  // FAQPage schema
  const faqJsonLd = {
    "@context":"https://schema.org","@type":"FAQPage",
    "@id": `${SITE.url}/treatments/${slug}#faq`,
    "mainEntity": (faqs.results as any[]).map((f: any) => ({
      "@type":"Question","name":f.question,
      "acceptedAnswer":{"@type":"Answer","text":f.answer}
    }))
  }
  // MedicalProcedure 스키마 (AEO 핵심)
  const procSchema = procedureSchemaFor(slug)
  // HowTo 스키마 (절차형 진료만) — "어떻게 진행되나요" AI 질문 인용 강화
  const howTo = howToSchemaFor(slug)
  // Speakable 스키마 — 음성/AI가 우선 발췌할 핵심 영역 지정
  const speakable = speakableSchema({
    url: `${SITE.url}/treatments/${slug}`,
    cssSelectors: ['h1', '.tldr-answer', '.page-lead']
  })
  // 진료 페이지 공통 스키마 배열 (Procedure + FAQ + HowTo + Speakable)
  const treatmentSchemas: any[] = [
    ...(procSchema ? [procSchema] : []),
    faqJsonLd,
    ...(howTo ? [howTo] : []),
    speakable,
  ]
  // 진료 페이지 공통 빵부스러기
  const treatmentBC = treatmentBreadcrumb(slug, treatment.name)

  // 슬러그별 풀볼륨 전용 페이지 분기
  if (slug === 'implant') {
    return c.render(
      <ImplantTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `수면임플란트 — 잠든 사이, 평생 가는 임플란트 | 대구365치과`,
        description: `의식하 진정 + 4단계 무통마취 + 디지털 가이드 수술. 메가젠·오스템·스트라우만 5종 픽스쳐, 픽스쳐 5년·상부보철 평생 보증. 대구365치과 수면임플란트.`,
        canonical: `https://daegu365dc.kr/treatments/implant`,
        ogImage: ogUrl.treatment('수면임플란트', '잠든 사이, 평생 가는 임플란트', '임플란트'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'implant-general') {
    return c.render(
      <ImplantGeneralTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `임플란트 — 검증된 표준, 합리적 선택 | 대구365치과`,
        description: `픽스처+맞춤기둥+지르코니아 크라운 포함 패키지 100~180만원(1개 기준). 메가젠·오스템·스트라우만 5종 픽스처, 디지털 가이드 수술, 픽스처 5년·상부보철 평생 보증. 대구365치과 임플란트.`,
        canonical: `https://daegu365dc.kr/treatments/implant-general`,
        ogImage: ogUrl.treatment('임플란트', '검증된 표준, 합리적 선택', '임플란트'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'lamineer') {
    return c.render(
      <LamineerTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `VINIQUE 라미네이트 — 자연을 닮은 미세 보철 | 대구365치과`,
        description: `0.3mm 미세 보철, VINIQUE 라미네이트 Standard(213MPa)/Premium(510MPa) 2-Tier 라인업. 자연치 삭제 최소화, In-house D.LAB 디지털 보철. 대구365치과 VINIQUE 라미네이트.`,
        canonical: `https://daegu365dc.kr/treatments/lamineer`,
        ogImage: ogUrl.treatment('VINIQUE 라미네이트', '자연을 닮은 0.3mm 미세 보철', '심미보철'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'ortho') {
    return c.render(
      <OrthoTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `인비절라인 — 보이지 않는 투명교정 | 대구365치과`,
        description: `iTero 5D 디지털 스캔 기반 인비절라인. ClinCheck 시뮬레이션, 투명·탈착식 교정으로 일상에 자유로움. 대구365치과 투명교정.`,
        canonical: `https://daegu365dc.kr/treatments/ortho`,
        ogImage: ogUrl.treatment('인비절라인', '보이지 않는 투명교정', '교정'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'sleep-therapy') {
    return c.render(
      <SleepTherapyTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `수면치료 시스템 — 치과의 기억을 바꿔드립니다 | 대구365치과`,
        description: `의식하 진정(IV Sedation) + 4단계 무통마취 + 4지표 실시간 모니터링. 치과공포증 의사가 직접 설계한 수면치료 시스템. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/sleep-therapy`,
        ogImage: ogUrl.treatment('수면치료 시스템', '치과의 기억을 바꿔드립니다', '진정치료'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'painless-anesthesia') {
    return c.render(
      <PainlessAnesthesiaTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `4단계 무통마취 — 바늘이 들어가는 그 순간을 없애드립니다 | 대구365치과`,
        description: `가글마취 → 도포마취 → 컴퓨터 제어 무통마취기 → 본마취. 모든 진료에 기본 적용되는 추가 비용 없는 4단계 프로토콜. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/painless-anesthesia`,
        ogImage: ogUrl.treatment('4단계 무통마취', '바늘이 들어가는 그 순간을 없애드립니다', '마취'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'airflow-gbt') {
    return c.render(
      <AirflowGBTTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `에어플로우 (GBT) — 긁어내지 않습니다, 씻어냅니다 | 대구365치과`,
        description: `EMS 스위스 정품 장비, GBT 8단계 표준 프로토콜. 치아·잇몸 손상 없이 플라크와 착색을 동시에 제거하는 차세대 구강 위생 관리. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/airflow-gbt`,
        ogImage: ogUrl.treatment('에어플로우 GBT', '긁어내지 않습니다, 씻어냅니다', '구강위생'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'pediatric-ortho') {
    return c.render(
      <PediatricOrthoTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `소아 교정장치 — 7~10세 골든타임 | 대구365치과`,
        description: `RPE·근기능장치·페이스마스크·MRC·공간유지 6종 풀라인업. 골격성 부정교합을 비수술로 잡는 7~10세 골든타임 1차 교정. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/pediatric-ortho`,
        ogImage: ogUrl.treatment('소아 교정장치', '7~10세 골든타임 1차 교정', '소아교정'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'pediatric') {
    return c.render(
      <PediatricTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dictTerms={dictTerms.results as any}
      />, {
        title: `소아치과 — 아이의 첫 치과, 평생을 결정하는 한 번의 경험 | 대구365치과`,
        description: `치과공포증 의사가 설계한 어린이 진료. TSD·웃음가스까지 협조도 3단계 맞춤 시스템 + 4단계 무통마취 기본 적용. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/pediatric`,
        ogImage: ogUrl.treatment('소아치과', '아이의 첫 치과, 평생을 결정하는 한 번', '소아'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'cavity-endo-crown') {
    return c.render(
      <CavityTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `충치·신경치료·크라운 — 한 번 깎은 치아는 돌아오지 않습니다 | 대구365치과`,
        description: `Q-ray 형광 진단 + 4단계 무통마취 + 보존 우선 원칙. C0~C4 정밀 분류로 과잉 진료 없이, 놓치지도 않습니다. 신경치료 6단계·크라운 3종 풀라인업. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/cavity-endo-crown`,
        ogImage: ogUrl.treatment('충치·신경치료·크라운', '한 번 깎은 치아는 돌아오지 않습니다', '보존'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'perio') {
    return c.render(
      <PerioTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `치주치료 — 치아를 잃는 1순위, 잇몸병입니다 | 대구365치과`,
        description: `잇몸병 5단계 정밀 진단 + 에어플로우(GBT) 연계 + SRP·치주수술·골재생술 통합. 3·6개월 맞춤 리콜로 평생 유지 관리. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/perio`,
        ogImage: ogUrl.treatment('치주치료', '치아를 잃는 1순위, 잇몸병입니다', '치주'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'whitening') {
    return c.render(
      <WhiteningTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `전문가 미백 — 깎지 않습니다, 톤만 밝힙니다 | 대구365치과`,
        description: `1·2·3회 패키지 (15만원/30만원/40만원). 잇몸 보호제 + 고농도 안전 적용 + VITA Shade 정량 측정. 결혼·면접·이벤트 직전 60분 케어. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/whitening`,
        ogImage: ogUrl.treatment('전문가 미백', '깎지 않습니다, 톤만 밝힙니다', '심미'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'icon-resin') {
    return c.render(
      <IconTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `아이콘 레진 — 깎지 않고, 반점만 지웁니다 | 대구365치과`,
        description: `DMG ICON 독일 정품 침투형 레진. 교정 후 흰 반점·초기 우식·소아 변색까지 마취·삭제 없이 60분 한 번에. 25만원부터. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/icon-resin`,
        ogImage: ogUrl.treatment('아이콘 레진', '깎지 않고, 반점만 지웁니다', '심미'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'qray') {
    return c.render(
      <QrayTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `Q-ray 형광 충치 진단 — 보이지 않는 충치를 빛으로 봅니다 | 대구365치과`,
        description: `QLF 정량 형광 기술, 방사선 0의 차세대 진단 시스템. 초기 우식·플라크·교정 탈회까지 가시화. 정기 검진 기본 포함. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/qray`,
        ogImage: ogUrl.treatment('Q-ray 형광 진단', '보이지 않는 충치를 빛으로 봅니다', '진단'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'prosthetic') {
    return c.render(
      <ProstheticTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `보철 (크라운·브릿지·인레이) — 잘 만든 보철은 평생을 갑니다 | 대구365치과`,
        description: `원내 디지털 기공실(D.LAB) + iTero 5D 스캔 + CAD/CAM 정밀 밀링. 지르코니아·PFM·하이브리드 인레이 풀라인업. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/prosthetic`,
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'in-house-lab') {
    return c.render(
      <InhouseLabPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `원내 디지털 기공실 D.LAB — 보철의 정밀함은 기공실에서 결정됩니다 | 대구365치과`,
        description: `iTero 5D + CAD/CAM + 3D 프린터 + 신터링 퍼니스. 환자 입에서 즉시 색상·교합 조정 가능한 원내 기공실. 외주 불일치 0. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/in-house-lab`,
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'prevention') {
    return c.render(
      <PreventionTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `예방치과 — 가장 좋은 치료는 치료가 없는 것 | 대구365치과`,
        description: `GBT 에어플로우 + Q-ray 형광 진단 + 3·6·12개월 맞춤 리콜. 평생 자연치를 만드는 365일 관리 시스템. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/prevention`,
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'aesthetic') {
    return c.render(
      <AestheticTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `심미치료 — 예쁜 치아가 아닌, 예쁜 미소 | 대구365치과`,
        description: `라미네이트·미백·아이콘·심미보철·교정의 통합 심미 디자인. iTero 5D 시뮬레이션으로 결과를 미리 확인. 얼굴 비례까지 고려한 맞춤 설계. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/aesthetic`,
        ogImage: ogUrl.treatment('심미치료', '예쁜 치아가 아닌, 예쁜 미소', '심미'),
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  if (slug === 'conservative') {
    return c.render(
      <ConservativeTreatmentPage
        treatment={treatment}
        faqs={faqs.results as any}
        doctors={doctors}
        cases={cases.results as any}
        dict={dictTerms.results as any}
      />, {
        title: `보존치료 — 가능한 한, 남깁니다 | 대구365치과`,
        description: `확대경 + Q-ray + 러버댐 + 4단계 무통마취. 자연치를 살리는 가장 정확한 방법. 레진 7만원부터, 정직한 가격. 대구365치과.`,
        canonical: `https://daegu365dc.kr/treatments/conservative`,
        breadcrumb: treatmentBC,
        jsonLd: treatmentSchemas
      }
    )
  }

  return c.render(
    <TreatmentDetailPage
      treatment={treatment}
      faqs={faqs.results as any}
      doctors={doctors}
      cases={cases.results as any}
      dictTerms={dictTerms.results as any}
    />, {
      title: `${treatment.name} - ${treatment.tagline || ''}`,
      description: `${treatment.short_desc} — 대구365치과 ${treatment.name} 전문 진료.`,
      canonical: `https://daegu365dc.kr/treatments/${slug}`,
      breadcrumb: treatmentBC,
      jsonLd: treatmentSchemas
    }
  )
})

// --- Before/After ---
app.get('/before-after', async (c) => {
  const session = await getSession(c)
  const { group, doctor } = c.req.query()

  // 카테고리 그룹 → 슬러그 매핑 (페이지 컴포넌트의 TREATMENT_GROUPS와 동기화)
  // - 임플란트는 'implant'/'implant-general' 두 슬러그 케이스를 통합 노출
  // - 라미네이트는 'lamineer'/'vinique' 두 슬러그 통합 (legacy 호환)
  const GROUP_SLUGS: Record<string, string[]> = {
    'implant':           ['implant', 'implant-general'],
    'ortho':             ['ortho'],
    'lamineer':          ['lamineer', 'vinique'],
    'cavity-endo-crown': ['cavity-endo-crown'],
    'perio':             ['perio'],
    'pediatric':         ['pediatric'],
    'pediatric-ortho':   ['pediatric-ortho'],
    'whitening':         ['whitening'],
    'icon-resin':        ['icon-resin'],
    'prosthetic':        ['prosthetic'],
    'aesthetic':         ['aesthetic'],
    'conservative':      ['conservative'],
    'general':           ['general'],
  }

  const where: string[] = ['is_published=1']
  const binds: any[] = []
  if (group && GROUP_SLUGS[group]) {
    const slugs = GROUP_SLUGS[group]
    const placeholders = slugs.map(() => '?').join(',')
    where.push(`treatment_slug IN (${placeholders})`)
    binds.push(...slugs)
  }
  if (doctor) { where.push('doctor_slug=?'); binds.push(doctor) }
  const q = `SELECT * FROM before_afters WHERE ${where.join(' AND ')} ORDER BY id DESC`
  const items = await c.env.DB.prepare(q).bind(...binds).all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()

  const caseRows = (items.results as any[]) || []
  // ItemList 스키마 — 실제 케이스 명단 (group/doctor 필터 무관하게 현재 결과 노출)
  const beforeAfterItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/before-after#itemlist`,
    "name": "대구365치과 비포애프터 실제 치료 사례",
    "description": "수면임플란트·라미네이트·인비절라인 등 대구365치과의 검증된 치료 결과",
    "url": `${SITE.url}/before-after`,
    "numberOfItems": caseRows.length,
    "itemListElement": caseRows.slice(0, 60).map((c2: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE.url}/before-after/${c2.id}`,
      "name": c2.title || `${c2.treatment_slug || ''} 케이스`,
      "item": { "@id": `${SITE.url}/before-after/${c2.id}#case` }
    }))
  }
  return c.render(
    <BeforeAfterListPage
      items={items.results as any}
      doctors={doctors.results as any}
      treatments={treatments.results as any}
      filters={{ group, doctor }}
      isLoggedIn={!!session}
    />, {
      title: '비포애프터 — 실제 치료 사례',
      description: '대구365치과 실제 치료 사례. 수면임플란트, 라미네이트, 인비절라인 등 검증된 결과.',
      canonical: 'https://daegu365dc.kr/before-after',
      ogImage: ogUrl.beforeAfter('실제 치료 사례', '검증된 결과'),
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '비포애프터', url: '/before-after' }
      ],
      jsonLd: beforeAfterItemListSchema
    }
  )
})

app.get('/before-after/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  if (!id) return c.notFound()
  const item = await c.env.DB.prepare('SELECT * FROM before_afters WHERE id=? AND is_published=1').bind(id).first<any>()
  if (!item) return c.notFound()
  await c.env.DB.prepare('UPDATE before_afters SET view_count=view_count+1 WHERE id=?').bind(id).run()

  const [doctor, treatment] = await Promise.all([
    item.doctor_slug ? c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(item.doctor_slug).first<any>() : Promise.resolve(null),
    item.treatment_slug ? c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(item.treatment_slug).first<any>() : Promise.resolve(null),
  ])

  const session = await getSession(c)

  // SEO 메타 자동 빌더 — 키워드 강제 주입
  const treatmentLabel = treatment?.name || '치료'
  const doctorLabel = doctor?.name ? `${doctor.name} ${doctor.position || '원장'}` : '대구365치과 의료진'
  const regionLabel = item.region_dong || item.region_sigungu || '대구 북구'

  // description fallback 강화
  const autoDesc = item.meta_description
    || item.description?.substring(0, 155)
    || `${item.title} — ${treatmentLabel} ${item.treatment_period || ''} 치료 사례. ${doctorLabel} 진료. ${regionLabel} 대구365치과의 검증된 ${treatmentLabel} Before/After 실제 결과.`

  // keywords 자동 조합 (필수 5개 + 케이스별 변수)
  const baseKeywords = '임플란트,인비절라인,라미네이트,글로우네이트,치아교정,대구치과,대구365치과,침산동치과,북구치과'
  const autoKeywords = item.meta_keywords
    || `${treatmentLabel},${item.title},${doctorLabel},${regionLabel} ${treatmentLabel},대구 ${treatmentLabel},${baseKeywords}`

  // 이미지 alt 자동 빌더
  const beforeAlt = item.before_alt || `${item.title} Before — ${treatmentLabel} 치료 전 (${doctorLabel} · ${regionLabel} 대구365치과)`
  const afterAlt = item.after_alt || `${item.title} After — ${treatmentLabel} 치료 후 (${doctorLabel} · ${regionLabel} 대구365치과)`

  // OG 이미지: DB의 og_image > 비포 사진 > 자동 OG 생성
  const beforePhoto = item.intra_before_url || item.pano_before_url
  const afterPhoto = item.intra_after_url || item.pano_after_url
  const ogImage = item.og_image || beforePhoto || ogUrl.beforeAfter(item.title, treatment?.name || undefined, doctor?.name ? `${doctor.name} ${doctor.position || ''}`.trim() : undefined)

  // 인덱스 차단 옵션
  const robotsOverride = item.noindex ? 'noindex, nofollow' : undefined

  return c.render(
    <BeforeAfterDetailPage item={{...item, before_alt: beforeAlt, after_alt: afterAlt}} doctor={doctor} treatment={treatment} isLoggedIn={!!session} />, {
      title: `${item.title} · ${treatmentLabel} 치료사례 | ${doctorLabel}`,
      description: autoDesc,
      keywords: autoKeywords,
      canonical: `https://daegu365dc.kr/before-after/${id}`,
      ogImage,
      ogType: 'article',
      publishedTime: item.created_at,
      modifiedTime: item.updated_at || item.created_at,
      author: doctor?.name || '대구365치과',
      ...(robotsOverride && { robots: robotsOverride }),
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '비포애프터', url: '/before-after' },
        { name: item.title, url: `/before-after/${id}` }
      ],
      jsonLd: caseStudySchema({
        id,
        title: item.title,
        description: autoDesc,
        beforeImage: beforePhoto,
        afterImage: afterPhoto,
        beforeAlt,
        afterAlt,
        doctorName: doctor?.name,
        doctorSlug: doctor?.slug,
        treatmentName: treatment?.name,
        treatmentSlug: treatment?.slug,
        createdAt: item.created_at,
        updatedAt: item.updated_at || item.created_at
      })
    }
  )
})

// --- Blog ---
app.get('/blog', async (c) => {
  const posts = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE is_published=1 ORDER BY created_at DESC').all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors').all()
  return c.render(<BlogListPage posts={posts.results as any} doctors={doctors.results as any} />, {
    title: '블로그 · 의료진 칼럼',
    description: '대구365치과 의료진이 직접 쓰는 치과 칼럼과 건강 이야기.',
    canonical: 'https://daegu365dc.kr/blog',
    ogImage: ogUrl.default('의료진 칼럼', '직접 쓰는 치과 이야기.'),
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' }
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE.url}/blog#blog`,
      "name": "대구365치과 블로그",
      "description": "의료진이 직접 쓰는 치과 칼럼",
      "url": `${SITE.url}/blog`,
      "publisher": { "@id": `${SITE.url}/#dentist` },
      "inLanguage": "ko-KR",
      "blogPost": (posts.results as any[]).slice(0, 20).map((p: any) => ({
        "@type": "BlogPosting",
        "@id": `${SITE.url}/blog/${p.slug}#article`,
        "headline": p.title,
        "url": `${SITE.url}/blog/${p.slug}`,
        "datePublished": p.created_at,
        "dateModified": p.updated_at || p.created_at
      }))
    }
  })
})

app.get('/blog/:slug', async (c) => {
  const slug = c.req.param('slug')
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug=? AND is_published=1').bind(slug).first<any>()
  if (!post) return c.notFound()
  await c.env.DB.prepare('UPDATE blog_posts SET view_count=view_count+1 WHERE id=?').bind(post.id).run()

  const author = post.author_doctor_slug
    ? await c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(post.author_doctor_slug).first<any>()
    : null
  const related = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id!=? AND is_published=1 ORDER BY id DESC LIMIT 4').bind(post.id).all()

  // description fallback 3단계: meta_description > excerpt > 본문에서 자동 추출
  const stripHtml = (html: string) => (html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const bodyText = stripHtml(post.content || '')
  const autoDesc = post.meta_description
    || post.excerpt
    || bodyText.substring(0, 155)
    || `${post.title} — 대구365치과 ${author?.name || '의료진'} 칼럼. 임플란트·인비절라인·라미네이트·치아교정 전문.`

  // keywords 자동 조합 (필수 5개 + 작성자 + 카테고리)
  const baseKeywords = '임플란트,인비절라인,라미네이트,글로우네이트,치아교정,대구치과,대구365치과,침산동치과,북구치과'
  const autoKeywords = post.meta_keywords
    || `${post.title},${author?.name || '대구365치과'} ${author?.position || ''},${baseKeywords}`

  // OG 이미지 fallback
  const ogImage = post.og_image
    || post.thumbnail_url
    || ogUrl.blog(post.title, author?.name ? `${author.name} ${author.position || ''}`.trim() : undefined)

  const robotsOverride = post.noindex ? 'noindex, nofollow' : undefined

  // 본문 단어 수 (스키마용)
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length

  return c.render(<BlogDetailPage post={post} author={author} related={related.results as any} />, {
    title: post.title,
    description: autoDesc,
    keywords: autoKeywords,
    canonical: `https://daegu365dc.kr/blog/${slug}`,
    ogImage,
    ogType: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.updated_at || post.created_at,
    author: author?.name || '대구365치과',
    ...(robotsOverride && { robots: robotsOverride }),
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' },
      { name: post.title, url: `/blog/${slug}` }
    ],
    jsonLd: articleSchema({
      title: post.title,
      description: autoDesc,
      slug,
      authorName: author?.name,
      authorSlug: author?.slug,
      authorPosition: author?.position,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      image: ogImage,
      keywords: autoKeywords,
      wordCount,
      articleSection: '치과 의학정보'
    })
  })
})

// --- Notices ---
app.get('/notices', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM notices WHERE is_published=1 ORDER BY is_main DESC, id DESC').all()
  return c.render(<NoticeListPage notices={r.results as any} />, {
    title: '공지사항',
    canonical: 'https://daegu365dc.kr/notices',
    ogImage: ogUrl.default('공지사항', '대구365치과 안내.'),
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '공지사항', url: '/notices' }
    ]
  })
})

app.get('/notices/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const n = await c.env.DB.prepare('SELECT * FROM notices WHERE id=? AND is_published=1').bind(id).first<any>()
  if (!n) return c.notFound()
  await c.env.DB.prepare('UPDATE notices SET view_count=view_count+1 WHERE id=?').bind(id).run()
  return c.render(<NoticeDetailPage notice={n} />, {
    title: n.title, description: n.content?.replace(/<[^>]+>/g,'').substring(0,160),
    canonical: `https://daegu365dc.kr/notices/${id}`,
    ogImage: ogUrl.blog(n.title, '대구365치과'),
    ogType: 'article',
    publishedTime: n.created_at,
    modifiedTime: n.updated_at || n.created_at,
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '공지사항', url: '/notices' },
      { name: n.title, url: `/notices/${id}` }
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.url}/notices/${id}#article`,
      "headline": n.title,
      "description": n.content?.replace(/<[^>]+>/g, '').substring(0, 160),
      "datePublished": n.created_at,
      "dateModified": n.updated_at || n.created_at,
      "author": { "@id": `${SITE.url}/#dentist` },
      "publisher": { "@id": `${SITE.url}/#dentist` },
      "mainEntityOfPage": `${SITE.url}/notices/${id}`,
      "inLanguage": "ko-KR"
    }
  })
})

// --- Dictionary ---
app.get('/dictionary', async (c) => {
  const { q, category } = c.req.query()
  const where: string[] = []
  const binds: any[] = []
  if (q) { where.push('(term LIKE ? OR term_en LIKE ? OR short_desc LIKE ?)'); binds.push(`%${q}%`,`%${q}%`,`%${q}%`) }
  if (category) { where.push('category=?'); binds.push(category) }
  const sql = 'SELECT * FROM dictionary' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY term LIMIT 1000'
  const r = await c.env.DB.prepare(sql).bind(...binds).all()
  const dictRows = (r.results as any[]) || []
  // DefinedTermSet (기존 유지) + ItemList (신규 carousel rich result)
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE.url}/dictionary#termset`,
    "name": "대구365치과 치과 백과사전",
    "description": "치과 용어 500여 개를 담은 대구365치과 백과사전",
    "url": `${SITE.url}/dictionary`,
    "inLanguage": "ko-KR",
    "publisher": { "@id": `${SITE.url}/#dentist` },
    "hasDefinedTerm": dictRows.slice(0, 100).map((d: any) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE.url}/dictionary/${d.slug}#term`,
      "name": d.term,
      ...(d.term_en && { "alternateName": d.term_en }),
      "url": `${SITE.url}/dictionary/${d.slug}`
    }))
  }
  const dictItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/dictionary#itemlist`,
    "name": "대구365치과 백과사전 — 용어 목록",
    "url": `${SITE.url}/dictionary`,
    "numberOfItems": dictRows.length,
    "itemListElement": dictRows.slice(0, 100).map((d: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE.url}/dictionary/${d.slug}`,
      "name": d.term,
      "item": { "@id": `${SITE.url}/dictionary/${d.slug}#term` }
    }))
  }
  return c.render(<DictionaryListPage items={r.results as any} selectedCategory={category} query={q} />, {
    title: '치과 백과사전 · 500+ 용어',
    description: '치과 용어 500여 개를 담은 대구365치과 백과사전. 임플란트·교정·라미네이트 등 전문 용어 해설.',
    canonical: 'https://daegu365dc.kr/dictionary',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '치과 백과사전', url: '/dictionary' }
    ],
    jsonLd: [definedTermSetSchema, dictItemListSchema]
  })
})

app.get('/dictionary/:slug', async (c) => {
  const slug = c.req.param('slug')
  const entry = await c.env.DB.prepare('SELECT * FROM dictionary WHERE slug=?').bind(slug).first<any>()
  if (!entry) return c.notFound()
  await c.env.DB.prepare('UPDATE dictionary SET view_count=view_count+1 WHERE id=?').bind(entry.id).run()
  // SEO Step3: 리라이트 완료 용어(indexable=1)는 색인 복귀 — 미들웨어 noindex 헤더 제외
  const isIndexable = !!entry.indexable
  if (isIndexable) c.set('dictIndexable' as never, true as never)

  const relSlugs: string[] = (() => { try { return JSON.parse(entry.related_treatments || '[]') } catch { return [] } })()
  let relatedTreatments: any[] = []
  if (relSlugs.length) {
    const ph = relSlugs.map(() => '?').join(',')
    const rr = await c.env.DB.prepare(`SELECT * FROM treatments WHERE slug IN (${ph})`).bind(...relSlugs).all()
    relatedTreatments = rr.results as any[]
  }
  const relatedEntries = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category=? AND id!=? ORDER BY RANDOM() LIMIT 6').bind(entry.category, entry.id).all()

  // FAQ schema: related_treatments에 매핑되는 진료 FAQ 자동 주입 (rich result)
  // dictionary의 related_treatments → faqs.treatment_slug 매핑
  const dictFaqMap: Record<string, string> = {
    'prosthetics': 'prosthetic',
    'pediatrics': 'pediatric',
    'orthodontics': 'ortho',
    'periodontics': 'perio',
    'cavity': 'cavity-endo-crown',
    'endodontics': 'cavity-endo-crown',
    'cosmetic': 'aesthetic',
    'veneer': 'lamineer',
  }
  const mappedSlugs = relSlugs.map(s => dictFaqMap[s] || s)
  let dictFaqList: any[] = []
  if (mappedSlugs.length) {
    const ph = mappedSlugs.map(() => '?').join(',')
    try {
      const faqRes = await c.env.DB.prepare(
        `SELECT question, answer FROM faqs WHERE treatment_slug IN (${ph}) ORDER BY display_order, id LIMIT 6`
      ).bind(...mappedSlugs).all()
      dictFaqList = (faqRes.results as any[]) || []
    } catch { dictFaqList = [] }
  }

  const dictJsonLd: any[] = [{
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${SITE.url}/dictionary/${slug}#term`,
    "name": entry.term,
    ...(entry.term_en && { "alternateName": entry.term_en }),
    "description": entry.short_desc,
    "url": `${SITE.url}/dictionary/${slug}`,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "@id": `${SITE.url}/dictionary#termset`,
      "name": "대구365치과 치과 백과사전",
      "url": `${SITE.url}/dictionary`
    },
    "inLanguage": "ko-KR"
  }]
  // 용어 자체 FAQ(faq_json)를 우선 사용, 없으면 진료 FAQ를 fallback으로 사용
  let ownFaqs: { q: string, a: string }[] = []
  try {
    const parsed = JSON.parse(entry.faq_json || '[]')
    if (Array.isArray(parsed)) ownFaqs = parsed.filter((f: any) => f && f.q && f.a)
  } catch {}
  const faqForSchema = ownFaqs.length > 0
    ? ownFaqs.map(f => ({ name: f.q, text: f.a }))
    : dictFaqList.map((f: any) => ({ name: f.question, text: f.answer }))
  if (faqForSchema.length > 0) {
    dictJsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.url}/dictionary/${slug}#faq`,
      "mainEntity": faqForSchema.map((f) => ({
        "@type": "Question",
        "name": f.name,
        "acceptedAnswer": { "@type": "Answer", "text": f.text }
      }))
    })
  }

  // meta description: full_desc가 더 풍부하면 사용 (검색결과 스니펫 개선)
  const metaDesc = (entry.full_desc && entry.full_desc.length > entry.short_desc.length)
    ? entry.full_desc
    : entry.short_desc

  return c.render(<DictionaryDetailPage entry={entry} relatedTreatments={relatedTreatments} relatedEntries={relatedEntries.results as any} />, {
    title: `${entry.term} - 치과 용어사전`,
    description: metaDesc,
    // SEO Step3: indexable=1(리라이트 완료)만 색인 허용, 나머지는 noindex 유지
    robots: isIndexable ? undefined : 'noindex, follow',
    canonical: `https://daegu365dc.kr/dictionary/${slug}`,
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '치과 백과사전', url: '/dictionary' },
      { name: entry.term, url: `/dictionary/${slug}` }
    ],
    jsonLd: dictJsonLd
  })
})

// --- FAQ aggregate ---
app.get('/faq', async (c) => {
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  const faqs = await c.env.DB.prepare('SELECT * FROM faqs WHERE treatment_slug IS NOT NULL ORDER BY treatment_slug, display_order').all()
  const grouped: Record<string, any[]> = {}
  for (const f of faqs.results as any[]) {
    const k = f.treatment_slug
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(f)
  }
  return c.render(<FAQPage grouped={grouped} treatments={treatments.results as any} />, {
    title: '자주 묻는 질문 · 전체 FAQ',
    description: '진료 과목별 자주 묻는 질문 200개 이상. 대구365치과가 성심껏 답변드립니다.',
    canonical: 'https://daegu365dc.kr/faq',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '자주 묻는 질문', url: '/faq' }
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.url}/faq#faq`,
      "mainEntity": (faqs.results as any[]).slice(0, 100).map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  })
})

// --- Visitor info ---
app.get('/directions', (c) => {
  // Place + geo + openingHours 풀세팅 — 구글 지도 rich result + 음성검색 대응
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${SITE.url}/directions#place`,
    "name": SITE.name,
    "url": `${SITE.url}/directions`,
    "telephone": SITE.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.streetAddress,
      "addressLocality": SITE.addressLocality,
      "addressRegion": SITE.addressRegion,
      "postalCode": SITE.postalCode,
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE.lat,
      "longitude": SITE.lng
    },
    "hasMap": "https://map.kakao.com/?urlX=473870&urlY=1119810&urlLevel=3",
    "publicAccess": true,
    "smokingAllowed": false,
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Thursday"], "opens": "09:30", "closes": "21:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "09:30", "closes": "17:00" }
    ],
    "containedInPlace": {
      "@type": "Place",
      "name": "엠브로스퀘어",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "대구광역시 북구 침산동",
        "addressRegion": "대구광역시"
      }
    }
  }
  // TravelAction — 음성 검색 "어떻게 가요?" 대응
  const travelActionSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    "name": "대구365치과 오시는 길",
    "fromLocation": { "@type": "Place", "name": "대구 시내" },
    "toLocation": { "@id": `${SITE.url}/directions#place` },
    "description": "버스 정류장 엠브로스퀘어 바로 앞. 버스 다수 경유. 건물 내 무료 주차장 완비."
  }
  return c.render(<DirectionsPage />, {
    title: '오시는 길 · 내원 안내',
    description: '대구365치과 위치·주차·대중교통 안내. 대구광역시 북구 침산로 148 엠브로스퀘어 7층. 053-357-0365.',
    canonical: 'https://daegu365dc.kr/directions',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '오시는 길', url: '/directions' }
    ],
    jsonLd: [placeSchema, travelActionSchema]
  })
})
app.get('/hours', (c) => c.render(<HoursPage />, {
  title: '진료시간',
  description: '대구365치과 진료시간. 월·목 09:30~21:00 야간진료, 주말도 진료. 365일 연중 환자 곁에.',
  canonical: 'https://daegu365dc.kr/hours',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '진료시간', url: '/hours' }
  ]
}))
// fees 그룹 빌더 헬퍼 — DB에서 그룹별로 묶어 FeeGroup[] 반환
async function loadFeesGroups(DB: D1Database) {
  try {
    const r = await DB.prepare(
      `SELECT id, category, category_icon, group_note, name, price, note, is_highlight, is_published, sort_group, sort_order
       FROM fees
       WHERE is_published = 1
       ORDER BY sort_group ASC, sort_order ASC, id ASC`
    ).all<any>()
    const rows = r.results || []
    if (rows.length === 0) return []
    const groupMap = new Map<number, any>()
    for (const row of rows) {
      const key = row.sort_group
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          category: row.category,
          icon: row.category_icon || 'fa-tooth',
          groupNote: row.group_note || undefined,
          rows: []
        })
      }
      groupMap.get(key).rows.push({
        name: row.name,
        price: row.price,
        note: row.note || undefined,
        highlight: row.is_highlight === 1
      })
    }
    return Array.from(groupMap.values())
  } catch (e) {
    console.error('loadFeesGroups error', e)
    return []
  }
}

app.get('/fees', async (c) => {
  const groups = await loadFeesGroups(c.env.DB)
  return c.render(<FeesPage groups={groups} />, {
    title: '비용 안내 · 비급여 의료수가표',
    description: '대구365치과 비용 안내. 임플란트·인비절라인·라미네이트·치아교정·보철·소아치과 등 비급여 전 항목 투명 공개. 진료 전 정확한 비용을 안내드립니다.',
    canonical: 'https://daegu365dc.kr/fees',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '비용 안내', url: '/fees' }
    ]
  })
})

// --- 🎮 PLAY · 게임존 (서울비디치과 /games 벤치마킹 → 대구365 3종) ---
app.get('/play', (c) => c.render(<PlayHubPage />, {
  title: '🎮 플레이 · 대구365 게임존 | 치석 디펜스 · 치아BTI · 365 RUSH',
  description: '대구365치과가 만든 무료 미니게임 3종. 치석 디펜스(슈팅), 치아BTI(16유형 심리테스트), 365 RUSH(무한 러너)를 즐기고 점수 자랑하고 예약까지!',
  canonical: 'https://daegu365dc.kr/play',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '플레이', url: '/play' }
  ]
}))

app.get('/play/defense', (c) => c.render(<PlayDefensePage />, {
  title: '🛡️ 치석 디펜스 · 대구365 플레이 | 스케일러로 치석 격추!',
  description: '치석·세균·플라그를 스케일러로 격추하는 종스크롤 슈팅 게임. 90초 도전 모드. 대구365치과 무료 미니게임.',
  canonical: 'https://daegu365dc.kr/play/defense',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '플레이', url: '/play' },
    { name: '치석 디펜스', url: '/play/defense' }
  ]
}))

app.get('/play/bti', (c) => c.render(<PlayBtiPage />, {
  title: '🧬 치아BTI · 16가지 구강 유형 테스트 | 대구365 플레이',
  description: '12문항 2분이면 끝! 나의 구강 유형은? 16가지 타입과 맞춤 진료·원장 추천까지. 대구365치과 무료 심리테스트.',
  canonical: 'https://daegu365dc.kr/play/bti',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '플레이', url: '/play' },
    { name: '치아BTI', url: '/play/bti' }
  ]
}))

app.get('/play/rush', (c) => c.render(<PlayRushPage />, {
  title: '🏃 365 RUSH · 30초 러너 게임 | 대구365 플레이',
  description: '점프와 슬라이드로 충치·치석·사탕을 피해라! 30초 무한 러너 게임. 대구365치과 무료 미니게임.',
  canonical: 'https://daegu365dc.kr/play/rush',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '플레이', url: '/play' },
    { name: '365 RUSH', url: '/play/rush' }
  ]
}))

// --- Region SEO hub page (/regions) ---
app.get('/regions', async (c) => {
  const [regions, treatments] = await Promise.all([
    c.env.DB.prepare('SELECT slug, region_name, treatment_slug, h1, meta_description FROM region_seo ORDER BY region_name, treatment_slug').all(),
    c.env.DB.prepare('SELECT slug, name FROM treatments').all(),
  ])
  const tNameBySlug: Record<string, string> = {}
  ;(treatments.results as any[]).forEach((t: any) => { tNameBySlug[t.slug] = t.name })
  // group by region
  const byRegion: Record<string, any[]> = {}
  ;(regions.results as any[]).forEach((r: any) => {
    if (!byRegion[r.region_name]) byRegion[r.region_name] = []
    byRegion[r.region_name].push(r)
  })
  const breadcrumb = [
    { name: '홈', url: '/' },
    { name: '지역별 진료', url: '/regions' }
  ]
  // ItemList 스키마 — 지역별 진료 페이지 전체 목록을 구글에 명시 (siteLinks/rich result용)
  const regionRows = (regions.results as any[]) || []
  const regionsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/regions#itemlist`,
    "name": "대구 지역별 치과 진료 안내",
    "description": "대구 8개 자치구 × 진료별 랜딩 페이지 목록",
    "url": `${SITE.url}/regions`,
    "numberOfItems": regionRows.length,
    "itemListElement": regionRows.slice(0, 100).map((r: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE.url}/region/${r.slug}`,
      "name": r.h1 || r.title || `${r.region_name} ${r.treatment_slug || '진료'}`
    }))
  }
  return c.render(
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <div class="section-label mb-6">REGIONAL DENTISTRY</div>
          <h1 class="display text-4xl md:text-6xl font-light mb-6">대구 지역별 치과 진료 안내</h1>
          <p class="text-brown-700 max-w-3xl mx-auto text-lg leading-relaxed">
            대구 북구 침산동에 위치한 대구365치과는 대구 전역에서 환자분이 방문하시는 종합 치과입니다.
            북구·수성구·중구·동구·서구·남구·달서구·달성군을 비롯한 대구 8개 자치구에서 가까운 진료 안내를 확인하실 수 있습니다.
          </p>
        </div>
      </section>
      <section class="py-16 max-w-6xl mx-auto px-6">
        {Object.entries(byRegion).map(([region, items]) => (
          <div class="mb-12">
            <h2 class="display text-3xl font-medium mb-6 pb-3 border-b border-brown-200">{region}</h2>
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
      </section>
      <Footer />
    </>,
    {
      title: '대구 지역별 치과 진료 안내 · 대구365치과',
      description: '대구 북구·수성구·중구·동구·서구·남구·달서구·달성군 등 대구 전 지역에서 가까운 대구365치과 진료 안내. 임플란트·교정·라미네이트·미백 등 진료별 지역 정보.',
      canonical: 'https://daegu365dc.kr/regions',
      breadcrumb,
      // Dentist/Breadcrumb는 renderer.tsx에서 전역 자동 주입 → ItemList만 추가
      jsonLd: regionsItemListSchema
    }
  )
})

// --- Region SEO pages ---
app.get('/region/:slug', async (c) => {
  const slug = c.req.param('slug')
  const r = await c.env.DB.prepare('SELECT * FROM region_seo WHERE slug=?').bind(slug).first<any>()
  if (!r) return c.notFound()
  await c.env.DB.prepare('UPDATE region_seo SET view_count=view_count+1 WHERE id=?').bind(r.id).run()
  // FAQ schema 매핑: treatment_slug 변형 → faqs.treatment_slug 실제 값으로 매핑
  // faqs DB 실제 슬러그: aesthetic, cavity-endo-crown, conservative, general, implant,
  //   lamineer, ortho, pediatric, pediatric-ortho, perio, prosthetic, whitening,
  //   airflow-gbt, icon-resin, in-house-lab, painless-anesthesia, qray, sleep-therapy, vinique
  const faqMap: Record<string, string> = {
    // 임플란트 계열
    'implant': 'implant', 'implant-cost': 'implant', 'implant-review': 'implant',
    'implant-recommend': 'implant', 'implant-event': 'implant',
    'elderly-implant': 'implant', 'sleep-implant': 'sleep-therapy',
    // 교정 계열
    'ortho': 'ortho', 'ortho-cost': 'ortho',
    'kids-ortho': 'pediatric-ortho', 'childrens-ortho': 'pediatric-ortho',
    // 라미네이트 계열
    'lamineer': 'lamineer', 'lamineer-cost': 'lamineer',
    'veneer-front': 'lamineer', 'lamineer-extra': 'lamineer',
    'lamineer-new': 'lamineer', 'cosmetic-dental': 'aesthetic',
    // 충치/신경/일반 치료
    'cavity': 'cavity-endo-crown', 'cavity-new': 'cavity-endo-crown',
    'cavity-treatment': 'cavity-endo-crown', 'nerve-treatment': 'cavity-endo-crown',
    // 미백/예방
    'whitening': 'whitening', 'whitening-new': 'whitening',
    'prevention': 'prevention', 'wisdom': 'general', 'wisdom-tooth': 'general',
    // 보철/잇몸/턱관절
    'prosthesis': 'prosthetic', 'denture': 'prosthetic',
    'perio': 'perio', 'gum-graft': 'perio', 'tmj': 'general',
    // 소아/임산부
    'kids': 'pediatric', 'kids-dental': 'pediatric', 'childbirth-dental': 'pediatric',
    // 운영/시스템 키워드 (배치7 신규)
    'evening': 'general', 'weekend': 'general', 'emergency': 'general',
  }
  // 매핑 테이블에 없는 슬러그도 자체 시도 (정확히 일치할 수도 있음)
  const faqTreatmentSlug = r.treatment_slug ? (faqMap[r.treatment_slug] || r.treatment_slug) : null
  const [treatments, doctors, mainTreatment, relatedRegions, relatedDictRows, regionFaqs] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all(),
    c.env.DB.prepare('SELECT * FROM doctors WHERE is_representative=1 OR display_order<=3').all(),
    r.treatment_slug
      ? c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(r.treatment_slug).first<any>()
      : Promise.resolve(null),
    c.env.DB.prepare('SELECT slug, region_name, treatment_slug, h1 FROM region_seo WHERE slug != ? ORDER BY (treatment_slug = ?) DESC, RANDOM() LIMIT 8')
      .bind(slug, r.treatment_slug || '').all(),
    r.treatment_slug
      ? c.env.DB.prepare(`SELECT slug, term, short_desc FROM dictionary WHERE category=? OR related_treatments LIKE ? ORDER BY view_count DESC LIMIT 6`)
          .bind(r.treatment_slug, `%${r.treatment_slug}%`).all()
      : Promise.resolve({ results: [] }),
    faqTreatmentSlug
      ? c.env.DB.prepare('SELECT question, answer FROM faqs WHERE treatment_slug=? ORDER BY display_order, id LIMIT 8')
          .bind(faqTreatmentSlug).all()
      : Promise.resolve({ results: [] }),
  ])
  const relatedDict = (relatedDictRows as any).results || []
  const regionFaqList = ((regionFaqs as any).results || []) as any[]
  const breadcrumb = [
    { name: '홈', url: '/' },
    { name: '지역별 진료', url: '/regions' },
    ...(r.region_name ? [{ name: r.region_name, url: `/regions/${encodeURIComponent(r.region_name)}` }] : []),
    { name: r.h1 || r.title, url: `/region/${slug}` }
  ]
  // Schema.org JSON-LD package
  const procedureSchema = mainTreatment ? {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${SITE.url}/region/${slug}#procedure`,
    "name": `${r.region_name} ${mainTreatment.name}`,
    "description": r.meta_description,
    "url": `${SITE.url}/region/${slug}`,
    "performer": { "@id": `${SITE.url}/#dentist` },
    "availableService": { "@id": `${SITE.url}/#dentist` },
    "bodyLocation": "치아 및 구강",
  } : null
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE.url}/region/${slug}#webpage`,
    "url": `${SITE.url}/region/${slug}`,
    "name": r.title,
    "description": r.meta_description,
    "inLanguage": "ko-KR",
    "isPartOf": { "@id": `${SITE.url}/#website` },
    "about": { "@id": `${SITE.url}/#dentist` },
    "primaryImageOfPage": `${SITE.url}/api/og.png?type=default`,
    "specialty": "Dentistry",
    "audience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": r.region_name
      }
    }
  }
  // Dentist/Breadcrumb는 renderer.tsx에서 전역 자동 주입 → 페이지 고유 스키마만 추가
  const jsonLd: any[] = [webPageSchema]
  if (procedureSchema) jsonLd.push(procedureSchema)
  // FAQPage schema — 해당 진료의 FAQ 8개 자동 주입 (Google rich result 노출)
  if (regionFaqList.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.url}/region/${slug}#faq`,
      "mainEntity": regionFaqList.map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    })
  }
  return c.render(
    <RegionSEOInline
      r={r}
      treatments={treatments.results as any}
      doctors={doctors.results as any}
      mainTreatment={mainTreatment}
      relatedRegions={(relatedRegions as any).results || []}
      relatedDict={relatedDict}
      regionFaqs={regionFaqList}
    />,
    {
      title: r.title, description: r.meta_description,
      robots: 'noindex, follow', // SEO Step1: 얇은 페이지 색인 철수 (X-Robots-Tag 이중 방어)
      canonical: `https://daegu365dc.kr/region/${slug}`,
      breadcrumb,
      jsonLd,
      schemaType: 'MedicalWebPage'
    }
  )
})

// ============ Dynamic OG Image Endpoints ============
// /api/og.svg — SVG 버전 (트위터·디스코드·검색엔진용)
app.get('/api/og.svg', (c) => {
  const url = new URL(c.req.url)
  const type = (url.searchParams.get('type') || 'default') as OgType
  const svg = buildOgSvg(type, url.searchParams)
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
      'X-Content-Type-Options': 'nosniff',
    }
  })
})

// /api/og.png — PNG 버전 (카카오톡·페이스북·네이버 미리보기용, Satori + resvg-wasm)
// R2 영구 캐시: og-cache/{type}/{hash}.png
app.get('/api/og.png', async (c) => {
  const url = new URL(c.req.url)
  const type = (url.searchParams.get('type') || 'default') as OgType
  try {
    const { body, cacheHit } = await renderOgPng(type, url.searchParams, c.env.R2 as any)
    return new Response(body as any, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-OG-Cache': cacheHit ? 'HIT' : 'MISS',
      }
    })
  } catch (err: any) {
    // PNG 실패 시 SVG 폴백 (디버그를 위해 에러 헤더에 메시지)
    const svg = buildOgSvg(type, url.searchParams)
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'X-OG-Fallback': 'svg',
        'X-OG-Error': String(err?.message || err).slice(0, 200),
      }
    })
  }
})

// ============ R2 Asset Serving ============
// 인테리어 사진, 영상 등 대용량 정적 자산을 R2에서 서빙
// 업로드 후 사용 예: <img src="/r2/clinic/lobby/lobby-pano.jpg">
// (/static/* 은 _routes.json 에서 Worker 우회 정적 자산 처리되므로 별도 prefix /r2/ 사용)
app.get('/r2/*', async (c) => {
  const url = new URL(c.req.url)
  // '/r2/' 다음 경로를 R2 key 로 사용
  const key = decodeURIComponent(url.pathname.replace(/^\/r2\//, ''))
  if (!key) return c.notFound()

  const object = await c.env.R2.get(key)
  if (!object) return c.notFound()

  const headers = new Headers()
  // R2 메타데이터 우선, 없으면 확장자로 추정
  const ct = object.httpMetadata?.contentType || (() => {
    const ext = key.split('.').pop()?.toLowerCase()
    return ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
      : ext === 'png' ? 'image/png'
      : ext === 'webp' ? 'image/webp'
      : ext === 'avif' ? 'image/avif'
      : ext === 'gif' ? 'image/gif'
      : ext === 'svg' ? 'image/svg+xml'
      : ext === 'mp4' ? 'video/mp4'
      : ext === 'webm' ? 'video/webm'
      : ext === 'mov' ? 'video/quicktime'
      : ext === 'pdf' ? 'application/pdf'
      : 'application/octet-stream'
  })()
  headers.set('Content-Type', ct)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable') // 1년 캐시
  headers.set('ETag', object.httpEtag)
  if (object.size) headers.set('Content-Length', String(object.size))

  return new Response(object.body, { headers })
})

// ============ Admin Upload API ============
// 관리자 전용 — multipart 파일을 R2에 업로드 후 /r2/* URL 반환
app.post('/api/admin/upload', async (c) => {
  if (!(await isAdmin(c))) return c.json({ error: 'unauthorized' }, 401)

  const form = await c.req.parseBody()
  const file = form['file'] as File | undefined
  // 호환: type | kind 둘 다 허용
  const kindRaw = String(form['kind'] || form['type'] || 'misc')
  if (!file || typeof file === 'string') return c.json({ ok: false, error: 'no file' }, 400)

  // 파일 검증
  const MAX = 20 * 1024 * 1024 // 20MB
  if (file.size > MAX) return c.json({ ok: false, error: 'file too large (max 20MB)' }, 400)
  const ct = file.type || 'application/octet-stream'
  if (!/^image\/(jpeg|png|webp|avif|gif)$/i.test(ct)) {
    return c.json({ ok: false, error: 'only image/jpeg|png|webp|avif|gif allowed' }, 400)
  }

  // 키 생성: uploads/{kind}/{yyyymm}/{rand}.{ext}
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const now = new Date()
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  const rand = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`).replace(/-/g, '').slice(0, 16)
  // before-after | ba | blog | notice | misc 허용
  const norm = kindRaw === 'before-after' ? 'ba' : kindRaw
  const safeKind = /^(ba|blog|notice|misc)$/.test(norm) ? norm : 'misc'
  const key = `uploads/${safeKind}/${ym}/${rand}.${ext}`

  const buf = await file.arrayBuffer()
  await c.env.R2.put(key, buf, {
    httpMetadata: { contentType: ct, cacheControl: 'public, max-age=31536000, immutable' }
  })

  return c.json({
    ok: true,
    url: `/r2/${key}`,
    key,
    size: file.size,
    contentType: ct
  })
})

// 의료진 인터뷰 영상 (R2의 한글 파일명 → 영문 슬러그로 매핑)
const DOCTOR_VIDEO_KEYS: Record<string, string> = {
  'jung-jaeheon': '정재헌_인터뷰_master.mp4',
  'kim-sangwon':  '김상원_인터뷰_master.mp4',
  'choi-hyejung': '최혜정_인터뷰_master.mp4',
  'kim-jinduk':   '김진덕_인터뷰_master.mp4',
  'han-jieun':    '한지은_인터뷰_master.mp4',
  'kim-seongju':  '김성주_인터뷰_master.mp4',
}

app.get('/api/videos/:slug', async (c) => {
  const slug = c.req.param('slug')
  const filename = DOCTOR_VIDEO_KEYS[slug]
  if (!filename) return c.notFound()

  const object = await c.env.R2.get(filename)
  if (!object) return c.notFound()

  // Range 요청 처리 (영상 시킹·이어보기)
  const range = c.req.header('range')
  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range)
    if (match) {
      const start = parseInt(match[1], 10)
      const end = match[2] ? parseInt(match[2], 10) : object.size - 1
      const ranged = await c.env.R2.get(filename, {
        range: { offset: start, length: end - start + 1 }
      })
      if (ranged) {
        const h = new Headers()
        h.set('Content-Type', object.httpMetadata?.contentType || 'video/mp4')
        h.set('Cache-Control', 'public, max-age=31536000, immutable')
        h.set('Accept-Ranges', 'bytes')
        h.set('Content-Range', `bytes ${start}-${end}/${object.size}`)
        h.set('Content-Length', String(end - start + 1))
        return new Response(ranged.body, { status: 206, headers: h })
      }
    }
  }

  const headers = new Headers()
  headers.set('Content-Type', object.httpMetadata?.contentType || 'video/mp4')
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('ETag', object.httpEtag)
  headers.set('Accept-Ranges', 'bytes')
  if (object.size) headers.set('Content-Length', String(object.size))

  return new Response(object.body, { headers })
})

// ============ Address autocomplete API ============
app.get('/api/addresses', async (c) => {
  const q = (c.req.query('q') || '').trim()
  if (!q) return c.json({ items: [] })
  const items = await c.env.DB.prepare(
    'SELECT sido, sigungu, dong, full_name FROM addresses WHERE dong LIKE ? OR full_name LIKE ? OR sigungu LIKE ? LIMIT 12'
  ).bind(`${q}%`, `%${q}%`, `${q}%`).all()
  return c.json({ items: items.results })
})

// ============ 온라인 상담·예약 신청 API ============
// 환자가 모달에서 작성 → 우리 D1에 직접 저장 (네이버 X)
// 페이션트 퍼널의 핵심 데이터 소스
app.post('/api/consultations', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({} as any))
    const treatment      = String(body.treatment || '').trim()
    const treatment_tier = String(body.treatment_tier || '').trim() || null
    const name           = String(body.name || '').trim()
    const phone_raw      = String(body.phone || '').trim()
    const birth_year     = String(body.birth_year || '').trim() || null
    const gender         = String(body.gender || '').trim() || null
    const preferred_date = String(body.preferred_date || '').trim() || null
    const preferred_time = String(body.preferred_time || '').trim() || null
    const message        = String(body.message || '').trim() || null
    const privacy_agreed   = body.privacy_agreed ? 1 : 0
    const marketing_agreed = body.marketing_agreed ? 1 : 0
    const source_channel = String(body.source_channel || 'web_modal').trim()
    const source_page    = String(body.source_page || '').trim() || null

    // ===== 검증 =====
    if (!treatment) return c.json({ ok: false, error: 'treatment_required', message: '진료 항목을 선택해주세요' }, 400)
    if (!name || name.length < 2) return c.json({ ok: false, error: 'name_required', message: '이름을 입력해주세요' }, 400)
    if (name.length > 30) return c.json({ ok: false, error: 'name_too_long' }, 400)

    // 연락처: 숫자만 추출 후 10~11자리 검증
    const phone_digits = phone_raw.replace(/[^0-9]/g, '')
    if (phone_digits.length < 10 || phone_digits.length > 11) {
      return c.json({ ok: false, error: 'phone_invalid', message: '연락처를 정확히 입력해주세요 (10-11자리 숫자)' }, 400)
    }
    const phone = phone_digits.length === 11
      ? `${phone_digits.slice(0,3)}-${phone_digits.slice(3,7)}-${phone_digits.slice(7)}`
      : `${phone_digits.slice(0,3)}-${phone_digits.slice(3,6)}-${phone_digits.slice(6)}`

    if (!privacy_agreed) {
      return c.json({ ok: false, error: 'privacy_required', message: '개인정보 수집·이용 동의가 필요합니다' }, 400)
    }

    // 길이 제한 (DoS 방어)
    const messageSafe = message ? message.slice(0, 1000) : null

    // 메타
    const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || null
    const ua = c.req.header('User-Agent') || null

    // ===== 간단 레이트리밋: 동일 전화로 10분 이내 중복 차단 =====
    const recent = await c.env.DB.prepare(
      `SELECT id FROM consultations WHERE phone = ? AND created_at > datetime('now','-10 minutes') LIMIT 1`
    ).bind(phone).first()
    if (recent) {
      return c.json({ ok: false, error: 'duplicate', message: '방금 동일한 번호로 신청이 접수되었습니다. 잠시 후 다시 시도해주세요.' }, 429)
    }

    // ===== INSERT =====
    const result = await c.env.DB.prepare(
      `INSERT INTO consultations
       (treatment, treatment_tier, name, phone, birth_year, gender,
        preferred_date, preferred_time, message,
        privacy_agreed, marketing_agreed, source_channel, source_page,
        ip_address, user_agent, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    ).bind(
      treatment, treatment_tier, name, phone, birth_year, gender,
      preferred_date, preferred_time, messageSafe,
      privacy_agreed, marketing_agreed, source_channel, source_page,
      ip, ua
    ).run()

    return c.json({
      ok: true,
      id: result.meta.last_row_id,
      message: '상담 신청이 접수되었습니다. 곧 연락드리겠습니다.',
    })
  } catch (e: any) {
    console.error('[consultations] insert failed', e)
    return c.json({ ok: false, error: 'server_error', message: '잠시 후 다시 시도해주세요' }, 500)
  }
})

// 어드민: 상담 신청 목록
app.get('/api/admin/consultations', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const status = c.req.query('status') || ''
  const limit = Math.min(parseInt(c.req.query('limit') || '50', 10), 200)
  const offset = parseInt(c.req.query('offset') || '0', 10)
  const where = status ? 'WHERE status = ?' : ''
  const sql = `SELECT * FROM consultations ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
  const stmt = status
    ? c.env.DB.prepare(sql).bind(status, limit, offset)
    : c.env.DB.prepare(sql).bind(limit, offset)
  const rows = await stmt.all()
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM consultations ${where}`
  ).bind(...(status ? [status] : [])).first<any>()
  return c.json({ ok: true, items: rows.results, total: total?.n || 0 })
})

// 어드민: 상담 신청 상태 업데이트
app.post('/api/admin/consultations/:id', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const id = parseInt(c.req.param('id'), 10)
  if (!id) return c.json({ ok: false, error: 'invalid_id' }, 400)
  const body = await c.req.json().catch(() => ({} as any))
  const status = String(body.status || '').trim()
  const memo   = body.internal_memo !== undefined ? String(body.internal_memo) : null
  const assigned_to = body.assigned_to !== undefined ? String(body.assigned_to) : null

  const allowedStatus = ['new', 'contacted', 'booked', 'no_show', 'completed', 'cancelled']
  const sets: string[] = []
  const vals: any[] = []
  if (status && allowedStatus.includes(status)) {
    sets.push('status = ?')
    vals.push(status)
    if (status === 'contacted') sets.push(`contacted_at = COALESCE(contacted_at, CURRENT_TIMESTAMP)`)
    if (status === 'booked')    sets.push(`booked_at = CURRENT_TIMESTAMP`)
  }
  if (memo !== null)        { sets.push('internal_memo = ?'); vals.push(memo) }
  if (assigned_to !== null) { sets.push('assigned_to = ?');   vals.push(assigned_to) }
  if (sets.length === 0) return c.json({ ok: false, error: 'nothing_to_update' }, 400)

  sets.push('updated_at = CURRENT_TIMESTAMP')
  vals.push(id)
  await c.env.DB.prepare(`UPDATE consultations SET ${sets.join(', ')} WHERE id = ?`).bind(...vals).run()
  return c.json({ ok: true })
})

// ============ Auth ============
app.get('/signup', (c) => c.render(<SignupPage />, { title: '회원가입' }))

app.post('/signup', async (c) => {
  const body = await c.req.parseBody()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const phone = String(body.phone || '').trim()
  const password = String(body.password || '')
  const privacy = body.privacy ? 1 : 0
  const marketing = body.marketing ? 1 : 0

  if (!name || !email || !phone || !password) {
    return c.render(<SignupPage error="모든 필수 항목을 입력해주세요." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  if (!privacy) {
    return c.render(<SignupPage error="개인정보 수집·이용에 동의해주세요." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  if (password.length < 6) {
    return c.render(<SignupPage error="비밀번호는 6자 이상이어야 합니다." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }

  const exists = await c.env.DB.prepare('SELECT id FROM members WHERE email=?').bind(email).first()
  if (exists) {
    return c.render(<SignupPage error="이미 가입된 이메일입니다." email={email} name={name} phone={phone} />, { title: '회원가입' })
  }
  const hash = await hashPassword(password)
  const r = await c.env.DB.prepare(
    'INSERT INTO members (name,email,phone,password_hash,privacy_agreed,marketing_agreed) VALUES (?,?,?,?,?,?)'
  ).bind(name, email, phone, hash, privacy, marketing).run()
  await setSession(c, Number(r.meta.last_row_id), email)
  return c.redirect('/before-after')
})

app.get('/login', (c) => {
  const next = c.req.query('next')
  return c.render(<LoginPage next={next} />, { title: '로그인' })
})

app.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const next = String(body.next || '/before-after')

  const user = await c.env.DB.prepare('SELECT id, password_hash FROM members WHERE email=?').bind(email).first<any>()
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return c.render(<LoginPage error="이메일 또는 비밀번호가 올바르지 않습니다." next={next} />, { title: '로그인' })
  }
  await setSession(c, user.id, email)
  return c.redirect(next)
})

app.get('/logout', (c) => {
  clearSession(c)
  return c.redirect('/')
})

// ============ Admin (password-only) ============
app.get('/admin/login', (c) => c.render(<AdminLoginPage />, { title: '관리자 로그인' }))

app.post('/admin/login', async (c) => {
  const body = await c.req.parseBody()
  const password = String(body.password || '')
  const correct = await getAdminPassword(c.env.DB)
  if (password !== correct) {
    return c.render(<AdminLoginPage error="비밀번호가 올바르지 않습니다." />, { title: '관리자 로그인' })
  }
  await setAdmin(c)
  return c.redirect('/admin')
})

app.get('/admin/logout', (c) => {
  clearAdmin(c)
  return c.redirect('/admin/login')
})

// Admin guard middleware (exempts login/logout)
app.use('/admin/*', async (c, next) => {
  const path = c.req.path
  if (path === '/admin/login' || path === '/admin/logout') return next()
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  return next()
})
app.use('/admin', async (c, next) => {
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  return next()
})

// ============ Admin Upload API (R2) ============
// 관리자만 사용 가능. multipart/form-data 로 file 필드 받아 R2에 업로드 후 /r2/... URL 반환
app.post('/api/admin/upload', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  try {
    const body = await c.req.parseBody()
    const file = body['file'] as File | undefined
    const type = (String(body['type'] || 'misc')).replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'misc'
    if (!file || typeof file === 'string') return c.json({ ok: false, error: 'no_file' }, 400)

    // 화이트리스트 검증
    const allowed = ['image/jpeg','image/png','image/webp','image/avif','image/gif','image/svg+xml']
    if (!allowed.includes(file.type)) {
      return c.json({ ok: false, error: 'unsupported_type', type: file.type }, 400)
    }
    // 용량 제한 20MB
    if (file.size > 20 * 1024 * 1024) return c.json({ ok: false, error: 'too_large', size: file.size }, 400)

    // 키 생성: uploads/{type}/{yyyymm}/{ts}-{rand}.{ext}
    const now = new Date()
    const yyyymm = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}`
    const ext = ({
      'image/jpeg':'jpg','image/png':'png','image/webp':'webp',
      'image/avif':'avif','image/gif':'gif','image/svg+xml':'svg'
    } as Record<string,string>)[file.type] || 'bin'
    const rand = Math.random().toString(36).slice(2,10)
    const key = `uploads/${type}/${yyyymm}/${now.getTime()}-${rand}.${ext}`

    const buf = await file.arrayBuffer()
    await c.env.R2.put(key, buf, { httpMetadata: { contentType: file.type } })
    return c.json({ ok: true, url: `/r2/${key}`, key, size: file.size, type: file.type })
  } catch (e: any) {
    return c.json({ ok: false, error: 'upload_failed', message: String(e?.message || e) }, 500)
  }
})

// Admin dashboard — 통계 + 최근 활동 피드
app.get('/admin', async (c) => {
  const DB = c.env.DB
  const stats: any = {}
  const tables = ['members','before_afters','blog_posts','notices','treatments','doctors','faqs','dictionary','region_seo']
  // 병렬 실행으로 응답 속도 개선
  const counts = await Promise.all(
    tables.map(t => DB.prepare(`SELECT COUNT(*) as n FROM ${t}`).first<any>())
  )
  tables.forEach((t, i) => { stats[t] = counts[i]?.n || 0 })

  // 최근 활동 + 상담 신청 통계
  const [recentBA, recentBlog, recentNotice, recentMembers, recentConsults, consultStats] = await Promise.all([
    DB.prepare('SELECT id,title,is_published,created_at FROM before_afters ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,title,slug,is_published,created_at FROM blog_posts ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,title,is_main,is_published,created_at FROM notices ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,name,email,created_at FROM members ORDER BY id DESC LIMIT 5').all(),
    DB.prepare("SELECT id,name,phone,treatment,status,created_at FROM consultations ORDER BY id DESC LIMIT 5").all(),
    DB.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='new'  THEN 1 ELSE 0 END) AS new_c,
        SUM(CASE WHEN date(created_at)=date('now','localtime') THEN 1 ELSE 0 END) AS today_c,
        SUM(CASE WHEN created_at >= datetime('now','-7 days') THEN 1 ELSE 0 END) AS week_c
      FROM consultations
    `).first<any>(),
  ])
  stats.consultations = consultStats?.total || 0
  stats.consultations_new = consultStats?.new_c || 0
  stats.consultations_today = consultStats?.today_c || 0
  stats.consultations_week = consultStats?.week_c || 0
  stats.recent = {
    ba: recentBA.results,
    blog: recentBlog.results,
    notice: recentNotice.results,
    members: recentMembers.results,
    consults: recentConsults.results,
  }
  return c.render(<AdminDashboard stats={stats} />, { title: 'Admin · Dashboard' })
})

// ============ Admin: 인라인 토글 / 일괄작업 API ============
const ADMIN_TABLES: Record<string, string> = {
  'before-after': 'before_afters',
  'blog': 'blog_posts',
  'notice': 'notices',
}

// 단일 항목 공개 토글
app.post('/api/admin/:type/:id/toggle', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const type = c.req.param('type')
  const table = ADMIN_TABLES[type]
  if (!table) return c.json({ ok: false, error: 'invalid type' }, 400)
  const id = parseInt(c.req.param('id'), 10)
  const cur = await c.env.DB.prepare(`SELECT is_published FROM ${table} WHERE id=?`).bind(id).first<any>()
  if (!cur) return c.json({ ok: false, error: 'not found' }, 404)
  const next = cur.is_published ? 0 : 1
  await c.env.DB.prepare(`UPDATE ${table} SET is_published=? WHERE id=?`).bind(next, id).run()
  return c.json({ ok: true, is_published: next })
})

// 공지사항 대장공지 토글
app.post('/api/admin/notice/:id/toggle-main', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const id = parseInt(c.req.param('id'), 10)
  const cur = await c.env.DB.prepare('SELECT is_main FROM notices WHERE id=?').bind(id).first<any>()
  if (!cur) return c.json({ ok: false, error: 'not found' }, 404)
  const next = cur.is_main ? 0 : 1
  await c.env.DB.prepare('UPDATE notices SET is_main=? WHERE id=?').bind(next, id).run()
  return c.json({ ok: true, is_main: next })
})

// 일괄작업 (publish | unpublish | delete)
app.post('/api/admin/:type/bulk', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const type = c.req.param('type')
  const table = ADMIN_TABLES[type]
  if (!table) return c.json({ ok: false, error: 'invalid type' }, 400)
  const body = await c.req.json<{ action: string, ids: number[] }>().catch(() => null)
  if (!body || !Array.isArray(body.ids) || body.ids.length === 0) {
    return c.json({ ok: false, error: 'invalid body' }, 400)
  }
  const ids = body.ids.map(n => parseInt(String(n), 10)).filter(n => !isNaN(n))
  if (ids.length === 0) return c.json({ ok: false, error: 'no valid ids' }, 400)
  const placeholders = ids.map(() => '?').join(',')
  if (body.action === 'publish') {
    await c.env.DB.prepare(`UPDATE ${table} SET is_published=1 WHERE id IN (${placeholders})`).bind(...ids).run()
  } else if (body.action === 'unpublish') {
    await c.env.DB.prepare(`UPDATE ${table} SET is_published=0 WHERE id IN (${placeholders})`).bind(...ids).run()
  } else if (body.action === 'delete') {
    await c.env.DB.prepare(`DELETE FROM ${table} WHERE id IN (${placeholders})`).bind(...ids).run()
  } else {
    return c.json({ ok: false, error: 'invalid action' }, 400)
  }
  return c.json({ ok: true, affected: ids.length })
})

// 회원 CSV 내보내기
app.get('/admin/members/export.csv', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM members ORDER BY created_at DESC').all()
  const rows: any[] = r.results as any[]
  const escape = (v: any) => {
    const s = (v === null || v === undefined) ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const header = ['id','name','email','phone','privacy_agreed','marketing_agreed','created_at']
  const lines = [header.join(',')]
  for (const m of rows) lines.push(header.map(h => escape(m[h])).join(','))
  // BOM 추가 (엑셀 한글 호환)
  const csv = '\uFEFF' + lines.join('\n')
  const today = new Date().toISOString().slice(0, 10)
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="members-${today}.csv"`
    }
  })
})

app.get('/admin/members', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM members ORDER BY created_at DESC').all()
  return c.render(<AdminMembersPage members={r.results as any} />, { title: 'Admin · 회원' })
})

// --- Admin: 상담 신청 ---
app.get('/admin/consultations', async (c) => {
  const status = (c.req.query('status') || '').trim()
  const limit = 200

  // 상태별 카운트 (탭 인디케이터)
  const countsRow = await c.env.DB.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status='new'        THEN 1 ELSE 0 END) AS new_c,
      SUM(CASE WHEN status='contacted'  THEN 1 ELSE 0 END) AS contacted_c,
      SUM(CASE WHEN status='booked'     THEN 1 ELSE 0 END) AS booked_c,
      SUM(CASE WHEN status='completed'  THEN 1 ELSE 0 END) AS completed_c,
      SUM(CASE WHEN status='no_show'    THEN 1 ELSE 0 END) AS no_show_c,
      SUM(CASE WHEN status='cancelled'  THEN 1 ELSE 0 END) AS cancelled_c
    FROM consultations
  `).first<any>()

  // 목록
  let items: any[]
  let totalForStatus: number
  if (status) {
    const r = await c.env.DB.prepare(
      'SELECT * FROM consultations WHERE status = ? ORDER BY created_at DESC LIMIT ?'
    ).bind(status, limit).all()
    items = r.results as any[]
    const tr = await c.env.DB.prepare('SELECT COUNT(*) as n FROM consultations WHERE status = ?').bind(status).first<any>()
    totalForStatus = tr?.n || 0
  } else {
    const r = await c.env.DB.prepare(
      'SELECT * FROM consultations ORDER BY created_at DESC LIMIT ?'
    ).bind(limit).all()
    items = r.results as any[]
    totalForStatus = countsRow?.total || 0
  }

  return c.render(
    <AdminConsultationsPage
      items={items as any}
      total={totalForStatus}
      counts={{
        all: countsRow?.total || 0,
        new: countsRow?.new_c || 0,
        contacted: countsRow?.contacted_c || 0,
        booked: countsRow?.booked_c || 0,
        completed: countsRow?.completed_c || 0,
        no_show: countsRow?.no_show_c || 0,
        cancelled: countsRow?.cancelled_c || 0,
      }}
      currentStatus={status}
    />,
    { title: 'Admin · 상담 신청' }
  )
})

// 상담 신청 CSV 내보내기 — 실장님 엑셀 작업용
app.get('/admin/consultations/export.csv', async (c) => {
  const status = (c.req.query('status') || '').trim()
  const sql = status
    ? 'SELECT * FROM consultations WHERE status = ? ORDER BY created_at DESC'
    : 'SELECT * FROM consultations ORDER BY created_at DESC'
  const stmt = status ? c.env.DB.prepare(sql).bind(status) : c.env.DB.prepare(sql)
  const r = await stmt.all()
  const rows: any[] = r.results as any[]
  const escape = (v: any) => {
    const s = (v === null || v === undefined) ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const header = [
    'id','status','treatment','treatment_tier','name','phone',
    'preferred_date','preferred_time','message',
    'privacy_agreed','marketing_agreed','source_channel','source_page',
    'assigned_to','internal_memo','contacted_at','booked_at',
    'created_at','updated_at'
  ]
  const lines = [header.join(',')]
  for (const m of rows) lines.push(header.map(h => escape(m[h])).join(','))
  const csv = '\uFEFF' + lines.join('\n')
  const today = new Date().toISOString().slice(0, 10)
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="consultations-${status || 'all'}-${today}.csv"`
    }
  })
})

// --- Admin: Before/After ---
app.get('/admin/before-after', async (c) => {
  const [r, t] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM before_afters ORDER BY id DESC').all(),
    c.env.DB.prepare('SELECT slug, name FROM treatments ORDER BY is_core DESC, display_order').all()
  ])
  return c.render(<AdminBAListPage items={r.results as any} treatments={t.results as any} />, { title: 'Admin · 비포애프터' })
})
app.get('/admin/before-after/new', async (c) => {
  const [doctors, treatments] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all(),
    c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  ])
  return c.render(<AdminBAFormPage doctors={doctors.results as any} treatments={treatments.results as any} />, { title: 'Admin · 새 비포애프터' })
})
app.post('/admin/before-after/new', async (c) => {
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `INSERT INTO before_afters (title,description,pano_before_url,pano_after_url,intra_before_url,intra_after_url,age_group,gender,treatment_slug,region_sido,region_sigungu,region_dong,doctor_slug,treatment_period,is_published,meta_description,meta_keywords,og_image,before_alt,after_alt,noindex)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0,
    String(b.meta_description||'') || null, String(b.meta_keywords||'') || null,
    String(b.og_image||'') || null, String(b.before_alt||'') || null,
    String(b.after_alt||'') || null, b.noindex ? 1 : 0
  ).run()
  return c.redirect('/admin/before-after')
})
app.get('/admin/before-after/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const [item, doctors, treatments] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM before_afters WHERE id=?').bind(id).first<any>(),
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all(),
    c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()
  ])
  if (!item) return c.notFound()
  return c.render(<AdminBAFormPage item={item} doctors={doctors.results as any} treatments={treatments.results as any} />, { title: 'Admin · 비포애프터 수정' })
})
app.post('/admin/before-after/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `UPDATE before_afters SET title=?,description=?,pano_before_url=?,pano_after_url=?,intra_before_url=?,intra_after_url=?,age_group=?,gender=?,treatment_slug=?,region_sido=?,region_sigungu=?,region_dong=?,doctor_slug=?,treatment_period=?,is_published=?,meta_description=?,meta_keywords=?,og_image=?,before_alt=?,after_alt=?,noindex=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0,
    String(b.meta_description||'') || null, String(b.meta_keywords||'') || null,
    String(b.og_image||'') || null, String(b.before_alt||'') || null,
    String(b.after_alt||'') || null, b.noindex ? 1 : 0, id
  ).run()
  return c.redirect('/admin/before-after')
})
app.post('/admin/before-after/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM before_afters WHERE id=?').bind(id).run()
  return c.redirect('/admin/before-after')
})

// --- Admin: Blog ---
app.get('/admin/blog', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM blog_posts ORDER BY id DESC').all()
  return c.render(<AdminBlogListPage posts={r.results as any} />, { title: 'Admin · 블로그' })
})
app.get('/admin/blog/new', async (c) => {
  const d = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  return c.render(<AdminBlogFormPage doctors={d.results as any} />, { title: 'Admin · 새 블로그' })
})
app.post('/admin/blog/new', async (c) => {
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `INSERT INTO blog_posts (slug,title,excerpt,content,thumbnail_url,author_doctor_slug,meta_description,meta_keywords,og_image,noindex,is_published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''),
    String(b.og_image||'') || null, b.noindex ? 1 : 0,
    b.is_published ? 1 : 0
  ).run()
  return c.redirect('/admin/blog')
})
app.get('/admin/blog/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const [post, doctors] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM blog_posts WHERE id=?').bind(id).first<any>(),
    c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  ])
  if (!post) return c.notFound()
  return c.render(<AdminBlogFormPage post={post} doctors={doctors.results as any} />, { title: 'Admin · 블로그 수정' })
})
app.post('/admin/blog/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  await c.env.DB.prepare(
    `UPDATE blog_posts SET slug=?,title=?,excerpt=?,content=?,thumbnail_url=?,author_doctor_slug=?,meta_description=?,meta_keywords=?,og_image=?,noindex=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''),
    String(b.og_image||'') || null, b.noindex ? 1 : 0,
    b.is_published ? 1 : 0, id
  ).run()
  return c.redirect('/admin/blog')
})
app.post('/admin/blog/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM blog_posts WHERE id=?').bind(id).run()
  return c.redirect('/admin/blog')
})

// --- Admin: Notices ---
app.get('/admin/notices', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM notices ORDER BY is_main DESC, id DESC').all()
  return c.render(<AdminNoticesListPage notices={r.results as any} />, { title: 'Admin · 공지' })
})
app.get('/admin/notices/new', (c) => c.render(<AdminNoticeFormPage />, { title: 'Admin · 새 공지' }))
app.post('/admin/notices/new', async (c) => {
  const b = await c.req.parseBody()
  const isMain = b.is_main ? 1 : 0
  if (isMain) await c.env.DB.prepare('UPDATE notices SET is_main=0').run()
  await c.env.DB.prepare(
    `INSERT INTO notices (title,content,thumbnail_url,is_main,is_published) VALUES (?,?,?,?,?)`
  ).bind(
    String(b.title||''), String(b.content||''),
    String(b.thumbnail_url||'') || null, isMain, b.is_published ? 1 : 0
  ).run()
  return c.redirect('/admin/notices')
})
app.get('/admin/notices/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const n = await c.env.DB.prepare('SELECT * FROM notices WHERE id=?').bind(id).first<any>()
  if (!n) return c.notFound()
  return c.render(<AdminNoticeFormPage notice={n} />, { title: 'Admin · 공지 수정' })
})
app.post('/admin/notices/:id/edit', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.parseBody()
  const isMain = b.is_main ? 1 : 0
  if (isMain) await c.env.DB.prepare('UPDATE notices SET is_main=0').run()
  await c.env.DB.prepare(
    `UPDATE notices SET title=?,content=?,thumbnail_url=?,is_main=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.title||''), String(b.content||''),
    String(b.thumbnail_url||'') || null,
    isMain, b.is_published ? 1 : 0, id
  ).run()
  return c.redirect('/admin/notices')
})
app.post('/admin/notices/:id/delete', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM notices WHERE id=?').bind(id).run()
  return c.redirect('/admin/notices')
})

// ============================================================
// Admin: 수가 관리 (Fees)
// ============================================================

// GET /admin/fees — 수가 관리 페이지
app.get('/admin/fees', async (c) => {
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  const r = await c.env.DB.prepare(
    `SELECT id, category, category_icon, group_note, name, price, note, is_highlight, is_published, sort_group, sort_order
     FROM fees
     ORDER BY sort_group ASC, sort_order ASC, id ASC`
  ).all<any>()
  const rows = r.results || []
  // 그룹별로 묶기
  const groupMap = new Map<number, any>()
  for (const row of rows) {
    const key = row.sort_group
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        category: row.category,
        category_icon: row.category_icon || 'fa-tooth',
        group_note: row.group_note,
        sort_group: row.sort_group,
        rows: []
      })
    }
    groupMap.get(key).rows.push({
      id: row.id, name: row.name, price: row.price, note: row.note,
      is_highlight: row.is_highlight, is_published: row.is_published, sort_order: row.sort_order
    })
  }
  const groups = Array.from(groupMap.values())
  return c.render(<AdminFeesPage groups={groups} />, { title: 'Admin · 수가 관리' })
})

// GET /admin/seo — SEO/AEO 가이드 페이지
app.get('/admin/seo', async (c) => {
  if (!(await isAdmin(c))) return c.redirect('/admin/login')
  const [blogCount, baCount, doctorCount, treatmentCount] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) AS n FROM blog_posts WHERE is_published=1').first<any>(),
    c.env.DB.prepare('SELECT COUNT(*) AS n FROM before_afters WHERE is_published=1').first<any>(),
    c.env.DB.prepare('SELECT COUNT(*) AS n FROM doctors').first<any>(),
    c.env.DB.prepare('SELECT COUNT(*) AS n FROM treatments').first<any>(),
  ])
  const stats = {
    blog: blogCount?.n || 0,
    ba: baCount?.n || 0,
    doctors: doctorCount?.n || 0,
    treatments: treatmentCount?.n || 0,
    sitemaps: ['sitemap.xml', 'sitemap-main.xml', 'sitemap-blog.xml', 'sitemap-cases.xml', 'sitemap-content.xml']
  }
  return c.render(<AdminSeoGuidePage stats={stats} />, { title: 'Admin · SEO 가이드', robots: 'noindex,nofollow' })
})

// PUT /api/admin/fees/:id — 단일 행 업데이트
app.put('/api/admin/fees/:id', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.json() as any
  if (!b.name || !b.price) return c.json({ ok: false, error: 'name & price required' }, 400)
  await c.env.DB.prepare(
    `UPDATE fees SET name=?, price=?, note=?, is_highlight=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.name), String(b.price),
    b.note ? String(b.note) : null,
    b.is_highlight ? 1 : 0,
    b.is_published ? 1 : 0,
    id
  ).run()
  return c.json({ ok: true })
})

// PUT /api/admin/fees/bulk — 여러 행 일괄 업데이트
app.put('/api/admin/fees/bulk', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const b = await c.req.json() as any
  const items = Array.isArray(b.items) ? b.items : []
  if (items.length === 0) return c.json({ ok: false, error: 'no items' }, 400)
  let affected = 0
  for (const it of items) {
    if (!it.id || !it.name || !it.price) continue
    await c.env.DB.prepare(
      `UPDATE fees SET name=?, price=?, note=?, is_highlight=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
    ).bind(
      String(it.name), String(it.price),
      it.note ? String(it.note) : null,
      it.is_highlight ? 1 : 0,
      it.is_published ? 1 : 0,
      parseInt(it.id, 10)
    ).run()
    affected++
  }
  return c.json({ ok: true, affected })
})

// PUT /api/admin/fees/group-note — 그룹 안내 문구 일괄 업데이트
app.put('/api/admin/fees/group-note', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const b = await c.req.json() as any
  const sortGroup = parseInt(b.sort_group, 10)
  if (isNaN(sortGroup)) return c.json({ ok: false, error: 'invalid sort_group' }, 400)
  await c.env.DB.prepare(
    `UPDATE fees SET group_note=?, updated_at=CURRENT_TIMESTAMP WHERE sort_group=?`
  ).bind(b.group_note ? String(b.group_note) : null, sortGroup).run()
  return c.json({ ok: true })
})

// POST /api/admin/fees — 새 행 추가
app.post('/api/admin/fees', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const b = await c.req.json() as any
  const sortGroup = parseInt(b.sort_group, 10)
  if (isNaN(sortGroup) || !b.name || !b.price) {
    return c.json({ ok: false, error: 'sort_group, name, price required' }, 400)
  }
  // 같은 그룹의 카테고리/아이콘/안내 가져와서 신규 행에 적용
  const ref = await c.env.DB.prepare(
    `SELECT category, category_icon, group_note FROM fees WHERE sort_group=? LIMIT 1`
  ).bind(sortGroup).first<any>()
  if (!ref) return c.json({ ok: false, error: 'group not found' }, 404)
  const maxOrder = await c.env.DB.prepare(
    `SELECT COALESCE(MAX(sort_order), 0) AS m FROM fees WHERE sort_group=?`
  ).bind(sortGroup).first<any>()
  const nextOrder = (maxOrder?.m || 0) + 1
  const result = await c.env.DB.prepare(
    `INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, is_published, sort_group, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, 0, 1, ?, ?)`
  ).bind(
    ref.category, ref.category_icon, ref.group_note,
    String(b.name), String(b.price),
    b.note ? String(b.note) : null,
    sortGroup, nextOrder
  ).run()
  return c.json({ ok: true, id: result.meta.last_row_id })
})

// DELETE /api/admin/fees/:id — 행 삭제
app.delete('/api/admin/fees/:id', async (c) => {
  if (!(await isAdmin(c))) return c.json({ ok: false, error: 'unauthorized' }, 401)
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare('DELETE FROM fees WHERE id=?').bind(id).run()
  return c.json({ ok: true })
})

// ============ robots + sitemap + llms.txt + manifest ============
// PWA manifest — _routes.json 이 /static/* 만 자산 라우팅으로 빼두기 때문에
// 루트의 manifest.webmanifest 는 Worker 가 직접 응답해야 함
app.get('/manifest.webmanifest', (c) => {
  const manifest = {
    name: '대구365치과',
    short_name: '대구365치과',
    description: '치과가 두려웠던 의사가 만든 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fdf8f3',
    theme_color: '#6b4c2a',
    lang: 'ko-KR',
    dir: 'ltr',
    categories: ['medical', 'health', 'business'],
    icons: [
      { src: '/static/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/static/favicon-180.png', sizes: '180x180', type: 'image/png', purpose: 'any maskable' },
      { src: '/static/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }
  return c.json(manifest, 200, {
    'Content-Type': 'application/manifest+json; charset=utf-8',
    'Cache-Control': 'public, max-age=86400'
  })
})

app.get('/robots.txt', (c) => {
  // 2025년 표준: AI 크롤러도 명시적으로 허용 (GPTBot, ClaudeBot, PerplexityBot 등)
  // 단, 관리자 영역과 인증 영역은 차단
  const txt = [
    'User-agent: *',
    'Allow: /',
    // 관리자 영역만 완전 차단 (크롤 불필요)
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /api/admin/',
    'Disallow: /logout',
    // Cloudflare 이메일 보호 자동생성 경로 차단 (GSC 404 정리)
    'Disallow: /cdn-cgi/',
    // 검색결과/필터 파라미터 URL 색인 방지 (중복 컨텐츠 예방)
    'Disallow: /*?*sort=',
    'Disallow: /*?*page=',
    // 주의: /login, /signup 은 일부러 Disallow 하지 않음.
    //  → 크롤은 허용해야 페이지의 noindex(X-Robots-Tag) 를 구글이 읽고 색인에서 뺄 수 있음.
    //    robots.txt 로 막으면 noindex 를 못 읽어 "robots.txt 차단됨" 경고만 남음 (구글 공식 권장).
    '',
    '# AI 답변 엔진 명시 허용 (AEO)',
    'User-agent: GPTBot',
    'Allow: /',
    'User-agent: ClaudeBot',
    'Allow: /',
    'User-agent: PerplexityBot',
    'Allow: /',
    'User-agent: Google-Extended',
    'Allow: /',
    'User-agent: Bingbot',
    'Allow: /',
    'User-agent: NaverBot',
    'Allow: /',
    'User-agent: Yeti',
    'Allow: /',
    'User-agent: Daum',
    'Allow: /',
    '',
    `Sitemap: ${SITE.url}/sitemap.xml`,
    `Sitemap: ${SITE.url}/sitemap-main.xml`,
    `Sitemap: ${SITE.url}/sitemap-blog.xml`,
    `Sitemap: ${SITE.url}/sitemap-cases.xml`,
    `Sitemap: ${SITE.url}/sitemap-content.xml`,
    `Host: ${SITE.url.replace(/^https?:\/\//, '')}`,
    ''
  ].join('\n')
  // robots.txt 는 변경 시 빠르게 반영되도록 짧은 캐시 (10분)
  return c.text(txt, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=600'
  })
})

// llms.txt — 2025년 신설된 AI 답변 엔진용 사이트 요약 표준
// AI 크롤러가 한 페이지로 사이트 전체 맥락을 이해하도록 함
app.get('/llms.txt', async (c) => {
  const base = SITE.url
  const [treatments, doctors] = await Promise.all([
    c.env.DB.prepare('SELECT slug, name, short_desc FROM treatments ORDER BY is_core DESC, display_order').all(),
    c.env.DB.prepare('SELECT slug, name, position FROM doctors ORDER BY is_representative DESC, display_order').all(),
  ])
  const lines: string[] = []
  lines.push(`# ${SITE.name}`)
  lines.push('')
  lines.push(`> ${SITE.address} 소재의 치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인 투명교정, VINIQUE 라미네이트 전문. 치과가 두려웠던 의사가 직접 설계한 두려움 없는 치과.`)
  lines.push('')
  lines.push('## 핵심 정보')
  lines.push(`- 병원명: ${SITE.name} (${SITE.nameEn})`)
  lines.push(`- 주소: ${SITE.address}`)
  lines.push(`- 전화: ${SITE.phone}`)
  lines.push(`- 이메일: ${SITE.email}`)
  lines.push(`- 진료시간: 월·목 09:30~21:00 (야간), 화·수·금 09:30~18:30, 토·일 09:30~17:00`)
  lines.push(`- 휴진: 명절 당일`)
  lines.push(`- 의료진: 6명 협진 시스템`)
  lines.push(`- 설립: ${SITE.founded}년`)
  lines.push('')
  lines.push('## 주요 진료')
  for (const t of (treatments.results as any[])) {
    lines.push(`- [${t.name}](${base}/treatments/${t.slug}): ${t.short_desc}`)
  }
  lines.push('')
  lines.push('## 의료진')
  for (const d of (doctors.results as any[])) {
    lines.push(`- [${d.name} ${d.position || ''}](${base}/doctors/${d.slug})`)
  }
  lines.push('')
  lines.push('## 핵심 콘텐츠')
  lines.push(`- [병원 미션](${base}/mission)`)
  lines.push(`- [실제 치료 사례 (Before/After)](${base}/before-after)`)
  lines.push(`- [의료진 칼럼 (블로그)](${base}/blog)`)
  lines.push(`- [치과 백과사전 (500+ 용어)](${base}/dictionary)`)
  lines.push(`- [자주 묻는 질문 (250+ FAQ)](${base}/faq)`)
  lines.push(`- [비용 안내](${base}/fees)`)
  lines.push(`- [오시는 길](${base}/directions)`)
  lines.push('')
  lines.push('## 차별점')
  lines.push('- 4단계 무통마취: 모든 진료 기본 적용 (가글마취 → 도포마취 → iject BTS 컴퓨터 제어 → 본마취)')
  lines.push('- 의식하 진정(IV Sedation) 수면치료 시스템')
  lines.push('- iTero 5D 디지털 스캔 + 원내 D.LAB 디지털 기공실')
  lines.push('- Q-ray 형광 충치 진단 (방사선 0)')
  lines.push('- 임플란트 픽스쳐 5년 / 상부보철 평생 보증')
  lines.push('- GBT 에어플로우 8단계 표준 프로토콜')
  lines.push('')
  lines.push('## 예약 / 문의')
  lines.push('- 네이버 예약: https://naver.me/GhSIroMf')
  lines.push('- 카카오톡 채널: http://pf.kakao.com/_PGaxmn')
  lines.push(`- 전화: ${SITE.phone}`)
  lines.push('')
  return c.text(lines.join('\n'), 200, { 'Content-Type': 'text/plain; charset=utf-8' })
})

// ============ Sitemap helpers ============
const sitemapIso = (v: any): string => {
  if (!v) return new Date().toISOString().substring(0, 10)
  try {
    const d = new Date(typeof v === 'string' ? v.replace(' ', 'T') : v)
    if (isNaN(d.getTime())) return new Date().toISOString().substring(0, 10)
    return d.toISOString().substring(0, 10)
  } catch { return new Date().toISOString().substring(0, 10) }
}
const xmlEscape = (s: any): string => {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// ============ Sitemap Index ============
// sitemap-regions 분리 (지역 SEO 색인 가속) + lastmod 최신값 사용
app.get('/sitemap.xml', async (c) => {
  const base = SITE.url
  const today = new Date().toISOString().substring(0, 10)

  // 각 sub-sitemap 의 가장 최근 lastmod 를 추적 (테이블별 안전 fallback)
  let lastmodMain = today, lastmodBlog = today, lastmodCases = today
  let lastmodContent = today, lastmodRegions = today
  const safeMax = async (sql: string, fb: string) => {
    try {
      const r = await c.env.DB.prepare(sql).first<any>()
      return r?.m ? sitemapIso(r.m) : today
    } catch {
      try {
        const r = await c.env.DB.prepare(fb).first<any>()
        return r?.m ? sitemapIso(r.m) : today
      } catch { return today }
    }
  }
  try {
    const [tMain1, tMain2, tBlog, tCases, tDict, tReg] = await Promise.all([
      safeMax('SELECT MAX(updated_at) as m FROM doctors', 'SELECT MAX(created_at) as m FROM doctors'),
      safeMax('SELECT MAX(updated_at) as m FROM treatments', 'SELECT MAX(created_at) as m FROM treatments'),
      safeMax('SELECT MAX(updated_at) as m FROM blog_posts WHERE is_published=1', 'SELECT MAX(created_at) as m FROM blog_posts WHERE is_published=1'),
      safeMax('SELECT MAX(updated_at) as m FROM before_afters WHERE is_published=1', 'SELECT MAX(created_at) as m FROM before_afters WHERE is_published=1'),
      safeMax('SELECT MAX(updated_at) as m FROM dictionary', 'SELECT MAX(created_at) as m FROM dictionary'),
      safeMax('SELECT MAX(updated_at) as m FROM region_seo', 'SELECT MAX(created_at) as m FROM region_seo'),
    ])
    lastmodMain = [tMain1, tMain2].sort().reverse()[0] || today
    lastmodBlog = tBlog
    lastmodCases = tCases
    lastmodContent = tDict
    lastmodRegions = tReg
  } catch (e) {
    // ignore
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap-main.xml</loc><lastmod>${lastmodMain}</lastmod></sitemap>
  <sitemap><loc>${base}/sitemap-blog.xml</loc><lastmod>${lastmodBlog}</lastmod></sitemap>
  <sitemap><loc>${base}/sitemap-cases.xml</loc><lastmod>${lastmodCases}</lastmod></sitemap>
  <sitemap><loc>${base}/sitemap-content.xml</loc><lastmod>${lastmodContent}</lastmod></sitemap>
</sitemapindex>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ Sitemap: Main (static + doctors + treatments + notices) ============
// 핵심 진료(is_core=1)는 priority 0.95, 일반 진료는 0.85, 변경 빈도 가속
app.get('/sitemap-main.xml', async (c) => {
  const base = SITE.url
  const today = new Date().toISOString().substring(0, 10)
  // updated_at 컬럼 존재 여부에 따라 fallback (doctors/treatments 는 created_at 만 있음)
  const safeSelect = async (sql: string, fallback: string) => {
    try { return await c.env.DB.prepare(sql).all() } catch { return await c.env.DB.prepare(fallback).all() }
  }
  const [doctors, treatments, notices] = await Promise.all([
    safeSelect(
      'SELECT slug, name, photo_url, COALESCE(updated_at, created_at) as lastmod FROM doctors',
      'SELECT slug, name, photo_url, created_at as lastmod FROM doctors'
    ),
    safeSelect(
      'SELECT slug, name, COALESCE(is_core, 0) as is_core, COALESCE(updated_at, created_at) as lastmod FROM treatments',
      'SELECT slug, name, COALESCE(is_core, 0) as is_core, created_at as lastmod FROM treatments'
    ),
    safeSelect(
      'SELECT id, COALESCE(updated_at, created_at) as lastmod FROM notices WHERE is_published=1',
      'SELECT id, created_at as lastmod FROM notices WHERE is_published=1'
    ),
  ])

  const urls: string[] = []
  const addUrl = (loc: string, pri = '0.8', chf = 'weekly', lastmod = today, image?: { url: string; caption?: string; title?: string }) => {
    const img = image && image.url ? `\n    <image:image><image:loc>${xmlEscape(image.url)}</image:loc>${image.title ? `<image:title>${xmlEscape(image.title)}</image:title>` : ''}${image.caption ? `<image:caption>${xmlEscape(image.caption)}</image:caption>` : ''}</image:image>` : ''
    urls.push(`  <url><loc>${base}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${pri}</priority><changefreq>${chf}</changefreq>${img}</url>`)
  }

  // 정적 진입 페이지
  addUrl('/',             '1.0',  'daily')
  addUrl('/mission',      '0.9',  'monthly')
  addUrl('/doctors',      '0.9',  'monthly')
  addUrl('/treatments',   '0.95', 'weekly')
  addUrl('/before-after', '0.9',  'weekly')
  addUrl('/blog',         '0.9',  'weekly')
  addUrl('/notices',      '0.7',  'weekly')
  addUrl('/directions',   '0.7',  'yearly')
  addUrl('/hours',        '0.6',  'yearly')
  addUrl('/fees',         '0.85', 'monthly')
  addUrl('/dictionary',   '0.85', 'weekly')
  addUrl('/faq',          '0.85', 'monthly')
  addUrl('/regions',      '0.95', 'weekly')

  // 의료진
  ;(doctors.results as any[]).forEach((d: any) =>
    addUrl(`/doctors/${d.slug}`, '0.85', 'monthly', sitemapIso(d.lastmod),
      d.photo_url ? { url: d.photo_url, title: `${d.name} 원장`, caption: `대구365치과 ${d.name} 원장` } : undefined)
  )
  // 진료(핵심진료는 priority/changefreq 가속)
  ;(treatments.results as any[]).forEach((t: any) => {
    const pri = t.is_core ? '0.95' : '0.85'
    const chf = t.is_core ? 'weekly' : 'monthly'
    addUrl(`/treatments/${t.slug}`, pri, chf, sitemapIso(t.lastmod))
  })
  // 공지
  ;(notices.results as any[]).forEach((n: any) =>
    addUrl(`/notices/${n.id}`, '0.6', 'monthly', sitemapIso(n.lastmod))
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ Sitemap: Regions — SEO Step1 색인 철수 (2026-07) ============
// 지역×진료 페이지 98개는 페이지 간 고유율 6~12%로 구글 품질 필터에 걸려
// 색인 전량 해제됨 → 사이트맵에서 제외 + noindex 처리.
// GSC 기존 제출분 404 방지를 위해 빈 urlset 반환 (허브는 sitemap-main 에 포함)
app.get('/sitemap-regions.xml', (c) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ Sitemap: Blog ============
app.get('/sitemap-blog.xml', async (c) => {
  const base = SITE.url
  // Sitemap protocol: <image:loc> MUST be absolute URL (https://...)
  const absUrl = (u: string | null | undefined): string => {
    if (!u) return ''
    if (/^https?:\/\//i.test(u)) return u
    if (u.startsWith('//')) return 'https:' + u
    if (u.startsWith('/')) return base + u
    return base + '/' + u
  }
  // noindex 컬럼 없을 수도 있어 COALESCE 보호
  let blogs: any
  try {
    blogs = await c.env.DB.prepare(
      'SELECT slug, title, og_image, thumbnail_url, COALESCE(updated_at, created_at) as lastmod FROM blog_posts WHERE is_published=1 AND COALESCE(noindex,0)=0 ORDER BY COALESCE(updated_at, created_at) DESC'
    ).all()
  } catch {
    blogs = await c.env.DB.prepare(
      'SELECT slug, title, thumbnail_url, created_at as lastmod FROM blog_posts WHERE is_published=1'
    ).all()
  }

  const urls: string[] = []
  ;(blogs.results as any[]).forEach((b: any) => {
    const imgUrl = absUrl(b.og_image || b.thumbnail_url)
    const img = imgUrl
      ? `\n    <image:image><image:loc>${xmlEscape(imgUrl)}</image:loc><image:title>${xmlEscape(b.title)}</image:title><image:caption>${xmlEscape(b.title)} - 대구365치과 컬럼</image:caption></image:image>`
      : ''
    urls.push(`  <url><loc>${base}/blog/${b.slug}</loc><lastmod>${sitemapIso(b.lastmod)}</lastmod><priority>0.85</priority><changefreq>weekly</changefreq>${img}</url>`)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ RSS 2.0 피드 (/rss.xml) — 블로그 최신 글 (구독·AI 크롤러 발견성 + 네이버 서치어드바이저 RSS 제출용) ============
app.get('/rss.xml', async (c) => {
  const base = SITE.url
  const toRfc822 = (v: any): string => {
    const s = String(v || '').replace(' ', 'T')
    const d = new Date(/Z$|[+-]\d{2}:\d{2}$/.test(s) ? s : s + 'Z')
    return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
  }
  const stripHtml = (h: any) => String(h || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  // noindex 컬럼 없을 수도 있어 fallback 쿼리 보호 (sitemap-blog와 동일 패턴)
  let posts: any[] = []
  try {
    posts = ((await c.env.DB.prepare(
      'SELECT slug, title, meta_description, excerpt, content, category, created_at, updated_at FROM blog_posts WHERE is_published=1 AND COALESCE(noindex,0)=0 ORDER BY created_at DESC LIMIT 50'
    ).all()).results as any[]) || []
  } catch {
    try {
      posts = ((await c.env.DB.prepare(
        'SELECT slug, title, excerpt, content, created_at FROM blog_posts WHERE is_published=1 ORDER BY created_at DESC LIMIT 50'
      ).all()).results as any[]) || []
    } catch {}
  }
  const items = posts.map((p: any) => {
    const desc = p.meta_description || p.excerpt || stripHtml(p.content).slice(0, 300) || p.title
    return `  <item>
    <title>${xmlEscape(p.title)}</title>
    <link>${base}/blog/${xmlEscape(p.slug)}</link>
    <guid isPermaLink="true">${base}/blog/${xmlEscape(p.slug)}</guid>
    <description>${xmlEscape(desc)}</description>${p.category ? `
    <category>${xmlEscape(p.category)}</category>` : ''}
    <pubDate>${toRfc822(p.created_at)}</pubDate>
  </item>`
  }).join('\n')
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xmlEscape(SITE.name)} 블로그</title>
  <link>${base}/blog</link>
  <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>${xmlEscape(SITE.name)} 의료진이 직접 쓰는 치과 칼럼 — 수면임플란트·인비절라인·라미네이트</description>
  <language>ko-KR</language>
  <lastBuildDate>${posts.length ? toRfc822(posts[0].created_at) : new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`
  return c.text(rss, 200, {
    'Content-Type': 'application/rss+xml; charset=utf-8',
    'Cache-Control': 'public, max-age=1800'
  })
})

// ============ Sitemap: Before & After Cases ============
app.get('/sitemap-cases.xml', async (c) => {
  const base = SITE.url
  // Sitemap protocol: <image:loc> MUST be absolute URL (https://...)
  const absUrl = (u: string | null | undefined): string => {
    if (!u) return ''
    if (/^https?:\/\//i.test(u)) return u
    if (u.startsWith('//')) return 'https:' + u
    if (u.startsWith('/')) return base + u
    return base + '/' + u
  }
  let ba: any
  try {
    ba = await c.env.DB.prepare(
      'SELECT id, title, og_image, intra_before_url, intra_after_url, pano_before_url, pano_after_url, before_alt, after_alt, treatment_slug, COALESCE(updated_at, created_at) as lastmod FROM before_afters WHERE is_published=1 AND COALESCE(noindex,0)=0 ORDER BY COALESCE(updated_at, created_at) DESC'
    ).all()
  } catch {
    ba = await c.env.DB.prepare(
      'SELECT id, title, intra_before_url, intra_after_url, pano_before_url, pano_after_url, treatment_slug, created_at as lastmod FROM before_afters WHERE is_published=1'
    ).all()
  }

  const urls: string[] = []
  ;(ba.results as any[]).forEach((b: any) => {
    const images: string[] = []
    const push = (url: string, title: string, caption: string) => {
      const abs = absUrl(url)
      if (!abs) return
      images.push(`    <image:image><image:loc>${xmlEscape(abs)}</image:loc><image:title>${xmlEscape(title)}</image:title><image:caption>${xmlEscape(caption)}</image:caption></image:image>`)
    }
    if (b.og_image) push(b.og_image, b.title || '치료 전후 사례', `${b.title || '치료 전후'} - 대구365치과 비포애프터`)
    const beforeUrl = b.intra_before_url || b.pano_before_url
    const afterUrl = b.intra_after_url || b.pano_after_url
    if (beforeUrl) push(beforeUrl, b.before_alt || `${b.title || '치료 전'} 비포`, b.before_alt || `${b.title || ''} 치료 전 사진`)
    if (afterUrl) push(afterUrl, b.after_alt || `${b.title || '치료 후'} 애프터`, b.after_alt || `${b.title || ''} 치료 후 사진`)
    const imgXml = images.length ? '\n' + images.join('\n') : ''
    urls.push(`  <url><loc>${base}/before-after/${b.id}</loc><lastmod>${sitemapIso(b.lastmod)}</lastmod><priority>0.85</priority><changefreq>monthly</changefreq>${imgXml}</url>`)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ Sitemap: Content — SEO Step3 선별 색인 복귀 (2026-07) ============
// Step1에서 전량 철수 → Step3에서 리라이트 완료된 용어(indexable=1)만 선별 복귀.
// 나머지 용어는 noindex 유지 + 사이트맵 미포함.
app.get('/sitemap-content.xml', async (c) => {
  const base = SITE.url
  let dict: any = { results: [] }
  try {
    dict = await c.env.DB.prepare(
      'SELECT slug, COALESCE(updated_at, created_at) as lastmod FROM dictionary WHERE indexable=1 ORDER BY COALESCE(updated_at, created_at) DESC'
    ).all()
  } catch {
    // indexable 컬럼 미적용 DB에서는 빈 사이트맵 유지 (안전 fallback)
  }

  const urls: string[] = []
  ;((dict.results || []) as any[]).forEach((d: any) =>
    urls.push(`  <url><loc>${base}/dictionary/${d.slug}</loc><lastmod>${sitemapIso(d.lastmod)}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`)
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600'
  })
})

// ============ Region SEO inline component ============
function RegionSEOInline({ r, treatments, doctors, mainTreatment, relatedRegions, relatedDict, regionFaqs }: any) {
  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-5xl mx-auto px-6">
          <nav class="text-xs text-brown-500 mb-6">
            <a href="/" class="hover:text-brown-900">홈</a>
            <span class="mx-2">›</span>
            <a href="/regions" class="hover:text-brown-900">지역별 진료</a>
            <span class="mx-2">›</span>
            <span class="text-brown-700">{r.region_name}</span>
            {mainTreatment && (<>
              <span class="mx-2">›</span>
              <span class="text-brown-900">{mainTreatment.name}</span>
            </>)}
          </nav>
          <div class="section-label mb-6">REGIONAL · {r.region_name}</div>
          <h1 class="display text-4xl md:text-6xl font-light mb-6 fade-in">{r.h1}</h1>
          <p class="text-brown-700 max-w-3xl text-lg leading-relaxed fade-in">{r.meta_description}</p>
          <div class="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="tel:053-357-0365" class="px-5 py-2.5 rounded-full bg-brown-900 text-ivory hover:bg-brown-800 transition">
              📞 053-357-0365 전화상담
            </a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="px-5 py-2.5 rounded-full bg-gold text-brown-900 hover:bg-gold-dark transition">
              네이버 예약
            </a>
            <a href="/directions" class="px-5 py-2.5 rounded-full border border-brown-300 text-brown-700 hover:bg-brown-100 transition">
              오시는 길
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section class="py-16 max-w-4xl mx-auto px-6 prose-dental fade-in" dangerouslySetInnerHTML={{__html: r.content}}></section>

      {/* Main treatment CTA — if linked to a treatment */}
      {mainTreatment && (
        <section class="py-12 bg-brown-50">
          <div class="max-w-4xl mx-auto px-6">
            <div class="lux-card flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div class="flex-1">
                <div class="text-xs text-brown-500 mb-2">{r.region_name} 환자분께 추천드리는 진료</div>
                <h2 class="display text-2xl md:text-3xl font-medium mb-3">{mainTreatment.name}</h2>
                <p class="text-brown-700">{mainTreatment.short_desc}</p>
              </div>
              <a href={`/treatments/${mainTreatment.slug}`} class="px-6 py-3 rounded-full bg-brown-900 text-ivory hover:bg-brown-800 transition whitespace-nowrap">
                자세히 보기 →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Clinic info card */}
      <section class="py-16 max-w-5xl mx-auto px-6">
        <h2 class="display text-3xl font-light mb-8">{r.region_name}에서 대구365치과까지</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="lux-card">
            <h3 class="display text-xl font-medium mb-4">병원 정보</h3>
            <dl class="space-y-3 text-sm">
              <div class="flex"><dt class="w-20 text-brown-500">주소</dt><dd class="flex-1 text-brown-800">{SITE.address}</dd></div>
              <div class="flex"><dt class="w-20 text-brown-500">전화</dt><dd class="flex-1 text-brown-800"><a href={`tel:${SITE.phone}`} class="hover:text-gold">{SITE.phone}</a></dd></div>
              <div class="flex"><dt class="w-20 text-brown-500">평일</dt><dd class="flex-1 text-brown-800">월·목 09:30–21:00 · 화·수·금 09:30–18:30</dd></div>
              <div class="flex"><dt class="w-20 text-brown-500">주말</dt><dd class="flex-1 text-brown-800">토·일 09:30–17:00</dd></div>
              <div class="flex"><dt class="w-20 text-brown-500">주차</dt><dd class="flex-1 text-brown-800">건물 주차장 이용 가능</dd></div>
            </dl>
          </div>
          <div class="lux-card">
            <h3 class="display text-xl font-medium mb-4">{r.region_name}에서 오시는 길</h3>
            <p class="text-brown-700 text-sm leading-relaxed">
              대구365치과는 <strong>대구 북구 침산동 엠브로스퀘어 7층</strong>에 위치한 400평 규모의 종합 치과입니다.
              {r.region_name === '침산동' && ' 침산동 거주 환자분은 도보 또는 자전거로 5~10분 내 방문 가능합니다.'}
              {r.region_name === '북구' && ' 북구 내에서는 자가용·버스로 10~20분, 도시철도 이용 시 대구역에서 환승하여 접근 가능합니다.'}
              {r.region_name === '수성구' && ' 수성구에서 자가용으로 20~30분, 신천대로·동대구로를 이용하면 편리하게 방문하실 수 있습니다.'}
              {r.region_name === '범어동' && ' 범어동에서 자가용 20~25분, 동대구로를 통해 빠르게 접근 가능합니다.'}
              {r.region_name === '중구' && ' 중구에서 자가용·버스로 10~15분, 도시철도 1호선 대구역 방면으로 쉽게 오실 수 있습니다.'}
              {r.region_name === '동구' && ' 동구에서 자가용으로 15~25분, 동북로·신천대로를 이용하시면 편리합니다.'}
              {r.region_name === '서구' && ' 서구에서 자가용으로 10~20분, 침산교를 건너 바로 도달 가능합니다.'}
              {r.region_name === '남구' && ' 남구에서 자가용으로 20~30분, 신천대로를 따라 북상하시면 됩니다.'}
              {r.region_name === '달서구' && ' 달서구에서 자가용으로 25~35분, 와룡로·서대구IC를 거쳐 오시면 편리합니다.'}
              {r.region_name === '달성군' && ' 달성군에서 자가용으로 30~40분, 중부내륙고속도로·서대구IC를 통해 접근 가능합니다.'}
              {r.region_name === '대구' && ' 대구 전역에서 자가용 30분 내 접근이 가능한 위치입니다.'}
              {r.region_name === '산격동' && ' 산격동에서 도보·자가용으로 5~10분 내 도착 가능한 가까운 거리입니다.'}
            </p>
            <a href="/directions" class="inline-block mt-4 text-sm text-gold hover:text-gold-dark">오시는 길 자세히 →</a>
          </div>
        </div>
      </section>

      {/* Core treatments showcase */}
      <section class="py-16 bg-cream">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="display text-3xl font-light mb-8">{r.region_name} 환자분이 자주 찾는 진료</h2>
          <div class="grid md:grid-cols-3 gap-4">
            {treatments.filter((t: any) => t.is_core).slice(0, 6).map((t: any) => (
              <a href={`/treatments/${t.slug}`} class="lux-card hover:shadow-lg transition">
                <div class="display text-xl font-medium mb-2">{t.name}</div>
                <p class="text-brown-700 text-sm">{t.short_desc}</p>
                <div class="mt-3 text-xs text-gold">자세히 보기 →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — region/treatment context (rich result eligible) */}
      {regionFaqs && regionFaqs.length > 0 && (
        <section class="py-16 max-w-4xl mx-auto px-6">
          <div class="section-label mb-6">FAQ · 자주 묻는 질문</div>
          <h2 class="display text-3xl font-light mb-8">
            {r.region_name} 환자분이 자주 묻는 질문{mainTreatment ? ` — ${mainTreatment.name}` : ''}
          </h2>
          <div class="space-y-4">
            {regionFaqs.map((f: any, i: number) => (
              <details class="lux-card group" open={i === 0}>
                <summary class="cursor-pointer list-none flex items-start gap-3">
                  <span class="text-gold font-medium mt-0.5 flex-shrink-0">Q{i + 1}.</span>
                  <span class="display text-lg font-medium flex-1">{f.question}</span>
                  <span class="text-brown-400 group-open:rotate-180 transition flex-shrink-0">▾</span>
                </summary>
                <div class="mt-4 pl-9 text-brown-700 leading-relaxed whitespace-pre-line">{f.answer}</div>
              </details>
            ))}
          </div>
          <div class="mt-8 text-center">
            <a href="/faq" class="text-sm text-gold hover:text-gold-dark">전체 FAQ 보기 →</a>
          </div>
        </section>
      )}

      {/* Related dictionary terms — internal linking gold */}
      {relatedDict && relatedDict.length > 0 && (
        <section class="py-16 max-w-5xl mx-auto px-6">
          <h2 class="display text-3xl font-light mb-8">관련 치과 용어</h2>
          <div class="grid md:grid-cols-2 gap-3">
            {relatedDict.map((d: any) => (
              <a href={`/dictionary/${d.slug}`} class="p-5 rounded-xl bg-cream hover:bg-brown-100 transition">
                <div class="display text-lg font-medium mb-1">{d.term}</div>
                <div class="text-xs text-brown-600 line-clamp-2">{d.short_desc}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related regional pages — hub-and-spoke */}
      {relatedRegions && relatedRegions.length > 0 && (
        <section class="py-16 bg-brown-50">
          <div class="max-w-5xl mx-auto px-6">
            <h2 class="display text-3xl font-light mb-8">관련 지역별 진료 안내</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {relatedRegions.map((rr: any) => (
                <a href={`/region/${rr.slug}`} class="p-4 rounded-xl bg-ivory border border-brown-200 hover:border-gold hover:shadow-md transition">
                  <div class="text-xs text-brown-500 mb-1">{rr.region_name}</div>
                  <div class="display font-medium text-sm">{rr.h1}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section class="py-20 bg-brown-900 text-ivory text-center">
        <div class="max-w-3xl mx-auto px-6">
          <h2 class="display text-3xl md:text-4xl font-light mb-4">
            {r.region_name}에서 가까운 대구365치과
          </h2>
          <p class="text-brown-200 mb-8">평일 야간진료 (월·목 21시까지) · 주말 진료 · 무료 주차</p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href={`tel:${SITE.phone}`} class="px-6 py-3 rounded-full bg-gold text-brown-900 hover:bg-gold-dark transition">📞 {SITE.phone}</a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="px-6 py-3 rounded-full border border-ivory text-ivory hover:bg-ivory hover:text-brown-900 transition">네이버 예약</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

// ============ 404 / 500 핸들러 (SEO 친화적) ============
// GSC "찾을 수 없음(404)" soft-404 회피용 + 사용자 친화 페이지
// 명시적으로 status 404 반환 (soft 404 회피 핵심)
app.notFound((c) => {
  c.status(404)
  c.res.headers.set('X-Robots-Tag', 'noindex')
  return c.render(
    <>
      <Navbar />
      <section class="pt-32 pb-20 bg-cream min-h-[60vh] flex items-center">
        <div class="max-w-3xl mx-auto px-6 text-center">
          <div class="text-7xl md:text-9xl font-light text-brown-300 mb-6">404</div>
          <h1 class="display text-3xl md:text-5xl font-light mb-6">
            페이지를 찾을 수 없습니다
          </h1>
          <p class="text-brown-700 text-lg mb-10 leading-relaxed">
            요청하신 페이지가 존재하지 않거나, 이동했을 수 있습니다.<br />
            아래 주요 페이지로 이동하시거나 검색을 이용해 주세요.
          </p>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-sm">
            <a href="/" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">홈</div>
              <div class="text-xs text-brown-600">대구365치과 메인</div>
            </a>
            <a href="/treatments" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">진료안내</div>
              <div class="text-xs text-brown-600">수면임플란트 · 인비절라인 · 라미네이트</div>
            </a>
            <a href="/regions" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">지역별 진료</div>
              <div class="text-xs text-brown-600">대구·북구·수성구·범어동</div>
            </a>
            <a href="/doctors" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">의료진</div>
              <div class="text-xs text-brown-600">6명 협진 시스템</div>
            </a>
            <a href="/before-after" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">치료 사례</div>
              <div class="text-xs text-brown-600">Before & After</div>
            </a>
            <a href="/directions" class="lux-card hover:bg-brown-50 transition text-left">
              <div class="display text-lg font-medium mb-1">오시는 길</div>
              <div class="text-xs text-brown-600">침산동 엠브로스퀘어 7층</div>
            </a>
          </div>
          <div class="flex flex-wrap justify-center gap-3 text-sm">
            <a href={`tel:${SITE.phone}`} class="px-6 py-3 rounded-full bg-brown-900 text-ivory hover:bg-brown-800 transition">
              📞 {SITE.phone}
            </a>
            <a href="https://naver.me/GhSIroMf" target="_blank" rel="noopener" class="px-6 py-3 rounded-full bg-gold text-brown-900 hover:bg-gold-dark transition">
              네이버 예약
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>,
    {
      title: '404 - 페이지를 찾을 수 없습니다',
      description: '요청하신 페이지를 찾을 수 없습니다. 대구365치과의 진료안내, 지역별 진료, 의료진 정보를 확인해 보세요.',
      robots: 'noindex, nofollow'
    }
  )
})

app.onError((err, c) => {
  console.error('App error:', err)
  c.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return c.render(
    <>
      <Navbar />
      <section class="pt-32 pb-20 bg-cream min-h-[60vh] flex items-center">
        <div class="max-w-3xl mx-auto px-6 text-center">
          <div class="text-7xl md:text-9xl font-light text-brown-300 mb-6">500</div>
          <h1 class="display text-3xl md:text-5xl font-light mb-6">
            일시적인 오류가 발생했습니다
          </h1>
          <p class="text-brown-700 text-lg mb-10">
            잠시 후 다시 시도해 주세요. 문제가 지속되면 아래 연락처로 문의 부탁드립니다.
          </p>
          <div class="flex flex-wrap justify-center gap-3 text-sm">
            <a href="/" class="px-6 py-3 rounded-full bg-brown-900 text-ivory hover:bg-brown-800 transition">홈으로</a>
            <a href={`tel:${SITE.phone}`} class="px-6 py-3 rounded-full bg-gold text-brown-900 hover:bg-gold-dark transition">📞 {SITE.phone}</a>
          </div>
        </div>
      </section>
      <Footer />
    </>,
    {
      title: '500 - 서버 오류',
      description: '일시적인 오류가 발생했습니다.',
      robots: 'noindex, nofollow'
    }
  )
})

export default app
