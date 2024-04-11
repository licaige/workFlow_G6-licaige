
import { createStore } from 'vuex'
function setValue(state, key, value) {
    let graphName = state.currentGraphName
    if (!state.graphMap[graphName]) {
        state.graphMap[graphName] = {}
    }
    state.graphMap[graphName][key] = value
}
export default createStore({
    state: {
        graphMap: {},
        currentGraphName: '',
        minimapWidth: 340
    },
    getters: {
        graphMap: state => {
            return state.graphMap
        },
        currentGraphName: state => {
            return state.currentGraphName
        },
        minimapWidth: state => {
            return state.minimapWidth
        }
    },
    mutations: {
        SET_GRAPHMAP(state, value) {
            setValue(state, 'graph', value)
        },
        SET_GRAPHNAME(state, value) {
            if (!state.graphMap[value]) {
                state.graphMap[value] = {}
            }
            state.graphMap[value].graphName = value
        },
        SET_ZOOMVALUE(state, value) {
            setValue(state, 'zoomValue', value)
        },
        SET_CURRENTGRAPHNAME(state, value) {
            state.currentGraphName = value
        },
        SET_SELECTED(state, value) {
            setValue(state, 'selected', value)
        },
        SET_PASTED(state, value) {
            setValue(state, 'pasted', value)
        },
        SET_IFRAME(state, value) {
            setValue(state, 'format', value)
        },
        SET_THUMBNAIL(state, value) {
            setValue(state, 'thumbnail', value)
        },
        SET_GRID(state, value) {
            setValue(state, 'grid', value)
        },
        SET_GRID_OPTION(state, value) {
            setValue(state, 'gridOptions', value)
        },
        SET_IFRAME_TYPE(state, value) {
            setValue(state, 'formatType', value)
        },
        SET_IFRAME_NODE(state, value) {
            setValue(state, 'formatNode', value)
        },
        SET_IFRAME_EDGE(state, value) {
            setValue(state, 'formatEdge', value)
        },
        SET_BACKGROUND_COLOR(state, value) {
            setValue(state, 'backgroundColor', value)
        },
        SET_MINIMAP_WIDTH(state, value) {
            state.minimapWidth = value
        }
    },
    actions: {
        setGraphMap({ commit, dispatch }, value) {
            commit('SET_GRAPHMAP', value)
        },
        setGraphName({ commit, dispatch }, value) {
            commit('SET_GRAPHNAME', value)
        },
        setZoomValue({ commit, dispatch }, value) {
            commit('SET_ZOOMVALUE', value)
        },
        setCurrentGraphName({ commit, dispatch }, value) {
            commit('SET_CURRENTGRAPHNAME', value)
        },
        setSelected({ commit, dispatch }, value) {
            commit('SET_SELECTED', value)
        },
        setPasted({ commit, dispatch }, value) {
            commit('SET_PASTED', value)
        },
        setFormat({ commit, dispatch }, value) {
            commit('SET_IFRAME', value)
        },
        setThumbnail({ commit, dispatch }, value) {
            commit('SET_THUMBNAIL', value)
        },
        setGrid({ commit, dispatch }, value) {
            commit('SET_GRID', value)
        },
        setGridOption({ commit, dispatch }, value) {
            commit('SET_GRID_OPTION', value)
        },
        setFormatType({ commit, dispatch }, value) {
            commit('SET_IFRAME_TYPE', value)
        },
        setFormatNode({ commit, dispatch }, value) {
            commit('SET_IFRAME_NODE', value)
        },
        setFormatEdge({ commit, dispatch }, value) {
            commit('SET_IFRAME_EDGE', value)
        },
        setBackgroundColor({ commit, dispatch }, value) {
            commit('SET_BACKGROUND_COLOR', value)
        },
        setMinimapWidth({ commit, dispatch }, value) {
            commit('SET_MINIMAP_WIDTH', value)
        }
    }
})