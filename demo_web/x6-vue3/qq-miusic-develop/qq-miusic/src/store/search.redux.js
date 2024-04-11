import { SEARCH } from '../api'
export default (state, action) => {
    state = state || {
        hot: ['周杰伦', '薛之谦', '林俊杰', '演员', '稻香', '像鱼'],
        songList: [],        // 搜索出来的数据
        currentNumber: 0,  // 条数
        currentPage: 1,    // 页数
        totalNumber: 0     // 总条数
    }

    switch (action.type) {
        case 'hot':
            return { hot: '' }
        case 'SEARCHLIST':
            return {
                ...state,//将原来本身的数据传递出去
                songList: action.songList,
                currentNumber: action.currentNumber,
                currentPage: action.currentPage,
                totalNumber: action.totalNumber
            }
        default:
            return state;
    }
}
export const searchList = (text) => (dispatch) => {
    fetch(SEARCH + text).then(response => response.json()).then(result => {
        console.log(result.data)
        dispatch({
            type: 'SEARCHLIST',
            songList: result.data.songList,
            currentNumber: result.data.page.currentNumber,
            currentPage: result.data.page.currentPage,
            totalNumber: result.data.page.totalNumber
        })
    })
}