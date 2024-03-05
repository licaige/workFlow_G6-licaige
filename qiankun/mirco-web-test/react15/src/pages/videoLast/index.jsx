import React from 'react'
import { main } from '../../utils/global'
import './index.scss'

import InformationOperation from '../informationLast/components/operation/index.jsx';
import InformationLastComments from '../informationLast/components/comments/index.jsx';
import InformationLastCommentsList from '../informationLast/components/commentsList/index.jsx';
import InformationLastRelevant from '../informationLast/components/relevant/index.jsx';
import InformationLastCar from '../informationLast/components/car/index.jsx';

import VideoDetail from './components/videoDetail/index.jsx';
import HotVideo from './components/hotVideo/index.jsx';

class VideoLast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    // 设置面包屑内容
    main.appInfo.crumbsState.setCrumbs(['首页', '选车', '丰田', '凯美瑞', '视频'])
  }

  render() {
    const { navList } = this.state
    return (
      <div className="video-last-container">
        <div className="video-last-content">
          <div className='video-last-wrapper'>
            {/* 视频内容 */}
            <VideoDetail />

            {/* 点赞内容 */}
            <InformationOperation />

            {/* 评论内容 */}
            <InformationLastComments />

            {/* 评论列表 */}
            <InformationLastCommentsList />

            {/* 相关资讯 */}
            <InformationLastRelevant />
          </div>

          <div className="video-last-news">
            <InformationLastCar />
            <HotVideo />
          </div>
        </div>
      </div>
    )
  }
}

export default VideoLast
