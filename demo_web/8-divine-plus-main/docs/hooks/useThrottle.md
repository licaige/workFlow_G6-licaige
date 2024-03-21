# useThrottle 截流函数

### 函数签名

- useThrottle(fn, options)
  - 参数
    - fn: 需要执行的函数
    - options: 配置对象
      - delay: 最小间隔时间 ( 单位/ms )
      - responsive: 是否响应式数据
      - immediate: 是否立执行

```typescript
type TOptions = {
  delay: number;
  responsive?: boolean;
  immediate?: boolean;
};

type TUseThrottle = (fn: (...args: any[]) => any, options: TOptions) => any;
```

### 基本用法

<UseThrottle />
