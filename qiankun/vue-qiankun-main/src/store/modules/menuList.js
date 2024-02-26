/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-10 18:15:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-30 18:11:13
 */

const data = () => ({
  menu: [],
})

// getters
const getters = {
  getMenus(state) {
    return state.menu
  },
}

// mutations
const mutations = {
  insertMenu(state, item) {
    state.menu.push(item)
  },
}

// actions
const actions = {
  invokeMicroRoute({ commit }, item) {
    const tabs = JSON.parse(localStorage.getItem('tabs')) || []
    const index = tabs.findIndex((obj) => obj.path === item.path)
    if (index >= 0) {
      tabs.splice(index, 1, item)
    } else {
      tabs.push(item)
    }
    commit('insertMenu', item)
    localStorage.setItem('tabs', JSON.stringify(tabs))
  },
}

export default {
  namespaced: true,
  state: data,
  actions,
  getters,
  mutations,
}
