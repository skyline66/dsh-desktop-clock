import { readFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const required = [
  'index.js',
  'client.js',
  'cordis.patch.yml',
  'icon.svg',
  'locale/en.json',
  'locale/zh.json',
]

const failures = []
for (const file of required) {
  try {
    const info = await stat(resolve(root, file))
    if (!info.isFile() || info.size === 0) failures.push(`${file} is empty`)
  } catch {
    failures.push(`${file} is missing`)
  }
}

if (packageJson.dsh?.bundle?.patch !== './cordis.patch.yml') {
  failures.push('package.json must declare dsh.bundle.patch')
}
if (packageJson.dsh?.client?.platform !== 'web') {
  failures.push('package.json must declare dsh.client.platform = web')
}
if (!packageJson.exports?.['./client']) {
  failures.push('package.json must export ./client')
}
if (!packageJson.exports?.['./icon']) {
  failures.push('package.json must export ./icon')
}
if (!packageJson.files?.includes('client.js')) {
  failures.push('package.json files must include client.js')
}

const client = await readFile(resolve(root, 'client.js'), 'utf8')
if (!client.includes(`id: ${JSON.stringify(packageJson.name)}`)) {
  failures.push('client.js does not register the package id')
}
if (!client.includes('window.__ModuleLoader__.load')) {
  failures.push('client.js does not use the DSH module loader')
}

const patch = await readFile(resolve(root, 'cordis.patch.yml'), 'utf8')
if (!patch.includes(`name: ${packageJson.name}`)) {
  failures.push('cordis.patch.yml does not name the package')
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('plugin package checks passed')
