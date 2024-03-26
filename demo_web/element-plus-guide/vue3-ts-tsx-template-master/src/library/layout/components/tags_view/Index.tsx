import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { TagsActionTypes } from '@/store/modules/tagsview/action-types'
import { TagView } from '@/store/modules/tagsview/state'
import ScrollPane from './ScrollPane'
const path = require('path')
import './index.less'
export default defineComponent({
  components: {
    ScrollPane,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const instance = getCurrentInstance()
    const currentRoute = useRoute()

    const scrollPaneRef = ref(null)
    const { proxy } = instance as any

    const toLastView = (visitedViews: TagView[], view: TagView) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath).catch((err) => {
          console.warn(err)
        })
      } else {
        if (view.name === 'Dashboard') {
          router.push({ path: '/redirect' + view.fullPath }).catch((err) => {
            console.warn(err)
          })
        } else {
          router.push('/').catch((err) => {
            console.warn(err)
          })
        }
      }
    }

    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as TagView,
      affixTags: [] as TagView[],
      isActive: (route: TagView) => {
        return route.path === currentRoute.path
      },
      isAffix: (tag: TagView) => {
        return tag.meta && tag.meta.affix
      },
      refreshSelectedTag: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_CACHED_VIEW, view)
        const { fullPath } = view
        nextTick(() => {
          router.replace({ path: '/redirect' + fullPath }).catch((err) => {
            console.warn(err)
          })
        })
      },
      closeSelectedTag: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_VIEW, view)
        if (state.isActive(view)) {
          toLastView(store.state.tagViews.visitedViews, view)
        }
      },
      closeOthersTags: () => {
        if (
          state.selectedTag.fullPath !== currentRoute.path &&
          state.selectedTag.fullPath !== undefined
        ) {
          router.push(state.selectedTag.fullPath).catch((err) => {
            console.log(err)
          })
        }
        store.dispatch(
          TagsActionTypes.ACTION_DEL_OTHER_VIEW,
          state.selectedTag as TagView,
        )
      },
      closeAllTags: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_ALL_VIEWS, undefined)
        if (state.affixTags.some((tag) => tag.path === currentRoute.path)) {
          return
        }
        toLastView(store.state.tagViews.visitedViews, view)
      },
      openMenu: (tag: TagView, e: MouseEvent) => {
        const menuMinWidth = 105
        const offsetLeft = proxy.$el.getBoundingClientRect().left
        const offsetWidth = proxy.$el.offsetWidth
        const maxLeft = offsetWidth - menuMinWidth
        const left = e.clientX - offsetLeft + 15
        if (left > maxLeft) {
          state.left = maxLeft
        } else {
          state.left = left
        }
        state.top = e.clientY
        state.visible = true
        state.selectedTag = tag
      },
      closeMenu: () => {
        state.visible = false
      },
      handleScroll: () => {
        state.closeMenu()
      },
    })

    const visitedViews = computed(() => {
      return store.state.tagViews.visitedViews
    })

    const routes = computed(() => store.state.permission.routes)
    console.log('routes', routes)

    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: TagView[] = []

      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }

        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }

    const initTags = () => {
      state.affixTags = filterAffixTags(routes.value)
      for (const tag of state.affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch(
            TagsActionTypes.ACTION_ADD_VISITED_VIEW,
            tag as TagView,
          )
        }
      }
    }

    const addTags = () => {
      if (currentRoute.name) {
        store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute)
      }
      return false
    }

    const moveToCurrentTag = () => {
      const tags = instance?.refs.tag as any[]
      nextTick(() => {
        if (tags === null || tags === undefined || !Array.isArray(tags)) {
          return
        }
        for (const tag of tags) {
          if ((tag.to as TagView).path === currentRoute.path) {
            ;(scrollPaneRef.value as any).moveToCurrentTag(tag)
            if ((tag.to as TagView).fullPath !== currentRoute.fullPath) {
              store.dispatch(
                TagsActionTypes.ACTION_UPDATE_VISITED_VIEW,
                currentRoute,
              )
            }
          }
        }
      })
    }

    watch(
      () => currentRoute.name,
      () => {
        if (currentRoute.name !== 'Login') {
          addTags()
          moveToCurrentTag()
        }
      },
    )

    watch(
      () => state.visible,
      (value) => {
        if (value) {
          document.body.addEventListener('click', state.closeMenu)
        } else {
          document.body.removeEventListener('click', state.closeMenu)
        }
      },
    )

    onBeforeMount(() => {
      initTags()
      addTags()
    })

    return () => {
      const visitedViewsRef = visitedViews.value
      const { isActive, isAffix, handleScroll } = { ...toRefs(state) }
      const isActiveFun = isActive.value
      const isAffixFun = isAffix.value
      const handleScrollFun = handleScroll.value
      return (
        <>
          <div id="tags-view-container" class="tags-view-container">
            <ScrollPane
              ref={scrollPaneRef}
              class="tags-view-wrapper"
              on-scroll={handleScrollFun}
            >
              {visitedViewsRef.map((tag) => {
                return (
                  <router-link
                    ref={tag}
                    key={tag.path}
                    class={
                      isActiveFun(tag)
                        ? 'tags-view-item active'
                        : 'tags-view-item'
                    }
                    to={{
                      path: tag.path,
                      query: tag.query,
                      fullPath: tag.fullPath,
                    }}
                    tag="span"
                  >
                    {tag.meta.title}
                    {!isAffixFun(tag) ? <span class="el-icon-close" /> : ''}
                  </router-link>
                )
              })}
            </ScrollPane>
          </div>
        </>
      )
    }
  },
})
