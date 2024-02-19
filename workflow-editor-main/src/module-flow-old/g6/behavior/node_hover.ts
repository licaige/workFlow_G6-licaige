import G6, {INode, IShape} from '@antv/g6';
import {GraphBehavior, ElementType, cttrs} from "../../lib/types";
import zpx from "zpx";
import {IGroup} from "@antv/g-base";


G6.registerBehavior(GraphBehavior.nodeHover, {
    currentXY: [0, 0],
    getEvents() {
        return {
            "node:mouseenter": "onMouseenter",
            "node:mouseout": "onMouseout",
        };
    },
    onMouseenter(e: any) {
        AnchorVisible(e, true)
    },

    onMouseout(e: any) {
        AnchorVisible(e, false)
    },
});


function AnchorVisible(e: any, show: boolean) {
    let item = e.item as INode
    if (!item) {
        return
    }

    if (!show && e.toShape) {
        return
    }

    let group = zpx.val(item, "_cfg.group") as IGroup

    if (group.get(cttrs.BType) != ElementType.typeGroup) {
        return;
    }

    let shapes = zpx.val(group, "cfg.children") || []
    let anchors = shapes.filter((r: IShape) => r.get(cttrs.BType) == ElementType.anchorOutPoint) as IShape[]
    for (let o of anchors) {
        if (show) {
            o.show()
        } else {
            o.hide()
        }
    }
}