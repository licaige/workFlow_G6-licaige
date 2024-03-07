<template>
  <div class="homeBox">
    <!-- HEADER -->
    <header class="headerBox">
      <div class="base">
        <span class="time">
          {{day}}
          <em>{{month}}月</em>
        </span>
        <h1 class="title">知乎日报</h1>
      </div>
      <div class="user"></div>
    </header>

    <!-- BANNER -->
    <div class="bannerBox">
      <div class="swiper-container" v-if="bannerData.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bannerData" :key="item.id">
            <router-link :to="{path:`/detail/${item.id}`}">
              <img :src="item.image" alt />
              <div class="desc">
                <p>{{item.title}}</p>
                <p>{{item.hint}}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!-- LIST -->
    <div class="newsBox" v-if="newsData.length>0">
      <!-- START -->
      <div class="itemBox" v-for="(item,index) in newsData" :key="index">
        <h4 class="time" v-if="index!==0">
          <span>{{filterTime(item.time)}}</span>
          <i></i>
        </h4>

        <ul class="content">
          <li class="item" v-for="news in item.stories" :key="news.id">
            <router-link :to="{path:`/detail/${news.id}`}">
              <div class="con">
                <h4>{{news.title}}</h4>
                <span>{{news.hint}}</span>
              </div>
              <div class="img">
                <img alt :src="news.images[0]" />
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- END -->
    </div>
  </div>
</template>

<script>
import API from "../api";
import utils from "../assets/utils";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  watchEffect,
  watch
} from "vue";

function init_swiper() {
  new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination"
    }
  });
}

export default {
  name: "Home",
  setup() {
    // 构建响应式数据
    let state = reactive({
      date: new Date(),
      bannerData: [],
      newsData: []
    });

    // 基于计算属性构建月和日
    let month = computed(() => utils.formatTime(state.date)[1]);
    let day = computed(() => utils.formatTime(state.date)[2]);

    // 在第一次渲染组件之前，从服务器获取数据
    onBeforeMount(async () => {
      let { date, stories, top_stories } = await API.zhihu.API_LATEST();
      // 日期处理
      state.date = utils.convertTime(date);
      // 新闻数据处理
      state.newsData.push({
        time: state.date,
        stories
      });
      // 轮播图数据处理
      state.bannerData = top_stories;
    });

    // 监听轮播图数据改变，在数据改变后初始化SWIPER
    watch(
      () => state.bannerData,
      () => {
        init_swiper();
      }
    );

    // 过滤日期方法
    const filterTime = time => {
      time = utils.formatTime(time);
      return `${time[1]}月${time[2]}日`;
    };

    // 暴露给模板使用
    return {
      ...toRefs(state),
      month,
      day,
      filterTime
    };
  }
};
</script>

<style lang="less" scoped>
@A: #aaa;

.headerBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;

  .base {
    font-size: 0;

    .time,
    .title {
      display: inline-block;
      padding: 0 0.3rem;
    }

    .time {
      text-align: center;
      font-size: 0.34rem;
      font-weight: bold;
      vertical-align: middle;

      em {
        display: block;
        font-size: 0.24rem;
        font-weight: normal;
        font-style: normal;
      }
    }

    .title {
      font-size: 0.4rem;
      vertical-align: middle;
      border-left: 0.02rem solid @A;
    }
  }

  .user {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: url("../assets/images/timg.jpg") no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    img[src=""] {
      display: none;
    }
  }
}

.bannerBox {
  height: 7.5rem;
  background: lighten(@A, 20%);

  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    display: block;
    position: relative;
    z-index: 9999;
    height: 100%;
    overflow: hidden;

    a {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .desc {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 9999;

      padding: 0.3rem;
      width: 100%;
      height: 2rem;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.7);
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7)
      );

      p {
        font-size: 0.4rem;
        color: rgba(255, 255, 255, 0.85);
        font-weight: bold;
        line-height: 0.8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:nth-child(2) {
          font-size: 0.32rem;
          font-weight: normal;
          line-height: 0.6rem;
        }
      }
    }
  }
}

.newsBox {
  padding: 0.2rem;

  .itemBox {
    .time {
      box-sizing: border-box;
      position: relative;
      height: 0.6rem;
      line-height: 0.6rem;
      padding-top: 0.285rem;

      i {
        display: block;
        margin-left: 1.8rem;
        height: 0.02rem;
        background: lighten(@A, 20%);
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.6rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: normal;
        color: darken(@A, 20%);
      }
    }

    .content {
      .item {
        position: relative;
        padding: 0.2rem 0;
        min-height: 1.5rem;

        a {
          display: block;
        }

        .img {
          position: absolute;
          top: 0.2rem;
          right: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.05rem;
          background: lighten(@A, 20%);
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            border-radius: 0.05rem;
          }
        }

        .con {
          margin-right: 1.7rem;

          h4,
          span {
            display: block;
            color: #000;
            font-size: 0.32rem;
            font-weight: normal;
            line-height: 0.5rem;
            max-height: 1rem;
            overflow: hidden;
          }

          span {
            color: darken(@A, 20%);
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>