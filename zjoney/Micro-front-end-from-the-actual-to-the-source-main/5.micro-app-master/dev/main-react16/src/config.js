
let config = {
  react16: 'http://localhost:3001/',
  react17: 'http://localhost:3002/',
  vue2: 'http://localhost:4001/',
  vue3: 'http://localhost:4002/',
  angular11: 'http://localhost:6001/',
  vite: 'http://localhost:7001/',
}
const isEnvPro = process.env.NODE_ENV === 'production'

if (isEnvPro) {
  const locationOrigin = `${location.origin}/`
  config = {
    react16: locationOrigin,
    react17: locationOrigin,
    vue2: locationOrigin,
    vue3: locationOrigin,
    angular11: locationOrigin,
    vite: locationOrigin,
  }
}

export default config
