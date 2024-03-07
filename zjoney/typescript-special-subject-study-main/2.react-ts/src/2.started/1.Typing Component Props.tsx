/**
 * 1.interface 用类实现SOLID框架 编写库和第三方的环境定义 Vue
 * 2.type 用于Props、State、fecth数据 shared BFF node的模式
 * 3.quicktype 生成 cli 集成进来
 */
//遵循TSDoc的注释规范
type MyTypeHere = {
  name: string;
  age: number;
};

type OptionalType = {
  xx: unknown;
};

export type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: 'waiting' | 'success';
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // 与object几乎相同 Object完全相同
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** 任何函数 不调用它（不推荐使用） */
  onSomething: Function;
  /** 如果你想省事的话 */
  // onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** 接受事件可选参数 */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
//有关于React的更多实用类型 type interface都可以实现 d.ts 才使用declare
export interface AppProps2 {
  children1: JSX.Element; //这种是没考虑数组的
  children2: JSX.Element | JSX.Element[]; //不接收字符串
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  //表单事件 从event.target中生成它
  onChange?: React.FormEventHandler<HTMLInputElement>;
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  //显式不转发ref
  //props: Props & React.ComponentPropsWithoutRef<'button'>;
  //显式的转发ref
  //props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
