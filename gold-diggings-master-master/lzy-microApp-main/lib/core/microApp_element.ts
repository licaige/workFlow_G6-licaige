import { lifeCycles } from './constance'
import CreateApp from './createApp'
import logger from './logger'
import type {
    AppInterface,
    MicroAppElementType,
    LifecycleEventName,
    OptionsType
} from './type'

// App实例
export const appInstanceMap = new Map<string, AppInterface>()

export class MicroAppElement extends HTMLElement implements MicroAppElementType {
    public appName = '' // app name
    public appUrl = '' // app url
    public options: OptionsType = {
        name: this.appName,
        url: this.appUrl,
        shadowDom: true
    } // start时传入的全局option

    // 监视自定义组件属性改变,触发回调(attributeChangedCallback)
    static get observedAttributes(): string[] {
        return ['name', 'url']
    }

    constructor() {
        super()
        logger.log('创建micro-app-element组件');
        // patchSetAttribute()
    }
    eleConnectedCount: number

    // 组件挂载到document时的hook
    connectedCallback(): void {

        logger.log('组件挂载到document');
        const isAppEffective = this.appName && this.appUrl
        dispatchLifecyclesEvent(this, lifeCycles.CREATED)

        isAppEffective && this.handleConnected()
    }

    // 组件从document删除时的hook
    disconnectedCallback(): void {
        throw new Error("Method not implemented.")
    }

    // 组件属性改变时的hook(配合observedAttributes)
    //!设置attr并执行conn
    attributeChangedCallback(attr: "name" | "url", oldVal: string, newVal: string): void {
        if (attr === 'name' && this.appName !== attr) {
            this.appName = newVal
        }
        if (attr === 'url' && this.appUrl !== attr) {
            this.appUrl = newVal
        }

        const isAppEffective = this.appName && this.appUrl
        isAppEffective && this.handleConnected()

    }


    // 尝试mount App
    private handleConnected(): void {
        if (!this.appName || !this.appUrl) return
        logger.log('尝试链接 App');

        // 初始化shadowDom
        this.initShadowDom()

        // 创建App
        const appAlreadyCreated = appInstanceMap.has(this.appName)

        if (appAlreadyCreated) {

        } else {
            this.handleCreateApp()
        }


    }


    // 创建App实例
    private handleCreateApp(): void {
        logger.log('创建app实例');

        //todo 卸载app并删除实例  
        const app = appInstanceMap.get(this.appName)
        if (app) { }

        const newApp = new CreateApp({
            name: this.appName,
            url: this.appUrl,
            container: this.shadowRoot ?? this,
            scopecss: false,
            useSandbox: true
        })


        appInstanceMap.set(newApp.name, newApp)
    }
    // 获取某个配置结果(可从元素attr和全局options中获取)
    private getOptionsResult<T extends keyof OptionsType>(name: T): any {
        const eleAttr = this.getAttribute(name) // ele属性
        const optionResult = this.options[name] // options结果
        return eleAttr || optionResult // attr优先
    }

    // 初始化shadowDom
    private initShadowDom() {
        const shouldAttachShadow = this.getOptionsResult('shadowDom') && !this.shadowRoot
        if (shouldAttachShadow) {
            logger.log('初始化shadowDom');
            this.attachShadow({ mode: 'open' })
        }
    }

}

// TODO -------------- 触发生命周期事件-----------------
export function dispatchLifecyclesEvent(
    element: HTMLElement | ShadowRoot,
    lifecycleName: LifecycleEventName,
) {
    logger.log(`触发生命周期事件:` + lifecycleName);
}


