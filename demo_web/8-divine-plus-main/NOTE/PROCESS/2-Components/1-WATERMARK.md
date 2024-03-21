# Watermark 组件设计

```
我们在实现 Watermark 组件时，需要考虑以下问题？
---

1
方式: 在vue3中有哪些方式可以实现水印功能？
- 组件: 我们可以通过组件来实现水印
- 指令: 因为水印和DOM操作强相关，因此可以通过指令的思路来实现

2
区别: 水印图片 和 水印文字 有什么区别？
- 水印图片: 异步，因为 img.onload 异步完成后，我们才可以进行 context.drawImage 绘制
- 水印文字: 同步，直接 context.fillText 即可

3
生成: 如何生成水印？
- 前端: 通过 canvas 画文字和图片实现即可
- 后端: 比如图片可以通过后端来处理
- 区别: 后端一般只针对图片处理，而前端可以给任何资源做水印，范围广

4
防篡改: 如何防止水印被篡改
- 篡改的方式
  - 1.直接通过浏览器调试，删除水印DOM节点
  - 2.修改css，比如透明度
  - 3.修改 属性 等
  - 4.其他方式 ps
- 防篡改
  - 监听: 水印的删除操作，属性修改等
  - 生成: 当监听到上面的操作后，删除水印，再重新生成新的水印
  - api: MutationObserver

 5
 清除: 组件卸载时，需要停止观察 MutationObserver
 - 一些清除工作不要忘记

 6
 移动端: 移动端存在2/3倍屏
 - window.devicePixelRatio
 - 根据 window.devicePixelRatio 来动态修改水印的大小即可
```

# 前置知识

### 一些单词

```
watermark 水印
illegal 非法的
extract 提取 摘录
inset 小图 插入
```

### (1) canvas

```
<canvas id="canvas" width="200" height="200" style="border: 1px solid red" ></canvas>
const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
---

1
指定 width 和 height 有三种方法
- 标准方式：canvas 标签自带的 width 和 height 属性
- css方法: 通过 id 或 class 选择器
- js方式: domTarget.width 和 domTarget.height

2
判断浏览器是否支持 canvas
if (!canvas.getContext) {
    throw new Error("你的浏览器不支持Canvas!");
}

3
常用属性
3.1 drawImage
- context.drawImage(img, x, y, width, height) // ------ 在canvas上绘制图片
- context.drawImage(img图片, x：在画布上放置图像的 x 坐标, y, width图像的宽度, height)
3.2 font
- font: font-style font-variant font-weight font-size font-family
- font-style: normal|italic斜体|oblique斜体|inherit;
3.3 toDataURL()
- canvas.toDataURL(type, encoderOptions) // ----------- 返回一个包含图片展示的URI
- type：图片的类型 `image/png`
3.4 fillText
- context.fillText(text,x,y,maxWidth) // -------------- 在画布上绘制填色的文本
- text 文本
- xy 坐标
3.5 measure.text(text)
- const text = context.measureText("生成"); // --------- 测量文字的宽度
- console.log("text.width", text.width); // 获取 "生成" 文字的宽度


4
绘制图形
// 矩形
ctx.fillRect(20, 20, 100, 100); // 填充矩形，fillRect(x, y, width, height) xy表示矩形左上角的坐标，原点是左上角00位置
ctx.clearRect(55, 55, 30, 30); // 清除矩形区域，使其清除部分完全透明
ctx.strokeRect(140, 20, 100, 100); // 矩形框
// 三角形
ctx.beginPath(); //------------------------------------------ 一个路径的开始
ctx.moveTo(500, 30); // ----- 起始点
ctx.lineTo(450, 120); // ------ 直线的第二个点
ctx.lineTo(550, 120); // ----- 直线的第三个点
ctx.closePath(); // ----------------------------------------- 一个路径的结束
ctx.lineWidth = 4; // -------- 直线的宽度
ctx.strokeStyle = "red"; // ------ 直线的颜色，需要在绘画前设置
ctx.stroke(); // --------------------------------------------- 描边 (绘制)
ctx.fillStyle = "yellow"; // ------ 填充的颜色，需要在绘画前设置
ctx.fill(); // ----------------------------------------------- 填充 (绘制)
// 直线
ctx.beginPath();
ctx.moveTo(300, 30);
ctx.lineTo(400, 30);
ctx.closePath();
ctx.lineWidth = 2;
ctx.strokeStyle = "blue";
ctx.stroke();
// 圆弧
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
//以x,y为圆心，radius为半径， startAngle和endAngle为角度，anticlockwise是否为逆时针方向的 圆弧（圆）
// startAngle, endAngle代表的是( 弧度 )，而不是角度
// 注意：起始角度为三点钟位置，并且是以弧度计算的
ctx.beginPath();
ctx.arc(60, 200, 40, (90 * Math.PI) / 180, 1.5 * Math.PI, false);
ctx.stroke();
// 圆
ctx.beginPath();
ctx.arc(180, 200, 40, 0, 2 * Math.PI, false);
ctx.fill();


5
绘制图片
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <img
      src="../../../static/images/成都.jpg"
      id="image"
      width="300"
      height="300"
    />
    <button id="button">生成图片</button>

    <div id="imgContainer"></div>
  </body>
  <script>
    window.onload = function () {
      const image = document.getElementById("image");
      const button = document.getElementById("button");
      const imgContainer = document.getElementById("imgContainer");

      button.addEventListener("click", combine, false);

      function combine() {
        const canvas = document.createElement("canvas"); // -------- 创建canvas标签
        canvas.width = 500;
        canvas.height = 500;
        canvas.style = "border: 1px solid red";
        document.documentElement.appendChild(canvas); // ------------ 添加到HTML的DOM中

        const context = canvas.getContext("2d"); // ----------------- 获取渲染上下文和绘画功能

        // context.drawImage(img, x, y, width, height)
        // img：图片
        // x：在画布上放置图像的 x 坐标
        // y：在画布上放置图像的 y 坐标
        // width：图像的宽度
        // height：图像的高度
        context.drawImage(image, 50, 55, 400, 400); // ----------------- drawImage() 生成图片
        context.fillStyle = "white";
        context.font = "30px Georgia";
        context.fillText("生成的图片", 100, 100); // ------------------- 填充文字

        const text = context.measureText("生成"); // ------------------ 测量文字的宽度
        console.log("text.width", text.width);
        const text2 = context.measureText("生成的图片");
        console.log("text2.width", text2.width);
      }
    };
  </script>
</html>
```

