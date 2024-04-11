import store from '@/store'
let initGraphEvent = function(graph, container) {
    const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
    }
    graph.on('node:mouseenter', () => {
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, false)
    })

    graph.on('blank:mousewheel', ({ e }) => {
        if (e.ctrlKey) {
            setTimeout(() => {
                let zoomValue = graph.zoom() * 100
                zoomValue = `${Math.round(zoomValue)}%`
                store.dispatch("setZoomValue", zoomValue)
            }, 300)
        }
    })
    graph.on('cell:mousewheel', ({ e }) => {
        if (e.ctrlKey) {
            setTimeout(() => {
                let zoomValue = graph.zoom() * 100
                zoomValue = `${Math.round(zoomValue)}%`
                store.dispatch("setZoomValue", zoomValue)
            }, 300)
        }
    })
    graph.on('cell:selected', ({ cell, options }) => { 
        store.dispatch("setSelected", true)
    })
    graph.on('node:unselected', ({ cell, options }) => { 
        store.dispatch("setSelected", false)
    })
    graph.on('cell:dblclick', ({ cell, e }) => {
        const isNode = cell.isNode()
        const name = cell.isNode() ? 'node-editor' : 'edge-editor'
        cell.removeTool(name)
        cell.addTools({
            name,
            args: {
                event: e,
                attrs: {
                    backgroundColor: isNode ? '#EFF4FF' : '#FFF',
                },
            },
        })
    })
    graph.on('blank:click', ({ e, x, y }) => {
        store.dispatch("setFormatType", "graph")
    })
    graph.on('node:click', ({ e, x, y, node, view }) => {
        store.dispatch("setFormatType", "node")
        store.dispatch("setFormatNode", node)
    })
    graph.on('edge:click', ({ e, x, y, edge, view }) => {
        store.dispatch("setFormatType", "edge")
        store.dispatch("setFormatEdge", edge)
    })
    graph.on('cell:added', ({ cell, index, options }) => {
        cell.removeTool("contextmenu")
        cell.addTools({
            name: "contextmenu",
        })
    })

}

export default initGraphEvent