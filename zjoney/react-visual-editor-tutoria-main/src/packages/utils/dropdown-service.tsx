import './dropdown-service.scss'
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import deepcopy from 'deepcopy';
import classnames from 'classnames';
import ReactDOM from "react-dom";

interface DropdownServiceOption {
    reference: [number, number] | MouseEvent | HTMLElement,
    render: () => any,
}

interface DropdownInstance {
    service: (option: DropdownServiceOption) => void,
    state: {
        option: DropdownServiceOption,
        showFlag: boolean,
    },
    handler: {
        onClickOption: () => void
    },
}

const DropdownContext = React.createContext<DropdownInstance>({} as any)

const Dropdown: React.FC<{ option: DropdownServiceOption, onRef: (ins: DropdownInstance) => void }> = (props) => {
    const [option, setOption] = useState(props.option)
    const [showFlag, setShowFlag] = useState(false)
    const el = useRef({} as HTMLDivElement)
    const styles = useMemo(() => {
        let x = 0, y = 0;
        const reference = option.reference
        if (Array.isArray(reference)) {
            x = reference[0]
            y = reference[1]
        } else if ('initMouseEvent' in reference) {
            x = reference.clientX - 20
            y = reference.clientY - 20
        } else {
            const {top, left, height} = reference.getBoundingClientRect()
            x = left
            y = top + height
        }
        return {
            left: `${x}px`,
            top: `${y}px`,
        }
    }, [option.reference])

    const methods = {
        service: (option: DropdownServiceOption) => {
            setOption(deepcopy(option))
            setShowFlag(true)
        }
    }

    const handler = {
        onClickWindow: (e: MouseEvent) => {
            if (el.current.contains(e.target as Node)) {
                /*点击了dropdown content*/
                return
            } else {
                setShowFlag(false)
            }
        },
        onClickOption: () => setShowFlag(false)
    }
    const classes = useMemo(() => classnames([
        'dropdown-service',
        {
            'dropdown-service-show': showFlag
        }]), [showFlag])

    const refer = {
        handler,
        ...methods,
        state: {
            option,
            showFlag,
        },
    }

    !!props.onRef && props.onRef(refer)

    useEffect(() => {
        document.body.addEventListener('mouseup', handler.onClickWindow, true)
        return () => {
            document.body.removeEventListener('mouseup', handler.onClickWindow, true)
        }
    }, [])

    return (
        <div className={classes} style={styles} ref={el}>
            <DropdownContext.Provider value={refer}>
                <div className="dropdown-service-content">
                    {option.render()}
                </div>
            </DropdownContext.Provider>
        </div>
    )
}

export const DropdownOption: React.FC<{
    icon?: string,
    label?: string,
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
    children?: any,
}> = (props) => {

    const dropdown = useContext(DropdownContext)
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        !!props.onClick && props.onClick(e)
        dropdown.handler.onClickOption()
    }
    return (
        <div className="dropdown-option" onClick={onClick}>
            {!!props.icon && <i className={`iconfont ${props.icon}`}/>}
            {!!props.label && <span>{props.label}</span>}
            {props.children}
        </div>
    )
}

export const $$dropdown = (() => {
    const getInstance = (() => {
        let ins: DropdownInstance | null = null
        return (option: DropdownServiceOption) => {
            if (!ins) {
                const el = document.createElement('div')
                document.body.appendChild(el)
                ReactDOM.render(<Dropdown option={option} onRef={val => ins = val}/>, el)
            }
            return ins!
        }
    })();
    return (option: DropdownServiceOption) => {
        getInstance(option).service(option)
    }
})();