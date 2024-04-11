<template>
    <div ref="demo" id="demo">
        <X6ContextMenu :tAnimateFill="true">
            <ElButton @contextmenu="oncontextmenu($event)" type="primary">Vue-Node</ElButton>
            <template #menu>
                <X6Menu :onClick="onMenuClick">
                    <X6MenuItem name="1st menu item" key="1">1st menu item</X6MenuItem>
                    <X6MenuItem name="2nd menu item" key="2">2nd menu item</X6MenuItem>
                    <X6MenuItem name="3rd menu item" key="3">3rd menu item</X6MenuItem>
                </X6Menu>
            </template>
        </X6ContextMenu>
    </div>
</template>
<script>
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { X6ContextMenu, X6Menu, X6MenuItem } from 'x6-vue3-components'
export default {
    name: 'Demo',
    components: {
        ElButton,
        X6ContextMenu,
        X6Menu,
        X6MenuItem
    },
    inject: ["getGraph", "getNode"],
    setup() {
        let demo = ref()
        return {
            demo
        }
    },
    methods: {
        onMenuClick(name) {
            ElMessage.success({
                message: name
            })
        },
        oncontextmenu(event) {
            // x6-widget-stencil-group-content
            let demo = document.querySelectorAll('.x6-widget-stencil-group-content #demo')
            if (this.demo == demo[0]) event.stopPropagation();
        }
    }
}
</script>
