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
  - `Dentist` (전체 기본, 주소·좌표·진료시간·전화 포함)
  - `Physician` (원장 프로필)
  - `FAQPage` (진료별 FAQ)
  - `Article` (블로그)
  - `DefinedTerm` (백과사전)
- ✅ **지역 SEO 페이지** 5종 (침산동·북구·수성구별 임플란트/라미네이트/교정 등)
- ✅ H1~H3 시맨틱 구조, meta robots, theme-color
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

```bash
# 개발 (PM2 + wrangler pages dev)
cd /home/user/webapp
npm install            # 필요 시
npm run build          # dist/ 생성 (필수 1회)
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

## 🎨 배포 상태
- **플랫폼**: Cloudflare Pages (Edge)
- **상태**: ✅ 로컬 샌드박스에서 완전 동작 (프로덕션 배포 대기)
- **최종 업데이트**: 2026-04-20
