<template>
  <div class="new-list-rank-container">
    <div class="new-list-container">
      <VTabs :list="tabList"/>

      <div class="new-list-enum">
        <div
            class="new-list-item"
            v-for="(item, index) in newList"
            :key="index"
        >
          <div class="new-list-item-img">
            <img :src="item.img" alt="">
          </div>
          <div class="new-list-item-text">
            <div  class="new-list-item-title">{{ item.title }}</div>
            <div class="new-list-item-observer">
            <span>
              <img src="../../../assets/observer.png" alt="">
              {{ item.number }}
            </span>
              <span>
              {{ item.type }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧排行榜 -->
    <div class="energy-rank">
      <div class="energy-hot">
        <Recommend />
      </div>
      <div class="energy-rank-type">
        <div class="energy-rank-title">
          快速找车
        </div>
        <div class="energy-rank-select-wrapper">
          <div class="energy-rank-select-item">
            请选择品牌
            <img src="../../../assets/gray-arrow.png" alt="">
          </div>
          <div class="energy-rank-select-item">
            请选择车系
            <img src="../../../assets/gray-arrow.png" alt="">
          </div>
          <div class="energy-rank-select-button">查底价</div>
        </div>
      </div>
      <div class="energy-rank-type">
        <div class="energy-rank-title">
          关注排行
        </div>

        <div class="energy-rank-list">
          <div
              v-for="(item, index) in rankList"
              :key="index"
          >
            <span
              class="energy-rank-number"
              :class="{ [`energy-rank-number-${index}`]: index <= 2 }"
            >{{ index + 1 }}</span>
            <img :src="rankCar" alt="">
            <div class="energy-rank-content">
              <div>{{ item.name }}</div>
              <div><span>{{ item.number }}台</span> / {{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="energy-load-more">
        查看更多
        <img src="../../../assets/blue-arrow.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VTabs from '../../../components/v-tabs/index.vue'
import Recommend from './recommend.vue'
const rankCar = require('../../../assets/rank-car.png')
import axios from 'axios'
export default {
  name: 'newsList',
  components: {
    VTabs,
    Recommend,
  },
  data () {
    return {
      rankCar,
      tabList: [
        {
          label: '推荐',
          value: 0
        },
        {
          label: '视频',
          value: 1
        },
        {
          label: '新闻',
          value: 2
        },
        {
          label: '试驾',
          value: 3
        },
        {
          label: '导购',
          value: 4
        },
        {
          label: '评测',
          value: 5
        },
        {
          label: '用车',
          value: 6
        },
      ],
      newList: [],
      rankList: [],
    }
  },
  methods: {
    async getNewList() {
      const res = await axios.get('http://localhost:3000/vue2/new/list')
      this.newList = res.data
    },
    async getRankList() {
      const res = await axios.get('http://localhost:3000/vue2/rank/list')
      this.rankList = res.data
    },
  },
  mounted() {
    this.getNewList()
    this.getRankList()
  }
};
</script>

<style lang="scss">
.new-list-rank-container{
  width: 100%;
  display: flex;
}
.new-list{
  &-container{
    width: 738px;
  }
  &-enum{
    margin: 30px 0;
  }
  &-item{
    width: 100%;
    height: 188px;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    margin-bottom: 20px;

    &-img{
      width: 224px;
      height: 168px;
      margin-right: 20px;

      img{
        width: 100%;
        height: 100%;
      }
    }
    &-text{
      font-size: 24px;
      color: #333333;
      flex: 1;
    }
    &-observer{
      margin-top: 30px;
      font-size: 14px;
      color: #B5B5B5;
      display: flex;
      align-items: center;

      span{
        display: flex;
        align-items: center;

        img{
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
      }
      span:last-child{
        margin-left: 20px;
      }
    }
  }
}
.energy{
  &-load-more{
    width: 382px;
    height: 50px;
    background: #F5FAFF;
    border: 1px solid #0091FF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #2686D2;

    img{
      width: 10px;
      height: 6px;
      margin-left: 6px;
    }
  }
  &-hot{
    margin-bottom: 30px;
  }
  &-rank{
    flex: 1;
    margin-left: 40px;
    margin-top: 30px;

    &-type{
      margin-bottom: 60px;
    }
    &-title{
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      position: relative;
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
    &-select{
      &-wrapper{
        margin-top: 30px;
        &>div{
          width: 370px;
          height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
      }

      &-item{
        color: #666666;
        border: 1px solid #D0D0D0;
        margin-bottom: 12px;

        img{
          width: 7px;
          height: 5px;
          margin-left: 6px;
        }
      }
      &-button{
        background: #0091FF;
        font-size: 20px;
        color: white;
        border-radius: 4px;
        margin-top: 20px;
      }
    }
    &-list{
      margin-top: 30px;

      &>div{
        width: 100%;
        height: 105px;
        margin-bottom: 10px;
        padding-left: 56px;
        display: flex;
        position: relative;

        img{
          width: 140px;
          height: 105px;
        }
      }
    }

    &-number{
      font-size: 42px;
      font-weight: 600;
      position: absolute;
      top: 19px;
      left: 20px;
      color: #B2B2B2;
    }
    &-number-0{
      color: #FE4520;
    }
    &-number-1{
      color: #FF691A;
    }
    &-number-2{
      color: #FBC658;
    }
    &-content{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      div:first-child{
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 11px;
      }
      div:last-child{
        font-size: 17px;
        color: #949494;
        span{
          color: #F24300;
        }
      }
    }
  }
}
</style>
