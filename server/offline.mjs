import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'

const client = resolve('dist/client')
const output = resolve(process.argv[2] || 'dist/offline/Mo_Hoc_Tieng_Phap.html')
const types = { '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg' }
const read = path => readFile(join(client, path))
const asset = async path => {
  const type = types[extname(path)]
  if (!type) throw new Error(`Unsupported offline asset: ${path}`)
  return `data:${type};base64,${(await read(path)).toString('base64')}`
}

let html = (await read('index.html')).toString()
const script = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
const stylesheet = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
const icon = html.match(/<link rel="icon" href="([^"]+)"[^>]*>/)
if (!script || !stylesheet || !icon) throw new Error('Run npm run build before creating the offline file.')

const [js, css, favicon] = await Promise.all([read(script[1]), read(stylesheet[1]), asset(icon[1])])
let scriptText = js.toString()
const voices = [...new Set([...scriptText.matchAll(/\/voice\/[0-9a-f]+\.mp3/g)].map(match => match[0]))]
for (const path of voices) scriptText = scriptText.replaceAll(path, await asset(path))

let styles = css.toString()
const embedded = [...new Set([...styles.matchAll(/url\(\s*["']?(\/[^"'\s)]+)["']?\s*\)/g)].map(match => match[1]))]
for (const path of embedded) {
  const data = await asset(path)
  styles = styles.replaceAll(path, data)
}
html = html.replace(script[0], '')
  .replace(stylesheet[0], () => `<style>${styles}</style>`)
  .replace(icon[0], () => icon[0].replace(icon[1], favicon))
  .replace('</body>', () => `<script>${scriptText.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`)

await mkdir(dirname(output), { recursive: true })
await writeFile(output, html)
console.log(output)
