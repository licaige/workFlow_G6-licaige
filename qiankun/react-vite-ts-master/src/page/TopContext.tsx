import React, { useState, useCallback, useRef } from 'react'
import { ThemeContext } from '../utils/context'
import MiddleContext from './MiddleContext'

import TestUseCallback from './TestUseCallback'
//1、context方式实现多个多级组件之间传递共享数据。从实现原理上看，可以用全局共享对象实现相同的逻辑。
//2、ref转发获取组件内部的DOM元素。被转发的组件要用forwardRef方法包装，它可以在回调函数中接收props和ref。
//3、另外，对于class组件添加ref获取的是组件实例。对函数组件添加ref获取不到实例。
//4、转发ref还可以通过添加ref属性为回调函数的形式获取子组件的DOM。

function TopContext() {
  const [themeClor, setThemeClor] = useState<any>('blue')
  const [testArray, setTestArray] = useState<any>([])
  const middleRef1 = React.createRef() //等价于下方的写法
  const middleRef = useRef()
  const changeTheme: () => void = () => {
    if(themeClor == 'blue'){
      setThemeClor('red')
    }else{
      setThemeClor('blue')
    }
    console.log(middleRef.current,middleRef1)
  }
  const contextValue = {
    theme: themeClor,
    toggleTheme: changeTheme
  }
  const handleChangeArray = () => {
    // testArray.push('aaa')
    // setTestArray(testArray)
    setTestArray([...testArray,'aaa'])
  }

  const testUseCallback =  useCallback(()=>{console.log('useCallback性能优化')},[testArray])
  
  return (
    <>
      <ThemeContext.Provider value={contextValue}>
        <MiddleContext commonParams={12} ref={middleRef}/>
      </ThemeContext.Provider>
      <button onClick={handleChangeArray}>改变数组</button>
      <TestUseCallback color={themeClor} cb={testUseCallback}/>
    </>
  )
}
export default TopContext