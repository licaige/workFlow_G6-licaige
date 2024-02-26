<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 23:11:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 23:00:06
-->
<template>
  <component :is="type" v-bind="linkProps(to)" @click="hideMenu" >
    <slot></slot>
  </component>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'appLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const isMicroFlag = computed(() => props.to.indexOf('/micro') === 0)

    const isCollapse = computed(() => store.state.app.isCollapse)
    const linkProps = (to) => ({
      to,
    })

    const hideMenu = () => {
      if (document.body.clientWidth <= 1000 && !isCollapse.value) {
        store.commit('app/isCollapseChange', true)
      }
    }

    return {
      type: 'router-link',
      linkProps,
      hideMenu,
      isMicroFlag,
    }
  },
})
</script>
<style lang="">

</style>
