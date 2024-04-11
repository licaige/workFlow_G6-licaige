<template>
    <div formatEdge>
        <el-tabs v-model="tabName" type="border-card">
            <el-tab-pane name="class" label="样式">
                <CarouselColor @change="changeLineStrokeColor"/>
                <el-divider></el-divider>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <label>颜色</label>
                    <X6ColorPicker style="width: 60%;" @change="changeLineStrokeColor" :color="formatCellAttrs.line.stroke"></X6ColorPicker>
                </div>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <label>宽度</label>
                    <el-input-number style="width: 60%;" size="mini" v-model="strokeWidth" :min="1" :max="10" @change="handleStrokeWidth" />
                </div>
                <el-divider></el-divider>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <label>连线类型</label>
                    <el-select style=" width: 60%;" @change="changeConnector" v-model="connector.name">
                        <el-option label="默认连线" value="normal"></el-option>
                        <el-option label="圆角连线" value="rounded"></el-option>
                        <el-option label="平滑连线" value="smooth"></el-option>
                        <el-option label="跳线" value="jumpover"></el-option>
                        <el-option label="随机摇摆线" value="wobble"></el-option>
                    </el-select>
                </div>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <label>箭头类型</label>
                    <el-select style=" width: 60%;" @change="changeMarker" v-model="marker">
                        <el-option label="Block" value="block"></el-option>
                        <el-option label="Classic" value="classic"></el-option>
                        <el-option label="Cross" value="cross"></el-option>
                        <el-option label="Async" value="async"></el-option>
                        <el-option label="Circle" value="circle"></el-option>
                        <el-option label="Circle Plus" value="circlePlus"></el-option>
                        <el-option label="Ellipse" value="ellipse"></el-option>
                    </el-select>
                </div>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <label>路由类型</label>
                    <el-select style=" width: 60%;" @change="changeRouter" v-model="router.name">
                        <el-option label="默认路由" value="normal"></el-option>
                        <el-option label="拐线" value="orth"></el-option>
                        <el-option label="关系路由" value="er"></el-option>
                        <el-option label="随机路由" value="random"></el-option>
                    </el-select>
                </div>
            </el-tab-pane>
            <el-tab-pane name="text" label="文本">
                <div class="content" v-if="labels.length > 0">
                    <el-select style="width: 100%;" v-model="labels[0].attrs.label.fontFamily" @change="changeFontFamily">
                        <el-option label="Verdana" value="Verdana"></el-option>
                        <el-option label="Times New Roman" value="Times New Roman"></el-option>
                        <el-option label="Garamond" value="Garamond"></el-option>
                        <el-option label="Comic Sans MS" value="Comic Sans MS"></el-option>
                        <el-option label="Lucida Console" value="Lucida Console"></el-option>
                        <el-option label="Tahoma" value="Tahoma"></el-option>
                        <el-option label="Arial, helvetica, sans-serif" value="Arial, helvetica, sans-serif"></el-option>
                    </el-select>
                </div>
                <el-row v-if="labels.length > 0">
                    <el-col :span="8">
                        <label>文本颜色</label>
                    </el-col>
                    <el-col :span="16">
                        <X6ColorPicker style="margin-top: 4px;" @change="changeTextFillColor" :color="labels[0].attrs.label.fill"></X6ColorPicker>
                    </el-col>
                </el-row>
                <el-row v-if="labels.length > 0">
                    <el-col :span="8">
                        <label>字体大小</label>
                    </el-col>
                    <el-col :span="16">
                        <el-input-number style="width: 100%;" size="mini" v-model="labels[0].attrs.text.fontSize" @change="notifyFontSize" />
                    </el-col>
                </el-row>
                <el-row v-if="labels.length > 0">
                    <el-col :span="8">
                        <label>文本背景</label>
                    </el-col>
                    <el-col :span="16">
                        <X6ColorPicker style="margin-top: 4px;" @change="changeBodyFillColor" :color="labels[0].attrs.body.fill"></X6ColorPicker>
                    </el-col>
                </el-row>
                <el-row v-for="(label, index) in labels" :key="index">
                    <el-col :span="24">
                        <el-input @input="inputText" style="margin-top: 4px;" v-model="label.attrs.label.text"></el-input>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="graphics" label="调整图形">
                <el-button-group style="display: flex;">
                    <el-button @click="toFront" style="flex: 1;" type="primary">移至最前</el-button>
                    <el-button @click="toBack" style="flex: 1;" type="primary">移至最后</el-button>
                </el-button-group>
                <el-button-group style="display: flex;margin-top: 4px;">
                    <el-button @click="setZIndex(1)" style="flex: 1;" type="primary">上移一层</el-button>
                    <el-button @click="setZIndex(-1)" style="flex: 1;" type="primary">下移一层</el-button>
                </el-button-group>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import CarouselColor from './carouselColor'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'FormatEdge',
    components: {
        CarouselColor
    },
    setup() {
        let tabName = ref('class')
        const store = useStore()
        let graphName = computed(() => store.state.currentGraphName)
        let graph = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].graph
        })
        let formatCell = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].formatEdge
        })
        let formatCellAttrs = ref(formatCell.value.attrs)
        let strokeWidth = ref(formatCellAttrs.value.line.strokeWidth)
        let connector = ref(formatCell.value.getConnector() || {name: 'normal'})
        let marker = ref(formatCellAttrs.value.line.targetMarker.name)
        let router = ref(formatCell.value.getRouter() || {name: 'normal'})
        let labels = ref(formatCell.value.getLabels() || [])
        labels.value.forEach(label => {
            if (!label.attrs.label.fontFamily) {
                label.attrs.label.fontFamily = 'Arial, helvetica, sans-serif'
            }
            if (!label.attrs.body) {
                label.attrs.body = {}
            }
            if (!label.attrs.body.fill) {
                label.attrs.body.fill = '#ffffff'
            }
            if (!label.attrs.text) {
                label.attrs.text = {}
            }
            label.attrs.text.fontSize = 14

        })
        formatCell.value.setLabels(labels.value)
        labels = ref(formatCell.value.getLabels() || [])
        return {
            tabName,
            graph,
            formatCell,
            formatCellAttrs,
            strokeWidth,
            connector,
            marker,
            router,
            labels
        }
    },
    methods: {
        inputText() {
            this.formatCell.setLabels(JSON.parse(JSON.stringify(this.labels)))
        },
        setZIndex(index) {
            let zindex = this.formatCell.getZIndex()
            this.formatCell.setZIndex(zindex + index)
        },
        toFront() {
            this.formatCell.toFront()
        },
        toBack() {
            this.formatCell.toBack()
        },
        changeBodyFillColor(color) {
            this.labels.forEach(label => {
                label.attrs.body.fill = color
            })
            this.formatCell.setLabels(JSON.parse(JSON.stringify(this.labels)))
        },
        notifyFontSize() {
            this.labels.forEach(label => {
                label.attrs.text.fontSize = this.labels[0].attrs.text.fontSize
            })
            this.formatCell.setLabels(JSON.parse(JSON.stringify(this.labels)))
        },
        changeTextFillColor(color) {
            this.labels.forEach(label => {
                label.attrs.label.fill = color
            })
            this.formatCell.setLabels(JSON.parse(JSON.stringify(this.labels)))
        },
        changeFontFamily() {
            this.labels.forEach(label => {
                label.attrs.label.fontFamily = this.labels[0].attrs.label.fontFamily
            })
            this.formatCell.setLabels(JSON.parse(JSON.stringify(this.labels)))
        },
        changeFormatCell(options) {
            this.formatCell.setAttrs(options)
            this.formatCellAttrs = this.formatCell.getAttrs()
            this.$store.dispatch("setFormatEdge", this.formatCell)
        },
        changeLineStrokeColor(color) {
            let options = {
                line: { stroke: color },
            }
            this.changeFormatCell(options)
        },
        handleStrokeWidth() {
            let options = {
                line: { strokeWidth: this.strokeWidth },
            }
            this.changeFormatCell(options)
        },
        changeConnector() {
            this.formatCell.setConnector(this.connector.name)
        },
        changeMarker() {
            let options = {
                line: {
                    targetMarker: {
                        name: this.marker
                    }
                }
            }
            this.changeFormatCell(options)
        },
        changeRouter() {
            this.formatCell.setRouter(this.router.name)
        }
    }
}
</script>