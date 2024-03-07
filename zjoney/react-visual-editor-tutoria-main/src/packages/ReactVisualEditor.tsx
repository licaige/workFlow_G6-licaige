import {createNewBlock, VisualEditorBlock, VisualEditorComponent, VisualEditorMarkLines, VisualEditorOption, VisualEditorValue} from "./ReactVisualEditor.utils";
import './ReactVisualEditor.scss'
import {useMemo, useRef, useState} from "react";
import {ReactVisualEditorBlock} from "./ReactVisualEditorBlock";
import {useCallbackRef} from "./hooks/useCallbackRef";
import {useVisualCommander} from "./ReactVisualEditor.commander";
import {Tooltip, notification} from 'antd'
import {createEvent} from "./plugins/event";
import {$$dialog} from "./utils/dialog-service";
import {$$dropdown, DropdownOption} from "./utils/dropdown-service";
import classNames from "classnames";
import {ReactVisualEditorOperator} from "./ReactVisualEditorOperator";
import {BlockResizeDirection, ReactVisualBlockResize} from "./components/BlockResize/BlockResize";

export const ReactVisualEditor: React.FC<{
    value: VisualEditorValue,
    onChange: (val: VisualEditorValue) => void,
    formData?: any,
    onFormDataChange?: (val?: any) => void,
    option: VisualEditorOption,
    customProps?: Record<string, any>,
}> = (props) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const [preview, setPreview] = useState(false)
    const [editing, setEditing] = useState(false)

    const [selectIndex, setSelectIndex] = useState(-1)
    const [dragstart] = useState(() => createEvent())
    const [dragend] = useState(() => createEvent())

    const focusData = useMemo(() => {
        let focus: VisualEditorBlock[] = []
        let unFocus: VisualEditorBlock[] = []
        props.value.blocks.forEach((block) => (block.focus ? focus : unFocus).push(block))
        return {
            focus,
            unFocus,
        }
    }, [props.value.blocks])

    const classes = useMemo(() => classNames([
        'react-visual-editor',
        {
            'react-visual-editor-preview': preview,
        }
    ]), [preview])

    const selectBlock = useMemo(() => props.value.blocks[selectIndex] as VisualEditorBlock | undefined, [props.value.blocks, selectIndex])

    const menuDraggier = (() => {
        const dragData = useRef({dragComponent: null as null | VisualEditorComponent,})
        const container = {
            dragenter: useCallbackRef((e: DragEvent) => e.dataTransfer!.dropEffect = 'move'),
            dragover: useCallbackRef((e: DragEvent) => e.preventDefault()),
            dragleave: useCallbackRef((e: DragEvent) => e.dataTransfer!.dropEffect = 'none'),
            drop: useCallbackRef((e: DragEvent) => {
                const {offsetX, offsetY} = e
                const blocks = [...props.value.blocks]
                blocks.push(createNewBlock({
                    component: dragData.current.dragComponent!,
                    top: offsetY,
                    left: offsetX,
                }))
                props.onChange({
                    ...props.value,
                    blocks,
                })
                setTimeout(() => dragend.emit())
            })
        }
        const component = {
            dragstart: useCallbackRef((current: VisualEditorComponent) => {
                dragData.current.dragComponent = current
                containerRef.current!.addEventListener('dragenter', container.dragenter)
                containerRef.current!.addEventListener('dragover', container.dragover)
                containerRef.current!.addEventListener('dragleave', container.dragleave)
                containerRef.current!.addEventListener('drop', container.drop)
                dragstart.emit()
            }),
            dragend: useCallbackRef(() => {
                dragData.current.dragComponent = null
                containerRef.current!.removeEventListener('dragenter', container.dragenter)
                containerRef.current!.removeEventListener('dragover', container.dragover)
                containerRef.current!.removeEventListener('dragleave', container.dragleave)
                containerRef.current!.removeEventListener('drop', container.drop)
            })
        }
        return component
    })();

    const focusHandler = (() => {
        const container = {
            mousedown: (e: React.MouseEvent<HTMLDivElement>) => {
                if (preview) return;
                e.preventDefault()
                if (e.currentTarget !== e.target) {
                    return
                }
                if (!e.shiftKey) {
                    /*点击空白处，清空所有选中的block*/
                    methods.clearFocus()
                    setSelectIndex(-1)
                }
            }
        }
        const block = {
            mousedown: (e: React.MouseEvent<HTMLDivElement>, block: VisualEditorBlock, index: number) => {
                if (preview) return;
                if (e.shiftKey) {
                    /*如果摁住了shift键，如果此时没有选中的block，就选中这个block，否则令这个block的选中状态去翻*/
                    if (focusData.focus.length <= 1) {
                        block.focus = true
                    } else {
                        block.focus = !block.focus
                    }
                    methods.updateBlocks(props.value.blocks)
                } else {
                    /*如果点击的这个block没有被选中，才清空这个其他选中的block，否则不做任何事情。放置拖拽多个block，取消其他block的选中状态*/
                    if (!block.focus) {
                        block.focus = true
                        methods.clearFocus(block)
                    }
                }
                setSelectIndex(index)
                // blockDraggier.mousedown(e.nativeEvent, block)
                // 等待 focusData 重新计算之后再出发拖拽移动
                setTimeout(() => blockDraggier.mousedown(e.nativeEvent, block))
            }
        }
        return {
            container,
            block,
        }
    })();

    const blockDraggier = (() => {
        const dragData = useRef({
            startX: 0,
            startY: 0,
            startLeft: 0,
            startTop: 0,
            startPos: [] as { top: number, left: number }[],
            dragging: false,
            markLines: {} as VisualEditorMarkLines,
        })
        const mousedown = useCallbackRef((e: MouseEvent, block: VisualEditorBlock) => {
            dragData.current = {
                startX: e.clientX,
                startY: e.clientY,
                startLeft: block.left,
                startTop: block.top,
                startPos: (() => focusData.focus.map(({top, left}) => ({top, left})))(),
                dragging: false,
                markLines: (() => {
                    const {unFocus} = focusData
                    const {width, height} = selectBlock!
                    let lines: VisualEditorMarkLines = {x: [], y: []};
                    [...unFocus, {
                        top: 0,
                        left: 0,
                        width: props.value.container.width,
                        height: props.value.container.height,
                    }].forEach(block => {
                        const {top: t, left: l, width: w, height: h} = block
                        lines.y.push({top: t, showTop: t})                              // 顶部对其顶部
                        lines.y.push({top: t + h, showTop: t + h})                      // 顶部对其底部
                        lines.y.push({top: t + h / 2 - height / 2, showTop: t + h / 2}) // 中间对其中间（垂直）
                        lines.y.push({top: t - height, showTop: t})                     // 底部对其顶部
                        lines.y.push({top: t + h - height, showTop: t + h})             // 底部对其底部

                        lines.x.push({left: l, showLeft: l})                              // 顶部对其顶部
                        lines.x.push({left: l + w, showLeft: l + w})                      // 顶部对其底部
                        lines.x.push({left: l + w / 2 - width / 2, showLeft: l + w / 2}) // 中间对其中间（垂直）
                        lines.x.push({left: l - width, showLeft: l})                     // 底部对其顶部
                        lines.x.push({left: l + w - width, showLeft: l + w})             // 底部对其底部
                    })
                    return lines
                })(),
            }
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
        })

        const [mark, setMark] = useState({
            x: null as null | number,
            y: null as null | number,
        })

        const mousemove = useCallbackRef((e: MouseEvent) => {
            if (!dragData.current.dragging) {
                dragData.current.dragging = true
                dragstart.emit()
            }
            let {clientX: moveX, clientY: moveY} = e
            let {startX, startY} = dragData.current

            if (e.shiftKey) {
                if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
                    moveY = startY
                } else {
                    moveX = startX
                }
            }

            const currentLeft = dragData.current.startLeft + moveX - startX
            const currentTop = dragData.current.startTop + moveY - startY
            const currentMark = {
                x: null as null | number,
                y: null as null | number
            }
            for (let i = 0; i < dragData.current.markLines.y.length; i++) {
                const {top, showTop} = dragData.current.markLines.y[i];
                if (Math.abs(top - currentTop) < 5) {
                    moveY = top + startY - dragData.current.startTop
                    currentMark.y = showTop
                    break
                }
            }
            for (let i = 0; i < dragData.current.markLines.x.length; i++) {
                const {left, showLeft} = dragData.current.markLines.x[i];
                if (Math.abs(left - currentLeft) < 5) {
                    moveX = left + startX - dragData.current.startLeft
                    currentMark.x = showLeft
                    break
                }
            }

            const durX = moveX - startX
            const durY = moveY - startY
            focusData.focus.forEach((block, index) => {
                block.top = dragData.current.startPos[index].top + durY
                block.left = dragData.current.startPos[index].left + durX
            })
            methods.updateBlocks(props.value.blocks)
            setMark({
                x: currentMark.x,
                y: currentMark.y,
            })
        })
        const mouseup = useCallbackRef((e: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
            setMark({x: null, y: null})
            if (dragData.current.dragging) {
                dragend.emit()
            }
        })
        return {
            mousedown,
            mark,
        }
    })();

    const resizeDraggier = (() => {

        const dragData = useRef({
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0,
            startLeft: 0,
            startTop: 0,
            dragging: false,
            direction: {
                horizontal: BlockResizeDirection.start,
                vertical: BlockResizeDirection.start,
            },
            block: null as null | VisualEditorBlock,
        })

        const mousedown = useCallbackRef((e: React.MouseEvent<HTMLDivElement>, direction: { horizontal: BlockResizeDirection, vertical: BlockResizeDirection }, block: VisualEditorBlock) => {
            e.stopPropagation()
            document.body.addEventListener('mousemove', mousemove)
            document.body.addEventListener('mouseup', mouseup)
            dragData.current = {
                startX: e.clientX,
                startY: e.clientY,
                startWidth: block.width,
                startHeight: block.height,
                startLeft: block.left,
                startTop: block.top,
                dragging: false,
                direction,
                block,
            }
        })
        const mousemove = useCallbackRef((e: MouseEvent) => {
            let {startX, startY, startWidth, startHeight, direction, startLeft, startTop, dragging, block} = dragData.current
            if (!dragging) {
                dragData.current.dragging = true
                dragstart.emit()
            }
            let {clientX: moveX, clientY: moveY} = e
            if (direction.horizontal === BlockResizeDirection.center) {
                moveX = startX
            }
            if (direction.vertical === BlockResizeDirection.center) {
                moveY = startY
            }
            let durX = moveX - startX
            let durY = moveY - startY

            if (direction.vertical === BlockResizeDirection.start) {
                durY = -durY
                block!.top = startTop - durY
            }
            if (direction.horizontal === BlockResizeDirection.start) {
                durX = -durX
                block!.left = startLeft - durX
            }

            const width = startWidth + durX
            const height = startHeight + durY
            block!.width = width
            block!.height = height
            block!.hasResize = true
            methods.updateBlocks(props.value.blocks)
        })
        const mouseup = useCallbackRef((e: MouseEvent) => {
            document.body.removeEventListener('mousemove', mousemove)
            document.body.removeEventListener('mouseup', mouseup)
            if (dragData.current.dragging) {
                dragend.emit()
            }
        })

        return {
            mousedown,
        }
    })();

    const handler = {
        onContextmenu: (e: React.MouseEvent<HTMLDivElement>, block: VisualEditorBlock) => {
            if (preview) return
            e.preventDefault()
            e.stopPropagation()

            $$dropdown({
                reference: e.nativeEvent,
                render: () => <>
                    <DropdownOption label="置顶节点" icon="icon-place-top" onClick={commander.placeTop}/>
                    <DropdownOption label="置底节点" icon="icon-place-bottom" onClick={commander.placeBottom}/>
                    <DropdownOption label="删除节点" icon="icon-delete" onClick={commander.delete}/>
                    <DropdownOption label="查看数据" icon="icon-browse" {...{onClick: () => methods.showBlockData(block)}}/>
                    <DropdownOption label="导入节点" icon="icon-import" {...{onClick: () => methods.importBlockData(block)}}/>
                </>
            })
        }
    }

    const methods = {
        clearFocus: (external?: VisualEditorBlock) => {
            let blocks = [...props.value.blocks];
            if (blocks.length === 0) return
            if (!!external) {
                blocks = blocks.filter(item => item !== external)
            }
            blocks.forEach(block => block.focus = false)
            methods.updateBlocks(props.value.blocks)
        },
        updateBlocks: (blocks: VisualEditorBlock[]) => {
            props.onChange({
                ...props.value,
                blocks: [...blocks],
            })
        },
        showBlockData: (block: VisualEditorBlock) => {
            $$dialog.textarea(JSON.stringify(block), {title: '节点数据', editReadonly: true})
        },
        importBlockData: async (block: VisualEditorBlock) => {
            const text = await $$dialog.textarea('', {title: '请输入节点Json字符串'})
            try {
                const data = JSON.parse(text || '')
                commander.updateBlock(data, block)
            } catch (e) {
                console.error(e)
                notification.open({message: '解析json字符串出错'})
            }
        },
    }

    const commander = useVisualCommander({
        value: props.value,
        onChange: props.onChange,
        focusData,
        updateBlocks: methods.updateBlocks,
        dragstart,
        dragend,
    })

    const containerStyles = useMemo(() => ({
        width: `${props.value.container.width}px`,
        height: `${props.value.container.height}px`,
    }), [props.value.container])

    const buttons: {
        label: string | (() => string),
        icon: string | (() => string),
        tip?: string | (() => string),
        handler: () => void,
    }[] = [
        {label: '撤销', icon: 'icon-back', handler: commander.undo, tip: 'ctrl+z'},
        {label: '重做', icon: 'icon-forward', handler: commander.redo, tip: 'ctrl+y, ctrl+shift+z'},
        {
            label: () => preview ? '编辑' : '预览',
            icon: () => preview ? 'icon-edit' : 'icon-browse',
            handler: () => {
                if (!preview) {
                    methods.clearFocus()
                }
                setPreview(!preview)
            },
        },
        {
            label: '导入', icon: 'icon-import', handler: async () => {
                const text = await $$dialog.textarea('', {title: '请输入导入的JSON字符串'})
                try {
                    const data = JSON.parse(text || '')
                    commander.updateValue(data)
                } catch (e) {
                    console.error(e)
                    notification.open({
                        message: '导入失败！',
                        description: '导入的数据格式不正常，请检查！'
                    })
                }
            }
        },
        {
            label: '导出',
            icon: 'icon-export',
            handler: () => $$dialog.textarea(JSON.stringify(props.value), {editReadonly: true, title: '导出的JSON数据'})
        },
        {label: '置顶', icon: 'icon-place-top', handler: () => commander.placeTop(), tip: 'ctrl+up'},
        {label: '置底', icon: 'icon-place-bottom', handler: () => commander.placeBottom(), tip: 'ctrl+down'},
        {label: '删除', icon: 'icon-delete', handler: () => commander.delete(), tip: 'ctrl+d, backspace, delete'},
        {label: '清空', icon: 'icon-reset', handler: () => commander.clear(),},
        {
            label: '关闭', icon: 'icon-close', handler: () => {
                methods.clearFocus()
                setEditing(false)
            },
        },
    ]

    return <>
        <div className="react-visual-editor-container"
             style={containerStyles}>
            {props.value.blocks.map((block, index) => {
                return <ReactVisualEditorBlock
                    key={index}
                    block={block}
                    option={props.option}
                    formData={props.formData}
                    customProps={props.customProps}
                    onFormDataChange={props.onFormDataChange}>
                    {(() => {
                        if (!block.focus) return;
                        const component = props.option.componentMap[block.componentKey]
                        if (!component) return
                        if (component.resize && (component.resize.width || component.resize.height)) {
                            return <ReactVisualBlockResize block={block} option={props.option}/>
                        }
                    })()}
                </ReactVisualEditorBlock>
            })}

            <div className="react-visual-container-edit-button" onClick={() => setEditing(true)}>
                <i className="iconfont icon-edit"/>
                <span>编辑组件</span>
            </div>
        </div>

        {!!editing && <div className={classes}>
            <div className="react-visual-editor-menu">
                {props.option.componentList.map((comp, index) => (
                    <div className="react-visual-editor-menu-component"
                         key={index}
                         draggable
                         onDragStart={() => menuDraggier.dragstart(comp)}
                         onDragEnd={menuDraggier.dragend}>
                        {comp.preview()}
                        <div className="react-visual-editor-menu-component-name">{comp.name}</div>
                    </div>
                ))}
            </div>
            <div className="react-visual-editor-body">
                <div className="react-visual-editor-container"
                     style={containerStyles}
                     ref={containerRef}
                     onMouseDown={focusHandler.container.mousedown}>
                    {/*<div style={{position: 'absolute'}}>
                        {JSON.stringify(props.formData)}
                    </div>*/}
                    {props.value.blocks.map((block, index) => {
                        return <ReactVisualEditorBlock
                            key={index}
                            block={block}
                            option={props.option}
                            formData={props.formData}
                            customProps={props.customProps}
                            onFormDataChange={props.onFormDataChange}
                            onMousedown={e => focusHandler.block.mousedown(e, block, index)}
                            onContextmenu={e => handler.onContextmenu(e, block)}>
                            {(() => {
                                if (!block.focus) return;
                                const component = props.option.componentMap[block.componentKey]
                                if (!component) return
                                if (component.resize && (component.resize.width || component.resize.height)) {
                                    return <ReactVisualBlockResize block={block} option={props.option} onMouseDown={resizeDraggier.mousedown}/>
                                }
                            })()}
                        </ReactVisualEditorBlock>
                    })}
                    {blockDraggier.mark.y != null && (<div className="react-visual-editor-mark-line-y" style={{top: `${blockDraggier.mark.y}px`}}/>)}
                    {blockDraggier.mark.x != null && (<div className="react-visual-editor-mark-line-x" style={{left: `${blockDraggier.mark.x}px`}}/>)}
                </div>
            </div>
            <div className="react-visual-editor-head">
                {buttons.map((btn, index) => {
                    const label = typeof btn.label === "function" ? btn.label() : btn.label
                    const icon = typeof btn.icon === "function" ? btn.icon() : btn.icon
                    const content = (<div key={index} className="react-visual-editor-head-button" onClick={btn.handler}>
                        <i className={`iconfont ${icon}`}/>
                        <span>{label}</span>
                    </div>)
                    return !btn.tip ? content : <Tooltip title={btn.tip} placement="bottom" key={index}>
                        {content}
                    </Tooltip>
                })}
            </div>
            <ReactVisualEditorOperator
                option={props.option}
                value={props.value}
                updateBlock={commander.updateBlock}
                updateValue={commander.updateValue}
                selectBlock={selectBlock}
            />
        </div>}
    </>
}