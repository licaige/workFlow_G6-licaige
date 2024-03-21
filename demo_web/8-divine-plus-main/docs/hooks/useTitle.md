# useTitle 设置页面标题

- 用于设置页面标题

### 函数签名

- `useTitle(title, options) => [currentTitle, changeTitle]`
- 参数
  - title: 页面新的标题
  - options: 配置对象
    - restoreOnUnmounted: 卸载时，是否还原最初的页面标题
- 返回值
  - currentTitle: 最新的页面的标题
  - changeTitle: 设置新标题的函数

```typescript
type TOptions = {
  restoreOnUnmounted: boolean;
};
type TUseTitle = (
  title: string,
  options?: TOptions
) => [currentTitle: Ref<string>, changeTitle: (title: string) => void];
```

### 基本用法

<UseTitle />

### 参数 options

| options            | 配置项                         | 类型  |
| ------------------ | ------------------------------ | ----- |
| restoreOnUnmounted | 卸载时，是否还原最初的页面标题 | false |
