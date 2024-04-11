<template>
    <div formatGraph>
        <div class="title">查看</div>
        <div class="content">
            <el-row>
                <el-col :span="8">
                    <label>背景</label>
                </el-col>
                <el-col :span="16">
                    <X6ColorPicker style=" width: 95%;" @change="changeGraphColor" :color="graphColor"></X6ColorPicker>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <label>网格</label>
                </el-col>
                <el-col :span="16">
                    <el-checkbox @change="changeGrid" v-model="isGrid"></el-checkbox>
                </el-col>
            </el-row>
            <div v-show="isGrid">
                <el-row>
                    <el-col :span="8">
                        <label>网格类型</label>
                    </el-col>
                    <el-col :span="16">
                        <el-select style=" width: 95%;" @change="notifyChange" v-model="gridType">
                            <el-option label="Dot" value="dot"></el-option>
                            <el-option label="Fixed Dot" value="fixedDot"></el-option>
                            <el-option label="Mesh" value="mesh"></el-option>
                            <el-option label="Double Mesh" value="doubleMesh"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <label>网格大小</label>
                    </el-col>
                    <el-col :span="16">
                        <el-slider style=" width: 95%;" :max="20" @input="sizeInput" v-model="gridSize"></el-slider>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <label>{{ gridType == 'doubleMesh' ? '主网格线颜色' : '格线颜色'}}</label>
                    </el-col>
                    <el-col :span="16">
                        <X6ColorPicker style=" width: 95%;" @change="changeGridColor" :color="gridColor"></X6ColorPicker>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <label>{{ gridType == 'doubleMesh' ? '主网格线宽度' : '格线宽度'}}</label>
                    </el-col>
                    <el-col :span="16">
                        <el-slider style=" width: 95%;" :max="10" @input="notifyChange" v-model="gridThickness"></el-slider>
                    </el-col>
                </el-row>
                <el-row v-show="gridType == 'doubleMesh'">
                    <el-col :span="8">
                        <label>次网格线颜色</label>
                    </el-col>
                    <el-col :span="16">
                        <X6ColorPicker style=" width: 95%;" @change="changeGridColorSecond" :color="gridColorSecond"></X6ColorPicker>
                    </el-col>
                </el-row>
                <el-row v-show="gridType == 'doubleMesh'">
                    <el-col :span="8">
                        <label>次网格线宽度</label>
                    </el-col>
                    <el-col :span="16">
                        <el-slider style=" width: 95%;" :max="10" @input="notifyChange" v-model="gridThicknessSecond"></el-slider>
                    </el-col>
                </el-row>
                <el-row v-show="gridType == 'doubleMesh'">
                    <el-col :span="8">
                        <label>主次网格线间隔</label>
                    </el-col>
                    <el-col :span="16">
                        <el-slider style=" width: 95%;" :max="10" @input="notifyChange" v-model="gridFactor"></el-slider>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'FormatGraph',
    setup() {
        const store = useStore()
        let graphName = computed(() => store.state.currentGraphName)
        let graph = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].graph
        })
        let gridOptions = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].gridOptions
        })

        let backgroundColor = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].backgroundColor
        })

        let grid = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].grid
        })
        let gridType = ref(gridOptions.value.type)
        let gridSize = ref(gridOptions.value.size)
        let gridColor = ref(gridOptions.value.color)
        let gridThickness = ref(gridOptions.value.thickness)
        let gridColorSecond = ref(gridOptions.value.colorSecond)
        let gridThicknessSecond = ref(gridOptions.value.thicknessSecond)
        let gridFactor = ref(gridOptions.value.factor)

        let graphColor = ref(backgroundColor.value)

        let isGrid = ref(grid.value)

        return {
            graph,
            gridOptions,
            gridType,
            gridSize,
            gridColor,
            gridThickness,
            gridColorSecond,
            gridThicknessSecond,
            gridFactor,
            graphColor,
            isGrid
        }
    },
    methods: {
        changeGrid() {
            this.$store.dispatch("setGrid", this.isGrid)
            this.isGrid ? this.graph.showGrid() : this.graph.hideGrid()
        },
        changeGraphColor(color) {
            this.graphColor = color
            this.graph.drawBackground({
                color
            })
            this.$store.dispatch("setBackgroundColor", this.graphColor)
        },
        changeGridColorSecond(color) {
            this.gridColorSecond = color
            this.notifyChange()
        },
        changeGridColor(color) {
            this.gridColor = color
            this.notifyChange()
        },
        sizeInput() {
            this.graph.setGridSize(this.gridSize)
            this.submitGridOptions()
        },
        notifyChange() {
            let options = {}
            if (this.gridType === 'doubleMesh') {
                options = {
                    type: this.gridType,
                    args: [
                        {
                            color: this.gridColor,
                            thickness: this.gridThickness,
                        },
                        {
                            color: this.gridColorSecond,
                            thickness: this.gridThicknessSecond,
                            factor: this.gridFactor,
                        },
                    ]
                }
            } else {
                options = {
                    type: this.gridType,
                    args: [
                        {
                            color: this.gridColor,
                            thickness: this.gridThickness,
                        },
                    ],
                }
            }
            this.graph.drawGrid(options)
            this.submitGridOptions()
        },
        submitGridOptions() {
            let gridOptions = {
                type: this.gridType,
                size: this.gridSize,
                color: this.gridColor,
                thickness: this.gridThickness,
                colorSecond: this.gridColorSecond,
                thicknessSecond: this.gridThicknessSecond,
                factor: this.gridFactor
            }
            this.$store.dispatch("setGridOption", gridOptions)
        }
    }
}
</script>