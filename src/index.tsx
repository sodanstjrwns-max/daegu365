import { Hono } from 'hono'
import {
  renderer, SITE,
  medicalProcedureSchema, physicianSchema, videoObjectSchema, articleSchema
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
import { ImplantTreatmentPage } from './pages/treatments-implant'
import { LamineerTreatmentPage } from './pages/treatments-lamineer'
import { OrthoTreatmentPage } from './pages/treatments-ortho'
import { SleepTherapyTreatmentPage } from './pages/treatments-sleep'
import { PainlessAnesthesiaTreatmentPage } from './pages/treatments-anesthesia'
import { AirflowGBTTreatmentPage } from './pages/treatments-airflow'
import { PediatricOrthoTreatmentPage } from './pages/treatments-pediatric-ortho'
import { PediatricTreatmentPage } from './pages/treatments-pediatric'
import { CavityTreatmentPage } from './pages/treatments-cavity'
import { PerioTreatmentPage } from './pages/treatments-perio'
import { WhiteningTreatmentPage } from './pages/treatments-whitening'
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
import { SignupPage, LoginPage, AdminLoginPage } from './pages/auth'
import { Navbar, Footer } from './components/Layout'
import {
  AdminDashboard, AdminMembersPage,
  AdminBAListPage, AdminBAFormPage,
  AdminBlogListPage, AdminBlogFormPage,
  AdminNoticesListPage, AdminNoticeFormPage
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
  'lamineer': {
    name: 'VINIQUE 라미네이트',
    description: '0.3mm 미세 보철 프리미엄 라미네이트. 이마젝스·E.max·지르코니아 라미네이트로 자연치 삭제를 최소화하고, 원내 디지털 기공실(D.LAB)에서 즉시 색상·교합 조정. 결혼·면접·이벤트 직전에도 가능한 심미 보철.',
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
    description: '가글마취 → 도포마취 → 컴퓨터 제어 무통마취기(The Wand) → 본마취. 모든 진료에 기본 적용되는 추가 비용 없는 4단계 프로토콜. 바늘이 들어가는 그 순간을 없앱니다.',
    bodyLocation: '구강',
    procedureType: 'TherapeuticProcedure',
    preparation: '특별한 준비 불필요',
    followup: '시술 후 마취 풀림 1~2시간 내 식사 가능',
    howPerformed: '1단계 가글마취(점막 1차 둔감화) → 2단계 도포마취(주사 부위 표면 마취) → 3단계 The Wand 컴퓨터 제어(0.005mL/sec 초저속 주입) → 4단계 본마취',
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
    description: '치과공포증 의사가 설계한 어린이 진료. TSD(Tell-Show-Do)·웃음가스·수면치료까지 협조도 3단계 맞춤 시스템 + 4단계 무통마취 기본 적용. 아이의 첫 치과, 평생을 결정합니다.',
    bodyLocation: '소아 구강',
    procedureType: 'TherapeuticProcedure',
    preparation: '진료 전 친숙화(클리닉 투어), 부모 사전 동의',
    followup: '3개월 정기 검진, 불소 도포 6개월 권장',
    howPerformed: '협조도 평가 → TSD 행동 유도 → 필요 시 웃음가스(N2O) → 협조 어려울 때 수면치료 → 불소 도포·실런트 마무리',
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

/** 슬러그로 MedicalProcedure 스키마 가져오기 */
const procedureSchemaFor = (slug: string) => {
  const meta = PROCEDURE_META[slug]
  if (!meta) return null
  return medicalProcedureSchema({ slug, ...meta })
}

// ============ 원장 인터뷰 영상 메타 ============
const DOCTOR_INTERVIEW_DESC: Record<string, string> = {
  'kim-seongju': '대구365치과 김성주 대표원장의 진료 철학과 병원 비전 인터뷰. 치과공포증을 가졌던 의사가 설계한 두려움 없는 치과의 시작.',
  'jung-jaeheon': '대구365치과 정재헌 원장의 진료 철학과 전문 분야 인터뷰.',
  'kim-sangwon': '대구365치과 김상원 원장의 진료 철학과 전문 분야 인터뷰.',
  'choi-hyejung': '대구365치과 최혜정 원장의 진료 철학과 전문 분야 인터뷰.',
  'kim-jinduk': '대구365치과 김진덕 원장의 진료 철학과 전문 분야 인터뷰.',
  'han-jieun': '대구365치과 한지은 원장의 진료 철학과 전문 분야 인터뷰.',
  'lee-seoyoung': '대구365치과 이서영 원장의 진료 철학과 전문 분야 인터뷰.',
}

// ============ Public pages ============
app.get('/', (c) => c.render(<HomePage />, {
  title: '대구 북구 치과 · 수면임플란트 · 인비절라인 전문',
  description: '치과가 두려웠던 의사가 만든 대구365치과. 치과공포증 환자를 위한 수면임플란트, 인비절라인, 라미네이트 전문. 월·목 21시까지, 주말 진료.',
  canonical: 'https://daegu365dc.pages.dev/',
  ogImage: ogUrl.default('치과가 두려워도', '괜찮습니다.'),
  breadcrumb: [{ name: '홈', url: '/' }]
}))

app.get('/mission', (c) => c.render(<MissionPage />, {
  title: '병원 미션',
  description: '치과가 무서웠던 한 의사의 다짐 — 치과 진입의 허들을 낮추고 경험의 혁신을 이룩한다.',
  canonical: 'https://daegu365dc.pages.dev/mission',
  ogImage: ogUrl.default('치과의 진입 허들을', '낮추는 일.'),
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '병원 미션', url: '/mission' }
  ]
}))

// --- Doctors ---
app.get('/doctors', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY is_representative DESC, display_order, id').all()
  return c.render(<DoctorsListPage doctors={r.results as any} />, {
    title: '의료진 소개',
    description: '대구365치과 7인의 의료진. 보존·치주·소아·교정·보철·심미 각 분야 전문 협진.',
    canonical: 'https://daegu365dc.pages.dev/doctors',
    ogImage: ogUrl.default('의료진 소개', '7인의 전문 협진.'),
    ogType: 'profile',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '의료진', url: '/doctors' }
    ]
  })
})

