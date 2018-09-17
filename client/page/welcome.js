import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export default class welcome extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}

    }

    componentDidMount() {
        socket.on('chatMessage', function (msg) {
            console.log('msg == ', msg)
            // this.setState({
            //     replyMessage: msg
            // })
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleClick = () => {
        socket.emit('chatMessage', this.state.message);
    }

    render() {

        const { classes } = this.props

        return <Paper>
            <div className={classes.chatContainer}>
                {/* {JSON.stringify(this.replyMessage, null, 2)} */}
            </div>
            <TextField
                id="message"
                label=""
                className={classes.message}
                onChange={this.handleChange('message')}
                margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.send}
                onClick={this.handleClick}
            >
                {this.props.i18n.SEND}
            </Button>
        </Paper>
    }
}