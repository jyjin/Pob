import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { MESSAGE } from '../lib/constant'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default class welcome extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    componentDidMount() {
        console.log('Receive event == ', `chatMessage${this.props.user._id}`)
        socket.on(`chatMessage${this.props.user._id}`, (msg) => {
            console.log('msg == ', msg)
            this.setState({
                replyMessage: msg.content
            })
        });
    }

    handleChange = name => event => {
        // this.sendMsg(event.target.value)
        this.setState({ [name]: event.target.value })
    }

    sendMsg(content) {
        var receiveUserId = ''
        if (this.props.user._id == "5b9cbc8ed2707e656084f448") {
            receiveUserId = "5ba4bd4dd034ac3204c4d022"
        } else {
            receiveUserId = "5b9cbc8ed2707e656084f448"
        }

        var msg = {
            emitUserId: this.props.user._id,
            receiveUserId: receiveUserId,
            type: MESSAGE.TEXT,
            content: content
        }
        socket.emit(`chatMessage`, msg);
        this.setState({
            message: ''
        })
    }

    handleClick = () => {
        this.sendMsg(this.state.message)
    }

    render() {

        const { classes } = this.props
        return <div className={classNames(classes.fullScreen, classes.themeBackground)}>
            <div className={classes.chatContainer}>
                <p className={classes.chatText}>{this.state.replyMessage}</p>
            </div>
            <div className={classNames(classes.flex, classes.width80, classes.middle)}>
                    <Input
                        id="message"
                        label=""
                        className={classNames(classes.message, classes.width60)}
                        onChange={this.handleChange('message')}
                        value={this.state.message}
                        onKeyUp={(e) => this.props.onEnter(e, 'handleClick', this)}
                        margin="normal"
                    />
                {/* <Button variant="contained" color="primary" className={classes.send}
                    onClick={this.handleClick}
                >
                    {this.props.i18n.SEND}
                </Button> */}
            </div>
        </div >
    }
}