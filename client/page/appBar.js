
import React, { Component, Children } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import api from '../lib/hapi'

export default class MyAppBar extends React.Component {

    constructor(props, context) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    handleClick = () => {
        this.props.setType(this.props.appBarType == 1 ? 2 : 1)
    }

    logOut = () => {
        api.signOut({ id: this.props.user._id }).then(json => {
            if (json.res > 0) {

            } else {
                console.log(json.i18n.cn)
            }
            sessionStorage.removeItem('TOKEN')
            this.props.setUser(null)
        })
    }

    changeLanguage = () => {
        var local = localStorage.getItem('LOCAL') || 'cn'
        this.props.setLocal(local == 'cn' ? 'en' : 'cn')
    }

    getButton() {
        if (this.props.appBarType == 1 || this.props.appBarType == 2) {
            var label = this.props.appBarType == 1 ? 'Sign up' : 'Sign In'
            return <Button color="inherit" onClick={this.handleClick}>{label}</Button>
        } else {
            return <Button color="inherit" onClick={this.logOut}>{this.props.i18n.QUIT}</Button>
        }
    }

    render() {
        const { classes } = this.props;
        var local = localStorage.getItem('LOCAL') || 'cn'
        return <SwipeableDrawer
            anchor="top"
            variant="persistent"
            open={!!this.props.alwaysOpen || !!this.props.top}
            onClose={() => { if (!!this.props.alwaysOpen) return; this.props.toggleDrawer('top', false) }}
            onOpen={() => { if (!!this.props.alwaysOpen) return; this.props.toggleDrawer('top', true) }}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.appBarMenuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flexGrow}>{this.props.i18n.APP_NAME}</Typography>
                    <Button color="inherit" onClick={this.changeLanguage}>{local == 'cn' ? this.props.i18n.ZH : this.props.i18n.EN}</Button>
                    {this.getButton()}
                </Toolbar>
            </AppBar>
        </SwipeableDrawer>
    }
}