import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
      token: hasToken ? useStore().state.user.token : '',
      'x-requested-with': 'XMLHttpRequest',
    },
  }
  return new HttpClient(config)
}

export default https
