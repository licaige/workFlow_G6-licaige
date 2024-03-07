/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import 'zone.js'
import { useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import config from '../../config'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

function Angular11 () {
  const [showLoading, hideLoading] = useState(true)
  const [data, changeData] = useState({frotm: '来自基座的初始化数据'})

  return (
    <div>
      {
        showLoading && <Spin indicator={antIcon} />
      }
      <micro-app
        name='angular11'
        url={`${config.angular11}micro-app/angular11`}
        data={data}
        onMounted={() => hideLoading(false)}
        baseRoute='/micro-app/demo/angular11'
        // destroy
        // inline
        // disableScopecss
      >
      </micro-app>
    </div>
  )
}

export default Angular11
