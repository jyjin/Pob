const User = require('../../proxy').User
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { expiresIn, appTokenSecret } = require('../../config')
const { DATA_GET_ERROR, AUTH_TOKEN_ERROR } = require('../../lib/constant')

const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
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
        console.log('jyjin 1111 ', result)
        console.log('jyjin 1111 ', result.password)
        console.log('jyjin 1111 ', opt.password)
        if (result.password === opt.password) {
            return res.send({
                res: 1,
                data: {
                    token: getToken({
                        userId: result._id,
                        username: result.username
                    })
                }
            })
        } else {
            return res.send(AUTH_TOKEN_ERROR)
        }

    })
}

exports.queryUserByUsername = (req, res) => {
    var opt = {
        username: req.params.username
    }

    User.queryUser_byUsername(opt.username, (err, result) => {
        if (err) {
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
    console.log('jyjin 1231')
    let opt = {
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        account: req.body.account
    }
    User.addUser(opt, (err, result) => {
        if (err) {
            console.log(`* ERROR IN [ addUser ]: `, err)
            return res.send({
                res: -1,
                message: 'Save data error'
            })
        }
        return res.send({
            res: 1,
            data: result
        })
    })
}

exports.queryUserList = (req, res) => {
    User.queryUserList((err, result) => {
        if (err) {
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