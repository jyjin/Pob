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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import purple from '@material-ui/core/colors/purple';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 20,
        paddingBottom: theme.spacing.unit * 2,
        margin: '0 auto',
        // opacity: 0.5,
        width: '300px',
        height: '560px',
        background: 'none',
        flexGrow: 1,
    },
    bg: {
        flexGrow: 1,
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: purple[100],
        // background: "url(http://www.sightp.com/image/case-icon/bg-banner.jpg) center center",
        backgroundSize: 'cover'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    button: {
        width: 300,
        margin: '20px 8px'
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    footer: {
        background: purple[600],
        textAlign: 'center',
        fontSize: '12px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        color: 'white',
    },
    purple: {
        width: 300,
        textAlign: 'center',
        color: purple[600]
    }
});

class LoginContainer extends Component {


    constructor(props, context) {
        super(props)
        this.state = {

        }
    }

    appBar() {
        return <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" style={styles.flex}>Know me</Typography>
                <Button color="inherit">Sign up</Button>
            </Toolbar>
        </AppBar>
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.bg}>
            {this.appBar()}
            <div className={classes.root} elevation={1}>
                <h1 className={classes.purple}>Sign in</h1>
                <TextField
                    required
                    id="username"
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    required
                    id="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    Sign in for Pob
                 </Button>
            </div>
            <footer className={classes.footer}>Copyright © 2018- 2118 jyjin. All rights reserved. Phone NO. 15556986551</footer>
        </div>

    }
}
export default withStyles(styles)(LoginContainer);