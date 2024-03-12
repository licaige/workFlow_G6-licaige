/**
 * 获取值类型包含指定类型的所有 key
 * 
 * @typeParam Target - 目标对象
 * @typeParam Value - 要获取的key的对应值应包含的类型
 */
export type KeyOfContainsValue<Target,Value> = {[K in keyof Target]:Value extends Target[K]  ? K : never}[keyof Target];

 /**
  * 获取值类型不应包含指定类型的所有 key
  * 
  * @typeParam Target - 目标对象
  * @typeParam Value - 不应包含的值的类型
  */
export type KeyOfNonContainsValue<Target,Value> = {[K in keyof Target]:Value extends Target[K]  ? never : K}[keyof Target];

/**
 * 获取 Target 中值可为空的key
 */
export type KeyOfNullableValue<Target> = KeyOfContainsValue<Target,null|undefined>;

/**
 * 获取 Target 中值不可为空的key
 */
export type KeyOfNonNullableValue<Target> = KeyOfNonContainsValue<Target,null|undefined>;