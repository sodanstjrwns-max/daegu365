import { Navbar, Footer } from '../components/Layout'

export const SignupPage = ({ error, email, name, phone }: { error?: string, email?: string, name?: string, phone?: string }) => (
  <>
    <Navbar />
    <section class="pt-12 pb-20 bg-cream min-h-[70vh]">
      <div class="max-w-xl mx-auto px-6">
        <div class="text-center mb-10 fade-in">
          <div class="section-label mb-4">JOIN</div>
          <h1 class="display text-5xl font-black tracking-tight">회원가입</h1>
          <p class="text-brown-700 text-sm mt-4">가입 후 비포애프터의 <em class="italic display">애프터 사진</em>을 확인할 수 있습니다.</p>
        </div>

        <form method="post" action="/signup" class="bg-ivory rounded-3xl p-10 shadow-lux fade-in space-y-6">
          {error && (
            <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>{error}
            </div>
          )}

          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">성함 <span class="text-red-500">*</span></label>
            <input name="name" required value={name || ''} class="form-input" placeholder="홍길동" />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">이메일 <span class="text-red-500">*</span></label>
              <input type="email" name="email" required value={email || ''} class="form-input" placeholder="you@example.com" />
            </div>
            <div>
              <label class="block text-xs tracking-widest text-brown-600 mb-2">휴대폰 <span class="text-red-500">*</span></label>
              <input type="tel" name="phone" required value={phone || ''} class="form-input" placeholder="010-1234-5678" pattern="[0-9\-\s]{9,14}" />
            </div>
          </div>

          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">비밀번호 <span class="text-red-500">*</span></label>
            <input type="password" name="password" required minlength={6} class="form-input" placeholder="6자리 이상" />
          </div>

          <div class="space-y-3 pt-4 border-t border-brown-200">
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="privacy" required class="mt-1" />
              <div class="text-sm">
                <span class="font-medium">[필수] 개인정보 수집·이용 동의</span>
                <details class="mt-1 text-xs text-brown-600">
                  <summary class="cursor-pointer underline">자세히 보기</summary>
                  <p class="mt-2 p-3 bg-cream rounded leading-relaxed">
                    수집 항목: 성함, 이메일, 휴대폰번호 / 수집 목적: 회원 식별, 비포애프터 애프터 이미지 열람, 상담 답변 / 보유 기간: 회원 탈퇴 시까지. 동의 거부 시 회원가입이 제한됩니다.
                  </p>
                </details>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="marketing" class="mt-1" />
              <div class="text-sm">
                <span class="font-medium">[선택] 마케팅 정보 수신 동의</span>
                <details class="mt-1 text-xs text-brown-600">
                  <summary class="cursor-pointer underline">자세히 보기</summary>
                  <p class="mt-2 p-3 bg-cream rounded leading-relaxed">
                    이벤트·프로모션·신규 진료 안내 등을 이메일/문자로 전달받습니다. 언제든 수신 거부 가능합니다.
                  </p>
                </details>
              </div>
            </label>
          </div>

          <button class="btn-primary w-full justify-center py-4">
            <span>가입하고 전체 사례 보기</span>
            <i class="fas fa-arrow-right"></i>
          </button>

          <div class="text-center text-sm text-brown-600">
            이미 회원이신가요? <a href="/login" class="text-brown-800 underline">로그인</a>
          </div>
        </form>
      </div>
    </section>
    <Footer />
  </>
)

export const LoginPage = ({ error, next }: { error?: string, next?: string }) => (
  <>
    <Navbar />
    <section class="pt-12 pb-20 bg-cream min-h-[70vh]">
      <div class="max-w-md mx-auto px-6">
        <div class="text-center mb-10 fade-in">
          <div class="section-label mb-4">LOGIN</div>
          <h1 class="display text-5xl font-black tracking-tight">로그인</h1>
        </div>
        <form method="post" action="/login" class="bg-ivory rounded-3xl p-10 shadow-lux fade-in space-y-5">
          {error && (
            <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>{error}
            </div>
          )}
          <input type="hidden" name="next" value={next || '/before-after'} />
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">이메일</label>
            <input type="email" name="email" required class="form-input" />
          </div>
          <div>
            <label class="block text-xs tracking-widest text-brown-600 mb-2">비밀번호</label>
            <input type="password" name="password" required class="form-input" />
          </div>
          <button class="btn-primary w-full justify-center py-4">로그인</button>
          <div class="text-center text-sm text-brown-600 pt-2">
            회원이 아니신가요? <a href="/signup" class="text-brown-800 underline">회원가입</a>
          </div>
        </form>
      </div>
    </section>
    <Footer />
  </>
)

export const AdminLoginPage = ({ error }: { error?: string }) => (
  <>
    <section class="min-h-screen bg-brown-950 text-ivory flex items-center justify-center px-6">
      <div class="max-w-md w-full">
        <div class="text-center mb-10">
          <div class="display text-3xl font-black tracking-tight text-gold">DAEGU365 ADMIN</div>
          <p class="text-brown-300 text-sm mt-2">관리자 로그인</p>
        </div>
        <form method="post" action="/admin/login" class="bg-brown-900 rounded-3xl p-10 space-y-5 border border-brown-800">
          {error && (
            <div class="p-4 rounded-xl bg-red-900/30 border border-red-700 text-red-200 text-sm">
              <i class="fas fa-exclamation-circle mr-2"></i>{error}
            </div>
          )}
          <div>
            <label class="block text-xs tracking-widest text-gold mb-2">비밀번호</label>
            <input type="password" name="password" required autofocus class="w-full px-4 py-3 rounded-xl bg-brown-950 text-ivory border border-brown-800 focus:border-gold outline-none" />
          </div>
          <button class="w-full py-3 rounded-full bg-gold text-brown-950 font-semibold hover:bg-brown-200 transition">
            LOGIN
          </button>
          <div class="text-xs text-brown-400 text-center">
            <a href="/" class="hover:text-gold">← 홈으로</a>
          </div>
        </form>
      </div>
    </section>
  </>
)
