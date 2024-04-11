// 防抖函数：一段时间后执行，如果在这段时间内再次触发，会重新计时
// 实际应用1：echarts改变浏览器宽度时需要重新渲染，可以使用此函数提升性能
// 实际应用2：输入搜索，n秒后才会进行搜索请求，n秒内再次输入就重新计时
// 实际应用3：图片懒加载，滑到一个地方，n秒后找到可视区域内的img标签，将data-src中的路径赋值给src实现懒加载
export function debounce (fn, delay) {
  let timer = null
  delay = delay ? delay : 300;
  return function() {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
          fn.apply(self, args);
          timer = null;
      }, delay);
  };
}

// 节流函数：当持续触发事件时，保证一段时间内只调用一次
// 实际应用：提交表单时，n秒内多次点击只会执行一次
export function throttle (fn, delay) {
  let timer = null
  delay = delay ? delay : 300;
  return function () {
    if (!timer) {
      let self = this;
      let args = arguments;
      timer = setTimeout(() => {
        fn.apply(self, args);
        timer = null
      }, delay)
    }
  }
}

export const sin = (deg) => {
  return Math.sin(deg * Math.PI / 180)
}

export const cos = (deg) => {
  return Math.cos(deg * Math.PI / 180)
}

export const tan = (deg) => {
  return Math.tan(deg * Math.PI / 180)
}

export const asin = (sin) => {
  return Math.round(Math.asin(sin) * 180 / Math.PI)
}

export const acos = (cos) => {
  return Math.round(Math.acos(cos) * 180 / Math.PI)
}

export const atan = (tan) => {
  return Math.round(Math.atan(tan) * 180 / Math.PI)
}

// 最简单深拷贝，支持Date、RegExp，支持循环引用，且不会断开对象中的引用联系
export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null) {
    return obj
  }
  if (typeof obj !== 'object') {
    return obj
  }
  if (hash.get(obj)) {
    return hash.get(obj)
  }
  const newObj = new obj.constructor
  hash.set(obj, newObj)
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = deepClone(obj[i], hash)
    }
  }
  return newObj
}
// 更简单深拷贝！！！！
// 当消息包含函数、Symbol等不可序列化的值时，就会报无法克隆的DOM异常
export const deepClone2 = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      const { port1, port2 } = new MessageChannel()
      port2.onmessage = (msg) => {
        resolve(msg.data)
      }
      port1.postMessage(obj)
    } catch (e) {
      reject(e)
    }
  })
}


// -----------------------------解决小数加减丢失精度的问题----------------------------------------
export function add (a) {
  if (!a) return result
  else {
    result = a
    return function (a) {
      let [val1, val2, val3] = [
        result + a,
        (result * 10 + a * 10) / 10,
        (result / 10 + a / 10) * 10
      ]
      return add((val1 == val2 || val1 == val3) ? val1 : val2)
    }
  }
}
// add(0.1)(0.2)()  // 0.3
// -----------------------------解决小数加减丢失精度的问题----------------------------------------

/**
 * 获取数据类型
 * @params: v
 */
export function getType(v) {
  if (typeof v == 'object') {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
  } else {
    return typeof v
  }
}

// ----------------------------处理日期格式开始-----------------------------------

const showTime = (t) => {
  var time;
  time = t >= 10 ? t : "0" + t;
  return time;
};

export const formatTime = (time) => {
  if ((isNaN(time) && !isNaN(Date.parse(time))) || time instanceof Date) {
    let year = new Date(time).getFullYear();
    let month = showTime(new Date(time).getMonth() + 1);
    let day = showTime(new Date(time).getDate());
    return year + "-" + month + "-" + day;
  } else {
    return "xxxx-xx-xx";
  }
};
// ----------------------------处理日期格式结束-----------------------------------