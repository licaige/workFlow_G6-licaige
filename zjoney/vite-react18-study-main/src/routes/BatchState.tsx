import React from 'react';


export default class extends React.Component{
    state = {number:0}
    handleClick = ()=>{
        this.setState({number:this.state.number+1});
        console.log(this.state);//0
        this.setState({number:this.state.number+1});
        console.log(this.state);//0
        setTimeout(()=>{
            this.setState({number:this.state.number+1});
            console.log(this.state);//2
            this.setState({number:this.state.number+1});
            console.log(this.state);//3
        });
    }
    render(){
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}