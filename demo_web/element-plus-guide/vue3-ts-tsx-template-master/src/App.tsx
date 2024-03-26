import { defineComponent } from 'vue'
import './assets/css/app.less'
export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <router-view />
        </>
      )
    }
  },
})
