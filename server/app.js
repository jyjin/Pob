/**
 * server app.js
 * create by jyjin 
 * create at 2018.07.25
 */

const express = require('express')
const bodyParser = require('body-parser');
const serverRoutes = require('./routes');
const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

// app.use('/public', express.static(__dirname + '/public'))
// app.set('views', __dirname + '/view');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,x-access-token,x-access-lan');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// interface api
serverRoutes(app);

app.use('/test', (req, res, next) => {
    return res.send({ res: 1, data: 'route test nice!' })
})

app.get('/welcome', (req, res) => {
    res.render('welcome')
})

module.exports = app