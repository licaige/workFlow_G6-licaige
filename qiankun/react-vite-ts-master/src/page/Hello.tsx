import { useState, useCallback, useRef } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

class Params {
  readonly _a:string;
  
  constructor(name:string){
    this._a = name
  }
  static fun(){
    console.log('99999')
  }

}

function Hello() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const param = useRef(0)
  console.log(count,count2)
  const a =  useCallback(()=>{
    param.current = param.current++
    setCount2(count2+1)
  },[])
  const changeState = (a:any) => {

    setCount(count+1);
    console.log(`e`,a);
  }

  Params.fun()

  return (
    <>
      {/* <div style={{width:'100px',height:'100px',background:'red',padding:'10px',border:'1px solid red'}}>你最棒</div> */}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={a}>
          count is {param.current}
        </button>
        <button onClick={changeState}>
          change
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Hello
