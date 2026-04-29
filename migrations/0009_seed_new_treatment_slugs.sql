-- 0009_seed_new_treatment_slugs.sql
-- 신규 풀볼륨 페이지 18종에 맞춰 treatments 슬러그 정합성 확보

-- 1) 특화 진료 (라우터 분기 신규 4종)
INSERT OR IGNORE INTO treatments (slug, name, tagline, is_core, short_desc, display_order) VALUES
('sleep-therapy',       '수면치료 시스템',     '치과의 기억을 바꿔드립니다',                      1, '의식하 진정 + 4단계 무통마취 통합 시스템',          4),
('painless-anesthesia', '4단계 무통마취',      '바늘이 들어가는 그 순간을 없애드립니다',          1, '가글→도포→컴퓨터제어→마무리 4단계 프로토콜',         5),
('airflow-gbt',         '에어플로우 (GBT)',    '긁어내지 않습니다. 플라크만 씻어냅니다.',         0, 'EMS 스위스 정품 GBT 8단계 표준 프로토콜',           13),
('pediatric-ortho',     '소아 교정장치',       '7~10세, 얼굴이 만들어지는 단 한 번의 시기',       0, 'RPE·페이스마스크·근기능장치 골든타임 교정',         14);

-- 2) 일반 진료 슬러그 신규 4종 (cavity-endo-crown, perio, icon-resin, qray)
INSERT OR IGNORE INTO treatments (slug, name, tagline, is_core, short_desc, display_order) VALUES
('cavity-endo-crown', '충치·신경치료·크라운', '자연치아를 살리는 보존 라인',          0, '충치-신경-크라운까지 한 흐름의 보존 치료',     15),
('perio',             '치주치료',             '잇몸은 치아의 기초입니다',             0, '비외과·외과 치주치료 풀라인',                   16),
('icon-resin',        '아이콘 레진 (백반치)', '깎지 않고 색만 지웁니다',              0, '백반치 미세침투 레진 아이콘 시술',              17),
('qray',              'Q-ray 형광 충치 진단', '보이지 않는 충치를 빛으로 봅니다',     0, 'QLF 정량 형광·방사선 0의 차세대 진단',          18);

-- 3) 보철/예방 신규 슬러그 (prosthetic, prevention, in-house-lab) — 기존 prosthetics/preventive와 별개로 라우터가 신규 슬러그를 사용
INSERT OR IGNORE INTO treatments (slug, name, tagline, is_core, short_desc, display_order) VALUES
('prosthetic',  '보철 (크라운·브릿지)', '씹는 즐거움을 되찾다',           0, '정밀 크라운·브릿지·인레이',                 19),
('prevention',  '예방치과',             '치료보다 예방이 먼저',           0, '스케일링·불소·실란트 예방 프로그램',         20),
('in-house-lab','원내 디지털 기공실',   '당일 보철, 정밀한 컬러 매칭',    0, '5축 밀링·세라믹 오븐 원내 디지털 기공',     21);
