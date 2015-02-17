/**
 * Created by steva on 2/17/15.
 */

var express = require('express');
var search = require('./search');

var app = express.createServer();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});


app.get('/', function(req, res) {
    new Error('Bad taaaaar response');
    console.log('aaaaa aa a');
    res.render('index');
});

app.get('/search', function(req, res, next) {
    search(req.query.q, function(err, tweets) {
        console.log('ma jes');
        if (err) {
            next(err);
        } else {
            res.render('search', {results:tweets, search:req.query.q});
        }
    });
});

app.use(function(req, res, next){
    res.writeHead(200, {"Content-Type" : "text/html"});
    res.end('M a cao');
});

app.error(function(err, req, res) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    console.log('errores ss ');
    res.end('error');
});

app.listen(3000);

