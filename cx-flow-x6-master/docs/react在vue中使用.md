# react 在 vue 中使用：以 XFlow 为例

## 1、vue3

演示环境：vue3+ts+vite

推荐：veaury：https://github.com/devilwjp/veaury/blob/master/README_zhcn.md

运行依赖：

```json
"veaury": "^2.3.8",
"react": "17.0.2",
"react-dom": "17.0.2",
```

开发依赖：

```json
"@vitejs/plugin-react": "^2.1.0",
"@vitejs/plugin-vue": "^3.1.2",
"@vitejs/plugin-vue-jsx": "^2.0.1",
```

vite.config.ts 配置

```typescript
import { defineConfig } from 'vite';
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite/index.js';

export default defineConfig({
  plugins: [
    // 关闭 vue 和 vuejsx 插件
    // vue(),
    // vueJsx(),
    // type设为vue时, 所有名为react_app目录中的文件的jsx将被react jsx编译，其他文件里的jsx将以vue jsx编译
    veauryVitePlugins({
      type: 'vue',
    }),
  ],
});
```

注意：路由暂时无法使用 import routes from 'virtual:generated-pages';形式

![image-20221017224508109](\image\image-20221017224508109.png)

### 使用方式：以 XFlow 为例

```json
"@antv/xflow": "^1.0.51",
"antd": "^4.23.5",
```

将官方给的 demo 示例放进代码中

![image-20221017225107837](\image\image-20221017225107837.png)

![image-20221017224055716](\image\image-20221017224055716.png)

## 2、vue2

推荐使用：vuera：https://github.com/akxcv/vuera
