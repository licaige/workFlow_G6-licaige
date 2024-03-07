<template>
  <div class="vue3">
    <micro-app
      name='vue3'
      url='http://localhost:4002/micro-app/vue3/'
      :data='data'
      baseRoute='/vue3'
    >
    <!-- destroy inline scopecss='false' -->
    </micro-app>
  </div>
</template>

<script>

export default {
  name: 'vue3',
  data () {
    return {
      data: {from: '来自基座的初始化数据'}
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
