import React from 'react'
import {Route,Redirect,Switch,NavLink} from 'react-router-dom'
import Recommend from '../Recommend'
import Rank from '../Rank'
import Search from '../Search'
import './index.css';
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <div className="index">
        {/* 头部 */}
        <div className="headbox headbox1">
          <p className="p1">
            <img src="http://y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
          </p>
          <p className="p2">
            <span>下载APP</span>
          </p>
        </div>
        {/* <!-- 内容区域 --> */}
        <div className="conBox">
          {/* <!-- 导航区 --> */}
          <p className="nav">
            <NavLink to="/recommend">推荐</NavLink>
            <NavLink to="/rank">排行榜</NavLink>
            <NavLink to="/search">搜索</NavLink>
          </p>
          {/* <!-- 路由显示区域 --> */}
          <Switch>
            <Route exact path='/recommend' component={Recommend}></Route>
            <Route path='/rank' component={Rank}></Route>
            <Route path='/search' component={Search}></Route>
            <Redirect to='/recommend'></Redirect>
          </Switch>
        </div>
        {/* <!-- 尾部 --> */}
        <div className="bottom"><a href="http://www.baidu.com">安装QQ音乐，发现更多精彩</a></div>
      </div>
    );
  }
}

export default Home;