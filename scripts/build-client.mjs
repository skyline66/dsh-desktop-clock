import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))

const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/client.jsx'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome120'],
  external: ['react'],
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  legalComments: 'none',
  minify: false,
  write: false,
  logLevel: 'info',
})

const body = result.outputFiles[0].text.trimEnd()
const banner = `/* Bundled from src/client.jsx by scripts/build-client.mjs. Do not edit by hand. */`
const wrapped = `${banner}
window.__ModuleLoader__.load({
  id: ${JSON.stringify(packageJson.name)},
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
${body}
    return module.exports;
  },
});
`
await writeFile(resolve(root, 'client.js'), wrapped)
console.log(`wrote client.js (${Buffer.byteLength(wrapped)} bytes)`)
