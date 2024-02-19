// 记得初始化的时候情况zpx中的事件
export enum Events {
    /** 小地图插件注册 */
    PluginMinimapRegister = "PluginMinimapRegister",
    /**  网格线注册 */
    PluginGridRegister = "PluginGridRegister",
    /** 编辑工具注册 */
    PluginToolbarRegister = "PluginToolbarRegister",
    /** 切换模式 */
    GraphModeChange = "GraphModeChange",
    /** 数据刷新 */
    DataRefresh = "DataRefresh",
    /** 从graph中删除元素 */
    GraphRemoveElement = "GraphRemoveElement",
    /** 从graph中刷新元素 */
    GraphRefreshElement = "GraphRefreshElement",
    /** 从graph中更新元素 */
    GraphUpdateElement = "GraphUpdateElement",
    /** 添加节点 */
    NodeAdd = "NodeAdd",
    /** 添加节点并且进行屏幕坐标转换 */
    NodeAddPx = "NodeAddPx",
    /** 添加线 */
    EdgeAdd = "EdgeAdd"
}

// 记得初始化的时候情况zpx中的事件
export enum VEvents {
    NodeEdit = "node:edit",
    EdgeEdit = "edge:edit",
}

/** 自定义属性值 */
export enum cttrs {
    BType = "btype",
    UUID = "uuid"
}

export enum ElementType {
    nodeStart = "node:step-start",
    nodeEnd = "node:step-end",
    nodeTask = "node:flow-task",
    nodeUser = "node:flow-user",
    nodeParallel = "node:gateway-parallel",
    nodeMutex = "node:gateway-mutex",

    edge = "edge:default",

    typeGroup = "typeGroup",
    typeShape = "typeShape",
    typeNode = "typeNode",
    typeEdge = "typeEdge",

    anchorInPoint = "anchorInPoint",
    anchorOutPoint = "anchorOutPoint",
}

export enum GraphMode {
    default = "default",
    edgeAdd = "edge:add",
    nodeEdit = "node:edit",
    edgeEdit = "edge:edit"
}

export enum GraphBehavior {
    edgeAction = "edgeAction",
    nodeHover = "node:hover",
    nodeEdit = "node:edit"
}


export interface INode {
    name: string // 节点名称
    type: string // 节点类型
    background?: any // 节点背景图片
    size: number[] // 节点大小
    inPoints?: number[][] // 连入节点
    outPoints?: number[][] // 连出节点
}