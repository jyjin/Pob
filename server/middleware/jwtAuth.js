/**
 * token认证
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 解析token，将token携带信息绑定到req.user
 *
 */
const jwt = require('jsonwebtoken')
const SECRET = { appTokenSecret } = require('../config')
const constant = require('../lib/constant')
__verbose('0000000 === ', constant)

module.exports = (req, res, next) => {
    // 定义 不用token 的api
    if (req.originalUrl.indexOf('/getToken') >= 0) {
        return next();
    }
    //定义 用token的api  对其验证
    var token = req.body.token || req.query.token || req.headers["x-access-token"]
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            // 返回错误信息
            res.send(AUTH_TOKEN_ERROR)
            return;
        } else {
            // 解析必要的数据（相应字段为定义token时的字段）
            req.user = {
                userId: decoded.userId,
                username: decoded.username
            }
            // 跳出中间件
            return next();
        }
    });
}