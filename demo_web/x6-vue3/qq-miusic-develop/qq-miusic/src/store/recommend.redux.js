import *as api from '../api'
export default (state,action)=>{
    state=state || {radioList:[],slider:[]};
    switch(action.type){
        case 'RECOM_INIT':
            return {radioList:action.radioList,slider:action.slider}
        default:
            return state;
    }
}
// 获取接口数据
export const recommend =()=>(dispatch)=>{
fetch(api.RECOMMEND).then(response=>response.json()).then(result=>{
    // console.log(result)
    if(result.errno===0){
        dispatch({type:'RECOM_INIT',radioList:result.data.radioList,slider:result.data.slider})
    }
})
}