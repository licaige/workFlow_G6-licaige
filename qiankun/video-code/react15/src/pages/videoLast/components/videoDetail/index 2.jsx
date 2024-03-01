import React from 'react'
import './index.scss'

import observer from '../../../../assets/observer.png'

class VideoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { navList } = this.state
    return (
      <div className="video-detail-container">
        <div className="video-detail-play">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg" alt=""/>
        </div>

        <div className="video-detail-title">
          思域还是昂克赛拉？老编辑来作一次“不冲动”的选择思域还是昂克赛拉？老编辑来作一次“不冲动”的选择
        </div>

        <div className="video-detail-observer">
          <img src={observer} alt=""/>
          <span>4.9w</span>
          <span>导购</span>
          <span>2020-02-02 00:00:00</span>
        </div>

        <div className="video-detail-prompt">
          谈起最能激发“肾上腺素”的十万级紧凑型轿车，就绝对绕不开思域与昂克赛拉——优雅运动的线条总能与年轻人意气相投。
        </div>
      </div>
    )
  }
}

export default VideoDetail
