-- 0021_consultations.sql
-- 온라인 상담·예약 신청 DB
-- 환자가 모달에서 작성한 상담 요청을 직접 우리 D1에 저장 (네이버 X)

CREATE TABLE IF NOT EXISTS consultations (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,

  -- 진료 정보
  treatment       TEXT    NOT NULL,                  -- 선택한 진료명 (예: '수면임플란트')
  treatment_tier  TEXT,                              -- 'signature' | 'special' | 'general'

  -- 본인 정보
  name            TEXT    NOT NULL,                  -- 이름
  phone           TEXT    NOT NULL,                  -- 연락처 (필수)
  birth_year      TEXT,                              -- 출생연도 (선택, 연령대 통계용)
  gender          TEXT,                              -- 'male' | 'female' | NULL (선택)

  -- 희망 일정 / 메모
  preferred_date  TEXT,                              -- 희망 일자 (YYYY-MM-DD, 선택)
  preferred_time  TEXT,                              -- 희망 시간대 ('morning'|'afternoon'|'evening'|'any')
  message         TEXT,                              -- 추가 메시지 (선택)

  -- 동의 / 채널
  privacy_agreed  INTEGER NOT NULL DEFAULT 0,        -- 개인정보 수집·이용 동의 (1/0)
  marketing_agreed INTEGER NOT NULL DEFAULT 0,       -- 마케팅 활용 동의 (선택, 1/0)
  source_channel  TEXT    DEFAULT 'web_modal',       -- 'web_modal'|'phone'|'kakao'|'naver'|'walkin'
  source_page     TEXT,                              -- 어느 페이지에서 유입됐는지 (URL)

  -- 운영 상태 (페이션트 퍼널 관리용)
  status          TEXT    NOT NULL DEFAULT 'new',    -- 'new'|'contacted'|'booked'|'no_show'|'completed'|'cancelled'
  assigned_to     TEXT,                              -- 담당자 (선택)
  internal_memo   TEXT,                              -- 내부 메모 (실장/원장만)
  contacted_at    DATETIME,                          -- 최초 연락 시각
  booked_at       DATETIME,                          -- 실제 예약 확정 시각

  -- 메타
  ip_address      TEXT,                              -- 요청 IP (스팸 방지)
  user_agent      TEXT,                              -- UA (디바이스 통계)
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consultations_status      ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_treatment   ON consultations(treatment);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at  ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_phone       ON consultations(phone);
