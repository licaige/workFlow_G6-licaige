//Record 把一个类型的所有属性映射到另一个类型上
type petGroups = 'dog' | 'cat' | 'fish';
type MyTypeHere = {
  name: string;
  age: number;
};
type IPets = Partial<Record<petGroups, MyTypeHere>>;
const dogs: IPets = {
  dog: {
    name: 'xx',
    age: 30,
  },
};
console.log(dogs);

function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

export { IPets, tuplify };
// interface Promise<T> {
//   then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
//   catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
// }

// 1、读原生的东西 ts
// 2、信息差 国外的技术栈
// 3、issues 绝活
// 4、论文 全同步任务 任务异步任务
