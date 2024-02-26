/**
 * 判断对象
 * @param o
 * @returns
 */
export function isObj(o: any) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
