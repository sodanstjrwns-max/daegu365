-- PPT 4차 수정 슬라이드 48 — 무통마취 FAQ "3단계" → "4단계" 전부 수정
-- 페이지 본문 4단계 프로토콜(가글마취 → 도포마취 → 무통마취기(iject BTS) → 본마취)과 표현 일치

UPDATE faqs
SET question = '4단계 무통마취는 일반 마취와 어떻게 다른가요?',
    answer = '일반 마취는 마취액을 바로 주입하지만, 4단계 무통마취는 가글마취 → 도포마취 → 컴퓨터 제어 무통마취기(iject BTS) → 본마취라는 4단계를 거치면서 주사 통증의 원인(온도·굵기·속도)을 모두 제어합니다. 대부분의 환자가 주사를 맞은 사실조차 느끼지 못한다고 말씀하십니다.'
WHERE id = 253 AND treatment_slug = 'painless-anesthesia';

UPDATE faqs
SET answer = '4단계 무통마취는 대구365치과의 기본 진료 시스템이며 별도의 추가 비용이 청구되지 않습니다.'
WHERE id = 255 AND treatment_slug = 'painless-anesthesia';
