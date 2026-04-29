import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

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
