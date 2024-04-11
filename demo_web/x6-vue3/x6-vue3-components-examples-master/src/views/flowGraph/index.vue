<template>
    <div>
        <MenuBar></MenuBar>
        <div ref="mainCon" id="main-con" class="main-con">
            <FlowToolbar @fullScreen="fullScreen"></FlowToolbar>
            <div ref="container" id="container" :class="isFullScreen ? 'containerFull' : ''">
                <div ref="stencil" id="stencil"></div>
                <div ref="graphContainer" id="graph-container"></div>
                <div v-show="thumbnail || format" class="iframe">
                    <div v-show="thumbnail" class="thumbnailBox">
                        <div class="thumbnailHead">
                            <span class="thumbnailTitle">缩略图</span>
                            <span @click="closeThumbnail" class="thumbnailIcon"><CloseBold  style="width: 20px;height: 20px;" /></span>
                        </div>
                        <div ref="minimap" id="minimap"></div>
                    </div>
                    <div v-show="format" :style="!thumbnail ? 'height: calc(100% - 10px);' : ''" class="formatBox">
                        <div class="formatHead">
                            <span class="formatTitle">
                                格式面板-
                                <span v-if="formatType == 'graph'">空白</span>
                                <span v-if="formatType == 'node'">节点</span>
                                <span v-if="formatType == 'edge'">连接线</span>
                            </span>
                            <span @click="closeFormat" class="formatIcon"><CloseBold  style="width: 20px;height: 20px;" /></span>
                        </div>
                        <X6Scrollbox style="height: 90%;">
                            <Format ref="formatRef" id="format"></Format>
                        </X6Scrollbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'
