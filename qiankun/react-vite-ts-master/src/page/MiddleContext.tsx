import React, { useState, useCallback, useRef } from 'react'
import BottomContext from './BottomContext'

function MiddleContext() {

  //useState放在这里会报错，Cannot read properties of null (reading 'useState')
  //const [themeClor, setThemeClor] = useState<any>('blue')
  
  return React.forwardRef((props:any, ref:any) => {
    const middleRef1 = React.createRef();
    console.log('React.forwardRef', props)
    return  <div>
              <button ref={ref}>React.forwardRef</button>
              <BottomContext/>
            </div>
            
  });
  //return <div><BottomContext/></div>
}
//这里执行一次的原因:React.forwardRef是一个高阶函数，生成React元素时要执行两次。
export default MiddleContext()