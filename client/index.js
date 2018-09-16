import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import withRoot from './page/withRoot'
import app from './app'
require('typeface-roboto') // 字体引入

const history = createBrowserHistory()
const App = withRoot(app)
window.__verbose = console.log
window.__error = console.error
window.__warn = console.warn

ReactDOM.render(
    <Router history={history}>
        <App history={history} />
    </Router>
    ,
    document.querySelector('#root')
);