import React, {useEffect, useState, useRef} from 'react'
import { Icon } from 'zarm'
import BillItem from '../../components/BillItem'
import dayjs from 'dayjs';
import {get} from '@/utils';
import PopupType from '../../components/PopupType';
import { PullToRefresh, InfiniteScroll, FloatingBubble } from 'antd-mobile'
import { DatePicker } from 'antd-mobile';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '../../components/PopupAddBill';

import s from './style.module.less'

const Home = () => {
    const [currentTime,setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 筛选当前时间
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const typeRef = useRef(); // 账单类型Ref
    const [currentSelect, setCurrentSelect] = useState({})

    const [showDate,setShowDate] = useState(false)

    const [totalExpense,setTotalExpense] = useState(0)
    const [totalIncome,setTotalIncome] = useState(0)

    const addBillRef = useRef()



    useEffect(() => {
        getBillList()
    }, [page, currentSelect,currentTime])

    const getBillList = async () => {
        const { data } = await get(`/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`)
        if(page == 1) {
            setList(data.list)
        }else{
            setList(list.concat(data.list))
        }
        setTotalPage(data.totalPage)
        setTotalExpense(Number(data.totalExpense).toFixed(2));
        setTotalIncome(Number(data.totalIncome).toFixed(2));
    }

    const refreshData = () => {
        if(page != 1) {
            setPage(1)
        }else{
            getBillList()
        }
    }

    const loadData = () => {
        if(page < totalPage) {
            setPage(page + 1)
        }else{
            setHasMore(false)
        }
    }

    // 添加账单弹窗
    const toggle = () => {
        if(typeRef.current) {
            typeRef.current.show()
        }
    }

    // 筛选类型
    const select = (item) => {
        setCurrentSelect(item)
        setPage(1)
    }

    const addToggle = () => {
        addBillRef.current && addBillRef.current.show()
    }


  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ {totalExpense}</b></span>
        <span className={s.income}>总收入：<b>¥ {totalIncome}</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="icon-arrow-down" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time} onClick={() => setShowDate(true)}>{currentTime}<Icon className={s.arrow} type="icon-arrow-down" /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
        {
            list.length ? 
            <PullToRefresh
                onRefresh={refreshData}
            >
                {
                    list.map((item,index) => {
                        return <BillItem bill={item} key={index}></BillItem>
                    })
                }
                <InfiniteScroll loadMore={loadData} hasMore={hasMore} />
            </PullToRefresh> : null
        }
    </div>
        <PopupType ref={typeRef} onSelect={select}></PopupType>
        <PopupAddBill ref={addBillRef} onReload={refreshData}></PopupAddBill>
        <DatePicker
            visible={showDate}
            onClose={() => {
                setShowDate(false)
            }}
            defaultValue={new Date(currentTime)}
            precision='month'
            onConfirm={val => {
                setCurrentTime(dayjs(val).format('YYYY-MM'))

            }}
        />
        <FloatingBubble
            style={{
            '--initial-position-bottom': '70px',
            '--initial-position-right': '24px',
            }}
            onClick={addToggle}
        >
            <CustomIcon size="lg" type="icon-image-text"></CustomIcon>
        </FloatingBubble>
  </div>
}

export default Home