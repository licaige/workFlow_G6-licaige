<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import HeadTop from './Header.vue';
import MenuNav from './SideNav.vue';
import RouterViewCache from './routerViewCache.vue';

interface LayoutState {
  isCollapsed: boolean;
  collapsedWd: string;
  // username: string;
}

const $route = useRoute();
// ...mapGetters(['getPageKey', 'getCurrentTab', 'getTabsList']),
// showTabs() {
//   return this.$store.state.showTabs
// },
// viewKey() {
//   return this.showTabs ? this.getPageKey : this.$route.fullPath
// },
const breadcrumbList = computed(() => {
  let breadArrs: any[] = [];
  console.log('breadcrumbList:', $route);
  for (const match of $route.matched) {
    const { path, meta } = match
    if (path && meta.title) {
      breadArrs.push({
        path: path === $route.path ? undefined : path,
        query: $route.query,
        text: meta.title
      })
    }
  }
  return breadArrs;
});

const menuState: LayoutState = reactive({
  isCollapsed: false,
  collapsedWd: '200px',
  // username: '',
});

const collapsedSider = () =>{
  menuState.isCollapsed = !menuState.isCollapsed;
  menuState.collapsedWd = menuState.isCollapsed ? '68px' : '200px';
};
</script>

<template>
  <div class="main-wrapper">
    <el-container>
      <el-header>
        <HeadTop
          @collapsed="collapsedSider"
          :isRotate="menuState.isCollapsed"
        ></HeadTop>
      </el-header>

      <el-container>
        <el-aside :width="menuState.collapsedWd">
          <!-- <div class="toggler-button">
            <el-icon @click="collapsedSider">
              <Fold v-if="menuState.isCollapsed" />
              <Expand v-else />
            </el-icon>
          </div> -->
          <menu-nav />
        </el-aside>

        <el-container>
          <el-main class="main-container">
            <!-- <tabs v-if="showTabs" @reload="reload"></tabs> -->
            <el-page-header v-if="breadcrumbList.length">
              <template #breadcrumb>
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" :to="{ path: breadcrumb.path, query: breadcrumb.query }">
                    {{ breadcrumb.text }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </template>
              <template #content>
                <span class="text-large font-600 mr-3"> {{ breadcrumbList[breadcrumbList.length -1].text }} </span>
              </template>
            </el-page-header>
            <main class="main-con">
              <router-view-cache />
            </main>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>

      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';

.main-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  padding: 0;

  .el-header {
    background: var(--el-color-primary) !important;
  }

  .main-container {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    // background: var(--color_bg-secondary);
    overflow: hidden;

    .main-con {
      width: 100%;
      height: calc(100% - 82px) !important;
      // background: var(--color_bg-primary) !important;
    }

    .el-page-header {
      padding: 10px;
      // background: transparent !important;

      // > &__content {
      //   margin-top: 0 !important;
      // }
      // &__main {
      //   background: #fff !important;
      // }
      // > &__breadcrumb {
      //   background: var(--color_bg-secondary) !important;
      // }
    }
  }

  .toggler-button {
    width: 100%;
    height: 38px;
    line-height: 38px;
    text-align: center;
  }
}
</style>
