
<template>
  <div class="wrap">
    <Tabs></Tabs>
  </div>
</template>
<script setup lang="ts">
import { createVNode, ref, h, reactive, useSlots} from "vue"
import Tabss from './Tabss'
import {Table} from 'ant-design-vue'
var count = ref(0)
const slots:any = useSlots();
const state = reactive<any>({
  dataSource: [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ],
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ],
})
const handleClick = () => {
  count.value++;
}
const Tabs = (props: any, ctx: any) => {
  //h函数和createVNode函数第三个参数必须是虚拟dom或者是字符串
  //但是，第一个参数元素类型原生dom、自定义组件都可以
  //形式如下
  let tabsVnode = createVNode(Tabss, { 'params': count.value, 'onEmitEvent1':handleClick},slots)
  let table = h(Table, { 'dataSource': state.dataSource, 'columns': state.columns })
  return h('div', {}, [tabsVnode])
  //return h(Tabss,{ 'onClick': handleClick, 'params': count.value})
}
//setup(props,ctx){
//setup 这里不会更新
// return () => {
//   console.log(count.value)
//   let tabsVnode = createVNode(Tabss,{'params':count.value})
//   return createVNode('div',{'onClick':handleClick}, [tabsVnode,'nnnn'])
// }
//}
</script>
<style scoped></style>
