// ============ Satori + resvg-wasm 기반 PNG OG 이미지 생성 ============
// 카카오톡·페이스북·네이버 미리보기는 SVG를 못 읽으므로 PNG로 렌더해야 함.
// 흐름:  JSX → Satori(SVG 문자열) → resvg-wasm(PNG Uint8Array)
// 폰트: Pretendard 3종 (Regular/SemiBold/Bold) — R2 /fonts/* 에 사전 업로드.
//
// ⚠️ Cloudflare Workers 정공법:
//   - fetch().arrayBuffer() → WebAssembly.instantiate() 는 정책상 차단됨
//     ("Wasm code generation disallowed by embedder")
//   - 따라서 wasm은 반드시 ES module import 로 받아 WebAssembly.Module 인스턴스로 사용
//   - Vite + @hono/vite-build/cloudflare-pages 가 .wasm import 시 자동으로
//     WebAssembly.Module 객체로 번들 (assetsInclude 에 '**/*.wasm' 등록 완료)
//
// 캐시 전략:
//  1) globalThis.__OG_FONT_CACHE / __OG_WASM_INITED  — 워커 인스턴스 살아있는 동안 메모리 캐시
//  2) R2 (daegu365dc-assets/og-cache/{key}.png)        — 영구 캐시, 두 번째 호출부터 즉시 응답

import satori from 'satori'
import { initWasm, Resvg } from '@resvg/resvg-wasm'

// wasm 을 base64 문자열로 인라인 import — vite.config.ts 의 wasmBase64Plugin 처리
// Cloudflare Workers 는 fetch().instantiate() 차단되므로
// base64 → Uint8Array → WebAssembly.Module (동기 컴파일) 정공법
// @ts-ignore — custom vite plugin
import resvgWasmBase64 from '@resvg/resvg-wasm/index_bg.wasm?wasm-base64'

// base64 문자열 → Uint8Array (Cloudflare Workers 표준 atob 사용)
function b64ToBytes(b64: string): Uint8Array {
  const binStr = atob(b64)
  const len = binStr.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i)
  return bytes
}

type R2Bucket = {
  get(key: string): Promise<{ arrayBuffer(): Promise<ArrayBuffer>; httpEtag: string; size: number; body: ReadableStream } | null>
  put(key: string, value: ArrayBuffer | Uint8Array, opts?: any): Promise<any>
}

// ============ resvg wasm 초기화 (워커당 1회) ============
// satori v0.26 은 yoga.wasm 을 내부에서 자동 처리하므로 별도 초기화 불필요
let wasmInitPromise: Promise<void> | null = null
async function ensureResvgInited() {
  if ((globalThis as any).__OG_WASM_INITED) return
  if (!wasmInitPromise) {
    wasmInitPromise = (async () => {
      // base64 → Uint8Array → WebAssembly.Module (동기 컴파일, fetch 없음)
      const bytes = b64ToBytes(resvgWasmBase64 as string)
      const mod = new WebAssembly.Module(bytes)
      await initWasm(mod)
      ;(globalThis as any).__OG_WASM_INITED = true
    })()
  }
  return wasmInitPromise
}

// ============ 폰트 로드 (워커당 1회) ============
type FontCache = { regular: ArrayBuffer; semibold: ArrayBuffer; bold: ArrayBuffer }
async function loadFonts(R2: R2Bucket): Promise<FontCache> {
  const cached = (globalThis as any).__OG_FONT_CACHE as FontCache | undefined
  if (cached) return cached
  const [reg, semi, bold] = await Promise.all([
    R2.get('fonts/pretendard-regular.otf'),
    R2.get('fonts/pretendard-semibold.otf'),
    R2.get('fonts/pretendard-bold.otf'),
  ])
  if (!reg || !semi || !bold) {
    throw new Error('Pretendard font missing in R2 (fonts/pretendard-{regular,semibold,bold}.otf)')
  }
  const [regular, semibold, boldBuf] = await Promise.all([
    reg.arrayBuffer(), semi.arrayBuffer(), bold.arrayBuffer(),
  ])
  const cache: FontCache = { regular, semibold, bold: boldBuf }
  ;(globalThis as any).__OG_FONT_CACHE = cache
  return cache
}

