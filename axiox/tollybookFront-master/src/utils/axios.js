import axios from 'axios';
import {Toast} from 'zarm';

const MODE = import.meta.env.MODE; // 环境变量

axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://127.0.0.1:7001/'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = `${localStorage.getItem('token')}` || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if(typeof res.data !== 'object') {
        Toast.show('服务端异常！')
        return Promise.reject(res)
    }
    if(res.data.code !== 200) {
        if(res.data.msg) Toast.show(res.data.msg)
        if(res.data.code === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(res)
    }
    return res.data
})

export default axios;