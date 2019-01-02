var io = null
var allot = require('./middleware/allot')
var user = require('./controller/user/user')
var { ACTION, MESSAGE } = require('./enum')

/**
 * 发送聊天消息接口
 * @param {*} receiveUserId 必需 接受者 
 * @param {*} msg 必需 消息对象or消息文本
 * @param {*} emitUserId  可选 发送者为msg为文本时则必需
 */
const sendMessage = (receiveUserId, msg, emitUserId) => {
    if (typeof msg == 'string') {
        msg = {
            emitUserId: emitUserId || null,
            receiveUserId,
            type: 1,
            content: msg
        }
    }
    console.log('* sendMessage == ', msg)
    io.emit(`chatMessage${receiveUserId}`, msg)
}

/**
 * 分配用户接口
 * @param {*} emitUserId 必需 发送者
 * @param {*} content 可选 消息内容 默认为空
 * @param {*} callback 可选
 */
function findFriend(emitUserId, content = '', callback) {
    console.log(`* 为${emitUserId}匹配用户...`)
    allot(emitUserId, (err, result) => {
        var _msg = {
            emitUserId: emitUserId,
            receiveUserId: null,
            type: 1,
            content: ''
        }
        var _errText = ''
        // 分配发送错误
        if (err) {
            _errText = '消息发送失败'
            _msg.receiveUserId = emitUserId
            _msg.content = _errText
            sendMessage(emitUserId, _msg)
            console.log('* ' + _errText)
            if (callback) callback(_errText)
            return;
        }
        // 无空闲用户
        if (result == -1) {
            _errText = '好像没找人想聊天的人'
            _msg.receiveUserId = emitUserId
            _msg.content = _errText
            sendMessage(emitUserId, _msg)
            console.log('* ' + _errText)
            if (callback) callback(_errText)
            return;
        }

        _succText = '匹配成功'
        var receiveUserId = result._id
        _msg.receiveUserId = receiveUserId
        _msg.content = content
        console.log('* ' + _succText)
        console.log("emitUserId", emitUserId)
        console.log("receiveUserId", receiveUserId)
        sendMessage(receiveUserId, _msg)
        _msg.emitUserId = receiveUserId
        _msg.receiveUserId = emitUserId
        sendMessage(emitUserId, _msg)
        if (callback) callback(null, _succText)
    })
}

/**
 * 结束聊天接口
 * @param {*} emitUserId 必需 发送者
 * @param {*} callback 可选 不存在会默认推送消息，存在时则覆盖原有逻辑
 */
function hangupFriend(emitUserId, callback) {
    var text = ''
    user.chatHangup(emitUserId, (err, result) => {
        if (callback) return callback(err, result)
        if (err) {
            if (err == -1) {
                text = '结束失败'
            }
            text = '结束失败'
            sendMessage(emitUserId, text) //这里可能丢失 接受者 需要完善
        } else{
            text = ''
            if(result.receiveUser){
                var { _id: receiveUserId } = result.receiveUser
                sendMessage(emitUserId, '已结束当前会话', receiveUserId)
                sendMessage(receiveUserId, '对方与你解除了会话', emitUserId)
            }
        }
    })
}

function onSocketConnect(socket) {
    console.log('* ==> A user connected [ ' + socket.handshake.address.replace('::ffff:', '') + ' ]')

    socket.on('chatMessage', function (msg) {
        console.log('* msg[chatMessage] == ', msg)

        // 没有接受者 则分配
        if (!msg.receiveUserId) {
            console.log(`* 为${msg.emitUserId}匹配用户...`)
            findFriend(msg.emitUserId, msg.content)
            return;
        }
        // 有直接发送消息
        console.log('* name == ', `chatMessage${msg.receiveUserId}`)
        sendMessage(msg.receiveUserId, msg)
    });

    socket.on('actionMessage', function (msg) {
        console.log('* msg[actionMessage] == ', msg)

        var { emitUserId } = msg
        // 退出
        if (msg.type == ACTION.QUIT) {
            hangupFriend(msg.emitUserId)
        }

        // 切换
        if (msg.type == ACTION.SWITCH) {
            hangupFriend(emitUserId, (err, result) => {
                if (err) {
                    text = '切换失败'
                    sendMessage(emitUserId, text) //这里可能丢失 接受者 需要完善
                } else {
                    findFriend(emitUserId)
                }
            })
        }
    })

    socket.on('disconnect', (reason) => {
        console.log('* ==> A user disconnected [ ' + socket.handshake.address.replace('::ffff:', '') + ' ]')
    });

    socket.on('error', (error) => {
        console.log('* socket error, error: ', error)
    });
}

function init(server) {
    io = require('socket.io')(server)
    io.on('connection', onSocketConnect);
}

exports.init = init