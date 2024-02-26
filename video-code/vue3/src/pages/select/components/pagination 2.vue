<template>
  <div class="information-pagination-container" :style="privateStyle">
    <span @click="goIndexPage">首页</span>
    <span @click="goPrevPage">上一页</span>
    <span
      v-for="(item, index) in pageList"
      :key="index"
      @click="setPage(item)"
      :class="page === item ? 'information-pagination-active information-pagination-page' : 'information-pagination-page'"
    >
      {{ item }}
    </span>
    <span @click="goNextPage">下一页</span>
    <span @click="goLastPage">尾页</span>
    <div>共{{ total / limit }}页</div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
export default {
  name: 'pagination',
  setup() {
    const page = ref(1)
    const limit = 10;
    const total = 400;
    // 获取当前页码显示
    const getPageList = (page) => {
      const last = Math.ceil(total / limit)

      if (last <= 6) {
        return [1,2,3,4,5,6]
      }

      let result = []

      if (page <= 4) {
        result = [1,2,3,4,5]

        if (page === 4) {
          result.push(6)
        }
        result.push(...['...', last])
        return result
      }

      result.push(...[1, '...'])
      if (page > 4 && page < last - 4) {
        for (let i = page - 2; i <= page + 2; i++) {
          result.push(i)
        }
        result.push(...['...', last])
        return result
      }
      if (page >= last - 4){
        for (let i = last - 5; i <= last; i++) {
          result.push(i)
        }
      }
      return result
    }

    const setPage = (index) => {
      page.value = index
    }

    const goPrevPage = () => {
      if (page.value <= 1) {
        return
      }
      setPage(page.value - 1)
    }

    const goNextPage = () =>{
      if (page.value >= Math.ceil(total / limit)) {
        return
      }
      this.setPage(page.value + 1)
    }
    const goIndexPage = () =>{
      setPage(1)
    }

    const goLastPage = () =>{
      setPage(Math.ceil(total / limit))
    }

    watch(page, () => {
      pageList.value = getPageList(page.value)
    })

    const pageList = ref(getPageList(page.value))

    return {
      page,
      pageList,
      setPage,
      goLastPage,
      goIndexPage,
      goNextPage,
      goPrevPage,
      total,
      limit
    }
  }
};
</script>

<style lang="scss">
.information-pagination{
  &-container{
    width: 100%;
    height: 30px;
    margin: 32px 0 96px 0;
    font-size: 14px;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;

    span{
      display: block;
      padding: 5px 16px;
      background: #F4F4F5;
      border-radius: 4px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  &-container &-page{
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &-container &-active{
    background:#0091FF;
    color: white;
  }
}

</style>
