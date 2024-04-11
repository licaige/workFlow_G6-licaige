<template>
  <div style="width:316px">
    <div v-for="item in 10" :key="item" class="list-wrapper ">
      <div class="detail-wrap_2xc0f detail-wrap-ws_2_ItN">
        <a class="img-wrapper_2A-dm imgSizeW_3l7yX" href="/s?wd=%E5%8D%81%E4%B8%AA%E5%9D%9A%E6%8C%81%E6%80%BB%E7%BB%93%E7%99%BE%E5%B9%B4%E5%A5%8B%E6%96%97%E5%8E%86%E5%8F%B2%E7%BB%8F%E9%AA%8C&amp;ie=utf-8&amp;rsv_pq=c8cf5cab000694e4&amp;oq=%E5%9C%A8f12%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%89%80%E6%9C%89%E5%A4%87%E6%B3%A8&amp;rsv_t=c398HOuu2OCuYOrJEIR8Ym0uqWb6svE6M%2Bnt4%2BAWDo41R2a8hCc1X4MrSz4&amp;rsv_dl=fyb_right_realtime" target="_blank">
          <div class="rank-container_janGC diamond_3mTZ1 index_2IhVQ" :class="{'c-text-danger': item==1,'c-text-warning': item > 1 && item < 4, 'c-text-safe': item > 3}">
            <span>{{item}}</span>
          </div>
          <img src="https://t15.baidu.com/it/u=4283546046,1071064196&amp;fm=55&amp;app=54&amp;fmt=auto?w=1140&amp;h=640">
          <div class="border_8ZhG6"></div>
        </a>
        <div class="right margin-left-w_2PKuE">
          <div class="title_2nsqX c-color-text">
            <a href="/s?wd=%E5%8D%81%E4%B8%AA%E5%9D%9A%E6%8C%81%E6%80%BB%E7%BB%93%E7%99%BE%E5%B9%B4%E5%A5%8B%E6%96%97%E5%8E%86%E5%8F%B2%E7%BB%8F%E9%AA%8C&amp;ie=utf-8&amp;rsv_pq=c8cf5cab000694e4&amp;oq=%E5%9C%A8f12%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%89%80%E6%9C%89%E5%A4%87%E6%B3%A8&amp;rsv_t=c398HOuu2OCuYOrJEIR8Ym0uqWb6svE6M%2Bnt4%2BAWDo41R2a8hCc1X4MrSz4&amp;rsv_dl=fyb_right_realtime" target="_blank" class="multi-line-title_1zbzE c-line-clamp1">
              十个坚持总结百年奋斗历史经验<!--33-->
              <span class="c-text c-text-hot behind-tag_6GBAd c-text-new">热</span><!--34-->
            </a>
            <span class="c-color-gray2 trendce_29gjT no-padding-right_VcFvo hot-score_1UHTQ">494万<!--36--></span>
          </div><!--37-->
        </div>
      </div>
      <div class="normal_1DHjU" @mouseover="addClassByIndex($event)">
        <div class="normal-col_3tCxq normal-title-wrapper_1E6k8">
          <div class="rank-container_janGC primary_c9GS4 c-color-red rank_3kOx8">
            <span>{{item}}</span>
          </div>
          <a target="_blank" title="十个坚持总结百年奋斗历史经验" href="https://www.baidu.com/s?wd=%E5%8D%81%E4%B8%AA%E5%9D%9A%E6%8C%81%E6%80%BB%E7%BB%93%E7%99%BE%E5%B9%B4%E5%A5%8B%E6%96%97%E5%8E%86%E5%8F%B2%E7%BB%8F%E9%AA%8C&amp;ie=utf-8&amp;rsv_pq=c8cf5cab000694e4&amp;oq=%E5%9C%A8f12%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%89%80%E6%9C%89%E5%A4%87%E6%B3%A8&amp;rsv_t=c398HOuu2OCuYOrJEIR8Ym0uqWb6svE6M%2Bnt4%2BAWDo41R2a8hCc1X4MrSz4&amp;rsv_dl=fyb_right_realtime" class="c-font-medium c-line-clamp1 normal-title_iNefW">
            十个坚持总结百年奋斗历史经验<!--39-->
          </a>
          <span class="c-text c-text-hot behind-tag_2xwI8 c-text-new">热</span><!--40-->
        </div>
        <div class="hot-score_13ffB normal-col_3tCxq c-color-gray2" style="float: right;">
          <span class="c-color-gray2 trendce_29gjT no-padding-right_VcFvo">494万<!--42--></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextView',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    addClassByIndex(e) {
      this.$el.querySelectorAll('.list-wrapper').forEach(item => {
        item.classList.remove('active')
      })
      e.relatedTarget?.classList.add('active')
    }
  },
};
</script>

