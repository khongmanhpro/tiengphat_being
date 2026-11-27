/// <reference types="vitest/config" />
import { Readable } from 'node:stream'
import { defineConfig, loadEnv } from 'vite'
import type { Connect } from 'vite'
import { tutor } from './server/tutor'

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ['TUTOR_', 'GEMINI_']), ...process.env }
  const handleTutor: Connect.NextHandleFunction = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/tutor') return next()
    try {
      const url = new URL(req.url, `http://${req.headers.host}`)
      const request = new Request(url, {
        method: req.method,
        headers: req.headers as Record<string, string>,
        ...(req.method === 'POST' ? { body: Readable.toWeb(req) as unknown as ReadableStream, duplex: 'half' } : {}),
      })
      const result = await tutor(request, env)
      res.statusCode = result.status
      result.headers.forEach((value, name) => res.setHeader(name, value))
      res.end(await result.text())
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Máy chủ gia sư chưa phản hồi.' }))
    }
  }
  return {
    build: { outDir: 'dist/client', emptyOutDir: true },
    resolve: { dedupe: ['react', 'react-dom'] },
    plugins: [{
      name: 'french-tutor',
      configureServer(server) { server.middlewares.use(handleTutor) },
      configurePreviewServer(server) { server.middlewares.use(handleTutor) },
    }],
    test: { environment: 'node' },
  }
})
