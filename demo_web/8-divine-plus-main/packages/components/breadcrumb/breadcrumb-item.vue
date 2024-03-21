<template>
  <span :class="[ns.e('item')]">
    <span :class="[ns.e('inner'), ns.is('link', !!to)]" @click="onClick">
      <slot></slot>
    </span>
    <span v-if="separatorIcon" :class="ns.e('separator')">
      <DvIcon :name="separatorIcon" :class="ns.e('component')" />
    </span>
    <span v-else :class="ns.e('separator')">{{ separator }}</span>
  </span>
</template>

<script lang="ts">
export default {
  name: "DvBreadcrumbItem",
};
</script>

<script setup lang="ts">
import { inject, toRefs, getCurrentInstance } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { breadcrumbKey } from "./constant";
import type { Router } from "vue-router";
import DvIcon from "@/components/icon/icon.vue";

const ns = useNamespace("breadcrumb");

const breadcrumbContext = inject(breadcrumbKey) as any;
const { separator, separatorIcon } = toRefs(breadcrumbContext); // 保持响应式

const props = defineProps({
  to: {
    type: [String, Object],
  },
  replace: {
    type: Boolean,
  },
});

const instance = getCurrentInstance()!;
const router = instance.appContext.config?.globalProperties?.$router as Router;

const onClick = () => {
  if (!props.to || !router) return;
  props.replace ? router.replace(props.to) : router.push(props.to);
};

// ----
// props
// to: 同 vue-router 的 to 属性，比如: 对象{ path: '/' }   字符串'/'
// replace: 是调用 router.replace() 还是 router.push()

// ----
// useNamespace
// 注意：这里虽然是 breadcrumb-item 组件，但这里的参数还是传入block，只不过class调用的是ns.e()

// ----
// 内置组件
// 1. 内置组件有哪些？
//    - keep-alive transition transition-group teleport component
// 2. 特点
//    - tree-shake: 只有在被使用的时候，内置组件才会被引入

// ----
// component
// - props
//  - is: string | Component | VNode
//  - is: is 的值是一个字符串，它既可以是 ( HTML标签名 ) 也可以是 ( 组件名 )。
// - 用法
//  - 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。
//  - 在本组件中，通过 ICON名 来渲染 ICON组件
// - 注意
//  - !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  - 这里之所以可以通过 component 来渲染icon，是因为我们通过注册了所有icon
//  - 声明：所有icon组件：installIcons(app)
//  - 注册：app.use()

// ---
// getCurrentInstance()!
// - 作用：
//  - 1. 获取当前组件实例
//  - 2. ! 表示非空断言，去除 undefined 和 null
// - 使用：
//  - getCurrentInstance 只能在 ( setup ) 或 ( 生命周期钩子 ) 中调用
// - 官网
//  - https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance
</script>
