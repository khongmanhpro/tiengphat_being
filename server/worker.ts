import { tutor } from './tutor'
import type { TutorEnvironment } from './tutor'

declare const SITE_ASSETS: Record<string, [mime: string, base64: string]>
type Env = TutorEnvironment & { TUTOR_DEV_LOCAL?: string }

export default {
  async fetch(request: Request, env: Env) {
    const { pathname, hostname } = new URL(request.url)
    if (pathname === '/api/tutor') {
      const local = env.TUTOR_DEV_LOCAL === '1' && ['localhost', '127.0.0.1', '[::1]'].includes(hostname)
      return tutor(request, env, !local)
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 })
    const asset = SITE_ASSETS[pathname === '/' ? '/index.html' : pathname]
    if (!Array.isArray(asset)) return new Response(null, { status: 404 })
    const [mime, base64] = asset
    const headers = { 'Content-Type': mime, 'Cache-Control': (pathname.startsWith('/assets/') || pathname.startsWith('/voice/')) ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff' }
    return new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(base64), char => char.charCodeAt(0)), { headers })
  },
}
