import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from '../redux-first-history';
const history = createBrowserHistory();
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history })
export {
  routerReducer,//处理器，把浏览器的路径同步到仓库状态中，就是使用这个routerReducer把路径存放到仓库里的
  routerMiddleware,//通过派发动作的方式跳转路径，就是通过这个routerMiddleware跳转路径的
  createReduxHistory //创建redux版本的history对象
} 
