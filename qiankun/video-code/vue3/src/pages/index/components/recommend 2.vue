<template>
  <div class="recommend-container">
    <div class="recommend-title">热门推荐</div>
    <div class="recommend-list"
      v-for="(item, index) in newsList"
      :key="index"
    >
      <div>
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const newsList = [
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
  {
    text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
    status: false
  },
]

export default {
  name: 'recommend',
  setup() {
    return {
      newsList
    }
  }
};
</script>

<style lang="scss">
.recommend {
  &-container {
    width: 100%;
  }

  &-title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    position: relative;
    margin-bottom: 30px;
  }
  &-title:after{
    content: '';
    display: block;
    height: 1px;
    width: 312px;
    position: absolute;
    bottom: 4px;
    right: 0;
    background: #EEEEEE;
  }
  &-list{
    font-size: 16px;
    color: #333333;
    margin-bottom: 15px;

    &>div{
      width: 382px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 34px;
      position: relative;
      margin-bottom: 15px;
    }
    &>div:after{
      content:'';
      display: flex;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #C3C3C3;
      position: absolute;
      left: 20px;
      top: 10px;
    }
  }
}

</style>
