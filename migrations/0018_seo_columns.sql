-- ==========================================================================
-- SEO/AEO 강화 — 비포애프터 + 블로그 검색 노출 풀 업그레이드
-- ==========================================================================

-- (1) 비포애프터에 SEO 컬럼 추가
ALTER TABLE before_afters ADD COLUMN meta_description TEXT;
ALTER TABLE before_afters ADD COLUMN meta_keywords TEXT;
ALTER TABLE before_afters ADD COLUMN og_image TEXT;
ALTER TABLE before_afters ADD COLUMN before_alt TEXT;
ALTER TABLE before_afters ADD COLUMN after_alt TEXT;
ALTER TABLE before_afters ADD COLUMN updated_at DATETIME;

-- (2) 블로그에 og_image 컬럼 (thumbnail과 별도 OG용 큰 이미지 가능)
ALTER TABLE blog_posts ADD COLUMN og_image TEXT;

-- (3) 추후 robots/canonical 우회 옵션
ALTER TABLE blog_posts ADD COLUMN noindex INTEGER DEFAULT 0;
ALTER TABLE before_afters ADD COLUMN noindex INTEGER DEFAULT 0;
