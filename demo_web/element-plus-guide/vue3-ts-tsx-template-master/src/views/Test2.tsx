import { defineComponent } from 'vue'
import { store } from '@/store'
export default defineComponent({
  name: 'TEST',
  setup() {
    console.log('store', store.state.user.token)
    return () => {
      return <div>TEST2</div>
    }
  },
})
