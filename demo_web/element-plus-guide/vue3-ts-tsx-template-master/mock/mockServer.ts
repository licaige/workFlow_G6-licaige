module.exports = function (req, res, next) {
  const method = (req.method || 'GET').toLowerCase()
  const url = req.url.split('?')[0]

  if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    const base = `./${method}${url}/index.ts`
    delete require.cache[require.resolve(base)]
    const json = require(base)()
    res.send(json)
  }
  next()
}
