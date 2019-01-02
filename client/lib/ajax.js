/**
 * Http 请求组件
 * 
 * author:  jyjin
 * date  :   create at 2018.08.10
 * remark:
 *          解析api数据格式的接口，封装成promise调用
 */

const { auto } = require('async')
const { cloneDeep, has } = require('lodash')
const axios = require('axios')
const config = require('./config')

window.__verbose = console.log
window.__error = console.error
window.__warn = console.warn

const promisify = (fn, model) => {
    return function () {                                              // 这里只能用function不能用箭头函数
        return new Promise((resolve, reject) => {
            fn.apply(model, [].concat(arguments[0], [(err, result) => {
                return err ? reject(err) : resolve(result)
            }], arguments[1]))
        })
    }

}

const AJAX = (options, callback) => {
    let token = sessionStorage.getItem('TOKEN') || ''
    let _config = {
        headers: { 'X-Requested-With': 'XMLHttpRequest', token },
        timeout: config.timeout,
        baseURL: config.siteUrl,
        responseType: 'json',
        method: options.method,
        url: options.url,
        params: options.query,                                  //?name=XXX&age=XXX
        data: options.data,                                     //post json object
        onUploadProgress: function (progressEvent) {

        },
        onDownloadProgress: function (processEvent) {

        },
        maxContentLength: 2000,

    }
    options = Object.assign({}, _config)
    axios
        .request(options)
        .then(function (response) {
            if (response.status != 200) {
                __error(`[ Http request failed ]`)
                return callback(` Http request failed `)
            }
            callback(null, response.data)
        }).catch(function (error) {
            if (error.response) {
                __error(`[ ------------------------- Http response error ------------------------- ]`);
                __error(`[ data ]`, error.response.data);
                __error(`[ status ]`, error.response.status);
                __error(`[ headers ]`, error.response.headers);
                callback(`Http response error`)
            } else if (error.request) {
                __error(`[ ------------------------- Http request error ------------------------- ]`);
                __error(`[ request ]`, error.request);
                callback(` Http request error `)
            } else {
                __error(`[ ------------------------- Http error ------------------------- ]`);
                __error(`[ message ]`, error.message);
                callback(` Http error `)
            }
        });
}

const init = (API) => {

    var model = {}
    API.map(fun => {
        model[fun.name] = (data, callback, query) => {
            auto({
                request: (cb) => {

                    var _cloneData = cloneDeep(data)
                    var lackField = false
                    if (~fun.url.indexOf(':') || ~fun.url.indexOf('：')) {
                        fun.url = fun.url.replace(/:([A-Za-z_\$][A-Za-z0-9_\$]*)/g, function (match, field) {
                            if (has(_cloneData, field)) {
                                return data[field];
                            } else {
                                lackField = true;
                                return 'undefined';
                            }
                        });

                        if (lackField) {
                            return cb('lack necessary Params');
                        }
                    }

                    var options = {
                        url: fun.url,
                        method: fun.isPost ? 'POST' : 'GET',
                        data: data,
                        query: query,
                    }
                    AJAX(options, cb)
                }
            }, (err, result) => {
                callback(err, result.request)
            })
        }
    })

    Object.getOwnPropertyNames(model).map(funName => {
        model[funName] = promisify(model[funName], model)
    })

    return model
}

module.exports = init