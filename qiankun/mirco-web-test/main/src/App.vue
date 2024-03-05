<template>
  <!-- 头部 -->
  <MainHeader v-if="showHeader"/>
  <!-- 面包屑 -->
  <BreadCrumbs v-if="breadCrumbsList.length"/>
  <!-- 子应用容器 -->
  <MicroBody />
  <!-- 底部 -->
  <Footer v-if="showFooter"/>
</template>

<script>
import MicroBody from './view/micro-body.vue';
import MainHeader from './components/Header'
import Footer from './components/Footer'
import BreadCrumbs from './components/BreadCrumbs'

// 控制头部和底部显示
import { headerState, footerState, crumbsState } from './store'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import { routerLink } from './store/routerLink'
import { loginStatus } from './store/login'

export default {
  name: 'App',
  components: {
    MainHeader,
    MicroBody,
    Footer,
    BreadCrumbs,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    routerLink.value = router
    watch(route, (val) => {
      if (!loginStatus.value && val.fullPath.indexOf('login') === -1) {
        router.push('/react16#/login')
      }
    })

    return {
      showHeader: headerState.showHeader,
      showFooter: footerState.showFooter,
      breadCrumbsList: crumbsState.breadCrumbsList,
    }
  }
}
</script>

<style>
html, body, #micro_web_main_app{
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
