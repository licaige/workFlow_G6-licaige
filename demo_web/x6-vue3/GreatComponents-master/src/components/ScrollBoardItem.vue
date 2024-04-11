<!--
  滚动列表 子 组件：
    属性： 【 itemColor 】
    事件： 【 -- 】
    插槽： 【 default 】
-->
<template>
  <div class="scroll-board-item" :style="{background: itemColor}">
    <slot>
      {{item}}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollBoardItem',

  props: {
    item: {
      type: String,
      default: 'Hello Great Components'
    },
    itemColor: {
      type: String,
      default: '#fff'
    },
  },

  data() {
    return {
      
    };
  },

  methods: {
    
  },
};
</script>