//调用历史对象的方法
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
//路径发生变化
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
//实现如何使用first跳转路径

function locationChangeAction(location, action) {
  return {
    type: LOCATION_CHANGE,
    payload: { action, location }
  }
}

function push(...args) {// args=['/counter']
  return {
    type: CALL_HISTORY_METHOD,
    payload: { method: 'push', args } //args=['/counter']
  }
}
export {
  push,
  locationChangeAction
}
