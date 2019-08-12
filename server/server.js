"use strict"; //For use with ES6

const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const compression = require('compression');
const routes = require('./api/routes');
const enviroment = require('custom-env');
const connection  = require('./api/config/connection');


const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'a',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));


app.get(enviroment.env());
app.use(compression());
app.use(morgan('dev')); // log with Morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(methodOverride());
app.use(cors()); //enable CORS`


//Mount our route file that we have yet to create.
if (process.env.APP_ENV === 'production') {
    app.use(history());
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use('/', (req, res, next) =>{
        if(!req.url){
            res.sendFile(path.join(__dirname+'../client/build/index.html'));
        }else{
            next();
        }
        
    });
}



app.use('/api', routes);


// catch 404 and forward to error handler
if (process.env.APP_ENV === 'development') {
    app.use( (req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

// development error handler
if (process.env.APP_ENV === 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// // production error handler
if (process.env.APP_ENV=== 'production') {
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});
}

server.listen(5000, () => {
    console.log('Server listening at port 5000');
});

module.exports = app;