/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-14 23:45:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 11:32:13
 */
const tabsHook = {
  setItem(arr) {
    localStorage.setItem('tabs', JSON.stringify(arr))
  },
  getItem() {
    return JSON.parse(localStorage.getItem('tabs') || '[]')
  },
}
export default tabsHook
