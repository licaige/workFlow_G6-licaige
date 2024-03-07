import { combineReducers } from 'redux';
import counter from './counter';
import { routerReducer } from '../history';
const reducers = {
  counter,
  router: routerReducer
}
export default combineReducers(reducers);