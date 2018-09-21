var io = null

function onSocketConnect(socket) {
    console.log('* ==> A user connected')
    socket.on('chatMessage', function (msg) {
        console.log('* msg == ', msg)
        console.log('* name == ', `chatMessage${msg.receiveUserId}`)
        io.emit(`chatMessage${msg.receiveUserId}`, msg);
    });
}

function init(server) {
    io = require('socket.io')(server)
    io.on('connection', onSocketConnect);
}

exports.init = init