/**

 * @author ChenJinZhu

 * @date 2023/4/12 11:43

 * @describe :

 */

let canvas = {}, ctx = {};

const image = new Image();

// 定义管线默认宽度
const PIPELINE_NUMBER = 15;

// 定义图标默认缩放比例
const ICON_SCALE_RATIO = 25;

// 所有绘制元素
let allElementCollection = [];

// 初始化管线水类型： 0为冷水 1为热水
let pipeline_water_type = 0;

// 当前绘制设备的数组
let equipment_select = {};

// 是否显示设备绘制的范围
let equipment_area_show = false

// 初始化绘制类型：0为管线 1为设备，2为文字框 默认为管线
let draw_element_type = 0;

// 管线流动速度初始值
let pipeline_offset = 0;

// 定义当前选中的已绘制元素
let current_select_element_index = {};


const canvasMousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    // 查询所点击元素是否存在
    const shape = getElement(clickX, clickY);
    if (shape) {
        moveAllElement(e, clickX, clickY, rect, shape);
        canvas.style.cursor= "move";
    } else {
        if (e.buttons === 1) {
            draw_element_type === 0 ? drawRealTimePipeline(e, clickX, clickY, rect) : (draw_element_type === 1 ? drawRealTimeEquipment(e, clickX, clickY, rect) : drawRealTimeText(e, clickX, clickY, rect))
        }
    }
};

// 绘制实时管线
const drawRealTimePipeline = (e, clickX, clickY, rect) => {
    const shape = new ElementFactory(clickX, clickY);
    shape.endX = clickX;
    shape.endY = clickY;
    delete shape.textInfo;
    delete shape.equipmentInfo;
    let shapeWidth = 0, shapeHeight = 0;
    let current_uid = setuid(shape);

    allElementCollection.push(shape);
    window.onmousemove = (evt) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapeWidth = (evt.clientX - rect.left) - clickX;
        shapeHeight = (evt.clientY - rect.top) - clickY;
        let shapeDirection = Math.abs(shapeWidth) >= Math.abs(shapeHeight);
        if (shapeDirection) {
            shape.endX = evt.clientX - rect.left;
            shape.endY = clickY + PIPELINE_NUMBER;
        } else {
            shape.endX = clickX + PIPELINE_NUMBER;
            shape.endY = evt.clientY - rect.top;
        }
        shape.pipelineInfo.direction = shapeDirection;
        shape.pipelineInfo.waterType = pipeline_water_type;
        draw();
    };
    // 画线时，鼠标抬起判断如果线段绘制过短，则不推入 allElementCollection
    window.onmouseup = () => {
        if(parseInt(draw_element_type) === 0 && shape.endX) {
            if (Math.abs(shape.startX - shape.endX) < 45 && Math.abs(shape.startY - shape.endY) < 45) {
                let index = allElementCollection.findIndex(item => item.uid === current_uid);
                allElementCollection.splice(index, 1)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                draw()
            }
        }
    };
}

// 绘制实时设备
const drawRealTimeEquipment = (e, clickX, clickY, rect) => {
    const shape = new ElementFactory(clickX, clickY)
    delete shape.textInfo;
    delete shape.pipelineInfo;
    setEquipment(e);
    setuid(shape);
    allElementCollection.push(shape);
    window.onmousemove = (evt) => setEquipment(evt);
    function setEquipment(evt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shape.startX = evt.clientX - rect.left;
        shape.startY = evt.clientY - rect.top;
        image.src = require(`../assets/images/${equipment_select.iconPath}`);
        let icon_width = Math.ceil(image.width / ICON_SCALE_RATIO),
            icon_height = Math.ceil(image.height / ICON_SCALE_RATIO);
        shape.endX = evt.clientX - rect.left + icon_width;
        shape.endY = evt.clientY - rect.top + icon_height;
        draw();
    }
    draw();
};

// 绘制实时文字
const drawRealTimeText = (e, clickX, clickY, rect) => {
    const shape = new ElementFactory(clickX, clickY);
    setuid(shape);
    delete shape.equipmentInfo;
    delete shape.pipelineInfo;
    ctx.font = `normal normal normal ${shape.textInfo.fontSize + 'px' || '16px'} Microsoft YaHei`;
    const defaultText = '默认文字，请右键修改';
    const measureText = ctx.measureText(defaultText);
    const textW = measureText.width,
        textH = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;
    shape.textInfo.text = defaultText;
    allElementCollection.push(shape);
    setText(e)
    window.onmousemove = (evt) => setText(evt)
    function setText(evt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        shape.startX = evt.clientX - rect.left;
        shape.startY = evt.clientY - rect.top;
        shape.endX = evt.clientX - rect.left + textW;
        shape.endY = evt.clientY - rect.top - textH;
        draw();
    }
    draw();
};

