<template>
    <div formatNode>
        <el-tabs stretch v-model="tabName" type="border-card">
            <el-tab-pane name="class" label="样式">
                <CarouselColor @change="changeBodyFillColor"/>
                <el-divider></el-divider>
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <el-checkbox @change="changeFilling" v-model="isFilling">填充</el-checkbox>
                    <X6ColorPicker v-if="isFilling" style="width: 60%;" @change="changeBodyFillColor" :color="formatCellAttrs.body.fill"></X6ColorPicker>
                </div>
                <el-divider></el-divider>
                <div>
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <el-checkbox @change="changeStrokeWidth" v-model="isStrokeWidth">线条</el-checkbox>
                        <X6ColorPicker v-if="isStrokeWidth" style="width: 60%;" @change="changeBodyStroke" :color="formatCellAttrs.body.stroke"></X6ColorPicker>
                    </div>
                    <div v-if="isStrokeWidth" style="text-align: right;">
                        <el-input-number style="width: 60%;" size="mini" v-model="strokeWidth" :min="1" :max="10" @change="handleChangeSize" />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="text" label="文本">
                <div class="title">查看</div>
                <div class="content">
                    <el-select style="width: 100%;" v-model="fontFamily" @change="changeFontFamily">
                        <el-option label="Verdana" value="Verdana"></el-option>
                        <el-option label="Times New Roman" value="Times New Roman"></el-option>
                        <el-option label="Garamond" value="Garamond"></el-option>
                        <el-option label="Comic Sans MS" value="Comic Sans MS"></el-option>
                        <el-option label="Lucida Console" value="Lucida Console"></el-option>
                        <el-option label="Tahoma" value="Tahoma"></el-option>
                        <el-option label="Arial, helvetica, sans-serif" value="Arial, helvetica, sans-serif"></el-option>
                    </el-select>
                    <X6ColorPicker style="margin-top: 4px;" @change="changeTextFillColor" :color="formatCellAttrs.text.fill"></X6ColorPicker>
                    <el-input-number style="width: 100%;margin-top: 4px;" size="mini" v-model="fontSize" :min="1" :max="20" @change="handleChangeFontSize" />
                    <div style="margin-top: 4px;display: flex;justify-content: space-between;">
                        <el-button @click="changeBold" size="mini" circle title="粗体 (Ctrl+B)" type="primary">
                            <div class="iconfont icon-fontbold"></div>
                        </el-button>
                        <el-button @click="changeItalics" size="mini" circle title="斜体 (Ctrl+I)" type="primary">
                            <div class="iconfont icon-fontitalics"></div>
                        </el-button>
                        <el-button @click="changeUnderline" size="mini" circle title="下划线 (Ctrl+U)" type="primary">
                            <div class="iconfont icon-fontunderline"></div>
                        </el-button>
                        <el-button @click="changeAlign('end')" size="mini" circle title="左" type="primary">
                            <div class="iconfont icon-alignleft"></div>
                        </el-button>
                        <el-button @click="changeAlign('middle')" size="mini" circle title="中" type="primary">
                            <div class="iconfont icon-aligncenter"></div>
                        </el-button>
                        <el-button @click="changeAlign('start')" size="mini" circle title="右" type="primary">
                            <div class="iconfont icon-alignright"></div>
                        </el-button>
                    </div>
                    <el-input @input="inputText" style="margin-top: 4px;" v-model="textText"></el-input>
                </div>
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
                <div style="margin-top: 4px;">
                    <el-row>
                        <el-col :span="8">
                            <label>大小</label>
                        </el-col>
                        <el-col :span="16">
                            <div style="display: flex;">
                                <el-input-number size="mini" v-model="size.width" :min="1" @change="notifySize" />
                                <el-input-number size="mini" v-model="size.height" :min="1" @change="notifySize" />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <label>位置</label>
                        </el-col>
                        <el-col :span="16">
                            <div style="display: flex;">
                                <el-input-number size="mini" v-model="position.x" :min="1" @change="notifyPosition" />
                                <el-input-number size="mini" v-model="position.y" :min="1" @change="notifyPosition" />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <label>角度</label>
                        </el-col>
                        <el-col :span="16">
                            <el-input-number style="width: 100%;" size="mini" v-model="angle" @change="notifyAngle" />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-button style="width: 100%;" @click="notifyAngle90" type="primary">翻转90°</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import CarouselColor from './carouselColor'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'FormatNode',
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
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].formatNode
        })
        let formatCellAttrs = ref(formatCell.value.attrs)
        let isFilling = ref(formatCellAttrs.value.body.fill != 'rgba(255, 255, 255, 0)')
        let isStrokeWidth = ref(formatCellAttrs.value.body.strokeWidth !== 0)
        let strokeWidth = ref(formatCellAttrs.value.body.strokeWidth)
        let fontFamily = ref(formatCellAttrs.value.text.fontFamily)
        let fontSize = ref(formatCellAttrs.value.text.fontSize)
        let textText = ref(formatCellAttrs.value.text.text)
        let size = ref(formatCell.value.size())
        let position = ref(formatCell.value.position())
        let angle = ref(formatCell.value.getAngle())
        return {
            tabName,
            graph,
            formatCell,
            formatCellAttrs,
            isFilling,
            isStrokeWidth,
            strokeWidth,
            fontFamily,
            fontSize,
            textText,
            size,
            position,
            angle
        }
    },
    mounted() {
        this.graph.on('node:moved', ({ e, x, y, node, view }) => {
            let position = node.position()
            this.position = position
        })
        this.graph.on('node:rotated', ({ e, x, y, node, view }) => {
            let angle = node.getAngle()
            this.angle = angle
        })
        this.graph.on('node:resized', ({ e, x, y, node, view }) => {
            let size = node.size()
            this.size = size
        })
    },
    methods: {
        notifyAngle90() {
            this.formatCell.rotate(90)
            this.size = this.formatCell.size()
            this.position = this.formatCell.position()
            this.angle = this.formatCell.getAngle()
        },
        notifyAngle() {
            this.formatCell.rotate(this.angle)
            this.size = this.formatCell.size()
            this.position = this.formatCell.position()
            this.angle = this.formatCell.getAngle()
        },
        notifyPosition() {
            this.formatCell.position(this.position.x, this.position.y)
        },
        notifySize() {
            this.formatCell.size(this.size.width, this.size.height)
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
        inputText() {
            this.changeFormatCell({
                text: {
                    text: this.textText
                }
            })
        },
        changeBold() {
            let fontWeight = 'bold'
            if (this.formatCellAttrs.text.fontWeight == 'bold') {
                fontWeight = 'unset'
            }
            this.changeFormatCell({
                text: {
                    fontWeight: fontWeight
                }
            })
        },
        changeItalics() {
            let fontStyle = 'italic'
            if (this.formatCellAttrs.text.fontStyle == 'italic') {
                fontStyle = 'unset'
            }
            this.changeFormatCell({
                text: {
                    fontStyle: fontStyle
                }
            })
        },
        changeUnderline() {
            let textDecoration = 'underline'
            if (this.formatCellAttrs.text.textDecoration == 'underline') {
                textDecoration = 'unset'
            }
            this.changeFormatCell({
                text: {
                    textDecoration: textDecoration
                }
            })
        },
        changeAlign(textAnchor) {
            this.changeFormatCell({
                text: {
                    textAnchor: textAnchor
                }
            })
        },
        changeFormatCell(options) {
            this.formatCell.setAttrs(options)
            this.formatCellAttrs = this.formatCell.getAttrs()
            this.$store.dispatch("setFormatNode", this.formatCell)
        },
        changeBodyFillColor(color) {
            let options = {
                body: { fill: color },
            }
            this.isFilling = true
            this.changeFormatCell(options)
        },
        changeFilling() {
            let color = 'rgba(255, 255, 255, 0)'
            if (this.isFilling) {
                color = '#ffffff'
            }
            let options = {
                body: { fill: color },
            }
            this.changeFormatCell(options)
        },
        changeStrokeWidth() {
            let strokeWidth = 0
            if (this.isStrokeWidth) {
                strokeWidth = 1
                this.strokeWidth = strokeWidth
            }
            let options = {
                body: {
                    strokeWidth: strokeWidth
                }
            }
            this.changeFormatCell(options)
        },
        changeBodyStroke(color) {
            let options = {
                body: { stroke: color },
            }
            this.changeFormatCell(options)
        },
        handleChangeSize(val) {
            let options = {
                body: {
                    strokeWidth: parseInt(val)
                }
            }
            this.changeFormatCell(options)
        },
        changeFontFamily(val) {
            let options = {
                text: {
                    fontFamily: val
                }
            }
            this.changeFormatCell(options)
        },
        handleChangeFontSize(val) {
            let options = {
                text: {
                    fontSize: parseInt(val)
                }
            }
            this.changeFormatCell(options)
        },
        changeTextFillColor(color) {
            let options = {
                text: { fill: color },
            }
            this.changeFormatCell(options)
        }
    }
}
</script>