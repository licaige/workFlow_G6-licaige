type IFoo = (
  uname: string,
  uage: number
) => {
  name: string;
  age: number;
};
//参数类型
type Ibar = Parameters<IFoo>;
type T0 = ReturnType<IFoo>;
