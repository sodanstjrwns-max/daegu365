-- 0047: F3/F2 이미지 최적화 — 블로그 썸네일 jpg → webp 전환 (R2·static에 webp 업로드 완료)
UPDATE blog_posts SET thumbnail_url = '/static/images/treatment-room.webp'    WHERE thumbnail_url = '/static/images/treatment-room.jpg';
UPDATE blog_posts SET thumbnail_url = '/static/images/cta-operation-room.webp' WHERE thumbnail_url = '/static/images/cta-operation-room.jpg';
UPDATE blog_posts SET thumbnail_url = '/r2/images/treatments/implant-fixture.webp' WHERE thumbnail_url = '/r2/images/treatments/implant-fixture.jpg';
UPDATE blog_posts SET thumbnail_url = '/static/images/detail-crown.webp'      WHERE thumbnail_url = '/static/images/detail-crown.jpg';
UPDATE blog_posts SET thumbnail_url = '/static/images/doctor-mood.webp'       WHERE thumbnail_url = '/static/images/doctor-mood.jpg';
UPDATE blog_posts SET thumbnail_url = '/static/images/macro-veneer.webp'      WHERE thumbnail_url = '/static/images/macro-veneer.jpg';
