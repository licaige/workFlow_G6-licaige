import * as api from '../api'
export default (state,action)=>{
    state=state || {data:[]};
    switch(action.type){
        case 'RANK_INIT':
            return {data:action.data}
        default:
            return state;
    }
}
export const rank =()=>(dispatch)=>{
    fetch(api.TOP_LIST).then(response=>response.json()).then(result=>{
        console.log(result.data)
        dispatch({type:'RANK_INIT',data:result.data})
    })
}