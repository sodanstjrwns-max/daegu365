# 대구365치과 (Daegu365 Dental Clinic) — 공식 홈페이지

> 치과가 무서웠던 의사가 만든 치과. 수면임플란트·인비절라인·라미네이트 전문.
> **대구 북구 침산로 148 엠브로스퀘어 7층**

## 🔗 현재 접속 URL
- **샌드박스 미리보기**: https://3000-i0rsckxmwjmswcrcqzqer-d0b9e1e2.sandbox.novita.ai
- **로컬**: http://localhost:3000
- **프로덕션(라이브)**: https://daegu365dc.pages.dev
- **GitHub**: https://github.com/sodanstjrwns-max/daegu365 (push → GitHub Actions 자동 배포)

---

## ✅ 완성된 기능 (현재 상태)

### 1. 퍼블릭 사이트 (비회원 열람)
| URL | 설명 |
|---|---|
| `/` | 홈 — 히어로, 미션, 3대 핵심 진료, 의료진 7명, Why Us, CTA |
| `/mission` | 병원 미션 풀블리드 히어로 (치과공포증 의사의 다짐) |
| `/doctors` | 의료진 전체 목록 |
| `/doctors/:slug` | 개별 원장 프로필 (철학/학력/경력/**8단 인터뷰**/Q&A/시그니처/담당 케이스/**인터뷰 영상**) |
| `/treatments` | 진료 안내 (핵심 3개 + 기타 9개) |
| `/treatments/:slug` | 개별 진료 상세 (핵심은 WHY US·PROCESS·FAQ·담당 원장·사례·용어사전) |
| `/before-after` | 비포애프터 목록 (필터: 진료·원장·지역·연령·성별) |
| `/before-after/:id` | 상세 — **Before/After 슬라이드 비교**, 애프터는 로그인 시에만 공개 |
| `/blog` | 블로그 목록 (작성자 = 원장) |
| `/blog/:slug` | 블로그 본문 (h-태그 SEO 구조, 관련 글) |
| `/notices` | 공지사항 목록 (대장 공지 상단 고정) |
| `/notices/:id` | 공지 상세 |
| `/dictionary` | **500+ 용어 백과사전** — 가나다 그룹핑, 카테고리/검색 |
| `/dictionary/:slug` | 용어 상세 + 관련 진료 + 비슷한 용어 |
| `/faq` | **진료 과목별 FAQ 통합** (250+ 질문) |
| `/directions` | 오시는 길 (카카오맵 임베드 + 주소·연락처·대중교통) |
| `/hours` | 진료시간 (월·목 21시, 주말 17시) |
| `/fees` | 수가 안내 |
| `/region/:slug` | 지역 SEO 랜딩 페이지 (침산동·북구·수성구·대구 등) |

### 2. 회원·인증
| URL | 메서드 | 설명 |
|---|---|---|
| `/signup` | GET · POST | **회원가입**: 성함·이메일·전화·비밀번호 + [필수] 개인정보 동의 + [선택] 마케팅 동의 |
| `/login` | GET · POST | 로그인 (쿠키 세션, 30일) |
| `/logout` | GET | 로그아웃 |

### 3. 관리자 (비밀번호 전용)
- **초기 비밀번호**: `daegu365!admin` (settings 테이블에서 변경 가능)
- **접속**: 푸터 우측 하단 "관리자" 링크 → `/admin/login`

| URL | 설명 |
|---|---|
| `/admin` | 대시보드 (전체 콘텐츠/회원 수 · 빠른 등록) |
| `/admin/members` | **회원 목록** (이름·이메일·전화·개인정보/마케팅 동의 여부·가입일) |
| `/admin/before-after` · `/admin/before-after/new` · `/admin/before-after/:id/edit` | 비포애프터 CRUD (지역 주소 자동완성 · 4장 이미지 URL · SEO 메타) |
| `/admin/blog` · `/admin/blog/new` · `/admin/blog/:id/edit` | 블로그 CRUD (H2/H3/UL 등 툴바 · 작성자 원장 선택 · Meta description/keywords) |
| `/admin/notices` · `/admin/notices/new` · `/admin/notices/:id/edit` | 공지 CRUD (★대장 공지 지정) |
| `/admin/logout` | 로그아웃 |

### 4. API · 자동화
| URL | 설명 |
|---|---|
| `/api/addresses?q=침산` | **주소 자동완성** (예: `침산` → 대구 북구 침산동) |
| `/sitemap.xml` | 전체 사이트맵 (모든 페이지 자동 반영 — 원장 7·진료 12·블로그·비포·용어 500·지역 SEO) |
| `/robots.txt` | /admin 제외하고 전 크롤 허용 |

### 5. SEO/AEO (핵심 목표)
- ✅ 타이틀·description·keywords 전 페이지 개별화
- ✅ **Canonical URL** 자동 생성
- ✅ **OpenGraph + Twitter Card** 전체 세팅 + 커스텀 OG 이미지
- ✅ **JSON-LD Schema**:
  - `Dentist` (주소·좌표·진료시간·전화 + **knowsAbout 24개 주제 권위 · numberOfEmployees · slogan + department 5개 진료과 계층**)
  - `Physician` (원장 프로필 — **전문의 자격/학회 인정의 구분(recognizedBy: 보건복지부/학회) · alumniOf · hasOccupation**)
  - `MedicalProcedure` (진료별, **lastReviewed·dateModified 신선도 + reviewedBy 의료 검수 전문의**)
  - `HowTo` (임플란트·교정·라미네이트·잇몸치료·미백 — 단계별 절차, AI 답변 인용 강화)
  - `SpeakableSpecification` (음성/AI 발췌 영역 지정)
  - `FAQPage` (진료별 FAQ)
  - `Article`/`BlogPosting` (블로그, DB updated_at → dateModified 자동 반영)
  - `DefinedTerm` (백과사전)
- ✅ **TL;DR 직접답변 블록** — 21개 전 진료 페이지 (`.tldr-answer` + 진료별 검수 전문의 표기)
- ✅ **지역 SEO 페이지** 5종 (침산동·북구·수성구별 임플란트/라미네이트/교정 등)
- ✅ H1~H3 시맨틱 구조, meta robots, theme-color

> **2026 AEO 머신 1차 (2026-06-11)**: ① 주제 권위(`knowsAbout`) ② 신선도(`lastReviewed`/`dateModified`)
> ③ 절차(`HowTo`) ④ 음성/발췌(`Speakable`) ⑤ TL;DR 직접답변 21개 진료 전체.
>
> **2026 AEO 머신 2차 (YMYL 신뢰 강화, 2026-06-12)**: ① 진료별 `reviewedBy` 의료 검수 전문의(전공 일치 매핑) +
> 본문 가시적 검수자 표기 ② `Physician` 자격 정밀화(국가 전문의 vs 학회 인정의 구분, `recognizedBy`/`alumniOf`/`hasOccupation`)
> ③ `department` 진료과 계층 엔티티(임플란트·교정·보존·치주·소아 → 담당 전문의 연결).
> **검증 가능한 사실(DB doctors 자격)만 사용 — 가짜 평점/후기·논문·해외 식별자는 일절 넣지 않음.**
- ✅ 파비콘(SVG) + OG 이미지(SVG) + 프리텐다드/Cormorant Garamond 프리미엄 폰트

### 6. 디자인 시스템
- **컬러**: 프리미엄 **브라운** 팔레트 (브라운 50~950 + 아이보리 + 골드 #c9a876)
- **폰트**: Cormorant Garamond (디스플레이) + Pretendard (본문) — 고급스럽고 세련된 조합
- **모션**: IntersectionObserver fade-in, magnetic 버튼, blob 애니메이션, 마퀴 스크롤
- **매거진급 이미지 레이아웃**: 비대칭 그리드, 라운드 40px 컨테이너, 글래스모피즘 배지
- **반응형**: 모바일 메뉴, 768/1024 브레이크포인트

### 7. 페이지간 인터링킹 (SEO 파워)
- 진료 페이지 → 담당 원장 카드 → 원장 프로필
- 비포애프터 → 담당 원장 + 진료 카테고리
- 원장 프로필 → 담당 케이스 + 전문 진료
- 백과사전 → 관련 진료 + 비슷한 용어
- 지역 SEO → 전체 핵심 진료
- 모든 상세 페이지에 홈/FAQ/예약 CTA

---

## 📊 데이터 시딩 현황

| 테이블 | 건수 | 설명 |
|---|---|---|
| doctors | 7 | 김성주 대표원장 + 6명 진료원장 |
| treatments | 12 | 핵심 3 + 보철·신경·치주·소아·예방·미백·심미·보존·일반 |
| faqs | **252** | 진료 과목별 20개 이상 |
| dictionary | **500** | 치과 전문 용어 백과 |
| before_afters | 4+ | 샘플 케이스 (관리자에서 추가) |
| blog_posts | 4+ | 원장별 샘플 포스트 |
| notices | 4+ | 개원 안내 등 |
| region_seo | 5 | 침산동·북구·수성구·대구 |
| addresses | 78 | 대구 주요 동 (자동완성용) |
| fees | 12 | 진료 수가 안내 |

---

## 🏗 기술 스택
- **프레임워크**: Hono (Cloudflare Workers 엣지 런타임)
- **빌드**: Vite 6 + `@hono/vite-build/cloudflare-pages`
- **DB**: Cloudflare D1 (SQLite) — 마이그레이션 5단계 (`migrations/0001~0005`)
- **스토리지**: Cloudflare R2 (이미지 업로드용, 바인딩 구성 완료)
- **세션**: Cookie 기반 HMAC 서명 토큰 (Web Crypto API)
- **스타일**: Tailwind CDN + 커스텀 CSS (`public/static/styles.css`)
- **프로세스 관리**: PM2 (`ecosystem.config.cjs`)

## 📂 프로젝트 구조
```
webapp/
├── migrations/          # 5개 SQL 마이그레이션 (스키마 + 시드)
├── public/static/       # favicon, OG, styles.css, app.js
├── scripts/             # 백과사전 500용어 생성 스크립트
├── src/
│   ├── components/Layout.tsx   # Navbar + Footer
│   ├── lib/                    # auth.ts, types.ts
│   ├── pages/                  # home, mission, doctors, treatments, beforeafter, blog, misc, auth, admin
│   ├── renderer.tsx            # 전역 SEO/메타/스키마 JSX 렌더러
│   └── index.tsx               # 전체 라우팅 (50+ 라우트)
├── ecosystem.config.cjs
├── wrangler.jsonc       # D1 + R2 + KV 바인딩
└── package.json
```

---

## 🚀 실행 방법

> ⚠️ **저메모리 샌드박스 빌드 주의**: 샌드박스 RAM 이 ~1GB 라 `npm run build`(Vite SSR)가
> 16만 줄 단일 파일에서 **OOM(Killed)** 으로 죽는다. 이 경우 `node scripts/esbuild-worker.mjs`
> 로 esbuild 직접 번들링하면 약 0.4초에 동일한 `dist/_worker.js` 생성 가능.
> **프로덕션 배포는 `git push origin main` → GitHub Actions(`.github/workflows/deploy.yml`)** 가
> 충분한 메모리 러너에서 Vite 빌드 후 Cloudflare Pages 로 자동 배포하므로 가장 안정적.

```bash
# 개발 (PM2 + wrangler pages dev)
cd /home/user/webapp
npm install            # 필요 시
npm run build          # dist/ 생성 (저메모리 시: node scripts/esbuild-worker.mjs)
pm2 start ecosystem.config.cjs

# 로그
pm2 logs daegu365dc --nostream

# DB 시드 (초기 1회)
npx wrangler d1 migrations apply daegu365dc-production --local

# 정지 / 재시작
pm2 restart daegu365dc
pm2 delete daegu365dc
```

### 접속 정보
- **샌드박스 URL**: https://3000-i0rsckxmwjmswcrcqzqer-d0b9e1e2.sandbox.novita.ai
- **관리자 로그인**: 푸터 "관리자" 클릭 → 비밀번호 `daegu365!admin`

---

## 🛫 배포 가이드 (Cloudflare Pages)

```bash
# 1. D1 프로덕션 DB 생성
npx wrangler d1 create daegu365dc-production
# → database_id를 wrangler.jsonc에 입력

# 2. R2 버킷 생성
npx wrangler r2 bucket create daegu365dc-assets

# 3. 프로덕션 마이그레이션
npx wrangler d1 migrations apply daegu365dc-production

# 4. 프로젝트 생성
npx wrangler pages project create daegu365dc --production-branch main

# 5. 배포
npm run build
npx wrangler pages deploy dist --project-name daegu365dc
```

---

## 🧭 구현 예정 / 권장 다음 스텝

### 아직 구현 안 된 부분
- [ ] **R2 이미지 업로드 UI** — 현재 관리자에서 URL을 직접 입력. R2 signed URL 업로드 구현 시 폼에 `<input type=file>`로 교체
- [ ] **관리자 IP 제한** — 비밀번호 + IP 화이트리스트 이중 접근. `wrangler.jsonc`에 허용 IP 설정 후 미들웨어 추가 필요
- [ ] **백과사전 인라인 자동링크** — 블로그/진료 본문의 용어 자동 `<a href="/dictionary/…">` 변환 (후처리 함수로 가능)
- [ ] **조회수 상세 리포트** — 현재 각 행에 view_count 저장. 관리자 대시보드 차트화 가능
- [ ] **마케팅 동의자 CSV 내보내기**
- [ ] **블로그 에디터 드래그&드롭 이미지 업로드** — R2 업로드 + 썸네일 자동 생성
- [ ] **추가 지역 SEO 페이지** — 현재 5개. 검색어 데이터 반영 시 50개까지 확장 권장
- [ ] **실제 병원 사진 교체** — 현재 모두 Font Awesome 아이콘 + 그라데이션 placeholder

### 향후 개선
- 상담 예약 폼 (카톡채널 연동 또는 자체 예약 테이블)
- 리뷰 시스템 (Medical Business Review schema 추가)
- 구글 서치콘솔·네이버 웹마스터 등록
- GA4 / Naver Premium Log Analytics 태그 삽입

---

## 🗄 데이터 모델 요약

```
members(id, name, email, phone, password_hash, privacy_agreed, marketing_agreed)
doctors(id, slug, name, position, specialties[JSON], education[JSON], career[JSON], message, philosophy)
treatments(id, slug, name, tagline, is_core, short_desc, full_content)
faqs(id, treatment_slug, question, answer)
before_afters(id, title, description, pano/intra_before/after_url, age_group, gender,
              treatment_slug, region_sido/sigungu/dong, doctor_slug, treatment_period)
blog_posts(id, slug, title, excerpt, content, thumbnail_url, author_doctor_slug, meta_*)
notices(id, title, content, thumbnail_url, is_main)
dictionary(id, slug, term, term_en, category, short_desc, full_desc, related_treatments[JSON])
region_seo(id, slug, region_name, treatment_slug, title, meta_description, h1, content)
addresses(id, sido, sigungu, dong, full_name)
fees(id, category, item_name, price_range, note)
settings(key, value)  # admin_password, hospital_phone 등
```

---

## 🔧 SEO 유지보수 로그

### 2026-05-30 — GSC 색인 이슈 정리
GSC 리포트(404 4건, robots 차단 3건, 크롤링됨-색인안됨 514건) 대응:
- **robots.txt 개선**:
  - `/login`, `/signup` 의 `Disallow` **제거** → 크롤은 허용하되 `X-Robots-Tag: noindex` 헤더로 색인만 차단
    (robots.txt 로 막으면 구글이 noindex 를 못 읽어 "robots.txt 차단됨" 경고가 계속 남는 문제 해결)
  - `/admin`, `/api/admin/`, `/logout` 만 완전 차단 유지
  - `/cdn-cgi/` 차단 추가 → `/cdn-cgi/l/email-protection` 404 정리
  - `/*?*sort=`, `/*?*page=` 차단 → 파라미터 중복 URL 색인 방지
  - robots.txt 응답에 `Cache-Control: public, max-age=600` 추가(반영 지연 최소화)
- **404 진단**: `/contact`→`/directions` 301 리다이렉트는 이미 구현돼 있었음(옛 크롤 잔상). `/blog/tesy`, `/blog/implant-sleep` 은 삭제된 슬러그(정상 404)
- **백과사전 thin content 점검**: 상세 페이지 본문 약 20,000자 → thin content 아님(수정 불필요)
- **514 색인보류 결론**: 콘텐츠/기술 문제 아님. 신생 도메인의 크롤 예산·신뢰도 축적 이슈 → 시간 + GSC 색인요청 + 외부 링크로 해소되는 중(픽스쳐/절치/치아번호표기법 등 비브랜드 키워드 노출 시작 확인)

## 📱 모바일 수정사항 반영 (2026-06-11, 키노트 395슬라이드 기반)
> 원본: `모바일수정사항_대구365(260531).key` — 반응형이라 PC/모바일 동일 코드 공유, 수정은 반응형 CSS + 공유 콘텐츠 + D1 데이터로 처리.

- **Phase 1 — 한글 기울임체 전면 제거**: 20개 페이지의 한글 italic 0건으로 정리(영문/디자인 의도 12건만 유지). 검증: 한글 italic=0.
- **Phase 2-1 — 푸터 `DAEGU365DENTAL` 모바일 잘림 방지**: vw 스케일·자간·패딩·max-width 조정. 검증: 390px에서 한 줄 완전 노출, 전 페이지 가로 오버플로우 0건(21개 페이지 Playwright 스캔).
- **Phase 2-2 — 점심시간**: 이미 `12:30~14:00`로 정확(PC 4차 기준). 변경 없음.
- **Phase 3 — 원장 7인 인터뷰 정리**: D1 `doctors.interview` 데이터에 문장 단위 줄바꿈 + `**볼드**` + `· → 콜론 2줄 라벨(라벨 : / 골드 서브라인)` 반영. `renderBold()` 파서로 `<strong>` 렌더링. 검증: 김성주 원장 페이지에서 라벨/볼드/줄바꿈 정상.
- **Phase 4 — 치료 페이지 구체 문구 수정**:
  - 소아 레진(`treatments-pediatric`): "3면 10만 → 3면이상 10만", "영구치 레진 동일가." 삭제
  - 잇몸병 5단계(`treatments-perio`): 01~05 번호 부여 + 마침표 → 가운뎃점(·) 정리
  - ※ 나머지 줄바꿈/줄배열 지시(200+)는 반응형 `word-break: keep-all` 자동 처리에 위임(강제 `<br>` 미적용 — 기기별 깨짐 방지)
- **Phase 5-1 — 색상/순서 강조**:
  - 비니크: `VINIQUE` 진브라운(#4a3520) 강조 (h2 + "다른 이유" 헤드라인)
  - 교정: 인비절라인 골드 강조 + 패키지 순서 재배치(Comprehensive 복잡 → Moderate 중등도 → Lite 가벼움)
  - 라미니어 9:16 시네마틱 before/after 영상: 기존 구현 확인(추가 작업 없음)
  - 화이트닝 시술과정(VITA Shade·잇몸 보호제·48시간 컬러푸드 자제): 기존 반영 확인


## 📱 모바일 수정사항 2차 (2026-06-12, 키노트 260531 전량 재추출)
> 396슬라이드 전체 텍스트/스크린샷 매핑을 `docs/revisions/`에 보존 (full_requests.txt · slides_text.json · slide_screenshots.json)

- **수가표(26_05_29) 기반 가격 정정**: 소아 RPE 50→80만원, 성인 MARPE 70→120만원 (교정·소아교정 페이지 + FAQ 답변)
- **소아교정**: 할터만 "재료 교체 시 3만원 추가" 문구 삭제 (슬라이드 235)
- **수면치료**: "진료팀과 모니터링 팀으로 분리하여 동시 진행" / "진정 후 24시간은 운전 및 중요한 의사결정을 금지합니다" (슬라이드 206~207)
- **임플란트**: "흡연이 많거나" → "흡연 등" 1줄 배열 (슬라이드 116)
- **FAQ migration 0028**: 식후 양치(신맛 30분 뒤)·구취 원인(구강 내 80%+, 환자별 효과)·정기검진(구강 상태별, 검사 항목 명시) — 로컬+프로덕션 D1 적용 완료
- ✅ **2026-06-12 2차 반영 완료**: 원장 7인 인터뷰 전면 문구교체(마이그레이션 0029, 로컬+프로덕션 D1 적용), 인비절라인 8단계 교정과정/3D CT(134~136), 수면치료 문구(191~203: IV Sedation 본문·최소한의 방문·김성주 라벨 줄바꿈), 잇몸병 문구(226, 에어플로우 이서영 인용문), 소아교정 장치표 5종/MFT/할터만/트윈블럭(227~235), 골격성장 문구(229), 수천만원(230), 한 곳에서(232~233), 5세(245), 이서영 specialties→치주치료 태그(96)
- ✅ **2026-06-12 3차 반영 완료 (키노트 260531 전량 처리 종료)**:
  - **vinique 특화진료(246~249)**: 브랜드 short_desc(마이그레이션 0030, 로컬+프로덕션 D1), 마침표 중복 fix, 담당의료진 정재헌·최혜정 노출(doctorMatchSlug 별칭), 비포애프터 시네마틱 섹션 추가
  - **가격(272)**: 충치 페이지 레진 7만원→**8만원~**, 신경치료+크라운 95만원~→**60만원~**, "감염성 진행 질환" 모바일 줄바꿈
  - **충치(278)**: "정밀 근관치료 + 크라운으로 자연 치아를 최대한 보호합니다." + 신경치료 6단계 마침표 삭제
  - **아이콘(371)**: "충전은 충치 부위를 깎고 채우지만 아이콘은" 줄변경+문구 수정
  - **임플란트(118)**: 평생보증 카드 — "모든 부작용·파절·소실에 대해 평생 무상 재치료·보수 보장 / (환자 부주의 제외, 회색 작게) / 단 한 번의 시술로 평생의 안심을." (implant + implant-general 동시)
  - **에어플로우 FAQ(221)**: "임플란트가 있어도 받을 수 있나요?" → "임플란트가 있는 분들께" (코드 + 마이그레이션 0031, 로컬+프로덕션 D1)
  - **LIVE 배지(1)**: 모바일에서도 진료중 상태 표시 (hidden md:inline-flex → inline-flex)
  - **점심시간(19)**: 12:30 → **13:00 ~ 14:00** 전 페이지 통일 (Layout LIVE 로직·푸터·doctors·home·misc·예약 select)
  - **'7인의 원장님'(18)**: "원장님 7인" → "7인의 원장님" + 기울임 제거
  - **치료사례 헤더(32/44/56/68)**: "{원장명} 원장 치료사례" 한 줄 배열(기울임 없음) + "전체보기 →" 아래 줄 배치
  - **푸터 로고(16/33/45)**: DAEGU365DENTAL 우측 잘림 방지 (모바일 폰트 8.4vw→6.6vw + 자간 타이트)
  - **미백(325)**: 표 캡션 줄변경("잇몸 보호제 + VITA Shade 정량측정 + 시술" / "시술 후 48시간 컬러푸드 자제") + 비교표 min-w-[640px]로 모바일 세로 한 글자 깨짐 방지
  - **소아(306)**: "기억의 설계" 3개 문단 키노트 지정 줄바꿈 적용 (기존 볼드 유지)

## 🔍 SEO 색인 복구 작업 (2026-07)
- **진단**: GSC "크롤링됨 - 현재 색인이 생성되지 않음" 563건 = 얇은 중복 페이지 품질 페널티 (5월초 400+ 색인 후 전량 해제됨). 실측: dictionary 페이지 간 고유 텍스트 7%, region 6~12%. 사이트맵 669 URL 중 598개(89%)가 얇은 페이지.
- **조치 1 (388b1b1)**: pages.dev 중복 도메인 → daegu365dc.kr 301 리다이렉트
- **조치 2 — Step 1 (098ec5d)**: 얇은 페이지 색인 전략 철수
  - `/dictionary/:slug` 500개 + `/region/:slug` 98개 → `X-Robots-Tag: noindex, follow` + `<meta name="robots" content="noindex, follow">` (페이지 자체는 사용자용으로 유지, 허브 `/dictionary`·`/regions`는 색인 유지)
  - 사이트맵 압축: sitemap.xml → main(46)/blog(4)/cases(4) = **54 URL** (기존 669)
  - sitemap-regions.xml·sitemap-content.xml은 빈 urlset 200 반환 (GSC 기존 제출분 404 방지)
  - robots.txt·llms.txt·admin SEO 가이드에서 두 사이트맵 참조 제거
- **조치 3 — Step 3 (9f8a2c7)**: 용어사전 핵심 34개 리라이트 → 선별 색인 복귀
  - 마이그레이션 0032(indexable·updated_at 컬럼) + 0033~0036(34개 용어 전면 리라이트, 평균 1,268자 고유 콘텐츠: long_desc 3문단·key_points 5·usage_context(병원 연결)·cautions 4·FAQ 3)
  - 대상: 수복 8(scaling·dental-caries·root-canal-treatment·composite-resin·crown·gold-crown·zirconia·bridge) / 임플란트 8(dental-implant·peri-implantitis·bone-graft·sinus-lift·immediate-implant·all-on-4·osseointegration·iv-sedation) / 치주·외과 9(gingivitis·periodontitis·calculus·halitosis·wisdom-teeth·wisdom-tooth-extraction·extraction·tmd·cervical-sensitivity) / 심미·교정·예방 9(teeth-whitening·laminate-veneer·invisalign·clear-aligner·sealant·fluoride-application·dental-floss·root-canal·cd)
  - 라우트: `indexable=1`이면 meta robots·X-Robots-Tag noindex 모두 해제, 나머지 466개는 noindex 유지
  - sitemap-content.xml: `WHERE indexable=1`만 출력(34 URL) — sitemap index·robots.txt·llms.txt에 재등록 → 총 사이트맵 **88 URL**
- **조치 4 — Step 2 + 배치2 (데이터 전용, 재배포 불필요)**: 블로그 발행 재개 + 용어사전 추가 16개 리라이트
  - 마이그레이션 0037~0039: 용어사전 16개 리라이트 → indexable=1 (임플란트 6: straumann·osstem·digital-implant·navigation-surgery·fixture·abutment / 증상·일반 6: stomatitis·mobility·abscess·pregnancy-dental-care·tooth-numbering·mouthguard / 심미·교정·외과 4: veneer·lumineers·ceramic-bracket·double-jaw-surgery) → **색인 대상 총 50개**, sitemap-content.xml 50 URL 자동 합류
  - 마이그레이션 0040: 블로그 신규 6편 발행 (scaling-insurance-complete-guide·wisdom-tooth-when-to-extract·implant-bone-graft-explained·root-canal-crown-necessity·bruxism-nightguard-guide·whitening-vs-laminate-choice) — 각 글에 리라이트 용어사전 내부링크 연계, 전문의별 저자 배정. 기존 3편의 author_doctor_slug 불일치 버그 수정(kim-sung-ju→kim-seongju 등, 저자 미표시 해결)
  - 프로덕션 검증: dictionary indexable=50 · sitemap-content 50 URL · sitemap-blog 9 URL · 신규 글 200 렌더 · 저자 표기 정상
- **조치 5 — 배치3 (데이터 전용, 재배포 불필요)**: 용어사전 16개 추가 리라이트 + 블로그 4편 추가 발행
  - 마이그레이션 0041~0043: 용어사전 16개 리라이트 → indexable=1 (수복·보철 6: inlay·onlay·rpd·overdenture·retainer·apicoectomy / 교정 5: extraction-orthodontics·non-extraction-orthodontics·lingual-orthodontics·metal-bracket·malocclusion / 증상·심미 5: oral-cancer·xerostomia·gingivectomy·in-office-whitening·home-whitening) → **색인 대상 총 66개**, sitemap-content.xml 66 URL 자동 합류 (ai_model='step3-rewrite-batch3-202607')
  - 마이그레이션 0044: 블로그 신규 4편 발행 (denture-vs-implant-overdenture-guide·orthodontic-retainer-complete-guide·extraction-vs-nonextraction-ortho·inlay-crown-cavity-treatment-choice) — 배치3 리라이트 용어와 내부링크 연계, 저자 kim-seongju·kim-jinduk×2·kim-sangwon → 블로그 총 13편
  - 프로덕션 검증: dictionary indexable=66 · sitemap-content 66 URL · sitemap-blog 13 URL · 신규 글·용어 전부 200 + robots index · 저자 표기 정상
- **다음 단계 (승인 대기)**: GSC 색인 추이 관찰(2~6주) / 블로그 정기 발행 루틴 / 추가 리라이트 배치4 / region 페이지 선별 복귀

## 🎨 배포 상태
- **플랫폼**: Cloudflare Pages (Edge)
- **운영 도메인**: https://daegu365dc.kr (canonical 통일)
- **상태**: ✅ 프로덕션 라이브 (daegu365dc.pages.dev → daegu365dc.kr 301)
- **최종 업데이트**: 2026-07-21 (SEO 배치3 — 용어사전 16개 추가 리라이트 → 색인 대상 66개 + 블로그 4편 추가 → 총 13편, 사이트맵 총 147 URL(main 44·blog 13·cases 24·content 66) · D1 데이터 전용 갱신, 워커 재배포 불필요)
