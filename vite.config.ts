import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { readFileSync, readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'

// ============================================================
// 사이트맵 정적 페이지 lastmod = 콘텐츠 파일의 마지막 커밋 날짜 (빌드 시 상수, 2026-09-29)
// 예전엔 sitemap-main 정적 13개 URL 이 매일 new Date()(오늘)였다.
// 얕은 클론·git 없음 → '' → src/lib/content-dates.ts 의 폴백 상수 사용.
// ============================================================
const git = (cmd: string) => execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
const isShallow = (() => { try { return git('git rev-parse --is-shallow-repository') === 'true' } catch { return true } })()

function lastCommitDate(paths: string[]): string {
  if (isShallow || !paths.length) return ''
  try { return git(`git log -1 --format=%cs -- ${paths.join(' ')}`) } catch { return '' }
}

// 한 파일 안의 컴포넌트(export const Name ~ 다음 export const 직전)만의 마지막 수정 날짜
// (misc.tsx 에 공지·용어·FAQ·오시는길·진료시간 페이지가 함께 있어 파일 단위로 보면 다른 페이지 수정이 섞임)
function lastCommitDateOfExport(file: string, name: string): string {
  if (isShallow) return ''
  try {
    const src = readFileSync(file, 'utf8').split('\n')
    const start = src.findIndex((l) => l.startsWith(`export const ${name} `) || l.startsWith(`export const ${name}=`))
    if (start < 0) return lastCommitDate([file])
    let end = src.findIndex((l, i) => i > start && l.startsWith('export '))
    end = end < 0 ? src.length : end
    return git(`git log -1 --format=%cs -s -L ${start + 1},${end}:${file}`).split('\n')[0] || ''
  } catch {
    return ''
  }
}

// D1 테이블 중 관리자 편집 화면 없이 마이그레이션으로만 내용이 바뀌는 것(의료진·진료·FAQ·지역)은
// created_at 이 시드 시각이라 이후 수정이 안 잡힘 → 그 테이블을 쓰는 마이그레이션 파일의 마지막 커밋 날짜.
function migrationsDateFor(table: string): string {
  try {
    const re = new RegExp(`(update|insert(\\s+or\\s+\\w+)?\\s+into|delete\\s+from|replace\\s+into)\\s+${table}\\b`, 'i')
    const files = readdirSync('migrations')
      .filter((f) => f.endsWith('.sql'))
      .map((f) => `migrations/${f}`)
      .filter((f) => re.test(readFileSync(f, 'utf8')))
    return lastCommitDate(files)
  } catch {
    return ''
  }
}

const CONTENT_DATES = {
  home: lastCommitDate(['src/pages/home.tsx']),
  mission: lastCommitDate(['src/pages/mission.tsx']),
  directions: lastCommitDateOfExport('src/pages/misc.tsx', 'DirectionsPage'),
  hours: lastCommitDateOfExport('src/pages/misc.tsx', 'HoursPage'),
  feesPage: lastCommitDate(['src/pages/fees.tsx']),
  doctorsData: migrationsDateFor('doctors'),
  treatmentsData: migrationsDateFor('treatments'),
  faqsData: migrationsDateFor('faqs'),
  regionsData: migrationsDateFor('region_seo'),
}

// Custom plugin: ?wasm-base64 import → base64 string (워커 번들에 인라인)
// Cloudflare Workers 는 fetch().instantiate() 차단되므로 base64 → Uint8Array → WebAssembly.Module 정공법
function wasmBase64Plugin() {
  return {
    name: 'wasm-base64',
    resolveId(source: string, importer?: string) {
      if (source.endsWith('?wasm-base64')) {
        const realPath = source.replace('?wasm-base64', '')
        // node_modules 경로 처리 — importer 있을 때 상대경로 / 패키지명 모두
        return this.resolve(realPath, importer, { skipSelf: true }).then((r: any) => {
          if (r) return r.id + '?wasm-base64'
          return null
        })
      }
      return null
    },
    load(id: string) {
      if (id.endsWith('?wasm-base64')) {
        const realPath = id.replace('?wasm-base64', '')
        const buf = readFileSync(realPath)
        const b64 = buf.toString('base64')
        return `export default "${b64}";`
      }
      return null
    }
  }
}

export default defineConfig({
  define: {
    __CONTENT_DATES__: JSON.stringify(CONTENT_DATES),
  },
  plugins: [
    wasmBase64Plugin(),
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  assetsInclude: ['**/*.otf', '**/*.ttf'],
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: false,
    rollupOptions: {
      external: [],
      output: {
        compact: false
      }
    }
  }
})
