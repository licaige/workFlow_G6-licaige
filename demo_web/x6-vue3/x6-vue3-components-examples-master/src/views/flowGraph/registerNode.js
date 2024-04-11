import nodePorts from './nodePorts'
import "@antv/x6-vue-shape"
import Demo from './vueNode/demo.vue'
let use = function(Graph) {
    Graph.registerNode("vue-demo", {
        inherit: "vue-shape",
        x: 200,
        y: 150,
        width: 78,
        height: 24,
        component: {
            template: `<Demo />`,
            components: {
                Demo,
            }
        }
    }, true)
    Graph.registerNode(
        'custom-rect',
        {
            inherit: 'rect',
            width: 66,
            height: 36,
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                },
                text: {
                    fontSize: 12,
                    fill: '#262626',
                }
            },
            ports: { ...nodePorts }
        },
        true
    )
    
    Graph.registerNode(
        'custom-polygon',
        {
            inherit: 'polygon',
            width: 66,
            height: 36,
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
            ports: {
                ...nodePorts,
                items: [
                    {
                        group: 'top',
                    },
                    {
                        group: 'bottom',
                    }
                ]
            }
        },
        true
    )
    
    Graph.registerNode(
        'custom-circle',
        {
            inherit: 'circle',
            width: 45,
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
        },
        true
    )
    
    Graph.registerNode(
        'custom-image',
        {
            inherit: 'rect',
            width: 52,
            height: 52,
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'image',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: {
                body: {
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
                image: {
                    width: 26,
                    height: 26,
                    refX: 13,
                    refY: 16,
                },
                label: {
                    refX: 3,
                    refY: 2,
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    fontSize: 12,
                    fill: '#fff',
                },
            },
            ports: { ...nodePorts },
        },
        true,
    )
}

export default {
    use
}
