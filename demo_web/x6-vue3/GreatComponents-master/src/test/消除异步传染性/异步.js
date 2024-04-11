// 由于getUser是异步的，所以m1,m2,m3,main都得是异步的，否则main中打印的就是Promise
async function getUser() {
  return await fetch('https://my-json-server.typicode.com/typicode/demo/profile').then(res => res.json())
}
async function m1() {
  return await getUser()
}
async function m2() {
  return await m1()
}
async function m3() {
  return await m2()
}
async function main() {
  const user = await m3()
  console.log(user)
}

main()