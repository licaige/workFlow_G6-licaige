
## 0.AntDesign

-   [ant.design](https://ant.design/docs/react/introduce-cn) 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品

### 0.1 技术栈

-   框架 react
-   测试 jest+enzyme
-   检查 eslint
-   打包 webpack+gulp，dist是webpack产物，es是gulp编译出来的es6,lib是gulp编译出来的es5
-   文档 bisheng
-   钩子 husky

### 0.2 源码目录

-   .husky git钩子
-   _site 网站
-   components 组件
-   docs 文档
-   dist 打包生成的文件
-   es ES6
-   lib ES5
-   scripts 脚本
-   site 组件预览项目
-   tests 测试
-   typings 类型定义

### 0.3 内容

-   webpack配置
-   storybook文档和组件编写
-   单元测试+E2E快照测试+代码覆盖率
-   eslint+prettier+editorconfig
-   git hook
-   编译发布
-   持续集成

## 1.创建项目

### 1.创建文件夹

```
mkdir ant
cd ant
npm init -y
```

### 2.package.json

```
{
  "name": "@zhangry/ant",
  "version": "1.0.0",
  "description": "React组件的企业级UI设计",
  "main": "lib/index.js",
  "scripts": {
    "build": "webpack"
  },
  "publishConfig": {
    "access": "public",
    "registry": "http://registry.npmjs.org"
  },
  "homepage": "https://zhangrenyang.github.io/ant",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zhangrenyang/ant.git"
  },
  "keywords": [
    "ant",
    "component",
    "components",
    "design",
    "framework",
    "frontend",
    "react",
    "react-component",
    "ui"
  ],
  "author": "zhangrenyang",
  "license": "MIT",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@typescript-eslint/parser": "^4.31.1",
    "and": "^0.0.3",
    "eslint": "^7.32.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.24.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.25.2",
    "eslint-plugin-react-hooks": "^4.2.0",
    "husky": "^7.0.2",
    "@babel/core": "^7.15.5",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/plugin-transform-typescript": "^7.15.4",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@storybook/addon-essentials": "^6.3.8",
    "@storybook/react": "^6.3.8",
    "@types/enzyme": "^3.10.9",
    "@types/jest": "^27.0.1",
    "@types/jest-environment-puppeteer": "^4.4.1",
    "@types/jest-image-snapshot": "^4.3.1",
    "@types/node": "^16.9.2",
    "@types/puppeteer": "^5.4.4",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
    "autoprefixer": "^10.3.4",
    "babel-loader": "^8.2.2",
    "commitizen": "^4.2.4",
    "css-loader": "^6.2.0",
    "cz-customizable": "^6.3.0",
    "enzyme": "^3.11.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "jest": "^27.2.0",
    "jest-environment-puppeteer": "^5.0.4",
    "jest-image-snapshot": "^4.5.1",
    "jest-puppeteer": "^5.0.4",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "merge2": "^1.4.1",
    "mini-css-extract-plugin": "^2.3.0",
    "postcss-loader": "^6.1.1",
    "prettier": "^2.4.1",
    "puppeteer": "^10.2.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.4.3",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0"
  }
}
```

## 2.配置webpack

### 2.1 安装依赖

```
yarn add webpack webpack-cli webpack-dev-server mini-css-extract-plugin babel-loader css-loader autoprefixer postcss-loader less-loader less @babel/core @babel/preset-react @babel/preset-env  @babel/runtime @babel/plugin-transform-typescript  typescript @babel/plugin-transform-runtime @types/node --dev

yarn add react react-dom 
yarn add @types/react @types/react-dom --dev
```

### 2.2 webpack.config.js

```
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cwd = process.cwd();
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    ant: './index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: 'ant',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      antdesign: cwd,
    },
  },
  module: {
    rules: [
      {
        test: /.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)(?v=\d+.\d+.\d+)?$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

### 2.3 babel.config.js

babel.config.js

```
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ],
};
```

### 2.4 .gitignore

.gitignore

```
*.iml
.idea/
.ipr
.iws
*~
~*
*.diff
*.patch
*.bak
.DS_Store
Thumbs.db
.project
.*proj
.svn/
*.swp
*.swo
*.log
*.log.*
*.json.gzip
node_modules/
.buildpath
.settings
npm-debug.log
nohup.out
_site
_data
dist
report.html
/lib
/es
elasticsearch-*
config/base.yaml
/.vscode/
/coverage
yarn.lock
package-lock.json
components/**/*.js
components/**/*.jsx
!components/**/__tests__/**/*.js
!components/**/__tests__/**/*.js.snap
/.history
*.tmp

