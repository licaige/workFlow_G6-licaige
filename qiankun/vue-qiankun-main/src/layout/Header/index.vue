<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="opendStateChange">
        <i v-if="isCollapse" class="iconfont icon-caidanzhankai"></i>
        <i v-else class="iconfont icon-caidanshouqi"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item">
          <i class="iconfont icon-sofa"></i>
        </div>
        <div class="function-list-item">
          <i class="iconfont icon-Washstand"></i>
        </div>
        <div class="function-list-item">
          <i class="iconfont icon-Shower_Room"></i>
        </div>
        <div class="function-list-item">
          <SetIcon />
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span>管理员</span>&nbsp;&nbsp;
            <i class="iconfont icon-iconfontunfold"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showPasswordLayer">设置</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import Breadcrumb from './Breadcrumb.vue'
import SetIcon from './menuList/setting.vue'

export default defineComponent({
  components: {
    Breadcrumb,
    SetIcon,
  },
  setup() {
    const store = useStore()
    const layer = reactive({
      show: false,
    })
    const isCollapse = computed(() => store.state.app.isCollapse)
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      store.commit('app/isCollapseChange', !isCollapse.value)
    }

    // login out the system
    const loginOut = () => {
      store.dispatch('user/loginOut')
    }
    const showPasswordLayer = () => {
      layer.show = true
    }
    return {
      isCollapse,
      layer,
      opendStateChange,
      loginOut,
      showPasswordLayer,
    }
  },
})
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: var(--system-header-background);
    padding-right: 22px;
  }
  .left-box {
    height: 100%;
    display: flex;
    align-items: center;
    .menu-icon {
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 100;
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        background-color: #eee;
      }
      i {
        font-size: 22px;
        color: var(--system-header-text-color);
      }
    }
  }
  .right-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .function-list{
      display: flex;
      .function-list-item {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        cursor: pointer;
        :deep(i) {
          font-size: 18px;
          color: var(--system-header-text-color);
        }
      }
    }
    .user-info {
      margin-left: 20px;
      .el-dropdown-link {
        display: flex;
        color: var(--system-header-breadcrumb-text-color);
      }
    }
  }
  .el-dropdown-menu {
    width: 90px;
    padding: 0;
    .el-dropdown-menu__item {
      padding: 0 12px;
      text-align: center;
    }
  }
</style>
