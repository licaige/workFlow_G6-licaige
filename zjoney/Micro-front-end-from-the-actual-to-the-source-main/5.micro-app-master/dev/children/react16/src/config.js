
let config = {
  react16: 'http://localhost:3001/',
  react17: 'http://localhost:3002/',
  vue2: 'http://localhost:4001/',
  vue3: 'http://localhost:4002/',
  angular11: 'http://localhost:6001/',
}
const isEnvPro = process.env.NODE_ENV === 'production'

if (isEnvPro) {
  const baseUrl = `${window.location.origin}/`
  config = {
    react16: baseUrl,
    react17: baseUrl,
    vue2: baseUrl,
    vue3: baseUrl,
    angular11: baseUrl,
  }
}

export default config
