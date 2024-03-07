import React from 'react';
interface Props {
    fallback:React.ReactNode
}
export default class extends React.Component<Props>{
    state = {loading:false}
    componentDidCatch(error:any){
        if(typeof error.then === 'function'){
            this.setState({loading:true});
            error.then(()=>{
                this.setState({loading:false});
            });
        }
    }
    render(){
        const {children,fallback} = this.props;
        const {loading} = this.state;
        return loading?fallback:children;
    }
}