const user = require('./user')
const log = require('../../middleware/log')
const jwtAuth = require('../../middleware/jwtAuth')
const accountAnalysis = require('../../middleware/accountAnalysis')
const userRequire = require('../../middleware/userRequire')

module.exports = (app) => {
    // 用户登录
    app.post('/user/signIn', log, accountAnalysis, user.signIn)
    // 根据用户名获取用户
    app.get('/getUser/:username', log, jwtAuth, user.queryUserByUsername);
    // 添加用户
    app.post('/user/addUser', log, userRequire, user.addUser)
    // 查询用户列表
    app.use('/user/queryUserList', log, jwtAuth, user.queryUserList)
}