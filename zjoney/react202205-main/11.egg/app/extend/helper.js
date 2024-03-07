const moment = require('moment');
moment.locale('zh-cn');
exports.fromNow = datetime => moment(new Date(datetime)).fromNow()