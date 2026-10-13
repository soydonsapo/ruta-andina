import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = path.join(projectRoot, 'dist')
const docsDirectory = path.join(projectRoot, 'docs')
const indexPath = path.join(distDirectory, 'index.html')

if (!existsSync(indexPath)) {
  throw new Error('Production build is missing dist/index.html; run the build before syncing Pages.')
}

const indexHtml = readFileSync(indexPath, 'utf8')
const assetReferences = [...indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map(([, reference]) => reference)
  .filter((reference) => reference.startsWith('/ruta-andina/'))
  .map((reference) => reference.slice('/ruta-andina/'.length))

for (const reference of assetReferences) {
  if (!existsSync(path.join(distDirectory, reference))) {
    throw new Error(`Production build references a missing asset: ${reference}`)
  }
}

mkdirSync(docsDirectory, { recursive: true })
cpSync(distDirectory, docsDirectory, { recursive: true, force: true })

const distAssets = new Set(readdirSync(path.join(distDirectory, 'assets')))
const docsAssetsDirectory = path.join(docsDirectory, 'assets')

for (const filename of distAssets) {
  if (/^index-[\w-]+\.js$/.test(filename)) {
    const bundlePath = path.join(docsAssetsDirectory, filename)
    const bundle = readFileSync(bundlePath, 'utf8')
    writeFileSync(bundlePath, bundle.replace(/[ \t]+$/gm, ''))
  }
}

for (const filename of readdirSync(docsAssetsDirectory)) {
  if (!distAssets.has(filename)) {
    rmSync(path.join(docsAssetsDirectory, filename))
  }
}

for (const reference of assetReferences) {
  if (!existsSync(path.join(docsDirectory, reference))) {
    throw new Error(`Synced Pages output is missing a referenced asset: ${reference}`)
  }
}

console.log(`Synced ${assetReferences.length} referenced assets from dist/ to docs/.`)
