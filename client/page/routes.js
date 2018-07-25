import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Welcome from './welcome'
import NewsFeed from './news/newsContainer'
import NewsFeed1 from './news/newsContainer.1'
import NewsFeed2 from './news/newsContainer.2'

export default class RouterConfig extends React.Component {
    render() {
      return <Router>
        <div>
        <Route path="/" component={Welcome} />
            <Route path="/news" component={NewsFeed} />
            <Route path="/news1" component={NewsFeed1} />
            <Route path="/news2" component={NewsFeed2} />
        </div>
      </Router>
    }
  }
