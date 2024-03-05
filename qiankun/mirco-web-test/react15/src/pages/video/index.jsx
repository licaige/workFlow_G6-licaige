import React from 'react'
import { main } from '../../utils/global'
import './index.scss'

// 添加导航
import InformationNav from '../information/components/tab/index.jsx';

// 加载视频列表
import VideoList from './components/list/index.jsx'

class InformationLast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '车评',
          value: 1
        },
        {
          label: '花边',
          value: 2
        },
        {
          label: '事故',
          value: 3
        },
        {
          label: '自驾游',
          value: 4
        },
        {
          label: '改装',
          value: 5
        },
        {
          label: '分类六',
          value: 6
        },
      ]
    }
  }
  componentDidMount() {
    // 设置面包屑内容
    main.appInfo.crumbsState.setCrumbs(['首页', '选车', '丰田', '凯美瑞', '视频'])
  }

  render() {
    const { navList } = this.state
    return (
      <div className="video-container">
        <div className="video-content">
          <InformationNav navList={navList}/>

          <VideoList />
        </div>

      </div>
    )
  }
}

export default InformationLast
