// npm i --D node-html-parser url-regex
const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')
const { glob } = require('glob')
const urlRegex = require('url-regex')

const urlPattern = /(https?:\/\/[^/]*)/i
const urls = new Set()

async function searchDomain() {
  const files = await glob('dist/**/*.{html,css,js}')
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8')
    const matches = source.match(urlRegex({ strict: true }))
    if (matches) {
      matches.forEach(url => {
        const match = url.match(urlPattern)
        if (match && match[1]) {
          urls.add(match[1])
        }
      })
    }
  }
}

async function insertLinks() {
  const files = await glob('dist/**/*.html')
  const links = [...urls]
    .map(url => `<link rel="dns-prefetch" href="${url}" />`)
    .join('\n')
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8')
    const root = parse(html)
    const head = root.querySelector('head')
    head.insertAdjacentHTML('afterbegin', links)
    fs.writeFileSync(file, root.toString())
  }
}

async function main() {
  await searchDomain()
  await insertLinks()
}

main()

// package.json scripts
// "build": "vue-cli-service build && node ./dns-prefetch.js"