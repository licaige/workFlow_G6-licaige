import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import './index.less'
export default defineComponent({
  name: 'Sidebar',
  setup() {
    const store = useStore()
    console.log('dynamicRoutes', store.getters.dynamicRoutes)
    store.getters.dynamicRoutes.forEach((o) => console.log(o.name))
    const route = useRoute()
    const isCollapse = false
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }
    const routes = store.getters.dynamicRoutes
    return () => {
      return (
        <>
          <section class="sidebar-container">
            <el-menu
              default-active="1"
              class="el-menu"
              collapse={isCollapse}
              open={handleOpen}
              close={handleClose}
            >
              {routes.map((item) => {
                const soltTitle = {
                  title: () => (
                    <>
                      <i class="el-icon-location"></i>
                      <span>{item.meta.title}</span>
                    </>
                  ),
                }
                return (
                  <>
                    <el-submenu
                      key={item.path}
                      index={item.path}
                      v-slots={soltTitle}
                    >
                      {item.children.map((childItem) => (
                        <>
                          <el-menu-item
                            key={childItem.path}
                            index={childItem.path}
                          >
                            <router-link to={item.path + '/' + childItem.path}>
                              {childItem.meta.title}
                            </router-link>
                          </el-menu-item>
                        </>
                      ))}
                    </el-submenu>
                  </>
                )
              })}
            </el-menu>
          </section>
        </>
      )
    }
  },
})
