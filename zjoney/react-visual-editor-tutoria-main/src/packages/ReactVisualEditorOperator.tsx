import {VisualEditorBlock, VisualEditorOption, VisualEditorValue} from "./ReactVisualEditor.utils";
import {useEffect, useState} from "react";
import {Alert, Button, Form, Input, InputNumber, Select} from "antd";
import {VisualEditorProps, VisualEditorPropsType} from "./ReactVisualEditor.props";
import {SketchPicker} from "react-color";
import deepcopy from "deepcopy";
import {TablePropEditor} from "./components/TablePropEditor/TablePropEditor";

export const ReactVisualEditorOperator: React.FC<{
    selectBlock?: VisualEditorBlock,
    option: VisualEditorOption,
    value: VisualEditorValue,
    updateBlock: (newBlock: VisualEditorBlock, oldBlock: VisualEditorBlock) => void,
    updateValue: (val: VisualEditorValue) => void,
}> = (props) => {

    const [editData, setEditData] = useState({} as any)
    const [form] = Form.useForm()

    const methods = {
        apply: () => {
            if (!props.selectBlock) {
                /*当前编辑容器属性*/
                props.updateValue({
                    ...props.value,
                    container: editData,
                })
            } else {
                /*当前编辑block数据的属性*/
                props.updateBlock(editData, props.selectBlock)
            }
        },
        reset: () => {
            let data: any
            if (!props.selectBlock) {
                data = deepcopy(props.value.container)
            } else {
                data = deepcopy(props.selectBlock)
            }
            setEditData(data)
            form.resetFields()
            form.setFieldsValue(data)
        },
        onFormValuesChange: (changeValues: any, values: any) => {
            setEditData({
                ...editData,
                ...values,
            })
        },
    }

    useEffect(() => {
        methods.reset()
    }, [props.selectBlock])


    const render = (() => {
        let content: JSX.Element[] = []
        if (!props.selectBlock) {
            content.push(
                <Form.Item label="容器宽度" name="width" key="width">
                    <InputNumber step={100} min={0} precision={0}/>
                </Form.Item>
            )
            content.push(
                <Form.Item label="容器高度" name="height" key="height">
                    <InputNumber step={100} precision={0}/>
                </Form.Item>
            )
        } else {
            const {componentKey} = props.selectBlock
            const component = props.option.componentMap[componentKey]
            content.push(
                <Form.Item label="组件标识" name="slotName" key="slotName">
                    <Input/>
                </Form.Item>
            )
            if (!!component) {
                if (!!component.model) {
                    content.push(...Object.entries(component.model)
                        .map(([modifier, label]) => (
                            <Form.Item label={label} name={['model', modifier]} key={`model_${modifier}`}>
                                <Input/>
                            </Form.Item>
                        )))
                }
                if (!!component.props) {
                    content.push(...Object.entries(component.props || {})
                        .map(([propName, propConfig], index) => renderEditor({
                            propName,
                            config: propConfig,
                            key: `props_${index}`,
                            editData: editData,
                            apply: methods.apply,
                        })))
                }
            }
        }
        return content
    })();

    return (
        <div className="react-visual-editor-operator">
            <div>
                {!!props.selectBlock ? '组件设置' : '容器设置'}
            </div>
            <Form layout="vertical" form={form} onValuesChange={methods.onFormValuesChange}>
                {render}
                <Form.Item key="operator">
                    <Button type="primary" onClick={methods.apply} style={{marginRight: '8px'}}>应用</Button>
                    <Button onClick={methods.reset}>重置</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

function renderEditor({editData, key, config, propName, apply}: {
    editData: any,
    key: string,
    config: VisualEditorProps,
    propName: string,
    apply: () => void,
}) {
    switch (config.type) {
        case VisualEditorPropsType.input:
            return (
                <Form.Item label={config.label} name={['props', propName]} key={key}>
                    <Input/>
                </Form.Item>
            )
        case VisualEditorPropsType.color:
            return (
                <Form.Item label={config.label} key={key} name={['props', propName]} valuePropName="color">
                    <SketchPicker/>
                </Form.Item>
            )
        case VisualEditorPropsType.select:
            return (
                <Form.Item label={config.label} name={['props', propName]} key={key}>
                    <Select>
                        {config.options!.map((opt, index) => (
                            <Select.Option value={opt.val} key={index}>
                                {opt.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )
        case VisualEditorPropsType.table:
            return (
                <Form.Item label={config.label} key={key} name={['props', propName]}>
                    <TablePropEditor config={config}/>
                </Form.Item>
            )
        default:
            return <Alert message={`${config.type} is not exist!`} type="error" showIcon/>
    }
}