# Docs templates
site/theme/template/Color/ColorPicker.jsx
site/theme/template/IconDisplay/*.js
site/theme/template/IconDisplay/*.jsx
site/theme/template/IconDisplay/fields.js
site/theme/template/Home/**/*.jsx
site/theme/template/utils.jsx
site/theme/template/Layout/Footer.jsx
site/theme/template/Layout/Header/**/*.jsx
site/theme/template/Layout/SiteContext.jsx
site/theme/template/Content/Article.jsx
site/theme/template/Content/EditButton.jsx
site/theme/template/Resources/*.jsx
site/theme/template/Resources/**/*.jsx
site/theme/template/NotFound.jsx
scripts/previewEditor/index.html
components/version/version.tsx

# Image snapshot diff
__diff_output__/
__image_snapshots__/
/jest-stare
/imageSnapshots
/imageDiffSnapshots
storybook-static

sh.exe.stackdump
/snapshots
/diffSnapshots
```

### 2.5 tsconfig.json

```
{
    "compilerOptions": {
      "strictNullChecks": true,
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "jsx": "react",
      "noUnusedParameters": true,
      "noUnusedLocals": true,
      "noImplicitAny": true,
      "target": "es6",
      "lib": ["dom", "es2017"],
      "skipLibCheck": true,
      "types": ["node"]
    },
    "exclude": ["node_modules", "lib", "es"]
}
```

### 2.6 index.js

```
module.exports = require('./components');
```

### 2.7 components\index.tsx

components\index.tsx

```
import Button from './button';

export type { ButtonProps } from './button';
export { Button };
```

### 2.8 button\index.tsx

components\button\index.tsx

```
import Button from './button';
export default Button;
export type { ButtonProps } from './button';
```

### 2.9 button.tsx

components\button\button.tsx

```
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  return <button type="button">{children}</button>;
};

