-- 0048: before_afters 이미지 URL을 WebP로 전환 (F3/F2 성능 개선)
-- 대상: /r2/uploads/ba/ 업로드 사진 48장 + 코드성 이미지 4장 (webp 버전 R2 업로드 완료)
-- 원본 jpg/png는 R2에 유지 (호환성)

UPDATE before_afters SET pano_before_url = REPLACE(REPLACE(pano_before_url, '.jpg', '.webp'), '.png', '.webp')
WHERE pano_before_url LIKE '/r2/uploads/ba/%';
UPDATE before_afters SET pano_after_url = REPLACE(REPLACE(pano_after_url, '.jpg', '.webp'), '.png', '.webp')
WHERE pano_after_url LIKE '/r2/uploads/ba/%';
UPDATE before_afters SET intra_before_url = REPLACE(REPLACE(intra_before_url, '.jpg', '.webp'), '.png', '.webp')
WHERE intra_before_url LIKE '/r2/uploads/ba/%';
UPDATE before_afters SET intra_after_url = REPLACE(REPLACE(intra_after_url, '.jpg', '.webp'), '.png', '.webp')
WHERE intra_after_url LIKE '/r2/uploads/ba/%';

-- 코드성 이미지 (webp 이미 R2에 존재)
UPDATE before_afters SET pano_before_url = REPLACE(pano_before_url, '.jpg', '.webp')
WHERE pano_before_url LIKE '/r2/images/treatments/%.jpg';
UPDATE before_afters SET pano_after_url = REPLACE(pano_after_url, '.jpg', '.webp')
WHERE pano_after_url LIKE '/r2/images/treatments/%.jpg';
UPDATE before_afters SET intra_before_url = REPLACE(intra_before_url, '.jpg', '.webp')
WHERE intra_before_url LIKE '/r2/images/treatments/%.jpg';
UPDATE before_afters SET intra_after_url = REPLACE(intra_after_url, '.jpg', '.webp')
WHERE intra_after_url LIKE '/r2/images/treatments/%.jpg';
