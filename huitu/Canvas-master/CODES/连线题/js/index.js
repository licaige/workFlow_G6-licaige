/*
连线答案的数据结构：
const values = {
  水果: '🥕',
  动物: '🚗',
  汽车: '🐒',
  蔬菜: '🍌',
}*/

// 第1步：获取Canvas & 配置画笔
const canvas = document.getElementById("canvas");
const backCanvas = document.getElementById("backCanvas");
canvas.width = backCanvas.width = 400;
canvas.height = backCanvas.height = 250;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const backCtx = backCanvas.getContext("2d");

ctx.strokeStyle = backCtx.strokeStyle = '#6495ED';
ctx.lineWidth = backCtx.lineWidth = 1;


// 第2步：获取列表元素，挂载后续操作所需的数据
const tag = 'v__' + Math.random().toString(36).slice(2);
const options = document.querySelectorAll('.container .option');
options.forEach(item => {
  // 获取元素在屏幕上的信息
  const { width, height } = item.getBoundingClientRect();
  // 获取元素归属：左侧还是右侧·用于计算元素锚点坐标
  const ownership = item.dataset.ownership;
  // 记录元素锚点坐标
  const anchorX = ownership === 'L' ? item.offsetLeft + width : item.offsetLeft;
  const anchorY = item.offsetTop + height / 2;
  item.dataset.anchorX = anchorX;
  item.dataset.anchorY = anchorY;

  // 标识当前元素是否连线
  item.dataset.checked = '0';
  // 标识当前元素为连线元素
  item.dataset.tag = tag;

  // 绘制锚点，查看锚点位置是否准确（临时代码）
  ctx.beginPath();
  ctx.arc(anchorX, anchorY, 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
});



// 第3步：绑定事件
options.forEach((item) => (item.onmousedown = onMousedown));
document.onmousemove = onMousemove;
document.onmouseup = onMouseup;


// 第4步：连线相关（核心逻辑）
let trigger = false; // 标识是否触发连线
let startPoint = { x: 0, y: 0 }; // 记录每一次连线开始点
let endPoint = { x: 0, y: 0 }; // 记录每一次连线结束点
let startElement = null; // 记录每一次连线开始元素
let endElement = null; // 记录每一次连线结束元素
let backLines = []; // 记录已经连接好的线·数据结构 
let anwsers = {}; // 记录答案

function onMousedown(event) {
  // 高亮显示按下的元素
  this.classList.add('active');
  // 记录每一次连线的开始元素
  startElement = this;
  // 更新每一次连线开始点信息
  startPoint.x = +this.dataset.anchorX;
  startPoint.y = +this.dataset.anchorY;
  // 标识触发连线，用于在mousemove中判断是否需要处理后续的逻辑
  trigger = true;
  // 阻止时间冒泡/默认行为
  event.stopPropagation();
  event.preventDefault();
}


function onMousemove(event) {
  if (trigger) {
    /****************
     * 处理连线
     ****************/

    // 获取鼠标在屏幕上的位置
    const { clientX, clientY } = event;

    // 计算鼠标在画板中的位置
    const { left, top } = canvas.getBoundingClientRect();
    const endPoint = {
      x: clientX - left,
      y: clientY - top
    }

    // 连线：实际画板
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();
    ctx.stroke();

    /****************
     * 处理后续逻辑
     ****************/

    // 获取鼠标经过的元素
    const overElement = document.elementFromPoint(clientX, clientY);
    // 获取开始元素归属：左侧还是右侧
    const ownership = startElement.dataset.ownership;
    // 如果鼠标经过的元素等于目标元素，不作任何处理
    if (overElement === endElement) return;


    // 判断是否命中目标元素，条件如下（同时满足）
    // ① 鼠标经过的元素必须必须是连线元素（可通过判断 data-tag 是否和设置的tag一致即可）
    // ② 鼠标经过的元素和开始元素不在同一侧
    // ③ 鼠标经过的元素未被连线
    const condition1 = overElement.dataset.tag === tag;
    const condition2 = overElement.dataset.ownership !== ownership;
    const condition3 = overElement.dataset.checked !== '1';
    if (condition1 && condition2 && condition3) {
      // 记录目标元素
      endElement = overElement;
      // 更新目标元素状态（高亮显示）
      endElement.classList.add('active');
      // 将开始元素和目标元素表示为已连线
      endElement.dataset.checked = '1';
      startElement.dataset.checked = '1';
    }
    // 如果没有命中目标元素，但是目标元素又存在，则移除相关状态
    else if (endElement) {
      endElement.classList.remove('active');
      endElement.dataset.checked = startElement.dataset.checked = '0';
      endElement = null;
    }
  }
  // 阻止事件冒泡/默认行为
  event.stopPropagation();
  event.preventDefault();
}

function onMouseup(event) {
  if (!trigger) return;

  // 如果开始元素存在且未被连线，则恢复开始元素的状态
  if (startElement && startElement.dataset.checked !== '1') {
    startElement.classList.remove('active');
  }
  // 完成连线：开始元素和目标元素同时存在，并且被标识选中
  if (startElement && endElement && startElement.dataset.checked === '1' && endElement.dataset.checked === '1') {
    // 获取连线始末坐标点
    const { anchorX: x1, anchorY: y1 } = startElement.dataset;
    const { anchorX: x2, anchorY: y2 } = endElement.dataset;
    // 获取开始元素归属：左侧还是右侧
    const ownership = startElement.dataset.ownership;

    // 获取开始元素和目标元素的值
    const startValue = startElement.dataset.value;
    const endValue = endElement.dataset.value;

    // 判断开始元素是否已经连线
    const keys = Object.keys(anwsers);
    const values = Object.values(anwsers);
    if (keys.includes(startValue) || values.includes(startValue)) {
      // 已连线，处理步骤
      // ① 找到已连线的目标元素的value·注意：可能在Map结构的左侧，也可能在右侧
      let key = '';
      let value = '';
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = values[i];
        if ([k, v].includes(startValue)) {
          key = k;
          value = k === startValue ? v : k;
          break;
        }
      }
      // ② 根据targetValue找到目标元素
      const sel = `[data-value=${value}]`;
      const tarElement = document.querySelector(sel);
      // ③ 恢复目标元素的状态（标识+高亮状态）
      tarElement.dataset.checked = '0';
      tarElement.classList.remove('active');
      // ④ 将对应的数据从记录中移除（因为后面会重新插入数据）
      delete anwsers[key];
      const index = backLines.findIndex((item) => item.key === key);
      if (index >= 0) {
        backLines.splice(index, 1);
      }
    }

    // 未连线
    const k = ownership === 'L' ? startValue : endValue;
    const v = ownership === 'L' ? endValue : startValue;
    anwsers[k] = v;
    backLines.push({
      key: k,
      point: { x1, y1, x2, y2 },
    });
    drawLines();

  }

  // 恢复元素状态
  trigger = false;
  startElement = null;
  endElement = null;
  // 清空实际连线画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 阻止事件冒泡/默认行为
  event.stopPropagation();
  event.preventDefault();
}
// -- 模拟连线
function drawLines() {
  backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
  backLines.forEach(({ point: { x1, y1, x2, y2 } }) => {
    backCtx.beginPath();
    backCtx.moveTo(x1, y1);
    backCtx.lineTo(x2, y2);
    backCtx.closePath();
    backCtx.stroke();
  });
}


