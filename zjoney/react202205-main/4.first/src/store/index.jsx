import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers';
import { routerMiddleware, createReduxHistory } from './history';
export const store = applyMiddleware(routerMiddleware)(createStore)(combinedReducers);
export const history = createReduxHistory(store)//reduxHistory
//此history我们称为redux版本的history 因为原始的history 操作的可能是window.history, 也可能是hash,但是它操作是store
window.store = store;