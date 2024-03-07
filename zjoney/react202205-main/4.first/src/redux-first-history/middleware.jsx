import { CALL_HISTORY_METHOD } from './actions';
export function createRouterMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {//此函数就是我们改造后的新的dispatch
        if (action.type === CALL_HISTORY_METHOD) {
          const { method, args } = action.payload;
          history[method](...args);//history.push('/counter');
          // history[action.payload.method](...action.payload.args)
        } else {
          return next(action);
        }
      }
    }
  }
}