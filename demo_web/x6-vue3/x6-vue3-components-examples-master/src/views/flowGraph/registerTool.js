import { Graph, ToolsView } from '@antv/x6'
// import { X6Menu, X6MenuItem } from '../../components/X6UI'
import { X6Menu, X6MenuItem } from 'x6-vue3-components'
import { createApp } from 'vue'
import { ElMessage } from 'element-plus'
class ContextMenuTool extends ToolsView.ToolItem {
    knob = null
    timer = null

    render() {
        if (!this.knob) {
            this.knob = ToolsView.createElement('div', false) 
            this.knob.style.position = 'absolute'
            this.container.appendChild(this.knob)
        }
        return this
    }

    toggleContextMenu(visible) {
        document.removeEventListener('mousedown', this.onMouseDown)
        let graph = this.graph
        let cell = this.cell
        if (visible) {
            const app = createApp({
                template: `<X6Menu :onClick="contextmenuClick">
                    <X6MenuItem name="delete" key="1">删除</X6MenuItem>
                    <X6MenuItem name="2" key="2">1st menu item</X6MenuItem>
                    <X6MenuItem name="3" key="3">2nd menu item</X6MenuItem>
                    <X6MenuItem name="4" key="4">3rd menu item</X6MenuItem>
                </X6Menu>`,
                components: {
                    X6Menu,
                    X6MenuItem
                },
                methods: {
                    contextmenuClick(name) {
                        if (name == 'delete') {
                            graph.removeCell(cell)
                        } else {
                            ElMessage.success({
                                message: name
                            })
                        }
                    }
                }
            })
            app.mount(this.knob)
            document.addEventListener('mousedown', this.onMouseDown)
        }
    }

    updatePosition(e) {
        const style = this.knob.style
        if (e) {
            const pos = this.graph.clientToGraph(e.clientX, e.clientY)
            style.left = `${pos.x}px`
            style.top = `${pos.y}px`
        } else {
            style.left = '-1000px'
            style.top = '-1000px'
        }
    }

    onMouseDown = () => {
        this.timer = window.setTimeout(() => {
            this.updatePosition()
            this.toggleContextMenu(false)
        }, 200)
    }

    onContextMenu({ e }) {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0
        }
        this.updatePosition(e)
        this.toggleContextMenu(true)
    }

    delegateEvents() {
        this.cellView.on('cell:contextmenu', this.onContextMenu, this)
        return super.delegateEvents()
    }

    onRemove() {
        this.cellView.off('cell:contextmenu', this.onContextMenu, this)
    }
}

ContextMenuTool.config({
    tagName: 'div',
    isSVGElement: false,
})
Graph.registerEdgeTool('contextmenu', ContextMenuTool, true)
Graph.registerNodeTool('contextmenu', ContextMenuTool, true)