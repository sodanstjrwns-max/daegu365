#!/usr/bin/env node
// 정적 og:image PNG 생성기 (1200×630)
//
// 왜: Cloudflare Workers 는 런타임 WebAssembly 컴파일을 막아 /api/og.png(Satori+resvg)가 항상 SVG 로 폴백됐다.
//     카카오톡·페이스북·네이버 미리보기는 SVG 를 읽지 못하므로 빌드 전에 PNG 를 미리 만들어 public/static/og/ 에 둔다.
//
// 하는 일:
//   1) src/ 아래 모든 .ts/.tsx 에서 ogUrl.<type>('문자열', …) 처럼 인자가 전부 문자열 리터럴인 호출을 수집
//   2) src/lib/og-png.tsx 의 템플릿(buildElement)으로 Satori → resvg(wasm, Node) 렌더
//   3) public/static/og/{key}.png 저장 + src/lib/og-static-manifest.ts 에 키 목록 기록
//      (key = src/lib/og.ts ogStaticKey — 런타임과 동일 함수)
//
// 폰트: Pretendard OTF 3종 (R2 daegu365dc-assets/fonts/ 에 있는 것과 동일). 경로는 OG_FONT_DIR (기본 ./.og-fonts)
//   npx wrangler r2 object get daegu365dc-assets/fonts/pretendard-regular.otf --remote --file=.og-fonts/pretendard-regular.otf
//   (semibold, bold 도 같은 방식)
//
// 사용: node scripts/gen-og-static.mjs   → 생성물(public/static/og/*.png, og-static-manifest.ts)을 커밋한다.
import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const FONT_DIR = resolve(ROOT, process.env.OG_FONT_DIR || '.og-fonts')
const OUT_DIR = join(ROOT, 'public/static/og')
const MANIFEST = join(ROOT, 'src/lib/og-static-manifest.ts')

// ---------- 1) 소스에서 리터럴 ogUrl 호출 수집 ----------
const PARAMS = {
  default: ['default', ['title', 'subtitle']],
  doctor: ['doctor', ['name', 'position', 'specialty']],
  treatment: ['treatment', ['name', 'tagline', 'category']],
  blog: ['blog', ['title', 'author']],
  beforeAfter: ['before-after', ['title', 'treatment', 'doctor']],
}
function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(f)) out.push(p)
  }
  return out
}
const specs = new Map()
const LIT = /'((?:[^'\\]|\\.)*)'|`((?:[^`\\$]|\\.)*)`/g
for (const file of walk(join(ROOT, 'src'))) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/ogUrl\.(\w+)\(([^()]*)\)/g)) {
    const def = PARAMS[m[1]]
    if (!def) continue
    const argsSrc = m[2]
    // 인자가 전부 문자열 리터럴인 호출만 (변수·템플릿 치환이 섞이면 런타임 기본 PNG 사용)
    if (argsSrc.replace(LIT, '').replace(/[\s,]/g, '') !== '') continue
    const args = [...argsSrc.matchAll(LIT)].map(a => (a[1] ?? a[2]).replace(/\\(.)/g, '$1'))
    const q = {}
    def[1].forEach((k, i) => { if (args[i]) q[k] = args[i] })
    specs.set(JSON.stringify([def[0], q]), [def[0], q])
  }
}
specs.set(JSON.stringify(['default', {}]), ['default', {}])

// ---------- 2) og.ts / og-png.tsx 를 Node 용으로 번들 ----------
const tmp = join(ROOT, '.og-build')
mkdirSync(tmp, { recursive: true })
// 매니페스트가 없으면 빈 것으로 시작 (og.ts 가 import)
if (!existsSync(MANIFEST)) writeFileSync(MANIFEST, 'export const OG_STATIC_KEYS = new Set<string>([])\n')
writeFileSync(join(tmp, 'entry.ts'),
  `export { ogStaticKey } from '../src/lib/og'\nexport { buildElement } from '../src/lib/og-png'\n`)
await build({
  entryPoints: [join(tmp, 'entry.ts')],
  bundle: true, platform: 'node', format: 'esm',
  outfile: join(tmp, 'entry.mjs'),
  external: ['satori', '@resvg/resvg-wasm'],
  plugins: [{
    name: 'stub-wasm-base64',
    setup(b) {
      b.onResolve({ filter: /\?wasm-base64$/ }, a => ({ path: a.path, namespace: 'stub' }))
      b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'export default ""', loader: 'js' }))
    },
  }],
  logLevel: 'error',
})
const { ogStaticKey, buildElement } = await import(pathToFileURL(join(tmp, 'entry.mjs')).href)
const satori = (await import('satori')).default
const { initWasm, Resvg } = await import('@resvg/resvg-wasm')
await initWasm(readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm')))

const font = (w) => readFileSync(join(FONT_DIR, `pretendard-${w}.otf`))
const fonts = [
  { name: 'Pretendard', data: font('regular'), weight: 400, style: 'normal' },
  { name: 'Pretendard', data: font('semibold'), weight: 600, style: 'normal' },
  { name: 'Pretendard', data: font('bold'), weight: 700, style: 'normal' },
]

// ---------- 3) 렌더 ----------
mkdirSync(OUT_DIR, { recursive: true })
const keys = []
for (const [type, q] of specs.values()) {
  const key = ogStaticKey(type, q)
  const sp = new URLSearchParams(Object.entries(q))
  const svg = await satori(buildElement(type, sp), { width: 1200, height: 630, fonts })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
  writeFileSync(join(OUT_DIR, `${key}.png`), png)
  keys.push(key)
  console.log(`${key}.png  ${type} ${JSON.stringify(q)}`)
}
keys.sort()
writeFileSync(MANIFEST,
  `// 자동 생성: node scripts/gen-og-static.mjs — 직접 수정하지 말 것\n` +
  `// public/static/og/{key}.png 로 미리 렌더된 og:image 목록\n` +
  `export const OG_STATIC_KEYS = new Set<string>([\n${keys.map(k => `  '${k}',`).join('\n')}\n])\n`)
rmSync(tmp, { recursive: true, force: true })
console.log(`\n${keys.length}개 생성 → public/static/og/`)
