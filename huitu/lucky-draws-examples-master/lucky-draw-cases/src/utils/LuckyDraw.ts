/*
 * @Author: Lee
 * @Date: 2023-01-11 15:17:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-01-13 11:30:45
 * @Description: 抽奖工具
 */

/**********************
 ** 【滚动抽奖】参数类型
 **********************/
interface LuckyDrawOptions {
  /** 容器元素，用于设置其 translateX 以达到位移效果 */
  wrap: HTMLElement;
  /** 中奖物品标识（ID） */
  winningID: string | number;
  /** 存有所有奖品标识（ID）的字符串数组 */
  winningIDs: Array<string | number>;
  /** 奖品元素宽度（不考虑间距） */
  itemWidth: number;
  /** 可视区域一屏展示的奖品个数 */
  visibleItemCount: number;
  /** 回调，抽奖动效结束之后的回调 */
  completed: Function;
  /** 开始音效，动画执行过程中的音效 */
  audioUriForStart?: string;
  /** 结束音效，动画执行结束时的音效*/
  audioUriForEnd?: string;
  /** 持续时间，默认10s（注意：持续时间必须与开始音效的持续时间保持一致，效果更好） */
  duration?: number;
  /** 是否启用动画 (默认true)*/
  openAnimation?: boolean;
  /** 是否启用音效 (默认true)*/
  openSound?: boolean;
}

/**********************
 ** 【转盘抽奖】参数类型
 **********************/
interface TurntableOptions {
  /** 大转盘元素 */
  wrap: HTMLElement;
  /** 奖品数量 */
  count: number;
  /** 中奖下标 */
  index: number;
  /** 大转盘结束 */
  completed: Function;
  /** 开始音效，动画执行过程中的音效 */
  audioUriForStart?: string;
  /** 结束音效，动画执行结束时的音效*/
  audioUriForEnd?: string;
  /** 是否启用音效 (默认true)*/
  openSound?: boolean;
  /** 旋转圈数（默认3） */
  loop?: number;
  /** 持续时间（默认5） */
  duration?: number;
}

/**********************
 ** 【九宫格】参数类型
 **********************/
interface LatticeOptions {
  /** 奖品元素的class */
  elClass: string;
  /** 中奖下标 */
  winningIndex: number;
  /** 回调，抽奖动效结束之后的回调 */
  completed: Function;
  /** 旋转圈数（默认8） */
  loop?: number;
}

class LuckyDraw {
  /**
   * 播放音效
   * @param uri 音效地址
   */
  static playAudio(uri: string) {
    const audio = new Audio(uri);
    audio.play();
    audio.onended = function () {
      audio.src = '';
      audio.srcObject = null;
      audio.remove();
    };
  }

  /**
   * 【滚动抽奖】获取页面呈现的奖品数据源
   *
   * @param configs
   * @returns
   */
  static getLuckyDrawDataList<T>(configs: {
    /** 数据源（后端返回的数据） */
    source: Array<T>;
    /** 生成个数（界面需要展示的元素个数，用于撑起容器的宽度） */
    total: number;
    /** 可视个数（即在外层容器宽度内一屏展示的个数-奇数） */
    visibleCount: number;
  }): Array<T> {
    // -- 解构数据
    const { source, total, visibleCount } = configs;
    // -- 创建数组，默认为数据源的数据
    const t = [...source];
    // -- 计算数据源数据的条数
    const len = source.length;
    // -- 计算后置填充的数据条数
    const tail = Math.floor(visibleCount / 2);
    // -- 前置填充
    while (t.length < total - tail) {
      const i = Math.floor(Math.random() * len);
      t.unshift(source[i]);
    }
    // -- 后置填充
    while (t.length < total) {
      const i = Math.floor(Math.random() * len);
      t.push(source[i]);
    }
    return t;
  }

