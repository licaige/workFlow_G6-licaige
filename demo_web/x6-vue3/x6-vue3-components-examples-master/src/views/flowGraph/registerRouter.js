import { Point } from '@antv/x6'
let use = function(Graph) {
    Graph.registerRouter(
        'random',
        (vertices, args, view) => {
            const BOUNCES = args.bounces || 20
            const points = vertices.map((p) => Point.create(p))
        
            for (let i = 0; i < BOUNCES; i += 1) {
                const sourceCorner = view.sourceBBox.getCenter()
                const targetCorner = view.targetBBox.getCenter()
                const randomPoint = Point.random(
                    sourceCorner.x,
                    targetCorner.x,
                    sourceCorner.y,
                    targetCorner.y,
                )
                points.push(randomPoint)
            }
        
            return points
        },
        true,
    )
}

export default {
    use
}
