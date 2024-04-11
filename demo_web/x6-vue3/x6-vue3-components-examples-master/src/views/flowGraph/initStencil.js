import { Addon } from '@antv/x6'
import nodePorts from './nodePorts'
let initStencil = function(graph, el) {
    const stencil = new Addon.Stencil({
        title: '节点',
        target: graph,
        stencilGraphWidth: 220,
        stencilGraphHeight: 180,
        collapsable: true,
        search: (cell, keyword, groupName, stencil) => {
            if (keyword) {
                return cell.label && cell.label.includes(keyword)
            }
            return true
        },
        groups: [
            {
                title: '内置节点',
                name: 'builtInNode',
                graphHeight: 250,
            },
            {
                title: '自定义节点',
                name: 'customizeNode',
            },
            {
                title: '图片节点',
                name: 'imageNode',
                graphHeight: 250,
                layoutOptions: {
                    rowHeight: 70,
                }
            },
            {
                title: 'Vue节点',
                name: 'vueNode',
                graphHeight: 100,
                layoutOptions: {
                    columns: 1,
                    columnWidth: 160
                }
            }
        ],
        layoutOptions: {
            columns: 2,
            columnWidth: 100,
            rowHeight: 55
        }
    })
    const builtInNode1 = graph.createNode({
        shape: 'rect',
        label: 'Rect',
        width: 66,
        height: 45,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode2 = graph.createNode({
        shape: 'ellipse',
        label: 'Ellipse',
        width: 66,
        height: 45,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode3 = graph.createNode({
        shape: 'circle',
        label: 'Circle',
        width: 66,
        height: 45,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode4 = graph.createNode({
        shape: 'path',
        label: 'Path',
        width: 66,
        height: 45,
        path: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode5 = graph.createNode({
        shape: 'polygon',
        label: 'Polygon',
        width: 50,
        height: 50,
        points:
        '26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182',
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode6 = graph.createNode({
        shape: 'polyline',
        label: 'Polyline',
        width: 66,
        height: 45,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                refPoints: '0,0 0,10 10,10 10,0'
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode7 = graph.createNode({
        shape: 'cylinder',
        label: 'Cylinder',
        width: 40,
        height: 50,
        attrs: {
            top: {
                strokeWidth: 1,
                fill: '#5F95FF',
                fillOpacity: 0.5,
            },
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                fillOpacity: 0.8
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    const builtInNode8 = graph.createNode({
        shape: 'text-block',
        text: 'text-block',
        width: 66,
        height: 45,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                rx: 4,
                ry: 4,
            },
            text: {
                fontSize: 12,
                fill: '#262626'
            }
        },
        ports: { ...nodePorts }
    })
    stencil.load([builtInNode1, builtInNode2, builtInNode3, 
        builtInNode4, builtInNode5, builtInNode6, builtInNode7, builtInNode8], 'builtInNode')
    const customizeNode1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始',
        attrs: {
            body: {
                rx: 20,
                ry: 26,
            },
        },
    })
    const customizeNode2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程',
    })
    const customizeNode3 = graph.createNode({
        shape: 'custom-rect',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
            },
        },
        label: '可选过程',
    })
    const customizeNode4 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
            },
        },
        label: '决策',
    })
    const customizeNode5 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '10,0 40,0 30,20 0,20',
            },
        },
        label: '数据',
    })
    const customizeNode6 = graph.createNode({
        shape: 'custom-circle',
        label: '连接',
    })
    stencil.load([customizeNode1, customizeNode2, customizeNode3, customizeNode4, customizeNode5, customizeNode6], 'customizeNode')

    const imageShapes = [
        {
            label: 'Client',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
        },
        {
            label: 'Http',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
        },
        {
            label: 'Api',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
        },
        {
            label: 'Sql',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
        },
        {
            label: 'Clound',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
        },
        {
            label: 'Mq',
            image:
            'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
        },
    ]

    const imageNodes = imageShapes.map((item) =>
        graph.createNode({
            shape: 'custom-image',
            label: item.label,
            attrs: {
                image: {
                    'xlink:href': item.image,
                },
            },
        }),
    )
    stencil.load(imageNodes, 'imageNode')

    const vueNode1 = graph.createNode({
        shape: 'vue-demo',
        width: 78,
        height: 24,
        ports: { ...nodePorts }
    })
    stencil.load([vueNode1], 'vueNode')
    

    el.appendChild(stencil.container)
}
export default initStencil