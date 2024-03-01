<script setup lang="ts">
import { useRouter } from 'vue-router'
import { setSession } from '@/utils/storage'

const router = useRouter()

const login = () => {
  setSession('qiankunToken', 'admin')
  router.push('/')
}
</script>

<template>
  <main>
    <el-button size="large" @click="login">登 录</el-button>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
