-- ==========================================================================
-- 비급여 의료수가표 — 스키마 + 인덱스만
-- (시드 데이터는 0017로 분리 — D1이 동일 트랜잭션 내에서 새 컬럼을 인식하지 못하는 이슈 우회)
-- ==========================================================================

CREATE TABLE IF NOT EXISTS fees (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  category        TEXT    NOT NULL,
  category_icon   TEXT    NOT NULL DEFAULT 'fa-tooth',
  group_note      TEXT,
  name            TEXT    NOT NULL,
  price           TEXT    NOT NULL,
  note            TEXT,
  is_highlight    INTEGER NOT NULL DEFAULT 0,
  is_published    INTEGER NOT NULL DEFAULT 1,
  sort_group      INTEGER NOT NULL DEFAULT 0,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fees_group_order ON fees(sort_group, sort_order);
CREATE INDEX IF NOT EXISTS idx_fees_category    ON fees(category);
