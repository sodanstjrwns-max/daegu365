-- ============================================================
-- 0022_dictionary_expand.sql
-- ------------------------------------------------------------
-- 목적: 치과 백과사전 500개 페이지의 Thin Content 문제 해결
-- ------------------------------------------------------------
-- GSC 진단: 500개 dictionary 페이지 "크롤링됨 - 색인 생성 안 됨"
-- 원인: full_desc 평균 50자 (최대 98자) → 구글이 thin content로 판단
-- 해결: 확장 콘텐츠 컬럼 추가 + OpenAI로 일괄 생성
-- ------------------------------------------------------------
-- 추가 컬럼 (페이지당 ~1,200자 풍부한 콘텐츠 확보):
--   long_desc       — 본문 (3~4문단, 300~500자)
--   key_points      — 핵심 포인트 JSON 배열 (3~5개 bullet)
--   usage_context   — 어떤 상황에서 쓰이는 용어인지 (150자)
--   cautions        — 환자분이 알아두면 좋은 주의사항 (150자)
--   faq_json        — Q&A JSON 배열 (2~3개 FAQ → SchemaOrg FAQPage 활용)
--   ai_generated_at — AI 생성 시각 (재생성 추적용)
--   ai_model        — 어떤 AI 모델로 생성됐는지
-- ============================================================

ALTER TABLE dictionary ADD COLUMN long_desc       TEXT;
ALTER TABLE dictionary ADD COLUMN key_points      TEXT;
ALTER TABLE dictionary ADD COLUMN usage_context   TEXT;
ALTER TABLE dictionary ADD COLUMN cautions        TEXT;
ALTER TABLE dictionary ADD COLUMN faq_json        TEXT;
ALTER TABLE dictionary ADD COLUMN ai_generated_at DATETIME;
ALTER TABLE dictionary ADD COLUMN ai_model        TEXT;

-- 빠른 조회용 인덱스 (확장된 페이지만 골라낼 때 사용)
CREATE INDEX IF NOT EXISTS idx_dictionary_ai_generated ON dictionary(ai_generated_at);
