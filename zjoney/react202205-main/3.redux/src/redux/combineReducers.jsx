
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    for (let key in reducers) {
      let prevStateForKey = state[key];//获取此key对应的老的分状态
      let reducerForKey = reducers[key];//获取此key对应的reducer 或者说处理器
      let nextStateForKey = reducerForKey(prevStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}
export default combineReducers;