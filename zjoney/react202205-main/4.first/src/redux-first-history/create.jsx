import { createRouterMiddleware } from './middleware';
import { locationChangeAction } from './actions';
import { createRouterReducer } from './reducer';
import { push } from './actions';
export function createReduxHistoryContext({ history }) {
  const routerMiddleware = createRouterMiddleware(history);
  const routerReducer = createRouterReducer(history);
  //返回redux版本的history
  function createReduxHistory(store) {
    //在初始化的时候先把初始的路径和动作派发给仓库，让仓库同步到自己的状态对象中
    store.dispatch(locationChangeAction(history.location, history.action));
    //监听路径变化事件，当路径发生改变后再次派发新的动作和路径 
    history.listen(({ location, action }) => {
      store.dispatch(locationChangeAction(location, action));
    });
    return {
      createHref: history.createHref,
      push: (...args) => store.dispatch(push(...args)),//history.push('/counter');
      listen: history.listen,
      get location() {//原来获取路径是从history对象上取的，现在是从仓库中取
        return store.getState().router.location;
      },
      get action() {
        return store.getState().router.action;
      }
    };
  }
  return {
    routerMiddleware,
    createReduxHistory,
    routerReducer
  }
}