### (2) MutationObserver

```
MutationObserver
- 作用: 检测 DOM 变化
- 异步: 是 微任务
  - 微任务: promise process.nextTick MutationObserver
  - 宏任务: setTimeout setInterval setImmediate requestAnimationFrame
---

<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="add">添加节点</button>
    <button id="change">修改属性</button>
    <button id="edit">修改子节点</button>

    <br />
    <button id="stop">停止观察</button>
    <section id="target">
      <div id="target__content">these are some text content 1</div>
      <div id="target__content2">these are some text content 2</div>
    </section>
    <script>
      const targetNode = document.getElementById("target");
      const config = {
        subtree: true, // 监听以 target 为根节点的整个子树，包括子树中所有节点的属性，而不仅仅是针对 target
        childList: true, // 监听 Target节点 新增 和 删除
        attributes: true, // 监听 Target节点 属性
        // attributeFilter: false, // 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知
        // attributeOldValue: false, // 当为 true 时，记录上一次被监听的节点的属性变化；可查阅监听属性值了解关于观察属性变化和属性值记录的详情。默认值为 false
      };

      const callback = (mutationsList, observer) => {
        console.log("callback running");
        console.log("mutationList", mutationsList);
        console.log("observer", observer);
      };

      const observer = new MutationObserver(callback); // 1. ----------------- 开始观察

      observer.observe(targetNode, config);

      // add
      const Add = document.getElementById("add");
      Add.onclick = () => {
        const span = document.createElement("span");
        span.innerHTML = "this is a span tag";
        targetNode.appendChild(span);
      };

      // change
      const Change = document.getElementById("change");
      Change.onclick = () => {
        targetNode.setAttribute("data-href", "http://baidu.com");
      };

      // edit
      const Edit = document.getElementById("edit");
      const child = document.getElementById("target__content2");
      Edit.onclick = () => {
        child.innerHTML = "these are some text content 3";
      };

      var mutations = observer.takeRecords(); // 3. --------------------------- 返回一个MutationRecord 对象列表，每个对象都描述了应用于 DOM 树某部分的一次改动
      if (mutations) {
        callback(mutations);
      }

      // stop
      const Stop = document.getElementById("stop");
      Stop.onclick = () => {
        observer.disconnect(); // 2. ------------------------------------------ 停止观察
      };
    </script>

  </body>
</html>
```

