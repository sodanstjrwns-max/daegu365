-- PPT 2차 수정사항 슬라이드 9, 10, 11, 13 반영
-- 의료진 인용구 표현 정정 + 의미 단위 줄바꿈(\n) 적용

-- 슬라이드 10: 정재헌 원장 — "되지는 않게" → "되지 않게" + 의미 단위 줄바꿈
UPDATE doctors
SET message = '저를 만난 것이 환자분 인생에서' || char(10) || '절대 손해가 되지 않게 하겠습니다.'
WHERE slug = 'jung-jaeheon';

-- 슬라이드 9: 김성주 원장 — 의미 단위 줄바꿈
UPDATE doctors
SET message = '환자를 웃게 만드는 유쾌함,' || char(10) || '그리고 그 웃음을 지켜내는 진중한 실력으로 모십니다.'
WHERE slug = 'kim-seongju';

-- 슬라이드 11, 13: 최혜정 원장 — "결과를. 본래의 치아처럼" 표현 정리 + 줄바꿈
UPDATE doctors
SET message = '자연스러움 속에서, 가장 아름다운 결과를.' || char(10) || '본래의 치아처럼 보이는 미소를 디자인합니다.'
WHERE slug = 'choi-hyejung';
