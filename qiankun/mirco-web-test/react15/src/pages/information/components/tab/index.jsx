import React from 'react'
import "./index.scss"

class InformationNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentNav: 0,
      navList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '新闻',
          value: 1
        },
        {
          label: '试驾',
          value: 2
        },
        {
          label: '导购',
          value: 3
        },
        {
          label: '评测',
          value: 4
        },
        {
          label: '用车',
          value: 5
        },
      ]
    }
  }

  getActiveItemClass (index) {
    let itemClass = 'information-nav-item'
    return this.state.currentNav === index ? itemClass + ' information-nav-item-active' : itemClass
  }

  changeActiveItem (index) {
    this.setState({
      currentNav: index
    })
  }

  render() {
    const navList = this.props.navList || this.state.navList
    return (
      <div className="information-nav-container">
        {
          navList.map((item, index) => {

            return (
              <div
                className={this.getActiveItemClass(index)}
                onClick={() => this.changeActiveItem(index)}
              >
                { item.label }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default InformationNav
