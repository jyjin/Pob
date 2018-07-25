import React from 'react';
import ReactDOM from 'react-dom';
import withRoot from './withRoot';
import Home from './page/home'

const App = withRoot(Home)

ReactDOM.render(<App />, document.querySelector('#root'));