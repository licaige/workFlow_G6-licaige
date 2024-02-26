import React from 'react'
import './index.scss'
import { Link } from 'react-router'

import videoPlayerIcon from '../../../../assets/video-player-icon.png'
import observer from '../../../../assets/observer.png'
import InformationPagination from '../../../information/components/pagination/index.jsx';

class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoList: [
        1,2,3,4,
        1,2,3,4,
        1,2,3,4,
        1,2,3,4,
        1,2,3,4,
      ],
      page: 1,
      limit: 10,
      total: 100,
    }
  }

  setPage (page) {
    this.setState({
      page
    })
  }

  render() {
    const { videoList, page, limit, total } = this.state
    return (
      <div className="video-list-container">

        {
          videoList.map(item => {
            return (
              <Link to='video-last'>
                <div className="video-list-item">
                  <div className="video-list-item-img">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg" alt=""/>
                    <img src={videoPlayerIcon} alt="" className="video-list-item-icon"/>
                  </div>

                  <div className="video-list-item-title">
                    面对最严格的中保妍，雅阁：我们面对最严格的中保妍，雅阁：我们
                  </div>

                  <div className="video-list-item-observer">
                    <img src={observer} alt=""/>
                    <span>4.9w</span>
                    <span>评测</span>
                  </div>
                </div>
              </Link>
            )
          })
        }

        <InformationPagination
          data={{
            page,
            limit,
            total
          }}
          privateStyle={{
            justifyContent: 'center',
            marginTop: '40px',
            marginBottom: '114px',
          }}
          setPage={(page) => this.setPage(page)}
        />
      </div>
    )
  }
}

export default VideoList
