import React from 'react';
import './index.css'
import { connect } from 'react-redux'
import { getsongList } from '../../store/songList.redux'
@connect(
  state => ({
    songList: state.songList.songList,//列表集合
    topInfo: state.songList.topInfo, //图片地址以及名称对象
    totalSongNum: state.songList.totalSongNum, //共有多少首
    updateTime: state.songList.updateTime //更新的时间
  }),
  {
    getsongList,
    // 传递一个存储列表集合
    setList(list){
      return {type:'player_list',list}
    }
  }
)
class SongList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)
    this.props.getsongList(id)
  }
  // 调用props传过来的方法，将列表集合存储
  componentDidUpdate(){
    this.props.setList(this.props.songList)
  }
  render() {
    return (
      <div className="songList">
        <div className="songListBox">
          <div className="loging"></div>
          <div className="headbox headbox2">
            <p className="p1">
              <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt='' />
            </p>
            <p className="p2">
              <span>戳我查看</span>
            </p>
          </div>
          <div className="songInfoBox">
            <div className="songInfo">
              <p className="song_pic">
                <img src={this.props.topInfo.picAlbum} alt="" />
              </p>
              <h2 className="song_title">{this.props.topInfo.listName}</h2>
              <h3 className="song_number">{this.props.topInfo.listName} 第170天</h3>
              <h3 className="song_time">更新时间: {this.props.updateTime}</h3>
              <span className="iconfont icon-bofang1 song_play"></span>
            </div>
            <div className="songList">
              <p className="songList_num">
                排行榜
            <span>共{this.props.totalSongNum}首</span>
              </p>
              <ul>
                {
                  this.props.songList.map((value, index) => (
                    //点击歌曲跳转到歌曲播放页，并传递两个id值
                    <li key={value.songId} onClick={()=>this.props.history.push(`/player/${value.songMid}/${value.songId}`)}>
                      <p className="songlist_index songlist_num3">{index + 1}</p>
                      <div className="songlist_name">
                        <p className="song_name">{value.songName}</p>
                        <p className="singer_name">
                          {
                            value.singer.map(v=>(
                              <span key={v.singerMid}>
                                {v.singerName}
                              </span>
                            )) 
                          }
                        </p>
                      </div>
                      <p className="iconfont icon-download songList_xiazai"></p>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SongList