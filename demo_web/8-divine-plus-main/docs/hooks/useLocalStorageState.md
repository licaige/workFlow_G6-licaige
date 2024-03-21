# useLocalStorageState 持久化响应式数据

- 同时具有 `ref` 和 `localStorage` 的能力
- **数据持久化 + 响应式**，刷新浏览器后，数据仍然保持

### 函数签名

```typescript
useLocalStorageState<T>(key:string, defaultValue: T | (() => T)):
[T, (value: T | undefined | ((preState: T) => T)) => void];

参数:
- key: string // 变量名
- defaultValue: T | (() => T) // 任意类型，或者 返回任意类型的函数
返回值:
- [T, (value: T | undefined | ((preState: T) => T)) => void]
- 第一个成员: 响应式 ref 数据
- 第二个成员: setter 函数，用于修改 ref 响应式数据 // setter的参数可以是一个 值 或 函数
```

### 基本用法

```javascript
const [state, setState] = useLocalStorageState("key", 1);

setState(1);
setState((preState) => ({ ...preState, other: 1 }));
```

### 具体示例

<UseLocalStorageState />

### useLocalStorageState 参数

| 参数         | 描述       | 类型                                   |
| ------------ | ---------- | -------------------------------------- |
| key          | ref 变量名 | string                                 |
| defaultValue | ref 初始值 | 任意类型的值 或者 返回任意类型值的函数 |

### useLocalStorageState 返回值

| 返回值            | 描述                                | 类型 |
| ----------------- | ----------------------------------- | ---- |
| [value, setValue] | 一个数组[ref 值，修改 ref 值的函数] | -    |
