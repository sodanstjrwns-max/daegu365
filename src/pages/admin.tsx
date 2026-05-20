// Admin pages — 반응형·검색·필터·페이지네이션·일괄작업·인라인 토글
import type { BeforeAfter, BlogPost, Notice, Doctor, Treatment } from '../lib/types'

/* =========================================================================
   비포애프터 카테고리 화이트리스트 (admin 업로드 폼 전용)
   - 임플란트는 'implant'로 통합 (수면임플란트 페이지·일반 임플란트 페이지 양쪽에 노출)
   - 케이스 누적이 적은 카테고리(수면치료/에어플로우/기공실/무통마취/예방치과)는 제외
   ========================================================================= */
export const BA_CATEGORIES: Array<{ slug: string, name: string }> = [
  { slug: 'implant',           name: '임플란트' },
  { slug: 'ortho',             name: '인비절라인 (치아교정)' },
  { slug: 'lamineer',          name: '비니크 프리미엄 라미네이트' },
  { slug: 'cavity-endo-crown', name: '충치·신경치료·크라운' },
  { slug: 'perio',             name: '치주치료' },
  { slug: 'pediatric',         name: '소아치과' },
  { slug: 'pediatric-ortho',   name: '소아 교정' },
  { slug: 'whitening',         name: '전문가 미백' },
  { slug: 'icon-resin',        name: '아이콘 레진 (백반)' },
  { slug: 'prosthetic',        name: '보철' },
  { slug: 'aesthetic',         name: '심미치료' },
  { slug: 'conservative',      name: '보존치료' },
  { slug: 'general',           name: '기타' },
]

/* =========================================================================
   AdminShell — 반응형 사이드바 + 모바일 햄버거
   ========================================================================= */
