import { observable } from 'mobx';
const obs = observable({ name: 'zhufeng', age: 14 })
obs.name = 'zhufeng2'
console.log(obs.name);
//vue3 ref
const num = observable.box(10);
const str = observable.box('hello');
const bool = observable.box(true);
console.log(num.get(), str.get(), bool.get());
num.set(14);
str.set('world');
bool.set(false);
console.log(num.get(), str.get(), bool.get());














/* import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
) */
