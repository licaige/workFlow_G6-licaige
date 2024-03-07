import * as effectTypes from './effectTypes';
export function take(actionType) {
  return { type: effectTypes.TAKE, actionType };//actionType=ASYNC_ADD
}
export function put(action) {
  return { type: effectTypes.PUT, action };
}
export function fork(saga) {
  return { type: effectTypes.FORK, saga };
}
export function takeEvery(actionType, saga) {
  function* takeEveryHelper() {
    while (true) {
      yield take(actionType);//等待有人向仓库派发此动作
      yield fork(saga);//再开始一个新的子进程运行此saga
    }
  }
  //开始一个新的子进程，运行takeEveryHelper
  return fork(takeEveryHelper);
}

export function call(fn, ...args) {
  return { type: effectTypes.CALL, fn, args }
}
export function cps(fn, ...args) {
  return { type: effectTypes.CPS, fn, args };
}
export function all(iterators) {
  return { type: effectTypes.ALL, iterators };
}
export function cancel(task) {
  return { type: effectTypes.CANCEL, task }
}
const delayFn = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function delay(...args) {
  return call(delayFn, ...args);
}