import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Icon} from 'zarm';
import { Popup } from "antd-mobile";
import cx from 'classnames';
import {get} from '@/utils';

import s from './style.module.less';

// forwardRef 用于拿到父组件传入的Ref属性，这样在父组件便能通过ref控制子组件
const PopupType = forwardRef(({ onSelect }, ref) => {
    const [show,setShow] = useState(false) // 组件的显示与隐藏
    const [active,setActive] = useState('all') // 激活的type
    const [expense,setExpense] = useState([]) // 支出类型标签
    const [income,setIncome] = useState([]) // 收入类型标签

    useEffect(() => {
        // 请求标签接口放在弹窗内，这个接口如果放在外面，可能会造成代码冗余
        const getList = async () => {
            const {data} = await get('/type/list')
            setExpense(data.filter(i => i.type == 1))
            setIncome(data.filter(i => i.type == 2))
        }
        getList()
    }, [])

    if(ref) {
        ref.current = {
            // 外部可以通过 ref.current.show 来控制组件的显示
            show: () => {
                setShow(true)
            },

            // 外部可以通过 ref.current.close 来控制组件的隐藏
            close: () => {
                setShow(false)
            }
        }
    }

    // 选择类型回调
    const chooseType = (item) => {
        setActive(item.id)
        setShow(false)
        // 父组件传入的onSelect 为了获取类型
        onSelect(item)
    }

    return (
        <Popup
            visible={show}
            position="bottom"
            onMaskClick={() => setShow(false)}
        >
            <div className={s.popupType}>
                <div className={s.header}>
                    请选择类型
                    <Icon type="wrong" className={s.cross} onClick={() => setShow(false)}></Icon>
                </div>
                <div className={s.content}>
                    <div onClick={() => chooseType({id: 'all'})} className={cx({ [s.all]: true,[s.active]: active == 'all' })}>全部类型</div>
                    <div className={s.title}>支出</div>
                    <div className={s.expenseWrap}>
                        {
                            expense.map((item,index) => {
                                return (
                                    <p key={index} onClick={() => chooseType(item)} className={cx({ [s.active]: active == item.id })}>{item.name}</p>
                                )
                            })
                        }
                    </div>
                    <div className={s.title}>收入</div>
                    <div className={s.incomeWrap}>
                        {
                            income.map((item,index) => {
                                return (
                                    <p key={index} onClick={() => chooseType(item)} className={cx({ [s.active]: active == item.id })}>{item.name}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Popup>
    )
})

PopupType.propTypes = {
        onSelect: PropTypes.func
}

export default PopupType;