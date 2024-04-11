const https = require('https')
const fs = require('fs')
const url = require('url')
const path = require('path')

const PORT = 9091

const options = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')
}
const httpsServer = https.createServer(options)


const mime = {
  map: {
    'html': 'text/html',
    'xhtml': 'application/xhtml+xml',
    'xml': 'text/xml',
    'js': 'application/javascript',
    'wasm': 'application/wasm',
    'map': 'magnus-internal/imagemap',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'ico': 'image/vnd.microsoft.icon'
  },
  getType: function (ext) {
    let conType = this.map[ext]
    return conType || 'text/plain'
  }
}
httpsServer.on('request', (req, res) => {
  console.log(`[receive request] ${req.method} ${req.url}`)

  const urlJson = url.parse(req.url)
  let { pathname } = urlJson
  if (pathname === '/') pathname += 'index.html'
  let ext = pathname.split('.').pop()
  
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')

  let contentType = mime.getType(ext)
  res.setHeader('Content-Type', contentType)

  fs.readFile(path.resolve(__dirname, pathname.substr(1)), (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Not found.')
    } else {
      res.writeHead(200)
      res.end(data)
    }
  })
})

.listen(PORT)
console.log(`Https server running at https://localhost:${PORT}`)
