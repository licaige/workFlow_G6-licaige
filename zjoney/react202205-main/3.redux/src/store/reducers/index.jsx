import { combineReducers } from "../../redux";
import counter1 from './counter1';
import counter2 from './counter2';
let combinedReducer = combineReducers({
  counter1,
  counter2
});
//每个reducer都对应一个状态对象
//counter1 => {number:0}
//counter2 => {number:0}
//combinedReducer = 
//combinedState =  {counter1:{number:0},counter2:{number:0}};
export default combinedReducer;