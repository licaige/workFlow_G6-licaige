<template>
    <div class="si-menubar-container">
        <div class="si-menubar">
            <div v-for="(siMenubarItemData, index) in siMenubarSetData" :key="index" class="si-menubar-item">
                <el-popover
                    placement="bottom"
                    :width="350"
                    trigger="click"
                    popper-class="si-menubar-item-popover"
                >
                    <template #reference>
                        <div class="si-menubar-item-text">
                            {{siMenubarItemData.text}}
                        </div>
                    </template>
                    <el-scrollbar class="si-menubar-item-padding" max-height="500px">
                        <div v-for="(item, itemIndex) in siMenubarItemData.items" :key="itemIndex">
                            <div v-if="!item.rightIcon" class="si-menubar-item-text" :class="item.divided ? 'is-divided' : ''">
                                <div style="width: 20px;">
                                    <i v-if="item.edit && item.defaultCheck" class="el-icon-check"></i>
                                </div>
                                <div class="si-menubar-item-text-left">{{item.left}}</div>
                                <div v-if="item.right" class="si-menubar-item-text-right">{{item.right}}</div>
                            </div>
                            <el-popover v-else
                                placement="right-start"
                                :width="200"
                                trigger="hover"
                                popper-class="si-menubar-item-popover"
                            >
                                <template #reference>
                                    <div class="si-menubar-item-text" :class="item.divided ? 'is-divided' : ''">
                                        <div style="width: 20px;">
                                            <i v-if="item.edit && item.defaultCheck" class="el-icon-check"></i>
                                        </div>
                                        <div class="si-menubar-item-text-left">
                                            {{item.left}}
                                        </div>
                                        <div class="si-menubar-item-text-right">
                                            <i class="el-icon-arrow-right"></i>
                                        </div>
                                    </div>
                                </template>
                                <div class="si-menubar-item-padding">
                                    <div  v-for="(child, childIndex) in item.children" :key="childIndex" class="si-menubar-item-text">
                                        <div style="width: 20px;">
                                            <i v-if="child.edit && child.defaultCheck" class="el-icon-check"></i>
                                        </div>
                                        {{child.text}}
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                    </el-scrollbar>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script>
import siMenubarData from './siMenubarData'
export default {
    name: 'SiMenubarContainer',
    data() {
        return {
            siMenubarSetData: []
        }
    },
    mounted() {
        this.siMenubarSetData = siMenubarData
    }
}
</script>
<style lang="scss">
.si-menubar-item-popover {
    padding: unset!important;
    .si-menubar-item-padding {
        padding: 12px;
    }
    .is-divided {
        border-bottom: 1px solid #ebeef5;
        margin-bottom: 2px;
    }
    .si-menubar-item-text {
        display: flex;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        align-items: center;
        .si-menubar-item-text-left {
            flex: 2;
        }
        .si-menubar-item-text-right {
            flex: 2;
            text-align: right;
            color: gray;
        }
        &:hover {
            background-color: #eeeeee;
        }
    }
}
.si-menubar-container {
    .si-menubar {
        display: flex;
        align-items: center;
        .si-menubar-item {
            .si-menubar-item-text {
                display: flex;
                padding: 6px 6px 6px 9px;
                width: fit-content;
                height: 18px;
                font-size: 14px;
                cursor: pointer;
                .si-menubar-item-text-left {
                    flex: 2;
                }
                .si-menubar-item-text-right {
                    flex: 1;
                }
            }
        }
    }
}
</style>