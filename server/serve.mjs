import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { Readable } from 'node:stream'
import process from 'node:process'
import worker from '../dist/server/index.js'

if (existsSync('.env')) process.loadEnvFile()
const port = Number(process.env.PORT || '4173')

const server = createServer(async (incoming, outgoing) => {
  try {
    const request = new Request(new URL(incoming.url || '/', `http://${incoming.headers.host}`), {
      method: incoming.method,
      headers: incoming.headers,
      ...(['GET', 'HEAD'].includes(incoming.method) ? {} : { body: Readable.toWeb(incoming), duplex: 'half' }),
    })
    const response = await worker.fetch(request, { ...process.env, TUTOR_DEV_LOCAL: '1' })
    outgoing.writeHead(response.status, Object.fromEntries(response.headers))
    outgoing.end(Buffer.from(await response.arrayBuffer()))
  } catch {
    if (!outgoing.headersSent) outgoing.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    outgoing.end('Máy chủ chưa xử lý được yêu cầu.')
  }
})

server.listen(port, '127.0.0.1', () => console.log(`Học Tiếng Pháp Thực Chiến: http://localhost:${port}`))
