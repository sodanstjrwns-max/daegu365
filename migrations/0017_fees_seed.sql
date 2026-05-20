-- ==========================================================================
-- 비급여 의료수가표 시드 (65 항목 = 임플란트 이벤트 1 + 원본 64)
-- ==========================================================================

-- (1) 임플란트
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','임플란트 이벤트','문의', '한정 이벤트 — 자세한 가격은 상담 시 안내', 1, 1, 0),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','메가젠 (ST)','80만원', NULL, 1, 1, 1),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','오스템 (BA)','110만원', NULL, 0, 1, 2),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','메가젠 (블루다이아몬드)','120만원', NULL, 0, 1, 3),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','오스템 (SOI)','120만원', NULL, 0, 1, 4),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','스트라우만 (앤서지)','150만원', NULL, 0, 1, 5),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','임플란트 연결치 (폰틱)','50만원', NULL, 0, 1, 6),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','맞춤기둥','25만원', NULL, 0, 1, 7),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','타치과 임플란트 크라운 (지르코니아)','50만원', NULL, 0, 1, 8),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','타치과 임플란트 나사조임','10만원','레진홀 포함', 0, 1, 9),
('임플란트','fa-tooth','맞춤기둥+지르코니아 포함 · 보증기간 (픽스쳐 5년, 상부보철 평생)','타치과 레진홀','2만원','단순 홀메움', 0, 1, 10);

-- (2) 골이식
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('골이식','fa-bone',NULL,'골이식 단순','30만원', NULL, 0, 2, 1),
('골이식','fa-bone',NULL,'골이식 복잡','50만원', NULL, 0, 2, 2),
('골이식','fa-bone',NULL,'상악동거상술 수직','50만원~','50 / 100 / 150 / 200 (1치당)', 0, 2, 3),
('골이식','fa-bone',NULL,'상악동거상술 측방','100만원', NULL, 0, 2, 4);

-- (3) 마취 · 지혈제
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('마취 · 지혈제','fa-syringe',NULL,'진정하요법','20만원', NULL, 0, 3, 1),
('마취 · 지혈제','fa-syringe',NULL,'큐탄플라스트 (지혈제)','5만원','OP나 ext 동의서 작성시 설명', 0, 3, 2);

-- (4) 틀니
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('틀니','fa-teeth',NULL,'플리퍼 (고리형 임시치아)','10만원', NULL, 0, 4, 1),
('틀니','fa-teeth',NULL,'임시틀니','30만원','1악당', 0, 4, 2),
('틀니','fa-teeth',NULL,'부분틀니','130만원','1악당', 0, 4, 3),
('틀니','fa-teeth',NULL,'전체틀니 & 임플란트 틀니','150만원','1악당', 0, 4, 4),
('틀니','fa-teeth',NULL,'틀니 똑딱이','25만원','개당', 0, 4, 5),
('틀니','fa-teeth',NULL,'틀니수리','10만원','보증기간 이후 및 타치과', 0, 4, 6),
('틀니','fa-teeth',NULL,'틀니개상','30만원','보증기간 이후 및 타치과', 0, 4, 7);

-- (5) 보존 (레진)
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('보존 (레진)','fa-tooth',NULL,'치경부','7만원', NULL, 0, 5, 1),
('보존 (레진)','fa-tooth',NULL,'구치부 1면 (어금니)','8만원', NULL, 0, 5, 2),
('보존 (레진)','fa-tooth',NULL,'구치부 2면 이상 (어금니)','10만원', NULL, 0, 5, 3),
('보존 (레진)','fa-tooth',NULL,'전치부 1면 (앞니)','10만원', NULL, 0, 5, 4),
('보존 (레진)','fa-tooth',NULL,'전치부 2면 이상 (앞니)','15만원', NULL, 0, 5, 5),
('보존 (레진)','fa-tooth',NULL,'아이콘레진 (반점치)','25만원','추가 1회당 5만원', 0, 5, 6),
('보존 (레진)','fa-tooth',NULL,'정중이개 1면당 (앞니 벌어짐)','20만원', NULL, 0, 5, 7);

-- (6) 보철 (크라운 · 인레이)
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('보철 (크라운 · 인레이)','fa-crown',NULL,'MTA','5만원', NULL, 0, 6, 1),
('보철 (크라운 · 인레이)','fa-crown',NULL,'레진코어','10만원', NULL, 0, 6, 2),
('보철 (크라운 · 인레이)','fa-crown',NULL,'포스트','15만원', NULL, 0, 6, 3),
('보철 (크라운 · 인레이)','fa-crown',NULL,'캐스팅포스트','20만원', NULL, 0, 6, 4),
('보철 (크라운 · 인레이)','fa-crown',NULL,'하이브리드 인레이','35만원', NULL, 0, 6, 5),
('보철 (크라운 · 인레이)','fa-crown',NULL,'PFM 크라운','45만원', NULL, 0, 6, 6),
('보철 (크라운 · 인레이)','fa-crown',NULL,'지르코니아 크라운','50만원', NULL, 1, 6, 7),
('보철 (크라운 · 인레이)','fa-crown',NULL,'임시치아','10만원','1치당', 0, 6, 8);

