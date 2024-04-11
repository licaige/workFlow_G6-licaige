import *as api from '../api'
export default (state, action) => {
    state = state || { songList: [], topInfo: {}, totalSongNum: 0, updateTime: "" };
    switch (action.type) {
        case 'SONGINIT':
            return {
                songList: action.songList, topInfo: action.topInfo,
                totalSongNum: action.totalSongNum, updateTime: action.updateTime
            }
        default:
            return state;
    }
}
export const getsongList = (id) => (dispatch) => {
    fetch(api.SONG_LIST + id).then(response => response.json()).then(result => {
        console.log(result.data)
        dispatch({
            type: 'SONGINIT', songList: result.data.songList, topInfo: result.data.topInfo,
            totalSongNum: result.data.totalSongNum, updateTime: result.data.updateTime
        })
    })
}