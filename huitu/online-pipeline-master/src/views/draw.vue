<!--
  文件描述：
  创建时间：2023/4/12 10:33
  创建人：ChenJinZhu
-->
<template>
    <div class="canvas-container">
        <div class="canvas-icon-content">
            <ul>
                <li v-for="(eq, index) in equipment" :key="index" @click="equipmentChange(eq, index)"
                    :class="{ 'canvas-icon-active': equipmentSelect === index }">
                    <img :src="eq.icon" :alt="eq.name">
                    <p>{{eq.name}}</p>
                </li>
            </ul>
        </div>
        <div class="canvas-content">
            <div class="canvas" id="canvas">
                <canvas id="myCanvas" ref="myCanvas"></canvas>
            </div>
            <div class="canvas-options">
                <div class="option-change-water-type">
                    <el-select v-model="value" placeholder="请选择" size="medium" @change="pipelineTypeChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="option-draw-text">
                    <el-button :type="addTextStatus ? 'success' : 'warning'" @click="addText">自定义文字</el-button>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="option-commit">
                    <el-button type="primary" @click="commit">上传所绘制内容</el-button>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="option-drag">
                    <el-button type="info" plain @click="showEquipmentArea">显示设备拖动区域</el-button>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="option-clear">
                    <el-button type="info" @click="clearAll">清除所有绘制内容</el-button>
                </div>
            </div>
        </div>
        <div class="pipeline-info-add">
            <el-dialog :title="!modifyType ? '设备信息' : '文本信息'" :visible.sync="iconDialog" width="750px">
                <div class="icon-form-container">
                    <el-form v-if="!modifyType" :model="iconForm" label-position="right" label-width="120px"
                             :inline="true">
                        <el-form-item label="设备名称">
                            <el-input v-model="iconForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <el-input v-model="iconForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="设备单位">
                            <el-input v-model="iconForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="图标缩放比例">
                            <el-input-number v-model="iconForm.scale" :min="10" :max="30" label="值越大，图标越小:10-30"></el-input-number>
                        </el-form-item>
                        <el-form-item label="设备旋转角度">
                            <el-select v-model="iconForm.rotate" placeholder="请选择设备旋转角度">
                                <el-option v-for="(item, index) in rotateOptions" :key="index + 'op'" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否展示信息">
                            <el-radio-group v-model="iconForm.show" size="small">
                                <el-radio-button :label="true">展示</el-radio-button>
                                <el-radio-button :label="false">隐藏</el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="描述信息">
                            <div v-for="(item, index) in iconForm.others" :key="index">
                                <el-input class="describe" v-model="iconForm.others[index]">
                                    <template slot="append">
                                        <el-button icon="el-icon-delete" @click="delDescribe(index)"></el-button>
                                    </template>
                                </el-input>
                            </div>
                            <el-button size="mini" type="primary" @click="addDescribe">新增描述</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form v-else :model="textForm" label-position="right" label-width="100px" :inline="true">
                        <el-form-item label="文本内容">
                            <el-input v-model="textForm.text"></el-input>
                        </el-form-item>
                        <el-form-item label="字体大小">
                            <el-input-number v-model="textForm.fontSize" :min="16" :max="30"></el-input-number>
                        </el-form-item>
                        <el-form-item label="字体颜色">
                            <el-input disabled placeholder="请选择颜色" :value="textForm.color"
                                      @click.native="colorStatus = !colorStatus"></el-input>
                            <div class="sketch-picker" v-show="colorStatus">
                                <sketch-picker v-model="color" @input="colorValueChange"></sketch-picker>
                                <el-button size="mini" @click="colorStatus = false">取消</el-button>
                                <el-button size="mini" type="primary" @click="colorStatus = false">确定</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div style="width: 100%;display: flex;justify-content: space-around;">
                        <el-button @click="iconDialog = false">取消</el-button>
                        <el-button type="primary" @click="iconModify">确定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import canvas from '../utils/canvas'

    import { Sketch } from 'vue-color'
    let myCanvas = {}
    export default {
        name: "draw",
        components: { 'sketch-picker': Sketch },
        data() {
            return {
                equipment: [
                    {
                        name: '管线',
                        eId: 11,
                        icon: require('../assets/images/line.png'),
                        iconPath: 'line.png',
                        drawType: 0
                    },
                    {
                        name: '温度表',
                        eId: 1,
                        icon: require('../assets/images/thermometer.png'),
                        iconPath: 'thermometer.png',
                        drawType: 1
                    },
                    {
                        name: '压力表',
                        eId: 2,
                        icon: require('../assets/images/manometer.png'),
                        iconPath: 'manometer.png',
                        drawType: 1
                    },
                    {
                        name: '接头',
                        eId: 3,
                        icon: require('../assets/images/joint.png'),
                        iconPath: 'joint.png',
                        drawType: 1
                    },
                    {
                        name: '直流阀',
                        eId: 4,
                        icon: require('../assets/images/direct_current_valve.png'),
                        iconPath: 'direct_current_valve.png',
                        drawType: 1
                    },
                    {
                        name: '循环阀',
                        eId: 5,
                        icon: require('../assets/images/circulating_valve.png'),
                        iconPath: 'circulating_valve.png',
                        drawType: 1
                    },
                    {
                        name: '电动阀',
                        eId: 6,
                        icon: require('../assets/images/electric_valve.png'),
                        iconPath: 'electric_valve.png',
                        drawType: 1
                    },
                    {
                        name: '开关阀',
                        eId: 7,
                        icon: require('../assets/images/on_off_valve.png'),
                        iconPath: 'on_off_valve.png',
                        drawType: 1
                    },
                    {
                        name: '热换机',
                        eId: 8,
                        icon: require('../assets/images/heat_exchanger.png'),
                        iconPath: 'heat_exchanger.png',
                        drawType: 1
                    },
                    {
                        name: '热换机',
                        eId: 9,
                        icon: require('../assets/images/heat_exchanger1.png'),
                        iconPath: 'heat_exchanger1.png',
                        drawType: 1
                    },
                    {
                        name: '蓄水池',
                        eId: 10,
                        icon: require('../assets/images/reservoir.png'),
                        iconPath: 'reservoir.png',
                        drawType: 1
                    },
                ],
                equipmentSelect: 0,

                options: [
                    {
                        value: '0',
                        label: '冷水'
                    }, {
                        value: '1',
                        label: '热水'
                    }
                ],
                value: '0',

                addTextStatus: false,

                modifyType: 0,

                iconDialog: false,
                iconForm: {
                    show: true,

                },
                textForm: {},
                rotateOptions: [
                    {
                        label: '0 度',
                        value: 0
                    }, {
                        label: '90 度',
                        value: 90,
                    }, {
                        label: '-90 度',
                        value: -90,
                    }, {
                        label: '180 度',
                        value: 180,
                    }
                ],

                color: '',
                colorStatus: false,
                echoDataList: [],//储存临时回显数据
            }
        },
        methods: {
            equipmentChange(element,index) {
                this.equipmentSelect = index
                this.addTextStatus = false
                canvas.drawTypeChange(element)
            },

            // 管线类型选择
            pipelineTypeChange() {
                canvas.changePipelineType(this.value)
            },

            // 添加自定义文字
            addText() {
                this.addTextStatus = !this.addTextStatus
                this.equipmentSelect = this.addTextStatus ? -1 : 0;
                canvas.drawTypeChange(this.addTextStatus ? {drawType: 2} : this.equipment[0])
            },

            // 显示设备可拖动区域
            showEquipmentArea() {
                canvas.showEquipmentIconArea()
            },

            // 监听tip的点击事件
            handleMouseup(idx) {
                this.modifyType = idx
                let currentEditObject = JSON.parse(JSON.stringify(canvas.canvasMouseUp()));

                // console.log(currentEditObject)
                // console.log(currentEditObject[['equipmentInfo', 'textInfo'][idx]])
                this[['iconForm', 'textForm'][idx]] = currentEditObject[['equipmentInfo', 'textInfo'][idx]]
                // setTimeout(() => this.iconDialog = true, 0)
                this.iconDialog = true
            },
            addDescribe() {
                this.iconForm.others.push('')
            },

            // 颜色值改变事件处理
            colorValueChange(val) {
                this.textForm.color = val.hex
            },

            // 设备信息修改
            iconModify() {
                // console.log(this[['iconForm', 'textForm'][this.modifyType]])
                canvas.canvasModifyInfo(this[['iconForm', 'textForm'][this.modifyType]], ['equipmentInfo', 'textInfo'][this.modifyType])
                this.iconDialog = false
            },

            //删除描述信息
            delDescribe(index) {
                this.iconForm.others.splice(index, 1)
            },

            commit() {
                canvas.commit()
            },
            clearAll() {
                canvas.clearAll()
            },

            echoData() {
                // canvas.echoData(this.echoDataList)
                //下方为前后端正式对接所用数据格式
                // canvas.echoData([
                //     {
                //         "startX": 248,
                //         "startY": 220,
                //         "endX": 631,
                //         "endY": 235,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": 0,
                //             "direction": true
                //         },
                //         "uid": 49655781533
                //     },
                //     {
                //         "startX": 880,
                //         "startY": 200,
                //         "endX": 895,
                //         "endY": 513,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": 0,
                //             "direction": false
                //         },
                //         "uid": 51677247423
                //     },
                //     {
                //         "startX": 223,
                //         "startY": 502,
                //         "endX": 726,
                //         "endY": 517,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": 0,
                //             "direction": true
                //         },
                //         "uid": 75997188401
                //     },
                //     {
                //         "startX": 272,
                //         "startY": 667,
                //         "endX": 843,
                //         "endY": 682,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": "1",
                //             "direction": true
                //         },
                //         "uid": 98548373326
                //     },
                //     {
                //         "startX": 1051,
                //         "startY": 668,
                //         "endX": 1066,
                //         "endY": 218,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": "1",
                //             "direction": false
                //         },
                //         "uid": 91717813352
                //     },
                //     {
                //         "startX": 1107,
                //         "startY": 186,
                //         "endX": 1122,
                //         "endY": 645,
                //         "type": 0,
                //         "pipelineInfo": {
                //             "waterType": "1",
                //             "direction": false
                //         },
                //         "uid": 89282619305
                //     },
                //     {
                //         "startX": 467,
                //         "startY": 173,
                //         "endX": 503,
                //         "endY": 227,
                //         "type": 1,
                //         "equipmentInfo": {
                //             "id": "",
                //             "iconPath": "manometer.png",
                //             "name": "压力表",
                //             "unit": "m/s",
                //             "scale": 25,
                //             "rotate": 0,
                //             "show": true,
                //             "value": "12378",
                //             "others": [],
                //             "rotateCoordinate": {
                //                 "startX": 467,
                //                 "startY": 173,
                //                 "endX": 503,
                //                 "endY": 227
                //             }
                //         },
                //         "uid": 628126402
                //     },
                //     {
                //         "startX": 520,
                //         "startY": 455,
                //         "endX": 556,
                //         "endY": 509,
                //         "type": 1,
                //         "equipmentInfo": {
                //             "id": "",
                //             "iconPath": "manometer.png",
                //             "name": "压力表",
                //             "unit": "m/s",
                //             "scale": 25,
                //             "rotate": 0,
                //             "show": true,
                //             "value": "12378",
                //             "others": [],
                //             "rotateCoordinate": {
                //                 "startX": 520,
                //                 "startY": 455,
                //                 "endX": 556,
                //                 "endY": 509
                //             }
                //         },
                //         "uid": 46886046093
                //     },
                //     {
                //         "startX": 727,
                //         "startY": 477,
                //         "endX": 770,
                //         "endY": 531,
                //         "type": 1,
                //         "equipmentInfo": {
                //             "id": "",
                //             "iconPath": "electric_valve.png",
                //             "name": "电动阀",
                //             "unit": "m/s",
                //             "scale": 25,
                //             "rotate": 0,
                //             "show": true,
                //             "value": "12378",
                //             "others": [],
                //             "rotateCoordinate": {
                //                 "startX": 727,
                //                 "startY": 477,
                //                 "endX": 770,
                //                 "endY": 531
                //             }
                //         },
                //         "uid": 40667498928
                //     }
                // ])

            },
        },
        mounted() {
            myCanvas = canvas.init('myCanvas')
            window.addEventListener('click', (e) => {
                if (e.target.id.includes('equipmentModify')) this.handleMouseup(0)
                if (e.target.id.includes('textModify')) this.handleMouseup(1)
            })
            this.echoData()
        },
        created() {
        },
        beforeDestroy() {
            window.removeEventListener('click')
        }
    }
