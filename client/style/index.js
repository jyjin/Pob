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
        fullScreen: {
            width: '100%',
            height: 'calc(100vh)',
        },
        fullWidth: {
            width: '100%',
        },
        fullHeight: {
            height: '100%',
        },
        width90: {
            width: '90%',
        },
        width80: {
            width: '80%',
        },
        width70: {
            width: '70%',
        },
        width60: {
            width: '60%',
        },
        width50: {
            width: '50%',
        },
        width40: {
            width: '40%',
        },
        width30: {
            width: '30%',
        },
        width20: {
            width: '20%',
        },
        width10: {
            width: '10%',
        },

        background: {
            position: 'absolute',
            color: '#eee',
            fontSize: '100px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        flexPure: {
            display: 'flex',
        },
        flex: {
            display: 'flex',
            alignItems: 'center',
        },
        flexColumn: {
            display: 'flex',
            flexDirection: 'column'
        },
        flexGrow: {
            flexGrow: 1,
        },
        flexGrow1: {
            flexGrow: 1,
        },
        flexGrow2: {
            flexGrow: 2,
        },
        middle: {
            margin: '0 auto',
        },
        //容器
        container: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        main: {
            position: 'relative',
            flexGrow: 1,
        },
        mainPannel: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'auto',
        },
        height0: {
            height: '0px',
        },
        // app页头
        header: {
            height: '65px'
        },
        appBarMenuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        // app页脚
        navigator: {
            height: '57px'
        },
        footer: {
            position: 'fixed',
            background: theme.palette.primary.main,
            textAlign: 'center',
            fontSize: '12px',
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
            background: theme.palette.primary.contrastText
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
        chatContainer: {
            height: '90%',
        },
        themeBackground: {
            background: theme.palette.primary.light
        },
        chatText: {
            position: 'relative',
            top: '30%',
            left: '50%',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            color: '#fff',
            fontSize: '30px',
            transform: 'translate(-50%, -50%)',
        },
        message: {
            display: 'flex',
            margin: '0 auto',
            width: '90%',
            height: '40px',
            color: theme.palette.primary.contrastText,
            borderBottomColor: theme.palette.primary.contrastText,
            '&:before': {
                borderBottom: '2px solid white',
                '&:hover': {
                    borderBottomColor: '2px solid green'
                }
            },
            '&:after': {
                borderBottomColor: theme.palette.primary.contrastText,
            },
            '&:hover': {
                '&:before': {
                    borderColor: 'white',
                    borderBottom: '2px solid white'
                }
            },
        },
        send: {
            marginLeft: '5px',
        },
        white: {
            color: 'white',
        },
        messageButtonWrap: {
        },
        messageButton: {
            marginTop: '8px',
            color: theme.palette.primary.contrastText,
            cursor: 'pointer',
            '&:hover': {
                color: 'rgba(255,255,255, 0.6)',
            }
        },
        // parent: {
        //     border: '10px solid red',
        //     height: '100px',
        //     '& p': {
        //         position: 'relative',
        //         margin: 0,
        //         padding: 0,
        //         border: '10px solid green',
        //         height: '100%',
        //         '& span': {
        //             border: '10px solid blue',
        //         },

        //         '&:hover': {
        //             color: 'white',
        //         },

        //         '&:before': {
        //             content: `''`,
        //             position: 'relative',
        //             border: '10px solid white',
        //             width:'100%'
        //         },

        //     },
        //     '&:hover': {
        //         borderColor: 'orange',
        //         '& p': {
        //             borderColor: 'lightGreen',
        //             '&:before':{
        //                 borderColor: 'black'
        //             }
        //         },
        //     }


        // }
    })
}