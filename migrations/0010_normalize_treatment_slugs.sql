-- 0010_normalize_treatment_slugs.sql
-- 목적: treatments 테이블 슬러그를 코드(라우트 분기 + canonical URL) 기준으로 통일
--
-- 배경:
--   prod DB에 구/신 슬러그가 중복 공존하던 상태. 신 row는 빈 껍데기, 구 row에 풍부한 content.
--   코드 라우트는 신 슬러그(cavity-endo-crown / perio / qray / prosthetic / prevention) 기준이므로
--   ① 빈 신 row 먼저 삭제 → ② 구 row를 신 슬러그로 rename 하여 콘텐츠 보존 + 코드 일치.
--
-- 안전장치: DELETE는 LENGTH(full_content)=0 인 row만 대상으로 하여 풍부한 콘텐츠 보호.
-- 멱등성: 이미 정리된 환경(로컬)에서는 모든 statement가 0 row 영향, 안전하게 재실행 가능.

-- 1) 빈 신 row 5개 제거 (UNIQUE 충돌 회피)
DELETE FROM treatments WHERE slug='cavity-endo-crown' AND COALESCE(LENGTH(full_content),0)=0;
DELETE FROM treatments WHERE slug='perio'             AND COALESCE(LENGTH(full_content),0)=0;
DELETE FROM treatments WHERE slug='qray'              AND COALESCE(LENGTH(full_content),0)=0;
DELETE FROM treatments WHERE slug='prosthetic'        AND COALESCE(LENGTH(full_content),0)=0;
DELETE FROM treatments WHERE slug='prevention'        AND COALESCE(LENGTH(full_content),0)=0;

-- 2) 구 슬러그 → 신 슬러그 rename (콘텐츠 그대로 보존)
UPDATE treatments SET slug='cavity-endo-crown' WHERE slug='endo';
UPDATE treatments SET slug='perio'             WHERE slug='periodontics';
UPDATE treatments SET slug='qray'              WHERE slug='q-ray';
UPDATE treatments SET slug='prosthetic'        WHERE slug='prosthetics';
UPDATE treatments SET slug='prevention'        WHERE slug='preventive';
