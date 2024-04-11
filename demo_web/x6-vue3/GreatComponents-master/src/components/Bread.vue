<!--
  面包屑组件：

    属性： 【 type, datas, current, splitWith】
    事件： 【 nodeClicked 】
    插槽： 【 startWith, splitWith 】
-->
<template>
  <div class="great-bread">
    <slot name="startWith">
      <span>当前页面：</span>
    </slot>
    <!-- 一级菜单 / 二级菜单 / 三级菜单 -->
    <!-- 默认类型 -->
    <template v-if="!type || type === 'default' && datas && Array.isArray(datas) && datas.length > 0">
      <template v-for="item in datas">
        <slot name="splitWith" v-if="item.title !== current.title">
          <span :key="'splitWith'+item.name" class="great-bread-split-with">
            {{ splitWith }}
          </span>
        </slot>
        <span v-if="item.title !== current.title" :key="item.name" class="great-bread-root-node" @click="$emit('nodeClicked', item)">
          {{item.title}}
        </span>
      </template>
    </template>
    <!-- 路由类型 -->
    <template v-else-if="type === 'route'">
      <template v-for="item in $route.matched">
        <slot name="splitWith" v-if="item.meta.title !== $route.meta.title">
          <span :key="'splitWith'+item.name" class="great-bread-split-with">
            {{ splitWith }}
          </span>
        </slot>
        <span v-if="item.meta.title !== $route.meta.title" :key="item.name" class="great-bread-root-node" @click="$router.push(item.path ? item.path : '/')">
          {{item.meta.title}}
        </span>
      </template>
    </template>
    <slot name="splitWith">
      <span class="great-bread-split-with">
        {{ splitWith }}
      </span>
    </slot>
    <span class="great-bread-current-node">
      {{(!type || type === 'default') ? current.title : type === 'route' ? $route.meta.title : ''}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Bread',

  props: {
    // 类型：default / route
    type: {
      type: String,
      default: 'default'
    },

    // 当 type === default或不填 时，datas为必填
    datas: {
      type: Array,
      default: () => { return [] }
    },
    // 当 type === default或不填 时，current为必填
    current: {
      type: Object,
      default: () => { return { title: '首页' } }
    },

    // 分割符号
    splitWith: {
      type: String,
      default: '.'
    }
  },
};
</script>