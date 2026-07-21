-- ============================================================
-- 0045_remove_blog_batch3.sql — 배치3 블로그 4편 삭제 (원장님 지시)
-- 용어사전 리라이트(0041~0043)는 유지, 블로그 4편만 제거
-- ============================================================

DELETE FROM blog_posts WHERE slug IN (
  'denture-vs-implant-overdenture-guide',
  'orthodontic-retainer-complete-guide',
  'extraction-vs-nonextraction-ortho',
  'inlay-crown-cavity-treatment-choice'
);
