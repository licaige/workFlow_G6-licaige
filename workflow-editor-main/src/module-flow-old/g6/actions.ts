import {IGroup} from "@antv/g-base";
import zpx from "zpx";
import {cttrs, ElementType} from "../lib/types";
import {Graph, INode, IShape} from "@antv/g6";

export function getGraph(e: any): Graph | void {
    let target = e.currentTarget

    if (!target) {
        return
    }

    if ((target.cfg || {}).renderer == "canvas") {
        return target
    }

    return
}

export function findAllGroup(groups: IGroup[]): IGroup[] {
    if (!groups || groups.length == 0) {
        return []
    }

    let result: IGroup[] = []

    for (let o of groups) {
        result.push(o)
        result.push(...findAllGroup(o.cfg.children || []))
    }
    return result
}

// 展示/隐藏 所有输入节点（edge）
export function showAllAnchorIn(e: any, uuid: string, show: boolean) {
    let graph = getGraph(e)
    if (!graph) {
        return
    }


    let groups: IGroup[] = findAllGroup([graph.getGroup()])
    if (groups.length == 0) {
        return
    }

    for (let group of groups) {
        if (group.get(cttrs.BType) != ElementType.typeGroup) {
            continue
        }

        let children = group.getChildren() as IShape[]
        for (let shape of children) {
            // 要消失，那就所有锚点都消息
            if (!show && [ElementType.anchorOutPoint, ElementType.anchorInPoint].indexOf(shape.get(cttrs.BType)) > -1) {
                shape.hide()
                continue
            }

            // 只显示接入点
            if (show && shape.get(cttrs.BType) == ElementType.anchorInPoint && shape.get(cttrs.UUID) != uuid) {
                shape.show()
            }
        }
    }
}