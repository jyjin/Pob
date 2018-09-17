/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import newsContainer from './page/news/newsContainer'
import newsContainer1 from './page/news/newsContainer.1'
import newsContainer2 from './page/news/newsContainer.2'
import welcome from './page/welcome';


const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

// 封装Route -> 能够传递除Route默认props之外的自定义props
const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
}

export default class Routes extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {classes} = this.props
        return <div className={classes.fullHeight}>
            <PropsRoute exact path='/' {...this.props} component={welcome} />
            <Route path='/render' render={() => { return <div>hello render</div> }} />
            <PropsRoute path='/welcome' {...this.props} component={welcome} />
            <PropsRoute path='/news' {...this.props} component={newsContainer} />
            <PropsRoute path='/news1' {...this.props} component={newsContainer1} />
            <PropsRoute path='/news2' {...this.props} component={newsContainer2} />
        </div>
    }
}

