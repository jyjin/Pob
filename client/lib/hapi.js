/*********************************************************************************************
 * 后端接口定义组件
 * 
 * author:  jyjin
 * date  :  create at 2018.08.10
 * remark:
 *          定义后端服务接口地址，接口请求类型
 *          调用方式： api.name(data,query).then(json=>...)
 *          参数详解：
 *          name：[STRING]  配置的方法name,不可重名
 *          data: [JSON]    1.post发送的参数; 2.rest风格的参数;
 *                如:       url:'/getUser/:name'                   
 *                          data:{name: 'tom'}
 *                          ==>
 *                          /getUser/tom
 *          query:[JSON]    url的query参数    
 *                如：      url:/getUserList                       
 *                          query:{pageNum: 1, pageCount: 10}
 *                          ==>             
 *                          /getUserList?pageNum=1&pageCount=10
 * 
 **********************************************************************************************/

const AJAX = require('./ajax')

const API = [
    {                                       // 测试 rest 接口                
        name: `getUser`,
        url: `/getUser/:name`,
    },
    {                                       // 测试 post 接口
        name: `post`,
        url: `/json`, 
        isPost: true
    },
    {                                       // 测试 get 接口
        name: `getToken`,
        url: `/getToken`,
    },
    {                                       // 登录
        name: `authByToken`,
        url: `/authByToken`, 
        isPost: true
    },
    {                                       // 菜单树
        name: `getMenuList`,
        url: `/getMenuList`,
    },
    {                                       // 新增菜单
        name: `addMenu`,
        url: `/addMenu`, 
        isPost: true
    },
]

module.exports = AJAX(API)
