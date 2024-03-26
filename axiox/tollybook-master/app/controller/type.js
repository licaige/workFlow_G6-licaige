'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
    async list() {
        const {ctx} = this
            const result = await ctx.service.type.getTypeList()
            if(result) {
                ctx.body = {
                    code: 200,
                    data: result,
                    msg: '请求成功'
                }
            }else{
                ctx.body = {
                    code: 500,
                    data: null,
                    msg: '系统错误'
                }
            }
    }
}

module.exports = TypeController;