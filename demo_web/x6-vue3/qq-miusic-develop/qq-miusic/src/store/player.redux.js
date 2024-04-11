import { SONG_URL, LRC, ALBUMIMG } from '../api'
export default (state, action) => {
    state = state || {};
    switch (action.type) {
        case 'AUDIO':
            return { ...state, audio: action.audio }//返回歌曲音频数据
        case 'LYRIC':
            return { ...state, lyric: action.lyric }//返回歌词数据
        case 'player_list':
            sessionStorage.setItem('play_list', JSON.stringify(action.list));
            return { ...state, list: action.list}
        case 'get_current_song':
            let list = state.list || JSON.parse(sessionStorage.getItem('play_list'));
            let currentIndex = list.findIndex((value) => (value.songMid === action.Mid))
            let currentSong = list[currentIndex];
            return { ...state, currentSong, currentIndex, list };
        case 'avatar':
            return { ...state, albumImgUrl: action.albumImgUrl, singerAvatarUrl: action.singerAvatarUrl }
        case 'next':
            let currentIndex2 = state.currentIndex + 1;
            let currentSong2 = state.list[currentIndex2];
            return { ...state, currentSong: currentSong2, currentIndex: currentIndex2 }
        case 'prev':
            let currentIndex3 = state.currentIndex - 1;
            let currentSong3 = state.list[currentIndex3];
            return { ...state, currentSong: currentSong3, currentIndex: currentIndex3 }
        default:
            return state;
    }
}
// 获取歌曲音频数据
export const getAudio = (url) => (dispatch) => {
    fetch(SONG_URL + url).then(response => response.json()).then(result => {
        dispatch({ type: 'AUDIO', audio: result.data[0] })
    })
}
//获取歌词
export const getLyric = (url) => async (dispatch) => {
    const result = await fetch(LRC + url).then(response => response.json())
    let arr = result.data.lyric.split('[换行]');
    let lrcList = [];
    for (let i in arr) {
        let s = arr[i];
        let endIndex = s.indexOf(']');
        let time = s.substring(0, endIndex + 1).replace('[', '').replace(']', '');
        //将时间格式转换为秒存储
        let min = parseInt(time.split(':')[0]) * 60;
        let sec = parseFloat(time.split(':')[1]);
        //截取歌词
        let lrc = s.substring(endIndex + 1, s.length)
        if (lrc.trim().length > 0) {
            lrcList.push({ time: (min + sec).toFixed(2), lrc })
        }
    }
    dispatch({ type: 'LYRIC', lyric: lrcList });
}
//获取图片信息
export const getAvatar = (albumMid, singerMid) => async (dispatch) => {
    const result = await fetch(ALBUMIMG + albumMid + '/' + singerMid).then(response => response.json())
    dispatch({ type: 'avatar', albumImgUrl: result.data.albumImgUrl, singerAvatarUrl: result.data.singerAvatarUrl })
}
//初始化当前播放的歌曲
export const getCurrentSong = (Mid) => (dispatch) => {
    dispatch({ type: 'get_current_song', Mid })
}