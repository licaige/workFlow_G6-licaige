
import { useState, useCallback, useRef } from 'react'

function Welcome(props:any,other:any) {
  return (
    <>
    <p>此处可以渲染两种类型的HTML:一种是原生html，另一种是react元素，通过React.createElement函数生成</p>
    {props.children}
    </>
  )
}

export default Welcome
