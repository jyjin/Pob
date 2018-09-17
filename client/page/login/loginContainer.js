/**
 * 登录页
 * 
 * author:  jyjin
 * date  :   create at 2018.07.25
 * remark:
 *          In this file, we create a layout component
 *          which incorporates components provided by Material-UI.
 */

import React, { Component, Children } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from '../../lib/hapi'
import AppBar from '../appBar'
const md5 = require('md5')

export default class LoginContainer extends Component {


    constructor(props, context) {
        super(props)
        this.state = {

        }
    }

    handleClick = () => {
        const data = this.state;
        data.password = md5(data.password)
        api.signIn(data).then(json => {
            if (json.res > 0) {
                sessionStorage.setItem('TOKEN', json.data.token)
                this.props.setUser(json.data.user)
                this.props.setType(3)
            } else {
                alert(json.i18n.cn)
            }
        })
    }

    onChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    loginPanel() {
        const { classes } = this.props;
        return <div className={classes.loginPanel} elevation={1}>
            <h1 className={classes.loginTitle}>Sign in</h1>
            <CssBaseline />
            <TextField
                required
                id="account"
                label="account"
                className={classes.fullWidth}
                margin="normal"
                onChange={this.onChange('account')}
            />
            <TextField
                required
                id="password"
                type="password"
                label="Password"
                className={classes.fullWidth}
                margin="normal"
                onChange={this.onChange('password')}
            />
            <Button variant="contained" color="primary" className={classes.loginButton}
                onClick={this.handleClick}
            >
                Sign in for Pob
         </Button>
        </div>
    }

    footer() {
        const { classes } = this.props;
        return <footer className={classes.footer}>Copyright © 2018- 2118 jyjin. All rights reserved. Phone NO. 15556986551</footer>
    }

    render() {
        const { classes, ...other } = this.props;
        return <div className={classes.loginBackground}>
            <AppBar {...this.props} />
            {this.loginPanel()}
            {this.footer()}
        </div>
    }
}