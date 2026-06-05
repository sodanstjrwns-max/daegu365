-- ==========================================================================
-- 비급여 의료수가표 전면 재시드 — 출처: 수가표(26_05_29).xls / 시행일자 2026-05-25
-- 의료법 제45조에 의거 고지. 부가세 10% 별도.
-- 기존 데이터 전체 삭제 후 엑셀 원본 기준으로 재구성.
-- ==========================================================================

DELETE FROM fees;

-- (1) 임플란트 (Fixture) — 맞춤형 기둥 + 지르코니아 크라운 포함
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('임플란트','fa-tooth','맞춤형 기둥 + 지르코니아 크라운 포함','메가젠 (ST)','80만원','맞춤형 기둥 + 지르코니아 크라운 포함', 1, 1, 1),
('임플란트','fa-tooth','맞춤형 기둥 + 지르코니아 크라운 포함','메가젠 (BD)','120만원', NULL, 0, 1, 2),
('임플란트','fa-tooth','맞춤형 기둥 + 지르코니아 크라운 포함','오스템 (BA)','110만원', NULL, 0, 1, 3),
('임플란트','fa-tooth','맞춤형 기둥 + 지르코니아 크라운 포함','오스템 (SOI)','120만원', NULL, 0, 1, 4),
('임플란트','fa-tooth','맞춤형 기둥 + 지르코니아 크라운 포함','스트라우만 (Anthogyr)','150만원', NULL, 0, 1, 5);

-- (2) 뼈이식
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('뼈이식','fa-bone',NULL,'단순 뼈이식','30만원', NULL, 0, 2, 1),
('뼈이식','fa-bone',NULL,'복잡 뼈이식','50만원', NULL, 0, 2, 2),
('뼈이식','fa-bone',NULL,'상악동거상술 (Crestal) 수직','50만원', NULL, 0, 2, 3),
('뼈이식','fa-bone',NULL,'상악동거상술 (Lateral) 측방','100만원', NULL, 0, 2, 4);

-- (3) 임플란트 관련
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('임플란트 관련','fa-screwdriver-wrench',NULL,'연결치 (Pontic)','50만원', NULL, 0, 3, 1),
('임플란트 관련','fa-screwdriver-wrench',NULL,'맞춤형 기둥 (Custom Abutment)','25만원', NULL, 0, 3, 2),
('임플란트 관련','fa-screwdriver-wrench',NULL,'임플란트 지르코니아 크라운','50만원', NULL, 0, 3, 3),
('임플란트 관련','fa-screwdriver-wrench',NULL,'타원 임플란트 나사조임','10만원','레진홀 포함', 0, 3, 4),
('임플란트 관련','fa-screwdriver-wrench',NULL,'타원 임플란트 레진홀','2만원', NULL, 0, 3, 5),
('임플란트 관련','fa-screwdriver-wrench',NULL,'Splint (정출방지)','별도 문의', NULL, 0, 3, 6);

-- (4) 의식하진정요법
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('의식하진정요법','fa-syringe',NULL,'수면치료','20만원', NULL, 1, 4, 1);

-- (5) 지혈제 · 재생주사
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('지혈제 · 재생주사','fa-droplet',NULL,'큐탄플라스트 (지혈제)','3~5만원', NULL, 0, 5, 1),
('지혈제 · 재생주사','fa-droplet',NULL,'PDRN 재생주사','10만원', NULL, 0, 5, 2);

-- (6) 틀니
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('틀니','fa-teeth',NULL,'프리미엄 틀니 (JD)','별도 20만원', NULL, 0, 6, 1),
('틀니','fa-teeth',NULL,'전체 틀니','150만원', NULL, 0, 6, 2),
('틀니','fa-teeth',NULL,'부분 틀니','130만원', NULL, 0, 6, 3),
('틀니','fa-teeth',NULL,'임플란트 틀니','150만원', NULL, 0, 6, 4),
('틀니','fa-teeth',NULL,'틀니 똑딱이 (Male)','25만원','Female은 임플란트에 포함', 0, 6, 5),
('틀니','fa-teeth',NULL,'틀니 똑딱이 교체','3만원','보증기간 이후', 0, 6, 6),
('틀니','fa-teeth',NULL,'틀니 수리','10만원', NULL, 0, 6, 7),
('틀니','fa-teeth',NULL,'틀니 개상','30만원', NULL, 0, 6, 8),
('틀니','fa-teeth',NULL,'임시 틀니','30만원', NULL, 0, 6, 9),
('틀니','fa-teeth',NULL,'고리형 임시치아','10만원', NULL, 0, 6, 10);

