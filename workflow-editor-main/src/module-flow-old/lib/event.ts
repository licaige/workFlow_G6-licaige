import {ref, Ref, watch} from "vue";
import G6, {Graph, IEdge, INode, Item} from "@antv/g6";
import {PluginBase} from "@antv/g6-plugin"
import zpx from "zpx";
import {cttrs, ElementType, Events, GraphMode, VEvents} from "./types";
import {ModelConfig} from "@antv/g6-core/lib/types";


export default function DoEvent(graph: Ref<Graph | null>) {
    let pluginGrid = ref<PluginBase>(new G6.Grid())
    let pluginMinimap = ref<PluginBase | null>()
    let pluginToolbar = ref<PluginBase | null>()
    let pluginSnapLine = ref<PluginBase>(new G6.SnapLine({itemAlignType: true}))

    let allEvents = zpx.mittAll()
    for (let o in Events) {
        allEvents.set(o, [])
    }
    for (let o in VEvents) {
        allEvents.set(o, [])
    }

    // 小地图插件注册
    zpx.on(Events.PluginMinimapRegister, (v: PluginBase) => {
        pluginMinimap.value = v
    })
    // 工具栏插件注册
    zpx.on(Events.PluginToolbarRegister, (v: PluginBase) => {
        pluginToolbar.value = v
    })

    // 刷新画板
    zpx.on(Events.DataRefresh, () => {
        if (!graph.value) {
            return
        }
        graph.value.refresh()
    })


    {

        type deal = (g: Graph, v: ModelConfig) => ModelConfig

        function add(v: ModelConfig, fn?: deal) {
            if (!graph.value) return

            let g = graph.value
            if (fn) {
                v = fn(g, v)
            }
            let node = g.addItem("node", v) as INode
            node.set(cttrs.UUID, zpx.uuid())
            node.set(cttrs.BType, ElementType.typeNode)
        }

        // 添加元素
        zpx.on(Events.NodeAdd, (v: ModelConfig) => {
            add(v)
        })
        zpx.on(Events.NodeAddPx, (v: ModelConfig) => {
            add(v, function (g, v) {
                let {x, y} = v
                let point = g.getPointByClient(x as number, y as number)
                v.x = point.x
                v.y = point.y
                return v
            })
        })


        // 添加线条
        zpx.on(Events.EdgeAdd, (v: ModelConfig) => {
            if (!graph.value) {
                return
            }

            let g = graph.value
            let edge = g?.addItem("edge", v) as IEdge
            edge.set(cttrs.UUID, zpx.uuid())
            edge.set(cttrs.BType, ElementType.typeEdge)
            g?.refresh()
        })
    }

    // 切换模式
    zpx.on(Events.GraphModeChange, (v: GraphMode) => {
        if (!graph.value) {
            return
        }
        graph.value.setMode(v)
    })
    // 删除元素
    zpx.on(Events.GraphRemoveElement, (item: Item | string) => {
        if (!graph.value) {
            return
        }
        graph.value?.removeItem(item)
    })
    // 刷新元素
    zpx.on(Events.GraphRefreshElement, (item: Item | string) => {
        if (!graph.value) {
            return
        }
        graph.value?.refreshItem(item)
    })
    // 更新元素
    zpx.on(Events.GraphUpdateElement, ({item, cfg}: any) => {
        if (!graph.value) {
            return
        }
        graph.value?.updateItem(item, cfg)
    })

    watch(graph, (newValue, oldValue) => {
        if (oldValue) {
            oldValue.destroy()
        }
        if (!newValue) {
            return
        }

        newValue.addPlugin(pluginGrid.value as PluginBase)
        newValue.addPlugin(pluginSnapLine.value as PluginBase)
        if (pluginMinimap.value) {
            newValue.addPlugin(pluginMinimap.value as PluginBase)
        }
        if (pluginToolbar.value) {
            newValue.addPlugin(pluginToolbar.value as PluginBase)
        }
    }, {immediate: true})
}