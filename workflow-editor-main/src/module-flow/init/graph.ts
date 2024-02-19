import {SetupContext, watch} from "vue";
import {ref} from "vue";
import G6, {Graph} from "@antv/g6";


export default function (props: any, ctx: SetupContext) {
    let container = ref<HTMLDivElement>()
    let minimap = ref<HTMLDivElement>()
    let graph = ref<Graph>({} as Graph)

    watch(container, function (div) {
        if (div && minimap.value) {
            graph.value = new G6.Graph({
                container: div,
                width: div.clientWidth,
                height: div.clientHeight - 4,
                modes: {
                    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'activate-relations', {
                        type: 'click-select',
                        multiple: false
                    }],
                },
                plugins: [new G6.Grid({}), new G6.Minimap({
                    container: minimap.value,
                    size: [minimap.value?.clientWidth, minimap.value?.clientHeight]
                })],
            });
        }
    })


    return {
        container,
        minimap,
        graph,
    }
}