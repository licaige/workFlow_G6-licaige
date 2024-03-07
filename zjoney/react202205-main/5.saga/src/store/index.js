import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import rootSaga from './sagas';
import createSagaMiddleware from '../redux-saga';
const sagaMiddleware = createSagaMiddleware();
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
//调用run方法启动rootSaga
sagaMiddleware.run(rootSaga);
export default store;