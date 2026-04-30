-- 0013_seed_missing_treatments.sql
-- ============================================================================
-- 목적:
--   1) 로컬 D1에 누락된 prevention / prosthetic 슬러그 row 복구
--      (0010 마이그레이션 시 구 슬러그 prosthetics/preventive 가 없어서
--       UPDATE 0건 → 신 row가 만들어지지 않은 상태)
--   2) prod에 이미 있는 빈 껍데기 row(full_content NULL)에 풍부한 콘텐츠 주입
--
-- 멱등성:
--   - INSERT OR IGNORE: row 있으면 skip (prod), 없으면 추가 (로컬)
--   - UPDATE WHERE COALESCE(LENGTH(full_content),0)=0: 이미 채워져 있으면 skip
--
-- 결과:
--   로컬·prod 양쪽 모두 18개 진료 슬러그 모두 row 보유 + 콘텐츠 동기화.
-- ============================================================================

-- 1) 누락된 row 복구 (로컬 전용 효과 / prod는 이미 있어서 IGNORE)
INSERT OR IGNORE INTO treatments (slug, name, tagline, short_desc, is_core, display_order)
VALUES
  ('prevention', '예방치과', '평생 자연치를 만드는 365일 시스템', 'GBT 에어플로우 + Q-ray 형광 진단 + 3·6·12개월 맞춤 리콜로 평생 자연치를 만드는 예방 시스템.', 0, 16),
  ('prosthetic', '보철', '씹는 즐거움을 되찾다', '원내 D.LAB + iTero 5D + CAD/CAM 정밀 밀링. 지르코니아·PFM·하이브리드 인레이 풀라인업.', 0, 4);

-- 2) 빈 껍데기 row에 풍부한 콘텐츠 주입 (로컬·prod 공통, 이미 채워져 있으면 skip)
UPDATE treatments
SET full_content = '예방치과는 GBT 에어플로우와 Q-ray 형광 진단을 결합한 365일 관리 시스템입니다. 가장 좋은 치료는 치료가 없는 것이라는 철학 아래, 3·6·12개월 맞춤 리콜로 평생 자연치를 유지합니다.

EMS 스위스 정품 GBT(Guided Biofilm Therapy) 에어플로우 8단계 표준 프로토콜로 치아·잇몸 손상 없이 플라크와 착색을 동시에 제거하고, 405nm 청색광 Q-ray 형광 진단으로 X-ray로 잡지 못하는 초기 우식·플라크·교정 탈회까지 가시화합니다.

소아는 6개월마다 불소 도포와 영구치 실런트, 성인은 양치법 코칭 + 칫솔질 시간 분석, 임플란트·교정 환자는 더 짧은 주기의 페리오플로우 케어를 적용합니다. 검진 패키지 15만원부터, 평생 가는 자연치를 위한 가장 합리적인 투자입니다.'
WHERE slug = 'prevention' AND COALESCE(LENGTH(full_content),0) = 0;

UPDATE treatments
SET full_content = '보철(크라운·브릿지·인레이)은 잘 만들면 평생을 갑니다. 대구365치과는 원내 디지털 기공실 D.LAB을 운영해 환자 입에서 즉시 색상·교합을 조정합니다. 외주 보철의 ''사진과 다른 색'', ''맞지 않는 물림'' 문제가 구조적으로 발생하지 않습니다.

iTero 5D 디지털 인상 스캐너로 마이크로미터 단위 정밀 인상을 채득하고, CAD/CAM으로 설계 → 밀링 → 신터링 퍼니스에서 본구워, 환자분이 자리에 계신 상태에서 색·물림을 미세 조정해 본접착합니다.

지르코니아(투명도·강도 균형), PFM(전치부 자연 색감), 하이브리드 인레이(어금니 충전 보강), 임시 보철까지 풀라인업으로 제작합니다. 인레이 25만원부터, 크라운 35만원부터 정직한 가격으로 안내드립니다.'
WHERE slug = 'prosthetic' AND COALESCE(LENGTH(full_content),0) = 0;
