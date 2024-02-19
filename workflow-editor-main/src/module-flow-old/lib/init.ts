import G6, {Graph, Item} from "@antv/g6";
import {ref, watch} from "vue";
import {ElementType, GraphBehavior, GraphMode} from "./types";
import {stepAttr} from "../g6/element/default-nodes";
import zpx from "zpx";

export default function InitGraph() {
    let container = ref<HTMLDivElement>()
    let graph = ref<Graph | null>(null)


    watch(container, (v) => {
        if (!v) {
            return
        }
        graph.value = init(v)
    })

    return {
        container, graph
    }
}


function init(container: HTMLDivElement) {
    let graph = new G6.Graph({
        container: container,
        height: container.clientHeight - 4,
        width: container.clientWidth - 4,
        modes: {
            [GraphMode.default]: [
                "drag-canvas",
                'drag-node',
                "zoom-canvas",
                "hover-node",
                GraphBehavior.edgeAction,
                GraphBehavior.nodeHover,
                GraphBehavior.nodeEdit,
            ],
            [GraphMode.edgeAdd]: [GraphBehavior.edgeAction],
            [GraphMode.edgeEdit]: [GraphBehavior.edgeAction],
            [GraphMode.nodeEdit]: [GraphBehavior.nodeEdit],
        },
        layout: {
            type: 'radial',
            unitRadius: 50,
            center: [500, 300],
        },
        defaultNode: {
            type: ElementType.nodeTask,
            labelCfg: {},
            linkPoints: {
                top: true,
                right: true,
                bottom: true,
                left: true,
            },
        },
        defaultEdge: {
            type: ElementType.edge,
            size: 1,
            color: '#b7b3b3',
            style: {
                endArrow: true,
                stroke: '#C2C8D5',
                lineWidth: 2,
                offset: 45,
                radius: 20,
            },
        },
        fitView: true,
    });

    graph.set("uuid", zpx.uuid())

    setTimeout(() => {
        graph.addItem("node", {...stepAttr(ElementType.nodeStart), x: 100, y: 100})
        graph.addItem("node", {...stepAttr(ElementType.nodeEnd), x: 300, y: 100})
        graph.addItem("node", {...stepAttr(ElementType.nodeTask), x: 500, y: 100})
        graph.addItem("node", {...stepAttr(ElementType.nodeUser), x: 100, y: 300})
        graph.addItem("node", {...stepAttr(ElementType.nodeMutex), x: 300, y: 300})
        graph.addItem("node", {...stepAttr(ElementType.nodeParallel), x: 500, y: 300})
        graph.refresh()
    }, 1000)


    graph.render()
    return graph
}
