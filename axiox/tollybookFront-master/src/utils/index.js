import axios from "./axios";

export const get = axios.get;

export const post = axios.post;

export const typeMap = {
    1: {
      icon: 'icon-gift'
    },
    2: {
      icon: 'icon-integral'
    },
    3: {
      icon: 'icon-rmb'
    },
    4: {
      icon: 'icon-stop-fill'
    },
    5: {
      icon: 'icon-cart-Empty'
    },
    6: {
      icon: 'icon-image-text'
    },
    7: {
      icon: 'icon-loading'
    },
    8: {
      icon: 'icon-Moneymanagement'
    },
    9: {
      icon: 'icon-map'
    },
    10: {
      icon: 'icon-operation'
    },
    11: {
      icon: 'icon-packaging'
    },
    12: {
      icon: 'icon-success'
    },
    13: {
      icon: 'icon-order-fill'
    },
    14: {
      icon: 'icon-phone-fill'
    },
    15: {
      icon: 'icon-collection'
    },
    16: {
      icon: 'icon-feed-logo-fill'
    }
  }

  export const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
  };
  
  export const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
  };