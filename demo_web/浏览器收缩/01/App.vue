<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import DevicePixelRatio from '@utils/devicePixelRatio'
export default {
  name: 'App',
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  watch: {
    // 对于本地语言切换的监听，及时进行数据同步
    language: {
      handler (value) {
        console.log('开始变化 language', value)
        this.$i18n.locale = value
      },
      deep: true
    }
  },
  methods: {
    // 监控storage事件
    monitoring_storage_event () {
      const _this = this
      window.addEventListener('storage', function (event) {
        if (event.key === 'getSessionStorage') {
          // 已存在的标签页会收到这个事件
          // 只有存在token、token获取时间、用户信息才能共享session数据
          if (_this.$session.authorization() && _this.$session.authorizationTime() && _this.$session.userInfo()) {
            localStorage.setItem('sessionStorage', _this.$session.getSessionData())
            localStorage.removeItem('sessionStorage')
          }
        } else if (event.key === 'sessionStorage' && !_this.$session.autoLogin() && !sessionStorage.length) {
          // 新开启的标签页会收到这个事件
          // 不是自动登陆状态、不存在sessionStorage数据
          const SESSION = JSON.parse(event.newValue)
          for (const key in SESSION) {
            sessionStorage.setItem(key, SESSION[key])
          }
        } else if (event.key === 'updateSessionStorage' && !_this.$session.autoLogin()) {
          // 已存在的标签页会收到这个事件
          // 不是自动登陆状态，更新本地sessionStorage
          const SESSION = JSON.parse(event.newValue)
          for (const key in SESSION) {
            sessionStorage.setItem(key, SESSION[key])
          }
        } else if (event.key === 'deleteSessionStorage' && !_this.$session.autoLogin()) {
          // 已存在的标签页会收到这个事件
          // 不是自动登陆状态，删除本地sessionStorage
          sessionStorage.clear()
        }
      })
    },
    // 不自动登录时获取sessionStorage存储的会话数据
    get_session_storage_info () {
      if (!this.$session.autoLogin() && !sessionStorage.length && localStorage.getItem('HasLogin')) {
        this.$session.getOtherSessionInfo() // 获取浏览器其它标签页的会话数据
      }
    }
  },
  created () {
    this.monitoring_storage_event() // 监控storage事件
    this.get_session_storage_info() // 不自动登录时获取sessionStorage存储的会话数据
    new DevicePixelRatio().init()
  },
  beforeDestroy () {
    console.log('关闭了项目')
    this.$session.logout()
    // 清理下对应vuex中存储的数据
    this.$store.dispatch('AppPublic/logOut')
    this.$router.push({ name: 'Login' })
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}
</style>

<style lang="scss">
/* 修改进度条默认样式，隐藏旋转圈圈 */
#nprogress {
  .bar {
    background: $theme-color !important;
  }

  .spinner-icon {
    display: none;
  }
}
</style>
