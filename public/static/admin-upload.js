/* 대구365치과 · 관리자 이미지 업로드 위젯
   - 단일 슬롯 드롭존 (#dropzone-{name}) → input[name="{name}"]에 URL 자동 채움
   - 본문 textarea(#contentEditor) 드래그앤드롭 → <img src="/r2/..."> 자동 삽입
   - 페이스트(클립보드) 이미지도 지원
*/
(function () {
  'use strict';

  async function uploadFile(file, kind) {
    if (!file) throw new Error('no file');
    if (!/^image\//i.test(file.type)) throw new Error('이미지 파일만 가능합니다');
    if (file.size > 15 * 1024 * 1024) throw new Error('파일이 너무 큽니다 (최대 15MB)');

    const fd = new FormData();
    fd.append('file', file);
    fd.append('kind', kind || 'misc');
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'include' });
    const data = await r.json();
    if (!r.ok || !data.ok) throw new Error(data.error || '업로드 실패');
    return data.url;
  }

  function readableSize(n) {
    if (n < 1024) return n + 'B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + 'KB';
    return (n / 1024 / 1024).toFixed(2) + 'MB';
  }

  // 단일 슬롯 드롭존 — data-target="input name", data-kind="ba|blog|notice"
  function bindDropzone(zone) {
    const targetName = zone.getAttribute('data-target');
    const kind = zone.getAttribute('data-kind') || 'misc';
    const input = document.querySelector('input[name="' + targetName + '"]');
    if (!input) return;

    const preview = zone.querySelector('[data-preview]');
    const status = zone.querySelector('[data-status]');
    const fileInput = zone.querySelector('input[type="file"]');

    function setPreview(url) {
      if (!preview) return;
      if (url) {
        preview.innerHTML = '<img src="' + url + '" style="max-width:100%;max-height:160px;border-radius:8px;display:block;" />';
      } else {
        preview.innerHTML = '';
      }
    }

    // 초기 미리보기 (수정 모드)
    if (input.value && input.value.startsWith('/r2/')) setPreview(input.value);

    async function handleFile(file) {
      try {
        if (status) status.textContent = '업로드 중… (' + readableSize(file.size) + ')';
        zone.classList.add('uploading');
        const url = await uploadFile(file, kind);
        input.value = url;
        setPreview(url);
        if (status) status.textContent = '✓ 업로드 완료';
        setTimeout(function () { if (status) status.textContent = ''; }, 1800);
      } catch (e) {
        if (status) status.textContent = '✗ ' + (e.message || '실패');
      } finally {
        zone.classList.remove('uploading');
      }
    }

    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', function () { zone.classList.remove('dragover'); });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('dragover');
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) handleFile(f);
    });
    zone.addEventListener('click', function (e) {
      if (e.target === fileInput) return;
      fileInput && fileInput.click();
    });
    if (fileInput) {
      fileInput.addEventListener('change', function () {
        const f = fileInput.files && fileInput.files[0];
        if (f) handleFile(f);
      });
    }
    // URL 직접 수정 시 미리보기 동기화
    input.addEventListener('change', function () { setPreview(input.value); });
    // 슬롯 초기화 버튼
    const clearBtn = zone.querySelector('[data-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        input.value = '';
        setPreview('');
      });
    }
  }

  // textarea에 본문 이미지 드래그앤드롭/페이스트 → <img> 삽입
  function bindEditorUpload(editor, kind) {
    function insertAtCursor(text) {
      const s = editor.selectionStart, e = editor.selectionEnd;
      editor.value = editor.value.slice(0, s) + text + editor.value.slice(e);
      editor.focus();
      editor.selectionStart = editor.selectionEnd = s + text.length;
    }
    async function handle(file) {
      if (!file || !/^image\//i.test(file.type)) return;
      const placeholder = '\n<!-- uploading ' + file.name + ' -->\n';
      insertAtCursor(placeholder);
      try {
        const url = await uploadFile(file, kind);
        editor.value = editor.value.replace(placeholder, '\n<img src="' + url + '" alt="" loading="lazy" />\n');
      } catch (err) {
        editor.value = editor.value.replace(placeholder, '\n<!-- 업로드 실패: ' + (err.message || '오류') + ' -->\n');
      }
    }
    editor.addEventListener('dragover', function (e) {
      if (e.dataTransfer && e.dataTransfer.types && Array.prototype.indexOf.call(e.dataTransfer.types, 'Files') >= 0) {
        e.preventDefault();
        editor.classList.add('dragover');
      }
    });
    editor.addEventListener('dragleave', function () { editor.classList.remove('dragover'); });
    editor.addEventListener('drop', function (e) {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length) {
        e.preventDefault();
        editor.classList.remove('dragover');
        Array.prototype.forEach.call(files, handle);
      }
    });
    editor.addEventListener('paste', function (e) {
      const items = e.clipboardData && e.clipboardData.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && /^image\//i.test(items[i].type)) {
          const f = items[i].getAsFile();
          if (f) {
            e.preventDefault();
            handle(f);
          }
        }
      }
    });
  }

  function init() {
    document.querySelectorAll('[data-dropzone]').forEach(bindDropzone);
    const editor = document.getElementById('contentEditor');
    if (editor) {
      const kind = editor.getAttribute('data-upload-kind') || 'blog';
      bindEditorUpload(editor, kind);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
