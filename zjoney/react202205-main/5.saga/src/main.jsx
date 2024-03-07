import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './Counter';
import { Provider } from 'react-redux';
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>, document.querySelector('#root')
);
//npm install redux react-redux redux-saga 