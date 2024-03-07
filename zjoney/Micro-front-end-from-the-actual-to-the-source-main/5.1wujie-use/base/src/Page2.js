import WujieReact from "./components/wujie-react.js"

export default function Page2(){
    return <WujieReact 
    name='VueApp' 
    url="http://localhost:8080"
    width="100%"
    height="100%"
    sync={true}
></WujieReact>
}
