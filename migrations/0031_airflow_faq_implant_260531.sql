-- PPT 모바일 슬라이드 221 — 에어플로우 FAQ 질문 문구 변경
-- "임플란트가 있어도 받을 수 있나요?" → "임플란트가 있는 분들께"
UPDATE faqs
SET question = '임플란트가 있는 분들께'
WHERE treatment_slug = 'airflow-gbt'
  AND question = '임플란트가 있어도 받을 수 있나요?';
