<template>
    <div format>
        <FormatGraph v-if="formatType == 'graph'"></FormatGraph>
        <FormatNode v-if="formatType == 'node'"></FormatNode>
        <FormatEdge v-if="formatType == 'edge'"></FormatEdge>
    </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import FormatGraph from './formatGraph'
import FormatNode from './formatNode.vue'
import FormatEdge from './formatEdge.vue'
export default {
    name: 'Format',
    components: {
        FormatGraph,
        FormatNode,
        FormatEdge
    },
    setup() {
        const store = useStore()
        let graphName = computed(() => store.state.currentGraphName)
        let formatType = computed(() => {
            return store.state.graphMap[graphName.value] && store.state.graphMap[graphName.value].formatType
        })
        return {
            formatType
        }
    }
}
</script>
<style lang="scss">
div[format] {
    font-size: 14px;
    .title {
        padding: 0px 0px 6px;
        white-space: nowrap;
        overflow: hidden;
        width: 200px;
        font-weight: bold;
    }
    .content {
        padding: 0px;
    }
    .el-carousel__button {
        background-color: #c7c3c3;
    }
    .el-carousel__indicators--horizontal {
        width: 100%;
        text-align: center;
    }
    .el-divider--horizontal {
        margin: 4px 0;
    }
    label {
        height: 32px;
        line-height: 32px;
    }
    .el-tab-pane {
        height: 500px;
    }
}
</style>