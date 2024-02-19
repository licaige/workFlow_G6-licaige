import G6 from "@antv/g6";
import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {StepNode} from "../type";


G6.registerNode("c-image", {
    setState(name?: string, value?: string | boolean, item?: Item) {
        // if (name == "selected" && value !== undefined) {
        // }
        // console.log(name, value, item)
    },

    draw: (cfg?: ModelConfig, group?: IGroup) => {
        if (!cfg || !group) {
            return {} as IShape
        }

        switch ((cfg.config as StepNode).imgType) {
            case "endpoint":
                return drawEndpoint(cfg, group)
            case "rect":
                return drawRect(cfg, group)
            case "gateway":
                return drawGateway(cfg, group)
        }
    },
})

function drawRect(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    AnchorPoint(cfg, group, [[1, 1]], [[1, 1]])

    return group.addShape('rect', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            fill: "fff",
            opacity: 0,
        },
        name: 'rect-shape',
    });
}

function drawEndpoint(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    AnchorPoint(cfg, group, [[1, 1]], [[1, 1]])

    return group.addShape('circle', {
        attrs: {
            r: config.width / 2,
            fill: "fff",
            stroke: "000",
            opacity: 0,
        },
        name: 'circle-shape',
    });
}

function drawGateway(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    AnchorPoint(cfg, group, [[1, 1]], [[1, 1]])

    return group.addShape('polygon', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            points: [
                [0, -config.height / 2],
                [config.width / 2, 0],
                [0, config.height / 2],
                [-config.width / 2, 0],
            ],
            fill: "fff",
            opacity: 0,
        },
        name: 'polygon-shape',
    });
}

function AnchorPoint(cfg: ModelConfig, group: IGroup, inAnchor: number[][], outAnchor: number[][]) {
    let config = cfg.config as StepNode

    let shapes: IShape[] = []


    for (let o of inAnchor) {
        if (o.length != 2) {
            continue
        }



        let s = group.addShape("circle", {
            attrs: {
                x: 0,
                y: 0,
                r: 4,
                fill: "333333",
                stroke: "326728",
                cursor: "crosshair",
            },
            visible: true,
        })
        shapes.push(s)
    }

    for (let o of outAnchor) {
        if (o.length != 2) {
            continue
        }

        let s = group.addShape("circle", {
            attrs: {
                x: 0,
                y: 0,
                r: 4,
                fill: "333333",
                stroke: "326728",
                cursor: "crosshair",
            },
            visible: true,
        })
        shapes.push(s)
    }

    return shapes
}