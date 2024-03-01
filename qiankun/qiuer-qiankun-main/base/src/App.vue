<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <div style="padding:10px">
        <img alt="Vue logo" src="./assets/logo.png" width="150">
      </div>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true"
        :default-openeds="['1', '2', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>主应用</template>
          <el-menu-item index="/">主页</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>React子应用</template>
          <el-menu-item index="/react">主页面</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>Vue子应用</template>
          <el-menu-item index="/vue">主页面</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-menu"></i>Vue3子应用</template>
          <el-menu-item index="/vue3">主页面</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-menu"></i>Umi子应用</template>
          <el-menu-item index="/umi">主页面</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <!-- 主应用的渲染区域，用于挂载主应用触发的组件 -->
        <router-view v-show="$route.name"></router-view>
        <!-- 子应用渲染的区域，用于挂载Vue或者React子应用节点 -->
        <div v-show="!$route.name" id="container"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'app',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(5).fill(item)
    }
  }

}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}


</style>
