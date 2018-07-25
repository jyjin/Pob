import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Link } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()
import withRoot from './withRoot'
import App from './page/app'

ReactDOM.render(
    <Router history={history}>
        {/* {withRoot(<App history={history}/>)} */}
        <App history={history}/>
    </Router>
    ,
    document.querySelector('#root')
);