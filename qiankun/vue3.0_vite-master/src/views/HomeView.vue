<template>
  <div class="gridbox">
    <grid-layout v-model:layout="dataSource" :col-num="3"  :auto-size="false" :row-height="100" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" @layoutUpdated="handleLayoutUpdate">
      <grid-item v-for="item in dataSource" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :item="watchitem(item)" @move="handleMoveEvent" @moved="handleMovedEvent">
        <div class="left_layout_item">
					<div class="del_btn">删除</div>
					<span>{{ item.i }}</span>
          <div @click="handlePiniaIncrement">pinia自增+1</div>
				</div>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore, useStateCounterStore } from "@/stores/counter"
import { ref } from 'vue'
type sn = string | number
interface LayoutData {
  i:sn,
  y:sn,
  x:sn,
  w:sn,
  h:sn
}
const counter = useCounterStore();
const stateCounter = useStateCounterStore();
const { increment } = counter;
let dataSource = ref<LayoutData[]>([]);
let dataSourceHistory = ref<LayoutData[]>([]);
let initeId = ref<sn>("")
let dataSourceStatic: LayoutData[] = []
for (let i = 0; i < 9; i++) {
  dataSourceStatic.push({
    i: i,
    y: Math.floor(i/3),
    x: i % 3,//第几列
    w: 1,
    h: 1
  })
}

dataSource.value = dataSourceStatic
dataSourceHistory.value = JSON.parse(JSON.stringify(dataSourceStatic))
const watchitem = (item:any) => {

  if(initeId.value != item.i){
    let newArr = dataSourceHistory.value.filter((res) => {
      return item.i == res.i
    })

    item.x = newArr[0].x;
    item.y = newArr[0].y;
  }
  return item;
}
const handleLayoutUpdate = (a:any) => {}
const handleMoveEvent = (a:any,b:any,c:any) => {
  initeId.value = a
}
const handleMovedEvent = (i:any,x:any,y:any) => {

  let targetId:sn = '';
  let targetX:sn = '';
  let targetY:sn = '';

  for(let d = 0; d < dataSourceHistory.value.length; d++){
    let item = dataSourceHistory.value[d];
    if(item.i == i){
      targetX = item.x;
      targetY = item.y;
      //修改历史数据
      item.x = x;
      item.y = y;
    }
  }

  for(let d = 0; d < dataSourceHistory.value.length; d++){
    let item = dataSourceHistory.value[d];
    if(item.i != i && item.x == x && item.y == y){
      targetId = item.i;
      item.x = targetX;
      item.y = targetY;
    }
  }

}

const handlePiniaIncrement = () => {
  increment();
  stateCounter.count++;
}
</script>
<style scoped>
.left_layout_item{
  height:100%;
  border:1px solid #ddd;
  box-sizing: border-box;
}
.left_layout_item{
  text-align: center;
}
/* 
.gridbox{
  overflow: hidden;
} */
</style>