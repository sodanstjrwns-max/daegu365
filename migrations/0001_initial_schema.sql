-- 대구365치과 홈페이지 통합 스키마

-- 회원 테이블
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  privacy_agreed INTEGER DEFAULT 1,
  marketing_agreed INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_phone ON members(phone);

-- 의료진 (원장)
CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  position TEXT,
  specialties TEXT, -- JSON array of 진료 slugs
  education TEXT,   -- JSON array
  career TEXT,      -- JSON array
  message TEXT,     -- 환자에게 전하는 메시지
  philosophy TEXT,  -- 진료 철학
  photo_url TEXT,
  is_representative INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_doctors_slug ON doctors(slug);

-- 진료 과목
CREATE TABLE IF NOT EXISTS treatments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  is_core INTEGER DEFAULT 0, -- 핵심 진료 여부
  short_desc TEXT,
  full_content TEXT, -- HTML/Markdown
  hero_image TEXT,
  display_order INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);

-- FAQ (진료과목별 + 전체)
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  treatment_slug TEXT, -- null이면 전체/공통
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_faqs_treatment ON faqs(treatment_slug);

-- 비포애프터
CREATE TABLE IF NOT EXISTS before_afters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  pano_before_url TEXT, -- 파노라마 전
  pano_after_url TEXT,  -- 파노라마 후
  intra_before_url TEXT,-- 구내포토 전
  intra_after_url TEXT, -- 구내포토 후
  age_group TEXT,       -- 20대, 30대 등
  gender TEXT,          -- male/female
  treatment_slug TEXT,  -- 진료 카테고리
  region_sido TEXT,     -- 시/도
  region_sigungu TEXT,  -- 시/군/구
  region_dong TEXT,     -- 동
  doctor_slug TEXT,     -- 담당 원장
  treatment_period TEXT,-- 치료 기간
  view_count INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ba_treatment ON before_afters(treatment_slug);
CREATE INDEX IF NOT EXISTS idx_ba_doctor ON before_afters(doctor_slug);
CREATE INDEX IF NOT EXISTS idx_ba_region ON before_afters(region_sigungu);

-- 블로그
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,    -- HTML
  thumbnail_url TEXT,
  author_doctor_slug TEXT,  -- 작성자 (원장)
  meta_description TEXT,
  meta_keywords TEXT,
  view_count INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_author ON blog_posts(author_doctor_slug);

-- 공지사항
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  is_main INTEGER DEFAULT 0, -- 대장 공지
  view_count INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_notices_main ON notices(is_main);

-- 백과사전
CREATE TABLE IF NOT EXISTS dictionary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  term TEXT NOT NULL,
  term_en TEXT,
  category TEXT,
  short_desc TEXT,
  full_desc TEXT,
  related_treatments TEXT, -- JSON array of treatment slugs
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_dict_term ON dictionary(term);
CREATE INDEX IF NOT EXISTS idx_dict_slug ON dictionary(slug);
CREATE INDEX IF NOT EXISTS idx_dict_category ON dictionary(category);

-- 수가 안내
CREATE TABLE IF NOT EXISTS fees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  price_range TEXT,
  note TEXT,
  display_order INTEGER DEFAULT 0
);

-- 지역별 SEO 페이지
CREATE TABLE IF NOT EXISTS region_seo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  region_name TEXT NOT NULL,
  treatment_slug TEXT,
  title TEXT,
  meta_description TEXT,
  h1 TEXT,
  content TEXT,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_region_seo_slug ON region_seo(slug);

-- 주소 검색용 (대구 위주)
CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sido TEXT NOT NULL,
  sigungu TEXT NOT NULL,
  dong TEXT NOT NULL,
  full_name TEXT NOT NULL  -- 검색용
);
CREATE INDEX IF NOT EXISTS idx_addr_full ON addresses(full_name);
CREATE INDEX IF NOT EXISTS idx_addr_dong ON addresses(dong);
CREATE INDEX IF NOT EXISTS idx_addr_sigungu ON addresses(sigungu);

-- 관리자 설정 (비밀번호 등)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
