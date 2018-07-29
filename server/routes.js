const route_test = require('./controller/test/route')
const route_user = require('./controller/user/route')

const router = (app) => {
    // 基础路由
    route_test(app)
    // 用户信息路由
    route_user(app)
}

module.exports = router