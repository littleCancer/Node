/**
 * Created by steva on 2/15/15.
 */


var connect = require('connect');
var time = require('./request-time');
//var morgan = require('morgan');

var app = connect();

//server.use(connect.logger('dev'));

app.use(time({time:500}));

/**

 fast
 */

app.use(function(req, res, next){
    console.log(' mid 1');
    if ('/a' == req.url) {
        res.writeHead(200);
        res.end('Fast !');
    } else {
        next();
    }
});

/**
 * slow
 */

app.use(function(req, res, next) {
    console.log(' mid 2');
    if ('/b' == req.url) {
        setTimeout(function(){
            res.writeHead(200);
            res.end('Slow !');
        }, 1000);
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    console.log(' mid 3');
    res.writeHead(200);
    res.end('Ne Biram !');
});

app.listen(3000);
