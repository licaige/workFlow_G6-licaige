import React from 'react'
import { main } from '../../utils/global'
import './index.scss'

// 资讯文章
import InformationLastArticle from './components/article/index.jsx';

// 热门推荐
import InformationRecommend from '../information/components/recommended/index.jsx';

// 车辆信息
import InformationLastCar from './components/car/index.jsx';

class InformationLast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    // 设置面包屑内容
    main.appInfo.crumbsState.setCrumbs(['首页', '选车', '丰田', '凯美瑞', '资讯最终页'])
  }

  render() {
    return (
      <div className="information-last-container">
        <div className="information-last-content">
          <div className="information-last-wrapper">
            {/* 资讯文章 */}
            <InformationLastArticle />
          </div>

          {/* 右侧新闻 */}
          <div className="information-last-news">
            {/* 车辆信息 */}
            <InformationLastCar />

            {/* 热门推荐 */}
            <InformationRecommend />
          </div>
        </div>
      </div>
    )
  }
}

export default InformationLast
