import {useCommander} from "./plugins/command.plugin";
import deepcopy from "deepcopy";
import {VisualEditorBlock, VisualEditorValue} from "./ReactVisualEditor.utils";
import {useRef} from "react";
import {useCallbackRef} from "./hooks/useCallbackRef";

export function useVisualCommander(
    {
        value,
        onChange,
        focusData,
        updateBlocks,
        dragstart,
        dragend,
    }: {
        value: VisualEditorValue,
        onChange: (val: VisualEditorValue) => void,
        focusData: {
            focus: VisualEditorBlock[],
            unFocus: VisualEditorBlock[],
        },
        updateBlocks: (blocks: VisualEditorBlock[]) => void,
        dragstart: { on: (cb: () => void) => void, off: (cb: () => void) => void },
        dragend: { on: (cb: () => void) => void, off: (cb: () => void) => void },
    }
) {
    const commander = useCommander()

    /**
     * 删除命令
     * @author  韦胜健
     * @date    2021/1/22 11:37 下午
     */
    commander.useRegistry({
        name: 'delete',
        keyboard: [
            'backspace',
            'delete',
            'ctrl+d'
        ],
        execute() {
            // console.log('执行删除命令')
            // console.log(this.data)
            let data = {
                before: deepcopy(value.blocks),
                after: deepcopy(focusData.unFocus),
            }
            return {
                redo: () => {
                    // console.log('重做删除命令')
                    updateBlocks(deepcopy(data.after))
                },
                undo: () => {
                    // console.log('撤回删除命令')
                    updateBlocks(deepcopy(data.before))
                },
            }
        }
    });

    /**
     * 拖拽命令
     * @author  韦胜健
     * @date    2021/2/16 10:24
     */
    (() => {
        const dragData = useRef({before: null as null | VisualEditorBlock[]})
        const handler = {
            dragstart: useCallbackRef(() => dragData.current.before = deepcopy(value.blocks)),
            dragend: useCallbackRef(() => commander.state.commands.drag()),
        }
        /**
         * 拖拽命令，适用于三种情况：
         * - 从菜单拖拽组件到容器画布；
         * - 在容器中拖拽组件调整位置
         * - 拖拽调整组件的宽度和高度；
         * @author  韦胜健
         * @date    2021/1/22 11:38 下午
         */
        commander.useRegistry({
            name: 'drag',
            init() {
                dragData.current = {before: null}
                dragstart.on(handler.dragstart)
                dragend.on(handler.dragend)
                return () => {
                    dragstart.off(handler.dragstart)
                    dragend.off(handler.dragend)
                }
            },
            execute() {
                let before = deepcopy(dragData.current.before!)
                let after = deepcopy(value.blocks)
                return {
                    redo: () => {
                        updateBlocks(deepcopy(after))
                    },
                    undo: () => {
                        updateBlocks(deepcopy(before))
                    },
                }
            }
        })
    })();

    /**
     * 清空命令
     * @author  韦胜健
     * @date    2021/2/16 10:24
     */
    commander.useRegistry({
        name: 'clear',
        execute: () => {
            let data = {
                before: deepcopy(value.blocks),
                after: deepcopy([]),
            }
            return {
                redo: () => {
                    updateBlocks(deepcopy(data.after))
                },
                undo: () => {
                    updateBlocks(deepcopy(data.before))
                },
            }
        }
    })

    /**
     * 置顶
     * @author  韦胜健
     * @date    2021/2/16 10:24
     */
    commander.useRegistry({
        name: 'placeTop',
        keyboard: 'ctrl+up',
        execute: () => {
            let data = {
                before: deepcopy(value.blocks),
                after: deepcopy((() => {
                    const {focus, unFocus} = focusData
                    const maxZIndex = unFocus.reduce((prev, block) => Math.max(prev, block.zIndex), -Infinity) + 1
                    focus.forEach(block => block.zIndex = maxZIndex)
                    return value.blocks
                })()),
            }
            return {
                redo: () => {
                    updateBlocks(deepcopy(data.after))
                },
                undo: () => {
                    updateBlocks(deepcopy(data.before))
                },
            }
        }
    })

    /**
     * 置底
     * @author  韦胜健
     * @date    2021/2/16 10:25
     */
    commander.useRegistry({
        name: 'placeBottom',
        keyboard: 'ctrl+down',
        execute: () => {
            let data = {
                before: deepcopy(value.blocks),
                after: deepcopy((() => {
                    const {focus, unFocus} = focusData
                    let minZIndex = unFocus.reduce((prev, block) => Math.min(prev, block.zIndex), Infinity) - 1
                    if (minZIndex < 0) {
                        const dur = Math.abs(minZIndex)
                        unFocus.forEach(block => block.zIndex += dur)
                        minZIndex = 0
                    }
                    focus.forEach(block => block.zIndex = minZIndex)
                    return deepcopy(value.blocks)
                })()),
            }
            return {
                redo: () => {
                    updateBlocks(deepcopy(data.after))
                },
                undo: () => {
                    updateBlocks(deepcopy(data.before))
                },
            }
        }
    })

    /**
     * 全选
     * @author  韦胜健
     * @date    2021/2/16 10:26
     */
    commander.useRegistry({
        name: 'selectAll',
        followQueue: false,
        keyboard: 'ctrl+a',
        execute: () => {
            return {
                redo: () => {
                    (value.blocks || []).forEach(block => block.focus = true);
                    updateBlocks(value.blocks)
                },
            }
        },
    })

    /**
     * 更新 modelValue
     * @author  韦胜健
     * @date    2021/2/16 11:07
     */
    commander.useRegistry({
        name: 'updateValue',
        execute: (newModelValue: VisualEditorValue) => {
            let before: undefined | VisualEditorValue = undefined
            let after: undefined | VisualEditorValue = undefined
            return {
                redo: () => {
                    if (!before && !after) {
                        before = deepcopy(value)
                        onChange(deepcopy(newModelValue))
                        after = deepcopy(newModelValue)
                    } else {
                        onChange(deepcopy(after!))
                    }
                },
                undo: () => onChange(deepcopy(before!)),
            }
        },
    })

    commander.useRegistry({
        name: 'updateBlock',
        execute: (newBlock: VisualEditorBlock, oldBlock: VisualEditorBlock) => {
            let blocks = deepcopy(value.blocks || [])
            let data = {
                before: blocks,
                after: (() => {
                    blocks = [...blocks]
                    const index = value.blocks!.indexOf(oldBlock)
                    if (index > -1) {
                        blocks.splice(index, 1, newBlock)
                    }
                    return deepcopy(blocks)
                })(),
            }
            return {
                redo: () => {
                    updateBlocks(deepcopy(data.after))
                },
                undo: () => {
                    updateBlocks(deepcopy(data.before))
                },
            }
        },
    })


    commander.useInit()

    return {
        undo: () => commander.state.commands.undo(),
        redo: () => commander.state.commands.redo(),
        delete: () => commander.state.commands.delete(),
        clear: () => commander.state.commands.clear(),
        placeTop: () => commander.state.commands.placeTop(),
        placeBottom: () => commander.state.commands.placeBottom(),
        updateValue: (newModelValue: VisualEditorValue) => commander.state.commands.updateValue(newModelValue),
        updateBlock: (newBlock: VisualEditorBlock, oldBlock: VisualEditorBlock) => commander.state.commands.updateBlock(newBlock, oldBlock),
    }
}