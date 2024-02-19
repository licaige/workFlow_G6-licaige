import G6, {INode} from '@antv/g6';
import {GraphBehavior, ElementType, cttrs, Events, GraphMode, VEvents} from "../../lib/types";
import {ref} from "vue";
import {getGraph} from "../actions";
import zpx from "zpx";

interface ICurrent {
    id: string
    attrs: Record<string, any>
}

const current = ref<ICurrent | null>(null)

G6.registerBehavior(GraphBehavior.nodeEdit, {
    currentXY: [0, 0],
    getEvents() {
        return {
            "node:click": "onClick",
            "canvas:click": "click",
        };
    },
    click(e: any) {
        if (current.value) {
            let graph = getGraph(e)
            if (graph) {
                let node = graph.findById(current.value.id) as INode
                if (node) {
                    node.getKeyShape().attr(current.value.attrs)
                }
            }
            current.value = {id: "", attrs: {}}
        }

        if (!e.item) {
            zpx.emit(Events.GraphModeChange, GraphMode.default)
            zpx.emit(VEvents.NodeEdit, null)
            return
        }
    },
    onClick(e: any) {

        const node = e.item as INode
        const keyShape = node.getKeyShape()
        if (keyShape.get(cttrs.BType) != ElementType.typeShape) {
            zpx.emit(Events.GraphModeChange, GraphMode.default)
            zpx.emit(VEvents.NodeEdit, null)
            return
        }
        let attrs = keyShape.attr()
        current.value = {
            id: node._cfg?.id || "",
            attrs: {
                shadowBlur: attrs.shadowBlur,
                strokeOpacity: attrs.strokeOpacity,
                shadowColor: attrs.shadowColor,
                cursor: attrs.cursor,
            },
        }
        keyShape.attr({
            shadowColor: attrs.stroke,
            shadowBlur: 10,
            strokeOpacity: 0.5,
            cursor: "auto",
        })

        zpx.emit(VEvents.NodeEdit, node)
        zpx.emit(Events.GraphModeChange, GraphMode.nodeEdit)
    },

});
