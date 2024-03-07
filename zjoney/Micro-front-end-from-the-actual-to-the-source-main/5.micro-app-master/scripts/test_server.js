const liveServer = require('live-server')
const path = require('path')

const params = {
  port: 9000,
  root: path.join(process.cwd(), '/src/__tests__/demos'),
  open: false,
  file: 'index.html',
  wait: 1000,
  logLevel: 0,
  quiet: true,
  cors: true,
}

if (process.argv[2] === '--start') {
  liveServer.start(params)
}

module.exports = liveServer
module.exports.params = params
