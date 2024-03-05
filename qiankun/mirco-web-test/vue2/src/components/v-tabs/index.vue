<template>
  <div class="energy-nav-container">
    <div
        v-for="(item, index) in tabList"
        :key="index"
        class="energy-nav-item"
        :class="{'energy-nav-item-active' : currentNav === index}"
        @click="changeActiveItem(index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'index',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      navList: [
        {
          label: '推荐',
          value: 0
        },
        {
          label: '热门车系',
          value: 1
        },
        {
          label: '10万以下',
          value: 2
        },
        {
          label: '10-20万',
          value: 3
        },
        {
          label: '20-30万',
          value: 4
        },
        {
          label: '30万以上',
          value: 5
        },
      ],
      currentNav: 0,
    }
  },
  computed: {
    tabList() {
      return this.list.length ? this.list : this.navList
    }
  },
  methods: {
    changeActiveItem(index) {
      this.currentNav = index
    }
  },
};
</script>

<style lang="scss">
.energy-nav{
  &-container{
    width: 100%;
    height: 32px;
    display: flex;
    position: relative;
    margin-top: 30px;
    border-bottom: 1px solid #E4E4E4;
    padding-left: 24px;
  }
  &-item{
    margin-right: 50px;
    height: 100%;
    color: #666;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0 4px;
  }
  &-item-active{
    color: #0091FF;
  }
  &-item-active:after{
    content: '';
    display: block;
    width: 38px;
    height: 3px;
    background: #0091FF;
    position: absolute;
    bottom: 0;
  }
}
</style>
