// 实现思路：监听鼠标事件，用drawCircle()方法把记录的数据画出来。

// 设置初始化当前画布功能为画笔状态，painting = false，
// 当鼠标按下时（mousedown），把painting设为true，表示正在画，鼠标没松开。把鼠标点记录下来。
// 当按下鼠标的时候，鼠标移动（mousemove）就把点记录下来并画出来。
// 如果鼠标移动过快，浏览器跟不上绘画速度，点与点之间会产品间隙，所以我们需要将画出的点用线连起来（lineTo()）。
// 鼠标松开的时候（mouseup），把painting设为false。

// 1. 定义一些变量
/** 标识绘画状态 */
let painting = false;
/** 记录结束点位置（便于在绘制过程中，计算连线的起始点） */
let lastPoint = { x: 0, y: 0 };
/** 线条粗细边界值 */
let maxLineWidth = 20;
let minLineWidth = 1;
/** 绘画记录·列表 */
let histories = [];
/** 绘画记录·最大长度 */
let maxHistoriesLength = Infinity;
/** 绘画记录·下标（用于处理撤销和重做） */
let historiesIndex = -1;
/** 记录橡皮擦状态 */
let eraser = false;

// 2. 获取元素
/** 画板容器 */
const container = document.querySelector(".drawing-board");
/** 画板容器盒子信息 */
const containerRect = container.getBoundingClientRect();
/** 橡皮擦游标元素 */
const customCursor = document.querySelector(".drawing-board__cursor");

// 3. 获取画布 & 配置画笔
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".drawing-board__canvas");
canvas.width = containerRect.width;
canvas.height = containerRect.height;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000";
ctx.lineWidth = 2;
ctx.willReadFrequently = true;
ctx.lineCap = "round";
ctx.lineJoin = "round";

// -- 将初始画布存入历史记录
saveToHistories();

// 4. 事件监听 & 事件处理
// -- 事件监听
// -- Mobile
canvas.addEventListener("touchstart", start, { passive: false });
canvas.addEventListener("touchmove", move, { passive: false });
canvas.addEventListener("touchend", end, { passive: false });
// -- PC
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", move);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mouseleave", end);

// -- 事件处理函数
function start(e) {
  // -- 更新绘制状态
  painting = true;
  // -- 容器标识绘制状态
  container.classList.add("drawing");
  // -- 获取鼠标在画布中的位置
  const point = getCanvasPoint(e);
  // -- 记录当前位置，用于移动中计算连线坐标
  lastPoint = point;
  // -- 绘制圆点
  drawCircle(point.x, point.y, Math.ceil(ctx.lineWidth / 2));
  // -- 橡皮擦模式下，橡皮擦元素并更新橡皮擦游标位置
  if (eraser) {
    customCursor.style.display = "block";
    const { x, y } = getCanvasPoint(e);
    customCursor.style.left = x + "px";
    customCursor.style.top = y + "px";
  }
}

function move(e) {
  if (painting) {
    // -- 获取鼠标在画布中的位置
    const newPoint = getCanvasPoint(e);
    // -- 实时绘制线条
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    // -- 更新lastPoint
    lastPoint = newPoint;
    // -- 橡皮擦模式下，更新橡皮擦游标位置
    if (eraser) {
      const { x, y } = getCanvasPoint(e);
      customCursor.style.left = x + "px";
      customCursor.style.top = y + "px";
    }
  }
}

function end(e) {
  if (painting) {
    // -- 更新状态
    painting = false;
    // -- 移除容器标识绘制状态
    container.classList.remove("drawing");
    // -- 每次画完之后，将当前画板数据存入历史记录
    saveToHistories();
    // -- 橡皮擦模式下，隐藏橡皮擦游标元素
    if (eraser) {
      customCursor.style.display = "none";
    }
  }
}

// 6. 工具栏事件
// -- 画笔颜色
/**
 * ① 获取颜色拾取器
 * ② 监听值变化
 * ③ 更新画笔颜色
 * */
const inputColor = document.querySelector('[type="color"]');
inputColor.onchange = (e) => {
  ctx.strokeStyle = e.target.value;
};

// -- 画笔粗细
/**
 * ① 获取元素：增量按钮、减量按钮、画笔粗细值展示标签
 * ② 监听按钮点击事件
 * ③ 如果当前值抵达画笔粗细的边界值则不做处理，否则更新画笔粗细及页面显示
 * */
const btnIncrement = document.querySelector(".increment");
const btnDecrement = document.querySelector(".decrement");
const spanLineWidth = document.querySelector(".line-width .v");

