-- PPT 4차 수정 슬라이드 48 — 무통마취 진료명 "3단계 무통마취 시스템" → "4단계 무통마취 시스템"
-- breadcrumb(JSON-LD)·메타 타이틀 등 전반에 사용되는 treatments.name 수정

UPDATE treatments
SET name = '4단계 무통마취 시스템'
WHERE slug = 'painless-anesthesia' AND name = '3단계 무통마취 시스템';
