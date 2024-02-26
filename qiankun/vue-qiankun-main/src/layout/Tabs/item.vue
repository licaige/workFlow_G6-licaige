<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-28 11:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-28 18:50:17
-->
<template>
  <el-tag
    :key="menu.path"
    :class="active ? 'active' : ''"
    :type="active ? '' : 'info'"
    :effect="active ? 'dark' : 'plain'"
    :closable="!menu.meta.hideClose"
    @click="handleClick(menu)"
    @close="closeTab"
  >
    {{ menu.meta.title }}
  </el-tag>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    menu: {
      type: Object,
      default: () => ({
        path: '',
        meta: {
          label: '',
          hideClose: false,
        },
      }),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const router = useRouter()
    // 关闭按钮
    function closeTab() {
      emit('closeTag')
    }
    function handleClick(menu) {
      router.push(menu.path)
    }
    return {
      closeTab,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
  margin: 0 3px;
  height: 28px;
  line-height: 28px;
}
</style>