// 第5步：重置
// ① 清空模拟连线画布
// ② 恢复元素初始状态
// ③ 置空连线记录和答案
const btnReset = document.querySelector('.reset');
btnReset.onclick = function () {
  backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
  options.forEach((item) => {
    item.classList.remove('active');
    item.dataset.checked = '0';
  });
  anwsers = {};
  backLines = [];
}

// 第6步：撤销
// ① 将最后一次连线的数据从连线记录中移除
// ② 获取连线元素并恢复其初始状态
// ③ 重新绘制模拟连线
const btnUndo = document.querySelector('.undo');
btnUndo.onclick = function () {
  const line = backLines.pop();
  if (line) {
    const { key } = line;
    const leftSel = `[data-value="${key}"]`;
    const rightSel = `[data-value="${anwsers[key]}"]`;
    delete anwsers[key];
    const leftElement = document.querySelector(leftSel);
    const rightElement = document.querySelector(rightSel);
    if (leftElement && rightElement) {
      leftElement.dataset.checked = rightElement.dataset.checked = '0';
      leftElement.classList.remove('active');
      rightElement.classList.remove('active');
      drawLines();
    }
  }
}

// 第7步：保存连线记录
const saveAnwsers = () => {
  if (Object.keys(anwsers).length > 0) {
    localStorage.setItem('ANWSERS', JSON.stringify(anwsers));
    console.log('保存成功');
  } else {
    console.log('没有可保存的数据');
  }
}
const btnSave = document.querySelector('.save');
btnSave.onclick = saveAnwsers;

