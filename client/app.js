/**
 * app.js
 * 
 * author:  jyjin
 * date  :   create at 2018.07.25
 * remark:
 *          In this file, we create a layout component
 *          which incorporates components provided by Material-UI.
 */

import React, { Component, Children } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import Accessibility from '@material-ui/icons/AccountBalance';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ViewColumn from '@material-ui/icons/SentimentSatisfiedAlt';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LoginContainer from './page/login/loginContainer'
import RegisterContainer from './page/login/registerContainer'
import Loading from './page/component/loading'
import AppBar from './page/appBar'
import api from './lib/hapi'
import styles from './style'
import i18nModule from './i18n'
import { withStyles } from '@material-ui/core';
import io from 'socket.io-client'

var timeOutEvent = 0;

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            appBarType: 1,                                  // 1 注册bar 2 登录bar 3 注销bar
            local: localStorage.getItem('LOCAL') || 'cn',   // cn-中文 en-英文
        };
        // injectTapEventPlugin()
    }

    componentDidMount() {
        this.beforeLoad()
        this.initSocket()
    }

    initSocket() {
        var token = sessionStorage.getItem('token') || ''
        var socket = io(`http://127.0.0.1:5001?token=${token}`)
        window.socket = socket
    }

    setUser = user => {
        this.setState({ user, appBarType: 1 })
    }

    setAppBarType = appBarType => {
        this.setState({ appBarType })
    }

    beforeLoad() {
        var token = sessionStorage.getItem('TOKEN') || ''
        if (token) {
            this.setState({ loading: true })
            api.authByToken({ token }).then(json => {
                if (json.res > 0) {
                    this.setState({
                        user: json.data.user,
                        loading: false,
                        appBarType: 3
                    })
                } else {
                    console.warn(json.i18n.cn)
                    this.setState({
                        loading: false
                    })
                }
            })
        }

        this.setLocal()
    }

    setLocal = (local) => {
        if (!local) {
            local = localStorage.getItem('LOCAL') || 'cn'
            localStorage.setItem('LOCAL', local)
            this.setState({ local })
        } else {
            localStorage.setItem('LOCAL', local)
            this.setState({ local })
        }
    }

    toggleDrawer = (side, open) => {
        console.log(side, open)
        this.setState({
            [side]: open,
        });
    };



    handleChange(event, value) {
        this.setState({ value });
        this.props.history.push(value, { fromDashboard: true })
    };

    onEnter(e, fun, scope, data) {
        if (e.keyCode == 13) {
            scope[fun](data)
        }
    }

    longPress = () => {
        timeOutEvent = 0;
        console.log("长按事件触发");
        this.toggleDrawer('top', !this.state.top)
        this.toggleDrawer('bottom', !this.state.bottom)
    }

    onTouchStart = (e) => {
        console.log('==> touchStart')
        timeOutEvent = setTimeout(this.longPress, 500);
        // e.preventDefault();
    }

    onTouchMove = (e) => {
        console.log('==> touchMove')
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
    }

    onTouchEnd = (e) => {
        console.log('==> touchEnd')
        clearTimeout(timeOutEvent);
        if (timeOutEvent != 0) {
            console.log("你这是点击，不是长按");
        }
        return false;
    }

    appBar() {
        const { classes, ...other } = this.props;
        return <AppBar
            {...this.props}
            {...this.state}
            i18n={i18nModule(this.state.local)}
            appBarType={this.state.appBarType}
            setType={this.setAppBarType}
            setLocal={this.setLocal}
            setUser={this.setUser}
            toggleDrawer={this.toggleDrawer}
        />
    }

    main() {
        const { classes } = this.props
        return <div
            className={classes.main}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onMouseDown={this.onTouchStart}
            onMouseMove={this.onTouchMove}
            onMouseUp={this.onTouchEnd}
        >
            {/* <div className={classes.background}><ViewColumn style={{ fontSize: 100 }} /></div> */}
            <Routes
                {...this.props}
                {...this.state}
                onEnter={this.onEnter.bind(this)}
                i18n={i18nModule(this.state.local)}
            />
        </div>
    }

    bottomNavigation() {
        const { value } = this.state || '/welcome';

        return (
            <SwipeableDrawer
                anchor="bottom"
                variant="persistent"
                open={!!this.state.bottom}
                onClose={() => this.toggleDrawer('bottom', false)}
                onOpen={() => this.toggleDrawer('bottom', true)}
            >
                <BottomNavigation value={value} onChange={this.handleChange.bind(this)}>
                    <BottomNavigationAction label="welcome" value="/welcome" icon={<Accessibility />} />
                    <BottomNavigationAction label="news" value="/news" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="news1" value="/news1" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="render" value="/render" icon={<Icon>folder</Icon>} />
                </BottomNavigation>
            </SwipeableDrawer>
        );
    }

    render() {

        // 加载动画
        if (this.state.loading) {
            return <Loading size={50} thickness={3} style={{
                position: 'fixed',
                width: '50px',
                height: '50px',
                top: '50%',
                left: '50%',
                transform: 'translate(-25px, -25px)',
            }} />
        }

        // 登录注册
        if (!this.state.user) {
            if (this.state.appBarType == 1) {
                return <LoginContainer
                    {...this.state}
                    {...this.props}
                    alwaysOpen={true}
                    i18n={i18nModule(this.state.local)}
                    toggleDrawer={this.toggleDrawer}
                    setLocal={this.setLocal}
                    setType={this.setAppBarType}
                    setUser={this.setUser} />
            } else {
                return <RegisterContainer
                    {...this.state}
                    {...this.props}
                    alwaysOpen={true}
                    i18n={i18nModule(this.state.local)}
                    toggleDrawer={this.toggleDrawer}
                    setLocal={this.setLocal}
                    setType={this.setAppBarType}
                    setUser={this.setUser} />
            }
        }

        const child = <div >
            {this.appBar()}
            {this.main()}
            {this.bottomNavigation()}
        </div>
        return child
    }
}

export default withStyles(styles)(App)