// 저메모리 환경용 esbuild 직접 번들링 스크립트
// Vite SSR 번들이 OOM(샌드박스 RAM ~1GB)으로 죽는 문제 대응.
// dist/_worker.js 를 Vite 와 동일한 형태로 생성한다.
import * as esbuild from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ?wasm-base64 import → base64 문자열 인라인 (Vite 플러그인과 동일 동작)
const wasmBase64Plugin = {
  name: 'wasm-base64',
  setup(build) {
    build.onResolve({ filter: /\?wasm-base64$/ }, (args) => {
      const real = args.path.replace(/\?wasm-base64$/, '')
      // node_modules 패키지 경로 해석
      let resolved
      try {
        resolved = import.meta.resolve
          ? fileURLToPath(import.meta.resolve(real, `file://${args.importer}`))
          : resolve(root, 'node_modules', real)
      } catch {
        resolved = resolve(root, 'node_modules', real)
      }
      return { path: resolved, namespace: 'wasm-base64' }
    })
    build.onLoad({ filter: /.*/, namespace: 'wasm-base64' }, (args) => {
      const buf = readFileSync(args.path)
      return { contents: `export default ${JSON.stringify(buf.toString('base64'))};`, loader: 'js' }
    })
  }
}

mkdirSync(resolve(root, 'dist'), { recursive: true })

await esbuild.build({
  entryPoints: [resolve(root, 'src/index.tsx')],
  bundle: true,
  outfile: resolve(root, 'dist/_worker.js'),
  format: 'esm',
  target: 'esnext',
  platform: 'browser',
  minify: false,
  sourcemap: false,
  jsx: 'automatic',
  jsxImportSource: 'hono/jsx',
  loader: { '.otf': 'binary', '.ttf': 'binary', '.wasm': 'binary' },
  plugins: [wasmBase64Plugin],
  logLevel: 'info'
})

// _routes.json (Vite 빌드 산출물과 동일)
writeFileSync(
  resolve(root, 'dist/_routes.json'),
  JSON.stringify({ version: 1, include: ['/*'], exclude: ['/manifest.webmanifest', '/static/*'] })
)

// 정적 자산 복사
if (existsSync(resolve(root, 'public/static'))) {
  cpSync(resolve(root, 'public/static'), resolve(root, 'dist/static'), { recursive: true })
}
if (existsSync(resolve(root, 'public/manifest.webmanifest'))) {
  cpSync(resolve(root, 'public/manifest.webmanifest'), resolve(root, 'dist/manifest.webmanifest'))
}

console.log('✓ esbuild worker 번들 완료 → dist/_worker.js')
