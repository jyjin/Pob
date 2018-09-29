var io = null
var allot = require('./middleware/allot')

function onSocketConnect(socket) {
    console.log('* ==> A user connected [ ' + socket.handshake.address.replace('::ffff:', '') + ' ]')

    socket.on('chatMessage', function (msg) {
        console.log('* msg == ', msg)

        if (!msg.receiveUserId) {
            console.log(`* 为${msg.emitUserId}匹配用户...`)
            allot(msg.emitUserId, (err, result) => {
                var _msg = {
                    emitUserId: null,
                    receiveUserId: null,
                    type: 1,
                    content: ''
                }
                // 分配发送错误
                if (err) {
                    _msg.receiveUserId = msg.emitUserId
                    _msg.content = '消息发送失败'
                    io.emit(`chatMessage${msg.emitUserId}`, _msg)
                    console.log('* 发送消息失败')
                    return;
                }
                // 无空闲用户
                if (result == -1) {
                    _msg.receiveUserId = msg.emitUserId
                    _msg.content = '好像没找人想聊天的人'
                    // io.emit(`chatMessage${msg.emitUserId}`, _msg)
                    console.log('* 好像没找人想聊天的人')
                    return;
                }
                msg.receiveUserId = result._id
                console.log('* 匹配成功')
                io.emit(`chatMessage${msg.receiveUserId}`, msg)
            })
            return;
        }
        console.log('* name == ', `chatMessage${msg.receiveUserId}`)
        io.emit(`chatMessage${msg.receiveUserId}`, msg);
    });

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