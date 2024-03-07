import {useRef,useEffect} from 'react'
import {startApp,destroyApp} from 'wujie'

export default function WujieReact(props){
    const myRef = useRef(null);
    let destroy = null;
    const startAppFunc = async()=>{
        destroy = await startApp({
            ...props,
            el:myRef.current
        })
    }
    useEffect(()=>{
        startAppFunc();
        return () =>{
            if(destroy){
                destroyApp(destroy)
            }
        }
    })
    const {width,height} = props
    return <div style={{width,height}} ref={myRef}></div>
}