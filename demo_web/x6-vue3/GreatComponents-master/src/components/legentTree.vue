<template>
  <div class="legentTree">
    <div v-for="(l1, index1) in props.treeList" :key="index1" class="root mb-[10px]">
      <div v-if="!l1.hideTitle" class="title" :class="{'noAfter': !l1.children || l1.children.length == 1, 'row': !l1.children}">{{ l1.title }}</div>
      <legentTree v-if="l1.children && l1.children.length > 1" :treeList="l1.children"></legentTree>
      <div v-else class="legentTree">
        <div v-if="l1.children && l1.children.length == 1" class="leaf">
          <div class="title">{{ l1.children[0].title }}</div>
          <!-- <slot :name="l3.title"></slot> -->
          <img class="w-[60px] h-[26px] mr-[9px]" :src="require(`@/assets/img/legent/${l1.children[0].icon}.png`)" alt=""/>
          <div class="content-text">{{ l1.children[0].content }}</div>
        </div>
        <div v-else-if="l1.content" class="leaf">
          <!-- <slot :name="l3.title"></slot> -->
          <img class="w-[60px] h-[26px] mr-[9px]" :src="require(`@/assets/img/legent/${l1.icon}.png`)" alt=""/>
          <div class="content-text">{{ l1.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'legentTree'
}
</script>
<script setup>
import {reactive, defineProps} from "vue";

const obj = reactive({
})
const props = defineProps({
  treeList: {
    type: Array,
    default: () => []
  },
})
</script>

<style lang="less" scoped>
.legentTree {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 1;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #F5F7FB;
    line-height: 16px;
    &.row {
      width: 57px!important;
    }
    &.noAfter {
      &::after {
        display: none!important;
      }
    }
  }
  .root {
    @apply mb-[5px];
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    & > .title {
      width: 14px;
      word-wrap: break-word;
      margin-right: 8px;
      &::after {
        content: '';
        display: inline-block;
        min-width: 16px;
        height: 80%;
        border-radius: 8px 0px 0px 8px;
        border: 1px solid #979797;
        border-right: 0;
        margin-left: 2px;
      }
    }
  }
  .leaf {
    @apply mb-[5px];
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    height: 42px;
    max-height: 42px;
    justify-content: space-between;
    align-items: center;
    & > .title {

      width: 57px;
    }
  }
  .content-text {
    display: flex;
    align-items: center;
    width: 214px;
    // min-width: 228px;
    // max-width: 228px;
    flex: 0 0 auto;
    word-wrap: break-word;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F5F7FB;
    line-height: 14px;
  }
}
</style>