app.get('/doctors/:slug', async (c) => {
  const slug = c.req.param('slug')
  const doctor = await c.env.DB.prepare('SELECT * FROM doctors WHERE slug=?').bind(slug).first<any>()
  if (!doctor) return c.notFound()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments').all()
  const cases = await c.env.DB.prepare('SELECT * FROM before_afters WHERE doctor_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
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
    <DoctorDetailPage doctor={doctor} treatments={treatments.results as any} cases={cases.results as any} />, {
      title: `${doctor.name} ${doctor.position}`,
      description: `${doctor.name} ${doctor.position} — ${doctor.philosophy?.substring(0,140) || ''}`,
      canonical: `https://daegu365dc.pages.dev/doctors/${slug}`,
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
  return c.render(<TreatmentsListPage treatments={r.results as any} />, {
    title: '진료 안내',
    description: '대구365치과의 전체 진료 과목. 수면임플란트·라미네이트·인비절라인 3대 핵심 진료.',
    canonical: 'https://daegu365dc.pages.dev/treatments',
    ogImage: ogUrl.default('진료 안내', '평생 가는 치료.'),
    breadcrumb: [
      { name: '홈', url: 'https://daegu365dc.pages.dev/' },
      { name: '진료 안내', url: 'https://daegu365dc.pages.dev/treatments' }
    ]
  })
})

app.get('/treatments/:slug', async (c) => {
  const slug = c.req.param('slug')
  const treatment = await c.env.DB.prepare('SELECT * FROM treatments WHERE slug=?').bind(slug).first<any>()
  if (!treatment) return c.notFound()
  await c.env.DB.prepare('UPDATE treatments SET view_count=view_count+1 WHERE id=?').bind(treatment.id).run()

  const faqs = await c.env.DB.prepare('SELECT * FROM faqs WHERE treatment_slug=? ORDER BY display_order, id').bind(slug).all()
  // Doctors who specialize
  const allDocs = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const doctors = (allDocs.results as any[]).filter(d => {
    try { return JSON.parse(d.specialties || '[]').includes(slug) } catch { return false }
  })
  const cases = await c.env.DB.prepare('SELECT * FROM before_afters WHERE treatment_slug=? AND is_published=1 ORDER BY id DESC LIMIT 6').bind(slug).all()
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
  // 진료 페이지 공통 스키마 배열 (Procedure + FAQ)
  const treatmentSchemas: any[] = procSchema ? [procSchema, faqJsonLd] : [faqJsonLd]
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
        canonical: `https://daegu365dc.pages.dev/treatments/implant`,
        ogImage: ogUrl.treatment('수면임플란트', '잠든 사이, 평생 가는 임플란트', '임플란트'),
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
        description: `0.3mm 미세 보철, 이마젝스·E.max·지르코니아 라미네이트. 자연치 삭제 최소화, In-house D.LAB 디지털 보철. 대구365치과 VINIQUE 라미네이트.`,
        canonical: `https://daegu365dc.pages.dev/treatments/lamineer`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/ortho`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/sleep-therapy`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/painless-anesthesia`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/airflow-gbt`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/pediatric-ortho`,
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
        description: `치과공포증 의사가 설계한 어린이 진료. TSD·웃음가스·수면치료까지 협조도 3단계 맞춤 시스템 + 4단계 무통마취 기본 적용. 대구365치과.`,
        canonical: `https://daegu365dc.pages.dev/treatments/pediatric`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/cavity-endo-crown`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/perio`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/whitening`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/icon-resin`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/qray`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/prosthetic`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/in-house-lab`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/prevention`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/aesthetic`,
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
        canonical: `https://daegu365dc.pages.dev/treatments/conservative`,
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
      canonical: `https://daegu365dc.pages.dev/treatments/${slug}`,
      breadcrumb: treatmentBC,
      jsonLd: treatmentSchemas
    }
  )
})

