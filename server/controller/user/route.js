const user = require('./user')
const jwt = require('jsonwebtoken')
const jwtAuth = require('../../middleware/jwtAuth')
const { expiresIn, appTokenSecret } = require('../../config')

const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
}

module.exports = (app) => {
    app.use('/getToken', (req, res) => {
        var data = {
            userId: '0001',
            username: 'jyjin'
        }
        return res.send({
            res: 1,
            data: {
                token: getToken(data)
            }
        })
    })

    app.use('/jwt', jwtAuth, (req, res) => {
        console.log('req.user === ', req.user)
        res.send({
            res: 1,
            data: {
                message: 'token 认证成功！'
            }
        })
    });

    app.use('/user/getUserInfo', user.getUserInfo)
}