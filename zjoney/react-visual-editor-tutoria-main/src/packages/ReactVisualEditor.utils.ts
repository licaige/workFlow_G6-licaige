import {VisualEditorProps} from "./ReactVisualEditor.props";

export interface VisualEditorBlock {
    componentKey: string,
    focus: boolean,
    top: number,
    left: number,
    height: number,
    width: number,
    hasResize: boolean,                                             // 是否调整过宽度或者高度
    slotName?: string,
    adjustPosition?: boolean,
    zIndex: number,
    props?: Record<string, any>,
    model?: Record<string, string>,
}

export interface VisualEditorValue {
    container: {
        height: number,                                             // 容器高度
        width: number,                                              // 容器宽度
    },
    blocks: VisualEditorBlock[],                                    // block数据
}

export interface VisualEditorComponent {
    name: string,
    key: string,
    preview: () => JSX.Element,
    render: (data: {
        props: any,
        model: any,
        size: { width?: number, height?: number },
        custom: Record<string, any>,
        block: VisualEditorBlock,
    }) => JSX.Element,
    props?: Record<string, VisualEditorProps>,
    model?: Record<string, string>,
    resize?: { width?: boolean, height?: boolean },
}

export type VisualEditorOption = ReturnType<typeof createVisualEditorOption>

export function createVisualEditorOption() {

    const componentMap = {} as { [k: string]: VisualEditorComponent }
    const componentList = [] as VisualEditorComponent[]

    const registryComponent = <_,Props extends Record<string, VisualEditorProps> = {},
        Model extends Record<string, string> = {}>(key: string, component: {
        name: string,
        preview: () => JSX.Element,
        render: (data: {
            props: { [k in keyof Props]: any },
            model: { [k in keyof Model]: { value: any, onChange: (e: any) => void } },
            size: { width?: number, height?: number },
            custom: Record<string, any>,
            block: VisualEditorBlock,
        }) => JSX.Element,
        props?: Props,
        model?: Model,
        resize?: { width?: boolean, height?: boolean },
    }) => {
        const comp = {
            ...component,key,
        } as any
        if (!!componentMap[key]) {
            const index = componentList.indexOf(componentMap[key])
            componentList.splice(index, 1)
        }
        componentMap[key] = comp
        componentList.push(comp)
    }
    return {
        componentMap,
        componentList,
        registryComponent,
    }
}

export function createNewBlock(
    {
        component,
        left,
        top,
    }: {
        component: VisualEditorComponent,
        top: number,
        left: number,
    }): VisualEditorBlock {
    return {
        top,
        left,
        componentKey: component!.key,
        adjustPosition: true,
        focus: false,
        zIndex: 0,
        width: 0,
        height: 0,
        hasResize: false,
    }
}


export interface VisualEditorMarkLines {
    x: { left: number, showLeft: number }[],
    y: { top: number, showTop: number }[]
}