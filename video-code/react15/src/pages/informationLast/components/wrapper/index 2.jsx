import React from 'react'
import './index.scss'

import NoPraise from '../../../../assets/no-praise.png'
import HoverPraise from '../../../../assets/hover-praise.png'
import Praised from '../../../../assets/praised.png'
import NoStar from '../../../../assets/no-star.png'
import HoverStar from '../../../../assets/hover-star.png'
import Stared from '../../../../assets/stared.png'

// 评论组件
import InformationLastComments from '../comments/index.jsx';

// 评论列表
import InformationLastCommentsList from '../commentsList/index.jsx';

// 相关资讯
import InformationLastRelevant from '../relevant/index.jsx';

// 评论内容
import InformationOperation from '../operation/index.jsx'

class InformationLastWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '思域还是昂克赛拉？老编辑来作一次“不冲动”的选择',
      praise: false, // 0 未点赞 1 已点赞
      praiseHover: false,
      praiseNumber: 12,
      star: false,  // 0 未收藏 1 已收藏
      starHover: false,
    }
  }

  hoverPraised(type, value) {
    this.setState({
      [type]: value
    })
  }

  praised() {
    this.setState({
      praise: true
    })
  }
  stared() {
    this.setState({
      star: true
    })
  }

  render() {
    const { title, praise, praiseHover, starHover, star, praiseNumber } = this.state
    return (
      <div className="last-article-container">
        <div className="last-article-title">
          { title }
        </div>
        {/* 作者内容 */}
        <div className="last-article-author">
          <span>原创</span>
          <span>谁谁谁</span>
          <span>2010-05-20 00:00:00</span>
        </div>
        {/* 文章内容 */}
        <div>
          { this.props.children }
        </div>

        {/* 点赞内容 */}
        <InformationOperation />

        {/* 评论内容 */}
        <InformationLastComments />

        {/* 评论列表 */}
        <InformationLastCommentsList />

        {/* 相关资讯 */}
        <InformationLastRelevant />
      </div>
    )
  }
}

export default InformationLastWrapper
