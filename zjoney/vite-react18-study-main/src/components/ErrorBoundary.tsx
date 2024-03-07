import React from 'react';

interface Props {
    fallback:React.ReactNode
}
export default class extends React.Component<Props>{
    state = {hasError:false,error:null}
    //从错误中映射状态对象
    static getDerivedStateFromError(error:any){
        return {
            hasError:true,
            error
        }
    }
    render(){
        if(this.state.hasError){
            return this.props.fallback;
        }
        return this.props.children;
    }
}