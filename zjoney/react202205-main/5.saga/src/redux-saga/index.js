import EventEmitter from 'events'
import runSaga from './runSaga';
function createSagaMiddleware() {
  const channel = new EventEmitter();//事件发射器
  let boundRunSaga;
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { channel, dispatch, getState });
    return function (next) {//next=原生的store.dispatch
      return function (action) {//这个方法就是派发动作的方法
        //next表示调用下一个中间件，我这个地方我是想知道派发哪些动作，我并不想拦截原来的派发逻辑
        const result = next(action);
        //发射一个事件，事件的动作类型是action.type
        channel.emit(action.type, action);
        return result;
      }
    }
  }
  sagaMiddleware.run = (saga) => boundRunSaga(saga)
  return sagaMiddleware;
}
export default createSagaMiddleware;