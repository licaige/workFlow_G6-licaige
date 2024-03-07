import React,{ useEffect, useState }  from 'react'

// 自定义钩子函数
function useToolsModule() {
    const [toolsModule, setToolsModule] = useState();
    useEffect(() => {
        // 导入，异步promise返回
        System.import("@study/tools").then(setToolsModule);
    }, []);
    return toolsModule;
}

function about() {
    var back = ''
    const toolsModule = useToolsModule();
    if(toolsModule){
        back = toolsModule.happyStar('React')
    }
    return (
        <div>
            <h2>快乐星球就是学微前端---{back}</h2>
        </div>
    )
}

export default about
