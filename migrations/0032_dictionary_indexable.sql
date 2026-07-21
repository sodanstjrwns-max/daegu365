-- ============================================================
-- 0032_dictionary_indexable.sql
-- ------------------------------------------------------------
-- SEO Step3: 용어사전 선별 색인 복귀 준비
-- - indexable: 리라이트 완료되어 구글에 다시 내밀 수 있는 페이지 표시
--   (0 = noindex 유지, 1 = 색인 허용 + sitemap-content.xml 포함)
-- - updated_at: 리라이트 시각 → sitemap lastmod 신선도 신호
-- ============================================================

ALTER TABLE dictionary ADD COLUMN indexable INTEGER DEFAULT 0;
ALTER TABLE dictionary ADD COLUMN updated_at DATETIME;

CREATE INDEX IF NOT EXISTS idx_dictionary_indexable ON dictionary(indexable);
