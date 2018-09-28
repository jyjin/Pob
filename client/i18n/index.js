const cn = require('./cn')
const en = require('./en')

module.exports = (local) => {
    // var local = localStorage.getItem('LOCAL') || 'cn'
    if (local == 'cn') {
        return cn
    } else if (local == 'en') {
        return en
    } else {
        return cn
    }
}