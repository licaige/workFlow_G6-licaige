import React from 'react'
import './index.scss'

import grayArrow from '../../../../assets/gray-arrow.png'

// 添加资讯列表
import InformationList from '../../../information/components/list/index.jsx';

class InformationLastRelevant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // const { textareaText } = this.state
    return (
      <div className="last-comments-relevant-container">
        <div className="last-comments-relevant-title">相关资讯</div>
        <InformationList noPagination={true}/>

        {/* 查看更多 */}
        <div className="last-comments-relevant-button">
          <div>
            加载更多
            <img src={grayArrow} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationLastRelevant
