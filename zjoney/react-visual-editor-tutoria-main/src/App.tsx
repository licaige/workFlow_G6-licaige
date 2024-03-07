import './app.scss'
import {useState} from "react";
import {ReactVisualEditor} from "./packages/ReactVisualEditor";
import {visualEditorOption} from "./visual.config";
import './iconfont.css'
import json from './edit-data.json'
import {notification} from "antd";

export default () => {
    console.log(' - ', )
    const [data, setData] = useState(json as any)
    const [formData, setFormData] = useState({
        username: 'admin000',
        maxLevel: 100,
        minLevel: 0,
    })

    const customProps = {
        inputComponent: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e)
            }
        },
        buttonComponent: {
            onClick: () => {
                notification.open({
                    message: '执行提交逻辑，校验表单数据',
                    description: JSON.stringify(formData)
                })
            }
        }
    }

    return (
        <div className="app-home">
            {JSON.stringify(formData)}
            <ReactVisualEditor value={data}
                               onChange={setData}
                               option={visualEditorOption}
                               formData={formData}
                               customProps={customProps}
                               onFormDataChange={setFormData}/>
            {/*<TestStaticCallback/>*/}
        </div>
    )
}