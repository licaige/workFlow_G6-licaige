import axios from 'axios';
import makeRequest, { compose } from '../request';
import retryAdapter from '../request/adapter/retry-adapter';

export default {
  getDelayWithRetry: makeRequest({
    url: '/delay',
    desc: '延时请求测试',
    timeout: 1000,
    retry: true,
    adapter: retryAdapter(axios.defaults.adapter!),
  }),

  get500Error: makeRequest({
    url: '/500-error',
    desc: '500请求测试',
    retry: true,
    adapter: retryAdapter(axios.defaults.adapter!),
  }),
};
