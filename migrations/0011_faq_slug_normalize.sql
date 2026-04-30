-- 0011_faq_slug_normalize.sql
-- ============================================================================
-- FAQ 슬러그 정규화: 0010 마이그레이션으로 treatments 슬러그가 변경되면서
-- faqs 테이블에 남은 고아 데이터(84건)를 새 슬러그로 매핑한다.
--
-- 변경 매핑:
--   endo          → cavity-endo-crown   (21건)
--   periodontics  → perio               (21건)
--   preventive    → prevention          (21건)
--   prosthetics   → prosthetic          (21건)
--
-- 효과: 4개 진료 페이지의 FAQPage 스키마가 즉시 21개 항목으로 복구.
-- ============================================================================

UPDATE faqs SET treatment_slug = 'cavity-endo-crown' WHERE treatment_slug = 'endo';
UPDATE faqs SET treatment_slug = 'perio' WHERE treatment_slug = 'periodontics';
UPDATE faqs SET treatment_slug = 'prevention' WHERE treatment_slug = 'preventive';
UPDATE faqs SET treatment_slug = 'prosthetic' WHERE treatment_slug = 'prosthetics';
