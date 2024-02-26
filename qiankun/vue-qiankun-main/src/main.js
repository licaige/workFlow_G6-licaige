/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 22:36:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-26 21:10:47
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'normalize.css' // css初始化
import '@/assets/style/common.scss' // 公共css
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

const instance = createApp(App)
instance.use(ElementPlus)
instance.use(store)
instance.use(router)
instance.mount('#app')
