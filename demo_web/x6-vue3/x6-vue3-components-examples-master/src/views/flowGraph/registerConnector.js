import { Path, Point } from '@antv/x6'
let use = function(Graph) {
    Graph.registerConnector(
        'wobble',
        (sourcePoint, targetPoint, vertices, args) => {
            const spread = args.spread || 20
            const points = [...vertices, targetPoint].map((p) => Point.create(p))
            let prev = Point.create(sourcePoint)
            const path = new Path()
            path.appendSegment(Path.createSegment('M', prev))
      
            for (let i = 0, n = points.length; i < n; i += 1) {
                const next = points[i]
                const distance = prev.distance(next)
                let d = spread
        
                while (d < distance) {
                    const current = prev.clone().move(next, -d)
                    current.translate(
                        Math.floor(7 * Math.random()) - 3,
                        Math.floor(7 * Math.random()) - 3,
                    )
                    path.appendSegment(Path.createSegment('L', current))
                    d += spread
                }
        
                path.appendSegment(Path.createSegment('L', next))
                prev = next
            }
        
            return path
        },
        true,
    )
}

export default {
    use
}
