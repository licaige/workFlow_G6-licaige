import React from 'react'
import './index.scss'
import { Link } from 'react-router'

import grayArrow from '../../../../assets/gray-arrow.png'

// 热门推荐
import InformationRecommend from '../recommended/index.jsx';

class InformationNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  setItem() {

  }

  render() {
    return (
      <div className="information-news-container">
        {/*快速找车*/}
        <div>
          <div className="information-news-title">快速找车</div>

          <div className="information-news-wrapper">
            <div className="information-news-select">
              请选择品牌
              <img src={grayArrow} alt=""/>
            </div>
            <div className="information-news-select">
              请选择车系
              <img src={grayArrow} alt=""/>
            </div>
          </div>
          <Link to='/information-last'>
            <div className="information-news-button">
              查底价
            </div>
          </Link>
        </div>
        {/*热门推荐*/}
        <InformationRecommend />

        {/* 广告位 */}
        <div className="information-news-detail">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg" alt=""/>
        </div>
      </div>
    )
  }
}

export default InformationNews
