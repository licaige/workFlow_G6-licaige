import StepStart from "../../../assets/step_start.svg"
import StepEnd from "../../../assets/step_end.svg"
import GatewayMutex from "../../../assets/gateway-mutex.svg"
import GatewayParallel from "../../../assets/gateway-parallel.svg"
import FlowTask from "../../../assets/flow-task.svg"
import FlowUser from "../../../assets/flow-user.svg"
import {ElementType, INode} from "../../lib/types";
import zpx from "zpx";

export const steps: INode[] = [
    {
        name: "开始",
        type: ElementType.nodeStart,
        background: StepStart,
        size: [42, 42],
        outPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
    {
        name: "结束",
        type: ElementType.nodeEnd,
        background: StepEnd,
        size: [42, 42],
        inPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
    {
        name: "任务流转",
        type: ElementType.nodeTask,
        background: FlowTask,
        size: [80, 44],
        inPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
        outPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
    {
        name: "人员指派",
        type: ElementType.nodeUser,
        background: FlowUser,
        size: [80, 44],
        inPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
        outPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
    {
        name: "并行任务",
        type: ElementType.nodeParallel,
        background: GatewayParallel,
        size: [42, 42],
        inPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
        outPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
    {
        name: "互斥任务",
        type: ElementType.nodeMutex,
        background: GatewayMutex,
        size: [42, 42],
        inPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
        outPoints: [
            [0.5, 1],
            [0.5, 0],
            [0, 0.5],
            [1, 0.5],
        ],
    },
]

export function stepAttr(type: string) {
    let step = steps.find(r => r.type == type) || {} as any
    return {
        id: zpx.uuid(),
        name: step.name,
        type: step.type,
        size: step.size,
        inPoints: step.inPoints,
        outPoints: step.outPoints,
    }
}