const user = require('./user')
const jwt = require('jsonwebtoken')
const jwtAuth = require('../../middleware/jwtAuth')
const { expiresIn, appTokenSecret } = require('../../config')

const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
}

module.exports = (app) => {

    app.get('/jwt', jwtAuth, (req, res) => {
        console.log('req.user === ', req.user)
        res.sendStatus(200);
    });

    app.get('/getToken', (req, res) => {
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


    app.use('/user/getUserInfo', user.getUserInfo)

}