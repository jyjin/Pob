import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        color: purple[500]
    },
})

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { classes } = this.props;

        return <div style={this.props.style || { outline: 'none' }}>
            <CircularProgress
                className={classes.progress}
                size={this.props.size || 50}
                thickness={this.props.thickness || 7}
            />
        </div>
    }
}

export default withStyles(styles)(Loading);
