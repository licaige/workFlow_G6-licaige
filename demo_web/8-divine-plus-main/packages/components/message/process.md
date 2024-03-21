# Message

- element-ui message 源码分析
  - https://github.com/woow-wu7/7-element-source-code-analysis/blob/main/packages/message/src/main.js
- divine-ui message 源码
  - https://github.com/woow-wu7/8-divine-plus/blob/main/packages/components/message/message.ts

# 需要用到的 vue3 api

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

- https://github.com/ecaps1038/yike-design/blob/master/components/message/Message.ts
