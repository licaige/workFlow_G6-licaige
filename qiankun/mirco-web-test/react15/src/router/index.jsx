import React from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router';

// 资讯页面
import Information from '../pages/information/Information.jsx'

// 资讯最终页
import InformationLast from '../pages/informationLast/index.jsx';

// 视频页
import Video from '../pages/video/index.jsx'

// 视频最终页
import VideoLast from '../pages/videoLast/index.jsx'

class BasicMap extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        {/* 资讯列表 */}
        <Route path="/information" component={Information}/>
        {/* 资讯最终页面 */}
        <Route path="/information-last" component={InformationLast}/>
        {/* 视频 */}
        <Route path="/video" component={Video}/>
        {/* 视频最终页 */}
        <Route path="/video-last" component={VideoLast}/>
      </Router>
    )
  }
}

export default BasicMap
