import { forwardRef, useEffect, useState } from 'react';
import { Popup, DatePicker,NumberKeyboard,Button, Toast } from 'antd-mobile';
import { Icon,Input } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import CustomIcon from '../CustomIcon';
import {get, typeMap, post} from '@/utils';

import s from './style.module.less';

const PopupAddBill = forwardRef(({ detail = {}, onReload },ref) => {
    const [show,setShow] = useState(false)
    const [payType, setPayType] = useState('expense') // 支出或收入类型
    const [date,setDate] = useState(new Date())
    const [dateShow,setDateShow] = useState(false)
    const [amount,setAmount] = useState('')
    const [keyboardShow,setKeyboardShow] = useState(false)

    const [currentType,setCurrentType] = useState({}) // 当前选中账单类型
    const [expense,setExpense] = useState([]) // 支出类型数组
    const [income,setIncome] = useState([]) // 收入类型数组

    const [remark,setRemark] = useState('') // 备注
    const [showRemark,setShowReamrk] = useState(false) // 备注输入框展示控制

    const id = detail && detail.id

    useEffect(() => {
        if(detail.id) {
            setPayType(detail.pay_type == 1 ? 'expense' : 'income')
            setCurrentType({
                id: detail.type_id,
                name: detail.type_name
            })
            setRemark(detail.remark)
            setAmount(detail.amount)
            setDate(dayjs(detail.date).$d)
        }
    },[detail])

    useEffect(() => {
        const getList = async () => {
            const {data} = await get('/type/list')
            const _expense = data.filter(i => i.type == 1)
            const _income = data.filter(i => i.type == 2)
            setExpense(_expense)
            setIncome(_income)
            if(!id) {
                setCurrentType(_expense[0]) // 新建账单，类型默认是支出类型的第一项
            }
        }
        getList()
    },[])

    const selectDate = (val) => {
        setDate(val)
    }

    if(ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    }

    const changeType = (type) => {
        setPayType(type)
    }

    const handleMoney = (value) => {
        value = String(value)
        // 当输入值为. ，且前面的数值中已经存在.，则不让其输入进去
        if(value == '.' && amount.includes('.')) return
        // 小数点后保留两位，当超过两位，不让其他字符串继续拼接
        if(value != '.' && amount.includes('.') && amount.split('.')[1].length >= 2) return
        setAmount(amount + value) 
    }

    const handleDelete = () => {
        let _amount = amount.slice(0,amount.length - 1)
        setAmount(_amount)
        return
    }

    const handleConfirm = () => {

    }

    const addBill = async () => {
        if(!amount) {
            Toast.show('请输入具体金额')
            return
        }
        const params = {
            amount: Number(amount).toFixed(2),
            type_id: currentType.id,
            type_name: currentType.name,
            date: dayjs(date).unix() * 1000, // 日期传时间戳
            pay_type: payType == 'expense' ? 1 : 2,
            remark: remark || ''
        }

        if(id) {
            params.id = id
            const result = await post('/bill/update',params)
            Toast.show('修改成功')
        }else{
            const result = await post('/bill/add',params)
            if(result.code == 200) {
                Toast.show(result.msg)
                setAmount('')
                setPayType('expense')
                setCurrentType(expense[0])
                setDate(new Date())
                setRemark('')
            }else{
                Toast.show(result.msg)
            }
        }
        setShow(false)
        if(onReload) onReload()
    }

    return (<Popup
        visible={show}
        position="bottom"
        onMaskClick={() => {setShow(false);setKeyboardShow(false)}}
    >
        <div className={s.addWrap}>
            <header className={s.header}>
                <span className={s.close} onClick={() =>  {setShow(false);setKeyboardShow(false)}}>
                    <Icon type='wrong'></Icon>
                </span>
            </header>
            <div className={s.filter}>
                <div className={s.type}>
                    <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true,[s.active]: payType == 'expense' })}>支出</span>
                    <span onClick={() => changeType('income')} className={cx({ [s.income]: true,[s.active]: payType == 'income' })}>收入</span>
                </div>
                <div className={s.time} onClick={() => setDateShow(true)}>
                    {dayjs(date).format('MM-DD')} <Icon className={s.arrow} type="arrow-bottom"></Icon>
                </div>
                <DatePicker
                    title='请选择'
                    visible={dateShow}
                    onClose={() => {
                        setDateShow(false)
                    }}
                    onConfirm={val => {
                        selectDate(val)
                    }}
                    precision="day"
                />
            </div>
            <div className={s.money} style={{height:keyboardShow ? '160px' : '60px',transition: 'height .3s ease-in'}} onClick={() => setKeyboardShow(true)}>
                <span className={s.sufix}>￥</span>
                <span className={cx(s.amount, s.animation)}>{amount}</span>
            </div>
            <div className={s.typeWrap}>
                <div className={s.typeBody}>
                    {/* 通过paytype判断是展示收入还是展示支出选项 */}
                    {
                        (payType == 'expense' ? expense : income).map(item => {
                            return (
                                <div onClick={() => {setCurrentType(item)}} key={item.id} className={s.typeItem}>
                                    <span className={cx({[s.iconfontWrap]: true,[s.expense]: payType == 'expense',[s.income]: payType == 'income',[s.active]: currentType.id == item.id})}>
                                        <CustomIcon className={s.iconfont} type={typeMap[item.id].icon}></CustomIcon>
                                    </span>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={s.remark}>
                {
                    showRemark ? <Input autoHeight showLength maxLength={50} type="text" rows={3} value={remark} placeholder="请输入备注信息" 
                    onChange={(val) => setRemark(val)} onBlur={() => setShowReamrk(false)}></Input> : <span onClick={() => setShowReamrk(true)}>{remark || '请添加备注'}</span>
                }
            </div>
            <Button block color='primary' onClick={addBill}>提交</Button>
            <NumberKeyboard
                visible={keyboardShow}
                onClose={() => setKeyboardShow(false)}
                onInput={val => handleMoney(val)}
                onDelete={() => handleDelete()}
                customKey='.'
                showCloseButton={true}
                confirmText='确定'
                onConfirm={() => handleConfirm()}
            />

        </div>
    </Popup>)
})

export default PopupAddBill;