  /**
   * 【滚动抽奖】
   * @param options
   */
  static draw(options: LuckyDrawOptions) {
    // -- 解构参数，处理默认值
    const {
      itemWidth,
      wrap,
      completed,
      winningID,
      winningIDs,
      visibleItemCount,
      audioUriForStart,
      audioUriForEnd,
      duration = 10,
      openAnimation = true,
      openSound = true,
    } = options;
    // -- 每次触发动画之前先复位状态
    wrap.style.transition = `transform 0s ease 0s`;
    wrap.style.transform = `translateX(0px)`;
    // -- 满足条件：播放开始音效
    if (openSound && openAnimation && audioUriForStart) {
      LuckyDraw.playAudio(audioUriForStart);
    }
    // -- 在屏幕刷新周期内，如果重复设置 style 无视觉效果
    // -- 所以调用 requestAnimationFrame 在下一周期内开始抽奖动效
    requestAnimationFrame(() => {
      // -- 查询中奖物品的下标（从后往前查找），便于计算位移距离
      /**
       * 特殊处理：
       * 1. 查询一屏展示的元素中（奇数个）中间元素的下标，如一屏展示5个，则中间元素为第3个元素，其下标为2，
       *    📌 计算公式：mIndex = Math.floor(visibleItemCount / 2)
       * 2. 动态计算截取长度，假设一屏展示5个元素，如果中奖元素刚好是最后一个，当我们执行动效把最后一个元素呈现在最中间时，
       *    最后两个元素的区域会是空白的，为了解决这个问题，我们必须考虑在最后预留两个元素作为填充，不计入计算中奖下标的位置。
       *    填充多少个元素在末尾不参与计算，可参照如下公式：
       *    📌 计算公式：winningIDs.slice(0, winningIDs.length - mIndex)
       */
      const mIndex = Math.floor(visibleItemCount / 2);
      const slice = winningIDs.slice(0, winningIDs.length - mIndex);
      const index = slice.lastIndexOf(winningID);
      // -- 未找到中奖物品，终止程序
      if (index === -1) return;
      // -- 动态计算偏移
      const offset = -(index - mIndex) * itemWidth;
      // -- 收尾函数
      const handleStop = () => {
        if (openSound && audioUriForEnd) {
          LuckyDraw.playAudio(audioUriForEnd);
        }
        completed();
      };
      // -- 判断是否启用动画
      if (openAnimation) {
        wrap.style.transition = `transform ${duration}s cubic-bezier(0.35, 0.08, 0.26, 0.93) 0s`;
        wrap.style.transform = `translateX(${offset}px)`;
        wrap.ontransitionend = function () {
          handleStop();
        };
      } else {
        wrap.style.transform = `translateX(${offset}px)`;
        handleStop();
      }
    });
  }
  /**
   * 【大转盘】
   *
   * 分析：每个奖品所占的角度是一致的，即平均分配一个圆，通常，命中某个奖品指针指向奖品正中间。
   * 思路：通过 transform/transition 实现大转盘的动画效果，监听 transitionend 事件，归位大转盘。
   * 计算：
   *  1. 奖品所占角度：360 / 奖品数量（设为x）
   *  2. 中奖位置计算：x * index +- x / 2 （index表示奖品下标位置，+-取决于顺时针还是逆时针）
   *  3. 如果打算转满5圈，则：5 * 360 + 中奖位置
   *
   * @param options
   */
  static turntable(options: TurntableOptions) {
    // -- 解构
    const {
      wrap,
      count,
      index,
      completed,
      openSound = true,
      audioUriForStart,
      audioUriForEnd,
      loop = 3,
      duration = 5,
    } = options;
    // -- 每次触发动画之前先复位状态
    wrap.style.transition = `transform 0s ease 0s`;
    wrap.style.transform = `rotateZ(0deg)`;
    // -- 计算奖品所占角度
    const deg = 360 / count;
    const rotate = loop * 360 + deg * index + deg / 2;
    // -- 满足条件：播放开始音效
    if (openSound && audioUriForStart) {
      LuckyDraw.playAudio(audioUriForStart);
    }
    // -- 设置
    requestAnimationFrame(() => {
      wrap.style.transition = `transform ${duration}s cubic-bezier(0.35, 0.08, 0.26, 0.93) 0s`;
      wrap.style.transform = `rotateZ(${rotate}deg)`;
      wrap.ontransitionend = function () {
        if (openSound && audioUriForEnd) {
          LuckyDraw.playAudio(audioUriForEnd);
        }
        completed();
      };
    });
  }

  /**
   * 【九宫格】
   * @param options
   */
  static lattice(options: LatticeOptions) {
    // -- 解构
    const { elClass, winningIndex, completed, loop = 8 } = options;
    // -- 获取元素
    const doms = document.querySelectorAll(`.${elClass}`);
    const len = doms.length;
    // -- 清空上一次抽奖时的状态
    doms.forEach((dom) => dom.classList.remove('active'));
    // -- 定义变量
    let index = 0; /** 记录当前激活元素的下标 */
    let lastIndex = 0; /** 记录上次激活元素的下标 */
    let speed = 250; /** 初始速度，用于设置定时器的interval参数 */
    let times = loop * len + winningIndex + 1; /** 高亮总次数*/
    let startEndTimes = 10; /** 开始和结束时的缓冲次数 */
    let startTimes = times - startEndTimes; /** 开始循环缓冲次数 */
    let endTimes = startEndTimes; /** 结束循环缓冲次数 */
    let timer = 0; /** 定时器 */

    // -- 动画函数
    const running = () => {
      // 移除上一次激活状态元素的样式
      doms[lastIndex].classList.remove('active');
      // 设置当前激活状态元素的样式
      doms[index].classList.add('active');
      // 赋值lastIndex
      lastIndex = index;
      // 当前次数+1
      index++;
      // 如果+1之后的元素大于数组长度-1，则复位（满足条件，则表示已转慢一圈）
      if (index > len - 1) {
        index = 0;
      }
      // 循环次数-1
      times--;
      // 「开始阶段」，speed 加速，减少值
      if (times >= startTimes) {
        speed -= 20;
      }
      // 「结束阶段」，speed 减速，增加值
      if (times <= endTimes) {
        speed += 20;
      }
      // 判断是否结束
      if (times <= 0) {
        clearTimeout(timer); // 停止计时器，释放资源
        completed(); // 调用完成回调函数
        return false; // 终止函数运行，结束循环。
      }
      // 「正常阶段」
      timer = setTimeout(running, speed);
    };
    // -- 开始动画
    timer = setTimeout(running, speed);
  }
}

export default LuckyDraw;
