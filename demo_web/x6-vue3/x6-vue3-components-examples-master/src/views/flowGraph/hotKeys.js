import store from '@/store'
import { DataUri } from '@antv/x6'
export const hotkeys = {
    'Ctrl+H': (graph, e) => {
        graph.zoomTo(1)
        let zoomValue = graph.zoom() * 100
        zoomValue = `${Math.round(zoomValue)}%`
        store.dispatch("setZoomValue", zoomValue)
        return graph.zoom()
    },
    'Ctrl+Shift+H': (graph, e) => {
        graph.zoomToFit()
        graph.centerContent()
        let zoomValue = graph.zoom() * 100
        zoomValue = `${Math.round(zoomValue)}%`
        store.dispatch("setZoomValue", zoomValue)
        return graph.zoom()
    },
    'Ctrl+=': (graph, e) => {
        graph.zoom(0.1)
        let zoomValue = graph.zoom() * 100
        zoomValue = `${Math.round(zoomValue)}%`
        store.dispatch("setZoomValue", zoomValue)
        return graph.zoom()
    },
    'Ctrl+-': (graph, e) => {
        graph.zoom(-0.1)
        let zoomValue = graph.zoom() * 100
        zoomValue = `${Math.round(zoomValue)}%`
        store.dispatch("setZoomValue", zoomValue)
        return graph.zoom()
    },
    'Ctrl+Z': (graph, e) => {
        if (graph.history.canUndo()) {
            graph.history.undo()
        }
    },
    'Ctrl+Shift+Z': (graph, e) => {
        if (graph.history.canRedo()) {
            graph.history.redo()
        }
    },
    'Delete': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.removeCells(cells)
        }
    },
    'Ctrl+C': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.copy(cells)
            store.dispatch("setPasted", true)
        }
    },
    'Ctrl+V': (graph, e) => {
        if (!graph.isClipboardEmpty()) {
            const cells = graph.paste({ offset: 32 })
            graph.cleanSelection()
            graph.select(cells)
            store.dispatch("setPasted", false)
        }
    },
    'Ctrl+A': (graph, e) => {
        if (graph.isSelectionEnabled()) {
            const cells = graph.model.collection.cells
            graph.select(cells)
        }
    },
    'Ctrl+X': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.cut(cells)
            store.dispatch("setPasted", true)
        }
    },
    'Ctrl+S': (graph, e) => {
        let json = JSON.stringify(graph.toJSON(), null, "\t")
        let graphName = store.getters.currentGraphName
        var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
        DataUri.downloadBlob(blob, `${graphName}.json`)
    },
    'Ctrl+Shift+P': (graph, e) => {
        let graphName = store.getters.currentGraphName
        let format = store.state.graphMap[graphName] && store.state.graphMap[graphName].format
        let thumbnail = store.state.graphMap[graphName] && store.state.graphMap[graphName].thumbnail
        format = !format
        store.dispatch('setFormat', format)
        let minimapWidth = store.state.minimapWidth
        let offsetHeight = graph.container.offsetHeight
        let offsetWidth = graph.container.offsetWidth
        if (format && !thumbnail) {
            graph.resize(offsetWidth - minimapWidth + 240, offsetHeight)
        }
        if (!format && !thumbnail) {
            graph.resize(offsetWidth + minimapWidth, offsetHeight)
        }

    },
    'Ctrl+Shift+O': (graph, e) => {
        let graphName = store.getters.currentGraphName
        let format = store.state.graphMap[graphName] && store.state.graphMap[graphName].format
        let thumbnail = store.state.graphMap[graphName] && store.state.graphMap[graphName].thumbnail
        thumbnail = !thumbnail
        store.dispatch('setThumbnail', thumbnail)
        let minimapWidth = store.state.minimapWidth
        let offsetHeight = graph.container.offsetHeight
        let offsetWidth = graph.container.offsetWidth
        if (!format && thumbnail) {
            graph.resize(offsetWidth - minimapWidth + 240, offsetHeight)
        }
        if (!format && !thumbnail) {
            graph.resize(offsetWidth + minimapWidth, offsetHeight)
        }
    },
    'Ctrl+Shift+G': (graph, e) => {
        let graphName = store.getters.currentGraphName
        let grid = store.state.graphMap[graphName] && store.state.graphMap[graphName].grid
        grid = !grid
        store.dispatch('setGrid', grid)
        grid ? graph.showGrid() : graph.hideGrid()
    },
    'Ctrl+B': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            cells.forEach(cell => {
                let cellAttrs = cell.getAttrs()
                let fontWeight = 'bold'
                if (cellAttrs.text.fontWeight == 'bold') {
                    fontWeight = 'unset'
                }
                cell.setAttrs({
                    text: {
                        fontWeight: fontWeight
                    }
                })
            })
        }
    },
    'Ctrl+I': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            cells.forEach(cell => {
                let cellAttrs = cell.getAttrs()
                let fontStyle = 'italic'
                if (cellAttrs.text.fontStyle == 'italic') {
                    fontStyle = 'unset'
                }
                cell.setAttrs({
                    text: {
                        fontStyle: fontStyle
                    }
                })
            })
        }
    },
    'Ctrl+Shift+X': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            cells.forEach(cell => {
                let cellAttrs = cell.getAttrs()
                let textDecoration = 'line-through'
                if (cellAttrs.text.textDecoration == 'line-through') {
                    textDecoration = 'unset'
                }
                cell.setAttrs({
                    text: {
                        textDecoration: textDecoration
                    }
                })
            })
        }
    },
    'Ctrl+U': (graph, e) => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            cells.forEach(cell => {
                let cellAttrs = cell.getAttrs()
                let textDecoration = 'underline'
                if (cellAttrs.text.textDecoration == 'underline') {
                    textDecoration = 'unset'
                }
                cell.setAttrs({
                    text: {
                        textDecoration: textDecoration
                    }
                })
            })
        }
    },
}
let bindGraphKey = function(graph) {
    Object.keys(hotkeys). forEach(key => {
        let event = hotkeys[key]
        graph.bindKey(key.toLowerCase().split(','), (keyboardEvent) => {
            keyboardEvent.preventDefault()
            event(graph, keyboardEvent)
        })
    })
}
export default bindGraphKey
