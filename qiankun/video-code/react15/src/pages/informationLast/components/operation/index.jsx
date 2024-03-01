import React from 'react'
import './index.scss'

import NoPraise from '../../../../assets/no-praise.png'
import HoverPraise from '../../../../assets/hover-praise.png'
import Praised from '../../../../assets/praised.png'
import NoStar from '../../../../assets/no-star.png'
import HoverStar from '../../../../assets/hover-star.png'
import Stared from '../../../../assets/stared.png'

class InformationOperation extends React.Component {
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
      <div className="last-article-operation">
        <div
          onMouseEnter={() => this.hoverPraised('praiseHover', true)}
          onMouseLeave={() => this.hoverPraised('praiseHover', false)}
          onClick={() => this.praised() }
          className={praise ? 'last-article-praised' : praiseHover ? 'last-article-praise-hover' : ''}
        >
          <img src={
            praise ? Praised : praiseHover ? HoverPraise : NoPraise
          } alt=""/>
          赞{praiseNumber}
        </div>
        <div
          onMouseEnter={() => this.hoverPraised('starHover', true)}
          onMouseLeave={() => this.hoverPraised('starHover', false)}
          onClick={() => this.stared() }
          className={star ? 'last-article-stared' : starHover ? 'last-article-star-hover' : ''}
        >
          <img src={
            star ? Stared : starHover ? HoverStar : NoStar
          } alt=""/>
          { star ? '已' : '' }收藏
        </div>
      </div>
    )
  }
}

export default InformationOperation
