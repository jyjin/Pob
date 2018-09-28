/**
 * app.js
 * 
 * author:  jyjin
 * date  :   create at 2018.09.17
 * remark:
 *          主题样式定义文件
 */

import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import cyan from '@material-ui/core/colors/cyan'
import pink from '@material-ui/core/colors/pink'
import amber from '@material-ui/core/colors/amber'
import deepOrange from '@material-ui/core/colors/deepOrange'
import lightBlue from '@material-ui/core/colors/lightBlue'
const themeStyle = {
    purple: {
        palette: {
            primary: {
                light: purple[300],
                main: purple[500],
                dark: purple[700],
                contrastText: 'white',
            },
            secondary: {
                light: green[300],
                main: green[500],
                dark: green[700],
            },
        },
    },
    cyan: {
        palette: {
            primary: {
                light: cyan[300],
                main: cyan[500],
                dark: cyan[700],
                contrastText: 'white',
            },
            secondary: {
                light: pink[300],
                main: pink[500],
                dark: pink[700],
            },
        },
    },
    amber: {
        palette: {
            primary: {
                light: amber[300],
                main: amber[500],
                dark: amber[700],
                contrastText: 'white',
            },
            secondary: {
                light: deepOrange[300],
                main: deepOrange[500],
                dark: deepOrange[700],
            },
        },
    },
    lightBlue: {
        palette: {
            primary: {
                light: lightBlue[300],
                main: lightBlue[500],
                dark: lightBlue[700],
                contrastText: 'white',
            },
            secondary: {
                light: deepOrange[300],
                main: deepOrange[500],
                dark: deepOrange[700],
            },
        },
    }
}

// 主题默认
const defaultTheme = themeStyle.cyan
module.exports = defaultTheme