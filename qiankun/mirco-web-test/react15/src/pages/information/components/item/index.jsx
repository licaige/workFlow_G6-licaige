import React from 'react'
import './index.scss'

import observerIcon from '../../../../assets/observer.png'

class InformationItem extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    const { data } = this.props
    return (
      <div className="information-item-container">
        <div className='information-item-left'>
          <img src={data.img} alt=""/>
        </div>

        {/* 右侧标题区域 */}
        <div>
          <div
            className={data.status ? 'information-item-title information-item-title-active' : 'information-item-title'}
          >
            { data.title }
          </div>
          <div className="information-item-observer">
            <span className='information-item-icon'>
              <img src={observerIcon} alt=""/>
              { data.number }
            </span>
            <span>
              { data.type }
            </span>
          </div>
        </div>

      </div>
    )
  }
}

export default InformationItem
