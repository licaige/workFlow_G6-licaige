import './public-path.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
let root;
function render(props) {
    const container = props.container
    root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.getElementById('root'));
    root.render(
        <App />
    );
}
// qiankun 提供了一些标识，用于表示当前应用是否在父应用中被引入过
if (!window.__POWERED_BY_QIANKUN__) {
    render({}); // 独立运行调用render方法
}

// qiankun 要求应用暴露的方式需要时umd格式
export async function bootstrap(props) {
    console.log(props)
}
export async function mount(props) {
    props.onGlobalStateChange((newVal, oldVal) => {
        console.log('child', newVal, oldVal)
    })
    props.setGlobalState({ name: 'jw2' })
    // 外层基座的容器叫container容器
    render(props); // 父应用挂在的时候会传递props， props 有挂载点
}
export async function unmount(props) {
    root.unmount();
}