-- (7) 레진
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('레진','fa-tooth',NULL,'구치부 1면','8만원', NULL, 0, 7, 1),
('레진','fa-tooth',NULL,'구치부 2면 이상','10만원', NULL, 0, 7, 2),
('레진','fa-tooth',NULL,'전치부 1면','10만원', NULL, 0, 7, 3),
('레진','fa-tooth',NULL,'전치부 2면 이상','15만원', NULL, 0, 7, 4),
('레진','fa-tooth',NULL,'치경부','7만원', NULL, 0, 7, 5),
('레진','fa-tooth',NULL,'정중이개 (Diastema)','20만원', NULL, 0, 7, 6),
('레진','fa-tooth',NULL,'반점치 (아이콘 레진)','25만원', NULL, 0, 7, 7);

-- (8) 인레이 / 온레이
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('인레이 / 온레이','fa-gem',NULL,'세라믹 인레이','35만원', NULL, 0, 8, 1),
('인레이 / 온레이','fa-gem',NULL,'세라믹 온레이','40만원', NULL, 0, 8, 2);

-- (9) 보강재료
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('보강재료','fa-layer-group',NULL,'MTA','5만원', NULL, 0, 9, 1),
('보강재료','fa-layer-group',NULL,'레진코어','10만원', NULL, 0, 9, 2),
('보강재료','fa-layer-group',NULL,'포스트 (Fiber)','15만원', NULL, 0, 9, 3),
('보강재료','fa-layer-group',NULL,'포스트 (Casting)','20만원', NULL, 0, 9, 4);

-- (10) 보철
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('보철','fa-crown',NULL,'지르코니아 크라운','50만원', NULL, 1, 10, 1),
('보철','fa-crown',NULL,'PFM 크라운','45만원', NULL, 0, 10, 2),
('보철','fa-crown',NULL,'임시치아','10만원', NULL, 0, 10, 3);

-- (11) 소아치료
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아치료','fa-child',NULL,'소아 레진 (1면)','6만원', NULL, 0, 11, 1),
('소아치료','fa-child',NULL,'소아 레진 (2면)','8만원', NULL, 0, 11, 2),
('소아치료','fa-child',NULL,'소아 레진 (3면)','10만원', NULL, 0, 11, 3),
('소아치료','fa-child',NULL,'SS 크라운','15만원', NULL, 0, 11, 4),
('소아치료','fa-child',NULL,'지르코니아 크라운','20만원', NULL, 0, 11, 5),
('소아치료','fa-child',NULL,'비급여 홈메우기','5만원', NULL, 0, 11, 6),
('소아치료','fa-child',NULL,'불소도포','3만원', NULL, 0, 11, 7),
('소아치료','fa-child',NULL,'웃음가스 (N2O)','2만원', NULL, 0, 11, 8);

-- (12) 교정 — 교정치료
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정치료','fa-teeth-open',NULL,'정밀진단','20만원', NULL, 0, 12, 1),
('교정치료','fa-teeth-open',NULL,'클리피씨 전체교정','580만원', NULL, 1, 12, 2),
('교정치료','fa-teeth-open',NULL,'S라인 전체교정','580만원', NULL, 0, 12, 3),
('교정치료','fa-teeth-open',NULL,'부분교정 (1/3악당)','200만원', NULL, 0, 12, 4),
('교정치료','fa-teeth-open',NULL,'인비절라인 (Comprehensive)','700만원', NULL, 1, 12, 5),
('교정치료','fa-teeth-open',NULL,'인비절라인 (Moderate)','550만원', NULL, 0, 12, 6),
('교정치료','fa-teeth-open',NULL,'인비절라인 (Lite)','450만원', NULL, 0, 12, 7),
('교정치료','fa-teeth-open',NULL,'인비절라인 (First) 성장기','400만원', NULL, 0, 12, 8),
('교정치료','fa-teeth-open',NULL,'성장판 검사 (퍼스트 한정)','3만원', NULL, 0, 12, 9),
('교정치료','fa-teeth-open',NULL,'인비절라인 (구개확장)','100만원', NULL, 0, 12, 10),
('교정치료','fa-teeth-open',NULL,'악교정수술 위한 전체교정','100만원','별도', 0, 12, 11);

-- (13) 소아교정
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아교정','fa-child-reaching',NULL,'소아 RPE (고정식 구개확장)','80만원', NULL, 0, 13, 1),
('소아교정','fa-child-reaching',NULL,'성인 MARPE (고정식 구개확장)','120만원', NULL, 0, 13, 2),
('소아교정','fa-child-reaching',NULL,'프리올소 (근기능장치)','70만원', NULL, 0, 13, 3),
('소아교정','fa-child-reaching',NULL,'2차 프리올소','20만원', NULL, 0, 13, 4);

-- (14) 공간유지장치
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('공간유지장치','fa-grip-lines',NULL,'Band(Crown) & Loop (고정식)','20만원', NULL, 0, 14, 1),
('공간유지장치','fa-grip-lines',NULL,'Nance (고정식)','40만원', NULL, 0, 14, 2),
('공간유지장치','fa-grip-lines',NULL,'Lingual Arch (고정식)','40만원', NULL, 0, 14, 3),
('공간유지장치','fa-grip-lines',NULL,'Mini Screw & Pontic (임플란트 공간유지)','30만원', NULL, 0, 14, 4);

