<template>
    <div class="flowToolbar">
        <X6Toolbar hoverEffect :onClick="toolbarClick">
            <X6Group>
                <X6Item name="iframe" tooltip="查看 (按住Alt并拖拽以移动画布)" tooltipAsTitle icon="flowToolbarIcon iconfont icon-iframe" dropdownArrow>
                    <template #dropdown>
                        <X6Menu :onClick="iframeClick">
                            <X6MenuItem name="format" hotkey="Ctrl+Shift+P">
                                <template #icon>
                                    <Check v-show="format" />
                                </template>
                                格式面板
                            </X6MenuItem>
                            <X6MenuItem name="thumbnail" hotkey="Ctrl+Shift+O">
                                <template #icon>
                                    <Check v-show="thumbnail" />
                                </template>
                                缩略图
                            </X6MenuItem>
                        </X6Menu>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item name="zoom" tooltip="Zoom (Ctrl+Mousewheel)" tooltipAsTitle :text="zoomValue" dropdownArrow>
                    <template #dropdown>
                        <X6Menu :onClick="zoomClick">
                            <X6MenuItem v-for="(value, index) in toolbar.zoom.values" :key="index" :name="value.name" :hotkey="value.hotkey">
                                {{value.text}}
                            </X6MenuItem>
                        </X6Menu>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item name="zoomIn" tooltip="Zoom In (Ctrl +)">
                    <template #icon>
                        <span style="width: 20px;height: 20px;"><ZoomIn /></span>
                    </template>
                </X6Item>
                <X6Item name="zoomOut" tooltip="Zoom Out (Ctrl -)">
                    <template #icon>
                        <span style="width: 20px;height: 20px;"><ZoomOut /></span>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item name="undo" tooltip="Undo (Ctrl + Z)">
                    <template #icon>
                        <span style="width: 20px;height: 20px;">
                            <refresh-left />
                        </span>
                    </template>
                </X6Item>
                <X6Item name="redo" tooltip="Redo (Ctrl + Shift + Z)">
                    <template #icon>
                        <span style="width: 20px;height: 20px;">
                            <refresh-right />
                        </span>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item :disabled="!selected" name="copy" icon="flowToolbarIcon iconfont icon-copynode" tooltip="Copy (Ctrl + C) & (Ctrl + C)">
                </X6Item>
                <X6Item :disabled="!selected" name="cut" icon="flowToolbarIcon iconfont icon-cut" tooltip="Cut (Ctrl + X)">
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item :disabled="!selected" name="delete" tooltip="Delete (Delete)">
                    <template #icon>
                        <span style="width: 20px;height: 20px;">
                            <delete />
                        </span>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item name="grid" tooltip="Grid Ctrl+Shift+G">
                    <template #icon>
                        <span style="width: 20px;height: 20px;">
                            <grid />
                        </span>
                    </template>
                </X6Item>
            </X6Group>
            <X6Group>
                <X6Item :disabled="!selected" name="bold" tooltip="Bold (Ctrl + B)" icon="flowToolbarIcon iconfont icon-fontbold">
                </X6Item>
                <X6Item :disabled="!selected" name="italic" tooltip="Italic (Ctrl + I)" icon="flowToolbarIcon iconfont icon-fontitalics">
                </X6Item>
                <X6Item :disabled="!selected" name="strikethrough" tooltip="Strikethrough (Ctrl + Shift + X)" icon="flowToolbarIcon iconfont icon-fontstrikethrough">
                </X6Item>
                <X6Item :disabled="!selected" name="underline" tooltip="Underline (Ctrl + U)" icon="flowToolbarIcon iconfont icon-fontunderline">
                </X6Item>
            </X6Group>
            <template #extra>
                <span @click="fullScreen" style="width: 20px;height: 20px;cursor: pointer;">
                    <full-screen />
                </span>
            </template>
        </X6Toolbar>
    </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import menuEvent from './menuEvent.js'
export default {
    name: 'FlowToolbar',
    setup() {
        const store = useStore()
        let graphName = computed(() => store.state.currentGraphName)
        let graph = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].graph
        })
        let toolbar = menuEvent.toolbar
        let zoomValue = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].zoomValue
        })
        let selected = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].selected
        })
        let format = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].format
        })
        let thumbnail = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].thumbnail
        })
        return {
            graph,
            toolbar,
            zoomValue,
            selected,
            format,
            thumbnail
        }
    },
    mounted() {
    },
    emits: ['fullScreen'],
    methods: {
        fullScreen() {
            this.$emit('fullScreen')
        },
        toolbarClick(name) {
            let graph = this.graph
            let value = this.toolbar[name]
            if (value && value.event) {
                value.event(graph)
            }
        },
        zoomClick(name) {
            this.onclick(name, 'zoom')
        },
        iframeClick(name) {
            this.onclick(name, 'iframe')
        },
        onclick(name, type) {
            let graph = this.graph
            let typeValue = this.toolbar[type]
            let values = typeValue.values
            let event = typeValue.event
            let value = values.find(item => {
                return item.name == name
            })
            value.event ? value.event(graph) : event(graph, name)
        }
    }
}
</script>
<style lang="scss">
.flowToolbar {
    background: rgb(245, 245, 245);
    padding-right: 16px;
    .flowToolbarIcon {
        font-size: 20px!important;
    }
    .x6-menu-item-icon {
        bottom: 2px!important;
        left: -8px!important;
    }
}
</style>