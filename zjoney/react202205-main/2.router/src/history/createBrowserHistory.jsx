
function createBrowserHistory() {
  const globalHistory = window.history;
  let state;
  let listeners = [];
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(item => item !== listener);
    }
  }
  /**
   * 添加或者说跳转新的路径
   * @param {*} pathname 可以传字符串，也可以传对象  
   * @param {*} nextState 
   * push('/a',{name:'a'}) push({pathname:'/a',state:{name:'a'}});
   */
  function push(pathname, nextState) {
    const action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    globalHistory.pushState(state, null, pathname);
    let location = { state, pathname };
    notify({ action, location });
  }
  function notify(newState) {
    listeners.forEach(listener => listener(newState));
  }
  window.addEventListener('popstate', () => {
    let location = { pathname: window.location.pathname, state: window.location.state };
    notify({ action: 'POP', location });
  });
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    globalHistory.back();
  }
  function goForward() {
    globalHistory.forward();
  }
  const history = {
    action: 'POP',
    location: { pathname: window.location.pathname, state: window.location.state },
    go,
    goBack,
    goForward,
    push,
    listen
  }
  window.his = history;
  return history;
}
export default createBrowserHistory;