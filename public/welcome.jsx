/**
 * Created by polylink on 17/1/9.
 */
const React = require('react');

class Welcome extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <meta name="renderer" content="webkit"/>
                    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0"/>
                    <title>Welcome to my app</title>
                </head>
                <body>
                    Welcome to my app
                </body>
            </html>
        );
    }
}

module.exports = Welcome;
