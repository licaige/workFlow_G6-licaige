export default function Page1(){
    return <div>
        React项目
        {/* 这个标签是通过webComponents 来实现的 */}
        <micro-app name='app1' 
        url='http://localhost:10001/' 
        baseroute='/react'
        
        ></micro-app>
    </div>
}