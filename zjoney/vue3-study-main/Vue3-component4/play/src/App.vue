<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance } from '@zi-shui/components/form'

const state = reactive({ username: '', password: '' })

const formRef = ref<FormInstance>()

const validateForm = () => {
  const form = formRef.value
  form?.validate((valid, errors) => {
    console.log(valid, errors)
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    :model="state"
    :rules="{
      username: {
        min: 6,
        max: 10,
        message: '用户名6-10位',
        trigger: ['change', 'blur']
      }
    }"
  >
    <z-form-item
      prop="username"
      :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
    >
      <z-input placeholder="请输入用户名" v-model="state.username" />
      <template #label> 用户名 </template>
    </z-form-item>

    <z-form-item
      prop="password"
      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
    >
      <z-input
        placeholder="请输入密码"
        v-model="state.password"
        type="password"
      />
      <template #label> 用户名 </template>
    </z-form-item>
    <z-button
      a="1"
      b="2"
      size="medium"
      type="primary"
      :round="true"
      @click="validateForm"
    >
      按钮
    </z-button>
  </z-form>
</template>