export default Button;
export type { ButtonProps };
```

## 3.storybook

-   [storybook](https://storybook.js.org/)是一个用于开发UI组件的开源工具，是UI组件的开发环境
-   [@storybook/react](https://www.npmjs.com/package/@storybook/react)是React的运行环境
-   [@storybook/addon-essentials](https://www.npmjs.com/package/@storybook/addon-essentials)是storybook最好插件的合集

### 3.1 安装

```
yarn add @storybook/react   @storybook/addon-essentials --dev
```

### 3.2 .storybook\main.js

.storybook\main.js

```
module.exports = {
    stories: [
        "../components/Introduction.stories.mdx",
        "../components/Install.stories.mdx",
        "../components/Components.stories.mdx",
        "../components/**/*.stories.mdx",
        "../components/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: ['@storybook/addon-essentials'],
};
```

### 3.3 Introduction.stories.mdx

components\Introduction.stories.mdx

```
<Meta title="开始/介绍" />

## Ant Design of React
antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。
```

### 3.4 Install.stories.mdx

components\Install.stories.mdx

```
<Meta title="开始/安装使用" />

## 安装
使用 npm 或 yarn 安装


npm install ant --save



yarn add ant


## 浏览器引入
在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 ant
我们在 npm 发布包内的 antdesign/dist 目录下提供了 ant.js

## 示例


import { Button } from 'antdesign';
ReactDOM.render(<Button>按钮</Button>, mountNode);
```

### 3.5 Components.stories.mdx

components\Components.stories.mdx

```
<Meta title="开始/组件总览" />

## 组件总览
antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

## 通用
- Button 按钮
- Icon 图标
- Typography 排版

## 布局
- Divider 分割线
- Grid 栅格
- Layout 布局
- Space 间距

## 导航
- Affix 固钉
- Breadcrumb 面包屑
- Dropdown 下拉菜单
- Menu 导航菜单
- Pagination 分页
- PageHeader 页头
- Steps 步骤条

## 数据录入
- AutoComplete 自动完成
- Checkbox 多选框
- Cascader 级联选择
- DatePicker 日期选择框
- Form 表单
- InputNumber 数字输入框
- Input 输入框
- Mentions 提及
- Rate 评分
- Radio 单选框
- Switch 开关
- Slider 滑动输入条
- Select 选择器
- TreeSelect 树选择
- Transfer 穿梭框
- TimePicker 时间选择框
- Upload 上传

## 数据展示
- Avatar 头像
- Badge 徽标数
- Comment 评论
- Collapse 折叠面板
- Carousel 走马灯
- Card 卡片
- Calendar 日历
- Descriptions 描述列表
- Empty 空状态
- Image 图片
- List 列表
- Popover 气泡卡片
- Statistic 统计数值
- Tree 树形控件
- Tooltip 文字提示
- Timeline 时间轴
- Tag 标签
- Tabs 标签页
- Table 表格


## 反馈
- Alert 警告提示
- Drawer 抽屉
- Modal 对话框
- Message 全局提示
- Notification 通知提醒框
- Progress 进度条
- Popconfirm 气泡确认框
- Result 结果
- Spin 加载中
- Skeleton 骨架屏

## 其他
- Anchor 锚点
- BackTop 回到顶部
- ConfigProvider 全局化配置
```

### 3.6 button.stories.tsx

components\button\button.stories.tsx

```
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "通用/Button(按钮)",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button  {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  children: "按钮",
};
```

### 3.7 package.json

```
  "scripts": {
    "build": "webpack",
+   "storybook": "start-storybook -p 6006",
+   "build-storybook": "build-storybook"
  },
```

## 4.测试

-   [configuration](https://jestjs.io/docs/configuration)
-   [code-transformation](https://jestjs.io/docs/code-transformation)

### 4.1 安装

-   [jest](https://www.jestjs.cn/)是一个令人愉快的 JavaScript 测试框架
-   [Enzyme](https://www.npmjs.com/package/enzyme) 用于 React 的 JS 测试工具
-   [puppeteer](https://www.npmjs.com/package/puppeteer)是一个控制 headless Chrome 的 Node.js API
-   [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot)执行图像比较的Jest匹配器,对于视觉回归测试非常有用

```
yarn add jest @types/jest  @wojtekmaj/enzyme-adapter-react-17 puppeteer @types/puppeteer jest-environment-puppeteer  @types/jest-environment-puppeteer jest-puppeteer  jest-image-snapshot @types/jest-image-snapshot --dev
yarn add enzyme  @types/enzyme  --dev
```

### 4.2 tests\setup.js

tests\setup.js
tests\setup.js

```
const React = require('react');
const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
Enzyme.configure({ adapter: new Adapter() });
```

### 4.3 tests\index.html

tests\index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amazing Antd</title>
    <style>
      body {
        border: 5px solid #1890ff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 4.4 unit.jest.js

unit.jest.js

```
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.(js|ts|jsx|tsx)',
    '!components/**/*.stories.(js|ts|jsx|tsx)',
    '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
  ],
};
```

### 4.5 e2e.jest.js

e2e.jest.js

```
module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-puppeteer',
  setupFiles: ['./tests/setup.js'],
  preset: 'jest-puppeteer',
  testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],
};
```

### 4.6 unit\index.test.tsx

components\button\unit\index.test.tsx

```
import React from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('Button', () => {
  it('mount correctly', () => {
    expect(() => mount(<Button>Follow</Button>)).not.toThrow();
  });
});
```

### 4.7 snapshot.spec.tsx

components\button\e2e\snapshot.spec.tsx

```
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import Button from '..';
import 'jest-environment-puppeteer';
const toMatchSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`,
});
expect.extend({ toMatchSnapshot });
describe('Button snapshot', () => {
  it('screenshot should correct', async () => {
    await jestPuppeteer.resetPage();
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    const html = ReactDOMServer.renderToString(<Button>按钮</Button>);
    await page.evaluate((innerHTML:string) => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot();
  });
});
```

