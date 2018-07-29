/**
 * 静态变量
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 系统错误返回
 */

const i18n = require('../i18n')
const _RES = (res = -1, errorCode) => {
    __verbose(' ======== i18n.cn', i18n('cn')['JSS_AUTH_0001'])
    return {
        res,
        errorCode,
        i18n: {
            cn: i18n('cn')[errorCode],
            en: i18n('en')[errorCode]
        }
    }
}

const CONSTANT = {
    // System tip
    DATA_ADD_ERROR: _RES(-1, 'JSS_0001'),
    DATA_REMOVE_ERROR: _RES(-1, 'JSS_0002'),
    DATA_UPDATE_ERROR: _RES(-1, 'JSS_0003'),
    DATA_GET_ERROR: _RES(-1, 'JSS_0004'),
    DATA_SAVE_ERROR: _RES(-1, 'JSS_0005'),
    DATA_SAVE_ERROR: _RES(-1, 'JSS_0006'),

    // Auth tip
    AUTH_TOKEN_ERROR: _RES(-1, 'JSS_AUTH_0001'),
    XXX: 123
}

__verbose('9999 ', CONSTANT)

module.export = CONSTANT