</script>

<style scoped lang="less">

   .canvas-container{
       width: 1300px;
       border: 1px solid #000000;
       border-radius: 20px;
       margin: 10px;
       overflow: hidden;
       display: flex;
       *{
           box-sizing: border-box;
       }
       .canvas-icon-content{
           width: 100px;
           border-right: 1px solid #000;
           cursor: pointer;
           overflow: hidden;
           ul{
               height: 100%;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               align-items: center;
               li{
                   padding: 5px 0;
                   img{
                       display: block;
                       max-width: 35%;
                       margin: 0 auto;
                   }
                   p{
                       text-align: center;
                       font-size: 12px;
                       letter-spacing: 3px;
                   }
                   &:hover{
                       transform: scale(1.3);
                   }
                   &.canvas-icon-active{
                       background-color: rgba(93, 143, 170, 0.6);
                       p{
                           color: #fff;
                       }
                   }
               }
           }
       }
       .canvas-content{
           width: calc(100% - 100px);
           .canvas{
               height: 800px;
               cursor: crosshair;
           }
           .canvas-options{
               border-top: 1px solid #000;
               height: 60px;
               cursor: pointer;
               display: flex;
               align-items: center;
               >div{
                   height: 60px;
                   line-height: 60px;
                   text-align: center;
                   button{
                       width: 80%;
                   }
               }
               .option-change-water-type{
                   width: 10%;
                   /*background-color: #ea5e00;*/
               }
               .option-draw-text{
                   width: 20%;
                   /*background-color: #4beab0;*/
               }
               .option-commit{
                   width: 45%;
                   /*background-color: #76beea;*/
               }
               .option-drag{
                   width: 18%;
               }
               .option-clear{
                   width: 18%;
                   /*background-color: #ea0000;*/
               }
           }
       }

   }
</style>
