-- 0049: 원장단 변동 (6인 → 5인) — 정재헌 원장(통합진료센터장·보존과 전문의) 퇴사 반영
-- 근거: 2026-11-21 김성주 대표원장 수정 요청 PPT "홈페이지 수정 (dr.정 삭제)"
--
-- ※ 운영(remote) 적용은 사용자 승인 뒤에만. 적용 전 백업(읽기만 함):
--   npx wrangler d1 execute daegu365dc-production --remote --json \
--     --command "SELECT * FROM doctors WHERE slug='jung-jaeheon'" > backup-doctor-jung-jaeheon.json
--   npx wrangler d1 execute daegu365dc-production --remote --json \
--     --command "SELECT id, slug, author_doctor_slug, updated_at FROM blog_posts WHERE author_doctor_slug='jung-jaeheon'" > backup-blog-jung-jaeheon.json
-- 적용:
--   npx wrangler d1 execute daegu365dc-production --remote --file=migrations/0049_remove_jung_jaeheon.sql
--   (`d1 migrations apply --remote` 는 쓰지 말 것 — 같은 폴더의 번호 없는 update_interviews.sql 이 함께 실행될 수 있음)

-- 1) 블로그 작성자 참조 해제 — 이갈이·나이트가드 글 1편 (slug: bruxism-nightguard-guide)
--    다른 원장 이름으로 바꾸지 않는다: 실제로 쓰지 않은 원장을 작성자로 표시하면 허위 작성·감수 신호(2026-10-11 원칙).
--    저자가 비면 화면의 작성란은 '작성 대구365치과'(원장 이름·사진 없음), 스키마 author 는 병원(#dentist)으로 바뀐다.
--    글 자체는 내리지 않음 (내릴지는 사용자 결정).
UPDATE blog_posts
SET author_doctor_slug = NULL,
    updated_at = CURRENT_TIMESTAMP
WHERE author_doctor_slug = 'jung-jaeheon';

-- 2) doctors 테이블에서 정재헌 삭제 → /doctors 원장 카드·다른 의료진 보기·진료별 담당 의료진(수면임플란트·보존치료 등)·
--    블로그 작성자·사이트맵·llms.txt·Physician 스키마·비포애프터 담당 원장 표기에서 자동 제외.
--    (요일별 스케줄·홈 원장 카드 등 코드에 직접 적힌 곳은 같은 날 코드에서 정리)
--    /doctors/jung-jaeheon 은 코드(ALIAS_REDIRECTS)에서 /doctors 로 301.
--    before_afters.doctor_slug='jung-jaeheon' 사례 6건(id 5·7·8·11·15·17)은 건드리지 않음 — 원장 행이 없으면
--    화면·스키마에 '대구365치과 의료진'으로 표시됨. 다른 원장으로 재지정하거나 내릴지는 사용자 결정.
DELETE FROM doctors WHERE slug = 'jung-jaeheon';

-- ※ (참고·선택) R2 객체 정리 — SQL 아님. 코드에서 이미 /r2/* 410 으로 막으므로 급하지 않음. 사용자 승인 뒤:
--   for k in images/doctors/jung-jaeheon.webp images/doctors/jung-jaeheon.jpg \
--            images/doctors/team-6-main.webp images/doctors/team-6-main.jpg \
--            images/doctors/team-6-horizontal.webp images/doctors/team-6-horizontal.jpg \
--            images/doctors/team-6-vertical.webp images/doctors/team-6-vertical.jpg \
--            images/doctors/team-horizontal-smile.webp images/doctors/team-horizontal-smile.jpg \
--            images/doctors/team-horizontal-serious.jpg images/doctors/team-2rows.jpg images/doctors/team-3rows.jpg \
--            "정재헌_인터뷰_master.mp4"; do npx wrangler r2 object delete "daegu365dc-assets/$k" --remote; done
