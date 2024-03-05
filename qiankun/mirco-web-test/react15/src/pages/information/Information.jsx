import React from 'react'
import { main } from '../../utils/global'
import './Information.scss'

// 添加资讯页面导航内容
import InformationNav from './components/tab/index.jsx'

// 资讯页面列表内容
import InformationList from './components/list/index.jsx'

// 右侧新闻内容
import InformationNews from './components/news/index.jsx'

class Information extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    // 设置面包屑内容
    main.appInfo.crumbsState.setCrumbs(['首页', '选车', '丰田', '凯美瑞', '资讯列表'])
  }

  render() {
    return (
      <div className="information-container">
        <div className="information-content">
          <div className="information-wrapper">
            {/* 资讯tab */}
            <InformationNav />
            {/* 资讯的列表内容 */}
            <InformationList />
          </div>

          {/* 右侧新闻区 */}
          <div className='information-news'>
            <InformationNews />
          </div>
        </div>
      </div>
    )
  }
}

export default Information
