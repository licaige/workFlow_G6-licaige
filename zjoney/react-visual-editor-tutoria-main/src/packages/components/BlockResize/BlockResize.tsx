import {VisualEditorBlock, VisualEditorOption} from "../../ReactVisualEditor.utils";

export enum BlockResizeDirection {
    start = 'start',
    center = 'center',
    end = 'end',
}

export const ReactVisualBlockResize: React.FC<{
    block: VisualEditorBlock,
    option: VisualEditorOption,
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>, direction: { horizontal: BlockResizeDirection, vertical: BlockResizeDirection }, block: VisualEditorBlock) => void,
}> = (props) => {

    const component = props.option.componentMap[props.block.componentKey]
    if (!component || !component.resize || !props.onMouseDown) return null

    const {height, width} = component.resize || {}
    return (
        <>
            {!!height && <>
                <div className="block-resize block-resize-top"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.center, vertical: BlockResizeDirection.start}, props.block)}/>
                <div className="block-resize block-resize-bottom"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.center, vertical: BlockResizeDirection.end}, props.block)}/>
            </>}
            {!!width && <>
                <div className="block-resize block-resize-left"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.start, vertical: BlockResizeDirection.center}, props.block)}/>
                <div className="block-resize block-resize-right"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.end, vertical: BlockResizeDirection.center}, props.block)}/>
            </>}
            {!!width && !!height && <>
                <div className="block-resize block-resize-top-left"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.start, vertical: BlockResizeDirection.start}, props.block)}/>
                <div className="block-resize block-resize-top-right"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.end, vertical: BlockResizeDirection.start}, props.block)}/>
                <div className="block-resize block-resize-bottom-left"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.start, vertical: BlockResizeDirection.end}, props.block)}/>
                <div className="block-resize block-resize-bottom-right"
                     onMouseDown={e => props.onMouseDown!(e, {horizontal: BlockResizeDirection.end, vertical: BlockResizeDirection.end}, props.block)}/>
            </>}
        </>
    )
}