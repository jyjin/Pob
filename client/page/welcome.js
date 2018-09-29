import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { MESSAGE } from '../lib/constant'
import Clear from '@material-ui/icons/Clear';
import Send from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default class welcome extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            msg: {
                emitUserId: this.props.user._id,
                receiveUserId: null,
                type: MESSAGE.TEXT,
                content: ''
            }
        }
    }

    componentDidMount() {
        console.log('Receive event == ', `chatMessage${this.props.user._id}`)
        socket.on(`chatMessage${this.props.user._id}`, (msg) => {
            console.log('msg == ', msg)
            this.setState({
                msg: msg,
                replyMessage: msg.content
            })
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    sendMsg(content) {
        var { msg } = this.state
        if (msg.receiveUserId == this.props.user._id) {
            msg.receiveUserId = null
        }
        msg.content = content
        socket.emit(`chatMessage`, msg);
        this.setState({
            message: '',
            replyMessage: content
        })
    }

    handleClick = () => {
        this.sendMsg(this.state.message)
    }

    handleClear = () => {
        this.setState({
            message: '',
            replyMessage: ''
        })
    }

    render() {

        const { classes } = this.props
        return <div className={classNames(classes.themeBackground, classes.fullHeight)}>
            <div className={classes.chatContainer}>
                <p className={classes.chatText}>{this.state.replyMessage}</p>
                {/* <div className={classes.parent}>
                    <p>
                        <span>测试css</span>
                    </p>
                </div> */}
            </div>
            <div className={classNames(classes.flex, classes.width80, classes.middle)}>
                <Input
                    id="message"
                    label=""
                    margin='dense'
                    className={classNames(classes.message, classes.width60)}
                    onChange={this.handleChange('message')}
                    value={this.state.message}
                    onKeyUp={(e) => this.props.onEnter(e, 'handleClick', this)}
                    endAdornment={this.state.message ? <InputAdornment>
                        <Tooltip title={this.props.i18n.CLEAR}>
                            <Clear fontSize="small" className={classes.messageButton} onClick={this.handleClear} />
                        </Tooltip>
                        {/* <IconButton variant="fab" title={this.props.i18n.SEND} onClick={this.handleClick} className={classes.messageButton}>
                            <Send fontSize="small" />
                        </IconButton> */}
                    </InputAdornment> : null}

                />
                {this.state.message ?
                    <Tooltip title={this.props.i18n.SEND}>
                        <Button variant="contained" color="primary" onClick={this.handleClick} className={classes.messageButtonWrap}>
                            {this.props.i18n.SEND}
                            <Send className={classes.send} />
                        </Button>
                    </Tooltip>
                    : null}
            </div>
        </div >
    }
}