### (3) 需要用到的 vue3 api

    1
    createVNode
    createVNode(type, props, children, patchFlag, dynamicProps, isBlockNode)
    作用: 用来创建一个 VNode
    --

    签名
    declare function _createVNode(
      type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
      props?: (Data & VNodeProps) | null,
      children?: unknown,
      patchFlag?: number,
      dynamicProps?: string[] | null,
      isBlockNode?: boolean
    ): VNode;

    案例
    const props = {
        ...options,
        id,
        zIndex: zIndex++,
        onClose: () => {},
        onDestroy: () => {}
    };
    const vnode = createVNode(Message, props); // Message组件，props组件的props

<!---->

    2
    render
    render(vnode, container, isSVG)
    ---

    签名
    1.export declare const render: RootRenderFunction<Element | ShadowRoot>;
    2.export declare type RootRenderFunction<HostElement = RendererElement> = (
      vnode: VNode | null,
      container: HostElement,
      isSVG?: boolean
    ) => void;

    案例
    const vnode = createVNode(Message, props);
    const container = document.createElement("div");
    render(vnode, container);
    document.body.appendChild(container?.firstElementChild!);

<!---->

    3
    vue2全局属性设置: Vue.prototype.xxx
    vue2全局属性获取: this.xxx

    vue3全局属性设置: createApp().config.globalProperties.xxx = xxx
    vue3全局属性获取: getCurrentInstance().appContext.config.globalProperties.xxx
    vue3全局属性获取(开发/生产): getCurrentInstance().proxy

<!---->

    4
    vue2 和 vue3 在 message 组件实现上的差异
    ---

    vue2
    - let MessageConstructor = Vue.extend(Message);
    - instance = new MessageConstructor({ data: options });
    - instance.$mount()
    - document.body.appendChild(instance.$el)

    vue3
    - const vnode = createVNode(Message, props);
    - const container = document.createElement("div");
    - render(vnode, container);
    - document.body.appendChild(container?.firstElementChild!);

<!---->

    5
    vue 中动态渲染组件的根标签的方式？
    ---

    render 函数
    - render函数渲染不同的tag，通过变量tag作为参数
    - const view = h( tag, { class, style, ref }, slots.default );

    component 内置组件
    - 通过 is 属性 动态切换
    - <component :is="tag" />

<!---->

    6
    defineExpose 需要注意的问题
    ---

    注意点1
    - 需求: 通过ref绑定组件，同时要要获取该组件中的DOM
    - 解决: 我们需要 ref绑定组件，同时在组件中 ref绑定需要获取的DOM标签，然后defineExose暴露出去

    注意点2
    - 需求: 具体如何获取
    - 解决: refComponent.value.refDiv
    - 注意:
        - defineExpose暴露出来的ref对象，在获取该ref对象时，不需要.value
        - 对: refComponent.value.refDiv
        - 错: refComponent.value.refDiv.value

<!---->

    7
    vue3 中 Fragment 组件多根节点需要注意的问题
    ---

    1. 当我们在组件上做 ( 属性透传时 - 不在props和emit中的属性，会自动透传到根元素上 )
      - 如果组件存在多个根节点，将会报错，因为Vue 不知道要将 attribute 透传到哪里
      - Extraneous non-props attributes (age) were passed to component but could not be
        automatically inherited because component renders fragment or text root nodes.

    2. 内置组件 "Transition" 只支持一个 ( 根节点的组件 )，多个根节点动画将不生效
      - Component inside "Transition " renders non-element root node that cannot be animated.

    3. 当在组件上绑定事件时，如果子组件有多个根元素，事件不会触发
      - Extraneous non-emits event listeners (click) were passed to component but could not be
        automatically inherited because component renders fragment or text root nodes. If the
        listener is intended to be a component custom event listener only, declare it using the
        "emits" option.

<!---->

    8
    getCurrentInstance
    - 作用：访问组件内部实例，可以作为在组合式api中获取this的替代方案
    - 注意：getCurrentInstance只能在 ( setup 或 生命周期钩子 ) 中使用
    - 应用：
      - 获取 router
      - getCurrentInstance().appContext.config.globalProperties.$router
    - 问题：
      - 问题：如果要在除了 ( setup 和 生命周期钩子 ) 外使用 ( getCurrentInstance ) 怎么弄？
      - 回答：可以现在 ( setup 中通过 getCurrentInstance() 获取实例，然后再使用 )
    - 官网说明：https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance
    ---


    1.1 获取router
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

# 资料

- https://github.com/jdf2e/nutui
- https://github.com/youzan/vant
