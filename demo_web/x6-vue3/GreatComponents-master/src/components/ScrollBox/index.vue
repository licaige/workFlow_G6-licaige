<template>
  <div class="great-scroll-box">
    <div class="scroll-btn">
      <div v-for="item in leftTypeData" :key="item.name" :title="item.name" class="scroll-btn-item" :class="{active: item.isInView}" @click="scrollTo(item.name)"></div>
    </div>
    <div class="type-content">
      <TopicMapBox v-for="item in leftTypeData" :key="item.name" :ref="item.name" :title="item.name" :isShow.sync="item.isShow">
        <div class="box">
          <div v-for="typeName in item.children"
               :key="typeName.name"
               class="type-item"
               :class="{active: active==='' ? item.children[0].id : (active === typeName.id)}"
               @click="$emit('getActive' ,typeName.id)">
            <span class="row1">{{typeName.name.length > 8 ? typeName.name.substring(0, 5) : typeName.name.substring(0, 4)}}</span>
            <span v-if="typeName.name.length > 4" class="row2">{{typeName.name.length > 8 ? typeName.name.substring(5) : typeName.name.substring(4)}}</span>
            <!-- {{typeName.name}} -->
          </div>
        </div>
      </TopicMapBox>
    </div>
  </div>
</template>

<script>
import TopicMapBox from '@/components/ScrollBox/TopicMapBox.vue'

export default {
  components: { TopicMapBox },
  data() {
    return {
      leftTypeData: null,
    };
  },
  props: {
    list: {
      type: Array,
      require: true,
    },
    active: Number || String
  },

  computed: {
  },

  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.leftTypeData = [...this.list]
        }
      }
    }
  },

  mounted() {
    let box = this.$el.querySelector('.type-content')
    const isShow=(content)=>{
      return (content.offsetTop + content.offsetHeight > box.scrollTop) && (content.offsetTop < box.scrollTop + box.clientHeight);
    };
    const onScroll = () => {
      for (let i = 0; i < this.leftTypeData.length; i++) {
        this.leftTypeData[i].isInView = isShow(this.$refs[this.leftTypeData[i].name][0].$el)
      }
    }
    onScroll()
    box.addEventListener('scroll', onScroll)
  },

  methods: {
    scrollTo (name) {
      this.$refs[name][0].$el.scrollIntoView({behavior: 'smooth'})
    },
  },

  destroyed(){
  }
};
</script>

<style lang="less" scoped>

.great-scroll-box ::v-deep {
  position: absolute;
  top: 70px;
  left: 15px;
  width: 364px;
  height: calc(100% - 70px);;
  overflow: visible;
  & > .scroll-btn {
    position: absolute;
    right: -20px;
    top: 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    // align-content: center;
    width: 16px;
    height: 100%;
    & > .scroll-btn-item {
      display: inline-block;
      height: 12px;
      width: 12px;
      margin: 6px 0;
      border-radius: 50%;
      background: rgba(0, 25, 43, 0.6);
      cursor: pointer;
      &.active {
        background: rgba(0, 154, 255, .6);
      }
      &:hover {
        background: rgba(0, 154, 255, 1);
      }
    }
  }
  .type-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    .box {
      min-height: unset;
      display: flex;
      flex-flow: row wrap;
      & > .type-item {
        cursor: pointer;
        display: flex;
        flex-flow: column;
        justify-content: center;
        height: 54px;
        width: 80px;
        margin: 0 0 8px 8px;
        background: url('~@/assets/img/ScrollBox/编组 15.png') no-repeat center center;
        text-align: center;
        user-select: none;
        &.active {
          background: url('~@/assets/img/ScrollBox/编组 15(1).png') no-repeat center center;
        }
      }
    }
  }
}
</style>
<style lang="less">
.great-scroll-box {
  // 滚动条
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    opacity: 0;
  }
  ::-webkit-scrollbar-track {
    opacity: 0;
  }
  ::-webkit-scrollbar-thumb {
    opacity: 0;
  }
}
</style>