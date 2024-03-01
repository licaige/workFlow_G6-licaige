<template>
  <div class="main-user-info-container">
    <div class="main-user-info-content">
      <div class="main-user-info-detail" @click="toLogin">
        <div class="main-user-info-portrait">
          <img src="../assets/city-position.png" alt="">
        </div>
        <div class="main-user-info-text">
          <!-- 用户名 -->
          sunmer08764
        </div>
        <div class="main-user-info-arrow">
          <img src="../assets/gray-arrow.png" alt="">
        </div>
      </div>
      <div class="main-user-info-city">
        <div class="main-user-info-position">
          <img src="../assets/city-position.png" alt="">
        </div>
        <div class="main-user-info-text">
          <!-- 城市名称 -->
          北京
        </div>
        <div class="main-user-info-arrow">
          <img src="../assets/gray-arrow.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss" scoped>
* img{
  width: 100%;
  height: 100%;
}
.main-user-info{
  &-container{
    height: 40px;
    width: 100%;
    background: #393939;
  }
  &-content{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    color: #EBEBEB;
  }
  &-portrait{
    width: 26px;
    height: 26px;
    background: linear-gradient(to bottom, #90CFFF, #58A1FF);
    border: 1px solid transparent;
    border-radius: 50%;
    overflow: hidden;

    img{
      background: white;
    }
  }
  &-detail, &-city{
    display: flex;
    align-items: center;
    cursor: pointer;

  }
  &-arrow{
    width: 7px;
    height: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-position{
    width: 18px;
    height: 18px;
  }
  &-text{
    margin: 0 6px;
  }

  &-detail{
    padding-right: 12px;
    margin-right: 12px;
    position: relative;
  }
  &-detail:after{
    content: '';
    position: absolute;
    right: 0;
    top: 10px;
    width: 1px;
    height: 20px;
    background: #D8D8D8;
  }
}
</style>
