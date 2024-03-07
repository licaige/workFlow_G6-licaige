import {createVisualEditorOption} from "./packages/ReactVisualEditor.utils";
import {Button, Input, Select} from 'antd'
import {createEditorColorProp, createEditorInputProp, createEditorSelectProp, createEditorTableProp} from "./packages/ReactVisualEditor.props";
import {NumberRange} from "./packages/components/NumberRange/NumberRange";
import {PictureOutlined} from "@ant-design/icons";

export const visualEditorOption = createVisualEditorOption()

visualEditorOption.registryComponent('text', {
    name: '文本',
    preview: () => (<span>预览文本</span>),
    render: ({props}) =>
        <span style={{
            color: !props.color ? '' : props.color.hex,
            fontSize: props.size,
        }}>
            {props.text || '默认文本'}
        </span>,
    props: {
        text: createEditorInputProp('显示文本'),
        color: createEditorColorProp('字体颜色'),
        size: createEditorSelectProp('字体大小', [
            {label: '14px', val: '14px'},
            {label: '18px', val: '18px'},
            {label: '24px', val: '24px'},
        ])
    },
})
visualEditorOption.registryComponent('button', {
    name: '按钮',
    preview: () => (<Button type={"primary"}>预览按钮</Button>),
    render: ({props, size, custom}) =>
        <Button type={props.type || 'primary'}
                size={props.size}
                style={size}
                {...custom}>
            {props.label || '按钮'}
        </Button>,
    props: {
        label: createEditorInputProp('按钮文本'),
        type: createEditorSelectProp('按钮类型', [
            {label: '默认', val: 'default'},
            {label: '基础', val: 'primary'},
            {label: '线框', val: 'ghost'},
            {label: '虚线', val: 'dashed'},
            {label: '链接', val: 'link'},
            {label: '文本', val: 'text'},
        ]),
        size: createEditorSelectProp('大小尺寸', [
            {label: '大', val: 'large'},
            {label: '中', val: 'middle'},
            {label: '小', val: 'small'},
        ]),
    },
    resize: {
        height: true,
        width: true,
    },
})

visualEditorOption.registryComponent('input', {
    name: '输入框',
    preview: () => (<Input/>),
    render: ({model, size, custom}) =>
        (<Input value={model.default.value} onChange={model.default.onChange} style={size} {...custom}/>)
    ,
    model: {
        default: '绑定字段',
    },
    resize: {
        width: true,
    },
})
visualEditorOption.registryComponent('select', {
    name: '下拉选择',
    render: ({props, model, custom}) => {
        return (
            <Select key={!props.options ? '0' : props.options.length}
                    style={{width: `${225}px`}}
                    value={model.default.value}
                    onChange={model.default.onChange}
                    {...custom}>
                {(props.options || []).map((opt: any, i: number) =>
                    <Select.Option value={opt.value} key={i}>{opt.label}</Select.Option>
                )}
            </Select>
        )
    },
    preview: () => (
        <Select placeholder="请选择" value={"dangao"} style={{width: '100%'}}>
            <Select.Option value={"dangao"}>蛋糕</Select.Option>
            <Select.Option value={"生煎"}>shengjian</Select.Option>
        </Select>
    ),
    props: {
        options: createEditorTableProp('下拉选项', {
            showKey: 'label',
            options: [
                {label: '显示值', field: 'label'},
                {label: '绑定值', field: 'value'},
            ],
        })
    },
    model: {
        default: '绑定字段',
    },
})

visualEditorOption.registryComponent('number-range', {
    name: '绑定多个字段',
    resize: {
        width: true,
    },
    render: ({model, size, custom, block}) => {
        return (
            <NumberRange
                key={(() => {
                    const model = block.model || {}
                    return (model.start || '@@start') + (model.end || '@@end')
                })()}
                width={size.width}
                {...{
                    ...custom,
                    start: model.start.value,
                    onStartChange: model.start.onChange,
                    end: model.end.value,
                    onEndChange: model.end.onChange,
                }}/>
        )
    },
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <NumberRange width={'100%'}/>
        </div>
    ),
    model: {
        start: '起始输入框绑定字段',
        end: '结尾输入框绑定字段',
    },
})

visualEditorOption.registryComponent('image', {
    name: '图片',
    resize: {
        width: true,
        height: true,
    },
    render: ({props, size}) => {
        return (
            <div style={{height: size.height || '100px', width: size.width || '100px'}}
                 className="visual-block-image">
                <img src={props.url || 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} style={{
                    objectFit: 'fill',
                    display: 'block',
                    height: '100%',
                    width: '100%'
                }}/>
            </div>
        )
    },
    preview: () => (
        <div
            style={{
                fontSize: '20px',
                backgroundColor: '#f2f2f2',
                color: '#ccc',
                display: 'inline-flex',
                width: '100px',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <PictureOutlined/>
        </div>
    ),
    props: {
        url: createEditorInputProp('地址')
    },
})