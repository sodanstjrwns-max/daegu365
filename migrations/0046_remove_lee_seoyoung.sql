-- 0046: 원장단 변동 (7인 → 6인) — 이서영 원장(치주과 전문의·평생관리센터장) 퇴사 반영
-- 1) 블로그 저자 참조 해제 (스케일링 보험 글) + excerpt의 "치주과 전문의가" 문구 수정
UPDATE blog_posts
SET author_doctor_slug = NULL,
    excerpt = REPLACE(excerpt, '치주과 전문의가 정리했습니다', '대구365치과가 정리했습니다'),
    updated_at = CURRENT_TIMESTAMP
WHERE author_doctor_slug = 'lee-seoyoung';

-- 2) doctors 테이블에서 이서영 삭제 → /doctors 목록·상세·사이트맵에서 자동 제외
DELETE FROM doctors WHERE slug = 'lee-seoyoung';
