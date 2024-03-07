import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { observable, action, makeObservable, computed, autorun, configure, when, reaction } from 'mobx';
import { observer } from 'mobx-react';

// 3.在组件中发起 action 修改容器状态

// 1.初始化 mobx 容器仓库
configure({
  enforceActions: 'observed'
})

class Store {
  constructor() {
    makeObservable(this)
  }
  @observable count = 1011;
  @observable foo = 'bar';
  @action.bound increment() {
    this.count++;
  }

  @observable price = 10;

  @computed get totalPrice() {
    console.log('computed');
    return this.count * this.price;
  }
  @action.bound change() {
    this.count = 11125;
  }

  @action.bound changeFoo(value) {
    this.count = value;
  }
}

const store = new Store();
autorun(() => {
  console.log('autorun => ', store.count);
})

when(() => store.count > 10000000000000, () => { console.log('when =>', store.count); });

store.change();
store.changeFoo(3000);

reaction(() => {
  return store.count;
}, (data, reaction) => {
  console.log('reaction => ', data);
  reaction.dispose();
})

// runInAction(() => {
//   store.foo = 'basketball2';
//   store.count = 11125;
//   store.foo = 'basketball1';
// })


// 2.在组件中使用 mobx 容器状态
@observer
class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <h1>App Component</h1>
        <h2>{store.count}</h2>
        <p>
          <button onClick={store.increment}>Increment</button>
        </p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App store={new Store()} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
