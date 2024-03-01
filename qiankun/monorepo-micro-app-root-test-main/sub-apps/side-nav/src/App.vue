<script lang="ts" setup>
import { reactive, type Ref, ref, toRefs, computed, onMounted, onUnmounted, watchEffect, getCurrentInstance, provide, inject, nextTick } from 'vue';
import RenderIcon from './components/autoRenderIcon';
import { getIcon } from './components/enumIcon';
// import { ElLink, ElMain, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus';
// import { trimEnd } from 'lodash-es';

// const { proxy } = getCurrentInstance() as any;
// 针对类型的 defineProps 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，我们还提供了 withDefaults 编译器宏：
export interface Props {
  menuType: string,
  isFold?: boolean,
  uniqueOpen?: boolean,
}

// enum MenuIcon {
// 	setting = IconEpSetting,
// }

const props = withDefaults(defineProps<Props>(), {
  isFold: false,
})

const { isFold } = toRefs(props);

const emit = defineEmits<{
  update: [params: object]
}>();

const menuState = reactive({
  activeName: '/',
  navItems: [
    // {
    //   iconClass: 'el-icon-house',
    //   title: '首页',
    //   path: '/home'
    // },
    // {
    //   iconClass: 'el-icon-tickets',
    //   title: '用户中心',
    //   path: '/accounts'
    // },
    // {
    //   iconClass: 'el-icon-pie-chart',
    //   title: '个人中心',
    //   path: '/myself/index'
    // },
  ],
  // backUrl: '',
  // userName: ''
});

let microAppData: Ref<any> = ref({
  menuList: [],
  pushState: null,
  baseRouter: null,
  subName: null
});

// const refreshMenu = (route: any) => {
//   console.log('lo-route:', trimEnd(route.path, '/'));
//   menuState.activeName = trimEnd(route.path, '/');
// }

const handleSelect = (key: string, keyPath: string[]) => {
  // if (props.menuType === 'main') {
  //   proxy.$router.push({ path: keyPath });
  // }
  console.log('handleSelect:', key, keyPath); 
  if (microAppData.value.menuList.length && microAppData.value.pushState) {
    // 因为 child-vite 和 child-react17 子应用是hash路由，所以需要传递hash值
    let hash = null;
    let index = key;
    if (key.includes('/sub-') && keyPath.length > 1) {
      const pathArr = key.split('/')
      index = '/' + pathArr[1]
      hash = '/' + pathArr[2]
    }
    // 获取子应用appName
    const appName = microAppData.value.subName;

    // 控制基座跳转页面，并渲染子应用
    microAppData.value.pushState(index, hash, appName)
  }
}

// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath);
// }

// 根据url地址获取选中菜单
const getActiveIndex = () => {
  // location.pathname的值通常为：/main-angular11/app-vue2/page2，我们只取`/app-vue2/page2`
  const pathArr = location.pathname.split('/');
  pathArr.splice(1, 1);
  let spath = pathArr.join('/');
  menuState.activeName = spath.length > 1 ? spath.replace(/\/$/, '') : '/';
  console.log('getActiveIndex:', location.pathname, menuState.activeName, location.hash);

  let hash = ''
  if (location.hash) {
    hash = location.hash.split('?')[0]
  }
  // 兼容 child-vue3 和 child-react 子应用，因为它们是hash路由 || menuState.activeName === '/sub-react')
  if ((menuState.activeName === '/sub-vue3' || menuState.activeName === '/sub-react') && hash) {
    menuState.activeName += hash.replace(/^#/, '')
  }

  // 去除斜线后缀，如：/app-vue2/ 转换为 /app-vue2
  if (menuState.activeName !== '/') {
    menuState.activeName = menuState.activeName.replace(/\/$/, '')
  }

  return menuState.activeName
}

const dataListenerFn = (data: Object): void => {
  console.log('nav-dataListenerFn:', data);
  microAppData.value = data;
}

onMounted(async () => {
  // const userInfo: any = JSON.parse(<string>localStorage.getItem('user_info'))
  // console.log("userInfo",  userInfo)
  // state.userName = userInfo.name
  // console.log('methods:', refreshMenu);
  getActiveIndex();

  // 监听浏览器前进后退按钮，激活对应菜单
  window.addEventListener('popstate', () => getActiveIndex());

  await nextTick();

  // 判断微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    console.log('nav-microApp:', window.microApp.getData());
    // 获取基座下发的数据
    microAppData.value = window.microApp.getData();
    // window.microApp.addDataListener(dataListenerFn, true);
    menuState.navItems = microAppData.value.menuList;
    // 全局数据监听，监听来自其它子应用页面跳转，控制侧边栏的菜单展示
    // 因为子应用之间无法直接通信，这里采用全局数据通信
    // window.microApp.addGlobalDataListener((data) => {
    //   console.log('菜单数据:', data);
    //   getActiveIndex()
    // })
  }
});

onUnmounted(() => {
    /** 移除数据【data属性】监听事件 */
   window.microApp && window.microApp.removeDataListener(dataListenerFn)
});
</script>

<template>
  <el-menu
    v-if="menuState.navItems.length"
    ref="refSideNavMenu"
    class="el-menu-vertical-side"
    mode="vertical"
    :default-active="menuState.activeName"
    @select="handleSelect"
    :collapse="isFold"
    :unique-opened="true"
    background-color="#0a1e50"
    text-color="#fff"
    active-text-color="#ffd06b"
    :collapse-transition="true"
    :router="true"
  >
    <template v-for="(item, indx) in menuState.navItems">
      <el-sub-menu v-if="item!.children" :index="item!.path" :key="`${item.path}+${indx}`">
        <template #title>
          <el-icon><render-icon :itag="getIcon(item.iconTag)"/></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title>分组一</template> -->
          <el-menu-item v-for="chitem in item!.children" :key="chitem.path" :index="chitem.path">{{ chitem.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path" :key="item.path">
        <el-icon><component :is="getIcon(item.iconTag)" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-side {
  width: 80px;
  height: calc(100vh - 50px);
  background-color: #0a1e50;
  text-align: left;
  color: #fff;
  border: none !important;
  &:not(.el-menu--collapse) {
   width: 200px;
  }
}
</style>