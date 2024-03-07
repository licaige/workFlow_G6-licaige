import { ADD1, MINUS1 } from '../action-types';
function add1() {//actionCreator 它是一个创建action的函数
 
  return { type: ADD1 };
}
function minus1() {//actionCreator 它是一个创建action的函数
  return { type: MINUS1 };
}
function thunkAdd() {
  return function (getState, dispatch) {
    setTimeout(() => {
     
      dispatch(function (getState, dispatch) {
        setTimeout(() => {
       
          dispatch({ type: ADD1 });
        }, 1000);
      });
    }, 1000);
  }
}
function promiseAdd() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ type: ADD1 });
    }, 1000);
  });
}
const actionCreators = { add1, minus1, thunkAdd, promiseAdd };
export default actionCreators;