import React from 'react'
import './index.scss'
import axios from 'axios'
// 列表元素
import InformationItem from '../item/index.jsx'

// 分页组件
import InformationPagination from '../pagination/index.jsx';

class InformationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      total: 200,
    }
  }

  setPage(page) {
    this.setState({
      page
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/react15/information/list').then(res => {
      const { list, page, limit, total } = res.data
      this.setState({
        list,
        page,
        limit,
        total,
      })
    })
  }

  render() {
    const { noPagination = false } = this.props
    const { list, page, limit, total } = this.state
    return (
      <div className="information-list-container">
        {
          list.map((item, index) => {
            return (
              <InformationItem data={item} setItem={() => this.setItem()}/>
            )
          })
        }

        {/* 分页组件 */}
        {
          noPagination ? <div> </div> : <InformationPagination
            data={{
              page,
              limit,
              total
            }}
            setPage={(page) => this.setPage(page)}
          />
        }
      </div>
    )
  }
}

export default InformationList
