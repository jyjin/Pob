const route_user = require('./controller/user/routes')

const router = (app) => {
    //用户信息路由
    route_user(app)
}

module.exports = router