// --- Before/After ---
app.get('/before-after', async (c) => {
  const session = await getSession(c)
  const { treatment, doctor, region, age, gender } = c.req.query()

  const where: string[] = ['is_published=1']
  const binds: any[] = []
  if (treatment) { where.push('treatment_slug=?'); binds.push(treatment) }
  if (doctor) { where.push('doctor_slug=?'); binds.push(doctor) }
  if (age) { where.push('age_group=?'); binds.push(age) }
  if (gender) { where.push('gender=?'); binds.push(gender) }
  if (region) {
    where.push('(region_dong LIKE ? OR region_sigungu LIKE ? OR region_sido LIKE ?)')
    binds.push(`%${region}%`, `%${region}%`, `%${region}%`)
  }
  const q = `SELECT * FROM before_afters WHERE ${where.join(' AND ')} ORDER BY id DESC`
  const items = await c.env.DB.prepare(q).bind(...binds).all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors ORDER BY display_order').all()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC, display_order').all()

  return c.render(
    <BeforeAfterListPage
      items={items.results as any}
      doctors={doctors.results as any}
      treatments={treatments.results as any}
      filters={{ treatment, doctor, region, age, gender }}
      isLoggedIn={!!session}
    />, {
      title: '비포애프터 — 실제 치료 사례',
      description: '대구365치과 실제 치료 사례. 수면임플란트, 라미네이트, 인비절라인 등 검증된 결과.',
      canonical: 'https://daegu365dc.pages.dev/before-after',
      ogImage: ogUrl.beforeAfter('실제 치료 사례', '검증된 결과'),
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '비포애프터', url: '/before-after' }
      ]
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
  return c.render(
    <BeforeAfterDetailPage item={item} doctor={doctor} treatment={treatment} isLoggedIn={!!session} />, {
      title: `${item.title} · 치료사례`,
      description: item.description?.substring(0, 160) || '',
      canonical: `https://daegu365dc.pages.dev/before-after/${id}`,
      ogImage: ogUrl.beforeAfter(
        item.title,
        treatment?.name || undefined,
        doctor?.name ? `${doctor.name} ${doctor.position || ''}`.trim() : undefined
      ),
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '비포애프터', url: '/before-after' },
        { name: item.title, url: `/before-after/${id}` }
      ],
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "MedicalCaseStudy",
        "@id": `${SITE.url}/before-after/${id}#case`,
        "name": item.title,
        "description": item.description || '',
        "url": `${SITE.url}/before-after/${id}`,
        ...(item.before_image && { "image": [item.before_image, item.after_image].filter(Boolean) }),
        ...(treatment && {
          "medicalSpecialty": "Dentistry",
          "about": {
            "@type": "MedicalProcedure",
            "@id": `${SITE.url}/treatments/${treatment.slug}#procedure`,
            "name": treatment.name
          }
        }),
        ...(doctor && {
          "author": {
            "@id": `${SITE.url}/doctors/${doctor.slug}#physician`,
            "@type": "Physician",
            "name": doctor.name
          }
        }),
        "provider": { "@id": `${SITE.url}/#dentist` }
      }
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
    canonical: 'https://daegu365dc.pages.dev/blog',
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

  return c.render(<BlogDetailPage post={post} author={author} related={related.results as any} />, {
    title: post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords,
    canonical: `https://daegu365dc.pages.dev/blog/${slug}`,
    ogImage: ogUrl.blog(post.title, author?.name ? `${author.name} ${author.position || ''}`.trim() : undefined),
    ogType: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.updated_at || post.created_at,
    author: author?.name || '대구365치과',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' },
      { name: post.title, url: `/blog/${slug}` }
    ],
    jsonLd: articleSchema({
      title: post.title,
      description: post.meta_description || post.excerpt || '',
      slug,
      authorName: author?.name,
      authorSlug: author?.slug,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      image: post.thumbnail_url || ogUrl.blog(post.title)
    })
  })
})

