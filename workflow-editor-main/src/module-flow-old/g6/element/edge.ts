import G6, {IShape, INode, IPoint} from '@antv/g6';
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup} from "@antv/g-base";
import {ElementType, cttrs} from "../../lib/types";
import zpx from "zpx";

G6.registerEdge(ElementType.edge, {
    afterDraw(cfg, group) {
        if (!cfg || !group) {
            return
        }
        const shape = group.get('children')[0];
        const startPoint = shape.getPoint(0);
        const circle = group.addShape('circle', {
            attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: '#1890ff',
                r: 3,
            },
            name: 'circle-shape',
        });
        circle.animate(
            (ratio: number) => {
                const tmpPoint = shape.getPoint(ratio);
                return {
                    x: tmpPoint.x,
                    y: tmpPoint.y,
                };
            },
            {
                repeat: true,
                duration: 3000,
            },
        );
    },
    getCustomConfig: (cfg: ModelConfig) => {
        cfg.label = cfg.label || "表单提交"
        return cfg
    },
    getPathPoints: (cfg: ModelConfig) => {
        return cfg
    }
}, "polyline")

