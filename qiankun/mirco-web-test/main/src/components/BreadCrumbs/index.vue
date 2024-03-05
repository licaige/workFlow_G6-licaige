<template>
  <div class="main-crumb-container">
    <div class="main-crumb-content">
      <div
        v-for="(item, index) in breadCrumbsList"
        :key="index"
        class="main-crumb-item"
      >
        {{ item }}
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { crumbsState } from '../../store'

export default {
  name: 'index',
  setup() {

    return {
      breadCrumbsList: crumbsState.breadCrumbsList,
    }
  },
};
</script>

<style lang="scss">
.main-crumb{
  &-container{
    width: 100%;
    height: 20px;
    margin-top: 20px;
  }
  &-content{
    width: 1200px;
    height: 20px;
    margin: 0 auto;
    display: flex;
  }
  &-item{
    font-size: 14px;
    color: #666666;
    margin-right: 6px;

    span{
      display: inline-block;
      transform: scaleX(0.6);
    }
  }

  &-item:last-child span{
    display: none;
  }
}
</style>
