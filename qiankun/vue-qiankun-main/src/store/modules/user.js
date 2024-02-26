/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-10 18:15:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-29 15:04:34
 */
import { loginApi, getInfoApi, loginOutApi } from '@/api/user'

const data = () => ({
  token: '', // 登录token
  info: {
    avatar: 'https://img.caibeitv.com//caibeitv/upload/image/avatar/2016112/8214621/557d990/63841f6/9723bdbb80472d2b77bfe.jpg',
    channelDescription: null,
    email: 'chunwen.zou@caibeitv.com',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM4NDI2NjQwNTU0NGU5NWViNWExNGQiLCJpYXQiOjE2NDc5MzU5MjUsImV4cCI6MTY1MDUyNzkyNX0.Kg9H0L5hIhZZ7zNMqxtbUXA8P4AoOpAZXFfyYdZmWiY',
    username: '邹春文',
    age: 80,
  }, // 用户信息
})

// getters
const getters = {
  token(state) {
    return state.token
  },
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  infoChange(state, info) {
    state.info = info
  },
  addAge(state) {
    state.info.age += 1
  },
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      loginApi(params)
        .then((res) => {
          commit('tokenChange', res.data.token)
          dispatch('getInfo', { token: res.data.token }).then(() => {
            resolve(res.data.token)
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // get user info after user logined
  getInfo({ commit }, params) {
    return new Promise((resolve) => {
      getInfoApi(params).then((res) => {
        commit('infoChange', res.data.info)
        resolve(res.data.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut() {
    loginOutApi()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('tabs')
        localStorage.removeItem('vuex')
        window.location.reload()
      })
  },
}

export default {
  namespaced: true,
  state: data,
  actions,
  getters,
  mutations,
}
