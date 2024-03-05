## 使用方法  基座
```
import {start} from 'lzy-microapp'

// 启动microApp
start()

// 启动基座项目
function App() {
    return (
        <div class="mircroContainer">
            <micro-app-element name="microApp_1" url="//localhost:3000" />
            <micro-app-element name="microApp_2" url="//localhost:3005" />
        </div>
    );
}

render(<App />, document.getElementById('root'))
```
## 子应用(React)
```
function App() {
    return <div>微前端 运行于port:3000</div>
}

render(<App />, document.getElementById('root'))
```