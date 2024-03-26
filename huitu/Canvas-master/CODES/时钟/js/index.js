
/*
    sinα: 对边/斜边   -> sinα = y/r -> y = sinα * r
    cosα：邻边/斜边   -> cosα = x/r -> x = cosα * r

    弧度 = 弧长 / 半径

    一个圆的弧长 2πr -> 1°的弧长 2πr/360 -> 1°的弧度 2π/360
*/

(function () {

    // 1. 获取画布
    let clockCanvas = document.querySelector(`#clock-canvas`);
    let clockDes    = document.querySelector(`#clock-des`);
    // 2. 获取画布上下文
    let ctx         = clockCanvas.getContext(`2d`);
    // 3. 根据画布大小计算圆半径
    let width       = ctx.canvas.width;
    let height      = ctx.canvas.height;
    let r           = width / 2;
    // 4. 绘制时钟
    draw();
    setInterval(draw, 1000);


    function draw() {
        // 每一次绘制都得清除上一次的效果
        ctx.clearRect(0, 0, width, height);
        // 获取当前系统时间
        let now    = new Date(),
            hour   = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        updateDes(hour, minute, second);
        // 存档
        ctx.save();
        drawBackground();
        drawHour(hour, minute);
        drawMinute(minute);
        drawSecond(second);
        drawDot();
        // 回档
        ctx.restore();
    }
    function drawBackground() {
        // 1. 绘制外圆
        // 将绘制原点移动至圆心位置
        ctx.translate(r, r);
        // 设置线条宽度
        ctx.lineWidth = 10;
        // 开始绘制
        ctx.beginPath();
        // 绘制圆形路径
        ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false);
        // 绘制线条
        ctx.stroke();

        // 2. 绘制小时数字
        // 因为arc从3点钟方向开始绘制，所以数组存储小时数时，从数字3开始存储
        let hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        // 设置字体样式和大小
        ctx.font = `18px Arial`;
        // 设置字体水平对齐方式
        ctx.textAlign = `center`;
        // 设置字体垂直对齐方式
        ctx.textBaseline = `middle`;
        // 遍历数组绘制文字
        hourNumbers.forEach((number, i) => {
            // 获取弧度 2π = 360°
            let rad = 2 * Math.PI / 12 * i;
            // 根据最开始推算出的公式计算x坐标,-30的目的是为了数字往里面缩一点
            let x   = Math.cos(rad) * (r - 30);
            // 根据最开始推算出的公式计算y坐标,-30的目的是为了数字往里面缩一点
            let y   = Math.sin(rad) * (r - 30);
            // 绘制文本
            ctx.fillText(number, x, y);
        });

        // 3. 通过循环绘制小圆点（一个小时60分钟，所以有60个小圆点）
        for(let i = 0; i < 60; i++) {
            // 计算小圆点弧度
            let rad = 2 * Math.PI / 60 * i;
            // 根据最开始推算出的公式计算x坐标,-15的目的是为了数字往里面缩一点
            // 为什么是-15呢？因为要把小圆点放置在外圆和数字中间
            let x   = Math.cos(rad) * (r - 15);
            // 根据最开始推算出的公式计算y坐标,-15的目的是为了数字往里面缩一点
            let y   = Math.sin(rad) * (r - 15);
            ctx.beginPath();
            // 判断，设置整时对应的小圆点样式
            if(i % 5 === 0) {
                ctx.fillStyle = `#000`;
                ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
            }else {
                ctx.fillStyle = `#ccc`;
                ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
            }
            ctx.fill();
        }
    }
    function drawHour(hour, minute) {
        // 存档
        ctx.save();
        // 计算小时弧度
        let rad  = 2 * Math.PI / 12 * hour;
        // 计算分钟弧度
        let mrad = 2 * Math.PI / 12 / 60 * minute;
        // 设置画布旋转角度
        ctx.rotate(rad + mrad);
        // 设置线条宽度
        ctx.lineWidth = 6;
        // 设置线条断点样式
        ctx.lineCap = `round`;
        // 开始绘制
        ctx.beginPath();
        // 设置起始点，y轴为10意为尾部支出10像素，好看一些
        ctx.moveTo(0, 10);
        // 设置结束点
        ctx.lineTo(0, -r / 2);
        // 绘制
        ctx.stroke();
        // 回档
        ctx.restore();
    }
    function drawMinute(minute) {
        // 存档
        ctx.save();
        // 计算分钟弧度
        let rad = 2 * Math.PI / 60 * minute;
        // 旋转画布
        ctx.rotate(rad);
        // 设置线条宽度
        ctx.lineWidth = 3;
        // 设置线条断点样式
        ctx.lineCap = `round`;
        // 开始绘制
        ctx.beginPath();
        // 设置起始点，y轴为10意为尾部支出10像素，好看一些
        ctx.moveTo(0, 10);
        // 设置结束点
        ctx.lineTo(0, -r + 30);
        // 绘制
        ctx.stroke();
        // 回档
        ctx.restore();
    }
    function drawSecond(second) {
        // 存档
        ctx.save();
        // 获取秒钟弧度
        let rad = 2 * Math.PI / 60 * second;
        // 设置旋转角度
        ctx.rotate(rad);
        // 设置填充颜色
        ctx.fillStyle = `#c14543`;
        // 开始绘制
        ctx.beginPath();
        // 设置起始点
        ctx.moveTo(-2, 20);
        ctx.lineTo(2, 20);
        ctx.lineTo(1, -r + 18);
        ctx.lineTo(-1, -r + 18);
        // 填充
        ctx.fill();
        // 回档
        ctx.restore();
    }
    function drawDot() {
        ctx.beginPath();
        ctx.fillStyle = `#ffffff`;
        ctx.arc(0, 0, 3, 0,  Math.PI, true);
        ctx.fill();
    }
    function updateDes(hour, minute, second) {
        hour = hour < 10 ? (`0` + hour) : hour;
        minute = minute < 10 ? (`0` + minute) : minute;
        second = second < 10 ? (`0` + second) : second;
        clockDes.textContent = `北京时间：${hour}时${minute}分${second}秒`;

    }
})();
