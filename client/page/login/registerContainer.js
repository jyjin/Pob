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

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from '../../lib/hapi'
import loginStyle from '../../style/login'
import AppBar from '../appBar'
const md5 = require('md5')

const styles = theme => loginStyle

class RegisterContainer extends Component {


    constructor(props, context) {
        super(props)
        this.state = {

        }
    }

    handleClick = () => {
        const data = this.state;
        data.password = md5(data.password)
        api.signUp(data).then(json => {
            if (json.res > 0) {
                sessionStorage.setItem('TOKEN', json.data.token)
                this.props.setType(1)
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
        return <div className={classes.root} elevation={1}>
            <h1 className={classes.purple}>Sign up</h1>
            <CssBaseline />
            <TextField
                required
                id="username"
                label="username"
                className={classes.textField}
                margin="normal"
                onChange={this.onChange('username')}
            />
            <TextField
                required
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                margin="normal"
                onChange={this.onChange('password')}
            />
            <TextField
                required
                id="passwordAgain"
                type="password"
                label="passwordAgain"
                className={classes.textField}
                margin="normal"
                onChange={this.onChange('passwordAgain')}
            />
            <TextField
                required
                id="phone"
                type="phone"
                label="phone"
                className={classes.textField}
                margin="normal"
                onChange={this.onChange('phone')}
            />
            <TextField
                required
                id="email"
                type="email"
                label="email"
                className={classes.textField}
                margin="normal"
                onChange={this.onChange('email')}
            />
            <Button variant="contained" color="primary" className={classes.button}
                onClick={this.handleClick}
            >
                Sign up for Pob
         </Button>
        </div>
    }

    footer() {
        const { classes } = this.props;
        return <footer className={classes.footer}>Copyright © 2018- 2118 jyjin. All rights reserved. Phone NO. 15556986551</footer>
    }

    render() {
        const { classes, ...other } = this.props;
        return <div className={classes.bg}>
            <AppBar {...other} />
            {this.loginPanel()}
            {this.footer()}
        </div>

    }
}
export default withStyles(styles)(RegisterContainer);