import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import withRoot from './withRoot'
import app from './page/app'

const history = createBrowserHistory()
const App = withRoot(app)

ReactDOM.render(
    <Router history={history}>
        <App history={history} />
    </Router>
    ,
    document.querySelector('#root')
);