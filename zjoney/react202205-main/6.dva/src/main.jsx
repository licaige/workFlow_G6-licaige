import React from 'react';
import dva, { connect } from './dva';
import { Link, Routes, Route, push } from './dva/router'
import createLogger from 'redux-logger';
console.log(createLogger);
//history：指定给路由用的 history，默认是 hashHistory
const app = dva({
  //history: createHashHistory(),
  onAction: [createLogger]
});
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
app.model({//model本质上就是用来简化reducer定义的
  namespace: 'counter1',//每个model都会有一个自己的命名空间
  state: { number: 0 },//每个model都会有一个自己的分状态
  reducers: {
    add(state) {//add=>counter1/add
      return { number: state.number + 1 };
    }
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000);
      //Warning: [sagaEffects.put] counter1/add should not be prefixed with namespace counter1
      yield put({ type: 'add' })
    },
    *goto(action, { put }) {
      yield put(push('/counter2'));
    }
  }
});
app.model({
  namespace: 'counter2',//每个model都会有一个自己的命名空间
  state: { number: 0 },//每个model都会有一个自己的分状态
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    }
  }
});
function Counter1(props) {
  const { number, add, asyncAdd, goto } = props;
  return (
    <div>
      <p>{number}</p>
      <button onClick={add}>+</button>
      <button onClick={asyncAdd}>asyncAdd</button>
      <button onClick={goto}>goto</button>
    </div>
  )
}
function Counter2(props) {
  const { number, add } = props;
  return (
    <div>
      <p>{number}</p>
      <button onClick={add}>+</button>
    </div>
  )
}
const actionCreators = app.createActionCreators();
//state = {counter1:{ number: 0 },counter2:{ number: 0 }};
const ConnectCounter1 = connect(//react-redux
  state => state.counter1,
  actionCreators.counter1
)(Counter1);
const ConnectCounter2 = connect(//react-redux
  state => state.counter2,
  actionCreators.counter2
)(Counter2)
//定义路径配置
app.router(() => (
  <>
    <ul>
      <li><Link to="/counter1">Counter1</Link></li>
      <li><Link to="/counter2">Counter2</Link></li>
    </ul>
    <Routes>
      <Route path="/counter1" element={<ConnectCounter1 />} />
      <Route path="/counter2" element={<ConnectCounter2 />} />
    </Routes>
  </>
));
app.start('#root');