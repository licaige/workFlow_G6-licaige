/*
 * @Description: element 组件
 */
// import {
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubmenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload,
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification,
// } from 'element-plus';

// const components = [
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubmenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload,
// ]

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification,
// ]

/**
 *  系统的全局设置size，全部加载方便设置。
 *  如需按需加载:
 *  1.放开注释
 *  2.引入babel-plugin-component库
 *  3.放开babel.config 注释
 */
// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'dayjs/locale/zh-cn';

// import 'element-plus/dist/index.css'; // 全局引入样式
//  import 'element-plus/packages/theme-chalk/src/base.scss'; // 按需引入样式

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss';
// import '@/assets/styles/theme/element.scss';
import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/general.scss';
import '@/assets/styles/components/app.scss';
import 'uno.css';

//  import { useStore } from '@/stores'
export default function loadComponent(app: any) {
	// app.use(ElementPlus, { size: useStore().state.app.size })
	// app.use(ElementPlus, {
	// 	locale: zhCn,
	// 	size: 'small',
	// 	zIndex: 3000,
	// });
	//  components.forEach(component => {
	//     app.component(component.name, component)
	//  })
	//  plugins.forEach(plugin => {
	//     app.use(plugin)
	//  })

	app.config.globalProperties.$message = ElMessage;
}
