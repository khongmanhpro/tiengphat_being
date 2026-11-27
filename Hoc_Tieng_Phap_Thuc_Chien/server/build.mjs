import { cp, mkdir, readFile, readdir } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'
import { build } from 'esbuild'

const client = resolve('dist/client')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}
const assets = Object.create(null)
for (const path of await readdir(client, { recursive: true, withFileTypes: true })) {
  if (!path.isFile()) continue
  const file = resolve(path.parentPath, path.name)
  const webPath = '/' + relative(client, file).replaceAll('\\', '/')
  assets[webPath] = [types[extname(file)] ?? 'application/octet-stream', (await readFile(file)).toString('base64')]
}

await build({
  entryPoints: ['server/worker.ts'],
  outfile: 'dist/server/index.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  define: { SITE_ASSETS: JSON.stringify(assets) },
  minify: true,
})
await mkdir('dist/.openai', { recursive: true })
await cp('.openai/hosting.json', 'dist/.openai/hosting.json')
