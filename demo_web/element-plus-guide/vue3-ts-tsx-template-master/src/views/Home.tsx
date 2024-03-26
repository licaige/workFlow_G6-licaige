import { defineComponent } from 'vue'
import { store } from '@/store'
import HelloWorld from '../components/HelloWorld.vue'
export default defineComponent({
  name: 'Home',
  setup() {
    console.log('store', store.state.user.token)
    return () => {
      return (
        <div>
          Home
          <HelloWorld />
        </div>
      )
    }
  },
})
