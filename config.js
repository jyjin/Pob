const serverConfig = require('./server/config')
var config = {
    host: '127.0.0.1',        // api host
    protocol: 'http',         // api protocol
    port: serverConfig.port,  // api port
    domain: ''                // api domain = protocol://host:port
}

const { protocol, host, port } = config
config.domain = `${protocol}://${host}:${port}/`

module.exports = config