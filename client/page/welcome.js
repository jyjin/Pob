import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { MESSAGE, ACTION } from '../lib/constant'
import Clear from '@material-ui/icons/Clear';
import Send from '@material-ui/icons/SubdirectoryArrowLeft';
import ControllButton from '@material-ui/icons/MoreHoriz';
import HangupFriends from '@material-ui/icons/PhonelinkErase';
import ChangeFriends from '@material-ui/icons/Sync';
import ClearScreen from '@material-ui/icons/CancelPresentation';
import Report from '@material-ui/icons/NaturePeople';

import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popover from '@material-ui/core/Popover';
import api from '../lib/hapi'

const Message = (emitUserId, receiveUserId, type, content) => {
    return {
        emitUserId,
        receiveUserId,
        type,
        content
    }
}

const ActionMessage = (emitUserId, type) => {
    return { type, emitUserId }
}

export default class welcome extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            openControl: false,                 // 控制栏开关
            message: '',                        // 输入消息内容
            replyMessage: '',                   // 回复消息内容
            emitUserId: null,                   // 发送者
            receiveUserId: null,                // 接受者
        }
    }

    componentDidMount() {
        console.log('Receive event == ', `chatMessage${this.props.user._id}`)
        socket.on(`chatMessage${this.props.user._id}`, (msg) => {
            console.log('msg == ', msg)
            var { emitUserId, receiveUserId } = msg
            this.setState({
                emitUserId: receiveUserId,
                receiveUserId: emitUserId,
                replyMessage: msg.content
            })
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    sendMsg(content) {
        var { receiveUserId } = this.state
        if (receiveUserId == this.props.user._id) {
            receiveUserId = null
        }
        var msg = Message(this.props.user._id, receiveUserId, MESSAGE.TEXT, content)
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

    closeTheControl = () => {
        this.setState({ openControl: false })
    }
    openTheControl = () => {
        this.setState({ openControl: true });
    }

    reportFriends = () => {

    }

    clearScreen = () => {
        this.setState({
            replyMessage: ''
        })
    }

    changeFriends = () => {
        var msg = ActionMessage(this.props.user._id, ACTION.SWITCH)
        socket.emit(`actionMessage`, msg);
    }

    hangupFriends = () => {
        var msg = ActionMessage(this.props.user._id, ACTION.QUIT)
        socket.emit(`actionMessage`, msg);
    }

    render() {

        const { classes } = this.props
        return <div className={classNames(classes.themeBackground, classes.fullHeight)}>
            <div className={classes.chatContainer}>
                <p className={classes.chatText}>{this.state.replyMessage}</p>
            </div>
            <div className={classes.disscroll}>
                <div className={classNames(classes.tc)}>
                    {/* 控制 */}
                    {/* <Tooltip title={this.props.i18n.CONTROL}> */}
                    <IconButton
                        className={!!this.state.openControl ? classes.transprant : classes.color}
                        buttonRef={node => this.anchorEl = node}
                        onClick={this.openTheControl}>
                        <ControllButton />
                    </IconButton>
                    {/* </Tooltip> */}
                    <Popover
                        classes={{
                            paper: classes.popControl
                        }}
                        id="simple-popper"
                        open={this.state.openControl}
                        anchorEl={this.anchorEl}
                        onClose={this.closeTheControl}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}>
                        {/* <ClickAwayListener onClickAway={this.closeTheControl}> */}
                        <Paper className={classNames(classes.pl20, classes.pr20, classes.color, classes.popControl)}>
                            {/* 举报 */}
                            <IconButton className={classes.color}>
                                <Report />
                            </IconButton>
                            {/* 清屏 */}
                            <IconButton className={classes.color} onClick={this.clearScreen}>
                                <ClearScreen />
                            </IconButton>
                            {/* 换人 */}
                            <IconButton className={classes.color} onClick={this.changeFriends}>
                                <ChangeFriends />
                            </IconButton>
                            {/* 挂断 */}
                            <IconButton className={classes.color} onClick={this.hangupFriends}>
                                <HangupFriends />
                            </IconButton>
                        </Paper>
                        {/* </ClickAwayListener> */}
                    </Popover>
                </div>
                <div className={classNames(classes.flex, classes.width80, classes.middle)}>
                    {/* 输入框 */}
                    <Input
                        id="message" label="" margin='dense'
                        className={classNames(classes.message, classes.fullWidth, classes.mr20)}
                        onChange={this.handleChange('message')}
                        value={this.state.message}
                        onKeyUp={(e) => this.props.onEnter(e, 'handleClick', this)}
                        endAdornment={
                            // 清空输入按钮
                            !!this.state.message ? <Slide in={!!this.state.message} direction={'left'}>
                                <InputAdornment>
                                    <Tooltip title={this.props.i18n.CLEAR}>
                                        <Clear className={classes.messageButton} onClick={this.handleClear} />
                                    </Tooltip>
                                </InputAdornment>
                            </Slide>
                                : null
                        }
                    />
                    {/* 发送 */}
                    {!!this.state.message ?
                        <Tooltip title={this.props.i18n.SEND}>
                            <Slide in={!!this.state.message} direction={'left'}>
                                <Button variant="contained" color="primary" onClick={this.handleClick} className={classes.messageButtonWrap}>
                                    {this.props.i18n.SEND}
                                    <Send className={classes.send} />
                                </Button>
                            </Slide>
                        </Tooltip>
                        : null}
                </div>
            </div>
        </div >
    }
}