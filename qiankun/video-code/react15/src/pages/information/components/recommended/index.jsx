import React from 'react';
import './index.scss'

class InformationRecommend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList: [
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
        {
          text: '比亚迪新车“汉”上市预订考虑不周，预订者利益受者利益受者利益受',
          status: false
        },
      ],
    }
  }
  render() {
    const { newsList } = this.state
    return (
      <div className="information-recommend-container">
        <div className="information-recommend-title">热门推荐</div>
        <div className="information-recommend-list">
          {
            newsList.map(item => {
              return (
                <div>
                  { item.text }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default InformationRecommend
