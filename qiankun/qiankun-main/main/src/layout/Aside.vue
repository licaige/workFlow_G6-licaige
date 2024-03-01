<script setup lang="ts">
import { commonStore } from '@/stores/common'
import { iconMap } from '@/utils'

const common = commonStore()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    :default-active="common.menuActive.path || '/home'"
    :router="true"
    :collapse="common.collapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
      <span v-show="!common.collapse" class="t">美国队长</span>
    </div>

    <template v-for="(item, index) of common.routes[0].children">
      <!-- 无子级菜单 -->
      <el-menu-item
        v-if="!item.children && !item.meta?.hide"
        :key="index"
        :index="item.path"
      >
        <el-icon>
          <component :is="iconMap[item.meta?.icon as string]" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>

      <!-- 有子级菜单 -->
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="iconMap[item.meta?.icon as string]" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <el-menu-item v-for="(ele, i) of item.children" :index="ele.path">
          <el-icon>
            <component :is="iconMap[ele.meta?.icon as string]" />
          </el-icon>
          <span>{{ ele.meta?.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;

  .logo {
    height: 100px;
    border-bottom: 2px solid #999;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 50px;
    }

    .t {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
      word-break: keep-all;
    }
  }
}
</style>