// 第8步：删除连线记录
const btnDelete = document.querySelector('.delete');
btnDelete.onclick = () => {
  localStorage.removeItem('ANWSERS');
  console.log('删除成功');
};


// 第9步：读取答案
// ① 从本地读取数据
// ② 判断数据是否存在，如果存在，则遍历数据做后续处理
// ③ 获取每一条线路的开始元素和目标元素
// ④ 更新开始元素和目标元素的状态：选中状态/高亮显示
// ⑤ 计算连线坐标
// ⑥ 拼装数据并绘制到模拟连线画板上
const showAnwsers = () => {
  const localAnwsers = localStorage.getItem('ANWSERS');
  if (localAnwsers) {
    anwsers = JSON.parse(localAnwsers);
    const keys = Object.keys(anwsers);
    keys.forEach((key) => {
      const value = anwsers[key];
      // 获取开始元素和目标元素
      const leftSel = `[data-value="${key}"]`;
      const rightSel = `[data-value=${value}]`;
      const leftElement = document.querySelector(leftSel);
      const rightElement = document.querySelector(rightSel);
      if (leftElement && rightElement) {
        // 更新选中状态
        leftElement.dataset.checked = rightElement.dataset.checked = '1';
        // 高亮显示元素
        leftElement.classList.add('active');
        rightElement.classList.add('active');
        // 计算坐标
        const { anchorX: x1, anchorY: y1 } = leftElement.dataset;
        const { anchorX: x2, anchorY: y2 } = rightElement.dataset;
        // 拼装数据
        backLines.push({
          key,
          point: { x1, y1, x2, y2 },
        });
      }
    });
    drawLines();
  } else {
    console.log("没有可回显的数据")
  }
}
const btnShow = document.querySelector('.read');
btnShow.onclick = showAnwsers;

// 第10步：纠错
// ① 从本地读取数据
// ② 判断数据是否存在，如果存在，则遍历数据做后续处理
// ③ 获取每一条线路的开始元素和目标元素
// ④ 更新开始元素和目标元素的状态：选中状态/高亮显示
// ⑤ 计算连线坐标
// ⑥ 拼装数据并绘制到模拟连线画板上
const standardAnwsers = {
  水果: '🍌',
  动物: '🐒',
  汽车: '🚗',
  蔬菜: '🥕',
};
const checkAnwsers = () => {
  // 获取答案keys
  const keys = Object.keys(anwsers);
  if (keys.length === 0) {
    console.log('没有可纠错的答案');
    return;
  }
  // 定义变量，记录连线信息
  const lines = [];
  // 遍历keys
  keys.forEach((key) => {
    const value = anwsers[key];
    /****************
     * 找到用户连线的数据
     ****************/
    const leftSel = `[data-value="${key}"]`;
    const rightSel = `[data-value=${value}]`;
    const leftElement = document.querySelector(leftSel);
    const rightElement = document.querySelector(rightSel);
    if (leftElement && rightElement) {
      // 更新选中状态
      leftElement.dataset.checked = rightElement.dataset.checked = '1';
      // 高亮显示元素
      leftElement.classList.add('active');
      rightElement.classList.add('active');
      // 计算坐标
      const { anchorX: x1, anchorY: y1 } = leftElement.dataset;
      const { anchorX: x2, anchorY: y2 } = rightElement.dataset;
      /****************
       * 处理纠错逻辑
       ****************/
      // 获取答案
      const anwser = standardAnwsers[key];
      // 拼装数据
      lines.push({
        isOk: value === anwser,
        point: { x1, y1, x2, y2 },
      });
    }
  });
  // 绘制模拟连线画板
  backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
  lines.forEach(({ isOk, point: { x1, y1, x2, y2 } }) => {
    backCtx.strokeStyle = isOk ? '#3CB371' : '#DC143C';
    backCtx.beginPath();
    backCtx.moveTo(x1, y1);
    backCtx.lineTo(x2, y2);
    backCtx.stroke();
  });
}
const btnCheck = document.querySelector('.check');
btnCheck.onclick = checkAnwsers;








