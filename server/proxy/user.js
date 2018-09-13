const Models = require('../models')
const User = Models.User

// 添加用户
exports.addUser = (bean, callback) => {
    var user = new User()
    for (var key in bean) {
        user[key] = bean[key]
    }
    user.save((err, result) => {
        if (err) return callback(err)
        callback(null, result)
    })
}


// 查询用户列表 admin除外
exports.queryUserList = (callback) => {
    User.find({ account: { $ne: 'admin' } }).exec(callback)
}

// 查询用户 根据id
exports.queryUser_byId = (id, callback) => {
    User.findOne({ _id: id }).exec(callback)
}

// 查询用户 根据邮箱
exports.queryUser_byEmail = (email, callback) => {
    User.findOne({ email: email }).exec(callback)
}

// 查询用户 根据手机号
exports.queryUser_byPhone = (phone, callback) => {
    User.findOne({ phone: phone }).exec(callback)
}

// 查询用户 根据用户名
exports.queryUser_byUsername = (username, callback) => {
    User.findOne({ username: username }).exec(callback)
}

// 删除用户 根据id
exports.removeUser_byId = (id, callback) => {
    User.remove({ _id: id }).exec(callback)
}

// 删除用户 根据邮箱
exports.removeUser_byEmail = (email, callback) => {
    User.remove({ email: email }).exec(callback)
}

// 删除用户 根据手机号
exports.removeUser_byPhone = (phone, callback) => {
    User.remove({ phone: phone }).exec(callback)
}

// 删除用户 根据用户名
exports.removeUser_byUsername = (username, callback) => {
    User.remove({ username: username }).exec(callback)
}

// 查询用户个数 根据邮箱
exports.getUserCounts_byEmail = (email, callback) => {
    User.find({ email: email }).count().exec(callback)
}

// 查询用户个数 根据手机号
exports.getUserCounts_byPhone = (phone, callback) => {
    User.find({ phone: phone }).count().exec(callback)
}

// 查询用户个数 根据用户名
exports.getUserCounts_byUsername = (username, callback) => {
    User.find({ username: username }).count().exec(callback)
}