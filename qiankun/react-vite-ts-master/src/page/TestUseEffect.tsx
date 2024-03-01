import React, { useState, useCallback, useEffect } from 'react'

function TestUseEffect() {

  const [count, setCount] = useState(0)
  //tips: useEffect excute after react render
  useEffect(()=>{
    console.log('useEffect excute when react component render')
    console.log('this is like componentDidUpdate')
  })
  useEffect(()=>{
    console.log('useEffect excute once time when react component mounted')
    console.log('this is like componentDidMount')
  },[])
  const handleChangeArray = () => {
    let countC = count;
    setCount(++countC)
  }
  return (
    <>
      <button onClick={handleChangeArray}>TestUseEffect</button>
    </>
  )
}
export default TestUseEffect