import React from 'react'
import './index.scss'

// 布局相关组件
import InformationLastWrapper from '../wrapper/index.jsx';

class InformationLastArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '<p>谈起最能激发“肾上腺素”的十万级紧凑型轿车，就绝对绕不开思域与昂克赛拉——优雅运动的线条总能与年轻人意气相投。 </p><p>所谓“颜值即正义”，两款车的粉丝们都对各自“爱豆”的形象充满了信心。这绝非孤芳自赏——自换代以来，两款车的设计都攀上了新高度，同时更为后续改款奠定了有利基础。2019年车型更新后——思域中期改款、昂克赛拉换代，它们在细节、质感、配置上更是锦上添花，从众多竞品中脱颖而出，成功卫冕了该级的“颜值担当”称号。 说明：本次对比，两款车皆选取最高动力版本，且价格锁定在14万元内，以平衡产品体验与购置成本。现场实拍车辆非本次选取的配置，但外形、内饰、空间无明显差别。</p><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1695163309,2577846378&fm=26&gp=0.jpg" style="margin: 30px 0"><p>谈起最能激发“肾上腺素”的十万级紧凑型轿车，就绝对绕不开思域与昂克赛拉——优雅运动的线条总能与年轻人意气相投。 </p><p>所谓“颜值即正义”，两款车的粉丝们都对各自“爱豆”的形象充满了信心。这绝非孤芳自赏——自换代以来，两款车的设计都攀上了新高度，同时更为后续改款奠定了有利基础。2019年车型更新后——思域中期改款、昂克赛拉换代，它们在细节、质感、配置上更是锦上添花，从众多竞品中脱颖而出，成功卫冕了该级的“颜值担当”称号。 说明：本次对比，两款车皆选取最高动力版本，且价格锁定在14万元内，以平衡产品体验与购置成本。现场实拍车辆非本次选取的配置，但外形、内饰、空间无明显差别。</p>',
    }
  }

  componentDidMount() {
    const { content } = this.state
    this.refs.content.innerHTML = content
  }

  render() {
    return (
      <InformationLastWrapper>
        {/* 文章内容 */}
        <div className="last-article-detail" ref='content'> </div>
      </InformationLastWrapper>
    )
  }
}

export default InformationLastArticle
