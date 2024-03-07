/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import config from '../../config'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

function Vue3 () {
  const [showLoading, hideLoading] = useState(true)
  const [data, changeData] = useState({from: '来自基座的初始化数据'})

  return (
    <div>
      {
        showLoading && <Spin indicator={antIcon} />
      }
      <micro-app
        name='vue3'
        url={`${config.vue3}micro-app/vue3`}
        data={data}
        onMounted={() => hideLoading(false)}
        onBeforeshow={() => hideLoading(false)}
        baseRoute='/micro-app/demo/vue3'
        // disableScopecss
        // keep-alive
        // inline
        // destroy
        // disableSandbox
        // shadowDOM
      >
      </micro-app>
    </div>
  )
}

export default Vue3