### 4.8 jest-puppeteer.config.js

jest-puppeteer.config.js

```
module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
  browserContext: 'default',
};
```

### 4.9 package.json

package.json

```
{
  "scripts": {
    "build": "webpack",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
+   "test:unit": "jest --config unit.jest.js",
+   "test:e2e": "jest --config e2e.jest.js",
+   "test": "npm run test:unit && npm run test:e2e"
  },
}
```

## 5.eslint

-   [eslint](https://eslint.bootcss.com/)是一个插件化并且可配置的 JavaScript 语法规则和代码风格的检查工具
-   [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)Airbnb提供的eslint配置

### 5.1 安装

```
yarn add @typescript-eslint/parser eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y eslint-config-airbnb --dev
```

### 5.2 .eslintrc.js

.eslintrc.js

```
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'import/no-named-default': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'func-names': 0,
  }
};
```

### 5.3 .eslintignore

.eslintignore

```
components/**/e2e/*
components/**/unit/*
components/**/*.stories.*
lib
es
umd
dist
.storybook
gulpfile.js
```

### 5.4 package.json

package.json

```
{
  "scripts": {
    "build": "webpack",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "test:unit": "jest --config unit.jest.js",
    "test:e2e": "jest --config e2e.jest.js",
    "test": "npm run test:unit && npm run test:e2e",
+   "lint": "eslint --ext .js,.jsx,.ts,.tsx components",
+   "lint:fix": "eslint --fix --ext .js,.jsx,.ts,.tsx components"
  }
}
```

## 6.prettier

-   [prettier](https://www.npmjs.com/package/prettier) 是一个有主见的代码格式化工具
-   [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)关闭和prettier冲突的规则
-   [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)把Prettier当Eslint规则来运行并且进行报告

### 6.1 安装依赖

```
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

### 6.2 .eslintrc.js

.eslintrc.js

```
module.exports = {
  parser: '@typescript-eslint/parser',
+ extends: ['airbnb','prettier'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
+ plugins: ['prettier'],
  rules: {
+   'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'import/no-named-default': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'func-names': 0,
  }
};
```

### 6.3 .prettierrc

.prettierrc

```
{
    "singleQuote": true
}  
```

### 6.4 button\index.tsx

components\button\index.tsx

```
+            const title = "hello";
```

### 6.5 settings.json

.vscode\settings.json

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "afterDelay"
}
```

## 7.editorconfig

-   [EditorConfig](https://github.com/editorconfig/)由用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵循定义的样式

### 7.1 .editorconfig

```
# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*.{js,css}]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
```

## 8. git hook

-   [Git 钩子](https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)能在特定的重要动作发生时触发自定义脚本
-   [husky](https://www.npmjs.com/package/husky)可以让我们向项目中方便添加 git hooks
-   [lint-staged](https://www.npmjs.com/package/lint-staged)用于实现每次提交只检查本次提交所修改的文件

### 8.1 安装

```
yarn add husky --dev
npm set-script prepare "husky install"
npm run prepare
```

### 8.2 pre-commit

-   pre-commit在git add提交之后，然后执行git commit时执行，脚本执行没报错就继续提交，反之就驳回提交的操作
-   可以在 git commit 之前检查代码，保证所有提交到版本库中的代码都是符合规范的

#### 8.2.1 安装脚本

```
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 8.2.2 .lintstagedrc

```
{
    "*.{js,ts,jsx,tsx}": "eslint"
}
```

### 8.3 commit-msg

-   [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg) 用于检查 Node 项目的 Commit message 是否符合格式
-   [commitizen](https://www.npmjs.com/package/commitizen)插件可帮助实现一致的提交消息
-   [cz-customizable](https://www.npmjs.com/package/cz-customizable)可以实现自定义的提交
-   [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)可以检查提交信息
-   [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)检查您的常规提交

#### 8.3.1 安装依赖

```
yarn add commitizen cz-customizable @commitlint/cli @commitlint/config-conventional --dev
```

#### 8.3.2 安装脚本

```
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

#### 8.3.3 .cz-config.js

```
module.exports = {
  types: [
    { value: "feat", name: "feat:一个新特性" },
    { value: "fix", name: "fix:修复BUG" },
  ],
  scopes: [{ name: "admin" }, { name: "user" }],
};
```

#### 8.3.4 commitlint.config.js

commitlint.config.js

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

### 8.4 pre-push

-   可以在 git push 之前执行单元测试,保证所有的提交的代码经过的单元测试

#### 8.4.1 安装脚本

```
npx husky add .husky/pre-push "npm run test"

npm pubish
```

## 9. 编译发布

-   [rimraf](https://www.npmjs.com/package/rimraf)是 node版本的 `rm -rf`
-   [gulp](https://www.gulpjs.com.cn/)将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大价值。
-   [merge2](https://www.npmjs.com/package/merge2)合并多个流为同一个

### 9.1 安装依赖

```
yarn add rimraf gulp gulp-typescript gulp-babel merge2 --dev

npm version patch
npm publish
cat ~/.npmrc
```

### 9.2 gulpfile.js

gulpfile.js 编译es目录和lib目录

```
const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...compilerOptions,
};
const babelConfig = require('./babel.config');

const source = [
  'components/**/*.{js,ts,jsx,tsx}',
  '!components/**/*.stories.{js,ts,jsx,tsx}',
  '!components/**/e2e/*',
  '!components/**/unit/*',
];
const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

gulp.task('compile-with-es', (done) => {
  console.log('Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
  console.log('Compile to js...');
  compile().on('finish', done);
});
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));

function compile(modules) {
  const targetDir = modules === false ? esDir : libDir;
  rimraf.sync(targetDir);
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
  const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
  let jsFilesStream = js;
  if (modules) {
    jsFilesStream = js.pipe(babel(babelConfig));
  }
  jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));
  return merge2([jsFilesStream, dtsFilesStream]);
}
```

### 9.3 package.json

package.json

```
{
+ "main": "lib/index.js",
+ "module": "es/index.js",
+ "unpkg": "dist/antd.js",
+ "typings": "lib/index.d.ts",
+ "files": [
+   "dist",
+   "es",
+   "lib"
+ ],
}
```

## 10. 持续集成

-   [Travis CI](https://www.travis-ci.com/)提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器

### 10.1 .travis.yml

```
language: node_js
node_js:
  - "stable"
cache:
  directories:
  - node_modules
env:
  - CI=true
install:
  - yarn config set registry https://registry.npm.taobao.org  
  - yarn install
script:
  - npm run build-storybook
  - npm version patch
deploy:
  - provider: pages
    skip_cleanup: true
    github_token: $GITHUB_TOKEN
    local_dir: storybook-static
    on:
      branch: master 
  - provider: npm
    email: zhang_renyang@126.com  
    api_key: "$NPM_TOKEN"
    skip_cleanup: true
    on:
      branch: master
```


