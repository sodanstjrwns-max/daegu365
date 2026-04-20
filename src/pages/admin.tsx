// Admin pages - minimalist, functional, password-only access
import type { BeforeAfter, BlogPost, Notice, Doctor, Treatment } from '../lib/types'

const AdminShell = ({ active, children }: { active: string, children: any }) => (
  <div class="min-h-screen flex bg-brown-50">
    <aside class="w-64 bg-brown-950 text-ivory flex flex-col sticky top-0 h-screen">
      <div class="p-6 border-b border-brown-800">
        <div class="display text-xl text-gold">DAEGU365</div>
        <div class="text-xs text-brown-400 tracking-widest">ADMIN</div>
      </div>
      <nav class="flex-1 p-4 space-y-1 text-sm">
        {[
          { href: '/admin', label: '대시보드', icon: 'fa-gauge', key: 'dash' },
          { href: '/admin/members', label: '회원 관리', icon: 'fa-users', key: 'members' },
          { href: '/admin/before-after', label: '비포애프터', icon: 'fa-images', key: 'ba' },
          { href: '/admin/blog', label: '블로그', icon: 'fa-pen-nib', key: 'blog' },
          { href: '/admin/notices', label: '공지사항', icon: 'fa-bullhorn', key: 'notices' },
        ].map(m => (
          <a href={m.href} class={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active === m.key ? 'bg-gold text-brown-950' : 'hover:bg-brown-900 text-brown-200'}`}>
            <i class={`fas ${m.icon} w-5`}></i>
            <span>{m.label}</span>
          </a>
        ))}
      </nav>
      <div class="p-4 border-t border-brown-800 space-y-2 text-sm">
        <a href="/" target="_blank" class="block px-4 py-2 text-brown-400 hover:text-gold">
          <i class="fas fa-external-link-alt mr-2"></i>사이트 보기
        </a>
        <a href="/admin/logout" class="block px-4 py-2 text-brown-400 hover:text-gold">
          <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
        </a>
      </div>
    </aside>
    <main class="flex-1 p-10 overflow-x-auto">{children}</main>
  </div>
)

export const AdminDashboard = ({ stats }: { stats: any }) => (
  <AdminShell active="dash">
    <div class="mb-8">
      <h1 class="display text-4xl font-light text-brown-900 mb-2">대시보드</h1>
      <p class="text-brown-600">대구365치과 홈페이지 관리 현황</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {[
        { label: '누적 회원', value: stats.members, icon: 'fa-users', link: '/admin/members' },
        { label: '비포애프터', value: stats.before_afters, icon: 'fa-images', link: '/admin/before-after' },
        { label: '블로그 글', value: stats.blog_posts, icon: 'fa-pen-nib', link: '/admin/blog' },
        { label: '공지사항', value: stats.notices, icon: 'fa-bullhorn', link: '/admin/notices' },
      ].map(c => (
        <a href={c.link} class="bg-ivory rounded-2xl p-6 shadow-card hover:shadow-lux transition block">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-full bg-brown-100 text-brown-700 flex items-center justify-center">
              <i class={`fas ${c.icon}`}></i>
            </div>
            <i class="fas fa-arrow-right text-brown-300"></i>
          </div>
          <div class="text-3xl display font-light text-brown-900">{c.value}</div>
          <div class="text-sm text-brown-600 mt-1">{c.label}</div>
        </a>
      ))}
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-ivory rounded-2xl p-6 shadow-card">
        <div class="text-xs tracking-widest text-brown-500 mb-2">CONTENTS</div>
        <h3 class="display text-xl font-medium mb-4">진료 · 의료진 · 백과</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-brown-600">진료과목</span><span class="font-medium">{stats.treatments}</span></div>
          <div class="flex justify-between"><span class="text-brown-600">의료진</span><span class="font-medium">{stats.doctors}</span></div>
          <div class="flex justify-between"><span class="text-brown-600">FAQ</span><span class="font-medium">{stats.faqs}</span></div>
          <div class="flex justify-between"><span class="text-brown-600">백과사전</span><span class="font-medium">{stats.dictionary}</span></div>
          <div class="flex justify-between"><span class="text-brown-600">지역 SEO</span><span class="font-medium">{stats.region_seo}</span></div>
        </div>
      </div>
      <div class="bg-ivory rounded-2xl p-6 shadow-card md:col-span-2">
        <div class="text-xs tracking-widest text-brown-500 mb-2">QUICK ACTIONS</div>
        <h3 class="display text-xl font-medium mb-4">빠른 작업</h3>
        <div class="grid grid-cols-2 gap-3">
          <a href="/admin/before-after/new" class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition">
            <i class="fas fa-plus text-gold mb-2"></i>
            <div class="font-medium">새 비포애프터</div>
            <div class="text-xs text-brown-600 mt-1">케이스 등록 · SEO 메타</div>
          </a>
          <a href="/admin/blog/new" class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition">
            <i class="fas fa-plus text-gold mb-2"></i>
            <div class="font-medium">새 블로그 글</div>
            <div class="text-xs text-brown-600 mt-1">HTML 에디터 · 썸네일</div>
          </a>
          <a href="/admin/notices/new" class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition">
            <i class="fas fa-plus text-gold mb-2"></i>
            <div class="font-medium">새 공지사항</div>
            <div class="text-xs text-brown-600 mt-1">대장 공지 지정 가능</div>
          </a>
          <a href="/admin/members" class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition">
            <i class="fas fa-users text-gold mb-2"></i>
            <div class="font-medium">회원 관리</div>
            <div class="text-xs text-brown-600 mt-1">가입자 · 마케팅 수신자</div>
          </a>
        </div>
      </div>
    </div>
  </AdminShell>
)

export const AdminMembersPage = ({ members }: { members: any[] }) => (
  <AdminShell active="members">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="display text-4xl font-light text-brown-900 mb-2">회원 관리</h1>
        <p class="text-brown-600">총 <strong>{members.length}</strong>명의 회원</p>
      </div>
    </div>
    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-brown-100 text-brown-800">
          <tr>
            <th class="text-left p-4 font-medium">이름</th>
            <th class="text-left p-4 font-medium">이메일</th>
            <th class="text-left p-4 font-medium">휴대폰</th>
            <th class="text-center p-4 font-medium">개인정보</th>
            <th class="text-center p-4 font-medium">마케팅</th>
            <th class="text-left p-4 font-medium">가입일</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr><td colspan={6} class="text-center py-12 text-brown-400">아직 회원이 없습니다.</td></tr>
          ) : members.map(m => (
            <tr class="border-t border-brown-100">
              <td class="p-4 font-medium">{m.name}</td>
              <td class="p-4 text-brown-700">{m.email}</td>
              <td class="p-4 text-brown-700">{m.phone}</td>
              <td class="p-4 text-center">{m.privacy_agreed ? <i class="fas fa-check text-green-600"></i> : <i class="fas fa-times text-red-500"></i>}</td>
              <td class="p-4 text-center">{m.marketing_agreed ? <i class="fas fa-check text-green-600"></i> : <span class="text-brown-400">-</span>}</td>
              <td class="p-4 text-brown-600 text-xs">{m.created_at?.split(' ')[0] || m.created_at?.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
)

// === Before/After ===
export const AdminBAListPage = ({ items }: { items: BeforeAfter[] }) => (
  <AdminShell active="ba">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="display text-4xl font-light text-brown-900 mb-2">비포애프터</h1>
        <p class="text-brown-600">총 <strong>{items.length}</strong>건</p>
      </div>
      <a href="/admin/before-after/new" class="btn-primary"><i class="fas fa-plus"></i> 새 케이스</a>
    </div>
    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-brown-100 text-brown-800">
          <tr>
            <th class="text-left p-4 font-medium">제목</th>
            <th class="text-left p-4 font-medium">진료</th>
            <th class="text-left p-4 font-medium">원장</th>
            <th class="text-left p-4 font-medium">지역</th>
            <th class="text-center p-4 font-medium">조회</th>
            <th class="text-center p-4 font-medium">공개</th>
            <th class="text-right p-4 font-medium">액션</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colspan={7} class="text-center py-12 text-brown-400">등록된 케이스가 없습니다.</td></tr>
          ) : items.map(b => (
            <tr class="border-t border-brown-100 hover:bg-brown-50">
              <td class="p-4 font-medium">{b.title}</td>
              <td class="p-4 text-brown-700">{b.treatment_slug}</td>
              <td class="p-4 text-brown-700">{b.doctor_slug}</td>
              <td class="p-4 text-brown-600 text-xs">{b.region_sigungu} {b.region_dong}</td>
              <td class="p-4 text-center">{b.view_count}</td>
              <td class="p-4 text-center">{b.is_published ? <span class="tag tag-gold text-xs">공개</span> : <span class="tag tag-brown text-xs">숨김</span>}</td>
              <td class="p-4 text-right space-x-2 whitespace-nowrap">
                <a href={`/before-after/${b.id}`} target="_blank" class="text-brown-600 hover:text-brown-900"><i class="fas fa-external-link-alt"></i></a>
                <a href={`/admin/before-after/${b.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                <form method="post" action={`/admin/before-after/${b.id}/delete`} class="inline" onsubmit="return confirm('삭제하시겠습니까?')">
                  <button class="text-red-600 hover:text-red-800">삭제</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
)

export const AdminBAFormPage = ({
  item, doctors, treatments
}: { item?: BeforeAfter, doctors: Doctor[], treatments: Treatment[] }) => {
  const isEdit = !!item
  return (
    <AdminShell active="ba">
      <div class="mb-8">
        <a href="/admin/before-after" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-4xl font-light text-brown-900 mt-3">{isEdit ? '비포애프터 수정' : '새 비포애프터'}</h1>
      </div>
      <form method="post" enctype="multipart/form-data" action={isEdit ? `/admin/before-after/${item!.id}/edit` : '/admin/before-after/new'} class="bg-ivory rounded-2xl shadow-card p-8 space-y-6 max-w-4xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 (SEO 포함) <span class="text-red-500">*</span></label>
          <input name="title" required value={item?.title || ''} class="form-input" placeholder="예: 앞니 라미네이트 8개 심미 개선" />
        </div>

        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">케이스 설명</label>
          <textarea name="description" rows={4} class="form-input">{item?.description || ''}</textarea>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">진료 카테고리 <span class="text-red-500">*</span></label>
            <select name="treatment_slug" required class="form-input">
              <option value="">선택</option>
              {treatments.map(t => <option value={t.slug} selected={item?.treatment_slug === t.slug}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">담당 원장 <span class="text-red-500">*</span></label>
            <select name="doctor_slug" required class="form-input">
              <option value="">선택</option>
              {doctors.map(d => <option value={d.slug} selected={item?.doctor_slug === d.slug}>{d.name} 원장</option>)}
            </select>
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">치료 기간</label>
            <input name="treatment_period" value={item?.treatment_period || ''} class="form-input" placeholder="예: 3개월" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">연령대</label>
            <select name="age_group" class="form-input">
              <option value="">선택</option>
              {['10대','20대','30대','40대','50대','60대','70대'].map(a => <option value={a} selected={item?.age_group === a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">성별</label>
            <select name="gender" class="form-input">
              <option value="">선택</option>
              <option value="female" selected={item?.gender === 'female'}>여성</option>
              <option value="male" selected={item?.gender === 'male'}>남성</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">지역 (자동완성 · 예: 초지 → 안산시 상록구 초지동)</label>
          <div class="relative">
            <input id="regionInput" name="region" autocomplete="off" class="form-input" placeholder="동·구·시 입력"
              value={[item?.region_sido, item?.region_sigungu, item?.region_dong].filter(Boolean).join(' ')} />
            <div id="regionSuggest" class="absolute top-full left-0 right-0 mt-1 bg-ivory rounded-xl shadow-lux border border-brown-200 max-h-60 overflow-auto z-50 hidden"></div>
          </div>
          <input type="hidden" name="region_sido" id="region_sido" value={item?.region_sido || ''} />
          <input type="hidden" name="region_sigungu" id="region_sigungu" value={item?.region_sigungu || ''} />
          <input type="hidden" name="region_dong" id="region_dong" value={item?.region_dong || ''} />
        </div>

        <div class="pt-6 border-t border-brown-200">
          <div class="text-xs tracking-widest text-brown-600 mb-4">이미지 (최대 4장 · 각 카테고리 Before/After 쌍)</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-2">파노라마 Before (URL)</label>
              <input name="pano_before_url" value={item?.pano_before_url || ''} class="form-input text-xs" placeholder="/r2/..." />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">파노라마 After (URL)</label>
              <input name="pano_after_url" value={item?.pano_after_url || ''} class="form-input text-xs" placeholder="/r2/..." />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">구내 Before (URL)</label>
              <input name="intra_before_url" value={item?.intra_before_url || ''} class="form-input text-xs" placeholder="/r2/..." />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">구내 After (URL)</label>
              <input name="intra_after_url" value={item?.intra_after_url || ''} class="form-input text-xs" placeholder="/r2/..." />
            </div>
          </div>
          <p class="text-xs text-brown-500 mt-3"><i class="fas fa-info-circle"></i> 각 필드는 비워두면 해당 슬라이더가 표시되지 않습니다. 파일 업로드는 R2 버킷 설정 후 활성화됩니다.</p>
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-brown-200">
          <input type="checkbox" name="is_published" id="pub" value="1" checked={item ? !!item.is_published : true} />
          <label for="pub" class="text-sm">공개 (체크 해제 시 목록에서 숨김)</label>
        </div>

        <div class="pt-6 border-t border-brown-200 flex gap-3">
          <button class="btn-primary">{isEdit ? '수정 저장' : '등록'}</button>
          <a href="/admin/before-after" class="btn-outline">취소</a>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{__html: `
        const ri = document.getElementById('regionInput');
        const rs = document.getElementById('regionSuggest');
        let tmo;
        ri?.addEventListener('input', () => {
          clearTimeout(tmo);
          const q = ri.value.trim();
          if (q.length < 1) { rs.classList.add('hidden'); return; }
          tmo = setTimeout(async () => {
            const r = await fetch('/api/addresses?q=' + encodeURIComponent(q));
            const data = await r.json();
            if (!data.items || data.items.length === 0) { rs.classList.add('hidden'); return; }
            rs.innerHTML = data.items.map(a =>
              '<button type="button" class="block w-full text-left px-4 py-3 hover:bg-cream text-sm border-b border-brown-100" data-sido="'+a.sido+'" data-sigungu="'+a.sigungu+'" data-dong="'+a.dong+'">'+a.full_name+'</button>'
            ).join('');
            rs.classList.remove('hidden');
            rs.querySelectorAll('button').forEach(b => {
              b.addEventListener('click', () => {
                ri.value = b.textContent;
                document.getElementById('region_sido').value = b.dataset.sido;
                document.getElementById('region_sigungu').value = b.dataset.sigungu;
                document.getElementById('region_dong').value = b.dataset.dong;
                rs.classList.add('hidden');
              });
            });
          }, 150);
        });
        document.addEventListener('click', (e) => {
          if (!ri?.contains(e.target) && !rs?.contains(e.target)) rs?.classList.add('hidden');
        });
      `}} />
    </AdminShell>
  )
}

// === Blog ===
export const AdminBlogListPage = ({ posts }: { posts: BlogPost[] }) => (
  <AdminShell active="blog">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="display text-4xl font-light text-brown-900 mb-2">블로그</h1>
        <p class="text-brown-600">총 <strong>{posts.length}</strong>개의 글</p>
      </div>
      <a href="/admin/blog/new" class="btn-primary"><i class="fas fa-plus"></i> 새 글 작성</a>
    </div>
    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-brown-100 text-brown-800">
          <tr>
            <th class="text-left p-4 font-medium">제목</th>
            <th class="text-left p-4 font-medium">작성자</th>
            <th class="text-center p-4 font-medium">조회</th>
            <th class="text-left p-4 font-medium">작성일</th>
            <th class="text-center p-4 font-medium">공개</th>
            <th class="text-right p-4 font-medium">액션</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr><td colspan={6} class="text-center py-12 text-brown-400">글이 없습니다.</td></tr>
          ) : posts.map(p => (
            <tr class="border-t border-brown-100 hover:bg-brown-50">
              <td class="p-4 font-medium">{p.title}</td>
              <td class="p-4 text-brown-700 text-xs">{p.author_doctor_slug}</td>
              <td class="p-4 text-center">{p.view_count}</td>
              <td class="p-4 text-brown-600 text-xs">{p.created_at?.split(' ')[0]}</td>
              <td class="p-4 text-center">{p.is_published ? <span class="tag tag-gold text-xs">공개</span> : <span class="tag tag-brown text-xs">숨김</span>}</td>
              <td class="p-4 text-right space-x-2 whitespace-nowrap">
                <a href={`/blog/${p.slug}`} target="_blank" class="text-brown-600 hover:text-brown-900"><i class="fas fa-external-link-alt"></i></a>
                <a href={`/admin/blog/${p.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                <form method="post" action={`/admin/blog/${p.id}/delete`} class="inline" onsubmit="return confirm('삭제하시겠습니까?')">
                  <button class="text-red-600 hover:text-red-800">삭제</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
)

export const AdminBlogFormPage = ({ post, doctors }: { post?: BlogPost, doctors: Doctor[] }) => {
  const isEdit = !!post
  return (
    <AdminShell active="blog">
      <div class="mb-8">
        <a href="/admin/blog" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-4xl font-light text-brown-900 mt-3">{isEdit ? '블로그 수정' : '새 블로그 글'}</h1>
      </div>
      <form method="post" action={isEdit ? `/admin/blog/${post!.id}/edit` : '/admin/blog/new'} class="bg-ivory rounded-2xl shadow-card p-8 space-y-6 max-w-5xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 <span class="text-red-500">*</span></label>
          <input name="title" required value={post?.title || ''} class="form-input text-lg" />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">Slug (URL) <span class="text-red-500">*</span></label>
            <input name="slug" required value={post?.slug || ''} class="form-input" placeholder="english-slug-for-url" />
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">작성자 (원장)</label>
            <select name="author_doctor_slug" class="form-input">
              <option value="">선택</option>
              {doctors.map(d => <option value={d.slug} selected={post?.author_doctor_slug === d.slug}>{d.name} {d.position}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">요약 (excerpt)</label>
          <textarea name="excerpt" rows={2} class="form-input">{post?.excerpt || ''}</textarea>
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">썸네일 URL</label>
          <input name="thumbnail_url" value={post?.thumbnail_url || ''} class="form-input text-xs" placeholder="/static/images/... 또는 R2 URL" />
        </div>

        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">본문 (HTML 지원 · SEO 태그 사용) <span class="text-red-500">*</span></label>
          <div class="mb-2 flex flex-wrap gap-2 text-xs">
            <button type="button" onclick="insertHTML('<h2>제목 2</h2>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">H2</button>
            <button type="button" onclick="insertHTML('<h3>제목 3</h3>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">H3</button>
            <button type="button" onclick="insertHTML('<p></p>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">P</button>
            <button type="button" onclick="insertHTML('<ul><li></li></ul>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">UL</button>
            <button type="button" onclick="insertHTML('<strong></strong>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Bold</button>
            <button type="button" onclick="insertHTML('<em></em>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Italic</button>
            <button type="button" onclick="insertHTML('<a href=\\'\\'></a>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Link</button>
            <button type="button" onclick="insertHTML('<img src=\\'\\' alt=\\'\\'/>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Image</button>
          </div>
          <textarea id="contentEditor" name="content" required rows={20} class="form-input font-mono text-sm" placeholder="<h2>…</h2><p>…</p>">{post?.content || ''}</textarea>
        </div>

        <div class="grid md:grid-cols-2 gap-4 pt-4 border-t border-brown-200">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">Meta Description (SEO)</label>
            <textarea name="meta_description" rows={2} class="form-input text-sm">{post?.meta_description || ''}</textarea>
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">Keywords (콤마 구분)</label>
            <input name="meta_keywords" value={post?.meta_keywords || ''} class="form-input text-sm" />
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-brown-200">
          <input type="checkbox" name="is_published" id="pub" value="1" checked={post ? !!post.is_published : true} />
          <label for="pub" class="text-sm">공개</label>
        </div>

        <div class="pt-6 border-t border-brown-200 flex gap-3">
          <button class="btn-primary">{isEdit ? '수정 저장' : '등록'}</button>
          <a href="/admin/blog" class="btn-outline">취소</a>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{__html: `
        function insertHTML(tag) {
          const ed = document.getElementById('contentEditor');
          const s = ed.selectionStart, e = ed.selectionEnd;
          const before = ed.value.substring(0, s);
          const sel = ed.value.substring(s, e);
          const after = ed.value.substring(e);
          const insert = tag.replace('></', '>'+sel+'</');
          ed.value = before + insert + after;
          ed.focus();
          ed.selectionStart = s + insert.indexOf('>')+1;
          ed.selectionEnd = ed.selectionStart + sel.length;
        }
      `}} />
    </AdminShell>
  )
}

// === Notices ===
export const AdminNoticesListPage = ({ notices }: { notices: Notice[] }) => (
  <AdminShell active="notices">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="display text-4xl font-light text-brown-900 mb-2">공지사항</h1>
        <p class="text-brown-600">총 <strong>{notices.length}</strong>개</p>
      </div>
      <a href="/admin/notices/new" class="btn-primary"><i class="fas fa-plus"></i> 새 공지</a>
    </div>
    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-brown-100 text-brown-800">
          <tr>
            <th class="text-left p-4 font-medium">제목</th>
            <th class="text-center p-4 font-medium">대장</th>
            <th class="text-center p-4 font-medium">조회</th>
            <th class="text-left p-4 font-medium">작성일</th>
            <th class="text-center p-4 font-medium">공개</th>
            <th class="text-right p-4 font-medium">액션</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr><td colspan={6} class="text-center py-12 text-brown-400">공지가 없습니다.</td></tr>
          ) : notices.map(n => (
            <tr class="border-t border-brown-100 hover:bg-brown-50">
              <td class="p-4 font-medium">{n.title}</td>
              <td class="p-4 text-center">{n.is_main ? <span class="tag tag-gold text-xs">★ 대장</span> : <span class="text-brown-300">-</span>}</td>
              <td class="p-4 text-center">{n.view_count}</td>
              <td class="p-4 text-brown-600 text-xs">{n.created_at?.split(' ')[0]}</td>
              <td class="p-4 text-center">{n.is_published ? <span class="tag tag-gold text-xs">공개</span> : <span class="tag tag-brown text-xs">숨김</span>}</td>
              <td class="p-4 text-right space-x-2 whitespace-nowrap">
                <a href={`/notices/${n.id}`} target="_blank" class="text-brown-600 hover:text-brown-900"><i class="fas fa-external-link-alt"></i></a>
                <a href={`/admin/notices/${n.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                <form method="post" action={`/admin/notices/${n.id}/delete`} class="inline" onsubmit="return confirm('삭제하시겠습니까?')">
                  <button class="text-red-600 hover:text-red-800">삭제</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
)

export const AdminNoticeFormPage = ({ notice }: { notice?: Notice }) => {
  const isEdit = !!notice
  return (
    <AdminShell active="notices">
      <div class="mb-8">
        <a href="/admin/notices" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-4xl font-light text-brown-900 mt-3">{isEdit ? '공지 수정' : '새 공지사항'}</h1>
      </div>
      <form method="post" action={isEdit ? `/admin/notices/${notice!.id}/edit` : '/admin/notices/new'} class="bg-ivory rounded-2xl shadow-card p-8 space-y-6 max-w-4xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 <span class="text-red-500">*</span></label>
          <input name="title" required value={notice?.title || ''} class="form-input text-lg" />
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">썸네일 이미지 URL</label>
          <input name="thumbnail_url" value={notice?.thumbnail_url || ''} class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">본문 (HTML) <span class="text-red-500">*</span></label>
          <textarea name="content" required rows={15} class="form-input font-mono text-sm">{notice?.content || ''}</textarea>
        </div>
        <div class="flex items-center gap-6 pt-4 border-t border-brown-200">
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_main" value="1" checked={!!notice?.is_main} />
            ★ 대장 공지로 지정 (상단 고정)
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_published" value="1" checked={notice ? !!notice.is_published : true} />
            공개
          </label>
        </div>
        <div class="pt-6 border-t border-brown-200 flex gap-3">
          <button class="btn-primary">{isEdit ? '수정 저장' : '등록'}</button>
          <a href="/admin/notices" class="btn-outline">취소</a>
        </div>
      </form>
    </AdminShell>
  )
}
