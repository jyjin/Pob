/**
 * 登录页
 * 
 * author:  jyjin
 * date  :  create at 2018.09.17
 * remark:
 *          重构样式组织架构：去除每个组件的withStyle（去除withStyle(styles)写法，去除{classes, ...other}过滤环节）, 
 *          统一由app.js withStyle集成传递到子组件
 */
module.exports = (theme) => {
    console.log('theme == ', theme)
    return ({
        // 通用定位属性
        fullWidth: {
            width: '100%',
        },
        background: {
            position: 'absolute',
            color: '#eee',
            fontSize: '100px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        flex: {
            display: 'flex',
        },
        flexGrow: {
            flexGrow: 1,
        },
        flexGrow2: {
            flexGrow: 2,
        },

        // 页头
        appBarMenuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        // 页脚
        footer: {
            background: theme.palette.primary.main,
            textAlign: 'center',
            fontSize: '12px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            color: 'white',
        },

        // 登录、注册相关
        loginPanel: {
            width: '300px',
            background: 'none',
            flexGrow: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -60%)',
        },
        loginBackground: {
            flexGrow: 1,
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            // background: theme.palette.primary.main
        },
        loginTitle: {
            display: 'inline-block',
            margin: 0,
            padding: 0,
            width: '100%',
            textAlign: 'center',
            color: theme.palette.primary.main
        },
        loginButton: {
            width: '100%',
            margin: '20px 0px'
        },
    })
}