import React,{useState, useEffect} from "react";
import { Icon,Progress } from "zarm";
import cx from 'classnames';
import dayjs from "dayjs";
import { get, typeMap } from '@/utils';
import CustomIcon from "../../components/CustomIcon";
import s from './style.module.less';
import { DatePicker } from "antd-mobile";

const Data = () => {
    const [currentMonth,setCurrentMonth] = useState(dayjs().format('YYYY-MM'))
    const [dateShow,setDateShow] = useState(false)

    const [totalType,setTotalType] = useState('expense');
    const [totalExpense,setTotalExpense] = useState(0) // 总支出
    const [totalIncome,setTotalIncome] = useState(0) // 总收入
    const [expenseData,setExpenseData] = useState([]) // 支出数据
    const [incomeData,setIncomeData] = useState([]) // 收入数据

    const [pieType,setPieType] = useState('expense')

    const setEchart = (data) => {
        var chartDom = document.getElementById('proportion');
        var myChart = echarts.init(chartDom);
        var option;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    data: data.map(item => item.type_name)
                },
                series: [
                    {
                    name: data.pay_type == 1 ? '支出' : '收入',
                    type: 'pie',
                    radius: '50%',
                    data: data.map(item => {
                        return {
                            name: item.type_name,
                            value: item.number
                        }
                    }),
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };
            option && myChart.setOption(option);
    }

    const changePieChart = (pieType) => {
        setPieType(pieType)
        setEchart(pieType == 'expense' ? expenseData : incomeData)
    }


    const getData = async () => {
        const {data} = await get(`/bill/data?date=${currentMonth}`)
        setTotalExpense(data.total_expense)
        setTotalIncome(data.total_income)

        const expense_data = data.total_data.filter(item => item.pay_type == 1).sort((a,b) => Number(b.number) - Number(a.number))
        const income_data = data.total_data.filter(item => item.pay_type == 2).sort((a,b) => Number(b.number) - Number(a.number))
        setExpenseData(expense_data)
        setIncomeData(income_data)
        setEchart(expense_data)
    }

    useEffect(() => {
        getData()
    },[currentMonth])

    return (
        <div className={s.data}>
            <div className={s.total}>
                <div className={s.time} onClick={() => setDateShow(true)}>
                    <span>{currentMonth}</span>
                    <Icon type="date" className={s.date}></Icon>
                </div>
                <div className={s.title}>共支出</div>
                <div className={s.expense}>￥{totalExpense}</div>
                <div className={s.income}>共收入￥{totalIncome}</div>
            </div>
            <div className={s.structure}>
                <div className={s.head}>
                    <span className={s.title}>收支构成</span>
                    <div className={s.tab}>
                        <span className={cx({[s.expense]: true,[s.active]: totalType == 'expense'})} onClick={() => setTotalType('expense')}>支出</span>
                        <span className={cx({[s.income]: true,[s.active]: totalType == 'income'})} onClick={() => setTotalType('income')}>收入</span>
                    </div>
                </div>
                <div className={s.content}>
                    {
                        (totalType == 'expense' ? expenseData : incomeData).map(item => {
                            return (
                                <div key={item.type_id} className={s.item}>
                                    <div className={s.left}>
                                        <div className={s.type}>
                                            <span className={cx({[s.expense]: totalType == 'expense',[s.income]: totalType == 'income'})}>
                                                <CustomIcon type={typeMap[item.type_id ? item.type_id : 1].icon}></CustomIcon>
                                            </span>
                                            <span className={s.name}>{item.type_name}</span>
                                        </div>
                                        <div className={s.progress}>
                                            ￥{Number(item.number).toFixed(2) || 0}
                                        </div>
                                    </div>
                                    <div className={s.right}>
                                        <div className={s.percent}>
                                        <Progress
                                            shape="line"
                                            percent={(Math.round((Number(item.number)/Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100))}
                                            theme='primary'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={s.structure}>
                <div className={s.proportion}>
                    <div className={s.head}>
                        <span className={s.title}>收支构成</span>
                        <div className={s.tab}>
                            <span className={cx({[s.expense]: true,[s.active]: pieType == 'expense'})} onClick={() => changePieChart('expense')}>支出</span>
                            <span className={cx({[s.income]: true,[s.active]: pieType == 'income'})} onClick={() => changePieChart('income')}>收入</span>
                        </div>
                    </div>
                    <div id="proportion"></div>
                </div>
            </div>
            <DatePicker
                title='日期选择'
                visible={dateShow}
                onClose={() => {
                    setDateShow(false)
                }}
                precision="month"
                onConfirm={val => {
                    setCurrentMonth(dayjs(val).format('YYYY-MM'))
                }}
            />
        </div>
    )
}

export default Data;