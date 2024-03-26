import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import './AppMain.less'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return () => {
      return (
        <>
          <section class="app-main">
            <router-view key={key} />
          </section>
        </>
      )
    }
  },
})
