'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
    async getTypeList() {
        const {app} = this
        const sql = 'select * from type'
        try{
            const result = await app.mysql.query(sql)
            return result
        }catch(err) {
            console.log(err)
            return null
        }
    }
}

module.exports = TypeService;