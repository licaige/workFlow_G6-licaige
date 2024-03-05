import React from 'react';
import './index.scss'
import axios from 'axios'
class InformationRecommend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList: [],
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/react15/recommended').then(res => {
      this.setState({
        newsList: res.data
      })
    })
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
