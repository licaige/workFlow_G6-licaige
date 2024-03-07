import {VisualEditorBlock, VisualEditorOption} from "./ReactVisualEditor.utils";
import {useEffect, useMemo, useRef} from "react";
import {useUpdate} from "./hooks/useUpdate";
import classNames from "classnames";

export const ReactVisualEditorBlock: React.FC<{
    block: VisualEditorBlock,
    option: VisualEditorOption,
    formData?: any,
    onFormDataChange?: (val?: any) => void,
    onMousedown?: (e: React.MouseEvent<HTMLDivElement>) => void,
    onContextmenu?: (e: React.MouseEvent<HTMLDivElement>) => void,
    customProps?: Record<string, any>,
}> = (props) => {

    const update = useUpdate()
    const elRef = useRef<HTMLDivElement>(null)
    const component = props.option.componentMap[props.block.componentKey]!

    const styles = useMemo(() => {
        return {
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: props.block.zIndex,
            opacity: props.block.adjustPosition ? 0 : null as any,
        }
    }, [props.block.top, props.block.left, props.block.zIndex, props.block.adjustPosition])

    const classes = useMemo(() => classNames([
        'react-visual-editor-block',
        {
            'react-visual-editor-block-focus': props.block.focus,
        }
    ]), [props.block.focus])

    useEffect(() => {
        if (props.block.adjustPosition) {
            const {offsetWidth, offsetHeight} = elRef.current!
            props.block.left = props.block.left - offsetWidth / 2
            props.block.top = props.block.top - offsetHeight / 2
            props.block.height = offsetHeight
            props.block.width = offsetWidth
            props.block.adjustPosition = false
            update()
        }
    }, [])


    // const visualComponent = props.option.componentMap[props.block.componentKey]
    let render = component.render({
        block: props.block,
        props: props.block.props || {},
        model: Object.entries(component.model || {}).reduce((prev, item) => {
            const [modifier] = item
            const bindField = (props.block.model || {})[modifier]

            prev[modifier] = {
                value: !bindField ? '' : props.formData[bindField],
                onChange: (e: React.ChangeEvent<HTMLInputElement> | string | undefined) => {
                    if (!bindField) return
                    let val: any
                    if (typeof e == "string" || typeof e == "undefined") {
                        val = e
                    } else {
                        val = e.target.value
                    }
                    !!props.onFormDataChange && props.onFormDataChange({
                        ...props.formData,
                        [bindField]: val,
                    })
                }
            }
            return prev
        }, {} as Record<string, { value: any, onChange: (e: any) => void }>),
        size: (() => {
            if (!component.resize || !props.block.hasResize) return {}
            let ret = {} as any
            if (!!component.resize.height) ret.height = `${props.block.height}px`
            if (!!component.resize.width) ret.width = `${props.block.width}px`
            return ret
        })(),
        custom: (!props.block.slotName || !props.customProps) ? {} : (props.customProps[props.block.slotName] || {})
    })

    return (
        <div className={classes}
             style={styles} ref={elRef}
             onMouseDown={props.onMousedown}
             onContextMenu={props.onContextmenu}
        >
            {render}
            {props.children}
        </div>
    )
}