// --- Notices ---
app.get('/notices', async (c) => {
  const r = await c.env.DB.prepare('SELECT * FROM notices WHERE is_published=1 ORDER BY is_main DESC, id DESC').all()
  return c.render(<NoticeListPage notices={r.results as any} />, {
    title: '공지사항',
    canonical: 'https://daegu365dc.pages.dev/notices',
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
    canonical: `https://daegu365dc.pages.dev/notices/${id}`,
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
  return c.render(<DictionaryListPage items={r.results as any} selectedCategory={category} query={q} />, {
    title: '치과 백과사전 · 500+ 용어',
    description: '치과 용어 500여 개를 담은 대구365치과 백과사전. 임플란트·교정·라미네이트 등 전문 용어 해설.',
    canonical: 'https://daegu365dc.pages.dev/dictionary',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '치과 백과사전', url: '/dictionary' }
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": `${SITE.url}/dictionary#termset`,
      "name": "대구365치과 치과 백과사전",
      "description": "치과 용어 500여 개를 담은 대구365치과 백과사전",
      "url": `${SITE.url}/dictionary`,
      "inLanguage": "ko-KR",
      "publisher": { "@id": `${SITE.url}/#dentist` }
    }
  })
})

app.get('/dictionary/:slug', async (c) => {
  const slug = c.req.param('slug')
  const entry = await c.env.DB.prepare('SELECT * FROM dictionary WHERE slug=?').bind(slug).first<any>()
  if (!entry) return c.notFound()
  await c.env.DB.prepare('UPDATE dictionary SET view_count=view_count+1 WHERE id=?').bind(entry.id).run()

  const relSlugs: string[] = (() => { try { return JSON.parse(entry.related_treatments || '[]') } catch { return [] } })()
  let relatedTreatments: any[] = []
  if (relSlugs.length) {
    const ph = relSlugs.map(() => '?').join(',')
    const rr = await c.env.DB.prepare(`SELECT * FROM treatments WHERE slug IN (${ph})`).bind(...relSlugs).all()
    relatedTreatments = rr.results as any[]
  }
  const relatedEntries = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category=? AND id!=? ORDER BY RANDOM() LIMIT 6').bind(entry.category, entry.id).all()

  return c.render(<DictionaryDetailPage entry={entry} relatedTreatments={relatedTreatments} relatedEntries={relatedEntries.results as any} />, {
    title: `${entry.term} - 치과 용어사전`,
    description: entry.short_desc,
    canonical: `https://daegu365dc.pages.dev/dictionary/${slug}`,
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '치과 백과사전', url: '/dictionary' },
      { name: entry.term, url: `/dictionary/${slug}` }
    ],
    jsonLd: {
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
    }
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
    canonical: 'https://daegu365dc.pages.dev/faq',
    breadcrumb: [
      { name: '홈', url: '/' },
      { name: '자주 묻는 질문', url: '/faq' }
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.url}/faq#faq`,
      "mainEntity": (faqs.results as any[]).slice(0, 50).map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  })
})

