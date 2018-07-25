import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Route from './routes'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
    }

    appBar() {
        return <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" style={styles.flex}>News</Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    }

    handleChange(event, value) {
        this.setState({ value: value, redirect: true });
    };


    bottomNavigation() {

        const { value } = this.state || 'recents';

        if (this.state.redirect) {
            return <Redirect to={value} />;
        }

        return (
            <BottomNavigation value={value} onChange={this.handleChange.bind(this)}>
                <BottomNavigationAction label="Recents" value="/welcome" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="/news" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" value="/news1" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Folder" value="/news2" icon={<Icon>folder</Icon>} />
            </BottomNavigation>
        );
    }

    main() {
        return <div style={{ height: 'calc( 100vh - 64px - 56px )' }}>
            <Route {...this.props} />
        </div>
    }

    render() {
        const { open } = this.state;

        return (
            <div >
                {this.appBar()}
                {this.main()}
                {this.bottomNavigation()}
            </div>
        );
    }
}

