
```
import { registerMicroApps, start } from 'lzy-qiankun';

// 注册微应用
  registerMicroApps([
        {
            name: 'react app1',
            entry: '//localhost:3001',
            container: '#microApp_1',// 挂载点的id (挂载到哪个div中)
            activeRule: '/#lzyQiankun/#microApp_1',// 微前端的路由
        },
        {
            name: 'react app2',
            entry: '//localhost:3005',
            container: '#microApp_1',
            activeRule: '/#lzyQiankun/#microApp_2',
        },
    ]);
// 启动qiankun
    start();

// 对应端口启动微应用后即可渲染到对应的div中(REACT使用)
    function App(){
        return 
        <>
          <div id='microApp_1' class="scale"></div>
          <div id='microApp_2' class="scale"></div>
        </>
    }

```