// 元素移动
const moveAllElement = (e, clickX, clickY, rect, shape) => {
    const { startX, startY, endX, endY } = shape;
    let tipX = 0, tipY = 0;
    // 鼠标左键：拖动位置
    if (e.buttons === 1) {
        window.onmousemove = (evt) => {
            removeEditTip();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const distanceX = evt.clientX - rect.left - clickX;
            const distanceY = evt.clientY - rect.top - clickY;
            shape.startX = startX + distanceX;
            shape.startY = startY + distanceY;
            shape.endX = endX + distanceX;
            shape.endY = endY + distanceY;
            draw();
        }
    }

    // 鼠标右键：执行信息编辑
    if (e.buttons === 2) {
        if (shape.type === 0) {
            // 管线
            tipX = e.clientX;
            tipY = e.clientY + 10;
        } else if (shape.type === 1) {
            // 如果点击的是图标，弹出提示出现在图标下方
            tipX = (shape.endX - shape.startX) / 2 + shape.startX + rect.left
            tipY = shape.endY + rect.top
        } else if (shape.type === 2) {
            // 文字
            tipX = shape.startX + rect.left + ctx.measureText(`${shape.textInfo.text}`).width / 2;
            tipY = shape.startY + rect.top;
        }
        createEditTip(tipX, tipY, shape);
        return false
    }
};

// 鼠标点击canvas查看是否点击到了已经绘制的路线，若是，则返回相关线的对象，若否，返回null
const getElement = (x, y) => {
    for (let i = allElementCollection.length - 1; i >= 0; i--) {
        const element = allElementCollection[i];
        if (element.isInside(x, y)) {
            current_select_element_index = i;
            return element;
        }
    }
    return null
};

const setuid = (shape) => {
    // 生成唯一ID
    let rand = Math.random();
    let uid = Math.round(rand * 100000000000);
    shape.uid = uid;
    return uid
}
/**
 * 创建绘制元素工厂函数
 *
 * */
class ElementFactory {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.type = draw_element_type;

        this.pipelineInfo = {
            waterType: pipeline_water_type,
            direction: false
        };

        this.equipmentInfo = {
            id: '',
            iconPath: equipment_select.iconPath,
            name: equipment_select.name,
            unit: 'm/s',
            scale: ICON_SCALE_RATIO,
            rotate: -0,
            show: true,
            value: '12378',
            others: [],
            rotateCoordinate: {}
        };

