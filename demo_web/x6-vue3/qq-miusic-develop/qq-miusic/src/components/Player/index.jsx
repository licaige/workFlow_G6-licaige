import React from 'react';
import './index.css'
import { getAudio, getLyric, getAvatar, getCurrentSong } from '../../store/player.redux';
import { connect } from 'react-redux';
import Loading from '../../base/Loading';
@connect(
  state => ({
    audio: state.player.audio,
    lyric: state.player.lyric,
    currentSong: state.player.currentSong,
    albumImgUrl: state.player.albumImgUrl,
    singerAvatarUrl: state.player.singerAvatarUrl,
    currentIndex: state.player.currentIndex
  }), {
    getAudio, getLyric, getAvatar, getCurrentSong,
    //下一曲
    next() {
      return { type: 'next' }
    },
    // 上一曲
    prev() {
      return { type: 'prev' }
    }
  } 
)
class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSpeed:false,
      speed:1,
      currentLineNum:0,
      playPercent:0,
      playing:true,
      currentTime:0,
      duration:0
    }
  }
  componentDidMount(){
    const {songMid,songId} = this.props.match.params;
    this.props.getCurrentSong(songMid);
  }
  formatTime(data){
    if(data<10){
      return '0'+data;
    }else{
      return data;
    }
  }
  process=(e)=>{
    console.log('playing....');
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    //播放时间比
    let playPercent = (currentTime/duration).toFixed(2) * 100;
    this.setState({
      playPercent,
      currentTime,
      duration
    })
    //歌词对比
    let list = this.refs.inner.getElementsByTagName('p');
    if(!list) return;
    let len = list.length;
    for(let i =0 ;i<len;i++){
      let p = list[i];
      let cc = parseInt(currentTime);
      if(parseInt(p.getAttribute('time'))===cc && cc>0){
        this.setState({
          currentLineNum:i
        })
        this.refs.inner.style.top = -i * parseInt(p.offsetHeight) + 'px';
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.currentSong!==nextProps.currentSong){
      // debugger
      console.log('======componentWillReceiveProps=======');
      const {albumMid,singer} = nextProps.currentSong;
      this.props.getAvatar(albumMid,singer[0].singerMid)
      this.props.getAudio(nextProps.currentSong.songMid);
      this.props.getLyric(nextProps.currentSong.songId);
    }
  }
  run=()=>{
    this.setState({
      playing:!this.state.playing
    },()=>{
      if(this.state.playing){
        this.refs.audio.play();
      }else{
        this.refs.audio.pause();
      }
    })
  }
  render(){
    if(this.props.currentSong && this.props.currentSong.songName && this.props.lyric){
      return (
        <div className="player">
      <div className="playHead">
        <p className="p1">
          <img
            src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000"
            alt=""
          />
        </p>
        <p className="p2">千万正版音乐,海量无损曲库</p>
        <p className="p3">立即使用</p>
      </div>
      <div className="playInfo">
        <div className="loging"></div>
        <p className="songPic" style={{backgroundImage:`url(${this.props.albumImgUrl})`}}></p>
        <div className="playVideo">
          <div className="play_song">
            <p className="singerPic1">
              <img src={this.props.singerAvatarUrl} alt=""/>
            </p>
            <p className="play_songName">{this.props.currentSong.songName}</p>
            <p className="play_singeName">
              {
                this.props.currentSong.singer.map(sin=>(
                <span  key={sin.singerMid}>{sin.singerName}</span>
                ))
              }
            </p>
          </div>
          <div className="lrc">
            <div className="lrc_box">
              <div className="inner" style={{top:100}} ref="inner">
                {
                  this.props.lyric.map((lrc,index)=>(
                    <p time={lrc.time} key={index+1} className={this.state.currentLineNum===index?'active':''}>
                      {lrc.lrc}
                    </p>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="audioBox">
            <audio loop src={this.props.audio} ref="audio" autoPlay={this.state.playing} onTimeUpdate={this.process}></audio>
            <h2 className="play_btn_songname">
              {this.props.currentSong.songName} | 歌手 :
              {this.props.currentSong.singer.map((ss,index)=>(
                <span key={index}>
                  {ss.singerName}
                </span>
              ))}
            </h2>
            <div className="play_btn_box">
              <p className="preve iconfont icon-zuobofang" onClick={this.props.prev}></p>
              <p className={`iconfont bofang ${this.state.playing?'icon-bofang2':'icon-bofang1'}`} onClick={this.run}></p>
              <p className="next iconfont icon-youbofang" onClick={this.props.next}></p>
            </div>
            {/* 音量 */}
            <div className="play_acound">
              <p className="iconfont muted icon-jingyin"></p>
              <div className="acoundBox" ref="progressBar">
                <div className="acoundJindu" ref="progress"></div>
              </div>
            </div>
            {/* 进度 */}
            <div className="play_plan_box">
              <div className="play_plan" >
                <div className="play_plan_aa" style={{width:this.state.playPercent+'%'}}></div>
              </div>
              <p className="play_time">
              {this.formatTime(parseInt(this.state.currentTime / 60))}:{this.formatTime(parseInt(this.state.currentTime % 60))} / 
              {this.formatTime(parseInt(this.state.duration / 60))}:{this.formatTime(parseInt(this.state.duration % 60))}
              </p>
            </div>
            {/* 速度 */}
            <div className="speedBox">
              <span>倍速</span>
              <b ref="speedBox">{this.state.speed}</b>
              <div className="speed_cont speed_cont1" hidden={!this.state.showSpeed}>
                <p spedd="0.5" className={this.state.speed===0.5?'sppedOn':''} >0.5</p>
                <p spedd="1" className={this.state.speed===1?'sppedOn':''}>1.0</p>
                <p spedd="1.5" className={this.state.speed===1.5?'sppedOn':''}>1.5</p>
                <p spedd="2" className={this.state.speed===2.0?'sppedOn':''}>2.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
    }else{
      return <Loading></Loading>
    }
    
  }
}
export default Player