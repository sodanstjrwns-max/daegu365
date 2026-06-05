-- PPT 4차 수정 (slide 67, 68) — 치주 FAQ 문구 수정
-- 무통 도포 → 무통 가글, 경증1~2회/중등증 → 초기1~3회/중기, 치은소파술 → 치주소파술

UPDATE faqs
SET answer = '보통 약간 시린 정도이며, 무통 가글로 편안히 진행 가능합니다.'
WHERE treatment_slug = 'perio' AND question = '스케일링은 아픈가요?';

UPDATE faqs
SET answer = '초기 1~3회, 중기 이상 수개월 관리가 필요합니다.'
WHERE treatment_slug = 'perio' AND question = '치주 치료 기간은?';

UPDATE faqs
SET answer = '스케일링·치주소파술 등 대부분 급여입니다.'
WHERE treatment_slug = 'perio' AND question = '치주치료 보험 적용되나요?';

-- slide 59 — 충치/신경치료 현미경(마이크로스코프) 관련 내용 삭제·대체
UPDATE faqs
SET answer = '가능합니다. 디지털 육안 확대 하에 정밀하게 진행합니다.'
WHERE treatment_slug = 'cavity-endo-crown' AND question = '재신경치료도 가능한가요?';

DELETE FROM faqs
WHERE treatment_slug = 'cavity-endo-crown' AND question = '마이크로스코프 신경치료란?';
