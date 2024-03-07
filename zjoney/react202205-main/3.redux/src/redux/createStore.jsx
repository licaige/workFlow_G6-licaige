

function createStore(reducer) {
  let state;
  const listeners = [];
  function getState() {
    return state;
  }
  /**
   * 向仓库派发一个动作，会调用reducer,根据老状态和新动作计算新状态
   * @param {*} action 
   */
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(l => l());
  }
  /**
   * 订阅状态变化事件，当状态发生改变后执行所有的监听函数
   * @param {*} listener 
   * @returns 
   */
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }
  dispatch({ type: '@@REDUX/INIT' });
  return {
    getState,
    subscribe,
    dispatch
  }
}

export default createStore;