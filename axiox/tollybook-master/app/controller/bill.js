'use strict';

const moment = require('moment');

const Controller = require('egg').Controller;

class BillController extends Controller {
    async add() {
        const {ctx,app} = this
        const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body

        if(!amount || !type_id || !type_name ||  !pay_type || !date) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
        }

        try{
            let user_id;
            const token = ctx.request.header.token;

            const decode = await app.jwt.verify(token, app.config.jwt.secret)
            if(!decode) return
            user_id = decode.id
            const result = await ctx.service.bill.add({
                amount,
                type_id,
                type_name,
                date: moment(date).format('YYYY-MM-DD HH:mm'),
                pay_type,
                remark,
                user_id
            })   
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: null
            }
        }catch(err) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        } 
    }

    async list() {
        const {ctx,app} = this
        const {date, page = 1, page_size = 5, type_id = 'all'} = ctx.query

        try{
            let user_id;
            const token = ctx.request.header.token
            const decode = await app.jwt.verify(token, app.config.jwt.secret)
            user_id = decode.id
            const list = await ctx.service.bill.list(user_id)
            const _list = list.filter(item => {
                if(type_id != 'all') {
                    return moment(item.date).format('YYYY-MM') == date && type_id == item.type_id
                }else{
                    return moment(item.date).format('YYYY-MM') == date
                }
            })

            const listMap = _list.reduce((pre, cur) => {
                const date = moment(cur.date).format('YYYY-MM-DD')
                if(pre.length == 0) {
                    pre.push({
                        date: date,
                        bills: [cur]
                    })
                }else{
                    if(!cur) return pre
                    let index = pre.findIndex(v => {
                        return v.date == date
                    })
                    if(index == -1){
                        pre.push({
                            date: date,
                            bills: [cur]
                        })
                    }else{
                        pre[index].bills.push(cur)  
                    }
                }
                return pre
            },[]).sort((a,b) => moment(b.date) - moment(a.date)) 

            // 分页处理，listMap 为我们格式化后的全部数据，还未分页。
            const filterListMap = listMap.slice((page - 1) * page_size, page * page_size)

            // 分页处理
            let __list = list.filter(item => moment(item.date).format('YYYY-MM') == date)

            // 累加计算支出
            let totalExpense = __list.reduce((pre,cur) => {
                if(cur.pay_type == 1) {
                    pre += Number(cur.amount)
                }
                return pre
            }, 0)

            // 累加计算收入
            let totalIncome = __list.reduce((pre, cur) => {
                if(cur.pay_type == 2) {
                    pre += Number(cur.amount)
                }
                return pre
            }, 0)

            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                    totalExpense,
                    totalIncome,
                    totalPage: Math.ceil(listMap.length / page_size),
                    list: filterListMap
                }
            }

        }catch(err) {
            console.log(err)
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async detail() {
        const {ctx,app} = this
        const {id = ''} = ctx.query
        const token = ctx.request.header.token
        const decode = await app.jwt.verify(token, app.config.jwt.secret)
        if(!id) {
            ctx.body = {
                code: 500,
                msg: '订单号不能为空!',
                data: null
            }
            return
        }
        if(!decode) return
        const user_id = decode.id
        try{
            const result = await ctx.service.bill.detail(id, user_id)
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: result
            }
        }catch(err) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
    
    async update() {
        const {ctx,app} = this
        let {id, pay_type, amount, type_id, type_name, remark = '',date} = ctx.request.body
        date = moment(date).format('YYYY-MM-DD HH:mm')
        if(!amount || !id || !type_id || !type_name || !pay_type) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
            return
        }
        try{
            const token = ctx.request.header.token
            const decode = await app.jwt.verify(token, app.config.jwt.secret)
            if(!decode) return
            let user_id = decode.id
            const result = await ctx.service.bill.update({
                id,pay_type,amount,type_id,type_name,remark,user_id,date
            })
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: null
              }
        }catch(err) {
            console.log(err)
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async delete() {
        const {ctx,app} = this
        const {id = ''} = ctx.query
        if(id == '') {
            ctx.body = {
                code: 400,
                msg: 'id不能为空',
                data: null
            }
            return
        }
        const token = ctx.request.header.token
        const decode = await app.jwt.verify(token, app.config.jwt.secret)
        if(!decode) return
        let user_id = decode.id
        try {
            const result = await ctx.service.bill.delete(id,user_id)
            ctx.body = {
                code: 200,
                msg: '删除成功',
                data: null
            }
        }catch(err) {
            console.log(err)
            ctx.body = {
                code: 500,
                msg: '系统问题',
                data: null
            }
        }
    }

    async data() {
        const {ctx,app} = this
        const {date} = ctx.query
        const token = ctx.request.header.token
        const decode = await app.jwt.verify(token, app.config.jwt.secret)
        if(!decode) return
        let user_id = decode.id
        try{
            const result = await ctx.service.bill.list(user_id)
            const start = moment(date).startOf('month').unix() * 1000
            const end = moment(date).endOf('month').unix() * 1000
            const _data = result.filter(item => {
                return (Number(item.date) > start && Number(item.date) < end)
            })
            // 总支出
            const total_expense = _data.reduce((pre,cur) => {
                if(cur.pay_type == 1) {
                    pre += Number(cur.amount)
                }
                return pre
            },0)

            // 总收入
            const total_income = _data.reduce((pre,cur) => {
                if(cur.pay_type == 2) {
                    pre += Number(cur.amount)
                }
                return pre
            },0)

            // 获取收支构成
            let total_data = _data.reduce((pre,cur) => {
                const index = pre.findIndex((item) => item.type_id == cur.type_id)
                if(index == -1) {
                    pre.push({
                        type_id: cur.type_id,
                        type_name: cur.type_name,
                        pay_type: cur.pay_type,
                        number: Number(cur.amount)
                    })
                }else{
                    pre[index].number += Number(cur.amount)
                }
                return pre
            },[])

            total_data = total_data.map(item => {
                item.number = Number(item.number).toFixed(2)
                return item
            })

            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                    total_expense: Number(total_expense).toFixed(2),
                    total_income: Number(total_income).toFixed(2),
                    total_data: total_data || []
                }
            }


        }catch(err) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
}

module.exports = BillController;