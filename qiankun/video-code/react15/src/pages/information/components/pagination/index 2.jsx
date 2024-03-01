import React from 'react'
import './index.scss'

class InformationPagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageList: [],
    }
  }

  // 获取当前页码显示
  getPageList(page, limit, total) {
    const last = Math.ceil(total / limit)

    if (last <= 6) {
      return [1,2,3,4,5,6]
    }

    let result = []


    if (page <= 4) {
      result = [1,2,3,4,5]

      if (page === 4) {
        result.push(6)
      }
      result.push(...['...', last])
      return result
    }

    result.push(...[1, '...'])
    if (page > 4 && page < last - 4) {
      for (let i = page - 2; i <= page + 2; i++) {
        result.push(i)
      }
      result.push(...['...', last])
      return result
    }
    if (page >= last - 4){
      for (let i = last - 5; i <= last; i++) {
        result.push(i)
      }
    }
    return result
  }

  setPage (index) {
    this.props.setPage(index)
  }

  goPrevPage() {
    const page = this.props.data.page
    if (page <= 1) {
      return
    }
    this.setPage(page - 1)
  }

  goNextPage() {
    const { page, total, limit } = this.props.data
    if (page >= Math.ceil(total / limit)) {
      return
    }
    this.setPage(page + 1)
  }
  goIndexPage() {
    this.setPage(1)
  }

  goLastPage () {
    const { total, limit } = this.props.data
    this.setPage(Math.ceil(total / limit))
  }

  render() {
    const { privateStyle, data } = this.props
    const { page, limit, total } = data
    const pageList = this.getPageList(page, limit, total)
    return (
      total ? <div className="information-pagination-container" style={privateStyle || {}}>
        <span onClick={ () => this.goIndexPage() }>首页</span>
        <span onClick={ () => this.goPrevPage() }>上一页</span>

        {
          pageList.map(item => {
            return (
              <span
                onClick={ () => this.setPage(item) }
                className={page === item ? 'information-pagination-active information-pagination-page' : 'information-pagination-page'}
              >{ item }</span>
            )
          })
        }

        <span onClick={ () => this.goNextPage() }>下一页</span>
        <span onClick={ () => this.goLastPage() }>尾页</span>
        <div>共{ total / limit }页</div>
      </div> : <div> </div>
    )
  }
}

export default InformationPagination
