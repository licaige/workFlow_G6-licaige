import React from 'react';
import music from './music.svg'
import './index.css'
import { connect } from 'react-redux'
import { searchList } from '../../store/search.redux'

@connect(

  state => ({
    hot: state.search.hot,
    currentNumber: state.search.currentNumber,  // 条数
    currentPage: state.search.currentPage,    // 页数
    totalNumber: state.search.totalNumber,  //总条数
    songList: state.search.songList //搜索出来的集合对象
  }), {
    searchList,
    //将搜索出来的集合对象在存储一次
    setList(list){
      return {type:'palyer_list',list}
    }

}
)

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      showHistory: false, //历史记录默认隐藏
      showHot: true //热门搜索默认为显示
    }
  }
  // 调用传过来的方法将搜索出来的对象集合存储
  componentDidUpdate(){
    this.props.setList(this.props.songList)
  }
  // 点击输入框改变框的长度
  onclickInput = (e) => {
    this.refs.ipt.style.width = "85%"
    this.setState({
      showHistory:true
    })
  }
  // 点击取消按钮改变输入框的长度
  onclickCancel = (e) => {
    this.refs.ipt.style.width = "96%"
    this.setState({
      showHistory:false
    })
  }
  // 当input中有值情况改变isSearch属性
  inputVal = (e) => {
    let val = e.target.value
    if (val.trim().length > 0) {
      this.setState({
        isSearch: true,
        showHistory: true,
      })
    } else {
      this.setState({
        isSearch: false
      })
    }
  }
    // 点击热门自动搜列表
  onclickHot = (value)=>{
    this.refs.searchInput.value=value
    this.clicksearch()
    }
  // 点击搜索按钮显示列表
  clicksearch = (e) => {
    let val = this.refs.searchInput.value
    this.props.searchList(val)
    this.setState({
      showHistory:false,
      showHot:false
    })
  }
  render() {
    return (
      <div className="searchBox">
        {/* 搜索框区域 */}
        <div className="iptBox">
          <div className="ipt" ref="ipt">
            <span className="iconfont icon-sousuo" id="search"></span>
            {/* input框区域 */}
            <input type="search" placeholder="搜索歌曲、歌单、专辑" id="searchInput" onFocus={this.onclickInput} onChange={this.inputVal} ref='searchInput' />
          </div>
          <p className="callOff" hidden={this.state.isSearch} onClick={this.onclickCancel}>取消</p>
          <p className="callOff search_btn" hidden={!this.state.isSearch} onClick={this.clicksearch}>搜索</p>
        </div>
        <div className="searchBar">
          <div className="search_hisTory" hidden={!this.state.showHistory}>
            <div className="search_hisTory_box">
              <p>
                历史记录
              </p>
              <h1>删除历史搜索记录</h1>
            </div>
          </div>
          {/* 热门搜索区域 */}
          <div className="hotsearch" hidden={!this.state.showHot}>
            <h2 className="hotsearch_title">热门搜索</h2>
            <div className="hot_sea">
              {
                this.props.hot.map((value, index) => (
                  // 判断span第一个值的给样式
                  <span className={index === 0 ? 'on' : ''} key={index} onClick={()=>this.onclickHot(value)}>
                    {value}
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className="search_songList" hidden={this.state.showHot}>
          <ul>
            {
              this.props.songList.map(value => (
                // 点击列表跳转到播放页并传递两个id值
                <li key={value.songId} onClick={()=>this.props.history.push(`/player/${value.songMid}/${value.songId}`)}>
                  <img src={music} alt='' />
                  <div className="search_song_name">
                    <p className="search_song_name1">{value.songName}</p>
                    <p className="search_song_name2">
                      {
                        value.singer.map(v => (
                          <span key={v.singerMid}>
                            {v.singerName}
                          </span>
                        ))
                      }
                    </p>
                  </div>
                  <span>{value.songId}</span>
                </li>
              ))
            }
            <li className="isEnd">
              已经到底啦~
          </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Search