const AdminShell = ({ active, children }: { active: string, children: any }) => (
  <div class="admin-root min-h-screen bg-brown-50">
    {/* 모바일 상단바 */}
    <header class="lg:hidden sticky top-0 z-40 bg-brown-950 text-ivory flex items-center justify-between px-4 h-14 shadow">
      <button id="adminMenuBtn" class="w-10 h-10 flex items-center justify-center" aria-label="메뉴">
        <i class="fas fa-bars text-lg"></i>
      </button>
      <div class="display text-base text-gold tracking-wider">DAEGU365 ADMIN</div>
      <a href="/" class="w-10 h-10 flex items-center justify-center text-brown-300" aria-label="사이트">
        <i class="fas fa-external-link-alt text-sm"></i>
      </a>
    </header>

    <div class="flex">
      <aside id="adminSidebar" class="admin-sidebar w-64 bg-brown-950 text-ivory flex-col">
        <div class="p-6 border-b border-brown-800 hidden lg:block">
          <div class="display text-xl text-gold">DAEGU365</div>
          <div class="text-xs text-brown-400 tracking-widest">ADMIN</div>
        </div>
        <div class="lg:hidden flex justify-between items-center px-4 py-3 border-b border-brown-800">
          <div class="display text-base text-gold">메뉴</div>
          <button id="adminMenuClose" class="w-8 h-8 text-brown-300" aria-label="닫기">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav class="flex-1 p-4 space-y-1 text-sm">
          {[
            { href: '/admin', label: '대시보드', icon: 'fa-gauge', key: 'dash' },
            { href: '/admin/before-after', label: '비포애프터', icon: 'fa-images', key: 'ba' },
            { href: '/admin/blog', label: '블로그', icon: 'fa-pen-nib', key: 'blog' },
            { href: '/admin/notices', label: '공지사항', icon: 'fa-bullhorn', key: 'notices' },
            { href: '/admin/fees', label: '수가 관리', icon: 'fa-won-sign', key: 'fees' },
            { href: '/admin/seo', label: 'SEO 가이드', icon: 'fa-magnifying-glass-chart', key: 'seo' },
            { href: '/admin/members', label: '회원 관리', icon: 'fa-users', key: 'members' },
          ].map(m => (
            <a href={m.href} class={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active === m.key ? 'bg-gold text-brown-950 font-bold' : 'hover:bg-brown-900 text-brown-200'}`}>
              <i class={`fas ${m.icon} w-5`}></i>
              <span>{m.label}</span>
            </a>
          ))}
        </nav>
        <div class="p-4 border-t border-brown-800 space-y-1 text-sm">
          <a href="/" target="_blank" class="block px-4 py-2 text-brown-400 hover:text-gold rounded-lg">
            <i class="fas fa-external-link-alt mr-2"></i>사이트 보기
          </a>
          <a href="/admin/logout" class="block px-4 py-2 text-brown-400 hover:text-gold rounded-lg">
            <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
          </a>
        </div>
      </aside>
      <div id="adminBackdrop" class="admin-backdrop"></div>
      <main class="flex-1 p-5 lg:p-10 overflow-x-auto min-w-0">{children}</main>
    </div>

    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        var btn=document.getElementById('adminMenuBtn');
        var close=document.getElementById('adminMenuClose');
        var side=document.getElementById('adminSidebar');
        var bd=document.getElementById('adminBackdrop');
        function open(){side.classList.add('open');bd.classList.add('open');document.body.style.overflow='hidden'}
        function shut(){side.classList.remove('open');bd.classList.remove('open');document.body.style.overflow=''}
        btn&&btn.addEventListener('click',open);
        close&&close.addEventListener('click',shut);
        bd&&bd.addEventListener('click',shut);
      })();
    `}}/>
  </div>
)

/* =========================================================================
   AdminToast — 화면 우측 상단 토스트 (일괄작업·토글 피드백)
   ========================================================================= */
const ToastBootstrap = () => (
  <>
    <div id="adminToast" class="admin-toast"></div>
    <script dangerouslySetInnerHTML={{__html: `
      window.adminToast=function(msg,type){
        var t=document.getElementById('adminToast');if(!t)return;
        t.textContent=msg;t.className='admin-toast show '+(type||'ok');
        clearTimeout(window.__toastTm);
        window.__toastTm=setTimeout(function(){t.className='admin-toast'},2200);
      };
    `}}/>
  </>
)

/* =========================================================================
   AdminDashboard — 통계 카드 + 최근 활동 피드
   ========================================================================= */
export const AdminDashboard = ({ stats }: { stats: any }) => (
  <AdminShell active="dash">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-10">
      <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-2">대시보드</h1>
      <p class="text-brown-600 text-sm">대구365치과 홈페이지 관리 현황</p>
    </div>
    {/* 4개 통계 카드 */}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-8">
      {[
        { label: '누적 회원', value: stats.members, icon: 'fa-users', link: '/admin/members', color: 'bg-emerald-50 text-emerald-700' },
        { label: '비포애프터', value: stats.before_afters, icon: 'fa-images', link: '/admin/before-after', color: 'bg-amber-50 text-amber-700' },
        { label: '블로그 글', value: stats.blog_posts, icon: 'fa-pen-nib', link: '/admin/blog', color: 'bg-sky-50 text-sky-700' },
        { label: '공지사항', value: stats.notices, icon: 'fa-bullhorn', link: '/admin/notices', color: 'bg-rose-50 text-rose-700' },
      ].map(c => (
        <a href={c.link} class="bg-ivory rounded-2xl p-4 lg:p-6 shadow-card hover:shadow-lux transition block">
          <div class="flex items-center justify-between mb-3 lg:mb-4">
            <div class={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${c.color}`}>
              <i class={`fas ${c.icon}`}></i>
            </div>
            <i class="fas fa-arrow-right text-brown-300 text-xs"></i>
          </div>
          <div class="text-2xl lg:text-3xl display font-light text-brown-900">{c.value}</div>
          <div class="text-xs lg:text-sm text-brown-600 mt-1">{c.label}</div>
        </a>
      ))}
    </div>

    {/* 최근 활동 피드 */}
    <div class="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
      <RecentFeed
        title="최근 비포애프터"
        icon="fa-images"
        items={(stats.recent?.ba || []).map((b: any) => ({
          title: b.title, sub: b.is_published ? '공개' : '숨김',
          date: (b.created_at || '').split(' ')[0],
          href: `/admin/before-after/${b.id}/edit`
        }))}
        moreHref="/admin/before-after"
      />
      <RecentFeed
        title="최근 블로그"
        icon="fa-pen-nib"
        items={(stats.recent?.blog || []).map((b: any) => ({
          title: b.title, sub: b.is_published ? '공개' : '숨김',
          date: (b.created_at || '').split(' ')[0],
          href: `/admin/blog/${b.id}/edit`
        }))}
        moreHref="/admin/blog"
      />
      <RecentFeed
        title="최근 공지사항"
        icon="fa-bullhorn"
        items={(stats.recent?.notice || []).map((n: any) => ({
          title: (n.is_main ? '★ ' : '') + n.title,
          sub: n.is_published ? '공개' : '숨김',
          date: (n.created_at || '').split(' ')[0],
          href: `/admin/notices/${n.id}/edit`
        }))}
        moreHref="/admin/notices"
      />
      <RecentFeed
        title="최근 가입 회원"
        icon="fa-users"
        items={(stats.recent?.members || []).map((m: any) => ({
          title: m.name, sub: m.email,
          date: (m.created_at || '').split(' ')[0],
          href: '/admin/members'
        }))}
        moreHref="/admin/members"
      />
    </div>

    {/* 빠른 작업 */}
    <div class="bg-ivory rounded-2xl p-5 lg:p-6 shadow-card mb-6">
      <div class="text-xs tracking-widest text-brown-500 mb-2">QUICK ACTIONS</div>
      <h3 class="display text-lg lg:text-xl font-medium mb-4">빠른 작업</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: '/admin/before-after/new', icon: 'fa-plus', label: '새 비포애프터', sub: '케이스 등록' },
          { href: '/admin/blog/new', icon: 'fa-plus', label: '새 블로그 글', sub: 'HTML · 썸네일' },
          { href: '/admin/notices/new', icon: 'fa-plus', label: '새 공지사항', sub: '대장 고정 가능' },
          { href: '/admin/members/export.csv', icon: 'fa-file-csv', label: '회원 CSV', sub: '엑셀 다운로드' },
        ].map(a => (
          <a href={a.href} class="p-4 rounded-xl bg-cream hover:bg-brown-100 transition block">
            <i class={`fas ${a.icon} text-gold mb-2`}></i>
            <div class="font-medium text-sm">{a.label}</div>
            <div class="text-xs text-brown-600 mt-1">{a.sub}</div>
          </a>
        ))}
      </div>
    </div>

    {/* 사이트 콘텐츠 통계 */}
    <div class="bg-ivory rounded-2xl p-5 lg:p-6 shadow-card">
      <div class="text-xs tracking-widest text-brown-500 mb-2">CONTENTS</div>
      <h3 class="display text-lg lg:text-xl font-medium mb-4">사이트 콘텐츠</h3>
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
        <Stat label="진료과목" value={stats.treatments} />
        <Stat label="의료진" value={stats.doctors} />
        <Stat label="FAQ" value={stats.faqs} />
        <Stat label="백과사전" value={stats.dictionary} />
        <Stat label="지역 SEO" value={stats.region_seo} />
      </div>
    </div>
  </AdminShell>
)

const Stat = ({ label, value }: { label: string, value: any }) => (
  <div class="p-3 rounded-lg bg-cream">
    <div class="text-xs text-brown-600 mb-1">{label}</div>
    <div class="display text-xl font-light">{value}</div>
  </div>
)

const RecentFeed = ({ title, icon, items, moreHref }:
  { title: string, icon: string, items: { title: string, sub: string, date: string, href: string }[], moreHref: string }) => (
  <div class="bg-ivory rounded-2xl p-5 shadow-card">
    <div class="flex items-center justify-between mb-4">
      <h4 class="display text-base lg:text-lg font-medium flex items-center gap-2">
        <i class={`fas ${icon} text-gold text-sm`}></i> {title}
      </h4>
      <a href={moreHref} class="text-xs text-brown-500 hover:text-brown-900">전체 보기 →</a>
    </div>
    {items.length === 0 ? (
      <div class="text-center py-6 text-brown-400 text-sm">아직 없습니다.</div>
    ) : (
      <ul class="space-y-2 text-sm">
        {items.map(i => (
          <li>
            <a href={i.href} class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-cream transition">
              <span class="font-medium truncate flex-1">{i.title}</span>
              <span class="text-xs text-brown-500 whitespace-nowrap">{i.sub}</span>
              <span class="text-[11px] text-brown-400 whitespace-nowrap">{i.date}</span>
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
)

/* =========================================================================
   회원 관리
   ========================================================================= */
export const AdminMembersPage = ({ members }: { members: any[] }) => (
  <AdminShell active="members">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-3">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-1">회원 관리</h1>
        <p class="text-brown-600 text-sm">총 <strong>{members.length}</strong>명의 회원</p>
      </div>
      <div class="flex gap-2">
        <input id="memberSearch" type="search" placeholder="이름·이메일·전화 검색" class="form-input text-sm w-56" />
        <a href="/admin/members/export.csv" class="btn-outline text-sm whitespace-nowrap">
          <i class="fas fa-file-csv"></i> CSV
        </a>
      </div>
    </div>
    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm" id="memberTable">
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
              <tr class="border-t border-brown-100 hover:bg-brown-50" data-search={`${m.name||''} ${m.email||''} ${m.phone||''}`.toLowerCase()}>
                <td class="p-4 font-medium">{m.name}</td>
                <td class="p-4 text-brown-700">{m.email}</td>
                <td class="p-4 text-brown-700">{m.phone}</td>
                <td class="p-4 text-center">{m.privacy_agreed ? <i class="fas fa-check text-emerald-600"></i> : <i class="fas fa-times text-rose-500"></i>}</td>
                <td class="p-4 text-center">{m.marketing_agreed ? <i class="fas fa-check text-emerald-600"></i> : <span class="text-brown-400">-</span>}</td>
                <td class="p-4 text-brown-600 text-xs">{m.created_at?.split(' ')[0] || m.created_at?.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        var s=document.getElementById('memberSearch');
        var rows=document.querySelectorAll('#memberTable tbody tr[data-search]');
        s&&s.addEventListener('input',function(){
          var q=s.value.trim().toLowerCase();
          rows.forEach(function(r){r.style.display=(!q||r.dataset.search.indexOf(q)>=0)?'':'none'});
        });
      })();
    `}}/>
  </AdminShell>
)

/* =========================================================================
   ListToolbar — 검색·필터·일괄작업·페이지네이션 공통 위젯
   ========================================================================= */
const ListToolbar = ({ type, hasFilters, filterOptions }: {
  type: 'before-after' | 'blog' | 'notice',
  hasFilters?: boolean,
  filterOptions?: { value: string, label: string }[]
}) => (
  <div class="bg-ivory rounded-2xl shadow-card p-4 mb-4 flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-2 flex-1 min-w-[240px]">
      <label class="flex items-center gap-2 text-xs text-brown-600">
        <input type="checkbox" id="bulkAll" />
        <span>전체</span>
      </label>
      <input id="listSearch" type="search" placeholder="제목·태그·슬러그 검색" class="form-input text-sm flex-1 min-w-[180px]" />
      {hasFilters && (
        <select id="listFilter" class="form-input text-sm w-40">
          <option value="">전체 보기</option>
          {(filterOptions || []).map(o => <option value={o.value}>{o.label}</option>)}
        </select>
      )}
    </div>
    <div id="bulkBar" class="flex items-center gap-2 hidden">
      <span class="text-xs text-brown-600"><span id="bulkCount">0</span>건 선택</span>
      <button type="button" data-bulk="publish" data-type={type} class="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
        <i class="fas fa-eye"></i> 공개
      </button>
      <button type="button" data-bulk="unpublish" data-type={type} class="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">
        <i class="fas fa-eye-slash"></i> 숨김
      </button>
      <button type="button" data-bulk="delete" data-type={type} class="text-xs px-3 py-1.5 rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200">
        <i class="fas fa-trash"></i> 삭제
      </button>
    </div>
  </div>
)

/* =========================================================================
   비포애프터 목록
   ========================================================================= */
export const AdminBAListPage = ({ items, treatments }:
  { items: BeforeAfter[], treatments?: Treatment[] }) => (
  <AdminShell active="ba">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-3">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-1">비포애프터</h1>
        <p class="text-brown-600 text-sm">총 <strong>{items.length}</strong>건 · 공개 <strong>{items.filter(i => i.is_published).length}</strong>건</p>
      </div>
      <a href="/admin/before-after/new" class="btn-primary"><i class="fas fa-plus"></i> 새 케이스</a>
    </div>

    <ListToolbar type="before-after" hasFilters
      filterOptions={(treatments || []).map(t => ({ value: t.slug, label: t.name }))} />

    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm admin-list-table">
          <thead class="bg-brown-100 text-brown-800">
            <tr>
              <th class="w-10 p-4"></th>
              <th class="text-left p-4 font-medium">제목</th>
              <th class="text-left p-4 font-medium">진료</th>
              <th class="text-left p-4 font-medium">원장</th>
              <th class="text-left p-4 font-medium hidden md:table-cell">지역</th>
              <th class="text-center p-4 font-medium hidden md:table-cell">조회</th>
              <th class="text-center p-4 font-medium">공개</th>
              <th class="text-right p-4 font-medium">액션</th>
            </tr>
          </thead>
          <tbody id="baListBody" class="paginate" data-page-size="20">
            {items.length === 0 ? (
              <tr><td colspan={8} class="text-center py-12 text-brown-400">등록된 케이스가 없습니다.</td></tr>
            ) : items.map(b => (
              <tr class="border-t border-brown-100 hover:bg-brown-50"
                data-search={`${b.title||''} ${b.treatment_slug||''} ${b.doctor_slug||''}`.toLowerCase()}
                data-filter={b.treatment_slug || ''}>
                <td class="p-4">
                  <input type="checkbox" class="bulk-check" value={b.id} />
                </td>
                <td class="p-4 font-medium">
                  <a href={`/admin/before-after/${b.id}/edit`} class="hover:text-gold">{b.title}</a>
                </td>
                <td class="p-4 text-brown-700 text-xs">{b.treatment_slug}</td>
                <td class="p-4 text-brown-700 text-xs">{b.doctor_slug}</td>
                <td class="p-4 text-brown-600 text-xs hidden md:table-cell">{b.region_sigungu} {b.region_dong}</td>
                <td class="p-4 text-center text-brown-600 text-xs hidden md:table-cell">{b.view_count}</td>
                <td class="p-4 text-center">
                  <button type="button" class="toggle-pub" data-type="before-after" data-id={b.id} data-on={b.is_published ? '1' : '0'}
                    title="클릭하여 공개/숨김 토글">
                    {b.is_published
                      ? <span class="tag tag-gold text-xs cursor-pointer">공개</span>
                      : <span class="tag tag-brown text-xs cursor-pointer">숨김</span>}
                  </button>
                </td>
                <td class="p-4 text-right space-x-2 whitespace-nowrap">
                  <a href={`/before-after/${b.id}`} target="_blank" class="text-brown-600 hover:text-brown-900" title="사이트에서 보기"><i class="fas fa-external-link-alt"></i></a>
                  <a href={`/admin/before-after/${b.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                  <button type="button" class="del-one text-rose-600 hover:text-rose-800" data-type="before-after" data-id={b.id}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="paginator" class="paginator p-4 border-t border-brown-100 flex justify-center gap-1 text-sm"></div>
    </div>
    <AdminListScript />
  </AdminShell>
)

/* =========================================================================
   비포애프터 폼 — 기존 드롭존 + 지역 자동완성 그대로 유지
   ========================================================================= */
export const AdminBAFormPage = ({
  item, doctors, treatments
}: { item?: BeforeAfter, doctors: Doctor[], treatments: Treatment[] }) => {
  const isEdit = !!item
  return (
    <AdminShell active="ba">
      <ToastBootstrap />
      <div class="mb-6 lg:mb-8">
        <a href="/admin/before-after" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mt-2">{isEdit ? '비포애프터 수정' : '새 비포애프터'}</h1>
      </div>
      <form method="post" enctype="multipart/form-data" action={isEdit ? `/admin/before-after/${item!.id}/edit` : '/admin/before-after/new'} class="bg-ivory rounded-2xl shadow-card p-5 lg:p-8 space-y-6 max-w-4xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 (SEO 포함) <span class="text-rose-500">*</span></label>
          <input name="title" required value={item?.title || ''} class="form-input" placeholder="예: 앞니 라미네이트 8개 심미 개선" />
        </div>

        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">케이스 설명</label>
          <textarea name="description" rows={4} class="form-input">{item?.description || ''}</textarea>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">진료 카테고리 <span class="text-rose-500">*</span></label>
            <select name="treatment_slug" required class="form-input">
              <option value="">선택</option>
              {BA_CATEGORIES.map(t => <option value={t.slug} selected={item?.treatment_slug === t.slug}>{t.name}</option>)}
            </select>
            <p class="text-[11px] text-brown-500 mt-1">※ 임플란트 케이스는 수면임플란트·일반 임플란트 페이지 양쪽에 자동 노출됩니다.</p>
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">담당 원장 <span class="text-rose-500">*</span></label>
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
          <div class="text-xs tracking-widest text-brown-600 mb-4">이미지 (각 슬롯에 사진을 드래그하거나 클릭해 업로드 · 자동 R2 저장)</div>
          <div class="grid md:grid-cols-2 gap-6">
            {[
              { key: 'pano_before_url', label: '파노라마 Before', cur: item?.pano_before_url },
              { key: 'pano_after_url',  label: '파노라마 After',  cur: item?.pano_after_url },
              { key: 'intra_before_url', label: '구내 Before',    cur: item?.intra_before_url },
              { key: 'intra_after_url',  label: '구내 After',     cur: item?.intra_after_url },
            ].map(s => (
              <div>
                <label class="block text-sm font-medium mb-2">{s.label}</label>
                <div class="ba-drop relative rounded-xl border-2 border-dashed border-brown-300 hover:border-gold transition cursor-pointer bg-brown-50/40 p-4 min-h-[140px] flex items-center justify-center" data-target={s.key}>
                  <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" data-input />
                  <div class="text-center pointer-events-none" data-empty style={s.cur ? 'display:none' : ''}>
                    <i class="fas fa-cloud-upload-alt text-2xl text-brown-400 mb-2"></i>
                    <div class="text-xs text-brown-600">사진 끌어다 놓기 또는 클릭</div>
                  </div>
                  <img data-preview src={s.cur || ''} alt="" class="max-h-32 rounded-lg shadow-sm" style={s.cur ? '' : 'display:none'} />
                  <div class="absolute top-1 right-1 hidden" data-progress>
                    <div class="bg-brown-900 text-ivory text-[10px] px-2 py-1 rounded-full">업로드중…</div>
                  </div>
                </div>
                <div class="flex gap-2 mt-2">
                  <input name={s.key} value={s.cur || ''} class="form-input text-xs flex-1" placeholder="/r2/... (자동 입력)" data-url />
                  <button type="button" class="text-xs text-rose-600 hover:text-rose-800 px-2" data-clear>지우기</button>
                </div>
              </div>
            ))}
          </div>
          <p class="text-xs text-brown-500 mt-3"><i class="fas fa-info-circle"></i> 비워둔 슬롯은 상세 페이지에서 슬라이더가 표시되지 않습니다. 최대 20MB · jpg/png/webp/avif</p>
        </div>

        {/* ============ SEO/AEO 고도화 섹션 ============ */}
        <div class="pt-6 border-t border-brown-200">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-search text-gold"></i>
            <h3 class="text-sm font-medium tracking-widest text-brown-700">SEO · AEO 최적화 (구글/네이버 노출 강화)</h3>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-[12px] text-brown-700 leading-relaxed">
            <i class="fas fa-lightbulb text-amber-600 mr-1"></i>
            비워두면 자동으로 생성됩니다. 하지만 <strong>직접 작성한 메타가 검색 노출에 훨씬 유리</strong>합니다. (필수 키워드: 임플란트 · 인비절라인 · 라미네이트 · 글로우네이트 · 치아교정)
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">메타 설명 (구글 검색결과 미리보기 · 70~155자 권장)</label>
              <textarea name="meta_description" rows={2} class="form-input" placeholder="예: 대구365치과 박OO 원장의 앞니 라미네이트 8개 심미 케이스. 3개월 치료 기간, 자연스러운 색상 회복 결과 사진 공개.">{item?.meta_description || ''}</textarea>
            </div>
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">메타 키워드 (콤마 구분 · 5~10개 권장)</label>
              <input name="meta_keywords" value={item?.meta_keywords || ''} class="form-input" placeholder="예: 라미네이트, 앞니심미, 대구라미네이트, 임플란트, 인비절라인, 치아교정, 글로우네이트" />
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs tracking-widest text-brown-600 mb-2">Before 이미지 ALT (SEO 핵심)</label>
                <input name="before_alt" value={item?.before_alt || ''} class="form-input" placeholder="예: 앞니 변색 치료 전 사진 - 대구365치과" />
              </div>
              <div>
                <label class="block text-xs tracking-widest text-brown-600 mb-2">After 이미지 ALT (SEO 핵심)</label>
                <input name="after_alt" value={item?.after_alt || ''} class="form-input" placeholder="예: 라미네이트 시술 후 결과 사진 - 대구365치과" />
              </div>
            </div>
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">OG 대표 이미지 URL (SNS 공유 썸네일 · 비워두면 After 사진 자동 사용)</label>
              <input name="og_image" value={item?.og_image || ''} class="form-input" placeholder="/r2/... (After 사진과 다른 대표 이미지 사용 시)" />
            </div>
            <div class="flex items-center gap-3 pt-2">
              <input type="checkbox" name="noindex" id="noindex_ba" value="1" checked={!!item?.noindex} />
              <label for="noindex_ba" class="text-sm text-rose-600">
                <i class="fas fa-eye-slash mr-1"></i>
                검색엔진 노출 차단 (noindex) - 체크 시 구글/네이버에 색인되지 않습니다
              </label>
            </div>
          </div>
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
        // === Drag&Drop 업로드 위젯 ===
        document.querySelectorAll('.ba-drop').forEach(zone => {
          const input = zone.querySelector('[data-input]');
          const preview = zone.querySelector('[data-preview]');
          const empty = zone.querySelector('[data-empty]');
          const progress = zone.querySelector('[data-progress]');
          const wrap = zone.parentElement;
          const urlInput = wrap.querySelector('[data-url]');
          const clearBtn = wrap.querySelector('[data-clear]');

          const setUrl = (u) => {
            urlInput.value = u || '';
            if (u) { preview.src = u; preview.style.display = ''; empty.style.display = 'none'; }
            else   { preview.src = ''; preview.style.display = 'none'; empty.style.display = ''; }
          };

          const upload = async (file) => {
            if (!file || !file.type.startsWith('image/')) return alert('이미지 파일만 업로드 가능합니다.');
            if (file.size > 20 * 1024 * 1024) return alert('20MB를 초과했습니다.');
            progress.classList.remove('hidden');
            try {
              const fd = new FormData();
              fd.append('file', file);
              fd.append('type', 'before-after');
              const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
              const j = await r.json();
              if (!j.ok) throw new Error(j.error || 'upload_failed');
              setUrl(j.url);
            } catch (e) { alert('업로드 실패: ' + e.message); }
            finally { progress.classList.add('hidden'); }
          };

          input.addEventListener('change', e => upload(e.target.files[0]));
          ['dragenter','dragover'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.add('border-gold','bg-gold/10');
          }));
          ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.remove('border-gold','bg-gold/10');
          }));
          zone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) upload(e.dataTransfer.files[0]); });
          urlInput.addEventListener('input', () => setUrl(urlInput.value));
          clearBtn.addEventListener('click', () => setUrl(''));
        });

        // === 지역 자동완성 ===
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

/* =========================================================================
   블로그 목록
   ========================================================================= */
export const AdminBlogListPage = ({ posts }: { posts: BlogPost[] }) => (
  <AdminShell active="blog">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-3">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-1">블로그</h1>
        <p class="text-brown-600 text-sm">총 <strong>{posts.length}</strong>개 · 공개 <strong>{posts.filter(p => p.is_published).length}</strong>개</p>
      </div>
      <a href="/admin/blog/new" class="btn-primary"><i class="fas fa-plus"></i> 새 글 작성</a>
    </div>

    <ListToolbar type="blog" />

    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm admin-list-table">
          <thead class="bg-brown-100 text-brown-800">
            <tr>
              <th class="w-10 p-4"></th>
              <th class="text-left p-4 font-medium">제목</th>
              <th class="text-left p-4 font-medium hidden md:table-cell">작성자</th>
              <th class="text-center p-4 font-medium hidden md:table-cell">조회</th>
              <th class="text-left p-4 font-medium hidden md:table-cell">작성일</th>
              <th class="text-center p-4 font-medium">공개</th>
              <th class="text-right p-4 font-medium">액션</th>
            </tr>
          </thead>
          <tbody id="blogListBody" class="paginate" data-page-size="20">
            {posts.length === 0 ? (
              <tr><td colspan={7} class="text-center py-12 text-brown-400">글이 없습니다.</td></tr>
            ) : posts.map(p => (
              <tr class="border-t border-brown-100 hover:bg-brown-50"
                data-search={`${p.title||''} ${p.slug||''} ${p.author_doctor_slug||''}`.toLowerCase()}>
                <td class="p-4">
                  <input type="checkbox" class="bulk-check" value={p.id} />
                </td>
                <td class="p-4 font-medium">
                  <a href={`/admin/blog/${p.id}/edit`} class="hover:text-gold">{p.title}</a>
                  <div class="text-[11px] text-brown-400 mt-1">/{p.slug}</div>
                </td>
                <td class="p-4 text-brown-700 text-xs hidden md:table-cell">{p.author_doctor_slug || '-'}</td>
                <td class="p-4 text-center text-xs hidden md:table-cell">{p.view_count}</td>
                <td class="p-4 text-brown-600 text-xs hidden md:table-cell">{p.created_at?.split(' ')[0]}</td>
                <td class="p-4 text-center">
                  <button type="button" class="toggle-pub" data-type="blog" data-id={p.id} data-on={p.is_published ? '1' : '0'} title="공개/숨김 토글">
                    {p.is_published
                      ? <span class="tag tag-gold text-xs cursor-pointer">공개</span>
                      : <span class="tag tag-brown text-xs cursor-pointer">숨김</span>}
                  </button>
                </td>
                <td class="p-4 text-right space-x-2 whitespace-nowrap">
                  <a href={`/blog/${p.slug}`} target="_blank" class="text-brown-600 hover:text-brown-900" title="사이트에서 보기"><i class="fas fa-external-link-alt"></i></a>
                  <a href={`/admin/blog/${p.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                  <button type="button" class="del-one text-rose-600 hover:text-rose-800" data-type="blog" data-id={p.id}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="paginator" class="paginator p-4 border-t border-brown-100 flex justify-center gap-1 text-sm"></div>
    </div>
    <AdminListScript />
  </AdminShell>
)

/* =========================================================================
   블로그 폼
   ========================================================================= */
export const AdminBlogFormPage = ({ post, doctors }: { post?: BlogPost, doctors: Doctor[] }) => {
  const isEdit = !!post
  return (
    <AdminShell active="blog">
      <ToastBootstrap />
      <div class="mb-6 lg:mb-8">
        <a href="/admin/blog" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mt-2">{isEdit ? '블로그 수정' : '새 블로그 글'}</h1>
      </div>
      <form method="post" action={isEdit ? `/admin/blog/${post!.id}/edit` : '/admin/blog/new'} class="bg-ivory rounded-2xl shadow-card p-5 lg:p-8 space-y-6 max-w-5xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 <span class="text-rose-500">*</span></label>
          <input name="title" required value={post?.title || ''} class="form-input text-lg" />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">Slug (URL) <span class="text-rose-500">*</span></label>
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
          <label class="block text-xs tracking-widest text-brown-600 mb-2">썸네일</label>
          <div class="thumb-drop relative rounded-xl border-2 border-dashed border-brown-300 hover:border-gold transition cursor-pointer bg-brown-50/40 p-4 min-h-[140px] flex items-center justify-center">
            <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" data-input />
            <div class="text-center pointer-events-none" data-empty style={post?.thumbnail_url ? 'display:none' : ''}>
              <i class="fas fa-image text-2xl text-brown-400 mb-2"></i>
              <div class="text-xs text-brown-600">썸네일 끌어다 놓기 또는 클릭</div>
            </div>
            <img data-preview src={post?.thumbnail_url || ''} alt="" class="max-h-32 rounded-lg shadow-sm" style={post?.thumbnail_url ? '' : 'display:none'} />
            <div class="absolute top-1 right-1 hidden" data-progress>
              <div class="bg-brown-900 text-ivory text-[10px] px-2 py-1 rounded-full">업로드중…</div>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <input name="thumbnail_url" value={post?.thumbnail_url || ''} class="form-input text-xs flex-1" placeholder="/r2/... (자동 입력)" data-url />
            <button type="button" class="text-xs text-rose-600 hover:text-rose-800 px-2" data-clear>지우기</button>
          </div>
        </div>

        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">본문 (HTML 지원 · 이미지 드래그하면 자동 업로드 · SEO 태그 사용) <span class="text-rose-500">*</span></label>
          <div class="mb-2 flex flex-wrap gap-2 text-xs">
            <button type="button" onclick="insertHTML('<h2>제목 2</h2>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">H2</button>
            <button type="button" onclick="insertHTML('<h3>제목 3</h3>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">H3</button>
            <button type="button" onclick="insertHTML('<p></p>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">P</button>
            <button type="button" onclick="insertHTML('<ul><li></li></ul>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">UL</button>
            <button type="button" onclick="insertHTML('<strong></strong>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Bold</button>
            <button type="button" onclick="insertHTML('<em></em>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Italic</button>
            <button type="button" onclick="insertHTML('<a href=\\'\\'></a>')" class="px-3 py-1 rounded bg-brown-100 hover:bg-brown-200">Link</button>
            <label class="px-3 py-1 rounded bg-gold text-brown-900 font-bold hover:bg-gold/80 cursor-pointer">
              <i class="fas fa-image"></i> 이미지 업로드
              <input type="file" accept="image/*" id="contentImgInput" class="hidden" />
            </label>
          </div>
          <textarea id="contentEditor" name="content" required rows={20} class="form-input font-mono text-sm" placeholder="<h2>…</h2><p>…</p> · 이미지를 직접 끌어다 놓아도 됩니다.">{post?.content || ''}</textarea>
          <p class="text-xs text-brown-500 mt-2"><i class="fas fa-info-circle"></i> textarea 안에 이미지를 드래그하면 자동 업로드 후 &lt;img&gt; 태그가 커서 위치에 삽입됩니다.</p>
        </div>

        {/* ============ SEO/AEO 고도화 섹션 ============ */}
        <div class="pt-6 border-t border-brown-200">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-search text-gold"></i>
            <h3 class="text-sm font-medium tracking-widest text-brown-700">SEO · AEO 최적화 (구글/네이버 노출 강화)</h3>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-[12px] text-brown-700 leading-relaxed">
            <i class="fas fa-lightbulb text-amber-600 mr-1"></i>
            비워두면 자동 생성됩니다. 하지만 <strong>직접 작성하면 검색 노출이 훨씬 강력</strong>해집니다. (필수 키워드: 임플란트 · 인비절라인 · 라미네이트 · 글로우네이트 · 치아교정)
          </div>

          <div class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs tracking-widest text-brown-600 mb-2">Meta Description (70~155자)</label>
                <textarea name="meta_description" rows={3} class="form-input text-sm" placeholder="검색결과에 표시될 미리보기 문장">{post?.meta_description || ''}</textarea>
              </div>
              <div>
                <label class="block text-xs tracking-widest text-brown-600 mb-2">Meta Keywords (콤마 구분 · 5~10개)</label>
                <textarea name="meta_keywords" rows={3} class="form-input text-sm" placeholder="임플란트, 인비절라인, 라미네이트, 글로우네이트, 치아교정">{post?.meta_keywords || ''}</textarea>
              </div>
            </div>
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">OG 대표 이미지 URL (SNS/카톡 공유 썸네일 · 비워두면 썸네일 자동 사용)</label>
              <input name="og_image" value={post?.og_image || ''} class="form-input text-sm" placeholder="/r2/... (썸네일과 다른 대표 이미지 사용 시)" />
            </div>
            <div class="flex items-center gap-3 pt-2">
              <input type="checkbox" name="noindex" id="noindex_blog" value="1" checked={!!post?.noindex} />
              <label for="noindex_blog" class="text-sm text-rose-600">
                <i class="fas fa-eye-slash mr-1"></i>
                검색엔진 노출 차단 (noindex) - 체크 시 구글/네이버에 색인되지 않습니다
              </label>
            </div>
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

        // === 썸네일 드래그앤드롭 ===
        document.querySelectorAll('.thumb-drop').forEach(zone => {
          const input = zone.querySelector('[data-input]');
          const preview = zone.querySelector('[data-preview]');
          const empty = zone.querySelector('[data-empty]');
          const progress = zone.querySelector('[data-progress]');
          const wrap = zone.parentElement;
          const urlInput = wrap.querySelector('[data-url]');
          const clearBtn = wrap.querySelector('[data-clear]');

          const setUrl = (u) => {
            urlInput.value = u || '';
            if (u) { preview.src = u; preview.style.display = ''; empty.style.display = 'none'; }
            else   { preview.src = ''; preview.style.display = 'none'; empty.style.display = ''; }
          };
          const upload = async (file) => {
            if (!file || !file.type.startsWith('image/')) return alert('이미지 파일만 업로드 가능합니다.');
            if (file.size > 20 * 1024 * 1024) return alert('20MB를 초과했습니다.');
            progress.classList.remove('hidden');
            try {
              const fd = new FormData();
              fd.append('file', file);
              fd.append('type', 'blog');
              const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
              const j = await r.json();
              if (!j.ok) throw new Error(j.error || 'upload_failed');
              setUrl(j.url);
            } catch (e) { alert('업로드 실패: ' + e.message); }
            finally { progress.classList.add('hidden'); }
          };
          input.addEventListener('change', e => upload(e.target.files[0]));
          ['dragenter','dragover'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.add('border-gold','bg-gold/10');
          }));
          ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.remove('border-gold','bg-gold/10');
          }));
          zone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) upload(e.dataTransfer.files[0]); });
          urlInput.addEventListener('input', () => setUrl(urlInput.value));
          clearBtn.addEventListener('click', () => setUrl(''));
        });

        // === 본문 textarea 이미지 자동 업로드 (드래그 + 버튼) ===
        const ed = document.getElementById('contentEditor');
        const imgInput = document.getElementById('contentImgInput');
        const insertImgAtCursor = (url) => {
          const tag = '<img src="' + url + '" alt="" />';
          const s = ed.selectionStart;
          ed.value = ed.value.substring(0, s) + tag + ed.value.substring(ed.selectionEnd);
          ed.selectionStart = ed.selectionEnd = s + tag.length;
          ed.focus();
        };
        const uploadContentImg = async (file) => {
          if (!file || !file.type.startsWith('image/')) return;
          if (file.size > 20 * 1024 * 1024) return alert('20MB를 초과했습니다.');
          const fd = new FormData();
          fd.append('file', file);
          fd.append('type', 'blog');
          try {
            const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const j = await r.json();
            if (!j.ok) throw new Error(j.error || 'upload_failed');
            insertImgAtCursor(j.url);
          } catch (e) { alert('업로드 실패: ' + e.message); }
        };
        imgInput?.addEventListener('change', e => { if (e.target.files[0]) uploadContentImg(e.target.files[0]); e.target.value=''; });
        ed?.addEventListener('dragover', e => e.preventDefault());
        ed?.addEventListener('drop', e => {
          if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('image/')) {
            e.preventDefault();
            uploadContentImg(e.dataTransfer.files[0]);
          }
        });
        ed?.addEventListener('paste', e => {
          const items = e.clipboardData?.items || [];
          for (const it of items) {
            if (it.type.startsWith('image/')) {
              e.preventDefault();
              const f = it.getAsFile();
              if (f) uploadContentImg(f);
              return;
            }
          }
        });
      `}} />
    </AdminShell>
  )
}

/* =========================================================================
   공지사항 목록
   ========================================================================= */
export const AdminNoticesListPage = ({ notices }: { notices: Notice[] }) => (
  <AdminShell active="notices">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-3">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-1">공지사항</h1>
        <p class="text-brown-600 text-sm">총 <strong>{notices.length}</strong>개 · 공개 <strong>{notices.filter(n => n.is_published).length}</strong>개</p>
      </div>
      <a href="/admin/notices/new" class="btn-primary"><i class="fas fa-plus"></i> 새 공지</a>
    </div>

    <ListToolbar type="notice" />

    <div class="bg-ivory rounded-2xl shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm admin-list-table">
          <thead class="bg-brown-100 text-brown-800">
            <tr>
              <th class="w-10 p-4"></th>
              <th class="text-left p-4 font-medium">제목</th>
              <th class="text-center p-4 font-medium">대장</th>
              <th class="text-center p-4 font-medium hidden md:table-cell">조회</th>
              <th class="text-left p-4 font-medium hidden md:table-cell">작성일</th>
              <th class="text-center p-4 font-medium">공개</th>
              <th class="text-right p-4 font-medium">액션</th>
            </tr>
          </thead>
          <tbody id="noticeListBody" class="paginate" data-page-size="20">
            {notices.length === 0 ? (
              <tr><td colspan={7} class="text-center py-12 text-brown-400">공지가 없습니다.</td></tr>
            ) : notices.map(n => (
              <tr class="border-t border-brown-100 hover:bg-brown-50"
                data-search={`${n.title||''}`.toLowerCase()}>
                <td class="p-4">
                  <input type="checkbox" class="bulk-check" value={n.id} />
                </td>
                <td class="p-4 font-medium">
                  <a href={`/admin/notices/${n.id}/edit`} class="hover:text-gold">{n.title}</a>
                </td>
                <td class="p-4 text-center">
                  <button type="button" class="toggle-main" data-id={n.id} data-on={n.is_main ? '1' : '0'} title="대장 공지 토글">
                    {n.is_main
                      ? <span class="tag tag-gold text-xs cursor-pointer">★ 대장</span>
                      : <span class="text-brown-300 cursor-pointer text-xs">- 일반</span>}
                  </button>
                </td>
                <td class="p-4 text-center text-xs hidden md:table-cell">{n.view_count}</td>
                <td class="p-4 text-brown-600 text-xs hidden md:table-cell">{n.created_at?.split(' ')[0]}</td>
                <td class="p-4 text-center">
                  <button type="button" class="toggle-pub" data-type="notice" data-id={n.id} data-on={n.is_published ? '1' : '0'} title="공개/숨김 토글">
                    {n.is_published
                      ? <span class="tag tag-gold text-xs cursor-pointer">공개</span>
                      : <span class="tag tag-brown text-xs cursor-pointer">숨김</span>}
                  </button>
                </td>
                <td class="p-4 text-right space-x-2 whitespace-nowrap">
                  <a href={`/notices/${n.id}`} target="_blank" class="text-brown-600 hover:text-brown-900" title="사이트에서 보기"><i class="fas fa-external-link-alt"></i></a>
                  <a href={`/admin/notices/${n.id}/edit`} class="text-brown-700 hover:text-brown-900">수정</a>
                  <button type="button" class="del-one text-rose-600 hover:text-rose-800" data-type="notice" data-id={n.id}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="paginator" class="paginator p-4 border-t border-brown-100 flex justify-center gap-1 text-sm"></div>
    </div>
    <AdminListScript />
  </AdminShell>
)

/* =========================================================================
   공지사항 폼
   ========================================================================= */
export const AdminNoticeFormPage = ({ notice }: { notice?: Notice }) => {
  const isEdit = !!notice
  return (
    <AdminShell active="notices">
      <ToastBootstrap />
      <div class="mb-6 lg:mb-8">
        <a href="/admin/notices" class="text-sm text-brown-600 hover:text-brown-900">← 목록으로</a>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mt-2">{isEdit ? '공지 수정' : '새 공지사항'}</h1>
      </div>
      <form method="post" action={isEdit ? `/admin/notices/${notice!.id}/edit` : '/admin/notices/new'} class="bg-ivory rounded-2xl shadow-card p-5 lg:p-8 space-y-6 max-w-4xl">
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">제목 <span class="text-rose-500">*</span></label>
          <input name="title" required value={notice?.title || ''} class="form-input text-lg" />
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">썸네일 이미지</label>
          <div class="thumb-drop relative rounded-xl border-2 border-dashed border-brown-300 hover:border-gold transition cursor-pointer bg-brown-50/40 p-4 min-h-[140px] flex items-center justify-center">
            <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" data-input />
            <div class="text-center pointer-events-none" data-empty style={notice?.thumbnail_url ? 'display:none' : ''}>
              <i class="fas fa-image text-2xl text-brown-400 mb-2"></i>
              <div class="text-xs text-brown-600">썸네일 끌어다 놓기 또는 클릭</div>
            </div>
            <img data-preview src={notice?.thumbnail_url || ''} alt="" class="max-h-32 rounded-lg shadow-sm" style={notice?.thumbnail_url ? '' : 'display:none'} />
            <div class="absolute top-1 right-1 hidden" data-progress>
              <div class="bg-brown-900 text-ivory text-[10px] px-2 py-1 rounded-full">업로드중…</div>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <input name="thumbnail_url" value={notice?.thumbnail_url || ''} class="form-input text-xs flex-1" placeholder="/r2/... (자동 입력)" data-url />
            <button type="button" class="text-xs text-rose-600 hover:text-rose-800 px-2" data-clear>지우기</button>
          </div>
        </div>
        <div>
          <label class="block text-xs tracking-widest text-brown-600 mb-2">본문 (HTML · 이미지 드래그·붙여넣기·버튼 모두 자동 업로드) <span class="text-rose-500">*</span></label>
          <div class="mb-2 flex flex-wrap gap-2 text-xs">
            <label class="px-3 py-1 rounded bg-gold text-brown-900 font-bold hover:bg-gold/80 cursor-pointer">
              <i class="fas fa-image"></i> 이미지 업로드
              <input type="file" accept="image/*" id="contentImgInput" class="hidden" />
            </label>
          </div>
          <textarea id="contentEditor" name="content" required rows={15} class="form-input font-mono text-sm">{notice?.content || ''}</textarea>
          <p class="text-xs text-brown-500 mt-2"><i class="fas fa-info-circle"></i> textarea에 이미지를 드래그하거나 클립보드에서 붙여넣으면 자동 업로드됩니다.</p>
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

      <script dangerouslySetInnerHTML={{__html: `
        // === 공지 썸네일 드래그앤드롭 ===
        document.querySelectorAll('.thumb-drop').forEach(zone => {
          const input = zone.querySelector('[data-input]');
          const preview = zone.querySelector('[data-preview]');
          const empty = zone.querySelector('[data-empty]');
          const progress = zone.querySelector('[data-progress]');
          const wrap = zone.parentElement;
          const urlInput = wrap.querySelector('[data-url]');
          const clearBtn = wrap.querySelector('[data-clear]');

          const setUrl = (u) => {
            urlInput.value = u || '';
            if (u) { preview.src = u; preview.style.display = ''; empty.style.display = 'none'; }
            else   { preview.src = ''; preview.style.display = 'none'; empty.style.display = ''; }
          };
          const upload = async (file) => {
            if (!file || !file.type.startsWith('image/')) return alert('이미지 파일만 업로드 가능합니다.');
            if (file.size > 20 * 1024 * 1024) return alert('20MB를 초과했습니다.');
            progress.classList.remove('hidden');
            try {
              const fd = new FormData();
              fd.append('file', file);
              fd.append('type', 'notice');
              const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
              const j = await r.json();
              if (!j.ok) throw new Error(j.error || 'upload_failed');
              setUrl(j.url);
            } catch (e) { alert('업로드 실패: ' + e.message); }
            finally { progress.classList.add('hidden'); }
          };
          input.addEventListener('change', e => upload(e.target.files[0]));
          ['dragenter','dragover'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.add('border-gold','bg-gold/10');
          }));
          ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, e => {
            e.preventDefault(); zone.classList.remove('border-gold','bg-gold/10');
          }));
          zone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) upload(e.dataTransfer.files[0]); });
          urlInput.addEventListener('input', () => setUrl(urlInput.value));
          clearBtn.addEventListener('click', () => setUrl(''));
        });

        // === 본문 이미지 자동 업로드 ===
        const ed = document.getElementById('contentEditor');
        const imgInput = document.getElementById('contentImgInput');
        const insertImgAtCursor = (url) => {
          const tag = '<img src="' + url + '" alt="" />';
          const s = ed.selectionStart;
          ed.value = ed.value.substring(0, s) + tag + ed.value.substring(ed.selectionEnd);
          ed.selectionStart = ed.selectionEnd = s + tag.length;
          ed.focus();
        };
        const uploadContentImg = async (file) => {
          if (!file || !file.type.startsWith('image/')) return;
          if (file.size > 20 * 1024 * 1024) return alert('20MB를 초과했습니다.');
          const fd = new FormData();
          fd.append('file', file);
          fd.append('type', 'notice');
          try {
            const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const j = await r.json();
            if (!j.ok) throw new Error(j.error || 'upload_failed');
            insertImgAtCursor(j.url);
          } catch (e) { alert('업로드 실패: ' + e.message); }
        };
        imgInput?.addEventListener('change', e => { if (e.target.files[0]) uploadContentImg(e.target.files[0]); e.target.value=''; });
        ed?.addEventListener('dragover', e => e.preventDefault());
        ed?.addEventListener('drop', e => {
          if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('image/')) {
            e.preventDefault();
            uploadContentImg(e.dataTransfer.files[0]);
          }
        });
        ed?.addEventListener('paste', e => {
          const items = e.clipboardData?.items || [];
          for (const it of items) {
            if (it.type.startsWith('image/')) {
              e.preventDefault();
              const f = it.getAsFile();
              if (f) uploadContentImg(f);
              return;
            }
          }
        });
      `}} />
    </AdminShell>
  )
}

/* =========================================================================
   AdminListScript — 검색·필터·페이지네이션·일괄작업·인라인 토글 통합 JS
   ========================================================================= */
const AdminListScript = () => (
  <script dangerouslySetInnerHTML={{__html: `
    (function(){
      var body=document.querySelector('tbody.paginate');
      if(!body)return;
      var pageSize=parseInt(body.dataset.pageSize||'20',10);
      var allRows=Array.prototype.slice.call(body.querySelectorAll('tr[data-search]'));
      var search=document.getElementById('listSearch');
      var filter=document.getElementById('listFilter');
      var paginator=document.getElementById('paginator');
      var bulkAll=document.getElementById('bulkAll');
      var bulkBar=document.getElementById('bulkBar');
      var bulkCount=document.getElementById('bulkCount');
      var page=1;

      function getVisible(){
        var q=(search&&search.value||'').trim().toLowerCase();
        var f=(filter&&filter.value||'').trim();
        return allRows.filter(function(r){
          var ok=true;
          if(q)ok=ok&&r.dataset.search.indexOf(q)>=0;
          if(f)ok=ok&&r.dataset.filter===f;
          return ok;
        });
      }
      function render(){
        var vis=getVisible();
        allRows.forEach(function(r){r.style.display='none'});
        var totalPages=Math.max(1,Math.ceil(vis.length/pageSize));
        if(page>totalPages)page=totalPages;
        var start=(page-1)*pageSize;
        vis.slice(start,start+pageSize).forEach(function(r){r.style.display=''});
        // 페이지네이터 렌더
        paginator.innerHTML='';
        if(totalPages>1){
          function btn(label,p,active,disabled){
            var b=document.createElement('button');
            b.type='button';
            b.textContent=label;
            b.className='px-3 py-1.5 rounded-lg border text-sm '+(active?'bg-brown-900 text-ivory border-brown-900':'bg-ivory text-brown-700 border-brown-200 hover:bg-brown-100');
            if(disabled){b.disabled=true;b.style.opacity='.4';b.style.cursor='default'}
            else b.addEventListener('click',function(){page=p;render()});
            return b;
          }
          paginator.appendChild(btn('‹',Math.max(1,page-1),false,page===1));
          var maxBtns=7,from=Math.max(1,page-3),to=Math.min(totalPages,from+maxBtns-1);
          if(to-from<maxBtns-1)from=Math.max(1,to-maxBtns+1);
          for(var i=from;i<=to;i++)paginator.appendChild(btn(String(i),i,i===page));
          paginator.appendChild(btn('›',Math.min(totalPages,page+1),false,page===totalPages));
          var info=document.createElement('span');
          info.className='ml-3 self-center text-xs text-brown-500';
          info.textContent=vis.length+'건 · '+page+'/'+totalPages;
          paginator.appendChild(info);
        }else if(vis.length>0){
          var info=document.createElement('span');
          info.className='text-xs text-brown-500';
          info.textContent='총 '+vis.length+'건';
          paginator.appendChild(info);
        }
        updateBulk();
      }
      function updateBulk(){
        var checks=body.querySelectorAll('.bulk-check:checked');
        var n=checks.length;
        bulkCount&&(bulkCount.textContent=n);
        if(bulkBar){if(n>0)bulkBar.classList.remove('hidden');else bulkBar.classList.add('hidden')}
      }
      search&&search.addEventListener('input',function(){page=1;render()});
      filter&&filter.addEventListener('change',function(){page=1;render()});
      bulkAll&&bulkAll.addEventListener('change',function(){
        var vis=getVisible();
        var checked=bulkAll.checked;
        vis.forEach(function(r){
          if(r.style.display!=='none'){
            var c=r.querySelector('.bulk-check');
            if(c)c.checked=checked;
          }
        });
        updateBulk();
      });
      body.addEventListener('change',function(e){
        if(e.target&&e.target.classList.contains('bulk-check'))updateBulk();
      });

      // === 인라인 공개 토글 ===
      body.addEventListener('click',async function(e){
        var btn=e.target.closest('.toggle-pub');
        if(btn){
          e.preventDefault();
          var id=btn.dataset.id,type=btn.dataset.type;
          try{
            var r=await fetch('/api/admin/'+type+'/'+id+'/toggle',{method:'POST'});
            var j=await r.json();
            if(!j.ok)throw new Error(j.error);
            btn.dataset.on=j.is_published?'1':'0';
            btn.innerHTML=j.is_published
              ? '<span class="tag tag-gold text-xs cursor-pointer">공개</span>'
              : '<span class="tag tag-brown text-xs cursor-pointer">숨김</span>';
            window.adminToast(j.is_published?'공개로 변경':'숨김으로 변경');
          }catch(err){window.adminToast('실패: '+err.message,'err')}
          return;
        }
        var btnMain=e.target.closest('.toggle-main');
        if(btnMain){
          e.preventDefault();
          var id=btnMain.dataset.id;
          try{
            var r=await fetch('/api/admin/notice/'+id+'/toggle-main',{method:'POST'});
            var j=await r.json();
            if(!j.ok)throw new Error(j.error);
            btnMain.dataset.on=j.is_main?'1':'0';
            btnMain.innerHTML=j.is_main
              ? '<span class="tag tag-gold text-xs cursor-pointer">★ 대장</span>'
              : '<span class="text-brown-300 cursor-pointer text-xs">- 일반</span>';
            window.adminToast(j.is_main?'대장 공지로 지정':'일반 공지로 변경');
          }catch(err){window.adminToast('실패: '+err.message,'err')}
          return;
        }
        // 단일 삭제
        var del=e.target.closest('.del-one');
        if(del){
          e.preventDefault();
          if(!confirm('이 항목을 삭제하시겠습니까?'))return;
          var id=del.dataset.id,type=del.dataset.type;
          try{
            var r=await fetch('/api/admin/'+type+'/bulk',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',ids:[parseInt(id,10)]})});
            var j=await r.json();
            if(!j.ok)throw new Error(j.error);
            var row=del.closest('tr');
            row&&row.remove();
            allRows=allRows.filter(function(r){return r!==row});
            window.adminToast('삭제 완료');
            render();
          }catch(err){window.adminToast('실패: '+err.message,'err')}
        }
      });

      // === 일괄작업 ===
      document.querySelectorAll('[data-bulk]').forEach(function(b){
        b.addEventListener('click',async function(){
          var action=b.dataset.bulk,type=b.dataset.type;
          var ids=Array.prototype.slice.call(body.querySelectorAll('.bulk-check:checked')).map(function(c){return parseInt(c.value,10)});
          if(ids.length===0)return window.adminToast('선택된 항목이 없습니다.','err');
          if(action==='delete'&&!confirm(ids.length+'건을 삭제하시겠습니까? 되돌릴 수 없습니다.'))return;
          try{
            var r=await fetch('/api/admin/'+type+'/bulk',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:action,ids:ids})});
            var j=await r.json();
            if(!j.ok)throw new Error(j.error);
            window.adminToast(j.affected+'건 처리 완료');
            setTimeout(function(){location.reload()},700);
          }catch(err){window.adminToast('실패: '+err.message,'err')}
        });
      });

      render();
    })();
  `}}/>
)

/* =========================================================================
   AdminFeesPage — 비급여 수가 관리 (그룹별 인라인 편집)
   ========================================================================= */
export const AdminFeesPage = ({ groups }: { groups: Array<{
  category: string,
  category_icon: string,
  group_note: string | null,
  sort_group: number,
  rows: Array<{ id: number, name: string, price: string, note: string | null, is_highlight: number, is_published: number, sort_order: number }>
}> }) => (
  <AdminShell active="fees">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-10 flex items-end justify-between flex-wrap gap-4">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900 mb-2">
          <i class="fas fa-won-sign text-gold mr-2"></i>수가 관리
        </h1>
        <p class="text-brown-600 text-sm">
          비급여 의료수가표 — 가격·비고·강조 표시를 바로 수정할 수 있습니다.
          저장 버튼을 누르면 즉시 <a href="/fees" target="_blank" class="text-brown-900 underline font-semibold">비용 안내 페이지</a>에 반영됩니다.
        </p>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button id="feesExpandAll" class="btn-outline text-sm"><i class="fas fa-expand"></i> 전체 펼침</button>
        <button id="feesCollapseAll" class="btn-outline text-sm"><i class="fas fa-compress"></i> 전체 접기</button>
        <a href="/fees" target="_blank" class="btn-primary text-sm"><i class="fas fa-external-link-alt"></i> 사이트 보기</a>
      </div>
    </div>

    {/* 도움말 */}
    <div class="bg-gold/10 border-l-4 border-gold rounded-r-2xl p-4 lg:p-5 mb-6 text-sm text-brown-800">
      <div class="font-bold mb-1"><i class="fas fa-lightbulb text-gold mr-1"></i> 사용법</div>
      <ul class="list-disc pl-5 space-y-1 text-brown-700">
        <li><b>가격칸</b>에 자유롭게 입력 가능 (예: <code>80만원</code>, <code>50만원~</code>, <code>문의</code>, <code>20,000원</code>)</li>
        <li><b>SIGN</b> 체크 시 금색 강조(SIGNATURE 라벨) 표시</li>
        <li><b>공개</b> 토글로 특정 항목을 숨길 수 있음 (회색 = 숨김)</li>
        <li>수정 후 <b>저장</b> 버튼 클릭 → 즉시 반영. 한 그룹의 모든 행을 한번에 저장하려면 그룹 헤더의 <b>그룹 일괄 저장</b> 클릭</li>
      </ul>
    </div>

    {/* 그룹 카드들 */}
    <div class="space-y-5">
      {groups.map((g, gi) => (
        <div class="bg-ivory rounded-2xl shadow-card overflow-hidden border border-brown-100" data-group-card={String(g.sort_group)}>
          {/* 그룹 헤더 */}
          <div class="flex items-center justify-between px-4 lg:px-6 py-4 bg-brown-50 border-b border-brown-200 flex-wrap gap-3">
            <button type="button" class="flex items-center gap-3 text-left flex-1 min-w-0" data-toggle-group={String(g.sort_group)}>
              <div class="w-10 h-10 rounded-xl bg-brown-950 text-gold flex items-center justify-center shrink-0">
                <i class={`fas ${g.category_icon || 'fa-tooth'}`}></i>
              </div>
              <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] text-brown-500 font-bold">
                  CATEGORY · {String(gi + 1).padStart(2,'0')} · 총 {g.rows.length}개
                </div>
                <div class="display text-lg lg:text-xl font-bold text-brown-900 truncate">{g.category}</div>
              </div>
              <i class="fas fa-chevron-down text-brown-500 text-sm ml-2 shrink-0 transition-transform" data-chevron={String(g.sort_group)}></i>
            </button>
            <button type="button" class="btn-primary text-xs whitespace-nowrap" data-bulk-save={String(g.sort_group)}>
              <i class="fas fa-save"></i> 그룹 일괄 저장
            </button>
          </div>

          {/* 그룹 안내(group_note) 편집 */}
          <div class="px-4 lg:px-6 py-3 border-b border-brown-100 bg-cream/50 flex items-center gap-2 flex-wrap" data-group-body={String(g.sort_group)}>
            <span class="text-[10px] tracking-[0.2em] font-bold text-brown-500 whitespace-nowrap">그룹 상단 안내</span>
            <input type="text"
                   class="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-brown-200 bg-ivory text-sm"
                   placeholder="예: 부가세 10% 별도"
                   value={g.group_note || ''}
                   data-group-note={String(g.sort_group)} />
            <button type="button" class="btn-outline text-xs whitespace-nowrap" data-save-group-note={String(g.sort_group)}>
              <i class="fas fa-save"></i> 안내 저장
            </button>
          </div>

          {/* 항목들 */}
          <div class="divide-y divide-brown-100" data-group-rows={String(g.sort_group)}>
            {g.rows.map(row => (
              <div class={`px-4 lg:px-6 py-4 grid lg:grid-cols-12 gap-3 items-center ${row.is_highlight ? 'bg-gold/5' : ''} ${!row.is_published ? 'opacity-50' : ''}`} data-row-id={String(row.id)}>
                {/* 항목명 */}
                <div class="lg:col-span-4">
                  <label class="text-[9px] tracking-[0.25em] font-bold text-brown-400 lg:hidden">항목명</label>
                  <input type="text" data-field="name" value={row.name}
                         class="w-full px-3 py-2 rounded-lg border border-brown-200 bg-ivory text-sm font-semibold text-brown-900 focus:border-brown-600 focus:outline-none" />
                </div>
                {/* 가격 */}
                <div class="lg:col-span-2">
                  <label class="text-[9px] tracking-[0.25em] font-bold text-brown-400 lg:hidden">가격</label>
                  <input type="text" data-field="price" value={row.price}
                         class="w-full px-3 py-2 rounded-lg border border-gold/40 bg-gold/5 text-base font-black text-brown-950 text-right focus:border-gold focus:outline-none" />
                </div>
                {/* 비고 */}
                <div class="lg:col-span-3">
                  <label class="text-[9px] tracking-[0.25em] font-bold text-brown-400 lg:hidden">비고</label>
                  <input type="text" data-field="note" value={row.note || ''} placeholder="비고 (선택)"
                         class="w-full px-3 py-2 rounded-lg border border-brown-200 bg-ivory text-xs text-brown-700 focus:border-brown-600 focus:outline-none" />
                </div>
                {/* 토글들 */}
                <div class="lg:col-span-2 flex items-center gap-3 text-xs">
                  <label class="inline-flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" data-field="is_highlight" checked={row.is_highlight === 1} class="w-4 h-4 accent-amber-500" />
                    <span class="font-bold text-amber-700">SIGN</span>
                  </label>
                  <label class="inline-flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" data-field="is_published" checked={row.is_published === 1} class="w-4 h-4 accent-emerald-500" />
                    <span class="font-bold text-emerald-700">공개</span>
                  </label>
                </div>
                {/* 액션 */}
                <div class="lg:col-span-1 flex gap-1 justify-end">
                  <button type="button" class="px-2.5 py-2 rounded-lg bg-brown-900 text-ivory text-xs hover:bg-brown-950" data-save-row={String(row.id)} title="저장">
                    <i class="fas fa-save"></i>
                  </button>
                  <button type="button" class="px-2.5 py-2 rounded-lg bg-rose-50 text-rose-700 text-xs hover:bg-rose-100" data-delete-row={String(row.id)} title="삭제">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 새 항목 추가 */}
          <div class="px-4 lg:px-6 py-4 bg-cream/40 border-t border-brown-200 flex gap-2 flex-wrap items-center" data-new-row={String(g.sort_group)}>
            <input type="text" placeholder="새 항목명" data-new-field="name"
                   class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-brown-200 bg-ivory text-sm" />
            <input type="text" placeholder="가격 (예: 80만원)" data-new-field="price"
                   class="w-32 px-3 py-2 rounded-lg border border-gold/40 bg-gold/5 text-sm font-bold text-right" />
            <input type="text" placeholder="비고" data-new-field="note"
                   class="flex-1 min-w-[140px] px-3 py-2 rounded-lg border border-brown-200 bg-ivory text-xs" />
            <button type="button" class="btn-primary text-xs whitespace-nowrap" data-add-row={String(g.sort_group)}>
              <i class="fas fa-plus"></i> 추가
            </button>
          </div>
        </div>
      ))}
    </div>

    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        // === 그룹 접기/펼치기 ===
        document.querySelectorAll('[data-toggle-group]').forEach(function(btn){
          btn.addEventListener('click', function(){
            var g = btn.getAttribute('data-toggle-group');
            var rows = document.querySelector('[data-group-rows="'+g+'"]');
            var body = document.querySelector('[data-group-body="'+g+'"]');
            var newrow = document.querySelector('[data-new-row="'+g+'"]');
            var chev = document.querySelector('[data-chevron="'+g+'"]');
            var hidden = rows.style.display === 'none';
            rows.style.display = hidden ? '' : 'none';
            body.style.display = hidden ? '' : 'none';
            newrow.style.display = hidden ? '' : 'none';
            if(chev) chev.style.transform = hidden ? '' : 'rotate(-90deg)';
          });
        });
        document.getElementById('feesCollapseAll').addEventListener('click', function(){
          document.querySelectorAll('[data-group-rows]').forEach(function(r){r.style.display='none'});
          document.querySelectorAll('[data-group-body]').forEach(function(r){r.style.display='none'});
          document.querySelectorAll('[data-new-row]').forEach(function(r){r.style.display='none'});
          document.querySelectorAll('[data-chevron]').forEach(function(c){c.style.transform='rotate(-90deg)'});
        });
        document.getElementById('feesExpandAll').addEventListener('click', function(){
          document.querySelectorAll('[data-group-rows]').forEach(function(r){r.style.display=''});
          document.querySelectorAll('[data-group-body]').forEach(function(r){r.style.display=''});
          document.querySelectorAll('[data-new-row]').forEach(function(r){r.style.display=''});
          document.querySelectorAll('[data-chevron]').forEach(function(c){c.style.transform=''});
        });

        // === 행 데이터 추출 ===
        function rowPayload(rowEl){
          return {
            name: rowEl.querySelector('[data-field="name"]').value.trim(),
            price: rowEl.querySelector('[data-field="price"]').value.trim(),
            note: rowEl.querySelector('[data-field="note"]').value.trim() || null,
            is_highlight: rowEl.querySelector('[data-field="is_highlight"]').checked ? 1 : 0,
            is_published: rowEl.querySelector('[data-field="is_published"]').checked ? 1 : 0
          };
        }

        // === 단일 행 저장 ===
        document.querySelectorAll('[data-save-row]').forEach(function(btn){
          btn.addEventListener('click', async function(){
            var id = btn.getAttribute('data-save-row');
            var rowEl = btn.closest('[data-row-id]');
            try {
              var r = await fetch('/api/admin/fees/'+id, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(rowPayload(rowEl))
              });
              var j = await r.json();
              if(!j.ok) throw new Error(j.error || '저장 실패');
              window.adminToast('저장 완료');
              // 시각 피드백
              if(rowPayload(rowEl).is_highlight===1) rowEl.classList.add('bg-gold/5'); else rowEl.classList.remove('bg-gold/5');
              if(rowPayload(rowEl).is_published===1) rowEl.classList.remove('opacity-50'); else rowEl.classList.add('opacity-50');
            } catch(err) { window.adminToast('실패: '+err.message, 'err') }
          });
        });

        // === 행 삭제 ===
        document.querySelectorAll('[data-delete-row]').forEach(function(btn){
          btn.addEventListener('click', async function(){
            if(!confirm('이 항목을 삭제하시겠습니까?')) return;
            var id = btn.getAttribute('data-delete-row');
            var rowEl = btn.closest('[data-row-id]');
            try {
              var r = await fetch('/api/admin/fees/'+id, { method: 'DELETE' });
              var j = await r.json();
              if(!j.ok) throw new Error(j.error || '삭제 실패');
              rowEl.remove();
              window.adminToast('삭제 완료');
            } catch(err) { window.adminToast('실패: '+err.message, 'err') }
          });
        });

        // === 그룹 일괄 저장 ===
        document.querySelectorAll('[data-bulk-save]').forEach(function(btn){
          btn.addEventListener('click', async function(){
            var g = btn.getAttribute('data-bulk-save');
            var rows = document.querySelectorAll('[data-group-rows="'+g+'"] [data-row-id]');
            var items = [];
            rows.forEach(function(rowEl){
              var p = rowPayload(rowEl);
              p.id = parseInt(rowEl.getAttribute('data-row-id'), 10);
              items.push(p);
            });
            try {
              var r = await fetch('/api/admin/fees/bulk', {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ items: items })
              });
              var j = await r.json();
              if(!j.ok) throw new Error(j.error || '저장 실패');
              window.adminToast(j.affected+'건 저장 완료');
            } catch(err) { window.adminToast('실패: '+err.message, 'err') }
          });
        });

        // === 그룹 안내 저장 ===
        document.querySelectorAll('[data-save-group-note]').forEach(function(btn){
          btn.addEventListener('click', async function(){
            var g = btn.getAttribute('data-save-group-note');
            var input = document.querySelector('[data-group-note="'+g+'"]');
            try {
              var r = await fetch('/api/admin/fees/group-note', {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ sort_group: parseInt(g,10), group_note: input.value })
              });
              var j = await r.json();
              if(!j.ok) throw new Error(j.error || '저장 실패');
              window.adminToast('안내 저장 완료');
            } catch(err) { window.adminToast('실패: '+err.message, 'err') }
          });
        });

        // === 새 행 추가 ===
        document.querySelectorAll('[data-add-row]').forEach(function(btn){
          btn.addEventListener('click', async function(){
            var g = btn.getAttribute('data-add-row');
            var card = btn.closest('[data-group-card]');
            var newBox = document.querySelector('[data-new-row="'+g+'"]');
            var name = newBox.querySelector('[data-new-field="name"]').value.trim();
            var price = newBox.querySelector('[data-new-field="price"]').value.trim();
            var note = newBox.querySelector('[data-new-field="note"]').value.trim();
            if(!name || !price) return window.adminToast('항목명과 가격은 필수입니다.', 'err');
            try {
              var r = await fetch('/api/admin/fees', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ sort_group: parseInt(g,10), name: name, price: price, note: note || null })
              });
              var j = await r.json();
              if(!j.ok) throw new Error(j.error || '추가 실패');
              window.adminToast('추가 완료 — 새로고침');
              setTimeout(function(){ location.reload() }, 600);
            } catch(err) { window.adminToast('실패: '+err.message, 'err') }
          });
        });
      })();
    `}}/>
  </AdminShell>
)

