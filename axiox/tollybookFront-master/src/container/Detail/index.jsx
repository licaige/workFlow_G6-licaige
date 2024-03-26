import Header from "../../components/Header";
import {get, typeMap, post} from '@/utils';
import { useLocation,useNavigate } from "react-router-dom";
import qs from 'query-string';
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import cx from 'classnames';
import CustomIcon from "../../components/CustomIcon";
import {Modal,Toast} from 'antd-mobile';
import PopupAddBill from "../../components/PopupAddBill";

import s from './style.module.less';

const Detail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = qs.parse(location.search)

    const [detail,setDetail] = useState({})

    const addBillRef = useRef()

    const getDetail = async () => {
        const {data} = await get('/bill/detail?id=' + id)
        setDetail(data)
    }

    useEffect(() => {
        getDetail()
    },[])

    const deleteDetail = () => {
        Modal.confirm({
            content: '确认删除账单？',
            onConfirm: async () => {
                const data = await get('/bill/delete?id=' + id)
                if(data.code === 200) {
                    Toast.show('删除成功')
                    navigate(-1)
                }else{
                    Toast.show('删除失败')
                }
            }
        })
    }

    const editDetail = () => {
        addBillRef.current.show()
    }

    return (
        <div className={s.detail}>
            <Header title="账单详情"></Header>
            <div className={s.card}>
                <div className={s.type}>
                    {/* 通过pay_type属性,判断是收入还是支出，给出不同的颜色 */}
                    <span className={cx({ [s.expense]: detail.pay_type == 1,[s.income]: detail.pay_type == 2 })}>
                        <CustomIcon className={s.iconfont} type={typeMap[detail.type_id ? detail.type_id : 1].icon}></CustomIcon>
                    </span>
                </div>
                <span>{detail.type_name || ''}</span>
                {
                    detail.pay_type == 1 ? 
                    <div className={cx(s.amount, s.expense)}>-{detail.amount}</div> : 
                    <div className={cx(s.amount, s.income)}>+{detail.amount}</div>
                }
                <div className={s.info}>
                    <div className={s.time}>
                        <span>记录时间</span>
                        <span>{dayjs(detail.date).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className={s.remark}>
                    <span>备注</span>
                    <span>{detail.remark || '-'}</span>
                </div>
                </div>
                <div className={s.operation}>
                    <span onClick={deleteDetail}> <CustomIcon type="icon-feed-logo-fill" ></CustomIcon> 删除</span>
                    <span onClick={editDetail}> <CustomIcon type="icon-operation" ></CustomIcon> 编辑</span>
                </div>
            </div>
            <PopupAddBill ref={addBillRef} detail={detail} onReload={getDetail}></PopupAddBill>
        </div>
    )
}

export default Detail;