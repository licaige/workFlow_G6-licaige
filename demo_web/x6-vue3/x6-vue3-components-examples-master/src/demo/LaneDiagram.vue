<template>
    <div>
        <div ref="container"></div>
    </div>
</template>
<script>
// , Cell, CellView, Node
import { Graph } from '@antv/x6'
Graph.registerNode(
  'lane',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'rect',
        selector: 'name-rect',
      },
      {
        tagName: 'text',
        selector: 'name-text',
      },
    ],
    attrs: {
      body: {
        fill: '#FFF',
        stroke: '#5F95FF',
        strokeWidth: 1,
      },
      'name-rect': {
        width: 200,
        height: 30,
        fill: '#5F95FF',
        stroke: '#fff',
        strokeWidth: 1,
        x: -1,
      },
      'name-text': {
        ref: 'name-rect',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontWeight: 'bold',
        fill: '#fff',
        fontSize: 12,
      },
    },
  },
  true,
)
Graph.registerNode(
  'lane-rect',
  {
    inherit: 'rect',
    width: 100,
    height: 60,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
  },
  true,
)

Graph.registerNode(
  'lane-polygon',
  {
    inherit: 'polygon',
    width: 80,
    height: 80,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        refPoints: '0,10 10,0 20,10 10,20',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
  },
  true,
)

Graph.registerEdge(
  'lane-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
    label: {
      attrs: {
        label: {
          fill: '#A2B1C3',
          fontSize: 12,
        },
      },
    },
  },
  true,
)
export default {
    name: 'LaneDiagram',
    data() {
        return {
            graph: ''
        }
    },
    mounted() {
        const graph = new Graph({
            container: this.$refs.container,
            connecting: {
                router: 'orth',
            },
            width: 800,
            height: 600,
            grid: {
                size: 10,
                visible: true,
            },
            translating: {
                restrict(cellView) {
                    const cell = cellView.cell
                    const parentId = cell.prop('parent')
                    if (parentId) {
                        const parentNode = graph.getCellById(parentId)
                        if (parentNode) {
                            return parentNode.getBBox().moveAndExpand({
                                x: 0,
                                y: 30,
                                width: 0,
                                height: -30
                            })
                        }
                    }
                    return cell.getBBox()
                }
            }
        })
        this.graph = graph
        fetch('/data/swimlane.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const cells = []
                data.forEach((item) => {
                    if (item.shape === 'lane-edge') {
                        cells.push(graph.createEdge(item))
                    } else {
                        cells.push(graph.createNode(item))
                    }
                })
                graph.resetCells(cells)
                graph.zoomToFit({ padding: 10, maxScale: 1 })
            })
    }
}
</script>