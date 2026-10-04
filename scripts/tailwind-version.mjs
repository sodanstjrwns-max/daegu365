// public/static/tailwind.css 내용 해시를 src/lib/tailwind-version.ts 에 기록한다.
// css:build 직후 실행되므로 renderer 의 ?v= 는 항상 실제 CSS 내용과 일치한다(고정 ?v= 금지).
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

const css = readFileSync(new URL('../public/static/tailwind.css', import.meta.url))
const hash = createHash('sha256').update(css).digest('hex').slice(0, 10)
const out = new URL('../src/lib/tailwind-version.ts', import.meta.url)
const body = `// 자동 생성(scripts/tailwind-version.mjs) — 직접 수정하지 마세요.\nexport const TAILWIND_CSS_VERSION = '${hash}'\n`
let prev = ''
try { prev = readFileSync(out, 'utf8') } catch {}
if (prev !== body) writeFileSync(out, body)
console.log(`tailwind.css ?v=${hash}`)