// --- Visitor info ---
app.get('/directions', (c) => c.render(<DirectionsPage />, {
  title: '오시는 길 · 내원 안내',
  description: '대구365치과 위치·주차·대중교통 안내. 대구광역시 북구 침산로 148 엠브로스퀘어 7층. 053-357-0365.',
  canonical: 'https://daegu365dc.pages.dev/directions',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '오시는 길', url: '/directions' }
  ]
}))
app.get('/hours', (c) => c.render(<HoursPage />, {
  title: '진료시간',
  description: '대구365치과 진료시간. 월·목 09:30~21:00 야간진료, 주말도 진료. 365일 연중 환자 곁에.',
  canonical: 'https://daegu365dc.pages.dev/hours',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '진료시간', url: '/hours' }
  ]
}))
app.get('/fees', (c) => c.render(<FeesPage />, {
  title: '비급여 의료수가표 · 수가 안내',
  description: '대구365치과 비급여 의료수가표. 임플란트·교정·라미네이트·보철·소아치과 등 전 항목 투명 공개. 진료 전 정확한 비용을 안내드립니다.',
  canonical: 'https://daegu365dc.pages.dev/fees',
  breadcrumb: [
    { name: '홈', url: '/' },
    { name: '비급여 의료수가표', url: '/fees' }
  ]
}))