<style lang="less" scoped>
.list-wrapper {
  padding: 5px 0;
  cursor: pointer;
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
}
.list-wrapper.active:hover .detail-wrap_3y9f3 {
  background-color: rgba(245, 245, 246, 0.5);
  background-image: linear-gradient(to bottom, #F5F5F6 0%, #FFF 100%);
}
.list-wrapper.active .detail-wrap-ws_2_ItN,
.list-wrapper.active .detail-wrap-l_BGuke {
  opacity: 1;
}
.list-wrapper.active .detail-wrap-ws_2_ItN {
  height: 80px;
}
.list-wrapper.active .detail-wrap-l_BGuke {
  height: 106px;
}
.list-wrapper.active .normal_1DHjU {
  height: 0;
  opacity: 0;
}
.list-wrapper.active .normal_1DHjU .normal-col_3tCxq,
.list-wrapper.active .normal_1DHjU .hot-score_13ffB {
  display: none;
}
.list-wrapper .detail-wrap-ws_2_ItN,
.list-wrapper .detail-wrap-l_BGuke {
  overflow: hidden;
  height: 0;
  opacity: 0;
  transition: all 0.5s;
}
.list-wrapper .normal_1DHjU {
  transition: all 0.5s;
}

.detail-wrap_2xc0f {
  position: relative;
  overflow: hidden;
  height: 107px;
  border-radius: 12px;
}
.detail-wrap_2xc0f:hover {
  background: #F0F3FD;
}
.detail-wrap_2xc0f:hover .right .title_2nsqX a {
  color: #315EFB;
}
.img-wrapper_2A-dm {
  position: absolute;
  display: block;
  overflow: hidden;
  border-radius: 12px;
  background-color: #FFF;
}
.img-wrapper_2A-dm .border_8ZhG6 {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}
.img-wrapper_2A-dm .index_2IhVQ {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  width: 22px;
  border-radius: 8px 1px 8px 1px;
  font-weight: normal;
}
.img-wrapper_2A-dm img {
  width: 100%;
  height: 100%;
}
.imgSizeW_3l7yX {
  height: 80px;
  width: 128px;
}
.rank-container_janGC {
  display: inline-block;
}
.diamond_3mTZ1 {
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 12px 1px 12px 1px;
  text-align: center;
  color: #FFFFFF;
  background: #FAA90E;
  font-size: 12px;
}
.right {
  margin-left: 92px;
}
.right.margin-left-w_2PKuE {
  margin-left: 140px;
}
.right .title_2nsqX {
  display: block;
  overflow: hidden;
  margin-top: 8px;
  font-size: 14px;
  line-height: 16px;
}
.right .title_2nsqX .multi-line-title_1zbzE {
  display: inline-block;
  max-width: 160px;
  max-height: 72px;
  line-height: 24px;
  margin-top: -4px;
  white-space: pre-line;
  word-break: break-all;
}
.right .title_2nsqX .single-line-title_12FSy {
  display: inline-block;
  max-width: 160px;
}
.right .title_2nsqX .behind-tag_6GBAd {
  margin-left: 4px;
  margin-top: -3px;
}
.right .title_2nsqX .live-icon_2hJB1 {
  width: 62px;
  height: 16px;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 3px;
}
.right .desc_dLINu {
  display: block;
  margin-top: 3px;
}
.right .desc_dLINu span {
  display: block;
  font-size: 13px;
  line-height: 22px;
  max-width: 276px;
}
.c-text{display:inline-block;padding:2px;text-align:center;vertical-align:text-bottom;font-size:12px;line-height:100%;font-style:normal;font-weight:400;color:#fff;overflow:hidden}
a.c-text,a.c-text:hover,a.c-text:active,a.c-text:visited{color:#fff;text-decoration:none}
.c-text-new{background-color:#f13f40}
.c-text-info{padding-left:0;padding-right:0;font-weight:700;color:#2b99ff;*vertical-align:baseline;_position:relative;_top:2px}
a.c-text-info,a.c-text-info:hover,a.c-text-info:active,a.c-text-info:visited{color:#2b99ff}
.c-text-info b{_position:relative;_top:-1px}
.c-text-info span{padding:0 2px;font-weight:400}
.c-text-important{background-color:#1cb7fd}
.c-text-public{background-color:#2b99ff}
.c-text-warning{background-color:#ff830f}
.c-text-prompt{background-color:#f5c537}
.c-text-danger{background-color:#f13f40}
.c-text-safe{background-color:#52c277}
.normal-col_3tCxq {
  display: inline-block;
  line-height: 20px;
  margin-left: 2px;
}
</style>