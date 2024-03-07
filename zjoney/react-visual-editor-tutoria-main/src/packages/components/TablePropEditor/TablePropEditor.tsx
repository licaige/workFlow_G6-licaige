import {Button, Input, Modal, Table, Tag} from "antd";
import {defer} from "../../utils/defer";
import ReactDOM from 'react-dom';
import {useState} from "react";
import deepcopy from "deepcopy";
import {PlusOutlined} from "@ant-design/icons";
import './TablePropEditor.scss'
import {VisualEditorProps} from "../../ReactVisualEditor.props";

const nextKey = (() => {
    let start = Date.now()
    return () => start++
})();

export const TablePropEditor: React.FC<{
    value?: any[],
    config: VisualEditorProps,
    onChange?: (val?: any[]) => void,
}> = (props) => {

    const openEdit = async () => {
        const newData = await TablePropEditService({
            config: props.config,
            data: props.value,
        })
        !!props.onChange && props.onChange(newData)
    }

    return (
        <div className="table-props-editor" {...{onClick: openEdit} as any}>
            {(!props.value || props.value.length === 0) ? (
                <Button>
                    <PlusOutlined/>
                    <span>添加</span>
                </Button>
            ) : (props.value || []).map((opt, index) => (
                <Tag key={index}>
                    {(!props.config.table) ? 'miss showField!' : opt[props.config.table.showKey]}
                </Tag>
            ))}
        </div>
    )
}

interface TablePropEditServiceOption {
    data?: any[],
    config: VisualEditorProps,
    onConfirm?: (val: any[]) => void,
    onCancel?: () => void,
}


interface TablePropEditModalInstance {
    service: (option: TablePropEditServiceOption) => void,
    close: () => void,
}

const TablePropEditModal: React.FC<{
    option: TablePropEditServiceOption,
    onRef?: (ins: TablePropEditModalInstance) => void,
}> = (props) => {

    let [option, setOption] = useState(props.option || {})
    let [showFlag, setShowFlag] = useState(false)
    let [data, setData] = useState([] as any[])

    const methods = {
        service: (option: TablePropEditServiceOption) => {
            setOption(deepcopy(option || {}))
            setData(deepcopy(option.data || []).map(item => ({
                ...item,
                key: item.key || nextKey(),
            })))
            setShowFlag(true)
        },
        close: () => setShowFlag(false),
        reset: () => {
            setData(deepcopy(option.data || []).map(item => ({
                ...item,
                key: item.key || nextKey(),
            })))
        },
        add: () => {
            setData([...data, {
                key: nextKey()
            }])
        },
        delete: (index: number) => {
            data.splice(index, 1)
            setData([...data])
        },
        save: () => {
            !!option.onConfirm && option.onConfirm(data)
            methods.close()
        },
        cancel: () => {
            !!option.onCancel && option.onCancel()
            methods.close()
        },
    }

    !!props.onRef && props.onRef(methods)

    return (
        <Modal visible={showFlag}
               footer={(<>
                   <Button onClick={methods.close}>取消</Button>
                   <Button type="primary" onClick={methods.save}>保存</Button>
               </>)}
               onCancel={methods.close}
               width="800px"
        >
            <div className="table-prop-editor-dialog-buttons">
                <Button onClick={methods.add} type="primary" style={{marginRight: '8px'}}>添加</Button>
                <Button onClick={methods.reset}>重置</Button>
            </div>
            <div className="table-prop-editor-dialog-table">
                <Table dataSource={data}>
                    <Table.Column
                        dataIndex={''}
                        title={"#"}
                        render={(_1, _2, index) => {
                            return index + 1
                        }}/>
                    {(option.config.table!.options || []).map((col, index) => (
                        <Table.Column
                            title={col.label}
                            dataIndex={col.field}
                            key={index}
                            render={(_1, row: any, index) => {
                                return <Input
                                    value={row[col.field]}
                                    onChange={e => {
                                        row = {...row, [col.field]: e.target.value}
                                        data[index] = row
                                        setData([...data])
                                    }}/>
                            }}
                        />
                    ))}
                    <Table.Column
                        title="操作栏"
                        render={(_1, _2, index) => {
                            return <Button onClick={() => {
                                data.splice(index, 1)
                                setData(data)
                            }} type={"text"}>删除</Button>
                        }}
                    />
                </Table>
            </div>
        </Modal>
    )
}

const TablePropEditService = (() => {
    let ins: any;
    return (option: TablePropEditServiceOption) => {
        const dfd = defer<any[]>()
        option.onConfirm = dfd.resolve
        if (!ins) {
            const el = document.createElement('div')
            document.body.appendChild(el)
            ReactDOM.render(<TablePropEditModal option={option} onRef={val => ins = val}/>, el)
        }
        ins.service(option)
        return dfd.promise
    }
})();