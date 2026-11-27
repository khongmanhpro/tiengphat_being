import { useEffect, useRef } from 'react'
import { lessonsById, levels } from './data'
import type { Level } from './data'
import { unlocked } from './progress'
import type { Progress } from './progress'

export type Page = 'home' | 'roadmap' | 'review' | 'tutor' | 'profile' | 'lesson' | 'placement' | 'assessment'
const pages: Page[] = ['home', 'roadmap', 'review', 'tutor', 'profile', 'lesson', 'placement', 'assessment']

export type Route = { page: Page; level: Level; lessonId: string }

function parse(hash: string): { page?: Page; level?: Level; lessonId?: string } {
  // An empty hash (no `#` at all, e.g. the very first-ever load) is "unspecified" — the
  // caller's fallback decides. `#` / `#/` is this router's own explicit home marker
  // (written by `formatHash` below) and must resolve to 'home' regardless of fallback,
  // or going back to that history entry would keep showing the previous page.
  if (!hash) return {}
  const [rawPage, extra] = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (!rawPage) return { page: 'home' }
  const page = pages.find(item => item === rawPage)
  if (!page) return {}
  if (page === 'lesson') return extra ? { page, lessonId: extra } : {}
  if (page === 'roadmap' || page === 'assessment') {
    const level = levels.find(item => item === extra)
    return level ? { page, level } : { page }
  }
  return { page }
}

/**
 * Resolves `location.hash` into a full route, falling back to `fallback` for anything
 * absent or invalid — an unknown page, an unknown level, or a lesson id that doesn't
 * exist or isn't unlocked yet — so a stale or hand-edited URL never breaks the app.
 */
export function routeFromHash(hash: string, data: Progress, fallback: Route): Route {
  const parsed = parse(hash)
  if (parsed.page === 'lesson') {
    const lesson = parsed.lessonId ? lessonsById[parsed.lessonId] : undefined
    return lesson && unlocked(data, lesson) ? { page: 'lesson', level: lesson.level, lessonId: lesson.id } : fallback
  }
  return { page: parsed.page ?? fallback.page, level: parsed.level ?? fallback.level, lessonId: fallback.lessonId }
}

function formatHash({ page, level, lessonId }: Route): string {
  if (page === 'lesson') return `#/lesson/${lessonId}`
  if (page === 'roadmap' || page === 'assessment') return `#/${page}/${level}`
  return page === 'home' ? '#/' : `#/${page}`
}

/**
 * Keeps `location.hash` in sync with `route`: pushes a history entry whenever page/level/
 * lesson changes (so links are shareable), and applies browser back/forward onto the app's
 * own state via `onNavigate` — the component tree below each page is untouched.
 */
export function useHashRoute(route: Route, data: Progress, onNavigate: (route: Route) => void) {
  useEffect(() => {
    // Back/forward through two hash-only history entries fires both events; typing or
    // pasting a new `#/...` URL into the address bar while the app is already open fires
    // only `hashchange` (same-document navigation, no `popstate`) — listen for both.
    function onHashChange() {
      const resolved = routeFromHash(window.location.hash, data, route)
      // When an invalid hash resolves back to the unchanged route (e.g. a stale lesson id
      // while already on that lesson), `onNavigate` below is a no-op re-render, so correct
      // the address bar here directly instead of relying on the other effect to notice.
      const hash = formatHash(resolved)
      if (hash !== window.location.hash) window.history.replaceState(null, '', hash)
      onNavigate(resolved)
    }
    window.addEventListener('popstate', onHashChange)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('popstate', onHashChange)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [route.page, route.level, route.lessonId, data, onNavigate])

  const mounted = useRef(false)
  useEffect(() => {
    const hash = formatHash(route)
    if (hash !== window.location.hash) {
      if (mounted.current) window.history.pushState(null, '', hash)
      else window.history.replaceState(null, '', hash)
    }
    mounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.page, route.level, route.lessonId])
}
