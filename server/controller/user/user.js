const User = require('../../proxy').User
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { expiresIn, appTokenSecret } = require('../../config')
const { DATA_GET_ERROR, AUTH_TOKEN_ERROR, LOGIN_ERROR } = require('../../lib/constant')

const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
}

exports.authByToken = (req, res) => {
    return res.send({
        res: 1,
        data: {
            user: req.user
        }
    })
}

exports.signIn = (req, res) => {
    var opt = {
        account: req.body.account,
        password: req.body.password
    }

    var apiName = 'queryUser_byUsername'
    if (req.user.type == 1) {
        apiName = 'queryUser_byEmail'
    } else if (req.user.type == 2) {
        apiName = 'queryUser_byPhone'
    } else {
        apiName = 'queryUser_byUsername'
    }

    User[apiName](opt.account, (err, result) => {
        if (err) {
            console.log(`* Query data error: `, err)
            return res.send(DATA_GET_ERROR)
        }
        if (!result) {
            return res.send(LOGIN_ERROR)
        }
        console.log('result: ', result)
        if (result.password === opt.password) {
            return res.send({
                res: 1,
                data: {
                    token: getToken({
                        userId: result._id,
                        username: result.username
                    }),
                    user: result
                }
            })
        } else {
            return res.send(LOGIN_ERROR)
        }
    }, 1)
}

exports.queryUserByUsername = (req, res) => {
    var opt = {
        username: req.params.username
    }

    User.queryUser_byUsername(opt.username, (err, result) => {
        if (err || !result) {
            console.log(`* Query data error: `, err)
            return res.send(DATA_GET_ERROR)
        }

        return res.send({
            res: 1,
            data: result
        })
    })
}

exports.addUser = (req, res) => {
    let opt = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        account: req.body.account
    }
    User.addUser(opt, (err, result) => {
        if (err || !result) {
            console.log(`* ERROR IN [ addUser ]: `, err)
            return res.send({
                res: -1,
                message: 'Save data error'
            })
        }
        return res.send({
            res: 1,
            data: {
                token: getToken({
                    userId: result._id,
                    username: result.username
                }),
                user: result
            }
        })
    })
}

exports.queryUserList = (req, res) => {
    User.queryUserList((err, result) => {
        if (err || !result) {
            console.log(`* ERROR IN [ queryUserInfo ]: `, err)
            return res.send({
                res: -1,
                message: 'Query data error'
            })
        }

        return res.send({
            res: 1,
            data: result
        })
    })
}