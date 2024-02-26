<!--广场管理-->
<template>
  <div class='square-list'>
    <!--包裹层-->
    <div class='layer flex flexColumn'>
      <!--上层切换-->
      <div class='upper' ref='upperRef'>
        <div class='upper-list'>
          <!--tabs预留-->
          <div class='tabs'>
            <my-tabs v-model="activeName"   @tabClick="tabClick">
              <my-tab-content label="数据" name="data">
              </my-tab-content>
              <my-tab-content label="模型" name='model'>
              </my-tab-content>
              <my-tab-content label="产品" name="product">
              </my-tab-content>
              <my-tab-content label="组件" name="unit">
              </my-tab-content>
            </my-tabs>
          </div>
          <!--标签筛选-->
          <div class='label-filtering'>
            <!--表头部分-->
            <div class='header-title justBetween'>
              <div class='header-left'>
                标签筛选
              </div>
              <div class='header-right jaligncenter'>
                <div class='edit-icon'>
                  <iconpark-icon name="hp-common-edit-1" color="#288EFF"></iconpark-icon>
                </div>
               <div class='edit-title' @click.stop.prevent='labelEditing'>
                 标签编辑
               </div>
              </div>
            </div>
            <!--一级标签-->
            <div class='first-level-label'>
              <div class='first-level-title'>
                一级标签
              </div>
              <!--一级标签card-->
              <div class='card-list' v-if='firstLabels.length'>
                <!--card部分-->
                <div class='card' :class="{active:firstActive===-1}"  @click.stop.prevent='resetFirstItem(-1)'>
                  全部
                </div>
                <div class='card' v-for='(item,index) in firstLabels' :key='item.id'
                     :class="{active:firstActive===index}"
                     @click.stop.prevent='resetFirstItem(index,item)'>
                  {{item.name}}
                </div>
              </div>
              <!--无数据的情况-->
              <div  class='card-list' v-if='firstLabels.length===0&&(!isFullScreen)'>
                <div class='no-data'>
                  暂无数据
                </div>
              </div>
            </div>
            <!--二级标签-->
            <div class='second-level-label' v-if='firstActive!==-1'>
              <div class='second-level-title'>
                二级标签
              </div>
              <!--er级标签card-->
              <div class='card-list'>
                <!--card部分-->
                <div class='card' :class="{active:secondActive===-1}"  @click.stop.prevent='resetSecondItem(-1)'>
                  全部
                </div>
                <div class='card' v-for='(item,index) in firstLabels[firstActive].children' :key='item.id'
                     :class="{active:secondActive===index}"
                     @click.stop.prevent='resetSecondItem(index,item)'>
                  {{item.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--卡片展示-->
      <div class='cards-content'>
        <!--有数据-->
        <div class='cards-list' v-if='list.length&&(!isFullScreen)'>
          <!--单个卡片-->
          <div class='card-item' :style="calculateColor(activeName)" v-for='(item) in list' :key='item.plaza_id'>
            <!--上-->
            <div class='card-up justBetween'>
              <!--名称集合-->
              <div class='card-name jaligncenter'>
                <!--小图标-->
                <div class='card-image'>
                  <iconpark-icon class='card-image-icon' color="currentColor" size='24px' :name="`hp-cabits-${activeName}`"></iconpark-icon>
                </div>
                <!--名称展示-->
                <div class='card-title ellipsis'>
                 {{item.data_name}}
                </div>
              </div>
              <!--标签-->
              <div class='card-label ellipsis jaligncenter' v-if='item.cardList.length'>
<!--                标签二二二/试试二阿是（+4）-->
                <el-popover
                  placement="top-start"
                  width="300" v-for='(card,current) in item.cardList' :key='current'
                  trigger="hover">
                  <!--标签展示-->
                  <div class='tool-list'>
                    <div class='card-ver-content'
                         v-for='(cardItem,cut) in item.category_list' :key='cut'
                         :class="{mr:cut<item.category_list.length-1}">
                      {{cardItem}}
                    </div>
                  </div>
                  <div slot="reference" class='card-ver-content' :class="{mr:current<item.cardList.length-1}">
                    {{card}}
                  </div>
                </el-popover>
              </div>
            </div>
            <!--中-->
            <div class='card-middle justBetween'>
              <!--类型-->
              <div class='card-type jaligncenter'>
                <div class='type-model'>
                  类型
                </div>
                <div class='type-name'>
                  {{getResType(item.data_type)}}
                </div>
              </div>
              <!--分享范围-->
              <div class='card-share jaligncenter'>
                <div class='share-model-title'>
                  分享范围
                </div>
                <div class='share-model'>
                  {{item.share_target_level}}
                </div>
              </div>
            </div>
            <!--下-->
            <div class='card-down justBetween'>
              <div class='card-team jaligncenter'>
                <div class='affiliation'>
                  所属
                </div>
                <div class='card-team-title ellipsis'>
                 {{item.share_origin_name}}
                </div>
              </div>
              <!--编辑-->
              <div class='card-edit' @click.stop.prevent='editItem(item)'>
                编辑
              </div>
            </div>
          </div>
        </div>
        <!--无数据-->
        <div class="no-data" v-if="list.length===0&&(!isFullScreen)">
          <list-not-data></list-not-data>
        </div>
      </div>
    </div>
    <!--标签编辑器组件-->
    <edit-square v-if='labelEditor'
                 :activeName='activeName'
                 @closeEdit='closeEdit' @deterEdit='deterEdit'></edit-square>
    <!--分享编辑组件-->
    <share-editing v-if='shareEditor' @closeShare='closeShare' @deterShare='deterShare'
                   :shareItem='shareItem'
                   :activeName='activeName'></share-editing>
    <automatic-loading v-if="isFullScreen"></automatic-loading>
  </div>
</template>
<script>
import { modelCard } from '@/utils/cardList'
import myTabs from '@/components/MyTabs/tabs.vue'
import myTabContent from '@/components/MyTabs/myTabContent'
import AutomaticLoading from '@/components/Loading/AutomaticLoading'
// 标签编辑器组件
import editSquare from './component/editSquare'
// 分享编辑组件
import shareEditing from './component/shareEditing'
import cloneDeep from 'lodash/cloneDeep'
import ListNotData from '@/components/defaultPage/ListNotData'
import { guid } from '@/utils'
// 引入接口
import { getTreeLabels, getList } from '@/myApi/Organization/Product/Square/index.js'

export default {
  name: 'SquareList',
  components: {
    myTabs,
    myTabContent,
    AutomaticLoading,
    editSquare,
    shareEditing,
    ListNotData
  },
  data () {
    return {
      // 存储器
      list: [],
      firstActive: -1,
      secondActive: -1,
      firstLabels: [],
      categoryId: '',
      // 是否标签编辑
      labelEditor: false,
      // 是否分享编辑
      shareEditor: false,
      // 分享编辑
      shareItem: null
    }
  },
  computed: {
    // 控制全局的大loading
    isFullScreen () {
      return this.$store.getters['workspaceWorkflow/isFullScreen']
    },
    // 模块选择
    activeName: {
      get () {
        return this.$store.getters['OrgSquare/activeName']
      },
      set (value) {
        return this.resetApproval('setActiveName', 'activeName', value)
      }
    }
  },
  async created () {
    await this.getTreeLabels()
    await this.getList()
  },
  methods: {
    // 预留方法
    getResType (resourceType) {
      // 数据-1，模型-2，产品-7，组件-3
      const obj = {
        1: '数据',
        2: '模型',
        3: '组件',
        7: '产品'
      }
      return obj[resourceType]
    },
    init () {
      this.firstActive = -1
      this.secondActive = -1
      this.firstLabels = []
      this.categoryId = ''
    },
    resetFirstItem (index, item) {
      if (index === -1) {
        this.categoryId = ''
        this.firstActive = -1
        this.secondActive = -1
        console.log('0000 标签一全部', this.categoryId)
        this.getList()
      } else {
        this.categoryId = item.id
        this.firstActive = index
        this.secondActive = -1
        console.log('111111  标签一', this.categoryId)
        this.getList()
      }
    },
    resetSecondItem (index, item) {
      if (index === -1) {
        this.secondActive = -1
        this.categoryId = this.firstLabels[this.firstActive].id
        console.log('22222 标签二全部', this.categoryId)
        this.getList()
      } else {
        this.categoryId = item.id
        this.secondActive = index
        console.log('33333 标签二', this.categoryId)
        this.getList()
      }
    },
    async tabClick (tabItem) {
      console.log('this.activeName', this.activeName)
      /* this.$debounce(async () => {
        console.log('走了几次了啊   this.activeName', this.activeName)
        await this.getTreeLabels()
        await this.getList()
      }, 500) */
      await this.getTreeLabels()
      await this.getList()
    },
    resetApproval (patch, key, value) {
      this.$store.dispatch(`OrgSquare/${patch}`, {
        [key]: value
      })
    },
    // 标签信息数据
    async getTreeLabels () {
      this.init()
      this.firstLabels = []
      this.openFullScreen()
      // 标签树形结构  标签类型，1-数据，2-模型，3-组件, 7-产品
      // await this.$api.OrgSquare.getTreeLabels({
      await getTreeLabels({
        type: this.getTypeNum(this.activeName)
      })
        .then(response => {
          this.closeFullScreen()
          if (response.data.code === 1000) {
            const data = response.data.data
            console.log('标签树形结构  接口数据  李琦', data)
            if (data.length) {
              // 说明存在数据，进行数据拼装处理
              const newArr = []
              data.map(item => {
                newArr.push({
                  ...item,
                  children: item.child || []
                })
              })
              this.firstLabels = newArr
            } else {
              this.firstLabels = []
            }
          } else {
            this.firstLabels = []
            this.$message.error(response.data.message)
          }
        }).catch(() => {
          this.firstLabels = []
          this.closeFullScreen()
        })
    },
    // 获取类型
    getTypeNum (type) {
      const obj = {
        // 标签类型，1-数据，2-模型，3-组件, 7-产品
        data: 1,
        model: 2,
        unit: 3,
        product: 7
      }
      return obj[type] || ''
    },
    // 列表页数据
    getList () {
      this.openFullScreen()
      this.list = []
      const registerPostData = {
        category_ids: this.categoryId,
        data_type: this.getTypeNum(this.activeName),
        origin: 'owner'
      }
      // eslint-disable-next-line no-unused-vars
      /* for (const key in registerPostData) {
        if (registerPostData[key] === '') {
          delete registerPostData[key]
        }
      } */
      // this.$api.OrgSquare.getList(registerPostData)
      getList(registerPostData)
        .then(response => {
          this.closeFullScreen()
          if (response.data.code === 1000) {
            const data = response.data.data
            console.log('接口数据  李琦', data)
            if (data.length) {
              // 说明存在数据，进行数据拼装处理
              const newArr = []
              data.map(item => {
                newArr.push({
                  ...item,
                  cardList: this.getCardList(item)
                })
              })
              console.log('newArr', newArr)
              this.list = newArr
            } else {
              this.list = []
            }
          } else {
            this.list = []
            this.$message.error(response.data.message)
          }
        }).catch(() => {
          this.list = []
          this.closeFullScreen()
        })
    },
    // 为标签展示服务
    getCardList (item) {
      // 数据-1，模型-2，产品-7，组件-3
      if (item.category_list?.length) {
        // 已经存在数据，就要开始拼装了
        const newData = [...item.category_list]
        // 说明是数据类型
        const len = newData.length
        if (len <= 1) {
          return newData
        } else {
          // 说明需要拼装个加号了
          return newData.slice(0, 1).concat(`（+${len - 1}）`)
        }
      } else {
        return []
      }
    },
    // 计算颜色
    calculateColor (key) {
      return {
        borderLeft: `3px solid ${modelCard[key]}`
      }
    },
    // 是否标签编辑
    labelEditing () {
      this.labelEditor = true
    },
    // 分享编辑
    editItem (item) {
      console.log('item', item)
      this.shareEditor = true
      this.shareItem = item
    },
    // 标签编辑器组件  关闭
    closeEdit () {
      this.labelEditor = false
    },
    // 标签编辑器组件  确定
    deterEdit () {
      this.labelEditor = false
    },
    // 分享编辑组件  关闭
    closeShare () {
      this.shareEditor = false
      this.shareItem = null
    },
    // 分享编辑组件  确定
    deterShare () {
      this.shareEditor = false
      this.getList()
    },
    // 关闭全局的loading
    closeFullScreen () {
      this.$store.dispatch('workspaceWorkflow/setFullScreen', {
        isFullScreen: false
      })
    },
    // 打开全局的loading
    openFullScreen () {
      this.$store.dispatch('workspaceWorkflow/setFullScreen', {
        isFullScreen: true
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.square-list{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background: url(static/SquareList.png) no-repeat center;
  background-size: cover;
  //包裹层
  .layer{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    //上层切换
    .upper{
      padding: 16px;
      .upper-list{
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        box-sizing: border-box;
        //标签筛选
        .label-filtering{
          padding-top: 20px;
          padding-left: 24px;
          padding-right: 24px;
          //表头部分
          .header-title{
            .header-left{
              font-size: 16px;
              font-weight: 600;
              color: #1D2129;
              height: 24px;
              line-height: 24px;
            }
            .header-right{
              cursor: pointer;
              .edit-icon{
                margin-right: 4px;
              }
              .edit-title{
                font-size: 14px;
                font-weight: 400;
                color: #288EFF;
                height: 22px;
                line-height: 22px;
              }
            }
          }
          //一级标签
          .first-level-label{
            .first-level-title{
              height: 22px;
              font-size: 14px;
              font-weight: 400;
              color: #4E5969;
              line-height: 22px;
              margin-top: 16px;
              margin-bottom: 12px;
            }
            .card-list{
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              .card{
                height: 32px;
                //line-height: 32px;
                display: inline-block;
                vertical-align: center;
                border-radius: 2px 2px 2px 2px;
                border: 1px solid #E5E6EB;
                text-align: center;
                box-sizing: border-box;
                font-size: 14px;
                font-weight: 400;
                padding: 5px 12px;
                color: #4E5969;
                cursor: pointer;
                margin-bottom: 12px;
                margin-right: 20px;
                &:hover{
                  //box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                  color: #52A8FF;
                }
              }
              .active{
                font-weight: 600;
                color: #288EFF;
                background: #E8F3FF;
                border: 1px solid #288EFF;
              }
              .no-data{
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                font-weight: 400;
                padding: 5px 12px;
                color: #4E5969;
                cursor: pointer;
                margin-bottom: 12px;
                margin-right: 20px;
              }
            }
          }
          //二级标签
          .second-level-label{
            .second-level-title{
              height: 22px;
              font-size: 14px;
              font-weight: 400;
              color: #4E5969;
              line-height: 22px;
              margin-top: 10px;
              margin-bottom: 12px;
            }
            .card-list{
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              .card{
                height: 32px;
                //line-height: 32px;
                display: inline-block;
                vertical-align: center;
                border-radius: 2px 2px 2px 2px;
                border: 1px solid #E5E6EB;
                text-align: center;
                box-sizing: border-box;
                font-size: 14px;
                font-weight: 400;
                padding: 5px 12px;
                color: #4E5969;
                cursor: pointer;
                margin-bottom: 12px;
                margin-right: 20px;
                &:hover{
                  //box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                  color: #52A8FF;
                }
              }
              .active{
                font-weight: 600;
                color: #288EFF;
                background: #E8F3FF;
                border: 1px solid #288EFF;
              }
            }
          }
        }
      }
    }
    //卡片展示
    .cards-content{
      flex: 1;
      min-height: 181px;
      box-sizing: border-box;
      .cards-list{
        height: 100%;
        overflow-y: auto;
        padding-top: 16px;
        padding-right: 32px;
        padding-left: 32px;
        box-sizing: border-box;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 417px);
        //grid-gap: 10px;
        //单个卡片
        .card-item{
          width: 417px;
          height: 148px;
          background: #FFFFFF;
          box-sizing: border-box;
          border-radius: 0px 4px 4px 0px;
          margin-right: 36px;
          margin-bottom: 32px;
          padding: 16px;
          transition: 150ms;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all .3s;
          .card-up{
            .card-name{
              .card-image{
                width: 24px;
                height: 24px;
                margin-right: 8px;
                .card-image-icon{

                }
              }
              .card-title{
                height: 24px;
                font-size: 16px;
                font-weight: 600;
                color: #3D3D3D;
                line-height: 24px;
                max-width: 148px;
              }
            }
            .card-label{
              max-width: 205px;
              font-size: 14px;
              font-weight: 400;
              color: #4E5969;
              height: 22px;
              line-height: 22px;
            }
          }
          .card-middle{
            .card-type{
              .type-model{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
                margin-right: 20px;
              }
              .type-name{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #3D3D3D;
                line-height: 22px;
              }
            }
            .card-share{
              .share-model-title{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
                margin-right: 20px;
              }
              .share-model{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #3D3D3D;
                line-height: 22px;
              }
            }
          }
          .card-down{
            .card-team{
              .affiliation{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
                margin-right: 20px;
              }
              .card-team-title{
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #3D3D3D;
                line-height: 22px;
                max-width: 148px;
              }
            }
            .card-edit{
              font-weight: 400;
              color: #288EFF;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              display: none;
              transition: 150ms;
            }
          }
          //悬浮阴影
          &:hover{
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            .card-down{
              .card-edit{
                cursor: pointer;
                display: block;
              }
            }
          }
        }
      }
      .no-data{
        flex: 1;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
//标签展示
.tool-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .card-ver-content{
    padding-right: 5px;
    padding-left: 5px;
    height: 30px;
    line-height: 30px;
    background: #F2F3F5;
    color: #4E5969;
    margin-bottom: 10px;
    border-radius: 2px 2px 2px 2px;
  }
  .mr{
    margin-right: 12px;
  }
}
</style>