-- (15) 교정 부가장치
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정 부가장치','fa-toolbox',NULL,'매복치 견인술','50만원', NULL, 0, 15, 1),
('교정 부가장치','fa-toolbox',NULL,'Halterman','35만원','재료교체 3A 별도', 0, 15, 2),
('교정 부가장치','fa-toolbox',NULL,'Twin Block (가철식)','120만원', NULL, 0, 15, 3),
('교정 부가장치','fa-toolbox',NULL,'Face Mask (가철식)','50만원', NULL, 0, 15, 4),
('교정 부가장치','fa-toolbox',NULL,'악궁확장장치 (가철식)','70만원', NULL, 0, 15, 5),
('교정 부가장치','fa-toolbox',NULL,'Tongue Crib (고정식)','40만원', NULL, 0, 15, 6),
('교정 부가장치','fa-toolbox',NULL,'Quad Helix (고정식)','70만원', NULL, 0, 15, 7),
('교정 부가장치','fa-toolbox',NULL,'Active Plate (고정식)','80만원', NULL, 0, 15, 8),
('교정 부가장치','fa-toolbox',NULL,'Active Plate 추가디자인 설계','20만원', NULL, 0, 15, 9),
('교정 부가장치','fa-toolbox',NULL,'교정 전 턱관절장치','50만원', NULL, 0, 15, 10),
('교정 부가장치','fa-toolbox',NULL,'미니스크류','10만원','별도', 0, 15, 11),
('교정 부가장치','fa-toolbox',NULL,'교정발치','5만원', NULL, 0, 15, 12);

-- (16) 교정 후 유지장치
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정 후 유지장치','fa-shield-halved',NULL,'고정식 유지장치 (Fixed Wire)','20만원', NULL, 0, 16, 1),
('교정 후 유지장치','fa-shield-halved',NULL,'가철식 유지장치','20만원', NULL, 0, 16, 2);

-- (17) 교정 기타
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정 기타','fa-ellipsis',NULL,'기간 외 추가장치','50만원', NULL, 0, 17, 1),
('교정 기타','fa-ellipsis',NULL,'장치 재제작 (파손/분실)','20만원', NULL, 0, 17, 2),
('교정 기타','fa-ellipsis',NULL,'장치 일시 탈부착','30~100만원', NULL, 0, 17, 3),
('교정 기타','fa-ellipsis',NULL,'타치과 Screw 제거','5만원', NULL, 0, 17, 4),
('교정 기타','fa-ellipsis',NULL,'타치과 Fixed 제거','1만원', NULL, 0, 17, 5),
('교정 기타','fa-ellipsis',NULL,'타치과 Fixed 레진','5만원', NULL, 0, 17, 6),
('교정 기타','fa-ellipsis',NULL,'타치과 Fixed 재제작','30만원', NULL, 0, 17, 7);

-- (18) 교정 예방
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정 예방','fa-heart-pulse',NULL,'교정 예방프로그램 (1회)','10만원', NULL, 0, 18, 1),
('교정 예방','fa-heart-pulse',NULL,'교정 예방프로그램 (4회)','28만원', NULL, 0, 18, 2);

-- (19) 심미치료 — 라미네이트
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('라미네이트','fa-wand-magic-sparkles',NULL,'라미네이트 (Standard)','60만원', NULL, 1, 19, 1),
('라미네이트','fa-wand-magic-sparkles',NULL,'라미네이트 (Premium)','80만원', NULL, 0, 19, 2);

-- (20) 미백
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('미백','fa-tooth',NULL,'전문가 미백 (1회)','15만원', NULL, 0, 20, 1),
('미백','fa-tooth',NULL,'전문가 미백 (2회)','30만원', NULL, 0, 20, 2),
('미백','fa-tooth',NULL,'전문가 미백 (3회)','40만원', NULL, 0, 20, 3);

-- (21) 보톡스 · 스킨
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('보톡스 · 스킨','fa-spa',NULL,'보톡스','10만원', NULL, 0, 21, 1),
('보톡스 · 스킨','fa-spa',NULL,'텐써마 300샷','70만원', NULL, 0, 21, 2),
('보톡스 · 스킨','fa-spa',NULL,'텐써마 600샷','140만원', NULL, 0, 21, 3);

-- (22) 기타
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('기타','fa-circle-info',NULL,'비급여 스케일링','6만원', NULL, 0, 22, 1),
('기타','fa-circle-info',NULL,'비급여 LC GI','3만원', NULL, 0, 22, 2),
('기타','fa-circle-info',NULL,'타치과 임시치아 재부착','1만원', NULL, 0, 22, 3),
('기타','fa-circle-info',NULL,'이갈이 장치','50만원', NULL, 0, 22, 4);