import { Graph, Shape } from '@antv/x6'
import { useStore } from 'vuex'
import screenfull from 'screenfull'
import FlowToolbar from './flowToolbar.vue'
import MenuBar from './menuBar'
import Format from './format'
import initStencil from './initStencil'
import initGraphEvent from './initGraphEvent'
import bindGraphKey from './hotKeys'
import registerNode from './registerNode'
import registerRouter from './registerRouter'
import registerConnector from './registerConnector'
import './registerTool'
registerNode.use(Graph)
registerRouter.use(Graph)
registerConnector.use(Graph)
export default {
    name: 'FlowGraph',
    components: {
        FlowToolbar,
        MenuBar,
        Format
    },
    setup() {
        let mainCon = ref()
        let container = ref()
        let stencil = ref()
        let graphContainer = ref()
        let minimap = ref()
        let formatRef = ref()
        let graph = ref()
        let graphName = ref('Untitled')
        let isFullScreen = ref(false)
        const store = useStore()
        let minimapWidth = computed(() => store.state.minimapWidth)
        // let graphName = computed(() => store.state.currentGraphName)
        let thumbnail = computed(() => {
            if (store.state.graphMap[graphName.value]) {
                return store.state.graphMap[graphName.value].thumbnail
            } else {
                return true
            }
        })
        let format = computed(() => {
            if (store.state.graphMap[graphName.value]) {
                return store.state.graphMap[graphName.value].format
            } else {
                return true
            }
        })
        let formatType = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].formatType
        })
        let gridOptions = reactive({
            type: 'dot',
            size: 10,
            color: '#aaaaaa',
            thickness: 1,
            colorSecond: '#888888',
            thicknessSecond: 3,
            factor: 4,
        })
        let backgroundColor = ref('#f5f5f5')
        return {
            mainCon,
            container,
            stencil,
            graphContainer,
            minimap,
            formatRef,
            graph,
            graphName,
            isFullScreen,
            minimapWidth,
            thumbnail,
            format,
            gridOptions,
            backgroundColor,
            formatType
        }
    },
    emits: ["init"],
    mounted() {
        this.initGraph()
        screenfull.on('change', (e) => {
            let offsetHeight = e.target.offsetHeight
            let offsetWidth = e.target.offsetWidth
            let minimapWidth = this.minimapWidth
            if (!this.thumbnail && !this.format) {
                minimapWidth = 0
            }
            this.graph.resize(offsetWidth - minimapWidth, offsetHeight - 42)
        })
    },
    methods: {
        closeFormat() {
            this.$store.dispatch('setFormat', false)
            if (!this.thumbnail) {
                let graph = this.graph
                let minimapWidth = this.$store.state.minimapWidth
                let offsetHeight = graph.container.offsetHeight
                let offsetWidth = graph.container.offsetWidth
                graph.resize(offsetWidth + minimapWidth, offsetHeight)
            }
        },
        closeThumbnail() {
            this.$store.dispatch('setThumbnail', false)
            if (!this.format) {
                let graph = this.graph
                let minimapWidth = this.$store.state.minimapWidth
                let offsetHeight = graph.container.offsetHeight
                let offsetWidth = graph.container.offsetWidth
                graph.resize(offsetWidth + minimapWidth, offsetHeight)
            }
        },
        fullScreen() {
            let screenFullAlias = screenfull
            if (screenFullAlias.isFullscreen) {
                screenFullAlias.exit()
                this.isFullScreen = false
            } else {
                if (screenFullAlias.isEnabled) {
                    screenFullAlias.request(this.$refs.mainCon)
                    this.isFullScreen = true
                }
            }
        },
        initGraph() {
            let graph = new Graph({
                container: this.$refs.graphContainer,
                background: {
                    color: this.backgroundColor,
                },
                grid: {
                    size: this.gridOptions.size,
                    visible: true,
                    type: this.gridOptions.type,
                    args: { 
                        color: this.gridOptions.color,
                        thickness: this.gridOptions.thickness,
                        colorSecond: this.gridOptions.colorSecond,
                        thicknessSecond: this.gridOptions.thicknessSecond,
                        factor: this.gridOptions.factor
                    }
                },
                mousewheel: {
                    enabled: true,
                    zoomAtMousePosition: true,
                    modifiers: 'ctrl',
                    minScale: 0.5,
                    maxScale: 3
                },
                minimap: {
                    enabled: true,
                    container: this.$refs.minimap,
                    width: this.minimapWidth,
                    height: 180,
                    padding: 10,
                },
                scroller: {
                    enabled: true,
                    pageVisible: true,
                    pageBreak: true,
                    pannable: true,
                    autoResize: true,
                    modifiers: ['alt']
                },
                connecting: {
                    router: {
                        name: 'manhattan',
                        args: {
                            padding: 1,
                        }
                    },
                    connector: {
                        name: 'rounded',
                        args: {
                            radius: 8,
                        }
                    },
                    anchor: 'center',
                    connectionPoint: 'anchor',
                    allowBlank: false,
                    snap: {
                        radius: 20,
                    },
                    createEdge() {
                        return new Shape.Edge({
                            attrs: {
                                line: {
                                    stroke: '#A2B1C3',
                                    strokeWidth: 2,
                                    targetMarker: {
                                        name: 'block',
                                        width: 12,
                                        height: 8,
                                    },
                                },
                            },
                            zIndex: 0
                        })
                    },
                    validateConnection({ targetMagnet }) {
                        return !!targetMagnet
                    },
                },
                highlighting: {
                    magnetAdsorbed: {
                        name: 'stroke',
                        args: {
                            attrs: {
                                fill: '#5F95FF',
                                stroke: '#5F95FF',
                            },
                        },
                    },
                },
                resizing: true,
                rotating: true,
                selecting: {
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                },
                autoResize: true,
                snapline: true,
                keyboard: true,
                clipboard: true,
                history: true
            })
            this.graph = graph
            this.$store.dispatch("setGraphName", this.graphName)
            this.$store.dispatch("setCurrentGraphName", this.graphName)
            this.$store.dispatch("setGraphMap", graph)
            this.$store.dispatch("setZoomValue", '100%')
            this.$store.dispatch("setFormat", true)
            this.$store.dispatch("setThumbnail", true)
            this.$store.dispatch("setGrid", true)
            this.$store.dispatch("setFormatType", "graph")
            this.$store.dispatch("setGridOption", this.gridOptions)
            this.$store.dispatch("setBackgroundColor", this.backgroundColor)
            bindGraphKey(graph)
            initGraphEvent(graph, this.$refs.graphContainer)
            initStencil(graph, this.$refs.stencil)
            this.$emit('init', graph)
        }
    }
}
</script>
<style lang="scss">
.main-con {
    display: flex;
    flex-direction: column;
    background-color: white;
}
#container {
    width: calc(100% - 2px);
    height: calc(100vh - 72px);
    display: flex;
    border: 1px solid #dfe3e8;
}
.containerFull {
    height: calc(100vh - 42px)!important;
}
#stencil {
    width: 220px;
    height: 100%;
    position: relative;
    border-right: 1px solid #dfe3e8;
}
#graph-container {
    width: calc(100% - 220px);
    height: 100%;
}
.iframe {
    width: 340px;
    .thumbnailBox {
        .thumbnailHead {
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-bottom: unset;
            display: flex;
            align-items: center;
            .thumbnailTitle {
                padding-left: 4px;
            }
            .thumbnailIcon {
                flex: 1;
                line-height: 0;
                cursor: pointer;
                text-align: right;
                margin-right: 4px;
            }
        }
    }
    .formatBox {
        height: calc(100% - 208px);
        .formatHead {
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-bottom: unset;
            display: flex;
            align-items: center;
            .formatTitle {
                padding-left: 4px;
            }
            .formatIcon {
                flex: 1;
                line-height: 0;
                cursor: pointer;
                text-align: right;
                margin-right: 4px;
            }
        }
    }
}
#minimap {
    border: 1px solid rgb(0 0 0 / 12%);
}
#format {
    height: calc(100% - 28px);
    padding: 4px;
    border-bottom: unset;
    border: 1px solid rgba(0, 0, 0, 0.12);
}
.x6-widget-stencil  {
    background-color: #fff;
}
.x6-widget-stencil-title {
    background-color: #fff;
}
.x6-widget-stencil-group-title {
    background-color: #fff !important;
}
.x6-widget-transform {
    margin: -1px 0 0 -1px;
    padding: 0px;
    border: 1px solid #239edd;
}
.x6-widget-transform > div {
    border: 1px solid #239edd;
}
.x6-widget-transform > div:hover {
    background-color: #3dafe4;
}
.x6-widget-transform-active-handle {
    background-color: #3dafe4;
}
.x6-widget-transform-resize {
    border-radius: 0;
}
.x6-widget-selection-inner {
    border: 1px solid #239edd;
}
.x6-widget-selection-box {
    opacity: 0;
}
.x6-graph-scroller::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent;
  position: fixed;
}
/* 滚动槽 */
.x6-graph-scroller::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
.x6-graph-scroller::-webkit-scrollbar-thumb {
  opacity: 1;
  background: transparent;
  border-radius: 4px;
}

.x6-widget-stencil-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent;
  position: fixed;
}
/* 滚动槽 */
.x6-widget-stencil-content::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
.x6-widget-stencil-content::-webkit-scrollbar-thumb {
  opacity: 1;
  background: transparent;
  border-radius: 4px;
}
* {
  &:hover {
    ::-webkit-scrollbar-thumb {
      opacity: 1;
      background: #e2e2e2;
    }
  }
}
</style>