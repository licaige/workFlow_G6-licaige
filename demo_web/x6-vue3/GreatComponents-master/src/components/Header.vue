<!--
  头导航组件：

    属性： 【 title 】
    事件： 【 -- 】
    插槽： 【 iconTitle, list, tool 】
-->
<template>
  <div class="great-header">
    <slot name="iconTitle" class="great-header-title">
      {{ title }}
    </slot>
    <slot name="list" class="great-header-list">
      <ul v-for="item in $router.options.routes[0].children" :key="item.path">
        <li class="great-header-list-item" :class="$route.path === item.path ? 'active' : ''" @click="$router.push(item.path ? item.path : '/')">
          <span class="great-header-list-title">{{item.meta.title}}</span>
        </li>
      </ul>
    </slot>
    <slot name="tool" class="great-header-tools"></slot>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
    // 系统标题
    title: {
      type: String,
      default: ''
    }
  },
};
</script>
