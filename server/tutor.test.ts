import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { lessons } from '../src/data'
import { tutor, withinRateLimit } from './tutor'
import type { TutorEnvironment } from './tutor'

const env: TutorEnvironment = { TUTOR_OPENAI_API_KEY: 'test-key' }

function okUpstream(reply = { reply: 'Bonjour !', correction: '', hint: 'Dis bonjour.' }) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(reply) }] }] }),
  } as Response
}

function makeRequest(userId: string) {
  return new Request('http://localhost/api/tutor', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(userId ? { 'oai-authenticated-user-id': userId } : {}) },
    body: JSON.stringify({ mode: 'role', lessonId: lessons[0].id, level: 'A1', text: 'Bonjour', history: [] }),
  })
}

describe('tutor() rate limiting', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn().mockResolvedValue(okUpstream())) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('allows up to the per-minute limit, then returns a 429 in the existing error shape', async () => {
    const userId = `minute-${Math.random()}`
    for (let i = 0; i < 8; i++) expect((await tutor(makeRequest(userId), env)).status).toBe(200)
    const limited = await tutor(makeRequest(userId), env)
    expect(limited.status).toBe(429)
    const body = await limited.json()
    expect(typeof body.error).toBe('string')
    expect(body.error.length).toBeGreaterThan(0)
  })

  it('tracks each authenticated user id independently', async () => {
    const a = `user-a-${Math.random()}`
    const b = `user-b-${Math.random()}`
    for (let i = 0; i < 8; i++) await tutor(makeRequest(a), env)
    expect((await tutor(makeRequest(a), env)).status).toBe(429)
    expect((await tutor(makeRequest(b), env)).status).toBe(200)
  })

  it('does not rate-limit requests with no authenticated user id', async () => {
    for (let i = 0; i < 20; i++) expect((await tutor(makeRequest(''), env)).status).toBe(200)
  })
})

describe('withinRateLimit()', () => {
  it('blocks once the per-minute limit is hit, then allows again after the window passes', () => {
    const id = `unit-minute-${Math.random()}`
    const start = Date.now()
    for (let i = 0; i < 8; i++) expect(withinRateLimit(id, start)).toBe(true)
    expect(withinRateLimit(id, start)).toBe(false)
    expect(withinRateLimit(id, start + 61_000)).toBe(true)
  })

  it('enforces the daily cap across many one-minute windows', () => {
    const id = `unit-day-${Math.random()}`
    let now = Date.now()
    let allowed = 0
    for (let minute = 0; minute < 20; minute++) {
      now += 61_000
      for (let i = 0; i < 8; i++) if (withinRateLimit(id, now)) allowed++
    }
    expect(allowed).toBe(60)
  })
})
