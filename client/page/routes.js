/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import welcome from './welcome'
import newsContainer from './news/newsContainer'
import newsContainer1 from './news/newsContainer.1'
import newsContainer2 from './news/newsContainer.2'

export default (
    <div>
        <Route exact path='/' component={welcome} />
        <Route path='/a' render={()=>{return <div>hello a</div>}} />
        <Route path='/welcome' component={welcome} />
        <Route path='/news' component={newsContainer} />
        <Route path='/news1' component={newsContainer1} />
        <Route path='/news2' component={newsContainer2} />
    </div>
)

