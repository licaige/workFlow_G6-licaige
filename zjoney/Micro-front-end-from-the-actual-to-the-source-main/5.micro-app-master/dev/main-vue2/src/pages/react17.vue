<template>
  <div class="react17">
    <micro-app
      name='react17'
      url='http://localhost:3002/'
      :data='data'
    >
    <!-- destroy inline -->
    </micro-app>
  </div>
</template>

<script>

export default {
  name: 'react17',
  data () {
    return {
      data: {from: '来自基座的数据'}
    }
  },
  created () {

  },
  methods: {

  },
}
</script>

<style>

</style>
