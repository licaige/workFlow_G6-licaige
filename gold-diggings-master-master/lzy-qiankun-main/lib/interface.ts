declare global {
    interface Window {
        __POWER_BY_LZY_QIANKUN__?: boolean,
        __INJECTED_PUBLIC_PATH_BY_LZY_QIANKUN__: string
    }
}


export type AppConfig = {
    name: string,
    entry: string,
    container: string,
    activeRule: string,
    bootstarp: Function,
    mount: Function,
    unmount: Function,
    styleSheets: string[]
}