        this.textInfo = {
            fontSize: '24',
            text: '',
            color: '#000'
        };
    }
    get minX() {
        return Math.min(this.startX, this.endX);
    }
    get maxX() {
        return Math.max(this.startX, this.endX);
    }
    get minY() {
        return Math.min(this.startY, this.endY);
    }
    get maxY() {
        return Math.max(this.startY, this.endY);
    }
    get middleX() {
        return this.endX - (this.endX - this.startX) / 2
    }
    get middleY() {
        return this.endY - (this.endY - this.startY) / 2
    }

    get coordinate() {
        image.src = require(`../assets/images/${this.equipmentInfo.iconPath}`);
        const ImgWidth = image.width / this.equipmentInfo.scale,
            ImgHeight = image.height / this.equipmentInfo.scale;
        if (Math.abs(this.equipmentInfo.rotate) === 90) {
            return {
                startX: Math.round(this.startX - (ImgHeight - ImgWidth) / 2),
                startY: Math.round(this.startY - (ImgWidth - ImgHeight) / 2),
                endX:  Math.round(this.startX - (ImgHeight - ImgWidth) / 2)+ ImgHeight,
                endY: Math.round(this.startY - (ImgWidth - ImgHeight) / 2) + ImgWidth
            }
        } else {
            return {
                startX: this.startX,
                startY: this.startY,
                endX: this.endX,
                endY: this.endY
            }
        }
    }

    isInside(x, y) {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
    }

    // 绘制管线
    drawPipeline() {
        ctx.beginPath();
        ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
        ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio);
        ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio);
        ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio);
        ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
        // ctx.fillStyle = '#fff';
        ctx.fillStyle = ['#19c2ff', '#ffa600'][this.pipelineInfo.waterType];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'square';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        if (this.pipelineInfo.direction) {
            ctx.moveTo(this.minX * devicePixelRatio, this.middleY * devicePixelRatio);
            ctx.lineTo(this.maxX * devicePixelRatio, this.middleY * devicePixelRatio);
            ctx.lineDashOffset = this.startX < this.endX ? - pipeline_offset : pipeline_offset;
        } else {
            ctx.moveTo(this.middleX * devicePixelRatio, this.minY * devicePixelRatio);
            ctx.lineTo(this.middleX * devicePixelRatio, this.maxY * devicePixelRatio);
            ctx.lineDashOffset = this.startY < this.endY ? - pipeline_offset : pipeline_offset;
        }
        // ctx.strokeStyle = ['#0f42cc', '#ff4316'][this.pipelineInfo.waterType];
        ctx.strokeStyle = ['#18719f', '#ff4316'][this.pipelineInfo.waterType];
        ctx.lineWidth = 5;
        ctx.setLineDash([15, 15]);
        ctx.stroke();
    }

    drawEquipment() {
        this.equipmentInfo.rotateCoordinate = this.coordinate
        drawIcon.startX = this.startX;
        drawIcon.startY = this.startY;
        drawIcon.iconPath = this.equipmentInfo.iconPath;
        drawIcon.rotate = this.equipmentInfo.rotate;
        drawIcon.scale = this.equipmentInfo.scale;
        drawIcon.show = this.equipmentInfo.show;
        drawIcon.draw()

        if (equipment_area_show) {
            ctx.beginPath();
            ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
            ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio);
            ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio);
            ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio);
            ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
            ctx.fillStyle = 'rgba(0,0,0,0.41)';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineCap = 'square';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }

        // 添加文字描述
        if (drawIcon.show) this.drawEquipmentText()

    }

    drawEquipmentText() {
        ctx.beginPath()
        ctx.fillStyle = '#000'
        ctx.font = "normal normal normal 12px Microsoft YaHei"
        const measureText = ctx.measureText(`${this.equipmentInfo.name}: ${this.equipmentInfo.value} ${this.equipmentInfo.unit}`)
        let fontWidth = measureText.width,
            fontHeight = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent + 2;
        let fontX = this.equipmentInfo.rotateCoordinate.startX + ((this.equipmentInfo.rotateCoordinate.endX - this.equipmentInfo.rotateCoordinate.startX - fontWidth) / 2)
        ctx.fillText(`${this.equipmentInfo.name}: ${this.equipmentInfo.value} ${this.equipmentInfo.unit}`, fontX, this.equipmentInfo.rotateCoordinate.startY - 5)
        if (this.equipmentInfo.others.filter(item => item).length) {
            this.equipmentInfo.others.filter(item => item).map((item, index) => {
                ctx.fillText(`${item}`, fontX, this.equipmentInfo.rotateCoordinate.startY - 5 - (fontHeight * (index +1)))
            })
        }
        ctx.closePath()
    }

    drawText() {
        ctx.beginPath();
        ctx.fillStyle = this.textInfo.color || '#000';
        ctx.font = `normal normal normal ${this.textInfo.fontSize + 'px' || '16px'} Microsoft YaHei`;
        let content = this.textInfo.text;
        ctx.fillText(`${content}`, this.startX, this.startY);
        ctx.closePath();

        // ctx.beginPath();
        // ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
        // ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio);
        // ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio);
        // ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio);
        // ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
        // ctx.fillStyle = 'rgba(0,0,0,0.41)';
        // ctx.fill();
        // ctx.strokeStyle = '#fff';
        // ctx.lineCap = 'square';
        // ctx.lineWidth = 1;
        // ctx.stroke();
        // ctx.closePath();
    }

    drawAllElement() {
        parseInt(this.type) === 0 ? this.drawPipeline() : (parseInt(this.type) === 1 ? this.drawEquipment() : this.drawText())
    }
}

const drawIcon = {
    startX: 0,
    startY: 0,
    iconPath: '',
    scale: 0,
    rotate: 0,
    draw: function () {
        let img = new Image();
        img.src = require(`../assets/images/${this.iconPath}`);

        ctx.save();
        // 平移转换，改变画笔的原点位置为画布的中心点
        ctx.translate(this.startX + ((img.width / this.scale) / 2), this.startY + ((img.height / this.scale) / 2))

        // 旋转转换，改变画笔的旋转角度
        // ctx.rotate((this.rotate * Math.PI) / 180);
        ctx.rotate(this.rotate * Math.PI / 180);
        ctx.translate(-(this.startX + ((img.width / this.scale) / 2)), -(this.startY + ((img.height / this.scale) / 2)));
        // 调用绘制图片的方法把图片绘制到canvas中
        ctx.drawImage(img, this.startX, this.startY, (img.width / this.scale), (img.height / this.scale));
        // 使用 restore()进行恢复
        ctx.restore();
    }

};

