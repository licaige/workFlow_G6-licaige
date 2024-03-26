import { defineComponent } from 'vue'
import './Navbar.less'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const avatar =
      'http://img.alicdn.com/imgextra/i2/69226163/TB2YEitX3aTBuNjSszfXXXgfpXa_!!69226163-0-beehive-scenes.jpg_250x250.jpg'
    return () => {
      const slotDropdown = {
        dropdown: () => (
          <>
            <el-dropdown-menu>
              <router-link to="/setting/profile">
                <el-dropdown-item>个人资料</el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>首页概况</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display: block">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </>
        ),
      }
      return (
        <>
          <div class="navbar">
            <div class="right-menu">
              <el-dropdown
                class="avatar-container"
                trigger="click"
                v-slots={slotDropdown}
              >
                <div class="avatar-wrapper">
                  <img src={avatar} class="user-avatar" />
                  <i class="el-icon-caret-bottom" />
                </div>
              </el-dropdown>
            </div>
          </div>
        </>
      )
    }
  },
})
