<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router'
  import { qiankunWindow } from 'vite-plugin-qiankun/es/helper';
  import { menusList } from '../configs'
  import RootPage from '../pages/rootPage/index.vue'

  const route = useRoute()
  const isRootPage = computed(() => route.path === '/')
</script>

<template>
  <div className='layout'>
      <div className='layout-header' v-if="!qiankunWindow.__POWERED_BY_QIANKUN__">
        <router-link  :to="'/'">
          Vue 应用
        </router-link>
      </div>
      <div className="layout-container">
        <!-- qiankunWindow.__POWERED_BY_QIANKUN__ 为 true 时，不显示菜单 -->
        <div className='layout-left' v-if="!qiankunWindow.__POWERED_BY_QIANKUN__ ">
          <template v-for="(item) in menusList" :key="item?.id">
            <router-link  :to="item.path">
              {{ item.name }}
            </router-link>
          </template>
        </div>
        <div className='layout-right'>
          <root-page v-if="isRootPage" />
          <router-view />
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .layout-header {
    display: flex;
    background-color: antiquewhite;
    height: 48px;
    align-items: center;
    color: #646cff;
    font-weight: 500;
    padding: 0 16px;
  }
  .layout-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    .layout-left {
      width: 200px;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
    }
    .layout-right {
      padding: 2rem;
      flex: 1;
      background-color: #fff;
      align-items: center;
    }
  }
}
</style>