import React from 'react'
import './index.scss'

import NoPraise from '../../../../assets/no-praise.png'
import HoverPraise from '../../../../assets/hover-praise.png'
import Praised from '../../../../assets/praised.png'
import grayArrow from '../../../../assets/gray-arrow.png'
import clickLoad from '../../../../assets/click-load.png'

class InformationLastCommentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg',
          name: '小院里的海棠树',
          content: '非常正确，人家花不到一万就买到了，我们要花好几万元。还是国外便宜啊！也不知道车子有 没有代购的哇[捂脸苦笑]想找个靠谱买车，有没有代购的呀，啥时候放开车辆代购就好了，也 不需要关税的那种，人人买车就像吃饭那样简单，期待着这一天的到来，我期盼着，我期盼着， 期盼着，我觉得不止是我一个人这样想，希望广大网友能赞成我的想法。当然不包括哪些土豪 们，她们买车也是很容易，毕竟我还不能这样做。哎，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来',
          status: 0, // 0 未审核 1 已审核
          time: '2天前',
          praise: false,
          hover: false,
          praiseNumber: 10
        },
        {
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg',
          name: '小院里的海棠树',
          content: '非常正确，人家花不到一万就买到了，我们要花好几万元。还是国外便宜啊！也不知道车子有 没有代购的哇[捂脸苦笑]想找个靠谱买车，有没有代购的呀，啥时候放开车辆代购就好了，也 不需要关税的那种，人人买车就像吃饭那样简单，期待着这一天的到来，我期盼着，我期盼着， 期盼着，我觉得不止是我一个人这样想，希望广大网友能赞成我的想法。当然不包括哪些土豪 们，她们买车也是很容易，毕竟我还不能这样做。哎，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来',
          status: 0, // 0 未审核 1 已审核
          time: '2天前',
          praise: false,
          hover: false,
          praiseNumber: 10
        },
        {
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg',
          name: '小院里的海棠树',
          content: '非常正确，人家花不到一万就买到了，我们要花好几万元。还是国外便宜啊！也不知道车子有 没有代购的哇[捂脸苦笑]想找个靠谱买车，有没有代购的呀，啥时候放开车辆代购就好了，也 不需要关税的那种，人人买车就像吃饭那样简单，期待着这一天的到来，我期盼着，我期盼着， 期盼着，我觉得不止是我一个人这样想，希望广大网友能赞成我的想法。当然不包括哪些土豪 们，她们买车也是很容易，毕竟我还不能这样做。哎，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来',
          status: 0, // 0 未审核 1 已审核
          time: '2天前',
          praise: false,
          hover: false,
          praiseNumber: 10
        },
        {
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg',
          name: '小院里的海棠树',
          content: '非常正确，人家花不到一万就买到了，我们要花好几万元。还是国外便宜啊！也不知道车子有 没有代购的哇[捂脸苦笑]想找个靠谱买车，有没有代购的呀，啥时候放开车辆代购就好了，也 不需要关税的那种，人人买车就像吃饭那样简单，期待着这一天的到来，我期盼着，我期盼着， 期盼着，我觉得不止是我一个人这样想，希望广大网友能赞成我的想法。当然不包括哪些土豪 们，她们买车也是很容易，毕竟我还不能这样做。哎，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来',
          status: 0, // 0 未审核 1 已审核
          time: '2天前',
          praise: false,
          hover: false,
          praiseNumber: 10
        },
        {
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg',
          name: '小院里的海棠树',
          content: '非常正确，人家花不到一万就买到了，我们要花好几万元。还是国外便宜啊！也不知道车子有 没有代购的哇[捂脸苦笑]想找个靠谱买车，有没有代购的呀，啥时候放开车辆代购就好了，也 不需要关税的那种，人人买车就像吃饭那样简单，期待着这一天的到来，我期盼着，我期盼着， 期盼着，我觉得不止是我一个人这样想，希望广大网友能赞成我的想法。当然不包括哪些土豪 们，她们买车也是很容易，毕竟我还不能这样做。哎，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来，希望这一天早一点到来',
          status: 0, // 0 未审核 1 已审核
          time: '2天前',
          praise: false,
          hover: false,
          praiseNumber: 10
        },
      ]
    }
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
