
<template>
  <div class="table">
    <a-table :dataSource="state.dataSource" :columns="state.columns">
      <template #headerCell="innerData">
        <slot name="headerCus" :innerTableData="innerData"></slot>
      </template>
      <template #bodyCell="innerData">
        <slot name="bodyCus" :innerTableData="innerData"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, onUpdated } from 'vue';

const open = ref<boolean>(false);
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

console.log('child setup')

onMounted(()=>{
  console.log('child Mounted')
  state.dataSource = [
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
  ]
})

onUpdated(()=>{
  console.log('child Update')
})

</script>
<style scoped></style>
