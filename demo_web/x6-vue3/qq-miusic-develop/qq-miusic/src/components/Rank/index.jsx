import React from 'react';
import './index.css'
import {connect} from 'react-redux'
import {rank} from '../../store/rank.redux'
@connect(
  (state)=>({
    data:state.rank.data
  }),
  {
    rank
  }
)
class Rank extends React.Component{
  componentDidMount(){
    this.props.rank()
  }
  render(){
    return (
      <div class="rank">
      <ul>
        {
          this.props.data.map(value =>(
        <a key={value.id} href={`/songList/${value.id}`}>
          <li>
            <p class="ph_img">
              <img src={value.picUrl} alt=''/>
              <span class="iconfont icon-erji">{value.listenCount>10000?parseInt(value.listenCount/10000)+'万':value.listenCount}</span>
            </p>
            <div class="ph_song_list">
              <span class="iconfont icon-you"></span>
              <h2>{value.title}</h2>
              {value.songList.map(val=>(
                <p key={val.number}>
                  {val.number}
                  <span>{val.songName}</span> -{val.singerName}
                </p>
              ))}
            </div>
          </li>
        </a>
          
          ))}
      </ul>
    </div>
    )
  }
}
export default Rank;