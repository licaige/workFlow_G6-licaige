<script setup lang="ts">
import Aside from './Aside.vue'
import Header from './Header.vue'
import { RouterView } from 'vue-router'
import { commonStore } from '@/stores/common'

const common = commonStore()
</script>

<template>
  <el-container class="container">
    <el-aside :width="common.collapse ? 'auto' : '200px'">
      <el-scrollbar>
        <Aside />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <el-scrollbar>
          <RouterView />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
</style>
