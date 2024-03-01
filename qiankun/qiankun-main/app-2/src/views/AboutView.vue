<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UserInfo } from '@models/instance'
import { IndexHttp } from '@/service/indexApi'
import TodoList from '@/components/TodoList.vue'
import { useCounterStore, useNameStore, todoListStore } from '@/stores/common'

import { getFileExtName } from '@/utils/index'

let user = ref<UserInfo>({} as UserInfo)
let name = ref<string>('')
let text = ref<string>('')
let list = ref<string[]>([])

const counter = useCounterStore()
const nameStore = useNameStore()
const todoStore = todoListStore()

onMounted(() => {
  getUserInfo()
  // console.log(getFileExtName('a.b.c.jpg'), '-----x')
})

const sayClick = () => {
  nameStore.sayHello(name.value)
}

const addClick = () => {
  list.value.push(text.value)
  text.value = ''
  todoStore.updateList(list.value as [])
}

const delClick = (i: number) => {
  alert('子组建删除的！')
  list.value.splice(i, 1)
  todoStore.updateList(list.value as [])
}

const getUserInfo = () => {
  IndexHttp.getUserInfo({ id: 1 }).then((res: any) => {
    const { data } = res
    user.value = data
  })
}
</script>

<template>
  <div class="about">
    我是微应用-2 路由二页面
    <!-- <img src="@/assets/images/1000.jpg" alt="" />
    <audio controls>
      <source src="@/assets/media/game.mp3" />
    </audio> -->
    <br />
    <br />
    <p><i>测试函数式 pinia</i></p>
    <h1 @click="counter.increment()">Count ++ {{ counter.count }}</h1>
    <h1>CountDouble {{ counter.doubleCount }}</h1>
    <br />
    <br />

    <p><i>测试组合式 pinia</i></p>
    <input v-model="name" type="text" />
    <button @click="sayClick">问好</button>
    <div>{{ nameStore.hello }}</div>
    <br />
    <br />

    <p><i>测试父子传值 + pinia</i></p>
    <input v-model="text" type="text" />
    <button @click="addClick">新增</button>
    <todo-list :tag="'父组件新增的'" @delClick="delClick"></todo-list>
    <br />
    <br />

    <p><i>测试 axios + Apifox mock数据</i></p>
    <div>姓名：{{ user.name }}</div>
    <div>性别：{{ user.sex }}</div>
    <div>年龄：{{ user.age }}</div>
    <div>手机号：{{ user.phone }}</div>
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 200px;
}

p {
  color: coral;
}
</style>
