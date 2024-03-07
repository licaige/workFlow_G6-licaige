import {useMemo, useRef, useState} from "react";

export function useCallbackRef<Cb extends (...args: any[]) => void>(cb: Cb): Cb {
    const refCb = useRef(cb)
    refCb.current = cb
    const [staticCb] = useState(() => {
        return ((...args: any) => refCb.current(...args)) as Cb
    })
    return staticCb
}

export const TestStaticCallbackSuccess = () => {
    const [pos, setPos] = useState({
        top: 0,
        left: 0,
    })
    const blockStyles = useMemo(() => {
        return {
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            backgroundColor: 'green',
        }
    }, [pos])
    const draggier = (() => {
        let dragData = useRef({
            startTop: 0,
            startLeft: 0,
            startX: 0,
            startY: 0,
        })
        const mousedown = useCallbackRef((e: React.MouseEvent<HTMLDivElement>) => {
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            dragData.current = {
                startTop: pos.top,
                startLeft: pos.left,
                startX: e.clientX,
                startY: e.clientY,
            }
        })
        const mousemove = useCallbackRef((e: MouseEvent) => {
            const durX = e.clientX - dragData.current.startX
            const durY = e.clientY - dragData.current.startY
            // 每次打印都是最新的值
            console.log(pos)
            setPos({
                top: dragData.current.startTop + durY,
                left: dragData.current.startLeft + durX,
            })
        })
        const mouseup = useCallbackRef((e: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        })
        return {
            mousedown,
        }
    })();
    return (
        <div className="app-test-block" style={blockStyles} onMouseDown={draggier.mousedown}>
        </div>
    )
}

export const TestStaticCallbackError = () => {
    const [pos, setPos] = useState({
        top: 0,
        left: 0,
    })
    const blockStyles = useMemo(() => {
        return {
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            backgroundColor: 'red',
        }
    }, [pos])
    const draggier = (() => {
        let dragData = useRef({
            startTop: 0,
            startLeft: 0,
            startX: 0,
            startY: 0,
        })
        const mousedown = (e: React.MouseEvent<HTMLDivElement>) => {
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            dragData.current = {
                startTop: pos.top,
                startLeft: pos.left,
                startX: e.clientX,
                startY: e.clientY,
            }
        }
        const mousemove = (e: MouseEvent) => {
            const durX = e.clientX - dragData.current.startX
            const durY = e.clientY - dragData.current.startY
            // 拖拽开始的时候的值
            console.log(pos)
            setPos({
                top: dragData.current.startTop + durY,
                left: dragData.current.startLeft + durX,
            })
        }
        const mouseup = (e: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }
        return {
            mousedown,
        }
    })();
    return (
        <div className="app-test-block" style={blockStyles} onMouseDown={draggier.mousedown}>
        </div>
    )
}

export function TestStaticCallback() {
    return (
        <div>
            <TestStaticCallbackSuccess/>
            <TestStaticCallbackError/>
        </div>
    )
}