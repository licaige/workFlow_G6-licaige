
function createHashHistory() {
  let routerStack = [];//历史栈
  let index = -1;//栈顶指针
  let action = 'POP';
  let state = {};
  let listeners = [];
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(item => item !== listener);
    }
  }
  function go(n) {
    action = 'POP';
    index += n;
    if (index >= 0 && index < routerStack.length) {
      let nextLocation = stack[index];
      state = nextLocation.state;
      window.location.hash = nextLocation.pathname;
    }
  }
  function goBack() {
    go(-1)
  }
  function goForward() {
    go(1)
  }
  function push(pathname, nextState) {
    action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
  window.addEventListener('hashchange', hashChangeHandler);
  function hashChangeHandler() {
    const pathname = window.location.hash.slice(1);
    Object.assign(history, { action, location: { pathname, state } });
    if (action === 'PUSH') {
      routerStack[++index] = history.location;
    }
    listeners.forEach(listener => listener({ action, location: history.location }));
  }
  const history = {
    action: 'POP',
    location: {
      pathname: window.location.hash ? window.location.hash.slice(1) : '/',
      state
    },
    go,
    goBack,
    goForward,
    push,
    listen
  }
  if (window.location.hash) {
    action = 'PUSH';
    hashChangeHandler();
  } else {
    window.location.hash = '/'
  }
  return history;
}
export default createHashHistory;