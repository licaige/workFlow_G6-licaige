import { defineComponent, reactive, ref } from 'vue'
import { loginRequest } from '@/api/login'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const userRef = ref(null)
    const store = useStore()
    const router = useRouter()
    const formData = reactive({
      username: '',
      password: '',
    })
    const rules = {
      username: [
        { required: true, message: '请输入登陆名称', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入登陆密码', trigger: 'blur' },
      ],
    }
    const submitForm = () => {
      userRef.value.validate(async (valid) => {
        if (valid) {
          const res = await loginRequest(formData)
          if (res.code === 200) {
            store.dispatch(UserActionTypes.ACTION_LOGIN, res.data.token)
            router.push({
              name: 'Dashboard',
            })
          }
        } else {
          return false
        }
      })
    }
    return {
      formData,
      rules,
      userRef,
      submitForm,
    }
  },
  render(ctx) {
    return (
      <div class="login-container">
        <el-form
          model={ctx.formData}
          rules={ctx.rules}
          ref={(el) => (ctx.userRef = el)}
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="登陆名称" prop="username">
            <el-input v-model={ctx.formData.username}></el-input>
          </el-form-item>
          <el-form-item label="登陆密码" prop="password">
            <el-input
              v-model={ctx.formData.password}
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={ctx.submitForm}>
              立即登陆
            </el-button>
            <el-button onClick={ctx.submitForm}>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  },
})
