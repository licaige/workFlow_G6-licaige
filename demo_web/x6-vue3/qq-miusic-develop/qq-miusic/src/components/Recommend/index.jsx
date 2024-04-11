import React from 'react';
import './index.css'
import {connect} from 'react-redux'
import {recommend} from '../../store/recommend.redux'
import { Carousel, WingBlank } from 'antd-mobile';
@connect(
  (state)=>({
    radioList:state.recommend.radioList,
    slider:state.recommend.slider
  }),{
    recommend
  }
)
class Recommend extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
  }
  componentDidMount(){
    this.props.recommend();
  }
  render(){
    return (
      <div className="recommend">
      <div className="banner">
      <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.props.slider.map((val, index) => (
            <a
              key={val.index}
              // href="http://www.alipay.com"
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                
              }}
              href='http://www.baidu.com'>
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
      </div>
      <div className="station">
        <h2 className="sta_title">电台</h2>
        <ul>
          {this.props.radioList.map(val=>(
            <a href="/#/songList/26">
            <li>
              <div>
                <img src={val.picUrl} alt=''/>
                <span className="iconfont icon-bofang"></span>
              </div>
              <h2 className="station_name">{val.title}</h2>
            </li>
            </a>
          ))}
        </ul>
      </div>
      <div className="foot">
        <p className="foot_computer">
          <a href="https://y.qq.com/?ADTAG=myqq&amp;nomobile=1#type=index">查看电脑版网页</a>
        </p>
        <p className="foot_logo">
          <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=""/>
        </p>
        <div className="copyright">
          <p>Copyright © 1998 -  Tencent. All Rights Reserved.</p>
          <p>联系电话：0755-86013388 QQ群：55209235</p>
        </div>
      </div>
    </div>
    )
  }
}
export default Recommend;