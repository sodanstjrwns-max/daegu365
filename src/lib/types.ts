export type Bindings = {
  DB: D1Database
  R2: R2Bucket
  SESSION: KVNamespace
}

export type Doctor = {
  id: number
  slug: string
  name: string
  position: string
  specialties: string // JSON
  education: string
  career: string
  message: string
  philosophy: string
  photo_url: string | null
  is_representative: number
  display_order: number
}

export type Treatment = {
  id: number
  slug: string
  name: string
  tagline: string
  is_core: number
  short_desc: string
  full_content: string | null
  hero_image: string | null
  display_order: number
  view_count: number
}

export type FAQ = {
  id: number
  treatment_slug: string | null
  question: string
  answer: string
  display_order: number
}

export type BeforeAfter = {
  id: number
  title: string
  description: string
  pano_before_url: string | null
  pano_after_url: string | null
  intra_before_url: string | null
  intra_after_url: string | null
  age_group: string
  gender: string
  treatment_slug: string
  region_sido: string
  region_sigungu: string
  region_dong: string
  doctor_slug: string
  treatment_period: string
  view_count: number
  is_published: number
  created_at: string
}

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  thumbnail_url: string | null
  author_doctor_slug: string
  meta_description: string
  meta_keywords: string
  view_count: number
  is_published: number
  created_at: string
  updated_at: string
}

export type Notice = {
  id: number
  title: string
  content: string
  thumbnail_url: string | null
  is_main: number
  view_count: number
  is_published: number
  created_at: string
}

export type DictEntry = {
  id: number
  slug: string
  term: string
  term_en: string
  category: string
  short_desc: string
  full_desc: string
  related_treatments: string
  view_count: number
}

export type RegionSEO = {
  id: number
  slug: string
  region_name: string
  treatment_slug: string
  title: string
  meta_description: string
  h1: string
  content: string
  view_count: number
}
