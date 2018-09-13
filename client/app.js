/**
 * app.js
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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LoginContainer from './page/login/loginContainer'
import api from './lib/hapi'

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

export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: 'welcome'
        };
        // injectTapEventPlugin()
    }

    componentDidMount() {
        this.beforeLoad()
    }

    beforeLoad() {
        api.getToken().then(json => {
            console.log(`==== getToken ====`, json)
        })

        api.getUser({ name: 'jyjin' }).then(json => {
            console.log(`==== getUser ====`, json)
        })

        api.post({ name: 'jyjin', age: 18 }).then(json => {
            console.log(`==== post ====`, json)
        })
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
        this.setState({ value });
        this.props.history.push(value, { fromDashboard: true })
    };


    bottomNavigation() {
        const { value } = this.state || '/welcome';

        return (
            <BottomNavigation value={value} onChange={this.handleChange.bind(this)}>
                <BottomNavigationAction label="welcome" value="/welcome" icon={<RestoreIcon />} />
                <BottomNavigationAction label="news" value="/news" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="news1" value="/news1" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="render" value="/render" icon={<Icon>folder</Icon>} />
            </BottomNavigation>
        );
    }

    main() {
        return <div style={{ height: 'calc( 100vh - 64px - 56px )' }}>
            {/* {Routes} */}
            <Routes local={'zh-cn'} />
        </div>
    }

    render() {

        if (!this.state.user) {
            return <LoginContainer/>
        }

        const child = <div >
            {this.appBar()}
            {this.main()}
            {this.bottomNavigation()}
        </div>
        return child
    }
}