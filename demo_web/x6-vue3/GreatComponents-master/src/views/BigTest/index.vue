<template>
  <div class="BigTest">
    <div class="header-l2">
      <ul>
        <ol
          v-for="item in routes"
          :key="item.path"
          :class="{active: $route.path == item.path}"
          @click="$router.push(item.path)">
          {{item.name}}
        </ol>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigTest',
  components: {  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    routes() {
      return this.$router?.options?.routes?.find(r => r.path === this.$route.matched[this.$route.matched.length - 2].path)?.children ?? []
    }
  },
}
</script>

<style lang="less">
.BigTest {
  width: 100%;
  height: 100%;
  & > .header-l2 {
    height: 32px;
    width: 100%;
    background: #ccc;
    & > ul {
      margin: 0;
      & > ol {
        line-height: 32px;
        &.active {
          color: red;
        }
      }
    }
  }
  & > .content {
    height: calc(100% - 32px);
    width: 100%;
  }
}
</style>
