// 按需引入
export const MyHeader = () => import('@/components/Header')
export const Bread = () => import('@/components/Bread')
export const ScrollBoard = () => import('@/components/ScrollBoard')
export const ScrollBoardItem = () => import('@/components/ScrollBoardItem')
export const Slider = () => import('@/components/Slider')
export const Calendar = () => import('@/components/Calendar')
export const Collapse = () => import('@/components/Collapse')
export const Dialog = () => import('@/components/Dialog')
export const Preview = () => import('@/components/Preview')
export const TextView = () => import('@/components/TextView')
export const SplitBox = () => import('@/components/SplitBox')
export const ECharts = () => import('@/components/ECharts')
export const FunnyWords = () => import('@/components/FunnyWords')
// 整体引入
export const AllTemplate = {
  install (Vue) {
    Vue.component('MyHeader', MyHeader)
    Vue.component('Bread', Bread)
    Vue.component('ScrollBoard', ScrollBoard)
    Vue.component('ScrollBoardItem', ScrollBoardItem)
    Vue.component('Slider', Slider)
    Vue.component('Calendar', Calendar)
    Vue.component('Collapse', Collapse)
    Vue.component('Dialog', Dialog)
    Vue.component('Preview', Preview)
    Vue.component('TextView', TextView)
    Vue.component('SplitBox', SplitBox)
    Vue.component('ECharts', ECharts)
    Vue.component('FunnyWords', FunnyWords)
  }
}