// --- Region SEO pages ---
app.get('/region/:slug', async (c) => {
  const slug = c.req.param('slug')
  const r = await c.env.DB.prepare('SELECT * FROM region_seo WHERE slug=?').bind(slug).first<any>()
  if (!r) return c.notFound()
  await c.env.DB.prepare('UPDATE region_seo SET view_count=view_count+1 WHERE id=?').bind(r.id).run()
  const treatments = await c.env.DB.prepare('SELECT * FROM treatments ORDER BY is_core DESC').all()
  const doctors = await c.env.DB.prepare('SELECT * FROM doctors WHERE is_representative=1 OR display_order<=3').all()
  return c.render(
    <RegionSEOInline r={r} treatments={treatments.results as any} doctors={doctors.results as any} />,
    {
      title: r.title, description: r.meta_description,
      canonical: `https://daegu365dc.pages.dev/region/${slug}`,
      breadcrumb: [
        { name: '홈', url: '/' },
        { name: '지역별 진료', url: '/' },
        { name: r.h1 || r.title, url: `/region/${slug}` }
      ]
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
  'lee-seoyoung': '이서영_인터뷰_master.mp4',
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

  // 최근 활동
  const [recentBA, recentBlog, recentNotice, recentMembers] = await Promise.all([
    DB.prepare('SELECT id,title,is_published,created_at FROM before_afters ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,title,slug,is_published,created_at FROM blog_posts ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,title,is_main,is_published,created_at FROM notices ORDER BY id DESC LIMIT 5').all(),
    DB.prepare('SELECT id,name,email,created_at FROM members ORDER BY id DESC LIMIT 5').all(),
  ])
  stats.recent = {
    ba: recentBA.results,
    blog: recentBlog.results,
    notice: recentNotice.results,
    members: recentMembers.results,
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
    `INSERT INTO before_afters (title,description,pano_before_url,pano_after_url,intra_before_url,intra_after_url,age_group,gender,treatment_slug,region_sido,region_sigungu,region_dong,doctor_slug,treatment_period,is_published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0
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
    `UPDATE before_afters SET title=?,description=?,pano_before_url=?,pano_after_url=?,intra_before_url=?,intra_after_url=?,age_group=?,gender=?,treatment_slug=?,region_sido=?,region_sigungu=?,region_dong=?,doctor_slug=?,treatment_period=?,is_published=? WHERE id=?`
  ).bind(
    String(b.title||''), String(b.description||''),
    String(b.pano_before_url||'') || null, String(b.pano_after_url||'') || null,
    String(b.intra_before_url||'') || null, String(b.intra_after_url||'') || null,
    String(b.age_group||''), String(b.gender||''),
    String(b.treatment_slug||''), String(b.region_sido||''),
    String(b.region_sigungu||''), String(b.region_dong||''),
    String(b.doctor_slug||''), String(b.treatment_period||''),
    b.is_published ? 1 : 0, id
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
    `INSERT INTO blog_posts (slug,title,excerpt,content,thumbnail_url,author_doctor_slug,meta_description,meta_keywords,is_published)
     VALUES (?,?,?,?,?,?,?,?,?)`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''), b.is_published ? 1 : 0
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
    `UPDATE blog_posts SET slug=?,title=?,excerpt=?,content=?,thumbnail_url=?,author_doctor_slug=?,meta_description=?,meta_keywords=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(
    String(b.slug||''), String(b.title||''), String(b.excerpt||''),
    String(b.content||''), String(b.thumbnail_url||'') || null,
    String(b.author_doctor_slug||''), String(b.meta_description||''),
    String(b.meta_keywords||''), b.is_published ? 1 : 0, id
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

// ============ robots + sitemap + llms.txt ============
app.get('/robots.txt', (c) => {
  // 2025년 표준: AI 크롤러도 명시적으로 허용 (GPTBot, ClaudeBot, PerplexityBot 등)
  // 단, 관리자 영역과 인증 영역은 차단
  const txt = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /login',
    'Disallow: /signup',
    'Disallow: /logout',
    'Disallow: /api/admin/',
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
    `Host: ${SITE.url.replace(/^https?:\/\//, '')}`,
    ''
  ].join('\n')
  return c.text(txt, 200, { 'Content-Type': 'text/plain; charset=utf-8' })
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
  lines.push(`- 의료진: 7명 협진 시스템`)
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
  lines.push(`- [비급여 의료수가표](${base}/fees)`)
  lines.push(`- [오시는 길](${base}/directions)`)
  lines.push('')
  lines.push('## 차별점')
  lines.push('- 4단계 무통마취: 모든 진료 기본 적용 (가글마취 → 도포마취 → The Wand 컴퓨터 제어 → 본마취)')
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

app.get('/sitemap.xml', async (c) => {
  const base = SITE.url
  // 컬럼 가용성: updated_at 보유 = blog_posts, notices / 그 외 테이블은 created_at 만 있음
  const [doctors, treatments, blogs, ba, dict, regions, notices] = await Promise.all([
    c.env.DB.prepare('SELECT slug, created_at FROM doctors').all(),
    c.env.DB.prepare('SELECT slug, created_at FROM treatments').all(),
    c.env.DB.prepare('SELECT slug, updated_at, created_at FROM blog_posts WHERE is_published=1').all(),
    c.env.DB.prepare('SELECT id, created_at FROM before_afters WHERE is_published=1').all(),
    c.env.DB.prepare('SELECT slug, created_at FROM dictionary').all(),
    c.env.DB.prepare('SELECT slug, created_at FROM region_seo').all(),
    c.env.DB.prepare('SELECT id, updated_at, created_at FROM notices WHERE is_published=1').all(),
  ])

  // ISO 8601 형식 lastmod 변환 (없으면 빈 문자열 → 태그 생략)
  const iso = (v: any): string => {
    if (!v) return ''
    try {
      const d = new Date(typeof v === 'string' ? v.replace(' ', 'T') : v)
      if (isNaN(d.getTime())) return ''
      return d.toISOString().substring(0, 10) // YYYY-MM-DD
    } catch { return '' }
  }
  const todayIso = new Date().toISOString().substring(0, 10)

  const urls: string[] = []
  const add = (loc: string, pri = '0.8', chf = 'weekly', lastmod = todayIso) => {
    const lm = lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
    urls.push(`<url><loc>${base}${loc}</loc>${lm}<priority>${pri}</priority><changefreq>${chf}</changefreq></url>`)
  }

  // 정적 페이지
  add('/', '1.0', 'daily')
  add('/mission', '0.9', 'monthly')
  add('/doctors', '0.9', 'monthly')
  add('/treatments', '0.9', 'monthly')
  add('/before-after', '0.9', 'weekly')
  add('/blog', '0.9', 'weekly')
  add('/notices', '0.7', 'weekly')
  add('/dictionary', '0.8', 'monthly')
  add('/faq', '0.8', 'monthly')
  add('/directions', '0.7', 'yearly')
  add('/hours', '0.6', 'yearly')
  add('/fees', '0.7', 'monthly')

  // 동적 페이지 (lastmod 자동 반영)
  ;(doctors.results as any[]).forEach((d: any) =>
    add(`/doctors/${d.slug}`, '0.8', 'monthly', iso(d.created_at))
  )
  ;(treatments.results as any[]).forEach((t: any) =>
    add(`/treatments/${t.slug}`, '0.9', 'monthly', iso(t.created_at))
  )
  ;(blogs.results as any[]).forEach((b: any) =>
    add(`/blog/${b.slug}`, '0.7', 'weekly', iso(b.updated_at || b.created_at))
  )
  ;(ba.results as any[]).forEach((b: any) =>
    add(`/before-after/${b.id}`, '0.7', 'monthly', iso(b.created_at))
  )
  ;(notices.results as any[]).forEach((n: any) =>
    add(`/notices/${n.id}`, '0.6', 'monthly', iso(n.updated_at || n.created_at))
  )
  ;(dict.results as any[]).forEach((d: any) =>
    add(`/dictionary/${d.slug}`, '0.5', 'monthly', iso(d.created_at))
  )
  ;(regions.results as any[]).forEach((r: any) =>
    add(`/region/${r.slug}`, '0.7', 'monthly', iso(r.created_at))
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  return c.text(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8' })
})

// ============ Region SEO inline component ============
function RegionSEOInline({ r, treatments, doctors }: any) {
  return (
    <>
      <Navbar />
      <section class="pt-20 pb-12 bg-cream">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <div class="section-label mb-6">REGIONAL</div>
          <h1 class="display text-5xl md:text-7xl font-light mb-6 fade-in">{r.h1}</h1>
          <p class="text-brown-700 max-w-2xl mx-auto fade-in">{r.meta_description}</p>
        </div>
      </section>
      <section class="py-16 max-w-4xl mx-auto px-6 prose-dental fade-in" dangerouslySetInnerHTML={{__html: r.content}}></section>

      <section class="py-16 bg-cream">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="display text-3xl font-light mb-8">주요 진료</h2>
          <div class="grid md:grid-cols-3 gap-4">
            {treatments.filter((t: any) => t.is_core).map((t: any) => (
              <a href={`/treatments/${t.slug}`} class="lux-card">
                <div class="display text-2xl font-medium mb-2">{t.name}</div>
                <p class="text-brown-700 text-sm">{t.short_desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default app
