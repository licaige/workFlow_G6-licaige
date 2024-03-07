//第一个属性继承第二个属性
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>;
