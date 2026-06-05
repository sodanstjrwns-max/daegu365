-- PPT 4차 수정 슬라이드 33 — 라미네이트(VINIQUE) FAQ 표현 정리
-- 1) "라미네이트 재료 종류는?" 답변에서 '라미' 중복 표현 삭제
UPDATE faqs
SET answer = 'e.max, 지르코니아 등 다양하며 상태·예산에 맞춰 선택합니다.'
WHERE treatment_slug = 'lamineer' AND question = '라미네이트 재료 종류는?';