-- (7) 교정
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','진단비','20만원', NULL, 0, 7, 1),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','인비절라인 Lite','500만원', NULL, 0, 7, 2),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','인비절라인 Moderate','600만원', NULL, 0, 7, 3),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','인비절라인 Comprehensive (무제한)','750만원', NULL, 1, 7, 4),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','인비절라인 (성장기) First','400만원', NULL, 0, 7, 5),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','클리피씨 전체교정','580만원', NULL, 0, 7, 6),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','S라인 전체교정','580만원', NULL, 0, 7, 7),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','부분교정 (1/3악당)','200만원','난이도에 따라 변동가능성', 0, 7, 8),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','기간 외 추가장치','50만원', NULL, 0, 7, 9),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','소아용 RPE (구개확장장치)','50만원', NULL, 0, 7, 10),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','성인용 마르페 MARPE (구개확장장치)','70만원', NULL, 0, 7, 11),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','가철식 유지장치 (Wrap around)','20만원','악당', 0, 7, 12),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','고정식 유지장치 (Fixed Retainer)','20만원','악당', 0, 7, 13),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','미니스크류','10만원', NULL, 0, 7, 14),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','교정발치 (비보험)','5만원', NULL, 0, 7, 15),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','타치과 Fixed Retainer 제거','1만원','1치당', 0, 7, 16),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','타치과 Fixed Retainer 레진','5만원','1치당', 0, 7, 17),
('교정','fa-grip-lines','진단 후 정확한 치료계획과 비용을 안내드립니다','타치과 Fixed Retainer 재제작','30만원','레진포함', 0, 7, 18);

-- (8) 심미
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('심미','fa-star','부가세 10% 별도','라미네이트','60만원', NULL, 1, 8, 1),
('심미','fa-star','부가세 10% 별도','전문가 미백 1회','15만원', NULL, 0, 8, 2),
('심미','fa-star','부가세 10% 별도','전문가 미백 2회','30만원', NULL, 0, 8, 3),
('심미','fa-star','부가세 10% 별도','전문가 미백 3회','40만원', NULL, 0, 8, 4);

-- (9) 소아 · 레진
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아 · 레진','fa-child',NULL,'유치 1면','6만원', NULL, 0, 9, 1),
('소아 · 레진','fa-child',NULL,'유치 2면','8만원', NULL, 0, 9, 2),
('소아 · 레진','fa-child',NULL,'유치 3면','10만원', NULL, 0, 9, 3),
('소아 · 레진','fa-child',NULL,'영구치 1면','6만원', NULL, 0, 9, 4),
('소아 · 레진','fa-child',NULL,'영구치 2면','8만원', NULL, 0, 9, 5),
('소아 · 레진','fa-child',NULL,'영구치 3면','10만원', NULL, 0, 9, 6);

-- (10) 소아 · 크라운
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아 · 크라운','fa-crown',NULL,'SS 크라운 (유구치)','15만원','기성', 0, 10, 1),
('소아 · 크라운','fa-crown',NULL,'지르코니아 크라운 (유전치)','20만원','기성', 0, 10, 2);

-- (11) 소아 · 장치
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아 · 장치','fa-tools',NULL,'Band & loop 공간유지장치','20만원', NULL, 0, 11, 1),
('소아 · 장치','fa-tools',NULL,'Nance (고정식) 공간유지장치','40만원', NULL, 0, 11, 2),
('소아 · 장치','fa-tools',NULL,'Lingual arch (고정식) 공간유지장치','40만원', NULL, 0, 11, 3),
('소아 · 장치','fa-tools',NULL,'할터만 Halterman (#6 락킹해소)','35만원','재료교체시 3만원 추가', 0, 11, 4),
('소아 · 장치','fa-tools',NULL,'근기능장치','70만원','프리올소 (추가시 20만원)', 0, 11, 5);

-- (12) 소아 · 기타
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('소아 · 기타','fa-baby',NULL,'실란트 (홈메우기)','5만원','보험진료 시 보험적용', 0, 12, 1),
('소아 · 기타','fa-baby',NULL,'세퍼레이팅 링','3만원', NULL, 0, 12, 2),
('소아 · 기타','fa-baby',NULL,'불소바니쉬','3만원','보험진료 시 보험적용', 0, 12, 3),
('소아 · 기타','fa-baby',NULL,'웃음가스 (N2O)','2만원','보험진료 시 보험적용', 0, 12, 4);

-- (13) 기타
INSERT INTO fees (category, category_icon, group_note, name, price, note, is_highlight, sort_group, sort_order) VALUES
('기타','fa-stethoscope',NULL,'비급여 스케일링','6만원','양악기준 (3/1악당 1만원)', 0, 13, 1),
('기타','fa-stethoscope',NULL,'비급여 GI','3만원', NULL, 0, 13, 2),
('기타','fa-stethoscope',NULL,'타치과 임시치아 재부착','1만원', NULL, 0, 13, 3),
('기타','fa-stethoscope',NULL,'이갈이장치','30만원','1악당', 0, 13, 4),
('기타','fa-stethoscope',NULL,'턱보톡스','10만원','VAT 10% 별도', 0, 13, 5),
('기타','fa-stethoscope',NULL,'PDRN','10만원', NULL, 0, 13, 6);
