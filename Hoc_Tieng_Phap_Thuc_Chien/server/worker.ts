import { tutor } from './tutor'

declare const SITE_ASSETS: Record<string, [mime: string, base64: string]>
type Env = { GEMINI_API_KEY?: string; GEMINI_MODEL?: string }

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/tutor') return tutor(request, env)
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 })
    const asset = SITE_ASSETS[pathname === '/' ? '/index.html' : pathname]
    if (!Array.isArray(asset)) return new Response(null, { status: 404 })
    const [mime, base64] = asset
    const headers = { 'Content-Type': mime, 'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff' }
    return new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(base64), char => char.charCodeAt(0)), { headers })
  },
}
