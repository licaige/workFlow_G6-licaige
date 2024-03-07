// typeof和instanceof：用于细化的类型查询
// keyof：获取对象的键
// O[K]：属性查找
// [K in O]：映射类型
// +或-或readonly或?：加减法，只读和可选修饰符
// x ? Y : Z：泛型类型，类型别名，函数参数类型的条件类型
// !：可为空的类型的非空声明
// =：泛型类型的默认类型参数
// as：类型断言
// is：函数返回类型的类型防护

// ConstructorParameters：类构造函数的参数类型的元组
// Exclude：从另一个类型中排除一个类型
// Extract：选择可分配给另一种类型的子类型
// InstanceType：您从newing类构造函数获得的实例类型
// NonNullable：从类型中排除null和undefined
// Parameters：函数参数类型的元组
// Partial：将对象中的所有属性设为可选
// Readonly：使对象中的所有属性为只读
// ReadonlyArray：制作给定类型的不可变数组
// Pick：对象类型的子类型及其键的子集
// Record：从键类型到值类型的映射
// Required：将对象中的所有属性设为必需
// ReturnType：函数的返回类型

// 语法功能	例
// 接口声明	interface Foo {}
// 类型声明	type Foo = number
// 函数声明	function foo(): void;
// 环境声明	declare module 'foo' {}
// 仅类型导入	import type {Type} from 'foo'
// 仅类型出口	export type {Type} from 'foo'