/* =========================================================================
   SEO/AEO 가이드 — Google Search Console / Naver Webmaster 등록 가이드
   ========================================================================= */
export const AdminSeoGuidePage = ({ stats }: { stats: { blog: number, ba: number, doctors: number, treatments: number, sitemaps: string[] } }) => (
  <AdminShell active="seo">
    <ToastBootstrap />
    <div class="mb-6 lg:mb-8 flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 class="display text-3xl lg:text-4xl font-light text-brown-900">SEO · AEO 가이드</h1>
        <p class="text-brown-600 text-sm mt-2">구글 · 네이버에서 컬럼·비포애프터가 빵빵 터지게 만드는 셀프 가이드</p>
      </div>
      <div class="flex gap-2">
        <a href="/sitemap.xml" target="_blank" class="btn-outline text-xs"><i class="fas fa-file-code mr-1"></i>sitemap.xml</a>
        <a href="/robots.txt" target="_blank" class="btn-outline text-xs"><i class="fas fa-robot mr-1"></i>robots.txt</a>
        <a href="/llms.txt" target="_blank" class="btn-outline text-xs"><i class="fas fa-brain mr-1"></i>llms.txt</a>
      </div>
    </div>

    {/* 현황 카드 */}
    <div class="grid md:grid-cols-4 gap-4 mb-8">
      <div class="bg-ivory rounded-2xl shadow-card p-5">
        <div class="text-xs text-brown-500 tracking-widest mb-2">색인 대상 컬럼</div>
        <div class="display text-3xl text-brown-900">{stats.blog}<span class="text-sm text-brown-500 ml-1">건</span></div>
      </div>
      <div class="bg-ivory rounded-2xl shadow-card p-5">
        <div class="text-xs text-brown-500 tracking-widest mb-2">색인 대상 비포애프터</div>
        <div class="display text-3xl text-brown-900">{stats.ba}<span class="text-sm text-brown-500 ml-1">건</span></div>
      </div>
      <div class="bg-ivory rounded-2xl shadow-card p-5">
        <div class="text-xs text-brown-500 tracking-widest mb-2">원장 페이지</div>
        <div class="display text-3xl text-brown-900">{stats.doctors}<span class="text-sm text-brown-500 ml-1">명</span></div>
      </div>
      <div class="bg-ivory rounded-2xl shadow-card p-5">
        <div class="text-xs text-brown-500 tracking-widest mb-2">진료 페이지</div>
        <div class="display text-3xl text-brown-900">{stats.treatments}<span class="text-sm text-brown-500 ml-1">개</span></div>
      </div>
    </div>

    {/* STEP 1: Google Search Console */}
    <div class="bg-ivory rounded-2xl shadow-card p-6 lg:p-8 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
        <h2 class="display text-2xl text-brown-900">Google Search Console 등록</h2>
      </div>
      <ol class="space-y-3 text-sm text-brown-800 list-decimal list-inside ml-2 leading-relaxed">
        <li><a href="https://search.google.com/search-console" target="_blank" class="text-blue-600 underline">search.google.com/search-console</a> 접속 → 속성 추가 → <strong>URL 접두어</strong> 선택</li>
        <li>주소 입력: <code class="bg-brown-100 px-2 py-0.5 rounded">https://daegu365dc.com</code></li>
        <li>소유권 확인 방법: <strong>HTML 태그</strong> 선택 → 메타 태그 복사 (예: <code class="bg-brown-100 px-2 py-0.5 rounded">&lt;meta name="google-site-verification" content="ABC123..."&gt;</code>)</li>
        <li>복사한 <strong>content 값만</strong> 복사 → 개발팀에게 전달 (renderer.tsx의 verification 메타에 삽입 필요)</li>
        <li>등록 후 좌측 메뉴 → <strong>Sitemaps</strong> → 다음 4개 모두 제출:
          <div class="mt-2 bg-brown-50 border border-brown-200 rounded p-3 font-mono text-xs space-y-1">
            <div>sitemap.xml</div>
            <div>sitemap-main.xml</div>
            <div>sitemap-blog.xml</div>
            <div>sitemap-cases.xml</div>
            <div>sitemap-content.xml</div>
          </div>
        </li>
        <li>좌측 <strong>URL 검사</strong> → 새 글 URL 입력 → "색인 생성 요청" 클릭 (포스팅마다 수동 푸시 가능)</li>
      </ol>
    </div>

    {/* STEP 2: Naver Webmaster */}
    <div class="bg-ivory rounded-2xl shadow-card p-6 lg:p-8 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
        <h2 class="display text-2xl text-brown-900">네이버 서치어드바이저 등록</h2>
      </div>
      <ol class="space-y-3 text-sm text-brown-800 list-decimal list-inside ml-2 leading-relaxed">
        <li><a href="https://searchadvisor.naver.com" target="_blank" class="text-green-600 underline">searchadvisor.naver.com</a> 접속 → 네이버 로그인 → 사이트 등록</li>
        <li>주소: <code class="bg-brown-100 px-2 py-0.5 rounded">https://daegu365dc.com</code></li>
        <li>소유 확인: <strong>HTML 태그</strong> 선택 → content 값 복사 → 개발팀 전달 (naver-site-verification)</li>
        <li>등록 후 좌측 <strong>요청 → 사이트맵 제출</strong> → <code class="bg-brown-100 px-2 py-0.5 rounded">sitemap.xml</code> 제출 (sitemapindex 자동 인식)</li>
        <li>좌측 <strong>요청 → 웹페이지 수집</strong> → 새 글 URL 입력 → 수집 요청 (네이버는 수동 요청 필수)</li>
        <li><strong>RSS 등록 권장</strong>: 좌측 RSS 제출 → <code class="bg-brown-100 px-2 py-0.5 rounded">https://daegu365dc.com/rss.xml</code> (구현 예정 시)</li>
      </ol>
    </div>

    {/* STEP 3: 포스팅 체크리스트 */}
    <div class="bg-ivory rounded-2xl shadow-card p-6 lg:p-8 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-gold text-brown-950 flex items-center justify-center font-bold">3</div>
        <h2 class="display text-2xl text-brown-900">포스팅마다 체크할 SEO 7계명</h2>
      </div>
      <div class="space-y-3 text-sm text-brown-800">
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>제목에 핵심 키워드 + 지역</strong> (예: "대구 임플란트 가격, 365치과가 솔직하게 알려드립니다") - 32자 이내 권장</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>Meta Description 직접 작성</strong> (70~155자) - 검색결과에 그대로 노출됨. 자동 생성보다 압도적으로 강력</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>키워드 5종 필수 포함</strong>: 임플란트, 인비절라인, 라미네이트, 글로우네이트, 치아교정 - 자동 보완되지만 본문/키워드란에 직접 넣으면 더 강함</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>썸네일 + OG 이미지 설정</strong> - 카톡/페북/네이버 공유 시 썸네일 자동 노출</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>Before/After ALT 텍스트</strong> - 구글 이미지 검색 유입의 핵심. 비포애프터 폼에 직접 입력</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>본문은 H2/H3로 구조화</strong> - 단순 P 태그만 쓰면 검색엔진이 구조를 못 읽음. 어드민 H2/H3 버튼 활용</div></div>
        <div class="flex gap-3"><i class="fas fa-check-circle text-green-600 mt-1"></i><div><strong>발행 후 GSC + 네이버에 URL 수동 색인 요청</strong> - 자동 크롤링 기다리면 1~4주, 수동 요청은 1~3일</div></div>
      </div>
    </div>

    {/* STEP 4: 시스템이 자동으로 해주는 것 */}
    <div class="bg-gradient-to-br from-amber-50 to-ivory rounded-2xl shadow-card p-6 lg:p-8 mb-6 border border-amber-200">
      <div class="flex items-center gap-3 mb-4">
        <i class="fas fa-magic text-2xl text-gold"></i>
        <h2 class="display text-2xl text-brown-900">시스템이 자동으로 처리 중인 SEO/AEO</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-3 text-sm text-brown-800">
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>JSON-LD 구조화 데이터</strong> 자동 삽입 (Article, BlogPosting, MedicalCaseStudy)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>OpenGraph + Twitter Card</strong> 자동 생성 (SNS 공유 미리보기)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>Canonical URL</strong> 자동 (중복 콘텐츠 방지)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>image:image sitemap</strong> 자동 (구글 이미지 검색 색인)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>AI 봇 허용</strong> (GPTBot, ClaudeBot, PerplexityBot) - ChatGPT/Claude/Perplexity 답변에 인용</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>llms.txt</strong> 자동 제공 (AI 답변엔진 최적화)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>Description 3단 폴백</strong> (직접입력 → 요약 → 본문자동추출)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>키워드 5종 자동 보완</strong> (임플란트/인비절라인/라미네이트/글로우네이트/치아교정)</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>분할 sitemap 4종</strong> (main/blog/cases/content) - 대용량 크롤링 최적화</div></div>
        <div class="flex gap-2"><i class="fas fa-bolt text-gold mt-1"></i><div><strong>Author/Publisher 스키마</strong> (E-E-A-T: 의료 전문성 자동 표기)</div></div>
      </div>
    </div>

    {/* STEP 5: 색인 안되는 글 진단 */}
    <div class="bg-ivory rounded-2xl shadow-card p-6 lg:p-8 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">!</div>
        <h2 class="display text-2xl text-brown-900">"왜 검색이 안 되지?" 자가 진단 체크</h2>
      </div>
      <ul class="space-y-2 text-sm text-brown-800">
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>발행한 지 얼마나 됐나?</strong> - 신규 사이트는 첫 색인까지 2~8주 걸림. GSC 색인 요청 안 했으면 더 오래</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>"공개" 체크 했나?</strong> - 어드민 폼 하단 공개 체크박스 확인</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>"검색노출 차단(noindex)" 실수로 체크?</strong> - 새로 추가된 SEO 섹션의 noindex 체크박스 확인</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>GSC에 sitemap 제출했나?</strong> - 위 STEP 1·5번 확인</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>제목·본문에 키워드 들어갔나?</strong> - 검색엔진은 본문에 키워드 없으면 안 색인</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>본문 글자 수 충분?</strong> - 300자 미만 짧은 글은 색인 우선순위 낮음. 800자 이상 권장</li>
        <li><i class="fas fa-question-circle text-rose-600 mr-2"></i><strong>"site:daegu365dc.com" 구글 검색</strong> - 색인된 페이지 수 확인 (목표: 100+)</li>
      </ul>
    </div>

    {/* 빠른 액션 */}
    <div class="bg-brown-900 text-ivory rounded-2xl p-6 lg:p-8">
      <h3 class="display text-xl mb-4"><i class="fas fa-rocket mr-2 text-gold"></i>지금 바로 할 수 있는 액션</h3>
      <div class="grid md:grid-cols-2 gap-3">
        <a href="https://search.google.com/search-console" target="_blank" class="bg-brown-800 hover:bg-brown-700 rounded-lg p-4 transition">
          <div class="font-bold text-gold mb-1">→ GSC에서 색인 요청</div>
          <div class="text-xs text-brown-300">URL 검사 → 색인 생성 요청</div>
        </a>
        <a href="https://searchadvisor.naver.com" target="_blank" class="bg-brown-800 hover:bg-brown-700 rounded-lg p-4 transition">
          <div class="font-bold text-gold mb-1">→ 네이버에서 수집 요청</div>
          <div class="text-xs text-brown-300">요청 → 웹페이지 수집</div>
        </a>
        <a href="https://search.google.com/test/rich-results" target="_blank" class="bg-brown-800 hover:bg-brown-700 rounded-lg p-4 transition">
          <div class="font-bold text-gold mb-1">→ 리치 결과 테스트</div>
          <div class="text-xs text-brown-300">JSON-LD 정상 작동 확인</div>
        </a>
        <a href="https://pagespeed.web.dev" target="_blank" class="bg-brown-800 hover:bg-brown-700 rounded-lg p-4 transition">
          <div class="font-bold text-gold mb-1">→ PageSpeed 테스트</div>
          <div class="text-xs text-brown-300">속도가 SEO 핵심</div>
        </a>
      </div>
    </div>
  </AdminShell>
)
