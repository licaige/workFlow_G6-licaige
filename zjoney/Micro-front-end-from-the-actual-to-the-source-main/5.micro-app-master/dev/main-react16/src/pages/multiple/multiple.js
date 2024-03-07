/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import config from '../../config'
import './multiple.less'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

function Vue3 () {
  const [data, changeData] = useState({from: '来自基座的初始化数据'})
  const [reactname, changename] = useState('react162')
  const [showLoading, hideLoading] = useState(true)

  useEffect(() => {
    console.time('react16')
  }, [])
  return (
    <div>
      <div className='multiple-btn-con'>
        <Button
          type='primary'
          onClick={() => changeData({from: '来自基座的数据' + (+new Date())})}
          style={{width: '120px'}}
        >
          发送数据
        </Button>
        <Button
          onClick={() => changename('react163')}
        >
          改变react16的name
        </Button>
      </div>
      {
        showLoading && <Spin indicator={antIcon} />
      }
      <div className='multiple-con'>
        <micro-app
          class='multiple-micro-app'
          name={reactname}
          url={`${config.react16}micro-app/react16`}
          data={data}
          baseRoute='/micro-app/demo/multiple'
          onMounted={() => hideLoading(false)}
          // destroy
          // inline
          // scopecss='false'
        ></micro-app>
        <micro-app
          class='multiple-micro-app'
          name='vue22'
          url={`${config.vue2}micro-app/vue2`}
          data={data}
          // destroy
          // inline
          // scopecss='false'
        >
        </micro-app>
      </div>
    </div>
  )
}

export default Vue3
