import { withInstall } from '@zi-shui/utils/with-install'
// 组件为了能变成全局组件 需要增加一个install方法，使用的时候可以通过use方法来调用
import _Calendar from './src/calendar.vue'

const Calendar = withInstall(_Calendar)

export default Calendar // app.use(Calendar)

export type { CalendarProps, CalendarEmits } from './src/calendar'

// 给编辑器使用的
declare module 'vue' {
  export interface GlobalComponents {
    ZCalendar: typeof Calendar
  }
}
