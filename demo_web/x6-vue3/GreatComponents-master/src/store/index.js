import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CREATE: 0b0001,
    DELETE: 0b0010,
    MODIFY: 0b0100,
    READONLY: 0b1000,
    roles: null,
  },
  mutations: {
    // 获取用户权限：按位或
    getUserRole(state, payload = ['CREATE', 'MODIFY', 'READONLY']) {
      let roles = 0b000
      for(let i = 0; i < payload.length; i++) {
        roles = roles | state[payload[i]]
      }
      state.roles = roles
    },
    delRole(state, payload = 'DELETE') {
      state.roles = state.roles - state[payload]
    },
  },
  actions: {
    // 校验用户权限：按位与
    hasRole({state}, payload = 'DELETE') {
      return (state.roles & state[payload]) === state[payload]
    },
    // 删除用户权限
    async delRole({commit, dispatch}, payload = 'DELETE') {
      let k = await dispatch('hasRole', payload)
      console.log(k)
      k && commit('delRole', payload)
    }
  },
  modules: {
  }
})

// 简化版
const state = {
  CREATE: 0b0001,
  DELETE: 0b0010,
  MODIFY: 0b0100,
  READONLY: 0b1000,
  roles: null,
}
function getUserRole(payload = ['CREATE', 'MODIFY', 'READONLY']) {
  let roles = 0b000
  for(let i = 0; i < payload.length; i++) {
    roles = roles | state[payload[i]]
  }
  state.roles = roles
}
function hasRole(payload = 'DELETE') {
  return (state.roles & state[payload]) === state[payload]
}
function delRole(payload = 'DELETE') {
  if (hasRole(payload)) {
    state.roles = state.roles - state[payload]
  }
}
function addRole(payload = 'DELETE') {
  if (!hasRole(payload)) {
    state.roles = state.roles + state[payload]
  }
}
getUserRole()
console.log(state.roles.toString(2)) // 1101
console.log(hasRole()) // false
delRole()
console.log(hasRole()) // false
console.log(state.roles.toString(2)) // 1101
addRole()
console.log(hasRole()) // true
console.log(state.roles.toString(2)) // 1111
addRole()
console.log(state.roles.toString(2)) // 1111