btnIncrement.onclick = function () {
  if (ctx.lineWidth === maxLineWidth) return;
  ctx.lineWidth++;
  spanLineWidth.textContent = ctx.lineWidth;
  if (eraser) {
    customCursor.style.width = customCursor.style.height = ctx.lineWidth + "px";
  }
};
btnDecrement.onclick = function () {
  if (ctx.lineWidth === minLineWidth) return;
  ctx.lineWidth--;
  spanLineWidth.textContent = ctx.lineWidth;
  if (eraser) {
    customCursor.style.width = customCursor.style.height = ctx.lineWidth + "px";
  }
};

// -- 橡皮擦
/**
 * ① 获取橡皮擦元素
 * ② 监听点击事件
 * ③ 切换橡皮擦状态，如果为true时，移动鼠标使用canvas裁剪擦除画布
 * */
const btnEraser = document.querySelector(".eraser");
btnEraser.onclick = function () {
  eraser = !eraser;
  if (eraser) {
    // 设置为“目标擦除”模式
    ctx.globalCompositeOperation = "destination-out";
    // 更新橡皮擦按钮样式
    btnEraser.classList.add("active");
    // 设置橡皮擦游标尺寸（同画笔粗细）
    customCursor.style.width = customCursor.style.height = ctx.lineWidth + "px";
  } else {
    // 设置为“正常绘制”模式
    ctx.globalCompositeOperation = "source-over";
    // 更新橡皮擦按钮样式
    btnEraser.classList.remove("active");
  }
};

// -- 清除画布
/**
 * ① 获取按钮元素
 * ② 监听按钮点击事件
 * ③ 调用 ctx.clearRect 清除并存入历史记录
 * */
const btnClear = document.querySelector(".clear");
btnClear.onclick = function () {
  // -- 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // -- 将当前操作存入历史记录
  saveToHistories();
};
// -- 保存图片
/**
 * ① 获取按钮元素 & 监听按钮点击事件
 * ② 获取画布数据 canvas.toDateURL
 * ③ 在页面里创建并插入一个a标签，模拟点击下载
 * */
const btnSave = document.querySelector(".save");
btnSave.onclick = function () {
  const imgUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = imgUrl;
  a.download = "pic__" + Date.now();
  a.target = "_blank";
  a.click();
};

// -- 撤销（上一步）
const btnUndo = document.querySelector(".undo");
btnUndo.onclick = function () {
  // -- 判断是否抵达边界值
  if (historiesIndex === 0) return;
  // -- 下标-1
  --historiesIndex;
  // -- 根据下标，获取快照
  const snapshot = histories[historiesIndex];
  // -- 将快照呈现在画布上
  ctx.putImageData(snapshot.data, 0, 0);
};

// -- 重做（下一步）
const btnRedo = document.querySelector(".redo");
btnRedo.onclick = function () {
  // -- 判断是否抵达边界值
  if (historiesIndex === histories.length - 1) return;
  // -- 下标+1
  ++historiesIndex;
  // -- 根据下标，获取快照
  const snapshot = histories[historiesIndex];
  // -- 将快照呈现在画布上
  ctx.putImageData(snapshot.data, 0, 0);
};

// -- 历史记录
const btnRecord = document.querySelector(".record");
btnRecord.onclick = function () {
  console.log(histories);
};

// 7. 工具函数
/**
 * 绘制圆点
 * 鼠标按下时调用
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 */
function drawCircle(x, y, radius) {
  ctx.fillStyle = ctx.strokeStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

/**
 * 绘制线条
 * 鼠标移动时调用
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

/**
 * 获取指定元素在文档中的位置
 * @param {*} element
 * @returns
 */
function calcOffset(element) {
  let parentElement = element.offsetParent;
  const rect = {
    left: element.offsetLeft,
    top: element.offsetTop,
  };
  while (parentElement) {
    rect.left += parentElement.offsetLeft;
    rect.top += parentElement.offsetTop;
    parentElement = parentElement.offsetParent;
  }
  return rect;
}

/**
 * 存储历史记录
 */
function saveToHistories() {
  // -- 判断当前历史记录是否抵达边界值，如果抵达，则删除第1项并更新下标
  if (histories.length >= maxHistoriesLength) {
    histories.shift();
    historiesIndex--;
  }
  // -- 追加新纪录
  histories.push({
    data: ctx.getImageData(0, 0, canvas.width, canvas.height),
    timestamp: Date.now(),
  });
  historiesIndex++;
}

/**
 * 获取鼠标在画布中的位置
 * 兼容移动端
 * @param {*} e
 * @returns
 */
function getCanvasPoint(e) {
  let clientX = 0;
  let clientY = 0;
  if (e.customEvent) {
    clientX = e.x;
    clientY = e.y;
  } else {
    if (/touch/.test(e.type)) {
      clientX = e.touches[0].pageX;
      clientY = e.touches[0].pageY;
    } else {
      clientX = e.pageX;
      clientY = e.pageY;
    }
  }
  const rect = calcOffset(canvas);
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  return { x, y };
}
