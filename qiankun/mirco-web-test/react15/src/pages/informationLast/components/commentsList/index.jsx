import React from 'react'
import './index.scss'
import axios from 'axios'
import NoPraise from '../../../../assets/no-praise.png'
import HoverPraise from '../../../../assets/hover-praise.png'
import Praised from '../../../../assets/praised.png'
import grayArrow from '../../../../assets/gray-arrow.png'
import clickLoad from '../../../../assets/click-load.png'

class InformationLastCommentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    axios.post('http://localhost:3000/react15/comments/list').then(res => {
      this.setState({
        list: res.data
      })
    })
  }

  changeItemStatus (index, type) {
    const list = this.state.list
    list[index].hover = type
    this.setState({
      list,
    })
  }

  praiseItem (index) {
    const list = this.state.list

    list[index].praise = true
    list[index].praiseNumber = list[index].praiseNumber + 1
    this.setState({
      list,
    })
  }

  render() {
    const { list } = this.state
    return (
      <div className="last-comments-list-container">
        <div className="last-comments-list-title">相关评论</div>

        <div className="last-comments-list-wrapper">
          {
            list.map((item, index) => {
              return(
                <div className="last-comments-list-item">
                  <div className="last-comments-list-img">
                    <img src={item.img} alt=""/>
                  </div>
                  <div className="last-comments-list-detail">
                    <div className="last-comments-list-item-title">
                      { item.name }
                    </div>

                    <div className="last-comments-list-item-content">
                      { item.content }
                    </div>

                    {
                      item.status ?
                        <div className="last-comments-list-item-audit">
                          感谢您的评论，内容在审核通过后露出。
                        </div> :
                        <div className="last-comments-list-item-time">
                          <div>{ item.time }</div>
                          <div>
                            <span
                              onMouseEnter={() => this.changeItemStatus(index, true) }
                              onMouseLeave={() => this.changeItemStatus(index, false) }
                              onClick={() => this.praiseItem(index) }
                              className={item.praise ? 'last-comments-list-item-active' : ''}
                            >
                              <img src={ item.praise ? Praised : item.hover ? HoverPraise : NoPraise } alt=""/>
                              { item.praiseNumber }
                            </span>
                            <span>
                              回复
                              <img src={grayArrow} alt=""/>
                            </span>
                          </div>
                        </div>
                    }
                  </div>
                </div>
              )
            })
          }
          {/* 加载更多 */}
          <div className="last-comments-list-load">
            <img src={clickLoad} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationLastCommentsList
