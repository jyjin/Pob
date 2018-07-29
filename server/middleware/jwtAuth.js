/**
 * token认证
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 解析token，将token携带信息绑定到req.user
 *
 */
const jwt = require('jsonwebtoken')
const { appTokenSecret } = require('../config')
const { AUTH_TOKEN_ERROR, AUTH_TOKEN_EXPIRED } = require('../lib/constant')

module.exports = (req, res, next) => {
    // 定义 不用token 的api
    if (req.originalUrl.indexOf('/getToken') >= 0) {
        return next();
    }
    //定义 用token的api  对其验证
    var token = req.body.token || req.query.token || req.headers["token"]
    __verbose('token === ', token)
    jwt.verify(token, appTokenSecret, function (err, decoded) {
        if (err) {
            __verbose('[ ERROR IN jwtAuth ] === ', err.name)
            // 返回错误信息
            if (err.name) {
                if ('TokenExpiredError' == err.name) {
                    return res.send(AUTH_TOKEN_EXPIRED)
                }
                if ('JsonWebTokenError' == err.name) {
                    return res.send(AUTH_TOKEN_ERROR)
                }
            }
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