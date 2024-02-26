<template>
  <div class="tabs">
    <el-scrollbar class="scroll-container tags-view-container" ref="scrollbarDom">
      <Item
        v-for="menu in menuList"
        :key="menu.meta.title"
        :menu="menu"
        :active="activeMenu.path === menu.path"
        @close-tag="delMenu(menu)"
      />
    </el-scrollbar>
    <div class="handle">
      <el-dropdown placement="bottom">
        <div class="el-dropdown-link">
          <el-icon><more-filled /></el-icon>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click="pageReload">重新加载</el-dropdown-item> -->
            <el-dropdown-item :disabled="currentDisabled" @click="closeCurrentRoute">关闭当前页面</el-dropdown-item>
            <el-dropdown-item :disabled="menuList.length < 3" @click="closeOtherRoute">关闭其他页面</el-dropdown-item>
            <el-dropdown-item :disabled="menuList.length <= 1" @click="closeAllRoute">关闭所有页面</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {
  defineComponent, computed, reactive, ref, nextTick,
} from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Item from './item.vue'
import tabsHook from './tabsHook'

export default defineComponent({
  components: {
    Item,
    MoreFilled,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const scrollbarDom = ref(null)
    const defaultMenu = {
      path: '/home',
      name: 'Home',
      meta: { title: '首页', hideClose: true },
    }
    const currentDisabled = computed(() => route.path === defaultMenu.path)

    let activeMenu = reactive({ path: '' })
    const menuList = ref(tabsHook.getItem())
    if (menuList.value.length === 0) { // 判断之前有没有调用过
      // eslint-disable-next-line no-use-before-define
      addMenu(defaultMenu)
    }
    router.afterEach(() => {
      // eslint-disable-next-line no-use-before-define
      addMenu(route)
      // eslint-disable-next-line no-use-before-define
      initMenu(route)
    })

    // 关闭当前标签，首页不关闭
    function closeCurrentRoute() {
      if (route.path !== defaultMenu.path) {
        // eslint-disable-next-line no-use-before-define
        delMenu(route)
      }
    }

    // 关闭除了当前标签之外的所有标签
    function closeOtherRoute() {
      menuList.value = [defaultMenu]
      tabsHook.setItem(menuList.value)
      if (route.path !== defaultMenu.path) {
        // eslint-disable-next-line no-use-before-define
        addMenu(route)
      }
      // eslint-disable-next-line no-use-before-define
      setKeepAliveData()
    }

    // 关闭所有的标签，除了首页
    function closeAllRoute() {
      menuList.value = [defaultMenu]
      tabsHook.setItem(menuList.value)
      // eslint-disable-next-line no-use-before-define
      setKeepAliveData()
      router.push(defaultMenu.path)
    }

    // 添加新的菜单项
    function addMenu(menu) {
      const { path, meta, name } = menu
      if (meta.hideTabs || path === '/') {
        return
      }
      const hasMenu = menuList.value.some((obj) => obj.path === path)
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name,
        })
        tabsHook.setItem(menuList.value)
      }
    }

    // 删除菜单项
    function delMenu(menu) {
      let index = 0
      if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name) {
          store.commit('keepAlive/delKeepAliveComponentsName', menu.name)
        }
        index = menuList.value.findIndex((item) => item.path === menu.path)
        menuList.value.splice(index, 1)
        tabsHook.setItem(menuList.value)
      }

      if (menu.path === activeMenu.path) {
        if ((index - 1) > 0) {
          router.push(menuList.value[index - 1].path)
        } else {
          router.push(defaultMenu.path)
        }
      }
    }

    // 初始化activeMenu
    function initMenu(menu) {
      activeMenu = menu
      nextTick(() => {
        // eslint-disable-next-line no-use-before-define
        setPosition()
      })
    }
    // 设置当前滚动条应该在的位置
    function setPosition() {
      if (scrollbarDom.value) {
        const domBox = {
          scrollbar: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__wrap'),
          activeDom: scrollbarDom.value.scrollbar$.querySelector('.active'),
          activeFather: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__view'),
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const i in domBox) {
          if (!domBox[i]) {
            return
          }
        }
        const domData = {
          scrollbar: domBox.scrollbar.getBoundingClientRect(),
          activeDom: domBox.activeDom.getBoundingClientRect(),
          activeFather: domBox.activeFather.getBoundingClientRect(),
        }
        // eslint-disable-next-line no-mixed-operators
        const num = domData.activeDom.x - domData.activeFather.x + 1 / 2 * domData.activeDom.width - 1 / 2 * domData.scrollbar.width
        domBox.scrollbar.scrollLeft = num
      }
    }

    // 配置需要缓存的数据
    function setKeepAliveData() {
      const keepAliveNames = []
      menuList.value.forEach((menu) => {
        // eslint-disable-next-line no-unused-expressions
        menu.meta && menu.meta.cache && menu.name && keepAliveNames.push(menu.name)
      })
      store.commit('keepAlive/setKeepAliveComponentsName', keepAliveNames)
    }
    // 监听
    store.subscribe((mutation) => {
      if (mutation.type === 'menuList/insertMenu') {
        menuList.value = tabsHook.getItem()
      }
    })
    // 初始化时调用：1. 新增菜单 2. 初始化activeMenu
    addMenu(route)
    initMenu(route)
    return {
      // pageReload,
      scrollbarDom,
      // 菜单相关
      menuList,
      activeMenu,
      delMenu,
      closeCurrentRoute,
      closeOtherRoute,
      closeAllRoute,
      currentDisabled,
    }
  },
})
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: var(--system-header-background);
    border-bottom: 1px solid var(--system-header-border-color);
    border-top: 1px solid var(--system-header-border-color);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);
    height: 40px;
    .handle {
      min-width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      .el-dropdown-link {
        border-left: 1px solid var(--system-header-border-color);
        height: 25px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i {
        color: var(--system-header-text-color);
      }
    }
  }
  .scroll-container {
    height: inherit;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }
      .el-scrollbar__wrap {
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
    }
  }
  .tags-view-container {
    flex: 1;
    width: 100%;
    display: flex;
  }
  .el-icon-full-screen {
    cursor: pointer;
    &:hover {
      background: rgba(0,0,0,.025);
    }
    &:focus {
      outline: none;
    }
  }
</style>
