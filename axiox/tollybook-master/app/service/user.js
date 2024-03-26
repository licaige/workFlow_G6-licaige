'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    // 通过用户名获取用户信息
    async getUserByName(username) {
        const {app} = this
        try {
            const result = await app.mysql.get('user', {username})
            return result
        }catch(err) {
            console.log(err)
            return null
        }
    }

    async editUserInfo(params) {
        const {ctx,app} = this
        try {
            let result = await app.mysql.update('user', {
                ...params
            }, {
                id: params.id
            })
            return result
        }catch(err) {
            console.log(err)
            return null
        }
    }

    async register(params) {
        const {app} = this
        try{
            let result = await app.mysql.insert('user', params)
            return result
        }catch(err) {
            console.log(err)
            return null
        }
    }

    async modifypass(params) {
        const {app} = this
        try{
            let result = await app.mysql.update('user', {
                ...params
            }, {
                id: params.id
            })
            return result
        }catch(err) {
            console.log(err)
            return null
        }
    }
}

module.exports = UserService;