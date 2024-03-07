import { ADD2, MINUS2 } from '../action-types';
function add2() {//actionCreator 它是一个创建action的函数
  return { type: ADD2 };
}
function minus2() {//actionCreator 它是一个创建action的函数
  return { type: MINUS2 };
}
const actionCreators = { add2, minus2 };
export default actionCreators;