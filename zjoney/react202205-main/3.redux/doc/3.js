function compose(...funcs) {
  return function (args) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      args = funcs[i](args);
    }
    return args;
  }
}

let promise = next => action => {
  console.log('promise');
  next(action);
}
let thunk = next => action => {
  console.log('thunk');
  next(action);
}
let logger = next => action => {
  console.log('logger');
  next(action);
}
//组件是从右向左的组合的
//调用的时候从左向右的
const composed = compose(promise, thunk, logger);
const dispatch = (action) => {
  console.log('这是原始的dispatch方法', action);
}
const newDispatch = composed(dispatch);
newDispatch({ type: 'ADD' });//用的也是和koa 相同的洋葱模型