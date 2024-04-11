import SparkMD5 from 'spark-md5'
/**
 * 将任意类型转hash
 * @param {any} any 
 * @returns {hash}
 */
export function anyToHash(any) {
  if (any === undefined) return void 0
  let anyToSimple = any
  if (typeof any === 'symbol') {
    anyToSimple = any.toString()
  }
  if ((any !== null && typeof any === 'object')) {
    anyToSimple = JSON.stringify(any)
  }
  const spark = new SparkMD5()
  spark.append(anyToSimple)
  return spark.end()
}