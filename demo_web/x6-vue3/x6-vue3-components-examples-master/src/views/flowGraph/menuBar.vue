<template>
    <X6Menubar class="menuBar">
        <X6MenubarItem v-for="menuBarItem in menuBars" :key="menuBarItem.index" :text="menuBarItem.text">
            <X6Menu :onClick="this[menuBarItem.onClick]">
                <div v-for="(item, index) in menubar[menuBarItem.name]" :key="index">
                    <div v-if="item.children">
                        <X6SubMenu :text="item.text" :arrow="item.arrow">
                            <X6MenuItem v-for="(child, childIndex) in item.children" :key="childIndex" :name="child.name">
                                {{child.text}}
                            </X6MenuItem>
                        </X6SubMenu>
                    </div>
                    <div v-else>
                        <X6MenuItem :disabled="item.disabled" v-if="item.name != 'divider'" :name="item.name" :hotkey="item.hotkey">
                            {{item.text}}
                        </X6MenuItem>
                        <X6Divider v-else />
                    </div>
                </div>
            </X6Menu>
        </X6MenubarItem>
    </X6Menubar>
</template>
<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import menuEvent from './menuEvent.js'
export default {
    name: 'MenuBar',
    setup() {
        let menubar = reactive(menuEvent.menubar)
        const store = useStore()
        let graphName = computed(() => store.state.currentGraphName)
        let graph = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].graph
        })
        let selected = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].selected
        })
        let pasted = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].pasted
        })
        watch(
            () => selected.value,
            (val) => {
                let edit = menubar.edit
                let editItems = edit.filter(item => {
                    return ['cut', 'copy'].indexOf(item.name) > -1
                })
                editItems.forEach(editItem => {
                    editItem.disabled = !val
                })
            }
        )
        watch(
            () => pasted.value,
            (val) => {
                let edit = menubar.edit
                let editItems = edit.filter(item => {
                    return ['paste'].indexOf(item.name) > -1
                })
                editItems.forEach(editItem => {
                    editItem.disabled = !val
                })
            }
        )
        let menuBars = reactive([
            {
                index: '1',
                name: 'file',
                text: 'File',
                onClick: 'onMenuFileClick'
            },
            {
                index: '2',
                name: 'edit',
                text: 'Edit',
                onClick: 'onMenuEditClick'
            },
            {
                index: '3',
                name: 'view',
                text: 'View',
                onClick: 'onMenuViewClick'
            },
            {
                index: '4',
                name: 'help',
                text: 'Help',
                onClick: 'onMenuHelpClick'
            }
        ])
        return {
            menubar,
            graph,
            selected,
            menuBars
        }
    },
    methods: {
        onMenuFileClick(name) {
            this.onMenuClick(name, 'file')
        },
        onMenuEditClick(name) {
            this.onMenuClick(name, 'edit')
        },
        onMenuViewClick(name) {
            let ext = ['zoomin', 'zoomout']
            if (ext.indexOf(name) > -1) {
                this.onMenuClick(name, 'view')
            } else {
                this.$message.success(name)
            }
        },
        onMenuHelpClick(name) {
            this.$message.success(name)
        },
        onMenuClick(name, type) {
            let graph = this.graph
            let typeValue = this.menubar[type]
            let typeItem = typeValue.find(item => {
                if (item.children) {
                    let childItem = (item.children || []).find(child => {
                        return child.name == name
                    })
                    return !!childItem
                }else {
                    return item.name == name
                }
            })
            if (typeItem.children) {
                let childItem = (typeItem.children || []).find(child => {
                    return child.name == name
                })
                childItem && childItem.event && childItem.event(graph)
            } else {
                typeItem && typeItem.event && typeItem.event(graph)
            }
        }
    }
}
</script>
<style lang="scss">
.menuBar {
    .x6-menubar-item-text {
        font-size: 16px!important;
    }
}
</style>