import { createStore, applyMiddleware } from '../redux';
import combinedReducer from './reducers';
import promise from './redux-promise';
import thunk from './redux-thunk';
import logger from './redux-logger';
const store = applyMiddleware(thunk, promise, logger)(createStore)(combinedReducer);

//实现异步操作
/*
let store = createStore(combinedReducer);
const oldDispatch = store.dispatch;
 store.dispatch = function (action) {
    setTimeout(() => {
        oldDispatch(action);
    }, 1000);
    return action;
} */
//还可以实现打印日志
/* store.dispatch = function (action) {
    console.log('prev stat', store.getState());
    oldDispatch(action);
    console.log('next state', store.getState());
} */
export default store;