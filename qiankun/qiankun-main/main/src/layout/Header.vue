<script setup lang="ts">
import { commonStore } from '@/stores/common'
import { ArrowRight } from '@element-plus/icons-vue'

const common = commonStore()

const collapseClick = () => {
  common.submitCollapse(!common.collapse)
}
</script>

<template>
  <div class="header">
    <div class="fold" @click="collapseClick">
      <el-icon :size="20"><i-ep-fold /></el-icon>
    </div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="common.menuActive.path !== '/home'"
        :to="{ path: common.menuActive.path }"
      >
        {{ common.menuActive.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 50px;
  display: flex;
  align-items: center;

  .fold {
    cursor: pointer;
    height: 20px;
    margin-right: 10px;
  }

  .el-breadcrumb {
    flex: 1;
  }
}
</style>