// ============ 디자인 토큰 (SVG OG와 동일 팔레트) ============
const C = {
  bg1: '#1a120a',
  bg2: '#4a3520',
  gold: '#c9a876',
  goldDim: '#b89468',
  cream: '#fdfbf7',
  brown: '#6b4c2a',
}

// 텍스트 자동 줄바꿈
function wrap(text: string, max: number, maxLines: number): string[] {
  if (!text) return []
  const lines: string[] = []
  let cur = ''
  for (const ch of text) {
    if ((cur + ch).length > max) {
      lines.push(cur)
      cur = ch
      if (lines.length >= maxLines) break
    } else {
      cur += ch
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur)
  if (text.length > lines.join('').length && lines.length === maxLines) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + '…'
  }
  return lines
}

function titleSize(text: string): number {
  const len = text.length
  if (len <= 12) return 92
  if (len <= 18) return 76
  if (len <= 26) return 64
  if (len <= 36) return 54
  return 46
}

// ============ 공통 wrapper (그라디언트 배경 + 365 배지 + 푸터) ============
function frame(children: any) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px', height: '630px', display: 'flex',
        flexDirection: 'column', position: 'relative',
        background: `linear-gradient(135deg, ${C.bg1} 0%, ${C.bg2} 100%)`,
        fontFamily: 'Pretendard',
        color: C.cream,
        padding: '0',
      },
      children: [
        // 우상단 라디얼 글로우 (semi-transparent gold)
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', top: '0', right: '0',
              width: '700px', height: '700px',
              background: `radial-gradient(circle at top right, rgba(201,168,118,0.4) 0%, rgba(201,168,118,0) 60%)`,
              display: 'flex',
            }
          }
        },
        // 365 골드 배지 (우상단)
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', top: '70px', right: '90px',
              width: '160px', height: '160px',
              borderRadius: '50%',
              border: `2px solid ${C.gold}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '64px', color: C.gold, fontWeight: 400,
              fontFamily: 'Pretendard',
            },
            children: '365',
          }
        },
        // 컨텐츠 본문
        children,
        // 푸터
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', bottom: '50px', left: '80px', right: '80px',
              fontSize: '22px', color: C.goldDim, letterSpacing: '0.5px',
              display: 'flex',
            },
            children: '대구 북구 침산로 148  ·  053-357-0365  ·  daegu365dc.kr',
          }
        }
      ]
    }
  }
}

function eyebrow(label: string) {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', gap: '14px' },
      children: [
        {
          type: 'div',
          props: {
            style: { fontSize: '22px', color: C.gold, letterSpacing: '6px', fontWeight: 400, display: 'flex' },
            children: label,
          }
        },
        {
          type: 'div',
          props: {
            style: { width: '100px', height: '2px', background: C.gold, display: 'flex' }
          }
        }
      ]
    }
  }
}

// ============ 5종 템플릿 (JSX-as-object) ============

function tplDefault(opts: { title?: string; subtitle?: string }) {
  const title = opts.title || '치과가 두려워도'
  const sub = opts.subtitle || '괜찮습니다.'
  const ts = titleSize(title)
  return frame({
    type: 'div',
    props: {
      style: {
        position: 'absolute', top: '120px', left: '80px', right: '80px',
        display: 'flex', flexDirection: 'column', gap: '36px',
      },
      children: [
        eyebrow('DAEGU 365 DENTAL CLINIC'),
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: `${ts}px`, fontWeight: 700, color: C.cream, lineHeight: 1.1, display: 'flex' },
                  children: title,
                }
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: `${ts}px`, fontWeight: 400, color: C.gold, fontStyle: 'italic', lineHeight: 1.1, display: 'flex' },
                  children: sub,
                }
              },
            ]
          }
        },
        {
          type: 'div',
          props: {
            style: { fontSize: '24px', color: C.goldDim, marginTop: '40px', display: 'flex' },
            children: '수면임플란트 · 인비절라인 · 라미네이트 전문',
          }
        }
      ]
    }
  })
}

function tplDoctor(opts: { name: string; position: string; specialty?: string }) {
  const ts = titleSize(opts.name) + 24
  return frame({
    type: 'div',
    props: {
      style: {
        position: 'absolute', top: '110px', left: '80px', right: '80px',
        display: 'flex', flexDirection: 'column', gap: '32px',
      },
      children: [
        eyebrow('MEDICAL TEAM · 의료진'),
        {
          type: 'div',
          props: {
            style: { fontSize: '32px', color: C.goldDim, fontWeight: 400, marginTop: '60px', display: 'flex' },
            children: opts.position || '',
          }
        },
        {
          type: 'div',
          props: {
            style: { fontSize: `${ts}px`, fontWeight: 700, color: C.cream, lineHeight: 1, display: 'flex' },
            children: opts.name,
          }
        },
        opts.specialty
          ? {
              type: 'div',
              props: {
                style: { fontSize: '28px', color: C.gold, marginTop: '8px', display: 'flex' },
                children: opts.specialty,
              }
            }
          : { type: 'div', props: { style: { display: 'flex' }, children: '' } },
      ]
    }
  })
}

function tplTreatment(opts: { name: string; tagline?: string; category?: string }) {
  const ts = titleSize(opts.name)
  const taglineLines = opts.tagline ? wrap(opts.tagline, 28, 2) : []
  return frame({
    type: 'div',
    props: {
      style: {
        position: 'absolute', top: '110px', left: '80px', right: '80px',
        display: 'flex', flexDirection: 'column', gap: '32px',
      },
      children: [
        eyebrow(`TREATMENT · ${(opts.category || '진료').toUpperCase()}`),
        {
          type: 'div',
          props: {
            style: { fontSize: `${ts}px`, fontWeight: 700, color: C.cream, lineHeight: 1.05, marginTop: '40px', display: 'flex' },
            children: opts.name,
          }
        },
        ...taglineLines.map(line => ({
          type: 'div',
          props: {
            style: { fontSize: '34px', fontWeight: 400, color: C.gold, lineHeight: 1.3, display: 'flex' },
            children: line,
          }
        })),
      ]
    }
  })
}

function tplBlog(opts: { title: string; author?: string }) {
  const lines = wrap(opts.title, 18, 3)
  const fs = lines.length === 1 ? 84 : lines.length === 2 ? 68 : 56
  return frame({
    type: 'div',
    props: {
      style: {
        position: 'absolute', top: '110px', left: '80px', right: '80px',
        display: 'flex', flexDirection: 'column', gap: '28px',
      },
      children: [
        eyebrow('BLOG · 의료진 칼럼'),
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '40px' },
            children: lines.map(line => ({
              type: 'div',
              props: {
                style: { fontSize: `${fs}px`, fontWeight: 600, color: C.cream, lineHeight: 1.2, display: 'flex' },
                children: line,
              }
            }))
          }
        },
        {
          type: 'div',
          props: {
            style: { fontSize: '24px', color: C.gold, marginTop: '20px', display: 'flex' },
            children: opts.author ? `by ${opts.author} · 대구365치과` : '대구365치과 의료진 칼럼',
          }
        }
      ]
    }
  })
}

function tplBeforeAfter(opts: { title: string; treatment?: string; doctor?: string }) {
  const lines = wrap(opts.title, 22, 2)
  const fs = lines.length === 1 ? 72 : 58
  const meta = [opts.treatment, opts.doctor].filter(Boolean).join(' · ')
  return frame({
    type: 'div',
    props: {
      style: { width: '1200px', height: '630px', display: 'flex' },
      children: [
        // BEFORE/AFTER 워터마크 데코
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', top: '300px', left: '60px',
              fontSize: '180px', fontWeight: 800, color: C.gold, opacity: 0.18,
              letterSpacing: '6px', display: 'flex',
            },
            children: 'BEFORE',
          }
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', top: '430px', left: '580px',
              fontSize: '180px', fontWeight: 800, color: C.gold, opacity: 0.18,
              letterSpacing: '6px', display: 'flex',
            },
            children: 'AFTER',
          }
        },
        // 본문
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute', top: '110px', left: '80px', right: '80px',
              display: 'flex', flexDirection: 'column', gap: '28px',
            },
            children: [
              eyebrow('CASE · 실제 치료 사례'),
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '50px' },
                  children: lines.map(line => ({
                    type: 'div',
                    props: {
                      style: { fontSize: `${fs}px`, fontWeight: 700, color: C.cream, lineHeight: 1.15, display: 'flex' },
                      children: line,
                    }
                  }))
                }
              },
              meta
                ? {
                    type: 'div',
                    props: {
                      style: { fontSize: '28px', color: C.gold, fontWeight: 400, marginTop: '12px', display: 'flex' },
                      children: meta,
                    }
                  }
                : { type: 'div', props: { style: { display: 'flex' }, children: '' } },
              {
                type: 'div',
                props: {
                  style: { fontSize: '22px', color: C.goldDim, marginTop: '16px', display: 'flex' },
                  children: '대구365치과 · 검증된 결과',
                }
              }
            ]
          }
        }
      ]
    }
  })
}

// ============ 메인 분기 ============
export type OgType = 'default' | 'doctor' | 'treatment' | 'blog' | 'before-after'

function buildElement(type: OgType, params: URLSearchParams): any {
  switch (type) {
    case 'doctor':
      return tplDoctor({
        name: params.get('name') || '의료진',
        position: params.get('position') || '대표원장',
        specialty: params.get('specialty') || undefined,
      })
    case 'treatment':
      return tplTreatment({
        name: params.get('name') || '진료',
        tagline: params.get('tagline') || undefined,
        category: params.get('category') || undefined,
      })
    case 'blog':
      return tplBlog({
        title: params.get('title') || '블로그',
        author: params.get('author') || undefined,
      })
    case 'before-after':
      return tplBeforeAfter({
        title: params.get('title') || '치료 사례',
        treatment: params.get('treatment') || undefined,
        doctor: params.get('doctor') || undefined,
      })
    default:
      return tplDefault({
        title: params.get('title') || undefined,
        subtitle: params.get('subtitle') || undefined,
      })
  }
}

// ============ 캐시 키 (URL 쿼리 → 안정적 해시 문자열) ============
async function cacheKeyFor(type: OgType, params: URLSearchParams): Promise<string> {
  // 정렬해서 안정적인 키 만들기
  const sorted = Array.from(params.entries())
    .filter(([k]) => k !== 'type')
    .sort(([a], [b]) => a.localeCompare(b))
  const raw = `${type}|${sorted.map(([k, v]) => `${k}=${v}`).join('&')}`
  // SHA-256 짧은 해시 (16자)
  const buf = new TextEncoder().encode(raw)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `og-cache/${type}/${hex.slice(0, 16)}.png`
}

// ============ 메인 함수 — PNG 렌더 (R2 캐시 포함) ============
export async function renderOgPng(
  type: OgType,
  params: URLSearchParams,
  R2: R2Bucket
): Promise<{ body: Uint8Array | ReadableStream; cacheHit: boolean }> {
  const key = await cacheKeyFor(type, params)
  // R2 캐시 적중 — 바로 stream 으로 반환
  const cached = await R2.get(key)
  if (cached) {
    return { body: cached.body, cacheHit: true }
  }
  // 폰트 + wasm 준비
  const [fonts] = await Promise.all([loadFonts(R2), ensureResvgInited()])
  const element = buildElement(type, params)
  // Satori → SVG
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Pretendard', data: fonts.regular, weight: 400, style: 'normal' },
      { name: 'Pretendard', data: fonts.semibold, weight: 600, style: 'normal' },
      { name: 'Pretendard', data: fonts.bold, weight: 700, style: 'normal' },
    ],
  })
  // resvg → PNG
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const pngData = resvg.render().asPng()
  // R2에 영구 캐시 (실패해도 응답은 진행)
  try {
    await R2.put(key, pngData, {
      httpMetadata: { contentType: 'image/png', cacheControl: 'public, max-age=31536000, immutable' }
    })
  } catch {}
  return { body: pngData, cacheHit: false }
}
