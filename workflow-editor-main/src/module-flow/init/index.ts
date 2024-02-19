import "./register"
import {Ref, SetupContext, watch, onMounted, nextTick} from "vue";
import graph from "./graph";
import {StepNode} from "../type";
import {Graph, INode} from "@antv/g6";
import {ElMessage} from 'element-plus'

export default function (props: any, ctx: SetupContext) {

    let container = graph(props, ctx)
    let version = "v0.0.1_g6_data"

    onMounted(() => {
        nextTick(() => {
            let localData = localStorage.getItem(version)
            if (container.graph.value && localData) {
                container.graph.value.read(JSON.parse(localData))
            }
        })

    })

    return {
        ...container,
        onAdd: onAdd(container.graph as Ref<Graph>),
        onSave: () => {
            if (container.graph.value) {
                let data = container.graph.value.save()
                localStorage.setItem(version, JSON.stringify(data))
                alert("保存成功")
            }
        },
        onReset: () => {
            if (container.graph.value) {
                if (confirm("是否要清空所有数据")) {
                    localStorage.setItem(version, "")
                    container.graph.value.read([])
                }
            }
        },
        onConfirm: () => {
        },
    };
}

function onAdd(g: Ref<Graph>) {
    return (e: DragEvent, item: StepNode) => {
        if (g.value) {
            let point = g.value.getPointByClient(e.x, e.y)
            g.value.addItem("node", {...point, type: item.type, config: item})
        }
    }
}