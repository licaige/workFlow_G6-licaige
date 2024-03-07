import compose from './compose';
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);
      let dispatch;//此变量会指向新的dispatch方法 newDispatch
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      };
      let chain = middlewares.map(middleware => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch
      }
    }
  }
}
export default applyMiddleware;