const draw = () => {
    for (const pp of allElementCollection) {
        pp.drawAllElement()
    }
};

const calculationFlow = () => {
    requestAnimationFrame(calculationFlow);
    pipeline_offset++;
    if (pipeline_offset > 300) pipeline_offset = 0;
    for (const pp of allElementCollection) {
        if (pp.type === 0) pp.drawPipeline()
    }
};

// 创建管线点击事件弹窗
const createEditTip = (x, y, shape) => {
    let width = shape.type ? 180 : 120, marginLeft = shape.type ? 95 : 65, display = shape.type ? 'inline-block' : 'none'
    removeEditTip()
    let tipText = document.createElement('div')
    tipText.classList.add('tip-text-content')
    tipText.innerHTML = `<div class="tip-text" id="tipText" style="top: ${y + 10}px;left: ${x}px; width: ${width}px; margin-left:-${marginLeft}px; ">
                            <p>
                                <span id="equipmentDelete">删除</span>
                                <span id="${parseInt(shape.type) === 2 ? 'textModify' : 'equipmentModify'}" style="display: ${display}">编辑</span>
                                <span id="buttonCancel">取消</span>
                            </p>
                         </div>`
    document.body.appendChild(tipText)

    document.getElementById('equipmentDelete').onclick = () => {
        allElementCollection.splice(current_select_element_index, 1)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw()
        removeEditTip()
    };

    let modifyButton = document.getElementById('equipmentModify') ? 'equipmentModify' : 'textModify';
    document.getElementById(modifyButton).onclick = () => {
        removeEditTip()
    };

    document.getElementById('buttonCancel').onclick = () => {
        removeEditTip()
    };
};

// 移除管线事件弹窗
const removeEditTip = () => {
    const popup = document.querySelector('.tip-text-content')
    if (popup) document.body.removeChild(popup)
}

const canvasDraw  = {
    init(element) {
        canvas = document.getElementById(element)
        ctx = canvas.getContext('2d')

        const w = 1200, h = 800;
        canvas.width = w * devicePixelRatio;
        canvas.height = h * devicePixelRatio;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        calculationFlow();

        canvas.onmousedown = (e) => canvasMousedown(e);

        canvas.onmouseup = () => {
            canvas.onmousemove = null;
            window.onmousemove = null;
            canvas.style.cursor= "crosshair"
        }
        return canvas
    },

    // 回传鼠标抬起事件
    canvasMouseUp: () => {
        return allElementCollection[current_select_element_index]
    },

    // 更改绘制类型
    drawTypeChange(element) {
        equipment_select = element
        draw_element_type = element.drawType
    },

    // 修改管线类型（冷热水）
    changePipelineType: (type) => {
        pipeline_water_type = type
    },

    // 修改信息提交
    canvasModifyInfo: (params, flag) => {
        const shape = allElementCollection[current_select_element_index]
        if (flag.includes('equipmentInfo')) {
            image.src = require(`../assets/images/${params.iconPath}`);
            let icon_width = Math.ceil(image.width / params.scale),
                icon_height = Math.ceil(image.height / params.scale);
            shape.endX = shape.startX + icon_width;
            shape.endY = shape.startY + icon_height;
        }
        if (flag.includes('textInfo')) {
            ctx.font = `normal normal normal ${params.fontSize + 'px' || '16px'} Microsoft YaHei`;
            const measureText = ctx.measureText(params.text);
            const textW = measureText.width,
                textH = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;
            shape.endX = shape.startX + textW;
            shape.endY = shape.startY - textH;
        }
        allElementCollection[current_select_element_index][flag] = params;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    },

    // 显示设备可拖动的区域范围
    showEquipmentIconArea: ()  => {
        equipment_area_show = !equipment_area_show;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    },

    commit: () => {
        // todo
        // 提交事件


        console.log(allElementCollection)
    },

    echoData: (data) => {

        //下方为前后端正式对接所用数据格式 回显处理
        let echoData = []

        data.map(item => {
            let echoItem = new ElementFactory()
            for (let i in item) {
                echoItem[i] = item[i]
            }
            echoData.push(echoItem)
        })

        allElementCollection = echoData
    },

    clearAll: () => {
        allElementCollection = []
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default canvasDraw

