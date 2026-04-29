// Admin pages — 반응형·검색·필터·페이지네이션·일괄작업·인라인 토글
import type { BeforeAfter, BlogPost, Notice, Doctor, Treatment } from '../lib/types'

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
              {treatments.map(t => <option value={t.slug} selected={item?.treatment_slug === t.slug}>{t.name}</option>)}
            </select>
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
