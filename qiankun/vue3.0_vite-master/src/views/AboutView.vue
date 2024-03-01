<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup lang="ts">
interface Person {
  age: number
}

interface Musician extends Person{
  name: string
}
//泛型函数的应用 定义数据类型更加灵活
let drumer = <Musician>{};
drumer.age = 29;
drumer.name = 'baiyongshi';
// let drumer:Musician = {age:29, name:'shibaiyong'};
// drumer.age = 23;

//async函数，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
const handleAsyncFn = async ():Promise<void> => {
  await new Promise(( resolve, reject) => {
    setTimeout(() => {
      resolve('11111111111')
    }, 1000)
  })
  console.log('我在await之后执行')
}
//这里得到的是pendding状态。相当于resolve(undefined)，res为undefined
handleAsyncFn().then((res)=>{
  //console.log(res)
})

const testAsyncFn = async ():Promise<string> => {
  return new Promise(( resolve, reject) => {
    setTimeout(() => {
      resolve('22222222')
    }, 1000)
  })
}

const res = await testAsyncFn();
console.log(res);
console.log('33333333########');

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
